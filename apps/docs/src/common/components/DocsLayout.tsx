import { NavLink, Route, Routes } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { ComponentsPage } from "../../features/components/ComponentsPage";
import { CsvImportDialogPage } from "../../features/csv/CsvImportDialogPage";
import { HomePage } from "../../features/home/HomePage";
import { IconsPage } from "../../features/icons/IconsPage";
import { ThemingPage } from "../../features/theming/ThemingPage";

export function DocsLayout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Strawn home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span>Strawn</span>
        </NavLink>
        <nav aria-label="Documentation">
          <NavLink to="/components">Components</NavLink>
          <NavLink to="/icons">Icons</NavLink>
          <NavLink to="/theming">Theming</NavLink>
        </nav>
        <ThemeToggle />
      </header>
      <main id="main" className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/components/csv-import-dialog" element={<CsvImportDialogPage />} />
          <Route path="/icons" element={<IconsPage />} />
          <Route path="/theming" element={<ThemingPage />} />
        </Routes>
      </main>
    </>
  );
}
