# Design system

## Source of truth

RADARSite was inspected read-only at commit `d2186415da148dcd1a7058b56f1aff3152562b1c`. The primary sources are `src/app/globals.css` and `src/app/layout.tsx`. RADARSite’s project guidance is in `CLAUDE.md`. RADARSite itself was not modified.

## Verified tokens

Typography uses `Archivo` from `next/font/google` as `--font-grotesk`, including its width axis, and `Space_Mono` as `--font-space-mono` with weights 400 and 700. RADARKit maps the Tailwind `font-mono` token to that distinct injected variable. The dark palette defines paper `#050505`, ink `#f7f7f2`, white flare `#ffffff`, and dark secondary `#171717`. The light theme defines paper `#f7f7f2`, ink `#050505`, green flare `#168a3a`, secondary `#e7e7df`, and muted foreground `#55554f`. RADARKit adopts the light operational surface as its default foundation view and preserves the verified semantic names.

All radius tokens are `0px`. Motion uses `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)`, `--ease-slam: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-in-out: cubic-bezier(0.76, 0, 0.24, 1)`, with fast/base/slow durations of `0.3s`, `0.6s`, and `1s`, plus a `260ms` theme transition. Responsive source patterns consistently use 768px as the mobile-to-desktop breakpoint, with 1024px and 1280px patterns used for larger layouts.

## RADARKit implementation

The verified values are implemented in `src/app/globals.css`. Product-specific semantic additions are `--ink-muted`, `--paper-muted`, the `.eyebrow`, `.button`, `.icon-button`, and `.shadow-hard-sm` patterns. These additions are documented extensions: they name repeated operational UI roles while deriving their colors and motion from RADARSite values.

The shell applies the system to navigation, cards, controls, status indicators, empty structural states, typography, and mobile/desktop layout. The six departments are data-driven so future modules can reuse the same component boundary.

## Responsive and accessibility rules

Touch targets are at least 44px in the shell. The layout starts as a single column and expands at 768px and 1024px. The route includes a skip-free, content-first structure with semantic sections and labeled controls. Reduced-motion users receive disabled transitions and automatic scrolling is relaxed.

## Intentional deviations

RADARKit uses a light default surface for operational readability instead of RADARSite’s dark root default. The green flare remains the verified light-theme accent. No new gradients, rounded cards, decorative imagery, or unverified brand colors were introduced.
