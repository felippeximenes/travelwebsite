# 006 — Add press feedback to footer links

- **Status**: TODO
- **Commit**: 313ecfc
- **Severity**: LOW
- **Category**: Physicality & origin (missed opportunity — feedback)
- **Estimated scope**: 1 file (`style.css`), 1 rule added

## Problem

```css
/* style.css:875-888 — current */
.footer_col h4~p {
    font-size: 0.85rem;
    margin-bottom: 0.9rem;
    opacity: 0.75;
    cursor: pointer;
    transition: opacity var(--dur-base) ease, transform var(--dur-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .footer_col h4~p:hover {
        opacity: 1;
        transform: translateX(3px);
    }
}
```

These elements ("Faq", "Termos e Condições", "Políticas de Privacidade", "Nosso Contato", `index.html:235-238`) are styled as pressable (`cursor: pointer`, hover feedback) but have no `:active` state — a pressable element with no press feedback, the first item in `find-animation-opportunities`'s "Feedback gaps" hunt category and the "Physicality" audit category's own hunt list ("pressable elements with no press feedback").

## Target

```css
/* style.css:875-888 — target */
.footer_col h4~p {
    font-size: 0.85rem;
    margin-bottom: 0.9rem;
    opacity: 0.75;
    cursor: pointer;
    transition: opacity var(--dur-base) ease, transform var(--dur-fast) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
    .footer_col h4~p:hover {
        opacity: 1;
        transform: translateX(3px);
    }
}

.footer_col h4~p:active {
    transform: translateX(3px) scale(0.97);
    transition-duration: 130ms;
}
```

130ms sits inside the 100–160ms press-feedback budget (`AUDIT.md` §2). The press state keeps the hover's `translateX(3px)` (so pressing doesn't visually retreat) and adds a subtle `scale(0.97)` squeeze, matching the `scale(0.95–0.98)` range used by every other `:active` rule in this file (e.g. `.btn:active` at `style.css:169-172`, `.destination_card:active` at `style.css:567-569`).

## Repo conventions to follow

- Exemplar: `style.css:169-172`, `.btn:active { transform: scale(0.97); transition-duration: 120ms; }` — the established pattern in this file is: keep whatever transform the element already has (here, hover's `translateX(3px)`), add a `scale()` squeeze, and shorten `transition-duration` for the press moment specifically. Follow that shape exactly.
- Easing: no new easing needed — `transition-duration` alone is sufficient here because the rule only shortens the existing `transform` transition already declared on `.footer_col h4~p` (`var(--ease-out)` via `--dur-fast`); do not redeclare the full `transition` shorthand.

## Steps

1. In `style.css`, immediately after the `@media (hover: hover) and (pointer: fine) { .footer_col h4~p:hover { ... } }` block (currently ending at line 888), add the new `.footer_col h4~p:active { transform: translateX(3px) scale(0.97); transition-duration: 130ms; }` rule exactly as shown in Target.
2. Do not touch the existing base rule or the hover block.

## Boundaries

- Do NOT touch `index.html` — these remain plain `<p>` elements; adding real navigation/links behind them is a functional change, out of scope for this plan.
- Do NOT add `:active` styling anywhere else in this plan — scoped to `.footer_col h4~p` only.
- If `style.css:875-888` no longer matches the excerpt above, STOP and report instead of guessing.

## Verification

- **Mechanical**: open `index.html` directly in a browser. Confirm no console errors.
- **Feel check**:
  - Scroll to the footer. Click-and-hold (or tap-and-hold on a touch device — this rule is not hover-gated, `:active` fires on both mouse and touch) on "Faq" or any of the four footer items: confirm a quick, subtle squeeze feedback (~130ms) is visible on press, then releases back to the hover/rest state.
  - In DevTools Animations panel, set playback to 10% and trigger the press: confirm the transition completes in ~130ms, not the base 150ms (`--dur-fast`) rate.
  - Toggle `prefers-reduced-motion`: press feedback should collapse per the existing global rule (`style.css:1073-1087`), consistent with every other `:active` state on the page.
- **Done when**: every footer support-link item gives a brief, visible press confirmation, matching the squeeze feel of buttons and cards elsewhere on the page.
