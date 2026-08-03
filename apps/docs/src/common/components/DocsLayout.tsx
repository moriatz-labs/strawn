import { NavLink, Route, Routes } from "react-router-dom";
import { GitHubIcon } from "strawn-icons";
import { NavbarLink, TextStyle } from "strawn";
import { MarketingNav } from "./MarketingNav";
import { ComponentsPage } from "../../features/components/ComponentsPage";
import { CsvImportDialogPage } from "../../features/csv/CsvImportDialogPage";
import { HomePage } from "../../features/home/HomePage";
import { IconsPage } from "../../features/icons/IconsPage";
import { NavbarLabPage } from "../../features/navigation/NavbarLabPage";
import { ThemingPage } from "../../features/theming/ThemingPage";

export function DocsLayout() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <MarketingNav
        brand={(
          <NavbarLink as={NavLink} to="/" aria-label="Strawn home" css={{ fontSize: "$lg", paddingInline: "$2" }}>
            <TextStyle as="span" textStyle="headingSm">Strawn</TextStyle>
          </NavbarLink>
        )}
        items={[
          { label: "Components", to: "/components" },
          { label: "Icons", to: "/icons" },
          { label: "Theming", to: "/theming" },
          { label: "Nav lab", to: "/navbar-lab" },
        ]}
        action={{
          label: "GitHub",
          href: "https://github.com/moriatz-labs/strawn",
          external: true,
          icon: <GitHubIcon aria-hidden="true" size={13} />,
        }}
      />
      <main id="main" className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/components/csv-import-dialog" element={<CsvImportDialogPage />} />
          <Route path="/icons" element={<IconsPage />} />
          <Route path="/navbar-lab" element={<NavbarLabPage />} />
          <Route path="/theming" element={<ThemingPage />} />
        </Routes>
      </main>
    </>
  );
}
