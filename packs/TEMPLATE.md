---
id: your-id
title: Your Title
sub: One line, shown on the draft tile
ink: 0
---

<!--
SAHRA PACK FORMAT — copy this file, keep the shape, replace the content.

FILES
  One category per file in packs/. Every .md here goes into the game on the next
  build, in filename order (that is the draft-screen order) — so name them
  NN-id.md. Start a filename with _ to park a pack: it stays out of the game.
  The build refuses a malformed pack and names the file and line.

FRONTMATTER (first four required)
  id     lowercase, digits or dashes. Unique.
  title  what shows on the board column and the draft tile.
  sub    one line under the title on the draft tile.
  ink    0 red · 1 olive · 2 blue · 3 gold · 4 plum · 5 teal
  photo  optional. "large" for photo categories (flags, landmarks): the picture
         gets the bigger share of the screen and is never cropped.

TIERS
  Exactly six headings: ## 100 through ## 600. The parser reads the number and
  ignores everything after it, so label them however you like.

QUESTIONS
  Each one starts with ###. Anything after ### is a note to yourself.
  Fields are  **Label:** value  — the whole value on ONE line, no breaks.

  Question   required
  Answer     required. "A / B" lists accepted alternatives.
  Lead       optional — set-up, rendered smaller ABOVE the question
  Photo      optional — /questions/<file>, a file in public/questions/. Outside
             photo categories it must not give the answer away.
  Source     optional — where you verified it. Stored, never shown.
  Group      optional — questions sharing a group never land on the same board.
             Use it for two questions about the same thing.

VARIANTS
  Add more ### blocks under a tier. A board draws one per tier per game, and
  prefers questions this device hasn't played yet — six under every tier means
  roughly six games before anything repeats. Uneven counts are allowed — you
  will just get a note.

SPOILERS
  If one question's text contains another question's answer, the build notices
  and the draw never puts the two on the same board. It only complains when it
  can't avoid it — usually a pack with one question per tier.

MARKUP  (inside Lead, Question, Aside)
  **bold**    emphasis the host leans on when reading aloud
  *italics*   titles of films, songs, series
  Asterisks must be balanced or the import fails.

WRITING
  100 should feel like an invitation; 600 should produce "YA3NI I KNEW THAT",
  not "who would ever know that". Keep the question one breath long — the host
  is reading it aloud to a room.
-->

## 100 — invitation level

###
**Question:** The question, read aloud at display size.
**Answer:** The answer.
**Source:** https://example.com

### a second question at this tier makes it a variant
**Lead:** Optional set-up. Sets the scene so the question can stay short.
**Question:** The question itself.
**Answer:** The answer.
**Source:** https://example.com

## 200 — familiar knowledge

###
**Question:** …
**Answer:** …

## 300 — you need to know the category

###
**Lead:** …
**Question:** …
**Answer:** …
**Group:** same-topic-as-another-question

## 400 — fans separate from casuals

###
**Question:** …
**Answer:** …
**Photo:** /questions/your-id-400.jpg

## 500 — strong category knowledge

###
**Question:** Emphasis works like **this**, and titles like *this*.
**Answer:** …
**Source:** https://example.com

## 600 — enta 3ayesh el mawdoo3

###
**Question:** …
**Answer:** …
**Source:** https://example.com
