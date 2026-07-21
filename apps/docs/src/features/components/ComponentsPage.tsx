import { useNavigate } from "react-router-dom";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  CheckboxGroup,
  Progress,
  SegmentedControl,
  Stack,
  Switch,
  Tabs,
  TextField,
  TextStyle,
} from "strawn";

export function ComponentsPage() {
  const navigate = useNavigate();
  return (
    <Stack gap="$8">
      <header className="page-heading">
        <TextStyle as="span" textStyle="eyebrow" tone="accent">Components</TextStyle>
        <TextStyle as="h1" textStyle="headingLg">A compact, practical foundation.</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">Core primitives and one reusable CSV workflow—nothing product-specific.</TextStyle>
      </header>
      <section className="specimen-grid" aria-label="Component specimens">
        <Card>
          <CardContent className="specimen">
            <TextStyle as="h2" textStyle="title">Actions</TextStyle>
            <Box css={{ display: "flex", flexWrap: "wrap", gap: "$3" }}>
              <Button>Continue</Button><Button variant="outline">Cancel</Button><Button variant="ghost">Learn more</Button>
            </Box>
            <Alert tone="success" title="Ready">The component package is available locally.</Alert>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="specimen">
            <TextStyle as="h2" textStyle="title">Inputs</TextStyle>
            <TextField label="Email" placeholder="name@example.com" />
            <Switch label="Product updates" defaultChecked />
            <Progress label="Migration progress" value={64} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="specimen">
            <TextStyle as="h2" textStyle="title">Selection</TextStyle>
            <SegmentedControl label="Density" value="comfortable" onValueChange={() => undefined} options={[{ label: "Compact", value: "compact" }, { label: "Comfortable", value: "comfortable" }]} />
            <CheckboxGroup label="Channels" value={["email"]} onValueChange={() => undefined} options={[{ label: "Email", value: "email" }, { label: "SMS", value: "sms" }]} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="specimen">
            <TextStyle as="h2" textStyle="title">Disclosure</TextStyle>
            <Accordion items={[{ value: "one", title: "What is Strawn?", content: "Moriatz's official design system." }]} />
            <Tabs items={[{ value: "light", label: "Light", content: "Default light theme" }, { value: "dark", label: "Dark", content: "Built-in dark theme" }]} defaultValue="light" />
          </CardContent>
        </Card>
      </section>
      <Card>
        <CardContent className="specimen specimen-row">
          <Avatar name="Strawn Design System" initials="SD" />
          <Box css={{ display: "grid", gap: "$1", flex: 1 }}>
            <TextStyle as="h2" textStyle="title">CSV Import Dialog</TextStyle>
            <TextStyle as="p" tone="muted">The only composed workflow included in the first release.</TextStyle>
          </Box>
          <Badge tone="info">Generic</Badge>
          <Button onClick={() => navigate("/components/csv-import-dialog")} variant="outline">Open specimen</Button>
        </CardContent>
      </Card>
    </Stack>
  );
}
