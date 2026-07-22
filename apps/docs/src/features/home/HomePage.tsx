import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Stack, TextStyle } from "strawn";
import { ArrowRightIcon } from "strawn-icons";

export function HomePage() {
  const navigate = useNavigate();
  return (
    <Stack gap="$8">
      <section className="hero">
        <TextStyle as="h1" textStyle="headingXl">A focused design system for Moriatz products.</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">
          Accessible React components, typed themes, and a coherent icon set in two small packages.
        </TextStyle>
        <Box css={{ display: "flex", flexWrap: "wrap", gap: "$3" }}>
          <Button onClick={() => navigate("/components")} rightIcon={<ArrowRightIcon aria-hidden="true" />}>Browse components</Button>
          <Button onClick={() => navigate("/theming")} variant="outline">Customize a theme</Button>
        </Box>
      </section>
      <section className="feature-grid" aria-label="Package principles">
        {[
          ["One component package", "Components, tokens, themes, and styling utilities live together in strawn."],
          ["One icon package", "Every approved icon is exported by name from strawn-icons."],
          ["No product baggage", "No marketing, Markdown, AI, commerce, account, or app-shell exports."],
        ].map(([title, description]) => (
          <Card key={title}>
            <CardContent css={{ display: "grid", gap: "$2", padding: "$6" }}>
              <TextStyle as="h2" textStyle="title">{title}</TextStyle>
              <TextStyle as="p" tone="muted">{description}</TextStyle>
            </CardContent>
          </Card>
        ))}
      </section>
    </Stack>
  );
}
