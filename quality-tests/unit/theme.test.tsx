import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button, createTheme, darkTheme, defaultTheme, TextStyle, ThemeProvider, useColorMode } from "strawn";

function relativeLuminance(hex: string) {
  const channels = hex.match(/[a-f\d]{2}/gi)?.map((channel) => Number.parseInt(channel, 16) / 255);
  if (!channels || channels.length !== 3) throw new Error(`Expected a six-digit hex color, received ${hex}`);
  const [red, green, blue] = channels.map((channel) => (
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  ));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(first: string, second: string) {
  const luminances = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a);
  return (luminances[0] + 0.05) / (luminances[1] + 0.05);
}

function ColorModeProbe() {
  const { mode, toggle } = useColorMode();
  return <Button onClick={toggle}>Mode: {mode}</Button>;
}

describe("Strawn theming", () => {
  it("ships the white-and-black precision foundation", () => {
    expect(defaultTheme.colors.background).toBe("#ffffff");
    expect(defaultTheme.colors.surface).toBe("#ffffff");
    expect(defaultTheme.colors.primary).toBe("#0a0a0a");
    expect(defaultTheme.colors.secondary).toBe("#f2f2f2");
    expect(defaultTheme.colors.accent).toBe("#ededed");
    expect(darkTheme.colors.background).toBe("#000000");
    expect(darkTheme.colors.primary).toBe("#ffffff");
    expect(defaultTheme.colors.primary).not.toBe(defaultTheme.colors.accent);
    expect(defaultTheme.controls.heightDefault).toBe("2.75rem");
    expect(defaultTheme.shadows.card).toBe("none");
    expect(defaultTheme.fonts.heading).toContain("Moriatz Sans Variable");
    expect(new Set(Object.values(defaultTheme.fonts))).toEqual(new Set([defaultTheme.fonts.heading]));
    expect(defaultTheme.typography.trackingDisplay).toBe("0.07em");
    expect(Number(defaultTheme.layers.dropdown)).toBeLessThan(Number(defaultTheme.layers.modal));
    expect(Number(defaultTheme.layers.modal)).toBeLessThan(Number(defaultTheme.layers.tooltip));
  });

  it("keeps text, action, focus, control, and outline contrast across both modes", () => {
    for (const [mode, theme] of [["light", defaultTheme], ["dark", darkTheme]] as const) {
      expect(contrastRatio(theme.colors.foreground, theme.colors.background), `${mode} body text`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme.colors.primary, theme.colors.primaryForeground), `${mode} primary action`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme.colors.mutedForeground, theme.colors.muted), `${mode} muted text`).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(theme.colors.ring, theme.colors.surface), `${mode} focus ring`).toBeGreaterThanOrEqual(3);
      expect(contrastRatio(theme.colors.input, theme.colors.surface), `${mode} input boundary`).toBeGreaterThanOrEqual(3);
      expect(contrastRatio(theme.colors.borderStrong, theme.colors.surface), `${mode} outline boundary`).toBeGreaterThanOrEqual(3);
      expect(contrastRatio(theme.colors.borderStrong, theme.colors.surfaceRaised), `${mode} raised boundary`).toBeGreaterThanOrEqual(3);
    }
  });

  it("emits numeric typography variables that match the heading scale", async () => {
    render(
      <ThemeProvider defaultColorMode="light">
        <TextStyle data-testid="display-heading" textStyle="headingXl">Variable heading</TextStyle>
      </ThemeProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue("--type-size-4xl")).toBe(defaultTheme.typography.size4xl);
    });
    expect(document.documentElement.style.getPropertyValue("--type-size-3xl")).toBe(defaultTheme.typography.size3xl);
    expect(document.documentElement.style.getPropertyValue("--type-size-2xl")).toBe(defaultTheme.typography.size2xl);
    expect(document.documentElement.style.getPropertyValue("--type-size4xl")).toBe("");
    expect(getComputedStyle(screen.getByTestId("display-heading")).fontSize).toBe("var(--fontSizes-4xl)");
    expect(getComputedStyle(document.documentElement).getPropertyValue("--fontSizes-4xl")).toBe("var(--type-size-4xl)");
  });

  it("merges typed light and dark token overrides", () => {
    const theme = createTheme({
      light: { colors: { primary: "#123456" } },
      dark: { colors: { primary: "#abcdef" } },
    });
    expect(theme.light.colors.primary).toBe("#123456");
    expect(theme.dark.colors.primary).toBe("#abcdef");
    expect(theme.light.space[4]).toBe("1rem");
  });

  it("applies theme variables, color mode, persistence, and motion preference", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider defaultColorMode="light" motionPreference="reduced">
        <ColorModeProbe />
      </ThemeProvider>,
    );
    await waitFor(() => expect(document.documentElement.dataset.colorMode).toBe("light"));
    expect(document.documentElement.dataset.motionPreference).toBe("reduced");
    expect(document.documentElement.style.getPropertyValue("--primary")).not.toBe("");
    await user.click(screen.getByRole("button", { name: "Mode: light" }));
    await waitFor(() => expect(document.documentElement.dataset.colorMode).toBe("dark"));
    expect(localStorage.getItem("strawn-color-mode")).toBe("dark");
  });
});
