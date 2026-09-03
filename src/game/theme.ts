import { POOL } from './pool';

import type { CSSProperties } from 'react';

export const PAPER = '#faf8f3';
export const INK = '#1e1b18';
export const PLAYED_FILL = '#f2f1ec';

/** The mono label used for every piece of secondary header text. */
export const headerLabel: CSSProperties = {
  font: "500 10px 'IBM Plex Mono', monospace",
  letterSpacing: '.16em',
  textTransform: 'uppercase',
  color: '#7d7365',
};

export interface InkSet {
  c: string;
  tint: string;
  num: string;
}

export const INKS: InkSet[] = [
  { c: '#b3402f', tint: '#f4e7e2', num: '#8d3324' },
  { c: '#6f7a4b', tint: '#eaece0', num: '#4d5730' },
  { c: '#29486b', tint: '#e2e8ee', num: '#26405b' },
  { c: '#a8811f', tint: '#f2ead6', num: '#725713' },
  { c: '#6a4a5c', tint: '#ece3e7', num: '#513544' },
  { c: '#3f7068', tint: '#e3ebe8', num: '#2b4f49' },
];

export const catInk = (id: string): InkSet => {
  const cat = POOL.find((p) => p.id === id);
  if (!cat) throw new Error(`Unknown category id: ${id}`);
  return INKS[cat.ink];
};

/**
 * Blue/orange — separable under deuteranopia, protanopia and tritanopia alike,
 * unlike the red/green pair this replaces. Both clear 4.5:1 against white, so
 * the 11.5px `Coupon` label passes AA and not just the large team plates.
 * Neither collides with a category ink.
 */
export const TEAM_C: [string, string] = ['#1f5c8b', '#b06414'];

export type LifelineKey = 's3d' | 'fawet' | 'double';

export const LIFELINES: { key: LifelineKey; label: string }[] = [
  { key: 's3d', label: 'SA3DOUNI' },
  { key: 'fawet', label: 'FAWET' },
  { key: 'double', label: 'DOUBLE' },
];

// Cubic/quartic easings used by the intro title animation.
export const ease = {
  out: (p: number) => 1 - Math.pow(1 - p, 2),
  inQuart: (p: number) => p * p * p * p,
  outCubic: (p: number) => 1 - Math.pow(1 - p, 3),
  inOutCubic: (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
};

export const fmt = (n: number): string => n.toLocaleString('en-US');

export const TIMER_SECONDS = 60;
export const SHOW_MEMBERS = true;
export const PHONE_A_FRIEND_MS = 120000;
