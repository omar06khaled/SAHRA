/**
 * The pack file format: parsing, validation and the spoiler check. Pure — no
 * Node or DOM APIs — because it runs in two places: the Vite plugin that turns
 * `packs/*.md` into the game's question pool at build time, and nowhere else at
 * runtime. See `packs/TEMPLATE.md` for the format as a pack writer sees it.
 */

export interface Question {
  /**
   * Stable identity, hashed from the question's content. Saved games and the
   * "already played" history refer to questions by key rather than position, so
   * reordering or inserting questions in a pack file never shifts one question
   * into another's place.
   */
  key: string;
  /**
   * Optional set-up read before the question itself — the flavour line that
   * frames it. Rendered smaller and quieter than `q` so the actual question
   * still lands at display size.
   */
  lead?: string;
  q: string;
  /**
   * Optional photo shown beside the question, served from `public/`. For most
   * categories it sets the scene without giving the answer away; for photo
   * categories (flags, capitals) it is the question.
   */
  img?: string;
  a: string;
  /**
   * Where the answer was verified. Never rendered — it is here so a disputed
   * call at the table can be settled, and so a question can be re-checked years
   * later without redoing the research.
   */
  src?: string;
  /** Questions sharing a group are never drawn onto the same board. */
  groups?: string[];
}

export interface Category {
  id: string;
  title: string;
  sub: string;
  ink: number;
  /** `large` gives the photo the bigger share of the question screen. */
  photo?: 'large';
  /**
   * Six tiers, 100 through 600. Each tier holds one or more interchangeable
   * questions; a board draws one per tier when it opens.
   */
  qs: Question[][];
  /**
   * For each question key, the keys it must not share a board with — same
   * group, or one's answer printed in the other's text. Worked out at build
   * time so the draw only has to look it up.
   */
  clash: Record<string, string[]>;
}

export interface ParseResult {
  category: Category | null;
  errors: string[];
  warnings: string[];
}

const FIELDS: Record<string, keyof Omit<Question, 'key' | 'groups'> | 'group'> = {
  question: 'q',
  answer: 'a',
  lead: 'lead',
  photo: 'img',
  source: 'src',
  group: 'group',
};

const TIERS = 6;

/** FNV-1a, base 36 — short, stable, and good enough to tell questions apart. */
const hash = (s: string): string => {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(36);
};

const balanced = (s: string): boolean => {
  const stripped = s.replace(/\*\*[^*]+\*\*/g, '').replace(/\*[^*]+\*/g, '');
  return !stripped.includes('*');
};

export function parsePack(file: string, text: string): ParseResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const err = (line: number, msg: string) => errors.push(`${file}:${line} ${msg}`);

  const src = text.replace(/\r\n?/g, '\n').replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ''));
  const lines = src.split('\n');

  // Frontmatter.
  const meta: Record<string, string> = {};
  let i = 0;
  if (lines[0]?.trim() === '---') {
    for (i = 1; i < lines.length && lines[i].trim() !== '---'; i++) {
      const m = lines[i].match(/^\s*([a-z]+)\s*:\s*(.*?)\s*$/i);
      if (m) meta[m[1].toLowerCase()] = m[2];
      else if (lines[i].trim()) err(i + 1, `unreadable frontmatter line "${lines[i].trim()}"`);
    }
    if (i >= lines.length) err(1, 'frontmatter is never closed with ---');
    i++;
  } else {
    err(1, 'missing frontmatter (the --- block with id, title, sub, ink)');
  }

  for (const k of ['id', 'title', 'sub', 'ink']) if (!meta[k]) err(1, `frontmatter is missing "${k}"`);
  if (meta.id && !/^[a-z0-9-]+$/.test(meta.id)) err(1, `id "${meta.id}" must be lowercase letters, digits or dashes`);
  const ink = Number(meta.ink);
  if (meta.ink && !(Number.isInteger(ink) && ink >= 0 && ink <= 5)) err(1, `ink must be 0–5, got "${meta.ink}"`);
  if (meta.photo && meta.photo !== 'large') err(1, `photo must be "large" or left out, got "${meta.photo}"`);

  // Body.
  const tiers: Question[][] = [];
  const seenTiers = new Set<number>();
  let tier = -1;
  let cur: { line: number; fields: Record<string, string> } | null = null;
  const qLabel = (q: { line: number }) => `question at line ${q.line}`;

  const flush = () => {
    if (!cur) return;
    const f = cur.fields;
    if (!f.q) err(cur.line, `${qLabel(cur)} has no **Question:**`);
    if (!f.a) err(cur.line, `${qLabel(cur)} has no **Answer:**`);
    for (const k of ['lead', 'q', 'a'] as const) {
      if (f[k] && !balanced(f[k])) err(cur.line, `${qLabel(cur)}: unbalanced * in ${k === 'q' ? 'Question' : k === 'a' ? 'Answer' : 'Lead'}`);
    }
    if (f.img && !f.img.startsWith('/')) err(cur.line, `${qLabel(cur)}: Photo must start with / (a path inside public/)`);
    if (f.q && f.a && tier >= 0) {
      const q: Question = {
        key: hash(`${meta.id}|${f.q}|${f.a}|${f.img ?? ''}`),
        q: f.q,
        a: f.a,
      };
      if (f.lead) q.lead = f.lead;
      if (f.img) q.img = f.img;
      if (f.src) q.src = f.src;
      if (f.group) q.groups = f.group.split(',').map((g) => g.trim().toLowerCase()).filter(Boolean);
      tiers[tier].push(q);
    }
    cur = null;
  };

  for (; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    const n = i + 1;
    if (!line) continue;

    if (/^##(?!#)/.test(line)) {
      flush();
      const m = line.match(/^##\s*(\d+)/);
      const value = m ? Number(m[1]) : NaN;
      if (!(value % 100 === 0 && value >= 100 && value <= 600)) {
        err(n, `tier heading must start with 100–600, got "${line}"`);
        tier = -1;
        continue;
      }
      tier = value / 100 - 1;
      if (seenTiers.has(tier)) err(n, `tier ${value} appears twice`);
      seenTiers.add(tier);
      tiers[tier] = tiers[tier] ?? [];
      continue;
    }

    if (line.startsWith('###')) {
      flush();
      if (tier < 0) err(n, 'question before any ## tier heading');
      cur = { line: n, fields: {} };
      continue;
    }

    const field = line.match(/^\*\*([A-Za-z ]+):\*\*\s*(.*)$/);
    if (field) {
      if (!cur) {
        err(n, `**${field[1]}:** outside a question — start the question with ###`);
        continue;
      }
      const key = FIELDS[field[1].trim().toLowerCase()];
      if (!key) {
        err(n, `unknown field "${field[1]}" (use Question, Answer, Lead, Photo, Source or Group)`);
        continue;
      }
      if (cur.fields[key]) err(n, `${field[1]} given twice in one question`);
      cur.fields[key] = field[2].trim();
      continue;
    }

    // Free text is allowed as notes between headings, but inside a question it
    // almost always means a value was wrapped onto a second line.
    if (cur) err(n, `stray line inside a question — every field must be on one line: "${line.slice(0, 60)}"`);
  }
  flush();

  for (let t = 0; t < TIERS; t++) {
    if (!seenTiers.has(t)) err(1, `missing tier ## ${(t + 1) * 100}`);
    else if (!tiers[t].length) err(1, `tier ${(t + 1) * 100} has no questions`);
  }

  const counts = tiers.map((t) => t?.length ?? 0);
  if (new Set(counts).size > 1) warnings.push(`${file}: uneven variants per tier (${counts.join(' / ')})`);

  const keys = new Set<string>();
  for (const q of tiers.flat()) {
    if (keys.has(q.key)) errors.push(`${file}: duplicate question "${q.q.slice(0, 50)}"`);
    keys.add(q.key);
  }

  if (errors.length) return { category: null, errors, warnings };

  const category: Category = {
    id: meta.id,
    title: meta.title,
    sub: meta.sub,
    ink,
    qs: tiers,
    clash: {},
  };
  if (meta.photo === 'large') category.photo = 'large';
  // Spoilers the draw can route around are its job, not the writer's — they are
  // only worth reading when some board is bound to contain one.
  const spoilers: string[] = [];
  category.clash = findClashes(category, (msg) => spoilers.push(msg));
  if (!hasCleanBoard(category)) {
    warnings.push(`${file}: every board will contain a spoiler — fix one of these, or add variants:`);
    warnings.push(...spoilers.map((m) => `  ${m}`));
  } else if (spoilers.length) {
    warnings.push(`${file}: ${spoilers.length} spoiler pair(s), kept apart by the draw`);
  }
  return { category, errors, warnings };
}

// ── Spoiler check ────────────────────────────────────────────────────────────

const norm = (s: string): string =>
  ` ${s
    .toLowerCase()
    .replace(/\*/g, '')
    .replace(/[’'`"“”«»]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()} `;

/** The distinct ways an answer can be written: "A / B", "X (Y)", minus a leading article. */
const answerForms = (a: string): string[] => {
  const parts = a
    .replace(/\(([^)]*)\)/g, ' / $1 / ')
    .split(/\s*\/\s*|\s+—\s+/)
    .map((p) => norm(p).trim().replace(/^(el|al|the|a|an) /, ''))
    .filter((p) => p.length >= 3);
  return [...new Set(parts)];
};

const label = (tier: number, q: Question) => `${(tier + 1) * 100} "${q.q.replace(/\*/g, '').slice(0, 40)}…"`;

export function findClashes(cat: Category, note: (msg: string) => void): Record<string, string[]> {
  const clash: Record<string, Set<string>> = {};
  const add = (a: string, b: string) => {
    (clash[a] ??= new Set()).add(b);
    (clash[b] ??= new Set()).add(a);
  };
  const all = cat.qs.flatMap((qs, t) => qs.map((q) => ({ q, t })));

  for (const x of all) {
    // A form the question already prints ("True or false: …" answered "True")
    // is part of the format, not a giveaway.
    const own = norm(`${x.q.lead ?? ''} ${x.q.q}`);
    const forms = answerForms(x.q.a).filter((f) => !own.includes(` ${f} `));
    for (const y of all) {
      // One question per tier is drawn, so questions in the same tier never meet.
      if (x.t === y.t || x.q === y.q) continue;
      if (x.q.groups && y.q.groups?.some((g) => x.q.groups!.includes(g)) && x.t < y.t) add(x.q.key, y.q.key);
      const text = norm(`${y.q.lead ?? ''} ${y.q.q}`);
      const hit = forms.find((f) => text.includes(` ${f} `));
      if (hit) {
        add(x.q.key, y.q.key);
        note(`${label(y.t, y.q)} contains "${hit}", the answer to ${label(x.t, x.q)}`);
      }
    }
  }
  return Object.fromEntries(Object.entries(clash).map(([k, v]) => [k, [...v]]));
}

/** Whether at least one full board of six can be drawn with no clashes at all. */
function hasCleanBoard(cat: Category): boolean {
  const pick: string[] = [];
  const go = (t: number): boolean => {
    if (t === cat.qs.length) return true;
    for (const q of cat.qs[t]) {
      if (pick.some((k) => cat.clash[q.key]?.includes(k))) continue;
      pick.push(q.key);
      if (go(t + 1)) return true;
      pick.pop();
    }
    return false;
  };
  return go(0);
}
