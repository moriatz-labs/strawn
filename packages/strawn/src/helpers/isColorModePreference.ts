import { ColorModePreference } from "../types/ColorModePreference";

export function isColorModePreference(value: string | null | undefined): value is ColorModePreference {
    return value === "light" || value === "dark" || value === "system";
}
