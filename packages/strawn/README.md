# strawn

Strawn - Moriatz's official design system. This package provides its accessible React components, tokens, themes, styling utilities, and providers.

Install Strawn, its icon package, and the canonical variable fonts:

```sh
bun add strawn strawn-icons github:moriatz-labs/moriatz-sans#v0.2.0
```

Load the font styles once at the application entry point, before rendering `ThemeProvider`:

```tsx
import "moriatz-sans";
import { Button, ThemeProvider } from "strawn";

<ThemeProvider>
  <Button>Continue</Button>
</ThemeProvider>;
```

Moriatz Sans is Strawn's complete typographic voice. The same original variable family is used for interface controls, body copy, headings, code, data, and brand moments.
