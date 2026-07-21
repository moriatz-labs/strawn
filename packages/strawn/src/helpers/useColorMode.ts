import { useContext } from "react";
import { ColorModeContext } from "../components/ColorModeContext";

export function useColorMode() {
    const value = useContext(ColorModeContext);
    if (!value)
        throw new Error("useColorMode must be used within ThemeProvider");
    return value;
}
