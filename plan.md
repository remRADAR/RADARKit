# RADARKit foundation plan

## Implementation approach

RADARKit starts as a small Next.js App Router application with TypeScript and a single branded workspace shell. The shell establishes the six-department information architecture without prematurely implementing department features. Design tokens are copied only from the verified RADARSite source and live in `src/app/globals.css` until the application grows enough to split them into dedicated token files.

The product boundary is documented before backend services are selected. Lightweight browser operations remain candidates for client-side execution. Intensive media work must use a separate processing worker or managed service after limits are validated; it must not be forced into a Cloudflare Worker by default.

## Social Studio / first vertical-template slice

The first Social Studio increment is a browser-only story composer at `/social-studio`. It accepts a locally selected article featured image, title, and excerpt; previews a full-bleed 9:16 canvas; and exports a 1080×1920 PNG. The source image is center-cropped with a preserving-aspect-ratio cover calculation, never stretched. The canvas renderer is reusable and contains no platform API or publishing code.

The route uses RADARKit's established editorial-brutalist design: near-black `#050505`, warm white `#f7f7f2`, the verified green semantic flare in a restrained accent, Archivo display type, Space Mono metadata, and square geometry. Content overlays use high-contrast shading to retain legibility over varied source photography.

This increment does not add account authentication, server uploads, a RADAR article-publication event, queues, or social/RSS delivery. The image remains in the browser tab, and export is available only after the image, title, and excerpt are present. Real distribution requires separate verified event, account, official-API capability, and approval work.

## Project structure

- `src/app/`: App Router entry points, metadata, and global styles.
- `src/components/`: Reusable product shell and future department components.
- `src/components/social-studio/`: The Social Studio's browser-only article-story inputs, preview, and export controls.
- `src/lib/story-template.ts`: Reusable 9:16 crop geometry, text fitting, and canvas rendering.
- `src/app/social-studio/`: The Social Studio route and page metadata.
- `public/`: Route manifest and public-safe static assets.
- `tests/`: Browser tests for navigation and story-template output behavior.
- `docs/`: Product, architecture, security, integration, development, roadmap, and design-system decisions.

## Design direction

- **Movement:** RADARSite editorial brutalism — high-contrast grid, hard borders, oversized grotesk typography, and one controlled flare color. Probability 0.04.
- **Movement:** Soft productivity SaaS — rounded cards, pastel surfaces, and low-contrast utility UI. Probability 0.03.
- **Movement:** Futuristic neon control room — dark glass, glow effects, and dense telemetry. Probability 0.02.

The selected direction is RADARSite editorial brutalism. Its principles are clarity, high contrast, purposeful motion, and operational restraint. The color system uses ivory paper, near-black ink, and RADARSite’s verified green flare as a single semantic accent. The layout uses a hard editorial grid rather than oversized dashboard cards. Archivo carries the display voice; Space Mono carries metadata and operational labels. Motion is short and intentional, with reduced-motion fallbacks.

## Constraints

Aside from the browser-only story-template composer described above, this phase does not add authentication, external integrations, intensive media processing, production deployment, database schema, or platform mutations. No operational record or private upload is persisted.
