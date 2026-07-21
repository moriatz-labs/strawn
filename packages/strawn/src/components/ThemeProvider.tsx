import { useCallback, useEffect, useState } from "react";
import { applyGlobalStyles } from "../constants/applyGlobalStyles";
import { colorModeStorageKey } from "../constants/colorModeStorageKey";
import { isColorModePreference } from "../helpers/isColorModePreference";
import { createTheme, themeToCssVariables } from "../theme";
import type { ColorMode } from "../types/ColorMode";
import type { ColorModePreference } from "../types/ColorModePreference";
import type { ThemeProviderProps } from "../types/theme";
import { ColorModeContext } from "./ColorModeContext";
import { MotionPreferenceContext } from "./MotionPreferenceContext";

const builtInTheme = createTheme();

function getInitialPreference(defaultPreference: ColorModePreference, storageKey: string) {
  if (typeof window === "undefined") return defaultPreference;
  const stored = window.localStorage.getItem(storageKey);
  return isColorModePreference(stored) ? stored : defaultPreference;
}

function resolveMode(preference: ColorModePreference): ColorMode {
  if (preference !== "system") return preference;
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({
  children,
  theme = builtInTheme,
  defaultColorMode = "system",
  motionPreference = "system",
  storageKey = colorModeStorageKey,
}: ThemeProviderProps) {
  applyGlobalStyles();
  const [preference, setPreference] = useState<ColorModePreference>(() =>
    getInitialPreference(defaultColorMode, storageKey),
  );
  const [mode, setMode] = useState<ColorMode>(() => resolveMode(preference));

  const toggle = useCallback(() => {
    setPreference((current) => (resolveMode(current) === "dark" ? "light" : "dark"));
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyMode = () => setMode(resolveMode(preference));
    applyMode();
    if (preference === "system") media.addEventListener("change", applyMode);
    return () => media.removeEventListener("change", applyMode);
  }, [preference]);

  useEffect(() => {
    const root = document.documentElement;
    const variables = themeToCssVariables(theme[mode]);
    for (const [name, value] of Object.entries(variables)) root.style.setProperty(name, value);
    root.dataset.colorMode = mode;
    root.dataset.colorModePreference = preference;
    root.dataset.motionPreference = motionPreference;
    root.style.colorScheme = mode;
    window.localStorage.setItem(storageKey, preference);
  }, [mode, motionPreference, preference, storageKey, theme]);

  return (
    <MotionPreferenceContext.Provider value={motionPreference}>
      <ColorModeContext.Provider value={{ mode, preference, setPreference, toggle }}>
        {children}
      </ColorModeContext.Provider>
    </MotionPreferenceContext.Provider>
  );
}
