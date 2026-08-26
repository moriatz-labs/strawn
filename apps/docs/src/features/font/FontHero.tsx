import { fontFacts } from "./fontData";

export function FontHero() {
  const tryFont = () => {
    document.getElementById("font-sample")?.focus({ preventScroll: true });
    document.getElementById("font-lab")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="font-hero">
      <div className="font-hero-stage">
        <h1 className="font-hero-title"><span>Toothpick nation,</span><span>rise up!</span></h1>
        <p className="font-hero-description">Strawn is the house typeface for every Moriatz product. Its pointed strokes take their shape from the humble toothpick: lean, sharp, and built to hold together from interface labels to oversized headlines.</p>
      </div>

      <div className="font-hero-footer">
        <div className="font-hero-actions">
          <button type="button" className="font-hero-primary" onClick={tryFont}>Try the font</button>
          <a href={fontFacts.downloadUrl} download>Download v{fontFacts.version} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </header>
  );
}
