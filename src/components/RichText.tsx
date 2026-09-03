import { Fragment } from 'react';
import { MARKUP_TOKEN } from '../game/markup';

/**
 * Renders the inline markup question packs are written in — bold for the
 * emphasis a host leans on when reading aloud, italics for the titles of films,
 * songs and series. Anything else passes through as plain text, so a question
 * written without markup renders exactly as it always did.
 *
 * `strong` is set heavier than whatever it sits inside rather than pinned to a
 * weight, so the same component works in the 21px lead and the 54px question.
 */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text
        .split(MARKUP_TOKEN)
        .filter((part) => part.length > 0)
        .map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={i} style={{ fontWeight: 'bolder' }}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i}>{part.slice(1, -1)}</em>;
          }
          return <Fragment key={i}>{part}</Fragment>;
        })}
    </>
  );
}
