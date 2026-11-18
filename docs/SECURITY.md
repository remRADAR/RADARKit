# Security

RADARKit is intended for a public repository with private operations. Never commit API keys, passwords, access tokens, OAuth secrets, private artist or client information, unreleased media, contracts, financial records, or private campaign plans. `.env.example` contains placeholders only; deployment secrets belong in the deployment secret manager.

Authentication must be admin-controlled, with no public self-registration by default. Every server-side resource needs an authorization check. Sessions should use secure, HttpOnly, appropriately scoped cookies, with expiry and revocation behavior documented before operational use.

Uploads require size, type, and ownership checks. Temporary files need short retention, unpredictable identifiers, access controls, and deletion after processing or expiry. Durable files need an owner, audit trail, quota policy, and explicit deletion behavior.

The product processes only content the user owns, is authorized to use, or may lawfully access. It must not bypass DRM or access controls, rip protected streams, remove watermarks or attribution, or redistribute protected content without permission. Official APIs and user-authorized OAuth flows are preferred.

Before each release, run secret scanning, dependency review, Markdown-link checks, and checks for accidental private material. Production deployment, DNS, live databases, and external integrations remain untouched during foundation work.
