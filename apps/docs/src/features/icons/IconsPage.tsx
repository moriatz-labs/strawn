import { Box, Card, CardContent, Stack, TextStyle } from "strawn";
import { CalendarIcon, CheckIcon, CloseIcon, DownloadIcon, GitHubIcon, SearchIcon, SettingsIcon, UploadIcon, UserIcon, WarningIcon } from "./iconImports";

const icons = { CalendarIcon, CheckIcon, CloseIcon, DownloadIcon, GitHubIcon, SearchIcon, SettingsIcon, UploadIcon, UserIcon, WarningIcon };

export function IconsPage() {
  return (
    <Stack gap="$8">
      <header className="page-heading centered-page-heading">
        <TextStyle as="span" textStyle="eyebrow" tone="accent">List</TextStyle>
        <TextStyle as="h1" textStyle="headingLg">One coherent icon set.</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">Named React exports, currentColor by default, and no catalog subpath.</TextStyle>
      </header>
      <section className="icon-grid" aria-label="Selected icons">
        {Object.entries(icons).map(([name, Icon]) => (
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
