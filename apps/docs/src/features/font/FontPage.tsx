import { useState } from "react";
import { TextStyle } from "strawn";

const weightSpecimens = [
  { weight: 100, label: "Fine" },
  { weight: 300, label: "Signature" },
  { weight: 500, label: "Dense" },
  { weight: 700, label: "Structural" },
] as const;

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 !?@#%&·–—";

export function FontPage() {
  const [weight, setWeight] = useState(400);
  const [sample, setSample] = useState("MORIATZ LABS");
  const variableStyle = {
    fontVariationSettings: `"wght" ${weight}`,
    fontWeight: weight,
  };

  return (
    <div className="font-page">
      <header className="font-page-hero">
        <div className="font-page-meta">
          <span>Moriatz Sans</span>
          <span>Variable 100—700</span>
          <span>Version 0.2</span>
        </div>
        <h1 aria-label="Moriatz Sans">
          <span>MORIATZ</span>
          <span>SANS</span>
        </h1>
        <div className="font-page-intro">
          <p>An original tapered system face. Skeletal by construction, now dark enough for every product surface.</p>
          <a href="https://github.com/moriatz-labs/moriatz-sans/releases/latest">Download the family <span aria-hidden="true">↗</span></a>
        </div>
      </header>

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
        </div>
        <label className="font-sample-input">
          <span>Sample text</span>
          <input value={sample} maxLength={36} onChange={(event) => setSample(event.target.value)} />
        </label>
        <p className="font-live-sample" data-testid="font-live-sample" style={variableStyle}>{sample || "MORIATZ SANS"}</p>
      </section>

      <section className="font-weight-spectrum" aria-labelledby="weight-spectrum-title">
        <div className="font-section-heading">
          <span>01</span>
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
          <span>02</span>
          <div>
            <h2 id="glyph-title">The system alphabet</h2>
            <p>Architectural capitals, compact small capitals, numbers, and essential punctuation.</p>
          </div>
        </div>
        <p className="font-glyphs">{glyphs}</p>
      </section>

      <section className="font-details" aria-labelledby="font-details-title">
        <div className="font-section-heading">
          <span>03</span>
          <div>
            <h2 id="font-details-title">Built for Moriatz</h2>
            <p>One family across brand and interface.</p>
          </div>
        </div>
        <dl>
          <div><dt>Axis</dt><dd>Weight, 100—700</dd></div>
          <div><dt>Default</dt><dd>300 Signature</dd></div>
          <div><dt>Construction</dt><dd>Tapered geometric strokes</dd></div>
          <div><dt>Coverage</dt><dd>Basic Latin + display punctuation</dd></div>
          <div><dt>Formats</dt><dd>Variable TTF, WOFF2, Regular TTF</dd></div>
          <div><dt>License</dt><dd>SIL Open Font License 1.1</dd></div>
        </dl>
      </section>
    </div>
  );
}
