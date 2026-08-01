import type {
  StrawnTheme,
  ThemeDefinition,
  ThemeTokenOverrides,
  ThemeTokens,
} from "./types/theme";

const sans = '"Geist Variable", "Geist", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const display = '"Bricolage Grotesque Variable", "Bricolage Grotesque", "Geist Variable", "Geist", ui-sans-serif, system-ui, sans-serif';
const mono = '"Geist Mono Variable", "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

export const defaultTheme: ThemeTokens = {
  colors: {
    background: "#ffffff",
    foreground: "#251b2e",
    card: "#ffffff",
    cardForeground: "#251b2e",
    popover: "#ffffff",
    popoverForeground: "#251b2e",
    primary: "#5b3cc4",
    primaryForeground: "#ffffff",
    secondary: "#f1edf8",
    secondaryForeground: "#433451",
    muted: "#f4f1f7",
    mutedForeground: "#62586f",
    accent: "#eee8ff",
    accentForeground: "#4c1d95",
    surface: "#ffffff",
    surfaceRaised: "#ffffff",
    surfaceInset: "#f2eff7",
    inverse: "#24172f",
    inverseForeground: "#fbf9ff",
    success: "#14734d",
    successForeground: "#ffffff",
    successMuted: "#e9f7ef",
    successMutedForeground: "#0d5b3a",
    warning: "#8a5a08",
    warningForeground: "#ffffff",
    warningMuted: "#fff5d6",
    warningMutedForeground: "#5d4100",
    info: "#4b4fb3",
    infoForeground: "#ffffff",
    infoMuted: "#f0efff",
    infoMutedForeground: "#373b8f",
    destructive: "#b42318",
    destructiveForeground: "#ffffff",
    destructiveMuted: "#fff0ef",
    destructiveMutedForeground: "#8f1d14",
    border: "#e4dfeb",
    borderStrong: "#81758f",
    input: "#8b7f98",
    ring: "#6d50d3",
  },
  fonts: { ui: sans, body: sans, heading: display, mono },
  typography: {
    sizeXs: "0.75rem",
    sizeSm: "0.875rem",
    sizeMd: "1rem",
    sizeLg: "1.125rem",
    sizeXl: "1.375rem",
    size2xl: "1.75rem",
    size3xl: "2.25rem",
    size4xl: "clamp(2.5rem, 5vw, 4.75rem)",
    sizeHeading: "clamp(3rem, 7vw, 6rem)",
    leadingTight: "1.04",
    leadingHeading: "1.12",
    leadingUi: "1.3",
    leadingBody: "1.55",
    leadingRelaxed: "1.75",
    trackingTight: "-0.035em",
    trackingHeading: "-0.02em",
    trackingNormal: "0",
    trackingCaps: "0.09em",
    weightRegular: "400",
    weightMedium: "500",
    weightSemibold: "600",
    weightBold: "700",
  },
  space: {
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
    12: "3rem",
    14: "3.5rem",
    16: "4rem",
    20: "5rem",
    24: "6rem",
    32: "8rem",
  },
  sizes: { container: "72rem", containerWide: "88rem", reading: "42rem" },
  radii: { xs: "6px", sm: "8px", md: "10px", lg: "12px", xl: "16px", "2xl": "20px", pill: "9999px" },
  shadows: {
    hairline: "0 0 0 1px rgba(37, 27, 46, 0.08)",
    soft: "none",
    card: "none",
    elevated: "0 18px 48px rgba(44, 25, 65, 0.16), 0 3px 10px rgba(44, 25, 65, 0.08)",
    focus: "0 0 0 3px color-mix(in srgb, var(--ring) 28%, transparent)",
  },
  controls: { heightCompact: "2.75rem", heightDefault: "2.75rem", heightComfortable: "2.75rem", hitTarget: "2.75rem" },
  layers: { base: "0", sticky: "10", header: "20", dropdown: "40", overlay: "50", modal: "60", toast: "70", tooltip: "80" },
  effects: { scrim: "rgba(25, 14, 35, 0.48)", scrimStrong: "rgba(25, 14, 35, 0.68)", imageOutline: "rgba(0, 0, 0, 0.1)", disabledOpacity: "0.5" },
  borderWidths: { subtle: "1px", strong: "2px" },
  motion: {
    durationImmediate: "80ms",
    durationFast: "150ms",
    durationBase: "250ms",
    durationSlow: "400ms",
    durationDeliberate: "500ms",
    easeEnter: "cubic-bezier(0.22, 1, 0.36, 1)",
    easeExit: "cubic-bezier(0.4, 0, 1, 1)",
    easeStandard: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeDrawer: "cubic-bezier(0.32, 0.72, 0, 1)",
    scalePress: "0.985",
  },
};

function mergeTokens(base: ThemeTokens, overrides: ThemeTokenOverrides = {}): ThemeTokens {
  return Object.fromEntries(
    Object.entries(base).map(([scale, values]) => [
      scale,
      { ...values, ...(overrides[scale as keyof ThemeTokens] ?? {}) },
    ]),
  ) as ThemeTokens;
}

export const darkTheme = mergeTokens(defaultTheme, {
  colors: {
    background: "#14101b",
    foreground: "#f7f3fb",
    card: "#1c1625",
    cardForeground: "#f7f3fb",
    popover: "#241c30",
    popoverForeground: "#f7f3fb",
    primary: "#c4b5fd",
    primaryForeground: "#24114d",
    secondary: "#2b2338",
    secondaryForeground: "#eee8f7",
    muted: "#2a2235",
    mutedForeground: "#bdb3c8",
    accent: "#35264f",
    accentForeground: "#e2d5ff",
    surface: "#1c1625",
    surfaceRaised: "#241c30",
    surfaceInset: "#14101b",
    inverse: "#faf9fc",
    inverseForeground: "#251b2e",
    success: "#6fd6a4",
    successForeground: "#08291a",
    successMuted: "#173728",
    successMutedForeground: "#9ce8c3",
    warning: "#f5c45a",
    warningForeground: "#332300",
    warningMuted: "#3b3018",
    warningMutedForeground: "#f7d98e",
    info: "#a7a2ff",
    infoForeground: "#1f224b",
    infoMuted: "#282752",
    infoMutedForeground: "#cbc8ff",
    destructive: "#ff9b91",
    destructiveForeground: "#3d1917",
    destructiveMuted: "#452220",
    destructiveMutedForeground: "#ffc1bb",
    border: "#3d3348",
    borderStrong: "#756981",
    input: "#6d6179",
    ring: "#b99cff",
  },
  shadows: {
    hairline: "0 0 0 1px rgba(255, 255, 255, 0.09)",
    soft: "none",
    card: "none",
    elevated: "0 20px 56px rgba(0, 0, 0, 0.42), 0 3px 12px rgba(0, 0, 0, 0.26)",
  },
  effects: { scrim: "rgba(9, 5, 14, 0.68)", scrimStrong: "rgba(9, 5, 14, 0.84)", imageOutline: "rgba(255, 255, 255, 0.1)" },
});

export const tokens = defaultTheme;

export function createTheme(definition: ThemeDefinition = {}): StrawnTheme {
  return {
    light: mergeTokens(defaultTheme, definition.light),
    dark: mergeTokens(darkTheme, definition.dark),
  };
}

const prefixes: Record<keyof ThemeTokens, string> = {
  colors: "",
  fonts: "font",
  typography: "type",
  space: "space",
  sizes: "size",
  radii: "radius",
  shadows: "shadow",
  controls: "control",
  layers: "layer",
  effects: "effect",
  borderWidths: "border-weight",
  motion: "motion",
};

function kebabCase(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Za-z])(\d)/g, "$1-$2")
    .toLowerCase();
}

export function themeToCssVariables(theme: ThemeTokens): Record<string, string> {
  const variables: Record<string, string> = {};
  for (const [scaleName, scale] of Object.entries(theme)) {
    const prefix = prefixes[scaleName as keyof ThemeTokens];
    for (const [token, value] of Object.entries(scale)) {
      variables[`--${[prefix, kebabCase(token)].filter(Boolean).join("-")}`] = value;
    }
  }
  return variables;
}

export const defaultThemeVariables = themeToCssVariables(defaultTheme);
