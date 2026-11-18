# Architecture

## Application shape

RADARKit uses a React and TypeScript App Router foundation with a reusable shell and data-driven department navigation. The initial UI is intentionally server-renderable and dependency-light. Future departments should be implemented as focused modules under `src/components` and `src/app`, sharing the token layer and common interaction patterns.

## Processing strategy

Lightweight transforms such as image resizing, format checks, metadata inspection, and small text operations can be evaluated for browser-side execution. Intensive FFmpeg-style work should run in a separate processing environment or managed job worker after limits, cost, and isolation are validated. Cloudflare Workers must not be assumed suitable for long-running media processing.

## Infrastructure direction

Cloudflare Pages or Workers are candidate hosting targets for the web and edge APIs. R2 is a candidate for temporary or durable object storage. D1 is a candidate for relational metadata only when an actual ownership and lifecycle model justifies it. Queues are a candidate for long-running jobs. These are architectural options, not provisioned services in the foundation phase.

## Data and access

The current route is a foundation preview, not a protected workspace. Before operational use, authentication must be enforced server-side at the route boundary and authorization must deny by default for every future department route, API, record, and file. The first role boundary should support administrators, operators, and read-only collaborators. Sessions need idle and absolute expiry, revocation, logout, and reauthentication behavior. Cloudflare Access is a candidate perimeter provider, subject to evaluation against application-level roles and API checks.

Application records should be scoped to authenticated users or organizations. Temporary files need an expiry policy, quota checks, audit events, and deletion controls. Authentication, authorization, and private-data handling are release gates, not follow-up hardening tasks.

## Integrations

External platforms should sit behind provider-specific adapters. Each adapter owns OAuth scopes, rate limits, token storage, capability detection, and provider error mapping. Consequential actions such as playlist changes, publishing, or transfer require an explicit confirmation step.

## Trade-offs

The foundation avoids selecting a database, queue, or processing vendor before workflows define their actual needs. This keeps the public repository small and prevents infrastructure from becoming a substitute for product boundaries. The cost is that production workflows remain intentionally unavailable until the next milestones.
