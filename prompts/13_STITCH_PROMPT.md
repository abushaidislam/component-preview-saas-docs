# Stitch AI Prompt — Main Product UI

Design a premium developer SaaS web app named **Component Preview**.

## Product concept

Component Preview is a browser-based playground where developers can paste or write a React `.tsx` component and immediately see the real component rendered live in an isolated preview.

Core interaction:

**Code → Live Preview → Diagnose → Save → Share → Export**

The product must feel like a serious developer infrastructure/tooling company, not an AI-generated design showcase.

## Visual direction

Design language:
- Vercel-inspired restraint
- Linear-level polish
- modern developer tooling
- editorial precision
- monochrome-first
- highly refined spacing
- crisp borders
- dense but calm UI

Typography:
- Geist Sans style for product UI
- Geist Mono style for code
- strong typographic hierarchy
- no playful display fonts

Color:
- near-white background in light mode
- near-black background in dark mode
- black/white foreground
- subtle neutral gray borders
- muted gray secondary text
- one restrained accent color only for important actions/statuses

Avoid:
- purple AI gradients
- neon glows
- glassmorphism
- excessive shadows
- huge rounded cards
- overuse of pills
- 3D blobs
- decorative AI sparkles
- generic dashboard templates

## Pages to design

### Page 1 — Marketing Landing

Header:
- logo/wordmark: Component Preview
- Product
- Docs
- Pricing
- GitHub
- Sign in
- Get started

Hero:
- headline: **Write components. See them live.**
- supporting copy focused on instant TSX preview
- two CTAs: Start building / View docs
- large interactive-looking product demo

The hero demo should visually show:
- code editor on the left
- live component preview on the right
- tiny toolbar
- bottom error/console strip
- a polished example component rendered inside the preview

Below hero:
- “From TSX to working UI in seconds”
- 3 or 4 capability sections
- split layouts showing editor and preview
- responsive device preview
- diagnostics/error handling
- save/share/export
- final CTA

### Page 2 — Dashboard

Application shell:
- compact top navigation
- left workspace sidebar
- projects/components list

Main content:
- “Your components”
- Create component button
- search
- filters
- recent project cards/list rows

Keep it closer to a modern developer console than a marketing dashboard.

### Page 3 — Creator Workspace

This is the most important page.

Desktop composition:

Top bar:
- breadcrumb/project name
- save status
- undo/redo
- preview controls
- share
- copy
- download
- fullscreen

Main split workspace:
LEFT: code editor
RIGHT: preview canvas

Editor:
- dark code surface
- line numbers
- TSX syntax
- small tab/header
- code actions

Preview:
- light/dark canvas option
- desktop/tablet/mobile controls
- centered rendered component
- subtle grid/background only if needed
- no unnecessary decoration

Bottom:
- diagnostics drawer
- Console / Errors / Warnings tabs
- clear button
- restart preview button

States to design:
- empty
- compiling
- ready
- compile error
- runtime error
- saved
- unsaved
- preview crashed

### Page 4 — Shared Preview

A distraction-free public preview page.

Top:
- small product logo
- component name
- author/project metadata
- Copy code
- Download
- Open in editor

Main:
- large centered live component preview

Optional tabs:
- Preview
- Code
- Info

### Page 5 — Settings

Simple settings console:
- profile
- workspace
- usage
- preferences
- danger zone

## Component library

Design these reusable components:
- Button
- IconButton
- Tabs
- Tooltip
- Dropdown
- Command menu
- Sidebar
- TopBar
- EditorToolbar
- PreviewToolbar
- DeviceSwitcher
- DiagnosticsPanel
- ErrorCard
- ProjectRow
- ProjectCard
- EmptyState
- SaveIndicator
- Toast
- Modal

## Layout principles

- 8px spacing rhythm
- thin 1px borders
- clear alignment
- compact controls
- generous whitespace on marketing pages
- denser spacing in the creator app
- avoid visual noise

## Motion

Use restrained motion:
- 150–220ms
- ease-out
- subtle fade/slide
- smooth panel resize
- no bouncy spring animation

## Deliverable

Create polished high-fidelity desktop and mobile screens for all five pages, maintaining one cohesive design system.

The final result should look like a real developer product that could ship publicly tomorrow.
Do not make it look like an AI mockup.
