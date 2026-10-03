# Product Requirements Document

## 1. Product

Working name: **Component Preview**

Purpose: a web SaaS for developers who want to paste/write a React `.tsx` component and see a live preview without creating a full project.

### One-line value proposition

> Write TSX, render instantly, iterate faster.

## 2. Problem

A developer often receives a standalone React/TSX component but does not want to:
- create a full app just to inspect it
- manually wire dependencies
- repeatedly start local dev servers
- switch between editor and browser
- lose a working visual state while experimenting

## 3. Target users

Primary:
- frontend developers
- design engineers
- students learning React
- UI component creators
- AI-assisted developers

Secondary:
- designers who can edit basic JSX/TSX
- teams reviewing component candidates

## 4. Core workflow

1. Open workspace.
2. Start with a template or paste TSX.
3. Editor compiles on change.
4. Preview updates in an isolated iframe.
5. Runtime/build errors appear in a bottom error drawer.
6. Developer changes viewport and toggles fullscreen.
7. Save a version.
8. Copy TSX or generate a share link.
9. Re-open later from dashboard.

## 5. MVP features

### Editor
- Monaco-based TSX editor
- syntax highlighting
- autocomplete
- line numbers
- formatting
- search
- minimap optional
- keyboard shortcuts
- dirty/saved indicator

### Preview
- live React render
- isolated iframe
- desktop/tablet/mobile viewport presets
- custom width
- refresh/reset
- fullscreen
- open preview in new tab
- dark/light preview toggle where supported

### Diagnostics
- compile error
- runtime error
- readable stack trace
- line reference when available
- browser console output
- clear/retry action

### Dependency handling
MVP supports a curated allowlist of common frontend packages.

Examples:
- lucide-react
- clsx
- tailwind-merge
- class-variance-authority
- framer-motion / motion where browser sandbox compatibility permits
- common Radix/shadcn dependencies

Dependency resolution must be explicit. Do not allow arbitrary server-side package installation during preview execution.

### Persistence
- anonymous local draft using localStorage/IndexedDB
- authenticated project save
- version history
- shareable read-only preview URL

### Export
- copy component code
- download `.tsx`
- copy share link

## 6. Post-MVP features

- package.json editor
- custom npm dependency configuration
- multiple files
- asset uploads
- import from GitHub
- team collaboration
- comments
- AI-assisted refactoring
- component registry
- publish marketplace
- private/team components
- usage/billing

## 7. Non-goals for MVP

Do not build:
- full IDE
- arbitrary backend execution
- arbitrary shell commands
- server-side compilation of untrusted code
- full npm ecosystem support
- Figma import
- visual drag/drop builder

## 8. Success metrics

Product metrics:
- time to first successful preview
- preview compile success rate
- % sessions reaching a rendered component
- save rate
- share rate
- export/copy rate
- repeat users

Technical metrics:
- median preview update latency
- compile failure rate
- iframe crash rate
- main-app memory usage
- client JS bundle size


-----------------------------
## 9. UX quality bar

The UI must feel:
- fast
- calm
- precise
- professional
- developer-first
- Vercel/Linear quality

Avoid:
- oversized cards
- loud gradients
- generic AI aesthetics
- excessive rounded UI
- excessive shadows
- bouncy animation
- dashboard clutter

## 10. Acceptance statement

A first-time user should be able to paste a simple React component and see it rendered within a few seconds, understand an error without opening DevTools, and copy/download the component without creating a project.
