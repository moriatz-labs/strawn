import { useState, type KeyboardEvent } from "react";
import { TextStyle } from "strawn";

const weightSpecimens = [
  { weight: 100, label: "Fine" },
  { weight: 300, label: "Signature" },
  { weight: 500, label: "Dense" },
  { weight: 700, label: "Structural" },
] as const;

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !?@#%&·–—";
const inspectorGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.!?";
const fontMetrics = [
  { label: "Cap height", value: 720 },
  { label: "X-height", value: 520 },
  { label: "Baseline", value: 0 },
  { label: "Descender", value: -220 },
] as const;

export function FontPage() {
  const [weight, setWeight] = useState(500);
  const [size, setSize] = useState(160);
  const [spacing, setSpacing] = useState(4);
  const [sample, setSample] = useState("Moriatz Sans");
  const [inspectedGlyph, setInspectedGlyph] = useState("T");
  const variableStyle = {
    fontVariationSettings: `"wght" ${weight}`,
    fontWeight: weight,
  };

  const moveInspectorFocus = (event: KeyboardEvent<HTMLButtonElement>, glyph: string) => {
    const glyphList = [...inspectorGlyphs];
    const currentIndex = glyphList.indexOf(glyph);
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % glyphList.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + glyphList.length) % glyphList.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = glyphList.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    setInspectedGlyph(glyphList[nextIndex]);
    const buttons = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button");
    buttons?.[nextIndex]?.focus();
  };

  return (
    <div className="font-page">
      <header className="font-page-hero">
        <div className="font-page-meta">
          <span>Moriatz Sans</span>
          <span>Variable 100—700</span>
          <span>Version 0.6</span>
        </div>
        <h1 aria-label="Moriatz Sans">
          <span>MORIATZ</span>
          <span>SANS</span>
        </h1>
        <div className="font-page-intro">
          <p>An original tapered system face with true lowercase forms designed to sit naturally beside its architectural capitals.</p>
          <a href="https://github.com/moriatz-labs/moriatz-sans/releases/latest">Download the family <span aria-hidden="true">↗</span></a>
        </div>
        <dl className="font-metric-summary">
          {fontMetrics.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section className="font-inspector" aria-labelledby="font-inspector-title">
        <div className="font-section-heading">
          <span>01</span>
          <div>
            <h2 id="font-inspector-title">Interactive glyph inspector</h2>
            <p>Select any glyph to verify its cap line, x-height, baseline, and descender.</p>
          </div>
        </div>
        <div className="font-inspector-stage">
          <svg viewBox="0 -820 1000 1040" role="img" aria-label={`${inspectedGlyph} aligned to font metrics`}>
            <title>{inspectedGlyph} alignment inspector</title>
            <g className="font-inspector-guides" aria-hidden="true">
              <line x1="0" x2="1000" y1="-720" y2="-720" />
              <line x1="0" x2="1000" y1="-520" y2="-520" />
              <line x1="0" x2="1000" y1="0" y2="0" />
              <line x1="0" x2="1000" y1="220" y2="220" />
            </g>
            <text className="font-inspector-glyph" x="500" y="0" textAnchor="middle" style={variableStyle}>{inspectedGlyph}</text>
          </svg>
          <div className="font-inspector-labels" aria-hidden="true">
            <span>Cap height <b>720</b></span>
            <span>X-height <b>520</b></span>
            <span>Baseline <b>0</b></span>
            <span>Descender <b>−220</b></span>
          </div>
        </div>
        <div className="font-inspector-grid" role="toolbar" aria-label="Choose a glyph">
          {[...inspectorGlyphs].map((glyph) => (
            <button
              type="button"
              key={glyph}
              aria-label={`Inspect ${glyph}`}
              aria-pressed={inspectedGlyph === glyph}
              tabIndex={inspectedGlyph === glyph ? 0 : -1}
              onClick={() => setInspectedGlyph(glyph)}
              onKeyDown={(event) => moveInspectorFocus(event, glyph)}
            >
              {glyph}
            </button>
          ))}
        </div>
      </section>

      <section className="font-lab" aria-labelledby="font-lab-title">
        <div className="font-lab-controls">
          <div>
            <TextStyle as="span" textStyle="eyebrow" tone="accent">Variable tester</TextStyle>
            <TextStyle as="h2" id="font-lab-title" textStyle="headingMd">Make it yours.</TextStyle>
          </div>
          <label className="font-weight-control">
            <span>Weight</span>
            <input
              id="font-weight"
              type="range"
              min="100"
              max="700"
              step="1"
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
            />
            <output htmlFor="font-weight">{weight}</output>
          </label>
          <label className="font-weight-control">
            <span>Size</span>
            <input type="range" min="48" max="200" step="1" value={size} onChange={(event) => setSize(Number(event.target.value))} />
            <output>{size}</output>
          </label>
          <label className="font-weight-control">
            <span>Spacing</span>
            <input type="range" min="-5" max="20" step="1" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} />
            <output>{spacing}%</output>
          </label>
        </div>
        <label className="font-sample-input">
          <span>Sample text</span>
          <input value={sample} maxLength={36} onChange={(event) => setSample(event.target.value)} />
        </label>
        <p className="font-live-sample" data-testid="font-live-sample" style={{ ...variableStyle, fontSize: `min(${size}px, 20vw)`, letterSpacing: `${spacing / 100}em` }}>{sample || "Moriatz Sans"}</p>
      </section>

      <section className="font-weight-spectrum" aria-labelledby="weight-spectrum-title">
        <div className="font-section-heading">
          <span>02</span>
          <div>
            <h2 id="weight-spectrum-title">One continuous voice</h2>
            <p>Four moments from a single variable axis.</p>
          </div>
        </div>
        <div className="font-weight-list">
          {weightSpecimens.map((specimen) => (
            <article key={specimen.weight} style={{ fontVariationSettings: `"wght" ${specimen.weight}`, fontWeight: specimen.weight }}>
              <span>{specimen.weight}</span>
              <p>Moriatz Sans</p>
              <span>{specimen.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="font-glyph-section" aria-labelledby="glyph-title">
        <div className="font-section-heading font-section-heading--inverse">
          <span>03</span>
          <div>
            <h2 id="glyph-title">The system alphabet</h2>
            <p>Architectural capitals, true lowercase with ascenders and descenders, numbers, and essential punctuation.</p>
          </div>
        </div>
        <p className="font-glyphs">{glyphs}</p>
      </section>

      <section className="font-details" aria-labelledby="font-details-title">
        <div className="font-section-heading">
          <span>04</span>
          <div>
            <h2 id="font-details-title">Built for Moriatz</h2>
            <p>One family across brand and interface.</p>
          </div>
        </div>
        <dl>
          <div><dt>Axis</dt><dd>Weight, 100—700</dd></div>
          <div><dt>Default</dt><dd>500 Dense</dd></div>
          <div><dt>Alignment</dt><dd>720 cap · 520 x-height · 0 baseline</dd></div>
          <div><dt>Coverage</dt><dd>Basic Latin + display punctuation</dd></div>
          <div><dt>Formats</dt><dd>Variable TTF, WOFF2, Regular TTF</dd></div>
          <div><dt>License</dt><dd>SIL Open Font License 1.1</dd></div>
        </dl>
      </section>
    </div>
  );
}
