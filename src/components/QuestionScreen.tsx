import type { CSSProperties } from 'react';
import { INK, LIFELINES, PAPER, TEAM_C, TIMER_SECONDS, fmt } from '../game/theme';
import { questionLifelineMode } from '../game/lifelines';
import type { InkSet } from '../game/theme';
import type { Award, DerivedGame, TeamIndex } from '../game/types';
import { Coupon } from './Coupon';
import { HoverButton } from './HoverButton';

interface QuestionScreenProps {
  phase: 'question' | 'reveal';
  categoryTitle: string;
  categoryInk: InkSet;
  row: number;
  question: string;
  answer: string;
  turn: TeamIndex;
  derived: DerivedGame;
  secLeft: number;
  phoneLeft: number;
  phoneUntil: number;
  canUndo: boolean;
  teamName: (ti: TeamIndex) => string;
  onSpendLifeline: (key: (typeof LIFELINES)[number]['key']) => void;
  onReveal: () => void;
  onResolve: (award: Award) => void;
  onUndo: () => void;
  onEndPhone: () => void;
}

function Plate({
  label,
  ink,
  size,
  valueLabel,
  bg,
  onClick,
}: {
  label: string;
  ink: string;
  size: number;
  valueLabel?: string;
  bg: CSSProperties;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        height: 56,
        padding: '0 22px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        transition: 'background .25s ease',
        ...bg,
      }}
    >
      <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: size, letterSpacing: '.07em', textTransform: 'uppercase', color: ink, whiteSpace: 'nowrap' }}>
        {label}
      </span>
      {valueLabel && (
        <span style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 19, color: ink }}>{valueLabel}</span>
      )}
    </div>
  );
}

export function QuestionScreen({
  phase,
  categoryTitle,
  categoryInk,
  row,
  question,
  answer,
  turn,
  derived,
  secLeft,
  phoneLeft,
  phoneUntil,
  canUndo,
  teamName,
  onSpendLifeline,
  onReveal,
  onResolve,
  onUndo,
  onEndPhone,
}: QuestionScreenProps) {
  const base = row * 100;
  const dblLL = derived.activeLL && derived.activeLL.key === 'double' ? derived.activeLL : null;
  const doubled = !!dblLL;
  const qValue = doubled ? base * 2 : base;
  const qSize = question.length > 96 ? 44 : 54;
  const showAnswer = phase === 'reveal';
  const urgent = secLeft <= 10;
  const timerPct = Math.max(0, Math.min(100, (secLeft / TIMER_SECONDS) * 100));
  const phoneOn = !!phoneUntil;
  const onQuestion = phase === 'question';

  const valueFor = (ti: TeamIndex) => `+${fmt(doubled && dblLL!.team === ti ? base * 2 : base)}`;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        padding: '34px 56px 30px',
        display: 'flex',
        flexDirection: 'column',
        animation: 'sahraFade .34s ease both',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', flex: 'none', background: categoryInk.c }}>
            <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 15, letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#fff' }}>
              {categoryTitle}
            </span>
          </div>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 34, lineHeight: 1, color: categoryInk.num }}>
            {qValue}
          </div>
          {doubled && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: INK, padding: '6px 12px 7px', animation: 'sahraIn .28s ease both' }}>
              <span style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 18, lineHeight: 1, color: '#f8f6f1' }}>×2</span>
              <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: 'rgba(248,246,241,.72)' }}>
                {teamName(dblLL!.team)}
              </span>
            </div>
          )}
        </div>
        <div style={{ font: "500 10.5px 'IBM Plex Mono', monospace", letterSpacing: '.18em', textTransform: 'uppercase', color: '#7d7365' }}>
          {teamName(turn)} to answer
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 34, padding: '12px 0' }}>
        <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: qSize, lineHeight: 1.14, letterSpacing: '-.01em', maxWidth: 1000, textWrap: 'pretty' } as CSSProperties}>
          {question}
        </div>
        {showAnswer && (
          <div
            style={{
              alignSelf: 'flex-start',
              width: 'max-content',
              maxWidth: 920,
              boxSizing: 'border-box',
              padding: '18px 26px 20px',
              background: categoryInk.tint,
              borderLeft: `4px solid ${categoryInk.c}`,
              animation: 'sahraIn .3s ease both',
            }}
          >
            <div style={{ font: "500 9.5px 'IBM Plex Mono', monospace", letterSpacing: '.2em', textTransform: 'uppercase', color: '#8c8376', marginBottom: 8 }}>Answer</div>
            <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 37, lineHeight: 1.1, whiteSpace: 'nowrap', color: categoryInk.num }}>{answer}</div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {!phoneOn && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ font: "500 9.5px 'IBM Plex Mono', monospace", letterSpacing: '.2em', textTransform: 'uppercase', color: '#8c8376' }}>Time</div>
            <div style={{ flex: 1, height: 3, background: 'rgba(30,27,24,.12)', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  transition: 'width .4s linear, background .4s ease',
                  width: `${timerPct}%`,
                  background: urgent ? '#b3402f' : 'rgba(30,27,24,.55)',
                }}
              />
            </div>
            <div style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 28, lineHeight: 1, width: 52, textAlign: 'right', color: urgent ? '#b3402f' : INK }}>
              {secLeft}
            </div>
          </div>
        )}

        <div style={{ borderTop: `2px solid ${INK}`, paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ font: "500 11px 'IBM Plex Mono', monospace", letterSpacing: '.14em', textTransform: 'uppercase', color: '#8a8175', whiteSpace: 'nowrap' }}>{teamName(turn)}</div>
            <div style={{ display: 'flex', gap: 7 }}>
              {LIFELINES.map((l) => (
                <Coupon
                  key={l.key}
                  teamIndex={turn}
                  label={l.label}
                  mode={questionLifelineMode(derived, turn, l.key, onQuestion)}
                  onClick={() => onSpendLifeline(l.key)}
                />
              ))}
            </div>
            <div
              onClick={canUndo ? onUndo : undefined}
              style={{
                height: 38,
                boxSizing: 'border-box',
                padding: '0 12px',
                display: 'flex',
                alignItems: 'center',
                border: `1px dashed rgba(30,27,24,${canUndo ? '.32' : '.14'})`,
                cursor: canUndo ? 'pointer' : 'default',
              }}
            >
              <span style={{ font: "500 10px 'IBM Plex Mono', monospace", letterSpacing: '.14em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: canUndo ? '#7d7365' : '#c4bdb0' }}>
                {canUndo ? '↶ Undo' : 'Nothing to undo'}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {phase === 'question' ? (
              <Plate label="Reveal the answer" ink="#f8f6f1" size={17} bg={{ background: INK }} onClick={onReveal} />
            ) : (
              <>
                <Plate label={teamName(0)} ink="#fff" size={16} valueLabel={valueFor(0)} bg={{ background: TEAM_C[0] }} onClick={() => onResolve(0)} />
                <Plate label="No one" ink={INK} size={15} bg={{ background: PAPER, border: '1.5px solid rgba(30,27,24,.45)' }} onClick={() => onResolve(-1)} />
                <Plate label={teamName(1)} ink="#fff" size={16} valueLabel={valueFor(1)} bg={{ background: TEAM_C[1] }} onClick={() => onResolve(1)} />
              </>
            )}
          </div>
        </div>
      </div>

      {phoneOn && (
        <PhoneOverlay
          team={(derived.activeLL && derived.activeLL.key === 's3d' ? derived.activeLL.team : turn) as TeamIndex}
          teamName={teamName}
          phoneLeft={phoneLeft}
          onEndPhone={onEndPhone}
          onUndo={onUndo}
        />
      )}
    </div>
  );
}

function PhoneOverlay({
  team,
  teamName,
  phoneLeft,
  onEndPhone,
  onUndo,
}: {
  team: TeamIndex;
  teamName: (ti: TeamIndex) => string;
  phoneLeft: number;
  onEndPhone: () => void;
  onUndo: () => void;
}) {
  const ink = TEAM_C[team];
  const deg = (phoneLeft / 120) * 360;
  const clock = `${Math.floor(phoneLeft / 60)}:${String(phoneLeft % 60).padStart(2, '0')}`;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 4,
        background: 'rgba(250,248,243,.97)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 26,
        animation: 'sahraFade .22s ease both',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{ font: "500 11px 'IBM Plex Mono', monospace", letterSpacing: '.26em', textTransform: 'uppercase', color: '#8c8376' }}>Sa3douni · phone a friend</div>
        <div style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 30, lineHeight: 1, letterSpacing: '.02em', textTransform: 'uppercase', color: ink }}>
          {teamName(team)} is on the phone
        </div>
      </div>
      <div
        style={{
          width: 340,
          height: 340,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `conic-gradient(${ink} 0deg ${deg.toFixed(1)}deg, rgba(30,27,24,.10) ${deg.toFixed(1)}deg 360deg)`,
        }}
      >
        <div style={{ width: 284, height: 284, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: PAPER }}>
          <span style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 96, lineHeight: 1, letterSpacing: '-.02em', fontVariantNumeric: 'tabular-nums', color: ink }}>
            {clock}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <HoverButton bg="#1e1b18" hoverBg="#332e28" padding="0 26px" onClick={onEndPhone}>
          <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: '#f8f6f1' }}>
            They answered — end call
          </span>
        </HoverButton>
        <HoverButton bg={PAPER} hoverBg="#f1eee5" border="1.5px solid rgba(30,27,24,.45)" padding="0 22px" onClick={onUndo}>
          <span style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 700, fontSize: 14, letterSpacing: '.07em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: INK }}>
            Cancel, give it back
          </span>
        </HoverButton>
      </div>
    </div>
  );
}
