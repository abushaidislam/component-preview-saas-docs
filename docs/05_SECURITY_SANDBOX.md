# Security & Sandbox Rules

This document is mandatory for implementation.

## Rule 1 — Never execute user TSX in the server process

The untrusted code belongs in a browser sandbox/iframe.

## Rule 2 — No arbitrary shell execution

The MVP must never expose:
- shell
- filesystem APIs
- child processes
- server environment variables
- database credentials

to preview code.

## Rule 3 — Dependency allowlist

Create a package registry/allowlist:

```ts
type DependencyPolicy = {
  packageName: string
  allowed: boolean
  versionRange?: string
}
```

Reject unsupported packages with a clear editor error.

## Rule 4 — Secrets

Never inject:
- Supabase service role key
- private API keys
- JWT signing secrets
- internal endpoints
into preview code.

Only public runtime configuration may be exposed.

## Rule 5 — iframe isolation

Use the strongest practical sandbox configuration supported by the chosen runtime. The main application must not directly expose privileged APIs to preview code.

## Rule 6 — output sanitization

Treat:
- console messages
- stack traces
- project names
- component names
- error messages

as untrusted UI strings.

## Rule 7 — rate limiting

Apply limits to:
- authenticated saves
- share creation
- future package resolution
- future AI generation

## Rule 8 — resource limits

Prevent a component from freezing the editor:
- timeout runaway preview operations
- cap excessive console spam
- restart the iframe after unrecoverable crashes
- debounce source updates

## Threat model

Potential threats:
- XSS through preview bridge
- prototype pollution
- dependency supply-chain risk
- iframe escape attempts
- denial of service via infinite render loops
- malicious share content
- stored XSS via project metadata

Before public launch, perform a focused browser-sandbox security review.
