// Weekly pipeline: collects new posts from the Facebook groups listed in
// data/facebook-groups.json through Bright Data's "Facebook - Posts by group URL"
// scraper and merges them into public/data/sl_facebook_groups.csv.
//
// Env: BRIGHTDATA_API_KEY (required), LOOKBACK_DAYS (default 8), MAX_POSTS_PER_GROUP (default 100)

import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { parseCsv, toCsv } from './lib/csv.mjs';
import { COLUMNS, PATHS } from './lib/schema.mjs';
import { mergeRows } from './lib/rows.mjs';

export { mergeRows };

const DATASET_ID = 'gd_lz11l67o2cb3r0lkj3';
const API = 'https://api.brightdata.com/datasets/v3';
const POLL_MS = 15_000;
const TIMEOUT_MS = 45 * 60_000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normaliseUrl = (u) => String(u || '').trim().replace(/\/+$/, '').toLowerCase();
// Bright Data expects MM-DD-YYYY for this scraper's date filters.
const formatDate = (d) =>
  `${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}-${d.getUTCFullYear()}`;

/** Turn one Bright Data record into a row of the shared schema. No author details are kept. */
export function mapRecord(record, groupsByUrl, collectedAt) {
  const group = groupsByUrl.get(normaliseUrl(record.input?.url)) ?? groupsByUrl.get(normaliseUrl(record.group_url));
  // Shared posts carry no text of their own; use the text of the post they share.
  const text = String(record.content ?? record.original_post?.content ?? '').trim();
  if (!record.post_id || !text) return null;
  return {
    source: 'facebook-group',
    dataset: `brightdata:${DATASET_ID}`,
    post_id: String(record.post_id),
    timestamp: record.date_posted ?? '',
    text,
    category: '',
    sentiment: '',
    language: '',
    has_link: record.post_external_link ? 1 : 0,
    likes: record.likes ?? record.num_likes ?? 0,
    comments: record.num_comments ?? 0,
    shares: record.num_shares ?? 0,
    is_spam: '',
    group_name: record.group_name ?? group?.label ?? '',
    group_category: group?.category ?? '',
    group_url: group?.url ?? record.group_url ?? '',
    post_url: record.url ?? '',
    collected_at: collectedAt,
  };
}

function brightData(path, apiKey, init = {}) {
  return fetch(`${API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', ...init.headers },
  });
}

async function collect(groups, apiKey, { lookbackDays, maxPosts }) {
  const end = new Date();
  const start = new Date(end.getTime() - lookbackDays * 86_400_000);
  const input = groups.map((g) => ({
    url: g.url,
    num_of_posts: maxPosts,
    start_date: formatDate(start),
    end_date: formatDate(end),
  }));

  const trigger = await brightData(`/trigger?dataset_id=${DATASET_ID}&include_errors=true`, apiKey, {
    method: 'POST',
    body: JSON.stringify(input),
  });
  if (!trigger.ok) throw new Error(`Bright Data trigger failed (${trigger.status}): ${await trigger.text()}`);
  const { snapshot_id: snapshotId } = await trigger.json();
  if (!snapshotId) throw new Error('Bright Data did not return a snapshot_id');
  console.log(`Triggered snapshot ${snapshotId} for ${groups.length} group(s), ${formatDate(start)} to ${formatDate(end)}`);

  const deadline = Date.now() + TIMEOUT_MS;
  for (;;) {
    if (Date.now() > deadline) throw new Error(`Snapshot ${snapshotId} not ready after ${TIMEOUT_MS / 60_000} minutes`);
    await sleep(POLL_MS);
    const progress = await brightData(`/progress/${snapshotId}`, apiKey);
    if (!progress.ok) {
      console.log(`progress check returned ${progress.status}, retrying`);
      continue;
    }
    const { status } = await progress.json();
    console.log(`snapshot status: ${status}`);
    if (status === 'ready') break;
    if (status === 'failed') throw new Error(`Snapshot ${snapshotId} failed`);
  }

  for (let attempt = 0; attempt < 10; attempt++) {
    const res = await brightData(`/snapshot/${snapshotId}?format=json`, apiKey);
    if (res.status === 202) {
      await sleep(POLL_MS);
      continue;
    }
    if (!res.ok) throw new Error(`Snapshot download failed (${res.status}): ${await res.text()}`);
    return { snapshotId, records: await res.json() };
  }
  throw new Error(`Snapshot ${snapshotId} was still being prepared after repeated download attempts`);
}

async function writeStatus(status) {
  await writeFile(PATHS.status, JSON.stringify(status, null, 2) + '\n');
}

async function main() {
  const startedAt = new Date().toISOString();
  const config = JSON.parse(await readFile(PATHS.groupsConfig, 'utf8'));
  const groups = (config.groups ?? []).filter((g) => g.url && g.enabled !== false);
  const base = { lastRunAt: startedAt, groupsConfigured: groups.length };

  if (groups.length === 0) {
    console.log(`::warning::No groups in ${PATHS.groupsConfig} - nothing to collect.`);
    await writeStatus({ ...base, status: 'skipped', message: 'No Facebook groups configured yet.', newPosts: 0 });
    return;
  }
  const apiKey = process.env.BRIGHTDATA_API_KEY;
  if (!apiKey) throw new Error('BRIGHTDATA_API_KEY is not set');

  try {
    const { snapshotId, records } = await collect(groups, apiKey, {
      lookbackDays: Number(process.env.LOOKBACK_DAYS) || 8,
      maxPosts: Number(process.env.MAX_POSTS_PER_GROUP) || 100,
    });
    const groupsByUrl = new Map(groups.map((g) => [normaliseUrl(g.url), g]));
    const errors = records.filter((r) => r.error || r.error_code);
    const incoming = records
      .filter((r) => !r.error && !r.error_code)
      .map((r) => mapRecord(r, groupsByUrl, startedAt))
      .filter(Boolean);

    const existing = existsSync(PATHS.groupsCsv) ? parseCsv(await readFile(PATHS.groupsCsv, 'utf8')) : [];
    const { rows, added } = mergeRows(existing, incoming);
    await writeFile(PATHS.groupsCsv, toCsv(rows, COLUMNS));

    await writeStatus({
      ...base,
      status: 'success',
      snapshotId,
      postsReturned: incoming.length,
      newPosts: added,
      totalPosts: rows.length,
      recordsWithErrors: errors.length,
      firstError: errors[0]?.error ?? null,
      perGroup: groups.map((g) => ({
        label: g.label ?? g.url,
        category: g.category ?? '',
        postsThisRun: incoming.filter((r) => normaliseUrl(r.group_url) === normaliseUrl(g.url)).length,
      })),
    });
    console.log(`Done: ${incoming.length} posts returned, ${added} new, ${rows.length} total, ${errors.length} error record(s).`);
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
