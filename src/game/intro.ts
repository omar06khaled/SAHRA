import { ease } from './theme';

export const MARKS = (() => {
  const a = 1500; // word floats between the closing lines
  const b = 220; // lines clamp shut on the word
  const c = 430; // merged line extends edge to edge
  const d = 1050; // line sweeps down like a curtain, revealing team sheet
  return { a, b, c, d, m1: a, m2: a + b, m3: a + b + c, m4: a + b + c + d };
})();

// Measured for Archivo 700 wdth 112 @224px / line-height .8: line box 179.2,
// baseline 164.6 from box top, cap ink 157 up and 3 down → ink 160 tall, centre 87.6.
const WORD_INK_BOX = { height: 160, originY: 87.6 };

export interface IntroGeometry {
  topLineTop: number;
  bottomLineTop: number;
  lineWidth: number;
  lineOpacity: number;
  wordTop: number;
  wordOriginY: number;
  wordScaleY: number;
  wordOpacity: number;
  wordVisible: boolean;
  skipVisible: boolean;
}

export function introGeometry(rawT: number): IntroGeometry {
  const t = Math.min(rawT, MARKS.m4);
  let gap: number;
  let lineWidth = 880;
  let lineY = 360;

  if (t < MARKS.m1) {
    gap = 380 + (150 - 380) * ease.out(t / MARKS.m1);
  } else if (t < MARKS.m2) {
    gap = 150 * (1 - ease.inQuart((t - MARKS.m1) / MARKS.b));
  } else {
    gap = 0;
  }

  let wordScaleY = Math.min(1, Math.max(0, (gap - 6) / WORD_INK_BOX.height));
  if (t >= MARKS.m2) wordScaleY = 0;

  if (t >= MARKS.m2 && t < MARKS.m3) {
    const p = ease.outCubic((t - MARKS.m2) / MARKS.c);
    lineWidth = 880 + 400 * p;
    lineY = 360 - 360 * p;
  } else if (t >= MARKS.m3) {
    lineWidth = 1280;
    lineY = 790 * ease.inOutCubic(Math.min(1, (t - MARKS.m3) / MARKS.d));
  }

  const fade = Math.min(1, t / 320);

  return {
    topLineTop: lineY - gap / 2,
    bottomLineTop: lineY + gap / 2 - 3,
    lineWidth,
    lineOpacity: fade,
    wordTop: lineY,
    wordOriginY: WORD_INK_BOX.originY,
    wordScaleY,
    wordOpacity: t >= MARKS.m2 ? 0 : fade,
    wordVisible: t < MARKS.m2,
    skipVisible: t < MARKS.m2,
  };
}
