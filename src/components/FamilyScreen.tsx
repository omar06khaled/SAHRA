import { useState, type CSSProperties, type ReactNode } from 'react';
import { FAMILY_MIN, LEVELS, familyCategory, loadFamily, newEntry, saveFamily, type FamilyEntry } from '../game/familyPack';
import { setFamilyCategory } from '../game/pool';
import { INK, INKS, PAPER, headerLabel } from '../game/theme';
import { HeaderMark } from './HeaderMark';

interface FamilyScreenProps {
  /** Everyone on the team sheet, offered as one-tap author names. */
  players: string[];
  onBack: () => void;
  onNext: () => void;
}

type Mode = 'list' | 'write' | 'pass';

const GOLD = INKS[3];

const mono: CSSProperties = {
  font: "500 10px 'IBM Plex Mono', monospace",
  letterSpacing: '.16em',
  textTransform: 'uppercase',
};

const fieldLabel: CSSProperties = { ...mono, fontSize: 9.5, letterSpacing: '.2em', color: '#8c8376' };

const input: CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  border: 'none',
  borderBottom: `2px solid ${GOLD.c}`,
  background: 'transparent',
  fontFamily: 'Archivo, sans-serif',
  fontSize: 22,
  color: INK,
  padding: '4px 0 6px',
  resize: 'none',
};

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: '7px 14px',
        border: `1px solid ${on ? INK : 'rgba(30,27,24,.3)'}`,
        background: on ? INK : 'transparent',
        color: on ? '#f8f6f1' : INK,
        fontFamily: 'Archivo, sans-serif',
        fontWeight: on ? 700 : 400,
        fontSize: 16,
        whiteSpace: 'nowrap',
      }}
    >
      {on ? `✓ ${children}` : children}
    </div>
  );
}

function Button({ primary, disabled, onClick, children }: { primary?: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  if (!primary) {
    return (
      <div onClick={onClick} style={{ ...mono, fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap', color: '#7d7365' }}>
        {children}
      </div>
    );
  }
  return (
    <div
      onClick={disabled ? undefined : onClick}
      style={{
        cursor: disabled ? 'default' : 'pointer',
        height: 56,
        padding: '0 28px',
        display: 'flex',
        alignItems: 'center',
        background: disabled ? '#e8e4da' : INK,
        fontFamily: 'Archivo, sans-serif',
        fontWeight: 700,
        fontSize: 19,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        color: disabled ? '#b3aa9c' : '#f8f6f1',
      }}
    >
      {children}
    </div>
  );
}

export function FamilyScreen({ players, onBack, onNext }: FamilyScreenProps) {
  const [entries, setEntries] = useState<FamilyEntry[]>(loadFamily);
  const [mode, setMode] = useState<Mode>('list');
  const [shown, setShown] = useState<string | null>(null);
  const [by, setBy] = useState('');
  const [level, setLevel] = useState(0);
  const [q, setQ] = useState('');
  const [a, setA] = useState('');

  const update = (next: FamilyEntry[]) => {
    setEntries(next);
    saveFamily(next);
    setFamilyCategory(familyCategory(next));
  };

  const startWriting = () => {
    setBy('');
    setLevel(0);
    setQ('');
    setA('');
    setShown(null);
    setMode('write');
  };

  const canSave = by.trim() && q.trim() && a.trim();
  const save = () => {
    update([...entries, newEntry(by.trim(), level, q.trim(), a.trim())]);
    setMode('pass');
  };

  const remove = (e: FamilyEntry) => {
    if (window.confirm(`Delete ${e.by}'s question? This can't be undone.`)) update(entries.filter((x) => x.key !== e.key));
  };

  const missing = Math.max(0, FAMILY_MIN - entries.length);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        boxSizing: 'border-box',
        padding: '34px 40px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        animation: 'sahraIn .32s ease both',
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
          <div style={{ ...headerLabel, paddingBottom: 2 }}>3eiltak · your family's questions</div>
        </HeaderMark>
        <div style={headerLabel}>
          {missing ? `${entries.length} written · ${missing} more to play it` : `${entries.length} written · ready to draft`}
        </div>
      </div>

      {mode === 'pass' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
          <div style={{ fontFamily: 'Archivo, sans-serif', fontVariationSettings: "'wdth' 112", fontWeight: 700, fontSize: 56, color: INK }}>
            Edy el telephone lel ba3do
          </div>
          <div style={{ ...mono, color: '#8c8376' }}>Saved and hidden · nobody else can see it</div>
          <Button primary onClick={() => setMode('list')}>
            Tamam
          </Button>
        </div>
      )}

      {mode === 'write' && (
        <>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24, overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={fieldLabel}>Meen beyekteb?</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {players.map((p) => (
                  <Chip key={p} on={by === p} onClick={() => setBy(p)}>
                    {p}
                  </Chip>
                ))}
              </div>
              <input value={by} onChange={(e) => setBy(e.target.value)} placeholder="Or type your name" style={{ ...input, fontSize: 19 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={fieldLabel}>El so2al</div>
              <textarea value={q} onChange={(e) => setQ(e.target.value)} rows={2} placeholder="Meen fina sa2at fel ru5sa 3 marrat?" style={input} />
            </div>
            <div style={{ display: 'flex', gap: 40 }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                <div style={fieldLabel}>El egaba</div>
                <input value={a} onChange={(e) => setA(e.target.value)} style={input} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <div style={fieldLabel}>Sa3ba ad eh?</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {LEVELS.map((l, i) => (
                    <Chip key={l} on={level === i} onClick={() => setLevel(i)}>
                      {l}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Footer>
            <Button onClick={() => setMode('list')}>← Cancel</Button>
            <Button primary disabled={!canSave} onClick={save}>
              Save and hide
            </Button>
          </Footer>
        </>
      )}

      {mode === 'list' && (
        <>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
            <div style={{ fontFamily: 'Archivo, sans-serif', fontSize: 19, lineHeight: 1.4, color: '#6b6357', maxWidth: 900 }}>
              Kol wa7ed yekteb so2al 3an el 3eila w yedy el telephone lel ba3do. The questions become a 3eiltak category
              in the draft once there are at least {FAMILY_MIN}, and they're kept for next time. Whoever wrote a question
              sits it out.
            </div>
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', background: PAPER, border: '1px solid rgba(30,27,24,.18)' }}>
              {entries.length === 0 && <div style={{ ...mono, color: '#a89f91', padding: 18 }}>No questions yet</div>}
              {entries.map((e) => (
                <div key={e.key} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '10px 18px', borderBottom: '1px solid rgba(30,27,24,.1)' }}>
                  <div style={{ fontFamily: 'Archivo, sans-serif', fontWeight: 600, fontSize: 17, width: 170, flex: 'none' }}>{e.by}</div>
                  <div style={{ ...mono, color: GOLD.num, width: 70, flex: 'none' }}>{LEVELS[e.level]}</div>
                  <div style={{ flex: 1, minWidth: 0, fontFamily: 'Archivo, sans-serif', fontSize: 16, color: '#6b6357' }}>
                    {shown === e.key ? `${e.q} → ${e.a}` : 'Hidden'}
                  </div>
                  <Button onClick={() => setShown(shown === e.key ? null : e.key)}>{shown === e.key ? 'Hide' : 'Show'}</Button>
                  <Button onClick={() => remove(e)}>Delete</Button>
                </div>
              ))}
            </div>
          </div>
          <Footer>
            <Button onClick={onBack}>← Back</Button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
              <Button onClick={startWriting}>+ Add a question</Button>
              <Button primary onClick={onNext}>
                {missing ? 'Skip · draft the categories' : 'Draft the categories'}
              </Button>
            </div>
          </Footer>
        </>
      )}
    </div>
  );
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(30,27,24,.2)',
        paddingTop: 14,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </div>
  );
}
