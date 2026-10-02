# Jules Bootstrap Prompt

You are building a production-quality SaaS called **Component Preview**.

The product lets developers write/paste a React `.tsx` component and immediately see it rendered in a secure browser sandbox.

## Read first

Before writing code, read:

- docs/01_PRD.md
- docs/02_ARCHITECTURE.md
- docs/05_SECURITY_SANDBOX.md
- docs/06_UI_UX_SPEC.md
- docs/09_AGENT_INSTRUCTIONS.md
- docs/10_ACCEPTANCE_CRITERIA.md

## Mission

Implement the MVP end-to-end.

Primary experience:

```text
Developer enters TSX
        ↓
Monaco Editor
        ↓
secure browser sandbox
        ↓
live component preview
        ↓
diagnostics + console
        ↓
save / share / copy / download
```

## Technical preference

Use:
- Next.js App Router
- TypeScript
- Tailwind
- shadcn/ui
- Monaco
- Sandpack or an equivalent browser-isolated React runtime
- Supabase for auth/data when persistence is implemented
- Zod
- Playwright

Do not implement a custom bundler unless the existing runtime genuinely cannot meet the requirements.

## Build sequence

1. Inspect repository.
2. Establish route structure.
3. Build landing + app shell.
4. Build creator workspace.
5. Integrate Monaco.
6. Integrate sandbox runtime.
7. Add diagnostics and console.
8. Add save/share/export.
9. Add auth/persistence.
10. Run tests and polish.

## Important

The creator workspace is the product. Spend the most design effort there.

The result should feel like a serious developer tool: quiet, precise, fast, and polished.

Do not make it look like a generic AI SaaS.

At the end, provide:
- what was implemented
- verification performed
- known limitations
