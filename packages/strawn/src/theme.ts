import type {
  StrawnTheme,
  ThemeDefinition,
  ThemeTokenOverrides,
  ThemeTokens,
} from "./types/theme";

const sans = '"Geist Variable", "Geist", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const mono = '"Geist Mono Variable", "Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';

export const defaultTheme: ThemeTokens = {
  colors: {
    background: "#fbf9fd",
    foreground: "#241b2b",
    card: "#ffffff",
    cardForeground: "#241b2b",
    popover: "#ffffff",
    popoverForeground: "#241b2b",
    primary: "#765092",
    primaryForeground: "#ffffff",
    secondary: "#f4eef8",
    secondaryForeground: "#4d3262",
    muted: "#f4eef8",
    mutedForeground: "#716579",
    accent: "#eadcf4",
    accentForeground: "#4d3262",
    surface: "#ffffff",
    surfaceRaised: "#ffffff",
    surfaceInset: "#f7f3f9",
    inverse: "#241b2b",
    inverseForeground: "#f8f4fb",
    success: "#16794f",
    successForeground: "#ffffff",
    successMuted: "#e9f7ef",
    successMutedForeground: "#0d5b3a",
    warning: "#8a5b00",
    warningForeground: "#ffffff",
    warningMuted: "#fff5d6",
    warningMutedForeground: "#5d4100",
    info: "#315fbd",
    infoForeground: "#ffffff",
    infoMuted: "#edf3ff",
    infoMutedForeground: "#23498f",
    destructive: "#b42318",
    destructiveForeground: "#ffffff",
    destructiveMuted: "#fff0ef",
    destructiveMutedForeground: "#8f1d14",
    border: "#e4d9ea",
    borderStrong: "#d8c8e1",
    input: "#d8c8e1",
    ring: "#8c68a5",
  },
  fonts: { ui: sans, body: sans, heading: sans, mono },
  typography: {
    sizeXs: "0.75rem",
    sizeSm: "0.875rem",
    sizeMd: "1rem",
    sizeLg: "1.125rem",
    sizeXl: "1.375rem",
    size2xl: "1.75rem",
    size3xl: "2.25rem",
    size4xl: "clamp(2.75rem, 6vw, 5.5rem)",
    sizeHeading: "clamp(3.25rem, 8vw, 7.5rem)",
    leadingTight: "1.02",
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
  radii: { xs: "6px", sm: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "32px", pill: "9999px" },
  shadows: {
    hairline: "0 0 0 1px rgba(36, 27, 43, 0.06)",
    soft: "0 0 0 1px rgba(36, 27, 43, 0.055), 0 2px 8px rgba(36, 27, 43, 0.04)",
    card: "0 4px 24px rgba(76, 49, 94, 0.06)",
    elevated: "0 20px 60px rgba(76, 49, 94, 0.12)",
    focus: "0 0 0 3px color-mix(in srgb, var(--ring) 28%, transparent)",
  },
  controls: { heightCompact: "2rem", heightDefault: "2.75rem", heightComfortable: "3.25rem", hitTarget: "2.75rem" },
  layers: { base: "0", sticky: "20", header: "30", dropdown: "40", overlay: "50", modal: "60", toast: "70", tooltip: "80" },
  effects: { scrim: "rgba(36, 27, 43, 0.42)", scrimStrong: "rgba(36, 27, 43, 0.62)", imageOutline: "rgba(0, 0, 0, 0.1)", disabledOpacity: "0.48" },
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
    scalePress: "0.96",
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
    background: "#18141d",
    foreground: "#f8f4fb",
    card: "#211b27",
    cardForeground: "#f8f4fb",
    popover: "#28202f",
    popoverForeground: "#f8f4fb",
    primary: "#c6a4da",
    primaryForeground: "#241b2b",
    secondary: "#2c2433",
    secondaryForeground: "#f0e8f5",
    muted: "#2c2433",
    mutedForeground: "#c3b8ca",
    accent: "#3a2d43",
    accentForeground: "#f8f4fb",
    surface: "#211b27",
    surfaceRaised: "#28202f",
    surfaceInset: "#18141d",
    inverse: "#f8f4fb",
    inverseForeground: "#241b2b",
    success: "#6fd6a4",
    successForeground: "#08291a",
    successMuted: "#173728",
    successMutedForeground: "#9ce8c3",
    warning: "#f5c45a",
    warningForeground: "#332300",
    warningMuted: "#3b3018",
    warningMutedForeground: "#f7d98e",
    info: "#91b4ff",
    infoForeground: "#132347",
    infoMuted: "#1d2d50",
    infoMutedForeground: "#b9ceff",
    destructive: "#ff9b91",
    destructiveForeground: "#3d1917",
    destructiveMuted: "#452220",
    destructiveMutedForeground: "#ffc1bb",
    border: "#403548",
    borderStrong: "#4c4055",
    input: "#4c4055",
    ring: "#c6a4da",
  },
  shadows: {
    hairline: "0 0 0 1px rgba(255, 255, 255, 0.08)",
    soft: "0 0 0 1px rgba(255, 255, 255, 0.07), 0 2px 8px rgba(0, 0, 0, 0.2)",
    card: "0 4px 24px rgba(0, 0, 0, 0.2)",
    elevated: "0 20px 60px rgba(0, 0, 0, 0.32)",
  },
  effects: { scrim: "rgba(8, 6, 10, 0.58)", scrimStrong: "rgba(8, 6, 10, 0.76)", imageOutline: "rgba(255, 255, 255, 0.1)" },
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
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
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
