/**
 * The small amount of inline markup question packs are written in: `**bold**`
 * for the emphasis a host leans on when reading aloud, `*italics*` for the
 * titles of films, songs and series. Deliberately just those two, and they do
 * not nest. Rendered by `RichText`.
 */
export const MARKUP_TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*)/;

/** Length with the markup characters removed — for sizing text to fit the stage. */
export const plainLength = (text: string): number => text.replace(/\*/g, '').length;
