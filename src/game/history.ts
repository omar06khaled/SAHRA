/**
 * Which questions this device has already played, so the next board prefers
 * ones the family hasn't seen. Kept apart from the saved game: the saved game
 * is cleared at the end of every game, this carries across them.
 *
 * `game` counts boards opened; `played` maps a question key to the game it was
 * last opened in. A question counts as played once its tile is opened — tiles
 * that were drawn but never picked stay fresh for next time.
 */
const KEY = 'sahra.history.v1';

interface History {
  game: number;
  played: Record<string, number>;
}

function load(): History {
  try {
    const h = JSON.parse(localStorage.getItem(KEY) ?? '') as History;
    if (h && typeof h.game === 'number' && h.played) return h;
  } catch {
    // missing or unreadable — start fresh
  }
  return { game: 0, played: {} };
}

function save(h: History): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(h));
  } catch {
    // storage unavailable — every board just draws as if nothing was played
  }
}

/** Starts a new game's count and returns what has been played before it. */
export function startGame(): Record<string, number> {
  const h = load();
  h.game += 1;
  save(h);
  return h.played;
}

/** Records that a question was opened in the current game. */
export function markPlayed(key: string): void {
  const h = load();
  h.played[key] = h.game;
  save(h);
}
