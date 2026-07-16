# 004 — Preserve opacity comprehension-fade under reduced motion instead of nuking everything

- **Status**: TODO
- **Commit**: 313ecfc
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 1 file (`style.css`), 1 block added

## Problem

```css
/* style.css:1073-1087 — current */
@media (prefers-reduced-motion: reduce) {

    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
```

This blanket rule forces every `transition-duration` on the page to near-zero for `prefers-reduced-motion: reduce` users, with no exceptions. `AUDIT.md` §6 is explicit about what reduced motion actually means: "Reduced motion means fewer and gentler animations, **not zero** — keep transitions that aid comprehension, remove position changes." The current rule removes position changes correctly (good — the site's earlier fix for the hero tilt bug depends on this exact block still existing) but also strips the `opacity` fade on `.hidden`/`.show` (`style.css:907-919`, the reveal system used across every section after plan 001) down to instant, even though an opacity fade carries no vestibular/motion-sickness risk and exists purely to prevent content from teleporting into view — exactly the kind of transition the guidance says to keep.

Do not "fix" this by removing `transform: none` anywhere — there is no such declaration in the current file, and there must not be one. A previous version of this exact reduced-motion block did include `transform: none !important` targeted at the hero images and it broke their static positioning (the `translate(-75%, -50%)` / `translate(0%, -25%)` values are not decorative, they position the two overlapping photo cards) — that bug was already found and fixed once. This plan only touches `transition-duration`, never `transform`.

## Target

```css
/* style.css:1073-1087 — target (unchanged, kept as the universal safety net) */
@media (prefers-reduced-motion: reduce) {

    html {
        scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }

    .hidden,
    .show {
        transition-duration: 200ms, 0.01ms, 0.01ms !important;
    }
}
```

The new `.hidden, .show` block is added **after** the universal block, inside the same media query. `transition-duration` accepts a comma-separated list that maps positionally to whichever `transition-property` list is active on the matched element. Both `.hidden` (`style.css:907-912`, or its plan-002 target) and `.show` (`style.css:914-919`) declare their `transition` in the same order — `opacity, transform, filter` — so this list means: opacity transitions at a gentle 200ms, transform and filter both collapse to near-zero (no translateY movement, no blur animation). `.hidden`/`.show` (specificity 0,1,0) is already more specific than the universal `*` selector (0,0,0), so this correctly overrides it for exactly these two classes and nothing else.

## Repo conventions to follow

- This plan assumes plan 002 has already been applied (`.hidden`'s duration is 350ms, `.show`'s is 550ms) — but the fix works identically either way, since it overrides `transition-duration`, not the base rule's values. If plan 002 has *not* been applied, the positional order (`opacity, transform, filter`) is unchanged from the original file, so this plan still applies correctly on its own.
- Do not touch the universal `*, *::before, *::after` block — it remains the correct fallback for every other transition on the page (button hovers, card lifts, nav blur, etc.), where instant-under-reduced-motion is fine because none of those involve sustained position/parallax movement.
- 200ms matches this repo's `--dur-base` token (`style.css:31`) in spirit, but do not replace the literal `200ms` with `var(--dur-base)` inside `transition-duration` — `transition-duration` used standalone (not as part of the `transition` shorthand) does not accept custom properties reliably across all property-order edge cases in every browser; keep it a literal value here, matching how `.hidden`/`.show`'s own durations are already literal `ms` values rather than tokens (see plan 002's rationale for why this pair intentionally doesn't use the `--dur-*` scale).

## Steps

1. In `style.css`, locate the `@media (prefers-reduced-motion: reduce)` block (currently lines 1073-1087).
2. Immediately after the closing `}` of the `*, *::before, *::after` rule, and still inside the media query's outer `{ }`, insert the new `.hidden, .show { transition-duration: 200ms, 0.01ms, 0.01ms !important; }` rule exactly as shown in Target.
3. Do not modify the `*, *::before, *::after` rule or the `html { scroll-behavior: auto; }` rule.
4. Do not touch any rule outside this media query.

## Boundaries

- Do NOT add `transform: none` anywhere in this media query or anywhere else in the file — see Problem for why this previously caused a real bug.
- Do NOT change the universal `*` block.
- Do NOT extend this override to other selectors (e.g. card stagger from plan 003) — this plan is scoped to `.hidden`/`.show` only, to stay self-contained. If plan 003 has also been applied and a matching treatment is wanted for `.destination_grid.show .destination_card` / `.trip_grid.show .trip_card`, that is a separate follow-up, not part of this plan.
- If `style.css:1073-1087` no longer matches the excerpt above, STOP and report instead of guessing where the media query is.

## Verification

- **Mechanical**: open `index.html` directly in a browser. Confirm no console errors.
- **Feel check**:
  - In Chrome DevTools, open the Rendering tab, set "Emulate CSS media feature prefers-reduced-motion" to "reduce."
  - Reload the page and scroll a reveal target (e.g. `destination_grid`, or `section_header` from plan 001) into view: confirm it now **fades in gently** (visible ~200ms opacity transition) instead of popping instantly — this is the fix.
  - Confirm it does **not** visibly rise, blur-unblur, or otherwise move — only opacity should be perceptible.
  - Re-check the hero: confirm the two overlapping photo cards are still positioned correctly (one offset upper-left, one offset lower-right per `style.css:374-384`) and do **not** collapse into a stacked pile — this is the regression this plan must not reintroduce.
  - Hover a button or card with reduced motion still enabled: confirm hover/press feedback still applies near-instantly (unchanged, governed by the untouched universal block).
  - Turn reduced-motion emulation back off: confirm the site returns to full motion exactly as before this plan (350/550ms — or 650/550ms if plan 002 hasn't landed — opacity+transform+filter, per plan 002).
- **Done when**: with reduced motion enabled, the reveal system still visibly (if subtly) fades content in — it is not instant — while no element moves or is mispositioned.
