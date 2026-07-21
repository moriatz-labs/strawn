# Strawn Repository Guidance

Strawn is Moriatz's official public React design system.

Use `skills/strawn-design-system/SKILL.md` for foundations, component boundaries, accessibility, testing, and release guidance.

## Public boundary

- `strawn` owns generic components, tokens, themes, providers, and styling utilities.
- `strawn-icons` owns all SVG icon components and attribution.
- Product, marketing, Markdown, AI, commerce, account, collaboration, integration, and app-shell UI belongs in consuming applications.
- Public packages expose only their root entrypoint.

## Delivery

Use reviewed pull requests. Publishing and documentation deployment happen only through GitHub Actions after all required checks pass.
