# Architecture

## Application shape

RADARKit uses a React and TypeScript App Router foundation with a reusable shell and data-driven department navigation. The initial UI is intentionally server-renderable and dependency-light. Future departments should be implemented as focused modules under `src/components` and `src/app`, sharing the token layer and common interaction patterns.

## Processing strategy

Lightweight transforms such as image resizing, format checks, metadata inspection, and small text operations can be evaluated for browser-side execution. Intensive FFmpeg-style work should run in a separate processing environment or managed job worker after limits, cost, and isolation are validated. Cloudflare Workers must not be assumed suitable for long-running media processing.

## Infrastructure direction

Cloudflare Pages or Workers are candidate hosting targets for the web and edge APIs. R2 is a candidate for temporary or durable object storage. D1 is a candidate for relational metadata only when an actual ownership and lifecycle model justifies it. Queues are a candidate for long-running jobs. These are architectural options, not provisioned services in the foundation phase.

## Data and access

Application records should be scoped to authenticated users or organizations. Authentication must be admin-controlled with no public self-registration unless approved. Authorization should be checked server-side for every operational record and file. Temporary files need an expiry policy, quota checks, audit events, and deletion controls.

## Integrations

External platforms should sit behind provider-specific adapters. Each adapter owns OAuth scopes, rate limits, token storage, capability detection, and provider error mapping. Consequential actions such as playlist changes, publishing, or transfer require an explicit confirmation step.

## Trade-offs

The foundation avoids selecting a database, queue, or processing vendor before workflows define their actual needs. This keeps the public repository small and prevents infrastructure from becoming a substitute for product boundaries. The cost is that production workflows remain intentionally unavailable until the next milestones.
