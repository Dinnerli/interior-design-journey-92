// Weekly pipeline, Bluesky part: runs the keyword searches listed in
// data/bluesky-sources.json against the Bluesky API (app.bsky.feed.searchPosts)
// and merges the posts into public/data/bluesky_posts.csv.
//
// Works without an account. If BLUESKY_HANDLE and BLUESKY_APP_PASSWORD are set it
// signs in first, which helps if Bluesky starts refusing anonymous searches.
//
// Env: BLUESKY_HANDLE, BLUESKY_APP_PASSWORD (optional),
//      LOOKBACK_DAYS (default 8), MAX_POSTS_PER_SEARCH (default 100)

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { parseCsv, toCsv } from './lib/csv.mjs';
import { COLUMNS, PATHS } from './lib/schema.mjs';
import { mergeRows } from './lib/rows.mjs';

const PUBLIC_API = 'https://api.bsky.app';
const SIGNED_IN_API = 'https://bsky.social';
const USER_AGENT = 'datasets-pipeline/1.0';

/** Turn one post view from searchPosts into a row of the shared schema. */
export function mapPost(post, search, collectedAt) {
  const record = post.record ?? {};
  const text = String(record.text ?? '').trim();
  if (!post.uri || !text) return null;
  const [, did, , rkey] = post.uri.replace('at://', '/').split('/');
  const hasLink =
    record.embed?.$type === 'app.bsky.embed.external' ||
    (record.facets ?? []).some((f) => f.features?.some((x) => x.$type === 'app.bsky.richtext.facet#link'));
  return {
    source: 'bluesky',
    dataset: 'bluesky-api:searchPosts',
    post_id: post.uri,
    timestamp: record.createdAt ?? post.indexedAt ?? '',
    text,
    category: '',
    sentiment: '',
    language: record.langs?.[0] ?? '',
    has_link: hasLink ? 1 : 0,
    likes: post.likeCount ?? 0,
    comments: post.replyCount ?? 0,
    shares: (post.repostCount ?? 0) + (post.quoteCount ?? 0),
    is_spam: '',
    group_name: `search: ${search.query}`,
    group_category: search.category ?? '',
    group_url: `https://bsky.app/search?q=${encodeURIComponent(search.query)}`,
    post_url: `https://bsky.app/profile/${did}/post/${rkey}`,
    collected_at: collectedAt,
  };
}

async function signIn(identifier, password) {
  const res = await fetch(`${SIGNED_IN_API}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': USER_AGENT },
    body: JSON.stringify({ identifier, password }),
  });
  if (!res.ok) throw new Error(`Bluesky sign-in failed (${res.status}) - check BLUESKY_HANDLE and BLUESKY_APP_PASSWORD`);
  return (await res.json()).accessJwt;
}

async function collectSearch(search, token, { since, maxPosts }, collectedAt) {
  // Pages by moving "until" back to the oldest post seen: Bluesky refuses the usual
  // cursor (403) for searches made without signing in.
  const byUri = new Map();
  let until;
  let grew;
  do {
    const params = new URLSearchParams({ q: search.query, sort: 'latest', since, limit: '100' });
    if (search.lang) params.set('lang', search.lang);
    if (until) params.set('until', until);
    const res = await fetch(`${token ? SIGNED_IN_API : PUBLIC_API}/xrpc/app.bsky.feed.searchPosts?${params}`, {
      headers: { 'User-Agent': USER_AGENT, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    });
    if (!res.ok) throw new Error(`Bluesky search "${search.query}" failed (${res.status}): ${(await res.text()).slice(0, 200)}`);
    const page = await res.json();
    const posts = page.posts ?? [];
    const before = byUri.size;
    for (const row of posts.map((p) => mapPost(p, search, collectedAt)).filter(Boolean)) byUri.set(row.post_id, row);
    grew = byUri.size > before;
    until = posts.at(-1)?.record?.createdAt;
  } while (grew && until && byUri.size < maxPosts);
  return [...byUri.values()].slice(0, maxPosts);
}

const writeStatus = (status) => writeFile(PATHS.blueskyStatus, JSON.stringify(status, null, 2) + '\n');

async function main() {
  const startedAt = new Date().toISOString();
  const config = JSON.parse(await readFile(PATHS.blueskyConfig, 'utf8'));
  const searches = (config.searches ?? []).filter((s) => String(s.query ?? '').trim() && s.enabled !== false);
  const base = { lastRunAt: startedAt, searchesConfigured: searches.length };

  if (searches.length === 0) {
    console.log(`::warning::No searches in ${PATHS.blueskyConfig} - nothing to collect from Bluesky.`);
    await writeStatus({ ...base, status: 'skipped', message: 'No Bluesky searches configured yet.', newPosts: 0 });
    return;
  }

  try {
    const lookbackDays = Number(process.env.LOOKBACK_DAYS) || 8;
    const options = {
      since: new Date(Date.now() - lookbackDays * 86_400_000).toISOString(),
      maxPosts: Number(process.env.MAX_POSTS_PER_SEARCH) || 100,
    };
    const { BLUESKY_HANDLE: handle, BLUESKY_APP_PASSWORD: password } = process.env;
    const token = handle && password ? await signIn(handle, password) : null;

    const incoming = [];
    const perSearch = [];
    for (const search of searches) {
      const rows = await collectSearch(search, token, options, startedAt);
      incoming.push(...rows);
      perSearch.push({ query: search.query, category: search.category ?? '', postsThisRun: rows.length });
      console.log(`"${search.query}": ${rows.length} posts`);
    }

    const existing = existsSync(PATHS.blueskyCsv) ? parseCsv(await readFile(PATHS.blueskyCsv, 'utf8')) : [];
    const { rows, added } = mergeRows(existing, incoming);
    await writeFile(PATHS.blueskyCsv, toCsv(rows, COLUMNS));
    await writeStatus({ ...base, status: 'success', signedIn: Boolean(token), postsReturned: incoming.length, newPosts: added, totalPosts: rows.length, perSearch });
    console.log(`Done: ${incoming.length} Bluesky posts returned, ${added} new, ${rows.length} total.`);
  } catch (error) {
    await writeStatus({ ...base, status: 'failed', message: String(error.message ?? error), newPosts: 0 });
    throw error;
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
