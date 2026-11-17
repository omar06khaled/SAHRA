/**
 * Downloads any pack photo that is missing from public/ but whose Source is a
 * Wikimedia Commons file, as a 1280px-wide copy. Parked packs (`_name.md`) are
 * included, so a photo pack can be filled in before it goes live.
 *
 *   npm run photos
 *
 * Wikimedia rate-limits bursts, so this goes slowly and stops at the first
 * refusal — run it again later to pick up where it left off.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { parsePack } from '../src/game/packFormat.ts';

const root = resolve(import.meta.dirname, '..');
const packs = join(root, 'packs');
const wanted: { img: string; url: string }[] = [];

for (const f of readdirSync(packs).filter((f) => f.endsWith('.md') && f !== 'TEMPLATE.md')) {
  const { category } = parsePack(f, readFileSync(join(packs, f), 'utf8'));
  for (const q of category?.qs.flat() ?? []) {
    if (q.img && q.src?.startsWith('https://upload.wikimedia.org/') && !existsSync(join(root, 'public', q.img))) {
      wanted.push({ img: q.img, url: q.src });
    }
  }
}

console.log(`${wanted.length} photo(s) to fetch`);
for (const [n, { img, url }] of wanted.entries()) {
  const [, path] = url.split('/wikipedia/commons/');
  const name = path.split('/').pop()!;
  const thumb = `https://upload.wikimedia.org/wikipedia/commons/thumb/${path}/1280px-${name}`;
  const res = await fetch(thumb, { headers: { 'User-Agent': 'SAHRA-trivia/1.0 (private family quiz; low volume)' } });
  if (!res.ok) {
    console.log(`stopped at ${img}: HTTP ${res.status} — try again later`);
    process.exit(1);
  }
  const out = join(root, 'public', img);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(await res.arrayBuffer()));
  console.log(`[${n + 1}/${wanted.length}] ${img}`);
  await new Promise((r) => setTimeout(r, 8000));
}
console.log('done');
