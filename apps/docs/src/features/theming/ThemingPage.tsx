import { Button, Card, CardContent, createTheme, Stack, TextStyle } from "strawn";

const exampleTheme = createTheme({ light: { colors: { primary: "#765092" } } });

export function ThemingPage() {
  return (
    <Stack gap="$8">
      <header className="page-heading">
        <TextStyle as="span" textStyle="eyebrow" tone="accent">Theming</TextStyle>
        <TextStyle as="h1" textStyle="headingLg">Tokens and styles live with the components.</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">Extend the typed light and dark contracts, then pass the result to ThemeProvider.</TextStyle>
      </header>
      <Card>
        <CardContent className="playground">
          <Button>Token-driven button</Button>
          <TextStyle as="p" tone="muted">Example primary: {exampleTheme.light.colors.primary}</TextStyle>
        </CardContent>
      </Card>
      <pre className="code-block"><code>{`import { createTheme, ThemeProvider } from "strawn";\n\nconst theme = createTheme({\n  light: { colors: { primary: "#765092" } },\n  dark: { colors: { primary: "#c6a4da" } },\n});\n\n<ThemeProvider theme={theme}>\n  <App />\n</ThemeProvider>;`}</code></pre>
    </Stack>
  );
}
