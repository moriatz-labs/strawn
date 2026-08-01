import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, TooltipProvider } from "strawn";
import { DocsLayout } from "./common/components/DocsLayout";

const docsColorModeStorageKey = "strawn-docs-color-mode-v3";

if (typeof window !== "undefined") {
  window.localStorage.setItem(docsColorModeStorageKey, "light");
}

export function App() {
  return (
    <ThemeProvider defaultColorMode="light" storageKey={docsColorModeStorageKey}>
      <TooltipProvider>
        <BrowserRouter>
          <DocsLayout />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}
