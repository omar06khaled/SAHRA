import { POOL, byId } from './pool';
import type { ActiveQuestion, LogEntry, Phase, Team, TeamIndex } from './types';

const KEY = 'sahra.game.v2';
const RESUMABLE_PHASES: Phase[] = ['board', 'question', 'reveal'];
const SAVED_PHASES: Phase[] = ['board', 'question', 'reveal', 'final'];

export interface SavedGame {
  v: 2;
  phase: Phase;
  teams: [Team, Team];
  taken: Record<string, TeamIndex>;
  drafted: string[];
  turn0: number;
  log: LogEntry[];
  active: ActiveQuestion | null;
  variants: Record<string, string>;
  deadline: number;
  pausedLeft: number;
  phoneUntil: number;
}

export function saveGame(s: {
  phase: Phase;
  teams: [Team, Team];
  taken: Record<string, TeamIndex>;
  drafted: string[];
  turn0: number;
  log: LogEntry[];
  active: ActiveQuestion | null;
  variants: Record<string, string>;
  deadline: number;
  pausedLeft: number;
  phoneUntil: number;
}): void {
  if (!SAVED_PHASES.includes(s.phase)) return;
  try {
    const payload: SavedGame = {
      v: 2,
      phase: s.phase,
      teams: s.teams,
      taken: s.taken,
      drafted: s.drafted,
      turn0: s.turn0,
      log: s.log,
      active: s.active,
      variants: s.variants,
      deadline: s.deadline,
      pausedLeft: s.pausedLeft,
      phoneUntil: s.phoneUntil,
    };
    localStorage.setItem(KEY, JSON.stringify(payload));
  } catch {
    // storage unavailable (private mode, quota) — persistence is a nicety, not a requirement
  }
}

export function clearSavedGame(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

export function loadSavedGame(): SavedGame | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const g = JSON.parse(raw) as SavedGame;
    if (!g || g.v !== 2) return null;
    if (!RESUMABLE_PHASES.includes(g.phase)) return null;
    if (!g.drafted || g.drafted.length < 6) return null;
    // A pack removed since the save would leave a board column with no category.
    if (!g.drafted.every((id) => POOL.some((c) => c.id === id))) return null;
    g.variants = migrateVariants(g.variants);
    return g;
  } catch {
    return null;
  }
}

/**
 * Saves from before question keys recorded each tile's draw as an index into the
 * tier. Translate those to keys; anything that no longer resolves is dropped, and
 * `questionAt` falls back to the tier's first question for that tile.
 */
function migrateVariants(variants: Record<string, string | number> | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [tile, v] of Object.entries(variants ?? {})) {
    if (typeof v === 'string') {
      out[tile] = v;
      continue;
    }
    const cut = tile.lastIndexOf('-');
    try {
      const q = byId(tile.slice(0, cut)).qs[Number(tile.slice(cut + 1)) - 1]?.[v];
      if (q) out[tile] = q.key;
    } catch {
      // category no longer exists
    }
  }
  return out;
}
