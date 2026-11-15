// Weekly pipeline, X part: collects recent posts from the profiles listed in
// data/x-profiles.json through the official X API v2 and merges them into
// public/data/x_posts.csv.
//
// Env: X_BEARER_TOKEN (required once profiles are configured),
//      LOOKBACK_DAYS (default 8), MAX_POSTS_PER_PROFILE (default 100)

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { parseCsv, toCsv } from './lib/csv.mjs';
import { COLUMNS, PATHS } from './lib/schema.mjs';
import { mergeRows } from './lib/rows.mjs';

const API = 'https://api.x.com/2';
const cleanHandle = (h) => String(h || '').trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i, '').replace(/\/.*$/, '');

/** Turn one X API post object into a row of the shared schema. */
export function mapPost(post, profile, collectedAt) {
  const text = String(post.text ?? '').trim();
  if (!post.id || !text) return null;
  const metrics = post.public_metrics ?? {};
  const handle = cleanHandle(profile.handle);
  return {
    source: 'x',
    dataset: 'x-api:v2',
    post_id: String(post.id),
    timestamp: post.created_at ?? '',
    text,
    category: '',
    sentiment: '',
    language: post.lang && post.lang !== 'und' ? post.lang : '',
    has_link: post.entities?.urls?.length ? 1 : 0,
    likes: metrics.like_count ?? 0,
    comments: metrics.reply_count ?? 0,
    shares: (metrics.retweet_count ?? 0) + (metrics.quote_count ?? 0),
    is_spam: '',
    group_name: `@${handle}`,
    group_category: profile.category ?? '',
    group_url: `https://x.com/${handle}`,
    post_url: `https://x.com/${handle}/status/${post.id}`,
    collected_at: collectedAt,
  };
}

async function xApi(path, token) {
  const res = await fetch(`${API}${path}`, { headers: { Authorization: `Bearer ${token}` } });
  if (res.status === 429) {
    const reset = Number(res.headers.get('x-rate-limit-reset')) * 1000;
    throw new Error(`X API rate limit reached${reset ? `; resets at ${new Date(reset).toISOString()}` : ''}`);
  }
  if (!res.ok) throw new Error(`X API ${path.split('?')[0]} failed (${res.status}): ${await res.text()}`);
  return res.json();
}

async function collectProfile(profile, userId, token, { startTime, maxPosts }) {
  const posts = [];
  let nextToken;
  do {
    const params = new URLSearchParams({
      max_results: String(Math.min(100, Math.max(5, maxPosts - posts.length))),
      start_time: startTime,
      exclude: 'retweets',
      'tweet.fields': 'created_at,public_metrics,lang,entities',
    });
    if (nextToken) params.set('pagination_token', nextToken);
    const page = await xApi(`/users/${userId}/tweets?${params}`, token);
    posts.push(...(page.data ?? []));
    nextToken = page.meta?.next_token;
  } while (nextToken && posts.length < maxPosts);
  return posts.slice(0, maxPosts);
}

async function writeStatus(status) {
  await writeFile(PATHS.xStatus, JSON.stringify(status, null, 2) + '\n');
}

async function main() {
  const startedAt = new Date().toISOString();
  const config = JSON.parse(await readFile(PATHS.xConfig, 'utf8'));
  const profiles = (config.profiles ?? []).filter((p) => cleanHandle(p.handle) && p.enabled !== false);
  const base = { lastRunAt: startedAt, profilesConfigured: profiles.length };

  if (profiles.length === 0) {
    console.log(`::warning::No profiles in ${PATHS.xConfig} - nothing to collect from X.`);
    await writeStatus({ ...base, status: 'skipped', message: 'No X profiles configured yet.', newPosts: 0 });
    return;
  }
  const token = process.env.X_BEARER_TOKEN;
  if (!token) throw new Error('X_BEARER_TOKEN is not set');

  try {
    const lookbackDays = Number(process.env.LOOKBACK_DAYS) || 8;
    const options = {
      startTime: new Date(Date.now() - lookbackDays * 86_400_000).toISOString().replace(/\.\d{3}Z$/, 'Z'),
      maxPosts: Number(process.env.MAX_POSTS_PER_PROFILE) || 100,
    };

    // One lookup turns all handles into user ids (up to 100 handles per request).
    const handles = profiles.map((p) => cleanHandle(p.handle));
    const lookup = await xApi(`/users/by?usernames=${handles.map(encodeURIComponent).join(',')}`, token);
    const idByHandle = new Map((lookup.data ?? []).map((u) => [u.username.toLowerCase(), u.id]));

    const incoming = [];
    const perProfile = [];
    for (const profile of profiles) {
      const handle = cleanHandle(profile.handle);
      const userId = idByHandle.get(handle.toLowerCase());
      if (!userId) {
        console.log(`::warning::X profile @${handle} was not found (renamed, suspended or private).`);
        perProfile.push({ handle, category: profile.category ?? '', postsThisRun: 0, notFound: true });
        continue;
      }
      const posts = await collectProfile(profile, userId, token, options);
      const rows = posts.map((p) => mapPost(p, profile, startedAt)).filter(Boolean);
      incoming.push(...rows);
      perProfile.push({ handle, category: profile.category ?? '', postsThisRun: rows.length });
      console.log(`@${handle}: ${rows.length} posts`);
    }

    const existing = existsSync(PATHS.xCsv) ? parseCsv(await readFile(PATHS.xCsv, 'utf8')) : [];
    const { rows, added } = mergeRows(existing, incoming);
    await writeFile(PATHS.xCsv, toCsv(rows, COLUMNS));
    await writeStatus({
      ...base,
      status: 'success',
      postsReturned: incoming.length,
      newPosts: added,
      totalPosts: rows.length,
      perProfile,
    });
    console.log(`Done: ${incoming.length} X posts returned, ${added} new, ${rows.length} total.`);
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
