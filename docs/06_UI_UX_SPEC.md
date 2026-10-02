# UI / UX Design System

## Direction

**Vercel-like developer product UI.**

Reference qualities:
- black/white foundation
- restrained gray scale
- crisp typography
- thin borders
- high information density
- subtle motion
- almost no decorative effects

Do not copy Vercel's exact layouts, logos, copy, or components.

## Typography

Primary: Geist Sans or a close modern grotesk.

Code: Geist Mono / equivalent monospace.

Hierarchy:
- H1: 56–72px on desktop landing
- H2: 36–44px
- page title: 24–32px
- body: 14–16px
- UI: 13–14px
- code: 12–14px

Use tight letter spacing for large headings and comfortable line height for body text.

## Color

Base:
- background: near-white
- foreground: near-black
- borders: neutral gray
- muted text: medium gray

Dark mode:
- background: near-black
- foreground: near-white
- borders remain subtle gray

Accent:
- use one restrained accent only where action/status needs it

Avoid:
- rainbow gradients
- neon glows
- glassmorphism
- excessive purple AI aesthetics

## Radius

Use restrained radii:
- 6–10px for controls
- 10–14px for panels
- avoid giant pill-shaped UI unless semantically appropriate

## Shadows

Use very soft shadows only where layering requires it.

## Motion

- 150–220ms micro-interactions
- ease-out
- no springy/bouncy motion
- preview resize should feel smooth
- drawer transitions should be subtle

## Main navigation

Desktop:
- wordmark
- Products / Docs / Pricing
- GitHub
- Sign in
- Get started

Application:
- workspace selector
- Projects
- Components
- Settings
- account

## Core pages

### 1. Landing
Sections:
- hero
- interactive mini editor/preview demo
- feature split
- workflow
- component showcase
- developer testimonials/metrics
- CTA
- footer

### 2. Dashboard
- project list
- recent components
- create button
- search
- sort/filter
- empty state

### 3. Creator / Workspace
This is the main product.

Layout:
- top bar
- left code editor
- right preview
- bottom diagnostics
- optional right inspector later

### 4. Share Preview
- clean preview-first page
- code/preview switch
- copy
- download
- author/project metadata

### 5. Settings
- profile
- workspace
- API/exports later
- usage
- danger zone

## Responsive behavior

At < 900px:
- editor and preview become switchable tabs
- toolbar collapses
- diagnostics becomes bottom sheet

At < 640px:
- compact header
- preview becomes primary
- editor in dedicated tab
- no dense desktop-only sidebars

## Component quality

Every reusable UI component must support:
- keyboard focus
- disabled state
- loading state
- error state where relevant
- dark mode
- reduced motion
