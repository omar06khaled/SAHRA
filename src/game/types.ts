import type { LifelineKey } from './theme';

export type TeamIndex = 0 | 1;
export type Award = TeamIndex | -1;
export type Phase = 'intro' | 'teams' | 'draft' | 'board' | 'question' | 'reveal' | 'final';

export interface Team {
  name: string;
  members: [string, string, string, string];
}

export interface LifelineLogEntry {
  t: 'll';
  team: TeamIndex;
  key: LifelineKey;
}

export interface ResolveLogEntry {
  t: 'resolve';
  cat: string;
  row: number;
  by: TeamIndex;
  team: Award;
  amount: number;
  skipped: boolean;
  ll: LifelineKey | null;
}

export type LogEntry = LifelineLogEntry | ResolveLogEntry;

export interface ActiveQuestion {
  cat: string;
  row: number;
}

export interface GameState {
  phase: Phase;
  teams: [Team, Team];
  taken: Record<string, TeamIndex>;
  drafted: string[];
  turn0: number;
  log: LogEntry[];
  active: ActiveQuestion | null;
  hover: string | null;
  deadline: number;
  pausedLeft: number;
  phoneUntil: number;
  frozen: number | null;
  introT: number;
  introDone: boolean;
}

export interface DerivedGame {
  scores: [number, number];
  spent: [Record<LifelineKey, boolean>, Record<LifelineKey, boolean>];
  played: Record<string, 'play' | 'skip'>;
  resolves: number;
  activeLL: LifelineLogEntry | null;
  turn: TeamIndex;
}
