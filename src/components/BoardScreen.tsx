import { Fragment } from 'react';
import { byId } from '../game/pool';
import { INK, LIFELINES, PAPER, PLAYED_FILL, TEAM_C, catInk, fmt, headerLabel } from '../game/theme';
import { benchLifelineMode } from '../game/lifelines';
import type { DerivedGame, TeamIndex } from '../game/types';
import { Coupon } from './Coupon';
import { HeaderMark } from './HeaderMark';
import { UndoButton } from './UndoButton';

interface BoardScreenProps {
  drafted: string[];
  derived: DerivedGame;
  turn: TeamIndex;
  hover: string | null;
  canUndo: boolean;
  teamName: (ti: TeamIndex) => string;
  /** Filled-in member names only — the bench renders its own empty state. */
  roster: (ti: TeamIndex) => string[];
  onHover: (key: string | null) => void;
  onPick: (cat: string, row: number) => void;
  onEndGame: () => void;
  onUndo: () => void;
}

export function BoardScreen({
  drafted,
  derived,
  turn,
  hover,
  canUndo,
  teamName,
  roster,
  onHover,
  onPick,
  onEndGame,
  onUndo,
}: BoardScreenProps) {
  const cols = drafted.slice(0, 6);
  let playedCount = 0;
  cols.forEach((id) => {
    for (let r = 1; r <= 6; r++) if (derived.played[`${id}-${r}`]) playedCount++;
  });
  const nameLen = Math.max(teamName(0).length, teamName(1).length);
  const turnPlateSize = nameLen > 14 ? 34 : nameLen > 10 ? 42 : 50;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        padding: '24px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        animation: 'sahraFade .3s ease both',
      }}
    >
      <div
        style={{
          borderBottom: `2px solid ${INK}`,
          paddingBottom: 10,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <HeaderMark>
          <div style={{ ...headerLabel, paddingBottom: 2 }}>Played {String(playedCount).padStart(2, '0')} / 36</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              type="button"
              onClick={onEndGame}
              style={{
                height: 30,
                boxSizing: 'border-box',
                padding: '0 12px',
                appearance: 'none',
                borderRadius: 0,
                background: 'transparent',
                border: '1px solid rgba(30,27,24,.32)',
                font: "500 10px 'IBM Plex Mono', monospace",
                letterSpacing: '.14em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                color: '#7d7365',
                cursor: 'pointer',
              }}
            >
              End game
            </button>
            <UndoButton canUndo={canUndo} onUndo={onUndo} height={30} />
          </div>
        </HeaderMark>
        <div
          style={{
            height: 76,
            padding: '0 26px',
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            background: TEAM_C[turn],
            marginBottom: -2,
            transition: 'background .3s ease',
          }}
        >
          <span
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontVariationSettings: "'wdth' 112",
              fontWeight: 700,
              fontSize: turnPlateSize,
              lineHeight: 1,
              letterSpacing: '-.005em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              color: '#fff',
            }}
          >
            {teamName(turn)}
          </span>
          <span
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 600,
              fontSize: 15,
              lineHeight: 1.25,
              letterSpacing: '.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.82)',
              maxWidth: 52,
            }}
          >
            to pick
          </span>
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
        {cols.map((id) => {
          const cat = byId(id);
          const ci = catInk(id);
          return (
            <div key={id} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div
                style={{
                  height: 44,
                  flex: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 10px',
                  background: ci.c,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Archivo, sans-serif',
                    fontWeight: 600,
                    fontSize: 18,
                    lineHeight: 1,
                    letterSpacing: '.01em',
                    textTransform: 'uppercase',
                    color: '#fff',
                    textAlign: 'center',
                  }}
                >
                  {cat.title}
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[1, 2, 3, 4, 5, 6].map((r) => {
                  const key = `${id}-${r}`;
                  const mark = derived.played[key];
                  const played = !!mark;
                  const skipped = mark === 'skip';
                  const hot = hover === key && !played;
                  return (
                    <div
                      key={r}
                      onClick={played ? undefined : () => onPick(id, r)}
                      onMouseEnter={played ? undefined : () => onHover(key)}
                      onMouseLeave={played ? undefined : () => onHover(null)}
                      style={{
                        flex: 1,
                        position: 'relative',
                        overflow: 'hidden',
                        boxSizing: 'border-box',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background .2s ease, border-color .2s ease',
                        background: skipped
                          ? 'repeating-linear-gradient(135deg, #efece4 0 5px, #e5e1d7 5px 10px)'
                          : played
                            ? PLAYED_FILL
                            : ci.tint,
                        border: played
                          ? skipped
                            ? '1px dashed rgba(30,27,24,.2)'
                            : '1px solid rgba(30,27,24,.07)'
                          : hot
                            ? `2px solid ${ci.c}`
                            : `1px solid ${ci.c}`,
                        cursor: played ? 'default' : 'pointer',
                      }}
                    >
                      {played && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '-8%',
                            right: '-8%',
                            top: '50%',
                            height: 24,
                            transform: 'translateY(-50%) rotate(-4deg)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: skipped ? '#8c8376' : `color-mix(in srgb, ${ci.c} 52%, ${PLAYED_FILL})`,
                          }}
                        >
                          <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 9.5, letterSpacing: '.18em', color: '#f8f6f1' }}>
                            {skipped ? 'FAWET' : 'PLAYED'}
                          </span>
                        </div>
                      )}
                      {!played && (
                        <span style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 34, lineHeight: 1, color: ci.num }}>
                          {r * 100}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ borderTop: `2px solid ${INK}`, paddingTop: 16, display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 24 }}>
        {([0, 1] as TeamIndex[]).map((ti) => (
          <Fragment key={`bench-${ti}`}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 20,
                flexDirection: ti === 1 ? 'row-reverse' : 'row',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: ti === 1 ? 'flex-end' : 'flex-start', textAlign: ti === 1 ? 'right' : 'left' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <div style={{ width: 14, height: 14, flex: 'none', background: TEAM_C[ti] }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15, lineHeight: 1, letterSpacing: '.09em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#5c5449' }}>
                      {teamName(ti)}
                    </div>
                    {roster(ti).length > 0 ? (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: ti === 1 ? 'flex-end' : 'flex-start' }}>
                        {roster(ti).map((name) => (
                          <span
                            key={name}
                            style={{
                              padding: '3px 8px 4px',
                              background: PAPER,
                              border: `1px solid ${TEAM_C[ti]}`,
                              fontFamily: 'Archivo, sans-serif',
                              fontWeight: 600,
                              fontSize: 11,
                              lineHeight: 1,
                              letterSpacing: '.07em',
                              textTransform: 'uppercase',
                              whiteSpace: 'nowrap',
                              color: '#4a423a',
                            }}
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div style={{ font: "500 10.5px 'IBM Plex Mono', monospace", letterSpacing: '.08em', textTransform: 'uppercase', color: '#b3aa9c', whiteSpace: 'nowrap' }}>
                        No players listed · add them on the team sheet
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 36, lineHeight: 0.9, letterSpacing: '-.005em' }}>
                  {fmt(derived.scores[ti])}
                </div>
              </div>
              {/* Pulled outward, away from the centre divider — mirrored, since team 1's row is reversed. */}
              <div style={{ display: 'flex', gap: 7, marginRight: ti === 0 ? 24 : 0, marginLeft: ti === 1 ? 24 : 0 }}>
                {LIFELINES.map((l) => (
                  <Coupon key={l.key} teamIndex={ti} label={l.label} mode={benchLifelineMode(derived, ti, l.key)} />
                ))}
              </div>
            </div>
            {ti === 0 && <div style={{ width: 1, background: 'repeating-linear-gradient(180deg, #cfc9bd 0 4px, transparent 4px 8px)' }} />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
