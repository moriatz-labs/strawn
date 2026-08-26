import { useState, type KeyboardEvent } from "react";
import { FontHero } from "./FontHero";
import { fontCharacterList, fontFacts, fontGlyphs } from "./fontData";

const weightSpecimens = [{ weight: 100, label: "Fine" }, { weight: 300, label: "Signature" }, { weight: 500, label: "Dense" }, { weight: 700, label: "Structural" }] as const;
const inspectorGlyphs = fontGlyphs;
const secondaryLoopGlyphs = "bdhpq";
const secondaryLoopHeight = 430;
const defaultSample = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

export function FontPage() {
  const [weight, setWeight] = useState(500);
  const [size, setSize] = useState(48);
  const [sample, setSample] = useState(defaultSample);
  const [inspectedGlyph, setInspectedGlyph] = useState("T");
  const hasSecondaryLoopGuide = secondaryLoopGlyphs.includes(inspectedGlyph);
  const variableStyle = { fontVariationSettings: `"wght" ${weight}`, fontWeight: weight };

  const moveInspectorFocus = (event: KeyboardEvent<HTMLButtonElement>, glyph: string) => {
    const glyphList = inspectorGlyphs;
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

      <section className="font-lab" id="font-lab" aria-labelledby="font-lab-title">
        <h2 className="font-playground-title" id="font-lab-title">Playground</h2>
        <div className="font-lab-controls">
          <label className="font-weight-control"><span>Weight</span><input id="font-weight" type="range" min="100" max="700" step="1" value={weight} onChange={(event) => setWeight(Number(event.target.value))} /><output htmlFor="font-weight">{weight}</output></label>
          <label className="font-weight-control"><span>Size</span><input type="range" min="48" max="200" step="1" value={size} onChange={(event) => setSize(Number(event.target.value))} /><output>{size}</output></label>
        </div>
        <label className="font-sample-input"><span>Sample text</span><input id="font-sample" value={sample} maxLength={160} onChange={(event) => setSample(event.target.value)} /></label>
        <p className="font-live-sample" data-testid="font-live-sample" style={{ ...variableStyle, fontSize: `min(${size}px, 20vw)` }}>{sample || defaultSample}</p>
      </section>

      <section className="font-inspector" aria-labelledby="font-inspector-title">
        <h2 className="font-inspector-title" id="font-inspector-title">Inspect</h2>
        <div className="font-inspector-stage">
          <svg viewBox="0 -820 1000 1040" role="img" aria-label={`${inspectedGlyph} aligned to font metrics${hasSecondaryLoopGuide ? ` with a secondary loop line at ${secondaryLoopHeight}` : ""}`}>
            <title>{inspectedGlyph} alignment inspector</title>
            <g className="font-inspector-guides" aria-hidden="true"><line x1="0" x2="1000" y1="-720" y2="-720" /><line x1="0" x2="1000" y1="-520" y2="-520" /><line x1="0" x2="1000" y1="0" y2="0" /><line x1="0" x2="1000" y1="220" y2="220" />{hasSecondaryLoopGuide ? <line className="font-inspector-secondary-guide" x1="0" x2="1000" y1={-secondaryLoopHeight} y2={-secondaryLoopHeight} /> : null}</g>
            <text className="font-inspector-glyph" x="500" y="0" textAnchor="middle" style={variableStyle}>{inspectedGlyph}</text>
          </svg>
          <div className="font-inspector-labels" aria-hidden="true"><span className="font-inspector-label-cap">Cap height <b>720</b></span><span className="font-inspector-label-x-height">X-height <b>520</b></span>{hasSecondaryLoopGuide ? <span className="font-inspector-label-loop">Loop closes <b>{secondaryLoopHeight}</b></span> : null}<span className="font-inspector-label-baseline">Baseline <b>0</b></span><span className="font-inspector-label-descender">Descender <b>−220</b></span></div>
        </div>
        <div className="font-inspector-grid" role="toolbar" aria-label="Choose a glyph">{inspectorGlyphs.map((glyph) => <button type="button" key={glyph} aria-label={`Inspect ${glyph}`} aria-pressed={inspectedGlyph === glyph} tabIndex={inspectedGlyph === glyph ? 0 : -1} onClick={() => setInspectedGlyph(glyph)} onKeyDown={(event) => moveInspectorFocus(event, glyph)}>{glyph}</button>)}</div>
      </section>

      <section className="font-weight-spectrum" aria-labelledby="weight-spectrum-title">
        <div className="font-section-heading"><h2 id="weight-spectrum-title">Weights</h2></div>
        <div className="font-weight-list">{weightSpecimens.map((specimen) => <article key={specimen.weight} style={{ fontVariationSettings: `"wght" ${specimen.weight}`, fontWeight: specimen.weight }}><span>{specimen.weight}</span><p>Strawn</p><span>{specimen.label}</span></article>)}</div>
      </section>

      <section className="font-glyph-section" aria-labelledby="glyph-title">
        <div className="font-section-heading"><h2 id="glyph-title">Full list</h2></div><p className="font-glyphs">{fontCharacterList}</p>
      </section>

      <section className="font-details" aria-labelledby="font-details-title">
        <div className="font-details-lead"><h2 id="font-details-title">Details</h2><a href={fontFacts.downloadUrl} download>Download v{fontFacts.version} <span aria-hidden="true">↓</span></a></div>
        <dl><div><dt>Axis</dt><dd>Weight, 100—700</dd></div><div><dt>Default</dt><dd>500 Dense</dd></div><div><dt>Alignment</dt><dd>720 cap · 520 x-height · 0 baseline</dd></div><div><dt>Coverage</dt><dd>GF Latin Core · {fontFacts.characterCount} characters</dd></div><div><dt>Formats</dt><dd>Variable TTF, WOFF2, four static TTFs</dd></div><div><dt>Features</dt><dd>Kerning, mark positioning, canonical composition</dd></div><div><dt>License</dt><dd>SIL Open Font License 1.1</dd></div><div><dt>Source</dt><dd><a href={fontFacts.repositoryUrl}>GitHub <span aria-hidden="true">↗</span></a></dd></div></dl>
      </section>
    </div>
  );
}
