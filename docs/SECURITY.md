# Security

RADARKit is intended for a public repository with private operations. Never commit API keys, passwords, access tokens, OAuth secrets, private artist or client information, unreleased media, contracts, financial records, or private campaign plans. `.env.example` contains placeholders only; deployment secrets belong in the deployment secret manager.

The current interface is a foundation preview and is not an authenticated operational workspace. Before operational use, place a server-side authentication gate in front of every protected route and API. Access must be admin-controlled, with no public self-registration by default, and authorization must deny by default for unknown users, roles, routes, and resources. Cloudflare Access is a candidate for the perimeter gate, but the final provider must be evaluated against application roles, API authorization, auditability, and local development needs.

The session policy must define secure, HttpOnly, appropriately scoped cookies, an idle and absolute expiry, server-side revocation, logout behavior, and reauthentication for sensitive actions. The initial role boundary should distinguish administrators, operators, and read-only collaborators. Every server-side resource needs an ownership or role check; a UI-only restriction is not sufficient. Authentication and authorization are mandatory release gates before operational records, uploads, integrations, or private user data are introduced.

Uploads require size, type, and ownership checks. Temporary files need short retention, unpredictable identifiers, access controls, and deletion after processing or expiry. Durable files need an owner, audit trail, quota policy, and explicit deletion behavior.

The product processes only content the user owns, is authorized to use, or may lawfully access. It must not bypass DRM or access controls, rip protected streams, remove watermarks or attribution, or redistribute protected content without permission. Official APIs and user-authorized OAuth flows are preferred.

Before each release, run secret scanning, dependency review, Markdown-link checks, and checks for accidental private material. Production deployment, DNS, live databases, and external integrations remain untouched during foundation work.
