# RADARKit foundation plan

## Implementation approach

RADARKit starts as a small Next.js App Router application with TypeScript and a single branded workspace shell. The shell establishes the six-department information architecture without prematurely implementing department features. Design tokens are copied only from the verified RADARSite source and live in `src/app/globals.css` until the application grows enough to split them into dedicated token files.

The product boundary is documented before backend services are selected. Lightweight browser operations remain candidates for client-side execution. Intensive media work must use a separate processing worker or managed service after limits are validated; it must not be forced into a Cloudflare Worker by default.

## Project structure

- `src/app/`: App Router entry points, metadata, and global styles.
- `src/components/`: Reusable product shell and future department components.
- `public/`: Route manifest and public-safe static assets.
- `docs/`: Product, architecture, security, integration, development, roadmap, and design-system decisions.

## Design direction

- **Movement:** RADARSite editorial brutalism — high-contrast grid, hard borders, oversized grotesk typography, and one controlled flare color. Probability 0.04.
- **Movement:** Soft productivity SaaS — rounded cards, pastel surfaces, and low-contrast utility UI. Probability 0.03.
- **Movement:** Futuristic neon control room — dark glass, glow effects, and dense telemetry. Probability 0.02.

The selected direction is RADARSite editorial brutalism. Its principles are clarity, high contrast, purposeful motion, and operational restraint. The color system uses ivory paper, near-black ink, and RADARSite’s verified green flare as a single semantic accent. The layout uses a hard editorial grid rather than oversized dashboard cards. Archivo carries the display voice; Space Mono carries metadata and operational labels. Motion is short and intentional, with reduced-motion fallbacks.

## Constraints

This phase establishes foundation only. It does not add authentication, external integrations, media processing, production deployment, database schema, or platform mutations.
