import { describe, expect, it } from "vitest";
import { fontFacts } from "../../apps/docs/src/features/font/fontData";

describe("Strawn font facts", () => {
  it("keeps the published family and variable-weight contract", () => {
    expect(fontFacts.family).toBe("Strawn");
    expect(fontFacts.defaultWeight).toBe(500);
    expect(fontFacts.variableLabel).toBe("Variable 100—700");
    expect(fontFacts.version).toBe("0.7.0");
    expect(fontFacts.characterCount).toBe(319);
    expect(fontFacts.metrics).toEqual([
      { label: "Cap height", value: 720 },
      { label: "X-height", value: 520 },
      { label: "Baseline", value: 0 },
      { label: "Descender", value: -220 },
    ]);
  });
});
