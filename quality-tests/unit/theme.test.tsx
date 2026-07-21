import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button, createTheme, ThemeProvider, useColorMode } from "strawn";

function ColorModeProbe() {
  const { mode, toggle } = useColorMode();
  return <Button onClick={toggle}>Mode: {mode}</Button>;
}

describe("Strawn theming", () => {
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
