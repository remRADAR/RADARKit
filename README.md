# RADARKit

RADARKit is a modular creative-operations and media-utility toolkit for RADARCharts by REM. It is designed to support music marketing operations, artist development, content preparation, research, media management, and campaign execution in one focused workspace.

## Departments

The foundation defines six modules: Media Lab, Playlist Studio, Social Studio, Converter Lab, Research Desk, and Asset Desk. Each has a clear operational purpose and can be developed independently without fragmenting the product.

## Foundation status

This repository contains the product and architecture foundation, a RADARSite-derived design system, a responsive application shell, and public-repository safeguards. It also includes a browser-only Social Studio prototype for composing and exporting a 1080×1920 story image from a local featured image, title, and excerpt. The prototype does not authenticate, bind to an article-publication event, upload, or publish to any platform. Production authentication, media-processing services, external platform mutations, and live infrastructure are not implemented.

## Technology direction

The application uses React, TypeScript, Next.js App Router, and a Tailwind-compatible CSS token layer. Cloudflare Pages or Workers, R2, D1, and Queues remain candidate infrastructure options subject to workflow and execution-limit validation.

## Documentation

- [Product brief](docs/PRODUCT_BRIEF.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Security](docs/SECURITY.md)
- [Development](docs/DEVELOPMENT.md)
- [Platform integrations](docs/PLATFORM_INTEGRATIONS.md)
- [Design system](docs/DESIGN_SYSTEM.md)

## Rights and safety

RADARKit must process only content the user owns, has permission to use, or may lawfully access. It must not facilitate DRM circumvention, stream ripping, access-control bypass, watermark or attribution removal, or unauthorized redistribution.

## Development

See [Development](docs/DEVELOPMENT.md) for setup and commands. Social Studio is available at `/social-studio` for local preview and PNG export only; connected accounts, publication triggers, and RSS/social distribution remain future work. The next planned milestone is a rights-aware Converter Lab MVP with validated browser/server processing boundaries.
