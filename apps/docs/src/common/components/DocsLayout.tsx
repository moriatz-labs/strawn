import { useEffect } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { GitHubIcon } from "strawn-icons";
import { NavbarLink, TextStyle } from "strawn";
import { MarketingNav } from "./MarketingNav";
import { ComponentsPage } from "../../features/components/ComponentsPage";
import { CsvImportDialogPage } from "../../features/csv/CsvImportDialogPage";
import { FontPage } from "../../features/font/FontPage";
import { HomePage } from "../../features/home/HomePage";
import { IconsPage } from "../../features/icons/IconsPage";

export function DocsLayout() {
  useEffect(() => {
    const root = document.documentElement;
    const visualViewport = window.visualViewport;

    const syncVisualViewport = () => {
      const visualWidth = visualViewport?.width ?? window.innerWidth;
      const isConstrained = visualWidth < window.innerWidth * 0.85;

      if (isConstrained) {
        root.dataset.compactVisualViewport = "true";
        root.style.setProperty("--docs-visual-viewport-width", `${visualWidth}px`);
      } else {
        delete root.dataset.compactVisualViewport;
        root.style.removeProperty("--docs-visual-viewport-width");
      }
    };

    syncVisualViewport();
    visualViewport?.addEventListener("resize", syncVisualViewport);
    window.addEventListener("resize", syncVisualViewport);

    return () => {
      visualViewport?.removeEventListener("resize", syncVisualViewport);
      window.removeEventListener("resize", syncVisualViewport);
      delete root.dataset.compactVisualViewport;
      root.style.removeProperty("--docs-visual-viewport-width");
    };
  }, []);

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
          { label: "Font", to: "/font" },
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
          <Route path="/font" element={<FontPage />} />
        </Routes>
      </main>
    </>
  );
}
