# Test Plan

## Unit tests

### Source parser
Cases:
- default export
- named export
- props
- hooks
- JSX fragments
- TypeScript types
- malformed source

### Dependency policy
- allowed package
- unsupported package
- version mismatch
- malformed dependency input

### Diagnostics
- syntax error
- runtime error
- unknown error
- stack trace with line number

## Integration tests

- editor state reaches runtime
- runtime event reaches diagnostics panel
- save creates version
- share creates token
- public page retrieves shared version

## E2E scenarios

### Scenario 1 — First preview
Open creator → type a button component → preview renders.

### Scenario 2 — Compile error
Break closing JSX → preview remains usable → error panel reports issue.

### Scenario 3 — Runtime error
Throw an Error in component → runtime error panel appears → restart restores preview.

### Scenario 4 — Persistence
Sign in → save → refresh → reopen component.

### Scenario 5 — Share
Save version → create public link → open private/incognito context → read-only preview.

### Scenario 6 — Responsive
Switch desktop → tablet → mobile → preview dimensions change correctly.

## Performance checks

Measure:
- initial workspace load
- editor hydration
- first successful preview
- update latency after small edit

Do not optimize blindly. Record measurements first.
