import { NavLink, Route, Routes } from "react-router-dom";
import { GitHubIcon } from "strawn-icons";
import { MarketingNav } from "./MarketingNav";
import { ComponentsPage } from "../../features/components/ComponentsPage";
import { CsvImportDialogPage } from "../../features/csv/CsvImportDialogPage";
import { HomePage } from "../../features/home/HomePage";
import { IconsPage } from "../../features/icons/IconsPage";
import { ThemingPage } from "../../features/theming/ThemingPage";

export function DocsLayout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <MarketingNav
        brand={(
          <NavLink className="brand" to="/" aria-label="Strawn home">
            <span className="brand-mark" aria-hidden="true" />
            <span aria-hidden="true">Strawn</span>
          </NavLink>
        )}
        items={[
          { label: "Components", to: "/components" },
          { label: "Icons", to: "/icons" },
          { label: "Theming", to: "/theming" },
        ]}
        action={{
          label: "GitHub",
          href: "https://github.com/moriatz-labs/strawn",
          external: true,
          icon: <GitHubIcon aria-hidden="true" size={16} />,
        }}
      />
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
