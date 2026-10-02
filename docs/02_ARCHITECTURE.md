# Technical Architecture

## 1. System

```text
Browser
 ├─ Next.js Product UI
 │   ├─ Landing
 │   ├─ Dashboard
 │   ├─ Workspace
 │   └─ Settings
 │
 └─ Preview Sandbox
     ├─ iframe
     ├─ React runtime
     ├─ TypeScript/JSX transform
     ├─ dependency resolver
     └─ error/console bridge

Backend
 ├─ Auth
 ├─ Projects
 ├─ Components
 ├─ Versions
 ├─ Share links
 └─ Usage/events
```

## 2. Recommended implementation

Use a browser sandbox abstraction such as Sandpack for the initial runtime. It provides a practical route to an isolated React preview while avoiding custom bundler engineering.

The product should wrap the sandbox behind an internal adapter:

```ts
interface PreviewRuntime {
  setFiles(files: PreviewFiles): void
  setDependencies(deps: DependencyMap): void
  restart(): void
  getStatus(): PreviewStatus
  onEvent(handler: (event: PreviewEvent) => void): () => void
}
```

This lets the runtime be replaced later if needed.

## 3. Data flow

```text
Monaco editor
   ↓
debounced source update
   ↓
preview runtime adapter
   ↓
sandbox transform/bundle
   ↓
sandbox iframe
   ↓
preview result
   ├─ render
   ├─ console
   └─ error bridge
```

## 4. Recommended application boundaries

### `/app`
Routing and page composition only.

### `/features/editor`
- editor component
- editor state
- formatting
- keyboard shortcuts

### `/features/preview`
- preview canvas
- device controls
- fullscreen
- sandbox adapter

### `/features/diagnostics`
- error drawer
- console panel
- stack parsing

### `/features/projects`
- project CRUD
- version history
- share links

### `/lib/runtime`
- sandbox abstraction
- dependency policy
- source normalization

### `/lib/db`
- Supabase access

### `/components/ui`
- reusable shadcn-style product primitives

## 5. Source normalization

Support common component shapes:

```tsx
export default function Example() {
  return <div>Hello</div>
}
```

and:

```tsx
export function Example() {
  return <div>Hello</div>
}
```

The runtime should normalize a default demo entrypoint internally rather than mutating the user's source in the editor.

## 6. Styling

Tailwind utility classes should work in the preview. For custom CSS:
- support an explicit CSS file in a later multi-file version
- MVP may offer a small CSS editor only if implementation remains reliable

## 7. State

Use URL state for shareable preview configuration only.

Suggested client state:
- editor source
- active file
- viewport mode
- preview status
- diagnostics
- dirty state
- selected project/version

Avoid adding a heavy global state library until real complexity requires it.

## 8. Persistence model

Store:
- project metadata
- component source
- version snapshots
- dependency map
- preview settings
- share token

Do not store secrets inside component source.

## 9. Performance

Targets:
- editor loads quickly
- preview updates debounce around 250–500ms
- avoid rebuilding preview on unrelated UI state changes
- persist drafts asynchronously
- lazy-load editor and heavy preview dependencies

## 10. Future architecture

When multi-file support arrives:

```text
Project
 ├─ package.json
 ├─ src/
 │   ├─ Component.tsx
 │   ├─ components/
 │   └─ lib/
 ├─ styles.css
 └─ public/
```

Keep the MVP data model compatible with this direction.
