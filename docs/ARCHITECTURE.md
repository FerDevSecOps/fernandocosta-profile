# Architecture Notes

Engineering decisions behind the project. The goal was to demonstrate mastery of
front-end fundamentals — no frameworks, libraries, preprocessors or build step.

## Principles

- **Separation by responsibility.** Each CSS file owns one concern; each JS module owns
  one behavior.
- **Tokens first.** Every color, radius, spacing, shadow, transition and blur value is a
  CSS custom property in `variables.css`. Components never hardcode raw values.
- **Progressive enhancement.** The page is fully readable without JavaScript. Entrance
  animations only apply once `html.js` is set, so nothing is ever stuck invisible.
- **Accessibility is not optional.** Semantic landmarks, keyboard focus, `aria-label`s,
  reduced-motion support and AA contrast are baked in, not bolted on.

## CSS

Loaded individually in `index.html` in strict cascade order:

```
reset → variables → typography → style → layout → components → animations → responsive
```

Individual `<link>`s are used instead of `@import` to avoid a sequential request
waterfall (better First Contentful Paint). The trade-off — a few extra requests — is
negligible over HTTP/2 with small files.

- **reset.css** — minimal modern reset (box-sizing, media defaults, form inheritance).
- **variables.css** — `:root` design tokens only.
- **typography.css** — `@font-face` + fluid type scale (sizes, weights, line-height,
  letter-spacing) + base text styles.
- **style.css** — global shell and the ambient background layer.
- **layout.css** — Grid/Flex structure, mobile-first.
- **components.css** — isolated BEM blocks, each ordered `base → states → hover`.
- **animations.css** — keyframes and motion, all reduced-motion aware. Max 300ms,
  `ease-out`.
- **responsive.css** — every media query, centralized.

### Naming

BEM throughout: `.profile`, `.profile__avatar`, `.social-button`,
`.social-button__icon`, etc. No generic selectors (`.box`, `.left`) and no deep
descendant chains.

## JavaScript

Three small ES modules, deferred by default (`type="module"`):

- **utils.js** — `qs` / `qsa`, `onReady`, `prefersReducedMotion`.
- **animations.js** — staggered entrance reveal; pauses the background drift when the
  tab is hidden.
- **main.js** — entry point; sets the footer year and initializes the above.

Conventions: `const`/`let` only, arrow functions, template strings, optional chaining;
comments only where they add value.

## Icons

Icons are inlined once as an SVG `<symbol>` sprite and referenced with `<use>`. This
removes any icon font/library, keeps a single source of truth, and lets every icon
inherit `currentColor` for the white → blue hover. Lucide provides the outline set;
TikTok (absent from Lucide) uses Tabler's matching outline icon.

## Fonts

Self-hosted `woff2`, preloaded with `crossorigin`, `font-display: swap`. Inter is served
as a single variable file covering weights 400–600, which reduces the payload to two
font requests total.

## Background

A fixed decorative layer with soft radial gradients and two blurred orbs drifting over
38–46s — deliberately near-imperceptible, and fully disabled under reduced motion.
