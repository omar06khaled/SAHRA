import { findClashes, hash, type Category, type Question } from './packFormat';

/**
 * The family's own questions, written on the device before a game and kept
 * across games so the pack grows over time. Once there are enough for every
 * tier they become the 3eiltak category, drafted like any other.
 */
const KEY = 'sahra.family.v1';

export const FAMILY_ID = 'family';
export const FAMILY_MIN = 6;
export const LEVELS = ['Sahla', 'Wasat', 'Sa3ba'] as const;

export interface FamilyEntry {
  key: string;
  by: string;
  /** Index into LEVELS. */
  level: number;
  q: string;
  a: string;
}

export function loadFamily(): FamilyEntry[] {
  try {
    const entries = JSON.parse(localStorage.getItem(KEY) ?? '[]') as FamilyEntry[];
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

export function saveFamily(entries: FamilyEntry[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries));
  } catch {
    // storage unavailable — the questions still play this session, they just won't be kept
  }
}

export function newEntry(by: string, level: number, q: string, a: string): FamilyEntry {
  return { key: hash(`family|${by}|${q}|${a}`), by, level, q, a };
}

/**
 * Easiest first, cut into six near-equal runs, one per tier. A level the family
 * wrote too few of simply lends its neighbours' questions to that tier, so any
 * mix of six or more fills the board.
 */
export function familyCategory(entries: FamilyEntry[]): Category | null {
  if (entries.length < FAMILY_MIN) return null;
  const sorted = [...entries].sort((x, y) => x.level - y.level);
  const qs: Question[][] = Array.from({ length: 6 }, (_, t) =>
    sorted
      .slice(Math.round((t * sorted.length) / 6), Math.round(((t + 1) * sorted.length) / 6))
      .map((e) => ({ key: e.key, q: e.q, a: e.a, by: e.by })),
  );
  const cat: Category = { id: FAMILY_ID, title: '3eiltak', sub: 'Your family, your questions', ink: 3, qs, clash: {} };
  cat.clash = findClashes(cat, () => {});
  return cat;
}
