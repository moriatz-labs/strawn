---
name: strawn-design-system
description: Build, review, test, or release Strawn components, themes, icons, and documentation.
---

# Strawn Design System

- Keep the public surface limited to `strawn` and `strawn-icons` root exports.
- Components must be generic, composable, responsive, and WCAG 2.2 AA accessible.
- Use semantic theme tokens rather than product-specific values.
- Preserve refs, keyboard behavior, focus visibility, accessible names, consumer CSS hooks, and 44px touch targets.
- Keep SVG markup in `strawn-icons`; update generated interface icons through `scripts/generate-icons.mjs`.
- Test critical interactions with Vitest, Testing Library, axe, and Playwright.
- Run `bun run quality` before release-facing handoff.
- Publish only through the reviewed Changesets workflow.
