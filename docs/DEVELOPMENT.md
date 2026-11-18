# Development

## Setup

Use Node.js 20 or newer. Copy `.env.example` to `.env.local` only for local, non-secret configuration. Install dependencies with `npm install`, then start the app with `npm run dev`.

## Commands

`npm run dev` starts the local application. `npm run build` creates a production build. `npm run start` serves the built application. `npm run typecheck` runs TypeScript checks. `npm run lint` runs the configured lint command.

## Structure

The App Router lives under `src/app`. Shared product components live under `src/components`. Public-safe static assets live under `public`. Product and engineering decisions live under `docs`.

## Contribution workflow

Create a focused feature branch from `main`. Read the relevant documentation and existing implementation before editing. Keep commits small and descriptive. Run typechecking, linting, build checks, secret scanning, and Markdown-link checks appropriate to the change. Open a pull request for review; do not merge or deploy without explicit release ownership.

Never place real credentials or private operational data in fixtures, screenshots, tests, examples, or documentation.
