import { describe, expect, it } from "vitest";
import { fontFacts, heroTiming, heroWordmark, materialChapters } from "../../apps/docs/src/features/font/fontData";

describe("Moriatz Sans hero artifact", () => {
  it("matches the current font release and canonical title", () => {
    expect(heroWordmark.fontVersion).toBe(fontFacts.version);
    expect(heroWordmark.lines).toEqual(["MORIATZ", "SANS"]);
    expect(heroWordmark.strokes.length).toBeGreaterThan(20);
    expect(heroWordmark.totalInkLength).toBeGreaterThan(0);
    expect(heroWordmark.strokes.some((stroke) => stroke.kind === "travel")).toBe(true);
    expect(heroWordmark.strokes.every((stroke) => stroke.length > 0)).toBe(true);
  });

  it("keeps one shared visual vocabulary across all editorial presets", () => {
    expect(materialChapters.map(({ preset }) => preset)).toEqual(["contact-point", "ink-chamber", "ink-current"]);
    expect(new Set(materialChapters.map(({ preset }) => preset)).size).toBe(3);
  });

  it("orders the writing sequence without overlapping terminal states", () => {
    expect(heroTiming.fadeEnd).toBeLessThan(heroTiming.orbitEnd);
    expect(heroTiming.orbitEnd).toBeLessThan(heroTiming.anticipationEnd);
    expect(heroTiming.anticipationEnd).toBeLessThan(heroTiming.drawingEnd);
    expect(heroTiming.drawingEnd).toBeLessThan(heroTiming.followThroughEnd);
  });
});
