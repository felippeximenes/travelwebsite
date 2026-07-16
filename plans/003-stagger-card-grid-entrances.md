# 003 — Stagger destination and trip card entrances

- **Status**: TODO
- **Commit**: 313ecfc
- **Severity**: LOW
- **Category**: Cohesion (missed opportunity — group entrance stagger)
- **Estimated scope**: 1 file (`style.css`), ~20 lines added/changed across 2 grids

## Problem

```css
/* style.css:525-529 — current: whole grid is itself a .hidden/.show target */
.destination_grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.75rem;
}
```

```html
<!-- index.html:95 — the grid carries hidden, not the individual cards -->
<div class="destination_grid hidden">
    <div class="destination_card">...</div>  <!-- ×4, index.html:96-126 -->
```

```css
/* style.css:616-621 — same pattern for trip */
.trip_grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.75rem;
    margin: 3.5rem 0;
}
```

```html
<!-- index.html:137 -->
<div class="trip_grid hidden">
    <div class="trip_card">...</div>  <!-- ×3, index.html:138-170 -->
```

Both grids reveal via the generic `.hidden`/`.show` pair (`style.css:907-919`, or 907-912/914-919 with 350ms exit after plan 002) applied to the **container**. All 4 destination cards / 3 trip cards fade and rise as one rigid, synchronized block — a multi-item grid arriving as a single mass reads as mechanical rather than considered. `AUDIT.md` §7 names this pattern directly: "list/grid entrances with no stagger."

This plan is **scoped to `destination_grid` and `trip_grid` only**. The third grid found in the same sweep, `.image_gallary` (`style.css:733-737`), is deliberately excluded: it is not itself a `.hidden`/`.show` target — its ancestor `.gallary_container` (which also wraps unrelated text content, `index.html:180-203`) is — so isolating just the images without restructuring the reveal target is out of scope for this plan.

## Target

Four pieces, in this order. Read all four before editing — they interact.

**1. Stop the grid container from animating itself** (prevents double-motion once cards animate independently):

```css
/* style.css — add immediately after the .destination_grid rule (currently ending line 529) */
.destination_grid.hidden,
.trip_grid.hidden {
    opacity: 1;
    filter: none;
    transform: none;
}
```

**2. Give cards their own initial (pre-entrance) state**, added to the existing base rules — extend the `transition` list, don't replace it:

```css
/* style.css:531-539 — current */
.destination_card {
    overflow: hidden;
    position: relative;
    isolation: isolate;
    border-radius: var(--radius-lg);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    transition: box-shadow var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out);
}
```

```css
/* style.css:531-539 — target */
.destination_card {
    overflow: hidden;
    position: relative;
    isolation: isolate;
    border-radius: var(--radius-lg);
    cursor: pointer;
    box-shadow: var(--shadow-sm);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 250ms var(--ease-out), box-shadow var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out);
}
```

```css
/* style.css:623-629 — current */
.trip_card {
    border-radius: var(--radius-lg);
    overflow: hidden;
    background-color: var(--extra-light);
    box-shadow: var(--shadow-sm);
    transition: transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out);
}
```

```css
/* style.css:623-629 — target */
.trip_card {
    border-radius: var(--radius-lg);
    overflow: hidden;
    background-color: var(--extra-light);
    box-shadow: var(--shadow-sm);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 250ms var(--ease-out), transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out);
}
```

This makes 250ms-no-delay the **default/exit** speed for opacity (fast, matches plan 002's exit philosophy) while `transform`/`box-shadow` keep their existing `var(--dur-slow)` (300ms, no delay) — unchanged from today, so the existing hover-lift still feels exactly as it does now whenever the grid isn't `.show`.

**3. Add the entrance rule with per-card stagger**, inserted as new rules directly after the base `.destination_card` / `.trip_card` rules from step 2 (i.e. **before** the existing `@media (hover: hover)` blocks that follow them):

```css
/* style.css — new, insert after the .destination_card rule (after step 2's edit) */
.destination_grid.show .destination_card {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 400ms var(--ease-out), transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out);
}

.destination_grid.show .destination_card:nth-child(2) { transition-delay: 40ms, 0ms, 0ms; }
.destination_grid.show .destination_card:nth-child(3) { transition-delay: 80ms, 0ms, 0ms; }
.destination_grid.show .destination_card:nth-child(4) { transition-delay: 120ms, 0ms, 0ms; }
```

```css
/* style.css — new, insert after the .trip_card rule (after step 2's edit) */
.trip_grid.show .trip_card {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 400ms var(--ease-out), transform var(--dur-slow) var(--ease-out), box-shadow var(--dur-slow) var(--ease-out);
}

.trip_grid.show .trip_card:nth-child(2) { transition-delay: 40ms, 0ms, 0ms; }
.trip_grid.show .trip_card:nth-child(3) { transition-delay: 80ms, 0ms, 0ms; }
```

`transition-delay` takes a comma-separated list that maps **positionally** to the `transition` property list declared immediately above it (`opacity, transform, box-shadow`). Writing `40ms, 0ms, 0ms` delays only `opacity` by 40ms and keeps `transform`/`box-shadow` at 0ms delay — this is what produces "cards pop in one after another via fade while quietly rising in sync," and it's also why `:hover`/`:active` (step 4) are safe to leave alone on `transform`/`box-shadow` timing: their delay stays 0 regardless of which card.

`:nth-child(1)` needs no explicit rule — 0ms is already the default (no `transition-delay` declared = `0s`).

**4. Re-declare `:hover`/`:active` at matching specificity so they keep winning once the grid is `.show`.** This is the critical, easy-to-miss step: `.destination_grid.show .destination_card` (3 classes → specificity 0,3,0) is now *more specific* than the existing `.destination_card:hover` (1 class + 1 pseudo-class → 0,2,0) at `style.css:556-565` and `.destination_card:active` (0,2,0) at `style.css:567-569` — without this step, hovering/pressing a card **after** it has revealed would silently stop lifting/scaling, because the higher-specificity `.show` rule's `transform: translateY(0)` would win over hover's `translateY(-4px)`.

Add these **new** rules (don't delete or edit the originals — they still correctly handle the pre-reveal state):

```css
/* style.css — new, insert right after the .destination_grid.show .destination_card block from step 3 */
@media (hover: hover) and (pointer: fine) {
    .destination_grid.show .destination_card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-4px);
    }
}

.destination_grid.show .destination_card:active {
    transform: scale(0.98);
}
```

```css
/* style.css — new, insert right after the .trip_grid.show .trip_card block from step 3 */
@media (hover: hover) and (pointer: fine) {
    .trip_grid.show .trip_card:hover {
        transform: translateY(-6px);
        box-shadow: var(--shadow-lg);
    }
}

.trip_grid.show .trip_card:active {
    transform: scale(0.985);
}
```

(Values copied verbatim from the existing `.destination_card:hover`/`:active` at `style.css:556-569` and `.trip_card:hover`/`:active` at `style.css:637-650` — do not invent new hover/active values.)

## Repo conventions to follow

- Easing token: `var(--ease-out)` for all entrance values (`style.css:27`). Duration token: `var(--dur-slow)` (`style.css:32`, 300ms) for anything that must match the existing hover-lift cadence.
- Stagger delay step: 40ms, inside the repo-established 30-80ms/item range already used as the target value in `plans/001` and the `find-animation-opportunities` report — do not invent a different step size.
- `transition-delay`'s positional-list behavior (mapping to the `transition` shorthand's property order) is the mechanism that makes this asymmetric-safe without JavaScript — this is the same "browser resolves the transition from the destination rule" mechanic already exploited by the base `.hidden`/`.show` pair (see `plans/002`), just applied per-property instead of per-rule.
- Exemplar for gating hover behind `(hover: hover) and (pointer: fine)`: every existing hover rule in this file does this already (e.g. `style.css:556`, `637`) — the new hover overrides in step 4 must be gated the same way.

## Steps

1. In `style.css`, immediately after the `.destination_grid` rule (ends around line 529), insert the two-selector neutralizer rule from Target step 1 (`.destination_grid.hidden, .trip_grid.hidden { ... }`). Do this once — it covers both grids.
2. In `style.css`, edit the base `.destination_card` rule (currently lines 531-539) to match Target step 2: add `opacity: 0; transform: translateY(20px);` and extend the `transition` line to include `opacity 250ms var(--ease-out)` alongside the existing two properties.
3. Immediately after the edited `.destination_card` rule and **before** the existing `.destination_card img` rule, insert the `.destination_grid.show .destination_card` block and its three `:nth-child` delay overrides from Target step 3.
4. Immediately after that, insert the `@media (hover: hover)` hover override and the `:active` override for destination cards from Target step 4.
5. Repeat steps 2-4 for `.trip_card` (currently lines 623-629), using the trip-specific values (2 delay overrides for 3 cards, `translateY(-6px)`/`scale(0.985)` hover/active values).
6. Do not touch `.gallary_col`, `.image_gallary`, or `.gallary_container` — out of scope per Problem.

## Boundaries

- Do NOT touch `index.html` or `script.js` — this is CSS-only, the existing `IntersectionObserver` already toggles `.show` on the grid containers.
- Do NOT edit or delete the original `.destination_card:hover`/`:active` (`style.css:556-569`) or `.trip_card:hover`/`:active` (`style.css:637-650`) rules — add new higher-specificity ones alongside them per step 4.
- Do NOT change the stagger step size (40ms) or the entrance duration (400ms) — these are picked to stay under the 300ms *individual property* budget is not strictly required here since this is marketing/explanatory-tier content (`AUDIT.md` §2), but do not exceed 400ms per item.
- Do NOT apply this pattern to `.image_gallary`/`.gallary_col` — explicitly out of scope, see Problem.
- If the cited line numbers or selectors have drifted from the excerpts above, STOP and report instead of guessing where to insert.

## Verification

- **Mechanical**: open `index.html` directly in a browser. Confirm no console errors.
- **Feel check**:
  - Scroll the destination grid into view: confirm the 4 cards fade in with a visible one-after-another cadence (not perfectly simultaneous), while all 4 rise (translateY) together in sync.
  - Scroll the trip grid into view: same check for its 3 cards.
  - After a grid has revealed, hover each card: confirm the lift/shadow (`destination_card`) or lift/shadow (`trip_card`) still triggers normally, at the same speed it did before this plan — this is the specificity check from step 4. If hover feels dead or delayed after reveal, step 4 was skipped or done wrong.
  - Press (`:active`) a card after reveal: confirm the press-scale still triggers.
  - Scroll a grid out of view and back up quickly, repeat 2-3 times: confirm cards don't accumulate stale `transition-delay` (i.e. re-entering always restarts the stagger from card 1, not offset by leftover state).
  - In DevTools Animations panel, set playback to 10% on the destination grid's entrance: confirm card 1 starts immediately, card 2 ~40ms later, card 3 ~80ms later, card 4 ~120ms later, and all 4 finish rising at the same moment (transform has no delay).
  - Toggle `prefers-reduced-motion`: stagger delays and movement should collapse per the existing global rule (`style.css:1073-1087`, or its refined version from plan 004).
- **Done when**: both grids show a visible per-card stagger on entrance, hover/press feedback is unchanged after reveal, and exiting/re-entering the viewport never leaves cards visually stuck mid-stagger.
