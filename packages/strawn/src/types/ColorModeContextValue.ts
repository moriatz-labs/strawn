import { ColorMode } from "./ColorMode";
import { ColorModePreference } from "./ColorModePreference";

export type ColorModeContextValue = {
    mode: ColorMode;
    preference: ColorModePreference;
    setPreference: (preference: ColorModePreference) => void;
    toggle: () => void;
};
