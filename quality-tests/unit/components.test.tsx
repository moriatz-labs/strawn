import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import { describe, expect, it, vi } from "vitest";
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Flex, Heading, IconButton, Progress, SegmentedControl, Separator, Text, ThemeProvider } from "strawn";

function renderSystem(children: ReactNode) {
  return render(<ThemeProvider>{children}</ThemeProvider>);
}

describe("design-system quality contract", () => {
  it("composes a semantic editorial card and forwards its ref", () => {
    const ref = { current: null as HTMLElement | null };
    renderSystem(
      <Card ref={ref} aria-label="Field notes" data-testid="card" css={{ maxWidth: "24rem" }}>
        <CardMedia><img alt="Sunlit reading room" src="/reading-room.jpg" /></CardMedia>
        <CardHeader><h2>Field notes</h2><p>Design observations</p></CardHeader>
        <CardContent><p>A quiet place for considered work.</p></CardContent>
        <CardActions><Button>Read more</Button></CardActions>
      </Card>,
    );

    const card = screen.getByRole("article", { name: "Field notes" });
    expect(ref.current).toBe(card);
    expect(card.getAttribute("data-testid")).toBe("card");
    expect(getComputedStyle(card).maxWidth).toBe("24rem");
    expect(screen.getByRole("img", { name: "Sunlit reading room" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Read more" })).toBeTruthy();
  });

  it("preserves whole-card link semantics through asChild", async () => {
    renderSystem(
      <Card asChild interactive>
        <a href="#story">Read the full story</a>
      </Card>,
    );
    const link = screen.getByRole("link", { name: "Read the full story" });
    expect(link.getAttribute("href")).toBe("#story");
    expect(link.getAttribute("data-interactive")).toBe("true");
    link.focus();
    expect(document.activeElement).toBe(link);
  });

  it("keeps presentational cards free of interactive state markers", () => {
    renderSystem(<Card aria-label="Quiet surface">Quiet surface</Card>);
    expect(screen.getByRole("article", { name: "Quiet surface" }).hasAttribute("data-interactive")).toBe(false);
  });

  it("exposes loading state without changing the button's accessible name", () => {
    renderSystem(<Button loading>Save changes</Button>);
    const button = screen.getByRole("button", { name: "Save changes" });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });

  it("keeps button sizes visually distinct while preserving the medium size", () => {
    renderSystem(
      <>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </>,
    );

    expect(getComputedStyle(screen.getByRole("button", { name: "Small" })).minHeight).toBe("2rem");
    expect(getComputedStyle(screen.getByRole("button", { name: "Medium" })).minHeight).toBe("2.5rem");
    expect(getComputedStyle(screen.getByRole("button", { name: "Large" })).minHeight).toBe("3.5rem");
  });

  it("supports roving arrow-key selection in segmented controls", async () => {
    const onValueChange = vi.fn();
    renderSystem(
      <SegmentedControl
        label="View"
        value="list"
        onValueChange={onValueChange}
        options={[{ label: "List", value: "list" }, { label: "Grid", value: "grid" }]}
      />,
    );
    const list = screen.getByRole("radio", { name: "List" });
    list.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(onValueChange).toHaveBeenCalledWith("grid");
    expect(document.activeElement).toBe(screen.getByRole("radio", { name: "Grid" }));
  });

  it("reports determinate progress with stable semantics", () => {
    renderSystem(<Progress label="Upload" value={25} />);
    expect(screen.getByRole("progressbar", { name: "Upload" }).getAttribute("aria-valuenow")).toBe("25");
    expect(screen.getByText("25%")).toBeTruthy();
  });

  it("keeps compact icon buttons named and keyboard-operable", async () => {
    const onClick = vi.fn();
    renderSystem(<IconButton label="Open palette" icon={<span aria-hidden="true">P</span>} size="xs" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Open palette" });
    button.focus();
    await userEvent.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("lets Box switch semantics and pass through native button behavior", async () => {
    const onClick = vi.fn();
    renderSystem(
      <>
        <Box as="article" aria-label="Release note" data-testid="box-article" css={{ padding: "$4" }}>
          Release note body
        </Box>
        <Box as="button" type="button" onClick={onClick} disabled>
          Disabled shell
        </Box>
      </>,
    );

    const article = screen.getByRole("article", { name: "Release note" });
    expect(article.tagName).toBe("ARTICLE");
    expect(article.getAttribute("data-testid")).toBe("box-article");
    const button = screen.getByRole("button", { name: "Disabled shell" });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("keeps Flex as a layout primitive with gap and wrap controls", () => {
    renderSystem(
      <Flex align="center" gap="$4" wrap="wrap" data-testid="flex-layout">
        <Box>One</Box>
        <Box>Two</Box>
      </Flex>,
    );
    const flex = screen.getByTestId("flex-layout");
    const styles = getComputedStyle(flex);
    expect(styles.display).toBe("flex");
    expect(styles.alignItems).toBe("center");
    expect(styles.flexWrap).toBe("wrap");
    expect(styles.gap).not.toBe("");
  });

  it("renders Separator orientation and emphasis variants with quiet defaults", () => {
    renderSystem(
      <>
        <Separator data-testid="separator-horizontal" />
        <Separator orientation="vertical" emphasis="strong" data-testid="separator-vertical" />
      </>,
    );
    const horizontal = screen.getByTestId("separator-horizontal");
    const vertical = screen.getByTestId("separator-vertical");
    expect(getComputedStyle(horizontal).height).toBe("1px");
    expect(getComputedStyle(horizontal).width).toBe("100%");
    expect(getComputedStyle(vertical).width).toBe("1px");
    expect(getComputedStyle(vertical).minHeight).toBe("1rem");
    expect(getComputedStyle(vertical).backgroundColor).not.toBe(getComputedStyle(horizontal).backgroundColor);
  });

  it("keeps Text and Heading semantic while exposing the approved type scales", () => {
    renderSystem(
      <>
        <Text size="lg" color="$mutedForeground">
          Release owner
        </Text>
        <Heading size="h1" color="$mutedForeground">
          Component review batch
        </Heading>
      </>,
    );
    const label = screen.getByText("Release owner");
    expect(label.tagName).toBe("P");
    expect(getComputedStyle(label).fontSize).not.toBe("");
    expect(getComputedStyle(label).color).not.toBe("");
    const heading = screen.getByRole("heading", { level: 1, name: "Component review batch" });
    expect(getComputedStyle(heading).fontFamily).not.toBe("");
    expect(getComputedStyle(heading).fontSize).not.toBe("");
    expect(getComputedStyle(heading).color).not.toBe("");
  });

  it("has no serious or critical axe violations in representative controls", async () => {
    const { container } = renderSystem(
      <main>
        <Button>Continue</Button>
        <Progress label="Setup" value={50} />
      </main>,
    );
    const results = await axe.run(container);
    expect(results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical")).toEqual([]);
  });
});
