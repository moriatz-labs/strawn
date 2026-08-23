import { Button, Card, CardContent, createTheme, Stack, TextStyle } from "strawn";

const exampleTheme = createTheme({ light: { colors: { primary: "#6d28d9", primaryForeground: "#ffffff" } } });

export function ThemingPage() {
  return (
    <Stack className="theming-page" gap="$8">
      <header className="page-heading centered-page-heading">
        <TextStyle as="span" textStyle="eyebrow" tone="accent">Theming</TextStyle>
        <TextStyle as="h1" textStyle="headingLg">Tokens and styles live with the components.</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">Extend the typed semantic color contract, then pass the result to ThemeProvider.</TextStyle>
      </header>
      <Card>
        <CardContent className="playground theming-playground">
          <Button>Token-driven button</Button>
          <TextStyle as="p" tone="muted">Example primary: {exampleTheme.light.colors.primary}</TextStyle>
        </CardContent>
      </Card>
      <section className="font-specimen" aria-labelledby="font-specimen-title">
        <div>
          <TextStyle as="span" textStyle="eyebrow" tone="accent">Canonical system face</TextStyle>
          <TextStyle as="h2" id="font-specimen-title" textStyle="headingMd">Moriatz Sans</TextStyle>
          <TextStyle as="p" tone="muted">An original variable face built from tapered, toothpick-thin strokes for every interface, body, display, code, and data role.</TextStyle>
        </div>
        <img src="/brand/moriatz-labs-display.png" alt="Moriatz Labs set in the skeletal Moriatz Sans system typeface" />
      </section>
      <pre className="code-block"><code>{`import { createTheme, ThemeProvider } from "strawn";\n\nconst theme = createTheme({\n  light: { colors: { primary: "#6d28d9", primaryForeground: "#ffffff" } },\n});\n\n<ThemeProvider theme={theme}>\n  <App />\n</ThemeProvider>;`}</code></pre>
    </Stack>
  );
}
