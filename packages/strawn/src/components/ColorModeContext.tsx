import { createContext } from "react";
import { ColorModeContextValue } from "../types/ColorModeContextValue";

export const ColorModeContext = createContext<ColorModeContextValue | null>(null);
