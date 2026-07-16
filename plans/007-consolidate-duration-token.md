# 007 — Consolidate the duplicated 500ms image-zoom duration into a token

- **Status**: TODO
- **Commit**: 313ecfc
- **Severity**: LOW
- **Category**: Cohesion & tokens
- **Estimated scope**: 1 file (`style.css`), 1 token added, 2 call sites updated

## Problem

```css
/* style.css:3-35 — current :root tokens (excerpt) */
    --dur-fast: 150ms;
    --dur-base: 200ms;
    --dur-slow: 300ms;
```

```css
/* style.css:541-546 — current, hand-typed literal */
.destination_card img {
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: var(--radius-lg);
    transition: transform 500ms var(--ease-out);
}
```

```css
/* style.css:631-635 — current, same literal duplicated */
.trip_card img {
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform 500ms var(--ease-out);
}
```

The repo has a `--dur-fast/base/slow` (150/200/300ms) scale at `:root`, but the image hover-zoom effect on both card types bypasses it with an identical hand-typed `500ms` in two places. `AUDIT.md` §7 names this directly: "Curves and durations should live as shared tokens. Five hand-typed cubic-beziers that almost match is a consolidation finding" — the same principle applies to a duplicated duration literal.

## Target

```css
/* style.css:3-35 — target, add one token to the existing scale */
    --dur-fast: 150ms;
    --dur-base: 200ms;
    --dur-slow: 300ms;
    --dur-slower: 500ms;
```

```css
/* style.css:541-546 — target */
.destination_card img {
    aspect-ratio: 3 / 4;
    object-fit: cover;
    border-radius: var(--radius-lg);
    transition: transform var(--dur-slower) var(--ease-out);
}
```

```css
/* style.css:631-635 — target */
.trip_card img {
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform var(--dur-slower) var(--ease-out);
}
```

## Repo conventions to follow

- Token naming follows the existing `--dur-fast`/`--dur-base`/`--dur-slow` scale exactly — `--dur-slower` extends it, do not invent a differently-named token (e.g. `--dur-zoom` or `--duration-image`).
- Place the new token immediately after `--dur-slow` in `:root` (`style.css:32`), keeping the scale visually ordered fastest-to-slowest, matching how `--radius-sm/md/lg/full` and `--shadow-xs/sm/md/lg/xl` are already ordered smallest-to-largest in the same `:root` block.

## Steps

1. In `style.css`, in the `:root` block, immediately after the `--dur-slow: 300ms;` line (currently line 32), add `--dur-slower: 500ms;`.
2. In `style.css`, in `.destination_card img` (currently lines 541-546), change `transition: transform 500ms var(--ease-out);` to `transition: transform var(--dur-slower) var(--ease-out);`.
3. In `style.css`, in `.trip_card img` (currently lines 631-635), change `transition: transform 500ms var(--ease-out);` to `transition: transform var(--dur-slower) var(--ease-out);`.
4. Do not change any other duration in the file, even other hand-typed ones (e.g. the `.hidden`/`.show` durations from plan 002, or the `blobDrift` `14s`/`18s` — those are deliberately not part of this UI-duration scale, see plan 002's rationale).

## Boundaries

- Do NOT touch `index.html` or `script.js`.
- Do NOT change the visual duration (500ms stays 500ms) — this is a pure consolidation, not a feel change.
- Do NOT tokenize `.hidden`/`.show` (`style.css:907-919`) or `blobDrift`'s keyframe timing — explicitly out of scope, see Steps item 4.
- If `style.css:541-546` or `631-635` no longer contain the literal `500ms`, STOP and report instead of guessing.

## Verification

- **Mechanical**: open `index.html` directly in a browser. Confirm no console errors. Search the built page's computed styles (DevTools) for `.destination_card img` and `.trip_card img` and confirm `transition-duration` still resolves to `0.5s`.
- **Feel check**: hover a destination card and a trip card; confirm the image zoom timing feels identical to before this plan (500ms, unchanged) — this plan should be visually undetectable, it only changes how the value is authored.
- **Done when**: both call sites reference `var(--dur-slower)`, no literal `500ms` remains in either rule, and the rendered/felt behavior is byte-for-byte the same as before.
