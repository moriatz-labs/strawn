import { BrowserRouter } from "react-router-dom";
import { DocsLayout } from "./common/components/DocsLayout";

export function App() {
  return (
    <BrowserRouter>
      <DocsLayout />
    </BrowserRouter>
  );
}
