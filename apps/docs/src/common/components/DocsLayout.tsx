import { useEffect } from "react";
import { FontPage } from "../../features/font/FontPage";

export function DocsLayout() {
  useEffect(() => {
    if (window.location.pathname !== "/font") {
      window.history.replaceState(null, "", "/font");
    }

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
      <header className="docs-nav-shell">
        <nav className="docs-marketing-nav" aria-label="Documentation">
          <a className="docs-nav-brand" href="/font" aria-label="Strawn home">Strawn</a>
          <a className="marketing-nav-action" href="https://github.com/moriatz-labs/strawn" target="_blank" rel="noreferrer">
            <svg aria-hidden="true" viewBox="0 0 24 24" width="13" height="13"><path fill="currentColor" d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.9.1 3.2.8.9 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z" /></svg>
            <span>GitHub</span>
          </a>
        </nav>
      </header>
      <main id="main" className="page-shell">
        <FontPage />
      </main>
    </>
  );
}
