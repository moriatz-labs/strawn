import type { ReactNode } from "react";
import type { ColorModePreference } from "./ColorModePreference";
import type { MotionPreference } from "./MotionPreference";

export type ThemeScale = Record<string, string>;

export type ThemeTokens = {
  colors: ThemeScale;
  fonts: ThemeScale;
  typography: ThemeScale;
  space: ThemeScale;
  sizes: ThemeScale;
  radii: ThemeScale;
  shadows: ThemeScale;
  controls: ThemeScale;
  layers: ThemeScale;
  effects: ThemeScale;
  borderWidths: ThemeScale;
  motion: ThemeScale;
};

export type ThemeTokenOverrides = {
  [Scale in keyof ThemeTokens]?: Partial<ThemeTokens[Scale]>;
};

export type ThemeDefinition = {
  light?: ThemeTokenOverrides;
  dark?: ThemeTokenOverrides;
};

export type StrawnTheme = {
  light: ThemeTokens;
  dark: ThemeTokens;
};

export type ThemeProviderProps = {
  children: ReactNode;
  theme?: StrawnTheme;
  defaultColorMode?: ColorModePreference;
  motionPreference?: MotionPreference;
  storageKey?: string;
};
