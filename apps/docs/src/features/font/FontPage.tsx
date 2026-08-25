import { useState, type KeyboardEvent } from "react";
import { FontHero } from "./FontHero";
import { FontMaterialStory } from "./FontMaterialStory";
import { fontFacts } from "./fontData";

const weightSpecimens = [{ weight: 100, label: "Fine" }, { weight: 300, label: "Signature" }, { weight: 500, label: "Dense" }, { weight: 700, label: "Structural" }] as const;
const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 !?@#%&·–—";
const inspectorGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.!?";
const secondaryLoopGlyphs = "bdhpq";
const secondaryLoopHeight = 430;

export function FontPage() {
  const [weight, setWeight] = useState(500);
  const [size, setSize] = useState(160);
  const [spacing, setSpacing] = useState(4);
  const [sample, setSample] = useState("Moriatz Sans");
  const [inspectedGlyph, setInspectedGlyph] = useState("T");
  const hasSecondaryLoopGuide = secondaryLoopGlyphs.includes(inspectedGlyph);
  const variableStyle = { fontVariationSettings: `"wght" ${weight}`, fontWeight: weight };

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
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>("button")[nextIndex]?.focus();
  };

  return (
    <div className="font-page">
      <FontHero />
      <FontMaterialStory />

      <section className="font-lab" id="font-lab" aria-labelledby="font-lab-title">
        <div className="font-tool-heading"><span>Test</span><div><h2 id="font-lab-title">Set the pressure.</h2><p>Adjust weight, size, and spacing. Type anything.</p></div></div>
        <div className="font-lab-controls">
          <label className="font-weight-control"><span>Weight</span><input id="font-weight" type="range" min="100" max="700" step="1" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /><output htmlFor="font-weight">{weight}</output></label>
          <label className="font-weight-control"><span>Size</span><input type="range" min="48" max="200" step="1" value={size} onChange={(event) => setSize(Number(event.target.value))} /><output>{size}</output></label>
          <label className="font-weight-control"><span>Spacing</span><input type="range" min="-5" max="20" step="1" value={spacing} onChange={(event) => setSpacing(Number(event.target.value))} /><output>{spacing}%</output></label>
        </div>
        <label className="font-sample-input"><span>Sample text</span><input id="font-sample" value={sample} maxLength={48} onChange={(event) => setSample(event.target.value)} /></label>
        <p className="font-live-sample" data-testid="font-live-sample" style={{ ...variableStyle, fontSize: `min(${size}px, 20vw)`, letterSpacing: `${spacing / 100}em` }}>{sample || "Moriatz Sans"}</p>
      </section>

      <section className="font-inspector" aria-labelledby="font-inspector-title">
        <div className="font-tool-heading"><span>Inspect</span><div><h2 id="font-inspector-title">See where every stroke lands.</h2><p>Move through the characters with the arrow keys. Compare cap height, x-height, baseline, descender, and loop closure.</p></div></div>
        <div className="font-inspector-stage">
          <svg viewBox="0 -820 1000 1040" role="img" aria-label={`${inspectedGlyph} aligned to font metrics${hasSecondaryLoopGuide ? ` with a secondary loop line at ${secondaryLoopHeight}` : ""}`}>
            <title>{inspectedGlyph} alignment inspector</title>
            <g className="font-inspector-guides" aria-hidden="true"><line x1="0" x2="1000" y1="-720" y2="-720" /><line x1="0" x2="1000" y1="-520" y2="-520" /><line x1="0" x2="1000" y1="0" y2="0" /><line x1="0" x2="1000" y1="220" y2="220" />{hasSecondaryLoopGuide ? <line className="font-inspector-secondary-guide" x1="0" x2="1000" y1={-secondaryLoopHeight} y2={-secondaryLoopHeight} /> : null}</g>
            <text className="font-inspector-glyph" x="500" y="0" textAnchor="middle" style={variableStyle}>{inspectedGlyph}</text>
          </svg>
          <div className="font-inspector-labels" aria-hidden="true"><span className="font-inspector-label-cap">Cap height <b>720</b></span><span className="font-inspector-label-x-height">X-height <b>520</b></span>{hasSecondaryLoopGuide ? <span className="font-inspector-label-loop">Loop closes <b>{secondaryLoopHeight}</b></span> : null}<span className="font-inspector-label-baseline">Baseline <b>0</b></span><span className="font-inspector-label-descender">Descender <b>−220</b></span></div>
        </div>
        <div className="font-inspector-grid" role="toolbar" aria-label="Choose a glyph">{[...inspectorGlyphs].map((glyph) => <button type="button" key={glyph} aria-label={`Inspect ${glyph}`} aria-pressed={inspectedGlyph === glyph} tabIndex={inspectedGlyph === glyph ? 0 : -1} onClick={() => setInspectedGlyph(glyph)} onKeyDown={(event) => moveInspectorFocus(event, glyph)}>{glyph}</button>)}</div>
      </section>

      <section className="font-weight-spectrum" aria-labelledby="weight-spectrum-title">
        <div className="font-section-heading"><h2 id="weight-spectrum-title">One continuous voice.</h2><p>One skeleton, moving from Fine to Structural.</p></div>
        <div className="font-weight-list">{weightSpecimens.map((specimen) => <article key={specimen.weight} style={{ fontVariationSettings: `"wght" ${specimen.weight}`, fontWeight: specimen.weight }}><span>{specimen.weight}</span><p>Moriatz Sans</p><span>{specimen.label}</span></article>)}</div>
      </section>

      <section className="font-glyph-section" aria-labelledby="glyph-title">
        <div className="font-section-heading"><h2 id="glyph-title">Every character in the current cut.</h2><p>Architectural capitals, true lowercase, numerals, and essential punctuation.</p></div><p className="font-glyphs">{glyphs}</p>
      </section>

      <section className="font-details" aria-labelledby="font-details-title">
        <div className="font-details-lead"><span>Technical details</span><h2 id="font-details-title">Ready for the web.</h2><p>Self-host the variable family or install the current release directly from Moriatz.</p><a href={fontFacts.releaseUrl}>Download v{fontFacts.version} <span aria-hidden="true">↗</span></a></div>
        <dl><div><dt>Axis</dt><dd>Weight, 100—700</dd></div><div><dt>Default</dt><dd>500 Dense</dd></div><div><dt>Alignment</dt><dd>720 cap · 520 x-height · 0 baseline</dd></div><div><dt>Coverage</dt><dd>Basic Latin + display punctuation</dd></div><div><dt>Formats</dt><dd>Variable TTF, WOFF2, Regular TTF</dd></div><div><dt>License</dt><dd>SIL Open Font License 1.1</dd></div></dl>
      </section>
    </div>
  );
}
