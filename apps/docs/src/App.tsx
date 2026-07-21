import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, TooltipProvider } from "strawn";
import { DocsLayout } from "./common/components/DocsLayout";

export function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <DocsLayout />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  );
}
