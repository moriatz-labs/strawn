# strawn

Strawn - Moriatz's official design system. This package provides its accessible React components, tokens, themes, styling utilities, and providers.

Install Strawn, its icon package, and the canonical variable fonts:

```sh
bun add strawn strawn-icons @fontsource-variable/bricolage-grotesque @fontsource-variable/geist @fontsource-variable/geist-mono
```

Load the font styles once at the application entry point, before rendering `ThemeProvider`:

```tsx
import "@fontsource-variable/bricolage-grotesque/wght.css";
import "@fontsource-variable/geist/wght.css";
import "@fontsource-variable/geist-mono/wght.css";
import { Button, ThemeProvider } from "strawn";

<ThemeProvider>
  <Button>Continue</Button>
</ThemeProvider>;
```

Bricolage Grotesque is the display face, Geist is used for interface and body copy, and Geist Mono is used for code and data.
