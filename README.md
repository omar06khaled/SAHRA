# SAHRA

A pass-and-play, single-device family trivia game for two teams — category draft, a
36-question board, a 60-second question timer, host judging, and three lifelines
(Sa3douni, Fawet, Double).

Built with React, TypeScript and Vite, implementing the "Warm Archive" design
direction: paper background, tinted category tiles, PLAYED/FAWET stamps, Archivo
display type.

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

## Question packs

Every category lives in its own file in `packs/` — see `packs/TEMPLATE.md` for the
format. Drop a file in and build; there is no code to edit. The build checks every
pack (missing fields, bad markup, missing photos) and fails with the file and line.

Each board draws one question per tier, preferring questions not yet played on
this device, and never puts two questions on one board when one gives away the
other's answer or they share a `Group`.

`npm run photos` downloads any missing photo whose Source is a Wikimedia Commons
file (slowly — Wikimedia rate-limits).

## Structure

- `src/game/` — game state, rules and pure helpers (draft, board, timers, the
  append-only score/lifeline log that undo rewinds).
- `src/components/` — one component per screen (Intro, Team sheet, Draft, Board,
  Question, Final) plus shared pieces (`Stage`, `Coupon`, `HoverButton`).

Game progress (once a board is open) is saved to `localStorage` so a refresh
resumes mid-game; team names, drafted categories, scores, played tiles and spent
lifelines all persist together.
