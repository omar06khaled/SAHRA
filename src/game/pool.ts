import packs from 'virtual:sahra-packs';
import { FAMILY_ID, familyCategory, loadFamily } from './familyPack';
import type { Category, Question } from './packFormat';

export type { Category, Question };

/**
 * Every category, built from `packs/*.md` at build time by `scripts/packsPlugin.ts`
 * and in filename order, then the family's 3eiltak category last when it has
 * enough questions. `lead` and `q` accept inline markup: `**bold**` for
 * emphasis the host should lean on, `*italics*` for titles. See `RichText`.
 */
export const POOL: Category[] = [...(packs as Category[])];

/** Puts the family category in the pool, replacing the old one, or takes it out when `null`. */
export function setFamilyCategory(cat: Category | null): void {
  const i = POOL.findIndex((p) => p.id === FAMILY_ID);
  if (i >= 0) POOL.splice(i, 1);
  if (cat) POOL.push(cat);
}

setFamilyCategory(familyCategory(loadFamily()));

export const byId = (id: string): Category => {
  const cat = POOL.find((p) => p.id === id);
  if (!cat) throw new Error(`Unknown category id: ${id}`);
  return cat;
};

/**
 * The question a board is showing for one tile. `variants` carries the draw made
 * when the board opened, by question key. A key that no longer exists — the pack
 * was edited since — falls back to the tier's first question.
 */
export const questionAt = (cat: string, row: number, variants: Record<string, string>): Question => {
  const tier = byId(cat).qs[row - 1];
  return tier.find((q) => q.key === variants[`${cat}-${row}`]) ?? tier[0];
};

const ATTEMPTS = 60;

/**
 * Draws one question per tier for each drafted category, keyed `${cat}-${row}`.
 *
 * Two rules, in order:
 * 1. No clashes — two questions from the same group, or one whose text gives
 *    away another's answer, never share a board.
 * 2. Least recently played first — `lastPlayed` maps a question key to the game
 *    it was last opened in; never-played questions come before everything else,
 *    so a tier with six questions cycles through all six before any repeats.
 *
 * Both are met by a randomised greedy pass, repeated a few times and keeping the
 * best board — cheap, and six tiers leave little room for a greedy pass to miss.
 */
export const drawVariants = (drafted: string[], lastPlayed: Record<string, number>): Record<string, string> => {
  const picks: Record<string, string> = {};
  for (const id of drafted) {
    const cat = byId(id);
    let best: { keys: string[]; clashes: number; age: number } | null = null;

    for (let n = 0; n < ATTEMPTS; n++) {
      const keys: string[] = [];
      let clashes = 0;
      let age = 0;
      // Tiers in random order, so no tier always gets first choice.
      const order = cat.qs.map((_, i) => i).sort(() => Math.random() - 0.5);
      for (const t of order) {
        const ranked = cat.qs[t]
          .map((q) => ({ q, played: lastPlayed[q.key] ?? -1, r: Math.random() }))
          .sort((a, b) => a.played - b.played || a.r - b.r);
        const clean = ranked.find(({ q }) => !keys.some((k) => cat.clash[q.key]?.includes(k)));
        const pick = clean ?? ranked[0];
        if (!clean) clashes++;
        age += pick.played;
        keys[t] = pick.q.key;
      }
      if (!best || clashes < best.clashes || (clashes === best.clashes && age < best.age)) {
        best = { keys, clashes, age };
      }
      if (best.clashes === 0 && best.age === -cat.qs.length) break; // all fresh, no clashes
    }

    best!.keys.forEach((key, t) => {
      picks[`${id}-${t + 1}`] = key;
    });
  }
  return picks;
};
