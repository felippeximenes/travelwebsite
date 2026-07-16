# 002 — Fix scroll-reveal exit being slower than its own entrance

- **Status**: TODO
- **Commit**: 313ecfc
- **Severity**: MEDIUM
- **Category**: Interruptibility / duration
- **Estimated scope**: 1 file (`style.css`), 1 rule pair

## Problem

```css
/* style.css:907-919 — current */
.hidden {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(28px);
    transition: opacity 650ms var(--ease-out), transform 650ms var(--ease-out), filter 650ms var(--ease-out);
}

.show {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
    transition: opacity 550ms var(--ease-out), transform 550ms var(--ease-out), filter 550ms var(--ease-out);
}
```

Every reveal target in this file (`header_container`, `header_content`, `destination_grid`, `trip_grid`, `gallary_container`, and — after plan 001 — `section_header`/trip title-subtitle/`subscribe_container`) carries `class="... hidden"` permanently, with `"show"` toggled on/off by `script.js:2-13`'s `IntersectionObserver`.

Both selectors have equal specificity (one class each). CSS resolves a transition using the **destination** rule's `transition` value:

- When `"show"` is **added** (element scrolls into view — entering): the destination computed style is `.hidden.show`. `.show` (lines 914-919) wins the cascade because it appears later in the file at equal specificity → the browser uses **550ms**.
- When `"show"` is **removed** (element scrolls back out of view — exiting): the destination computed style is `.hidden` alone → the browser uses **650ms**.

So the exit is 650ms and the entrance is 550ms — the exit is slower than the entrance, which is backwards. The established asymmetric-timing principle (see `AUDIT.md` §4, "deliberate phases animate slower; the system's response snaps") calls for the reverse: entrance can take its time, exit should feel at least as fast, typically ~60–70% of the enter duration.

## Target

```css
/* style.css:907-919 — target */
.hidden {
    opacity: 0;
    filter: blur(12px);
    transform: translateY(28px);
    transition: opacity 350ms var(--ease-out), transform 350ms var(--ease-out), filter 350ms var(--ease-out);
}

.show {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
    transition: opacity 550ms var(--ease-out), transform 550ms var(--ease-out), filter 550ms var(--ease-out);
}
```

`.show` (entrance) stays at 550ms — that duration was already correct and sits inside the "marketing/explanatory: can be longer" allowance from `AUDIT.md` §2. `.hidden` (exit) drops from 650ms to 350ms, ~64% of the entrance duration, matching the recommended 60–70% ratio and finally making the exit the faster of the two.

## Repo conventions to follow

- Easing token: `var(--ease-out)` (`style.css:27`, `cubic-bezier(0.23, 1, 0.32, 1)`) — already used by both rules, keep it on both.
- Duration values in this file are hand-typed ms literals inline in `transition`, not routed through `--dur-*` tokens for this specific reveal pair (the `--dur-fast/base/slow` tokens at `style.css:30-32` are 150/200/300ms, tuned for short UI feedback, not this longer marketing-entrance timing — don't force these two numbers into that token scale, that's out of scope for this plan).
- Exemplar of correct asymmetric timing already in this codebase: `style.css:169-172`, `.btn:active { transform: scale(0.97); transition-duration: 120ms; }` — the press-in is faster than the 200ms `.btn` hover transition, i.e. the "system responds immediately, deliberate motion can be slower" pattern applied correctly elsewhere.

## Steps

1. In `style.css`, in the `.hidden` rule (currently lines 907-912), change the `transition` line from `transition: opacity 650ms var(--ease-out), transform 650ms var(--ease-out), filter 650ms var(--ease-out);` to `transition: opacity 350ms var(--ease-out), transform 350ms var(--ease-out), filter 350ms var(--ease-out);`.
2. Leave the `.show` rule (currently lines 914-919) untouched — its 550ms is already correct.
3. Do not touch any other rule in this file.

## Boundaries

- Do NOT touch `index.html` or `script.js`.
- Do NOT change the `.show` rule.
- Do NOT change the easing token or add a new one.
- If `style.css:907-919` no longer matches the excerpt above (durations already changed, rule restructured), STOP and report instead of guessing.

## Verification

- **Mechanical**: open `index.html` directly in a browser. Confirm no console errors.
- **Feel check**: scroll a reveal target (e.g. `destination_grid`) into view, let it settle, then scroll back up past it quickly and repeat 2-3 times.
  - The entrance (fade+rise+unblur) should feel like a considered ~half-second arrival.
  - The exit (scrolling back up) should feel noticeably snappier than the entrance, not equal or slower.
  - In DevTools Animations panel, set playback to 10% and trigger both directions: confirm the exit's recorded duration is ~350ms and the entrance's is ~550ms.
  - Toggle `prefers-reduced-motion` (Rendering panel): both directions should still collapse to near-zero per the existing global reduced-motion rule (`style.css:1073-1087`, unaffected by this plan).
- **Done when**: exit duration is 350ms, entrance stays 550ms, and repeated up/down scrolling near the section boundary no longer feels like the reveal "lingers" on the way out.
