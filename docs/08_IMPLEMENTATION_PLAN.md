# Jules Implementation Plan

## Phase A — Repository setup

Tasks:
1. Inspect existing repo.
2. Preserve working conventions.
3. Install required dependencies.
4. Configure lint/typecheck/format.
5. Add app shell and route map.
6. Add shared design tokens.

## Phase B — UI shell

Routes:
- `/`
- `/dashboard`
- `/workspace/new`
- `/workspace/[id]`
- `/p/[token]`
- `/settings`

Build desktop first, then responsive behavior.

## Phase C — Editor

Implement:
- Monaco wrapper
- TSX language mode
- controlled editor state
- debounce
- copy
- download
- reset
- format

## Phase D — Preview runtime

Implement a single `PreviewRuntime` abstraction.

Required states:
- idle
- compiling
- ready
- compile-error
- runtime-error
- crashed

## Phase E — Diagnostics

Build:
- output drawer
- console tab
- errors tab
- warning count
- click error to jump to editor line if source mapping permits

## Phase F — Persistence

Implement:
- local draft first
- Supabase project persistence
- version snapshots
- share tokens

## Phase G — Polish

Perform:
- accessibility audit
- responsive audit
- loading/performance audit
- empty-state audit
- keyboard shortcut audit

## Phase H — Tests

Unit:
- source normalization
- dependency policy
- error parser
- persistence functions

E2E:
- paste TSX → preview
- malformed TSX → diagnostic
- save → dashboard
- share → public page
- copy → clipboard
- download → file

## Definition of done

A feature is not done until:
- typecheck passes
- lint passes
- tests pass
- desktop verified
- mobile verified
- loading/error/empty states exist
- no console errors in the main app
