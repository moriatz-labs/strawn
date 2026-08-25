import heroWordmarkSource from "./MoriatzSans-Hero-Strokes.json";

export type HeroStroke = {
  kind: "ink" | "travel";
  path: string;
  length: number;
  glyph: string;
};

export type HeroWordmarkData = {
  fontVersion: string;
  viewBox: [number, number, number, number];
  lines: ["MORIATZ", "SANS"];
  lineLayouts: Array<{ text: string; x: number; baseline: number; tracking: number }>;
  strokes: HeroStroke[];
  totalInkLength: number;
};

export type FontScenePreset = "hero-writing" | "ink-chamber" | "contact-point" | "ink-current";

export const heroWordmark = heroWordmarkSource as HeroWordmarkData;

export const fontFacts = {
  family: "Moriatz Sans",
  variableLabel: "Variable 100—700",
  version: heroWordmark.fontVersion,
  releaseUrl: "https://github.com/moriatz-labs/moriatz-sans/releases/latest",
  defaultWeight: 500,
  metrics: [
    { label: "Cap height", value: 720 },
    { label: "X-height", value: 520 },
    { label: "Baseline", value: 0 },
    { label: "Descender", value: -220 },
  ],
} as const;

export const materialChapters: Array<{
  label: string;
  title: string;
  body: string;
  preset: Exclude<FontScenePreset, "hero-writing">;
}> = [
  {
    label: "Stroke",
    title: "The stroke remembers the tool.",
    body: "Each segment begins and ends in a taper. Sharp without becoming brittle; mechanical without losing motion.",
    preset: "contact-point",
  },
  {
    label: "Weight",
    title: "Weight moves through one body.",
    body: "From 100 Fine to 700 Structural, the skeleton stays fixed while density gathers around it. The default is 500 Dense.",
    preset: "ink-chamber",
  },
  {
    label: "Rhythm",
    title: "Two cases. One current.",
    body: "Capitals hold the architecture. Lowercase adds bowls, shoulders, ascenders, and descenders without leaving the same visual language.",
    preset: "ink-current",
  },
];

export const heroTiming = {
  fadeEnd: 450,
  orbitStart: 350,
  orbitEnd: 1550,
  anticipationEnd: 1850,
  drawingEnd: 6900,
  followThroughEnd: 7550,
} as const;
