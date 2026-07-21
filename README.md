# Strawn

Strawn — Moriatz’s official design system. Accessible React components, typed themes, and a focused icon library.

```sh
bun add strawn strawn-icons
```

```tsx
import { Button, ThemeProvider } from "strawn";
import { DownloadIcon } from "strawn-icons";

export function App() {
  return (
    <ThemeProvider>
      <Button leftIcon={<DownloadIcon aria-hidden="true" />}>Import CSV</Button>
    </ThemeProvider>
  );
}
```

## Packages

- `strawn`: components, tokens, themes, styling utilities, and providers.
- `strawn-icons`: tree-shakeable interface and brand icons.

The repository intentionally excludes application shells, marketing sections, Markdown renderers, commerce, AI, account, collaboration, and integration-specific UI.

## Development

```sh
bun install
bun run docs:dev
bun run quality
```

Releases are managed by Changesets and published from GitHub Actions with npm provenance.

## License

MIT. Icon attribution and trademark notices are documented in `packages/strawn-icons/THIRD_PARTY_NOTICES.md`.
Strawn — Moriatz’s official design system.
