import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge, Box, Button, Stack, TextStyle } from "strawn";
import { ArrowRightIcon, CheckIcon } from "strawn-icons";

const threadSteps = [
  {
    id: "foundation",
    label: "Foundation",
    value: "44 px",
    detail: "One reliable control chassis, from buttons to fields.",
  },
  {
    id: "language",
    label: "Language",
    value: "1 face",
    detail: "Moriatz Sans carries interface, body, display, code, and data.",
  },
  {
    id: "behavior",
    label: "Behavior",
    value: "AA",
    detail: "Keyboard, focus, motion, and contrast are part of the component.",
  },
] as const;

export function HomePage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<(typeof threadSteps)[number]["id"]>("foundation");
  const active = threadSteps.find((step) => step.id === activeStep) ?? threadSteps[0];

  return (
    <Stack gap="$16">
      <section className="hero">
        <div className="hero-copy">
          <Badge tone="info">React only</Badge>
          <TextStyle as="h1" textStyle="headingXl">Tools with a clear thread.</TextStyle>
          <TextStyle as="p" textStyle="bodyLg" tone="muted">
            Strawn is Moriatz&apos;s React design system: precise foundations, accessible behavior, and a visual language built for serious product work.
          </TextStyle>
          <Box css={{ display: "flex", flexWrap: "wrap", gap: "$3" }}>
            <Button onClick={() => navigate("/components")} rightIcon={<ArrowRightIcon aria-hidden="true" />}>Browse components</Button>
            <Button onClick={() => navigate("/theming")} variant="outline">Inspect the theme</Button>
          </Box>
        </div>

        <section className="thread-console" aria-labelledby="thread-title">
          <div className="thread-console-header">
            <div>
              <span className="thread-kicker">Live system trace</span>
              <h2 id="thread-title">Follow the thread</h2>
            </div>
            <span className="thread-status"><span aria-hidden="true" />Ready</span>
          </div>
          <div className="thread-path" aria-label="Design-system foundations">
            {threadSteps.map((step, index) => (
              <button
                key={step.id}
                className="thread-node"
                type="button"
                aria-pressed={activeStep === step.id}
                onClick={() => setActiveStep(step.id)}
              >
                <span className="thread-node-index">0{index + 1}</span>
                <span>{step.label}</span>
              </button>
            ))}
          </div>
          <div className="thread-readout" aria-live="polite" data-testid="thread-readout">
            <span className="thread-readout-value">{active.value}</span>
            <span>{active.detail}</span>
          </div>
        </section>
      </section>

      <section className="principles" aria-labelledby="principles-title">
        <div className="section-intro">
          <TextStyle as="span" textStyle="eyebrow" tone="accent">System contract</TextStyle>
          <TextStyle as="h2" id="principles-title" textStyle="headingMd">A small surface with strong opinions.</TextStyle>
        </div>
        <div className="principle-list">
          {[
            ["One component package", "Components, tokens, themes, and styling utilities live in strawn."],
            ["One icon package", "Approved SVG icons are typed React exports from strawn-icons."],
            ["No product baggage", "Products compose the system without shipping their domain back into it."],
          ].map(([title, description], index) => (
            <article className="principle-row" key={title}>
              <span className="principle-number">0{index + 1}</span>
              <div>
                <TextStyle as="h3" textStyle="title">{title}</TextStyle>
                <TextStyle as="p" tone="muted">{description}</TextStyle>
              </div>
              <CheckIcon aria-hidden="true" size={18} />
            </article>
          ))}
        </div>
      </section>

      <section className="install-strip" aria-label="Install Strawn">
        <div>
          <span className="install-label">Start a thread</span>
          <code>bun add strawn strawn-icons</code>
        </div>
        <Button variant="ghost" onClick={() => navigate("/components")}>Read the component contract</Button>
      </section>
    </Stack>
  );
}
