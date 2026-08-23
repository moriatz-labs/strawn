import type { ComponentType } from "react";
import { Box, Card, CardContent, Stack, TextStyle } from "strawn";
import * as iconLibrary from "strawn-icons";
import type { IconProps } from "strawn-icons";

const icons = Object.entries(iconLibrary)
  .sort(([first], [second]) => first.localeCompare(second))
  .slice(0, 110) as [string, ComponentType<IconProps>][];

export function IconsPage() {
  return (
    <Stack gap="$8">
      <header className="page-heading centered-page-heading">
        <TextStyle as="span" textStyle="eyebrow" tone="accent">List</TextStyle>
        <TextStyle as="h1" textStyle="headingLg">One coherent icon set.</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">Named React exports, currentColor by default, and no catalog subpath.</TextStyle>
      </header>
      <section className="icon-grid" aria-label="Selected icons">
        {icons.map(([name, Icon]) => (
          <Card key={name}>
            <CardContent className="icon-card">
              <Box aria-hidden="true"><Icon size={24} /></Box>
              <TextStyle as="span" textStyle="caption" tone="muted">{name}</TextStyle>
            </CardContent>
          </Card>
        ))}
      </section>
    </Stack>
  );
}
