# 005 — Stop driving hero tilt through a CSS variable on the parent element

- **Status**: TODO
- **Commit**: 313ecfc
- **Severity**: MEDIUM
- **Category**: Performance
- **Estimated scope**: 1 file (`script.js`), 1 function; 0 changes to `style.css`

## Problem

```js
// script.js:48-93 — current (relevant excerpt)
const headerImage = document.querySelector(".header_image");
const canTilt =
  headerImage &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canTilt) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let raf = null;

  const animateTilt = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    headerImage.style.setProperty("--tilt-x", `${currentX.toFixed(2)}deg`);
    headerImage.style.setProperty("--tilt-y", `${currentY.toFixed(2)}deg`);

    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      raf = requestAnimationFrame(animateTilt);
    } else {
      raf = null;
    }
  };
  // ... rest unchanged (mousemove/mouseleave handlers)
```

```css
/* style.css:321-324 — .header_image is the parent that receives the custom properties */
.header_image {
    position: relative;
    min-height: 420px;
}
```

```css
/* style.css:374-384 — the two <img> children read the custom properties set on their parent */
.header_image img:nth-child(3) {
    max-width: 350px;
    transform: translate(-75%, -50%) rotateY(var(--tilt-y, 0deg)) rotateX(var(--tilt-x, 0deg));
}

.header_image img:nth-child(4) {
    max-width: 250px;
    z-index: 2;
    transform: translate(0%, -25%) rotateY(var(--tilt-y, 0deg)) rotateX(var(--tilt-x, 0deg));
    box-shadow: var(--shadow-xl);
}
```

`.header_image` has 4 children: `.blob_1`, `.blob_2` (`index.html:54-55`), and the two `<img>` (`index.html:56-57`). Every mousemove frame while hovering the hero, `animateTilt` calls `headerImage.style.setProperty(...)` on the **parent**. CSS custom properties are inheritable, so changing one on an element forces a style recalculation pass across that element **and its entire subtree** — all 4 children — every single animation frame during mouse movement, even though only 2 of those 4 children (the images) actually reference `--tilt-x`/`--tilt-y`; the two blob spans recalculate for nothing. `AUDIT.md` §5 names this exact anti-pattern verbatim: "Don't drive child transforms via a CSS variable on the parent — it recalcs styles for all children. Set `transform` directly on the element."

At this DOM scale (4 children, desktop-only, hover-gated) the real-world cost is small — this is a correctness/architecture fix, not a fire.

## Target

```js
// script.js:48-93 — target (relevant excerpt, rest unchanged)
const headerImage = document.querySelector(".header_image");
const tiltTargets = headerImage ? headerImage.querySelectorAll("img") : [];
const canTilt =
  headerImage &&
  tiltTargets.length > 0 &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canTilt) {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let raf = null;

  const animateTilt = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    tiltTargets.forEach((img) => {
      img.style.setProperty("--tilt-x", `${currentX.toFixed(2)}deg`);
      img.style.setProperty("--tilt-y", `${currentY.toFixed(2)}deg`);
    });

    if (Math.abs(targetX - currentX) > 0.01 || Math.abs(targetY - currentY) > 0.01) {
      raf = requestAnimationFrame(animateTilt);
    } else {
      raf = null;
    }
  };
  // ... rest unchanged (mousemove/mouseleave handlers reference headerImage.getBoundingClientRect() and stay as-is)
```

`style.css:374-384` needs **no changes** — `var(--tilt-x, 0deg)`/`var(--tilt-y, 0deg)` resolve identically whether the custom property is set on the `<img>` itself or inherited from an ancestor; only the *recalc scope* changes, from "parent + 4 children" to "2 individual leaf `<img>` elements, no descendants of their own." The two `.blob_1`/`.blob_2` spans are no longer touched by this code path at all.

## Repo conventions to follow

- `script.js` already scopes all tilt logic behind the `canTilt` gate (hover-capable, fine pointer, no reduced-motion) — keep that gate exactly as-is, just add the `tiltTargets.length > 0` guard alongside it so the block safely no-ops if the hero markup ever changes and no `<img>` is found.
- The rAF-based lerp loop (`currentX += (targetX - currentX) * 0.12`) is the existing "poor man's spring" pattern already used here — do not replace it with a real spring library; that would be a new dependency, out of scope.
- `querySelectorAll` on a scoped ancestor (`headerImage.querySelectorAll(...)`, not `document.querySelectorAll(...)`) matches how the rest of this file scopes lookups (e.g. `document.getElementById("navToggle")`, `document.getElementById("navLinks")`) — keep lookups as narrow as the existing code already does.

## Steps

1. In `script.js`, directly below the existing `const headerImage = document.querySelector(".header_image");` line, add: `const tiltTargets = headerImage ? headerImage.querySelectorAll("img") : [];`.
2. In the `canTilt` assignment, add `tiltTargets.length > 0 &&` as an additional condition (see Target for exact placement).
3. Inside `animateTilt`, replace the two `headerImage.style.setProperty(...)` lines with a `tiltTargets.forEach((img) => { ... })` block that calls `img.style.setProperty("--tilt-x", ...)` and `img.style.setProperty("--tilt-y", ...)` on each image, using the same `currentX`/`currentY` values as today.
4. Leave every other line in `script.js` — including the `mousemove`/`mouseleave` handlers, which still measure `headerImage.getBoundingClientRect()` — untouched.
5. Do not touch `style.css` or `index.html` at all for this plan.

## Boundaries

- Do NOT change `style.css:374-384` — the `var(--tilt-x, 0deg)` / `var(--tilt-y, 0deg)` consumption stays exactly as-is.
- Do NOT change the lerp factor (`0.12`), the max tilt angle (`* 5`), or any other tuning constant — this plan is a performance/architecture fix, not a feel change.
- Do NOT touch the `nav`/`navToggle`/`navLinks`/GTM tracking code elsewhere in `script.js`.
- If `.header_image` no longer contains exactly two `<img>` children when you read the current file, STOP and report instead of guessing — the fix assumes `tiltTargets` resolves to the two hero photos.

## Verification

- **Mechanical**: open `index.html` directly in a browser. Confirm no console errors, especially none related to `tiltTargets` or `setProperty`.
- **Feel check**:
  - On a desktop browser (real mouse, not touch emulation), hover over the hero image area and move the mouse around: confirm both photo cards still tilt together, at the same subtle angle and responsiveness as before this change — this is a pure refactor, the felt behavior must be identical.
  - Move the mouse out of the header: confirm both images ease back to their resting position (no rotation) via the same lerp-out behavior as before.
  - In DevTools, open the Performance panel, record ~2 seconds of hovering/moving the mouse across the hero, and inspect a frame's "Recalculate Style" cost: confirm it no longer lists the two `.blob_1`/`.blob_2` spans as invalidated during tilt frames (only the two `<img>` elements should show up).
  - Toggle `prefers-reduced-motion` (Rendering panel) and reload: confirm the tilt code path doesn't attach at all (`canTilt` is `false`), same as before this plan.
- **Done when**: hover-tilt looks and feels identical to before, and DevTools confirms the recalculation no longer touches the blob spans.
