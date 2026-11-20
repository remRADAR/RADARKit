# Roadmap

## Foundation — current

Establish the RADARSite-derived design system, application shell, six-department information architecture, documentation, public-repository hygiene, security boundaries, and processing decision records.

## Converter Lab MVP

Deliver browser-safe image and audio utilities first. Define file-size limits, supported formats, metadata behavior, temporary storage, deletion, progress states, and error handling before adding asynchronous processing.

## Social Studio

First slice: provide a browser-only, reusable 9:16 article-story template with local featured-image upload, title and excerpt inputs, full-bleed cover cropping, live preview, and 1080×1920 PNG export. This does not connect accounts or publish.

Later: add structured caption, hook, call-to-action, hashtag, editorial, campaign-preset, and private-draft workflows. Any connected distribution remains behind the release-readiness and provider-authorization gates.

## Playlist Studio

Add official API-first import, matching, backup, and synchronization workflows. Make provider capabilities and unsupported operations visible, with confirmation before mutations.

## Media Lab and Asset Desk

Add authorized intake, artwork checks, metadata preparation, folder/tag conventions, naming rules, asset history, and export records.

## Research Desk

Add artist, song, release, credit, ISRC, release-date, and platform-link research with provenance and freshness indicators.

## Release readiness

Before production release, complete the server-side authentication gate, deny-by-default authorization, administrator/operator/read-only role boundaries, session expiry and revocation, audit logging, retention and deletion controls, accessibility review, mobile testing, performance checks, secret scanning, dependency review, and operational runbooks. No operational records, uploads, integrations, or private user data should be enabled before these gates pass.
