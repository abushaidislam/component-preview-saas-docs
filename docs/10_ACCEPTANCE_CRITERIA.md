# Acceptance Criteria

## Landing

- Clear one-line value proposition.
- CTA leads to creator.
- Hero contains a believable interactive product preview.
- Responsive desktop/mobile layout.
- No obvious placeholder content.

## Creator

- TSX editor opens.
- Starter component renders.
- Editing source updates preview.
- Compile errors do not crash the whole app.
- Runtime errors are shown clearly.
- Console messages are visible.
- Desktop/tablet/mobile preview sizes work.
- Fullscreen works.
- Copy/download actions work.
- Saved/unsaved state is visible.

## Persistence

- Logged-out user can work locally.
- Logged-in user can save.
- Existing project can reopen.
- Version snapshot can be restored.
- Shared URL loads read-only version.

## Security

- Preview is isolated.
- User code never runs in server context.
- Unsupported dependencies are rejected.
- No secret values are available to preview code.

## Accessibility

- Keyboard navigation works.
- Visible focus states exist.
- Buttons have accessible names.
- Dialogs trap focus appropriately.
- Color alone is not used to communicate errors.
- Reduced-motion preference is respected.

## Quality

- No TypeScript errors.
- No lint errors.
- No unhandled runtime errors in main app.
- No broken mobile layout in core paths.
