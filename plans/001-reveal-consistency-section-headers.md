# 001 — Extend scroll-reveal to section headers and the subscribe card

- **Status**: TODO
- **Commit**: 313ecfc
- **Severity**: MEDIUM
- **Category**: Cohesion / missed opportunity
- **Estimated scope**: 1 file (`index.html`), 4 class attribute edits, 0 new CSS/JS

## Problem

`style.css:907-919` defines a generic scroll-reveal pair (`.hidden` → `.show`) and `script.js:12-13` observes **every** element carrying the `.hidden` class generically via `document.querySelectorAll(".hidden")`. Most sections use it consistently, but three pieces of content were left out, so they render instantly while their sibling content in the same section fades in — a visible inconsistency on the same screen.

```html
<!-- index.html:82-94 — current: section_header has no reveal, destination_grid does -->
<section class="section_container destination_container">
    <div class="section_header">
        <div>
            <h2 class="section_title">Explore os melhores destinos</h2>
            <p class="section_subtitle">
                Explore os lugares dos seus maiores sonhos. Aqui você pode encontrar seu destino.
            </p>
        </div>
        <div class="destination_nav">
            <span><i class="ri-arrow-left-s-line"></i></span>
            <span><i class="ri-arrow-right-s-line"></i></span>
        </div>
    </div>
    <div class="destination_grid hidden">
```

```html
<!-- index.html:130-137 — current: title/subtitle have no wrapper and no reveal, trip_grid does -->
<section class="trip">
    <div class="section_container trip_container">
        <h2 class="section_title"> Melhores Pacotes </h2>
        <p class="section_subtitle">
            Explore seus lugares adquados e de sonhos ao redor do mundo. Aqui você pode encontrar o seu destino
            certo.
        </p>
        <div class="trip_grid hidden">
```

```html
<!-- index.html:206-215 — current: whole subscribe card has zero reveal treatment -->
<section class="subscribe">
    <div class="section_container subscribe_container">
        <div class="subscribe_content">
            <h2 class="section_title">Se inscreva para ter ofertas especiais</h2>
```

## Target

Add `class="hidden"` to the three currently-unanimated blocks — nothing else changes. No new CSS, no new JS: `.hidden`/`.show` (`style.css:907-919`) and the generic observer (`script.js:12-13`) already apply automatically to any element carrying the class.

```html
<!-- index.html:83 — target -->
<div class="section_header hidden">
```

```html
<!-- index.html:132,133 — target (two sibling elements, each independently observed — same pattern already used for header_container + nested header_content at index.html:52,59) -->
<h2 class="section_title hidden"> Melhores Pacotes </h2>
<p class="section_subtitle hidden">
    Explore seus lugares adquados e de sonhos ao redor do mundo. Aqui você pode encontrar o seu destino
    certo.
</p>
```

```html
<!-- index.html:207 — target -->
<div class="section_container subscribe_container hidden">
```

## Repo conventions to follow

- The reveal vocabulary is exactly two classes: `.hidden` (initial/exit state) and `.show` (added by `IntersectionObserver` when the element intersects the viewport, removed when it doesn't). Never invent a new class name for this.
- Multiple independent reveal targets inside the same section is an established pattern already: `index.html:52` (`header_container hidden`) contains a nested `index.html:59` (`header_content hidden`) — both observed independently. Follow that exemplar for the trip section's two siblings.
- Do not wrap the trip title/subtitle in a new `<div>` — that would be a structural change. Add the class directly to the existing `<h2>` and `<p>` elements.
- Do not reuse the `.section_header` class's flex layout for the trip title block — it isn't wrapped in `.section_header` today and doesn't need to be; only add `hidden`.

## Steps

1. In `index.html`, on the `.section_header` div inside `.destination_container` (currently at line 83, `<div class="section_header">`), change to `<div class="section_header hidden">`.
2. In `index.html`, inside `.trip_container`, add `hidden` to both the `<h2 class="section_title">` (currently line 132) and the `<p class="section_subtitle">` immediately following it (currently line 133): `<h2 class="section_title hidden"> Melhores Pacotes </h2>` and `<p class="section_subtitle hidden">`.
3. In `index.html`, on the `.subscribe_container` div (currently line 207, `<div class="section_container subscribe_container">`), change to `<div class="section_container subscribe_container hidden">`.
4. Do not touch `style.css` or `script.js` — this plan is HTML-only.

## Boundaries

- Do NOT touch `style.css` or `script.js`.
- Do NOT change any text content, links, or structure beyond adding the `hidden` class attribute.
- Do NOT wrap the trip title/subtitle in a new element.
- If the cited lines have drifted (e.g. `.section_header` no longer exists at that location), STOP and report instead of guessing where to add the class.

## Verification

- **Mechanical**: open `index.html` directly in a browser (no build step). Confirm no console errors.
- **Feel check**: scroll down slowly past the "Explore os melhores destinos" heading, the "Melhores Pacotes" heading, and the newsletter card near the bottom. Confirm each one now fades/rises into view the same way `destination_grid`/`trip_grid`/`gallary_container` already do — same soft blur-fade, not an instant pop.
  - Scroll past a section, then scroll back up past it again: confirm the header/card fades back out and back in on re-entry (same as the grids beside it), proving the generic observer picked it up with no JS change.
  - In DevTools, confirm `.section_header`, the trip `<h2>`/`<p>`, and `.subscribe_container` each show `class="... hidden show"` in the Elements panel while scrolled into view.
- **Done when**: all three blocks visually match the entrance timing/feel of their sibling grid/content in the same section, with zero new CSS or JS.
