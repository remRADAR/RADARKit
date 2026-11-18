# Platform integrations

RADARKit follows an official API-first strategy. Each provider integration must document its API terms, OAuth scopes, rate limits, token lifecycle, data retention rules, and supported capabilities. Provider-owned playback or rendering must remain provider-owned where applicable.

OAuth is required for actions that access a user account or modify external state. Tokens and refresh credentials must be stored server-side through secret management, never in the browser bundle or public repository. Access should be least-privilege and revocable.

Spotify metadata or artwork availability does not grant permission to download protected audio. RADARKit must not facilitate stream ripping, DRM circumvention, access-control bypass, watermark or attribution removal, or unauthorized redistribution.

Playlist modifications, publishing actions, transfers, and other consequential operations require an explicit user confirmation immediately before the action. Unsupported or unavailable provider operations should be shown as unsupported rather than implied by a generic UI.

Provider errors and rate limits should be normalized behind adapters, surfaced with actionable messages, and logged without secrets or unnecessary private payloads.
