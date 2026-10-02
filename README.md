# Component Preview SaaS — Build Pack

A production-oriented specification for a SaaS that lets developers write or paste React/TSX components and preview them live in the browser.

## Core idea

**Input:** a `.tsx` component  
**Experience:** code editor + instant isolated preview  
**Output:** working component preview, copyable TSX, shareable URL, saved project/component.

The product is intentionally positioned as a developer tool, not an AI design generator.

## Suggested product positioning

> Write a component. See it live. Ship the code.

## Primary stack

- Next.js App Router + TypeScript
- Tailwind CSS
- shadcn/ui for internal product UI
- Monaco Editor for code editing
- Sandpack / browser-side React runtime for the preview sandbox
- Supabase for auth + database + storage
- Vercel deployment
- Zod for validation
- Playwright for end-to-end testing

## MVP principle

The preview runtime must remain isolated from the main application. Never execute user-authored TSX directly in the Next.js application process.

## Build order

1. Product shell
2. Editor/preview workspace
3. Sandbox runtime
4. Errors + console
5. Save/share
6. Auth/workspaces
7. Export/copy
8. Polish + tests
9. Billing/usage later

See the other documents for detailed requirements.
