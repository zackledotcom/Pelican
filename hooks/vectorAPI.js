export async function queryQdrant(query) {
  const res = await fetch('http://localhost:3001/api/memory?q=' + encodeURIComponent(query));
  if (!res.ok) throw new Error('Failed to query memory');
  return await res.json();
}
export async function pinQdrant(id) {
  const res = await fetch('http://localhost:3001/api/memory/pin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to pin memory');
}
export async function unpinQdrant(id) {
  const res = await fetch('http://localhost:3001/api/memory/unpin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  if (!res.ok) throw new Error('Failed to unpin memory');
}
