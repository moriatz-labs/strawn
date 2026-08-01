import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  CheckboxGroup,
  Progress,
  SegmentedControl,
  Stack,
  Switch,
  Tabs,
  TextField,
  TextStyle,
} from "strawn";
import { ArrowRightIcon } from "strawn-icons";

const specimenLinks = ["Actions", "Controls", "Selection", "Disclosure", "Workflow"];

export function ComponentsPage() {
  const navigate = useNavigate();
  const [showWorkflowBadge, setShowWorkflowBadge] = useState(true);
  return (
    <Stack gap="$12">
      <header className="page-heading components-heading">
        <TextStyle as="span" textStyle="eyebrow" tone="accent">Component index</TextStyle>
        <TextStyle as="h1" textStyle="headingLg">A precise kit for product work.</TextStyle>
        <TextStyle as="p" textStyle="bodyLg" tone="muted">
          Quiet by default, explicit when state matters, and composed around one dependable interaction chassis.
        </TextStyle>
      </header>

      <div className="component-showroom">
        <aside className="showroom-index" aria-label="On this page">
          <span>On this page</span>
          <ol>
            {specimenLinks.map((label, index) => (
              <li key={label}><a href={`#${label.toLowerCase()}`}><span>0{index + 1}</span>{label}</a></li>
            ))}
          </ol>
        </aside>

        <div className="showroom-sections">
          <section className="showroom-block" id="actions">
            <header className="showroom-block-heading">
              <span>01</span>
              <div><h2>Actions</h2><p>Primary intent leads. Other treatments recede without becoming vague.</p></div>
            </header>
            <div className="specimen-stage specimen-actions">
              <div className="specimen-toolbar">
                <Button>Continue</Button>
                <Button variant="outline">Cancel</Button>
                <Button variant="ghost">Learn more</Button>
              </div>
              <Alert tone="success" title="Ready">The component package is available locally.</Alert>
            </div>
          </section>

          <section className="showroom-block" id="controls">
            <header className="showroom-block-heading">
              <span>02</span>
              <div><h2>Controls</h2><p>A shared 44px chassis keeps forms aligned and touch-safe.</p></div>
            </header>
            <div className="specimen-stage control-specimen">
              <TextField label="Workspace name" placeholder="Moriatz Research" />
              <Switch label="Share product updates" defaultChecked />
              <Progress label="Migration progress" value={64} />
            </div>
          </section>

          <section className="showroom-block" id="selection">
            <header className="showroom-block-heading">
              <span>03</span>
              <div><h2>Selection</h2><p>State is readable through shape, contrast, and semantics - not decoration.</p></div>
            </header>
            <div className="specimen-stage selection-specimen">
              <SegmentedControl label="Density" value="comfortable" onValueChange={() => undefined} options={[{ label: "Compact", value: "compact" }, { label: "Comfortable", value: "comfortable" }]} />
              <CheckboxGroup label="Channels" value={["email"]} onValueChange={() => undefined} options={[{ label: "Email", value: "email" }, { label: "SMS", value: "sms" }]} />
            </div>
          </section>

          <section className="showroom-block" id="disclosure">
            <header className="showroom-block-heading">
              <span>04</span>
              <div><h2>Disclosure</h2><p>Keyboard behavior and focus order stay inside the primitive.</p></div>
            </header>
            <div className="specimen-stage disclosure-specimen">
              <Accordion items={[{ value: "one", title: "What is Strawn?", content: "Moriatz's official React design system." }]} />
              <Tabs items={[{ value: "overview", label: "Overview", content: "Primitives share one clear visual and behavioral contract." }, { value: "behavior", label: "Behavior", content: "Keyboard, focus, and state handling stay inside the component." }]} defaultValue="overview" />
            </div>
          </section>

          <section className="showroom-block" id="workflow">
            <header className="showroom-block-heading">
              <span>05</span>
              <div><h2>Workflow</h2><p>Composed examples prove the primitives without turning into product UI.</p></div>
            </header>
            <div className="workflow-specimen">
              <div className="workflow-avatar"><Avatar name="Strawn Design System" initials="SD" /></div>
              <Box className="workflow-copy" css={{ display: "grid", gap: "$1", flex: 1 }}>
                <TextStyle as="h3" textStyle="title">CSV Import Dialog</TextStyle>
                <TextStyle as="p" tone="muted">A reusable file-selection flow with keyboard and drag-and-drop support.</TextStyle>
              </Box>
              <div className="workflow-meta">
                {showWorkflowBadge ? (
                  <Badge tone="info" onRemove={() => setShowWorkflowBadge(false)} removeLabel="Remove Generic tag">Generic</Badge>
                ) : null}
              </div>
              <Button className="workflow-action" onClick={() => navigate("/components/csv-import-dialog")} variant="outline" rightIcon={<ArrowRightIcon aria-hidden="true" />}>View workflow</Button>
            </div>
          </section>
        </div>
      </div>
    </Stack>
  );
}
