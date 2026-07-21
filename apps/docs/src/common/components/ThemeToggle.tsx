import { IconButton, useColorMode } from "strawn";
import { MoonIcon, SunIcon } from "strawn-icons";

export function ThemeToggle() {
  const { mode, toggle } = useColorMode();
  const next = mode === "dark" ? "light" : "dark";
  return (
    <IconButton
      label={`Use ${next} theme`}
      icon={mode === "dark" ? <SunIcon aria-hidden="true" /> : <MoonIcon aria-hidden="true" />}
      onClick={toggle}
      variant="ghost"
    />
  );
}
