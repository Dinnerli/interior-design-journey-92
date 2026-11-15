/** Merge new rows into existing ones by post_id. Re-seen posts get fresh engagement counts but keep their first collected_at. */
export function mergeRows(existing, incoming) {
  const byId = new Map(existing.map((r) => [r.post_id, r]));
  let added = 0;
  for (const row of incoming) {
    const previous = byId.get(row.post_id);
    if (previous) byId.set(row.post_id, { ...row, collected_at: previous.collected_at });
    else {
      byId.set(row.post_id, row);
      added++;
    }
  }
  const rows = [...byId.values()].sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)));
  return { rows, added };
}
