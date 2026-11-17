import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { parsePack, type Category } from '../src/game/packFormat.ts';

const ID = 'virtual:sahra-packs';
const RESOLVED = '\0' + ID;

/** Files in `packs/` that are documentation, not categories. */
const skip = (name: string) => name === 'TEMPLATE.md' || name.startsWith('_');

/**
 * Turns every `packs/*.md` file into the game's question pool, exposed as the
 * `virtual:sahra-packs` module. Packs are ordered by filename, which is also
 * their order on the draft screen.
 *
 * Anything malformed fails the build (and shows the error overlay in dev) with
 * the file and line; softer problems — uneven tiers, spoilers the draw will
 * keep apart — are printed as notes.
 */
export function sahraPacks(): Plugin {
  const root = resolve(import.meta.dirname, '..');
  const dir = join(root, 'packs');
  const publicDir = join(root, 'public');

  const build = (log: (msg: string) => void): Category[] => {
    const files = readdirSync(dir).filter((f) => f.endsWith('.md') && !skip(f)).sort();
    const errors: string[] = [];
    const notes: string[] = [];
    const cats: Category[] = [];
    const ids = new Map<string, string>();

    for (const f of files) {
      const { category, errors: e, warnings: w } = parsePack(`packs/${f}`, readFileSync(join(dir, f), 'utf8'));
      errors.push(...e);
      notes.push(...w);
      if (!category) continue;
      if (ids.has(category.id)) errors.push(`packs/${f}: id "${category.id}" is already used by ${ids.get(category.id)}`);
      ids.set(category.id, `packs/${f}`);
      for (const q of category.qs.flat()) {
        if (q.img && !existsSync(join(publicDir, q.img))) errors.push(`packs/${f}: photo ${q.img} not found in public/`);
      }
      cats.push(category);
    }

    if (notes.length) log(`\n[packs] ${notes.length} note(s):\n  ${notes.join('\n  ')}\n`);
    if (errors.length) throw new Error(`[packs] ${errors.length} problem(s) in the question packs:\n  ${errors.join('\n  ')}`);
    if (cats.length < 6) throw new Error(`[packs] a draft needs at least 6 categories, found ${cats.length}`);
    log(`[packs] ${cats.length} categories, ${cats.reduce((n, c) => n + c.qs.flat().length, 0)} questions`);
    return cats;
  };

  return {
    name: 'sahra-packs',
    resolveId(id) {
      return id === ID ? RESOLVED : null;
    },
    load(id) {
      if (id !== RESOLVED) return null;
      for (const f of readdirSync(dir)) if (f.endsWith('.md')) this.addWatchFile(join(dir, f));
      const cats = build((msg) => this.info(msg));
      return `export default ${JSON.stringify(cats)};`;
    },
    configureServer(server) {
      server.watcher.add(dir);
      const reload = (file: string) => {
        if (!file.startsWith(dir) || !file.endsWith('.md')) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: 'full-reload' });
      };
      server.watcher.on('add', reload);
      server.watcher.on('change', reload);
      server.watcher.on('unlink', reload);
    },
  };
}
