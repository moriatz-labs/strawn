import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FontSceneCanvas } from "./FontSceneCanvas";
import { fontFacts, heroTiming, heroWordmark } from "./fontData";
import type { FontSceneFrame, HeroScenePhase } from "./fontScene";

function supportsEnhancedMotion() {
  if (typeof window === "undefined") return false;
  const connection = navigator as Navigator & { connection?: { saveData?: boolean } };
  const motionPreference = document.documentElement.dataset.motionPreference;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (motionPreference === "reduced" || motionPreference === "none") return false;
  if (connection.connection?.saveData) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function normalizedPhase(elapsed: number): { phase: HeroScenePhase; progress: number } {
  if (elapsed < heroTiming.orbitEnd) {
    return { phase: "orbit", progress: Math.max(0, (elapsed - heroTiming.orbitStart) / (heroTiming.orbitEnd - heroTiming.orbitStart)) };
  }
  if (elapsed < heroTiming.anticipationEnd) {
    return { phase: "anticipation", progress: (elapsed - heroTiming.orbitEnd) / (heroTiming.anticipationEnd - heroTiming.orbitEnd) };
  }
  if (elapsed < heroTiming.drawingEnd) {
    return { phase: "drawing", progress: (elapsed - heroTiming.anticipationEnd) / (heroTiming.drawingEnd - heroTiming.anticipationEnd) };
  }
  if (elapsed < heroTiming.followThroughEnd) {
    return { phase: "follow-through", progress: (elapsed - heroTiming.drawingEnd) / (heroTiming.followThroughEnd - heroTiming.drawingEnd) };
  }
  return { phase: "settled", progress: 1 };
}

export function FontHero() {
  const motionPaths = useRef<Array<SVGPathElement | null>>([]);
  const inkPaths = useRef<Array<SVGPathElement | null>>([]);
  const frame = useRef<FontSceneFrame>({ time: 0, progress: 0, phase: "orbit", tip: { x: 0.08, y: 0.08 } });
  const [phase, setPhase] = useState<HeroScenePhase>(() => supportsEnhancedMotion() ? "orbit" : "settled");
  const [replayKey, setReplayKey] = useState(0);
  const [enhanced, setEnhanced] = useState(supportsEnhancedMotion);
  const totalMotionLength = useMemo(() => heroWordmark.strokes.reduce((sum, stroke) => sum + stroke.length, 0), []);
  const viewBox = heroWordmark.viewBox.join(" ");

  const finishVisuals = useCallback(() => {
    heroWordmark.strokes.forEach((stroke, index) => {
      if (stroke.kind === "ink") inkPaths.current[index]?.style.setProperty("stroke-dashoffset", "0");
    });
    const finalPath = motionPaths.current.at(-1);
    if (finalPath) {
      const point = finalPath.getPointAtLength(finalPath.getTotalLength());
      frame.current.tip = { x: point.x / heroWordmark.viewBox[2], y: point.y / heroWordmark.viewBox[3] };
    }
    frame.current.phase = "settled";
    frame.current.progress = 1;
  }, []);

  const revealAll = useCallback(() => {
    finishVisuals();
    setPhase("settled");
  }, [finishVisuals]);

  const handleUnavailable = useCallback(() => {
    finishVisuals();
    setPhase("settled");
    setEnhanced(false);
  }, [finishVisuals]);

  useEffect(() => {
    if (!enhanced) {
      finishVisuals();
      return;
    }

    let cancelled = false;
    let animationFrame = 0;
    const startSequence = async () => {
      await document.fonts.load('500 1em "Moriatz Sans Variable"');
      if (cancelled) return;
      heroWordmark.strokes.forEach((stroke, index) => {
        if (stroke.kind === "ink") {
          const path = inkPaths.current[index];
          path?.style.setProperty("stroke-dasharray", String(stroke.length));
          path?.style.setProperty("stroke-dashoffset", String(stroke.length));
        }
      });

      const startedAt = performance.now();
      let lastPhase: HeroScenePhase = "orbit";
      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const next = normalizedPhase(elapsed);
        if (next.phase !== lastPhase) {
          lastPhase = next.phase;
          setPhase(next.phase);
        }
        frame.current.time = now;
        frame.current.phase = next.phase;
        frame.current.progress = next.progress;

        if (next.phase === "drawing") {
          const targetDistance = next.progress * totalMotionLength;
          let traversed = 0;
          for (const [index, stroke] of heroWordmark.strokes.entries()) {
            const localDistance = Math.max(0, Math.min(stroke.length, targetDistance - traversed));
            if (stroke.kind === "ink") {
              inkPaths.current[index]?.style.setProperty("stroke-dashoffset", String(stroke.length - localDistance));
            }
            if (targetDistance >= traversed && targetDistance <= traversed + stroke.length) {
              const path = motionPaths.current[index];
              if (path) {
                const exactLength = path.getTotalLength();
                const point = path.getPointAtLength(exactLength * (localDistance / stroke.length));
                frame.current.tip = { x: point.x / heroWordmark.viewBox[2], y: point.y / heroWordmark.viewBox[3] };
              }
            }
            traversed += stroke.length;
          }
        }

        if (next.phase === "settled") {
          revealAll();
          document.querySelector<HTMLCanvasElement>(".font-hero-canvas")?.dispatchEvent(new Event("font-scene-render"));
          return;
        }
        animationFrame = requestAnimationFrame(tick);
      };
      animationFrame = requestAnimationFrame(tick);
    };

    void startSequence();
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
    };
  }, [enhanced, finishVisuals, replayKey, revealAll, totalMotionLength]);

  const replay = () => {
    if (!enhanced) return;
    setPhase("orbit");
    setReplayKey((key) => key + 1);
    document.querySelector<HTMLCanvasElement>(".font-hero-canvas")?.dispatchEvent(new Event("font-scene-render"));
  };

  const tryFont = () => {
    document.getElementById("font-sample")?.focus({ preventScroll: true });
    document.getElementById("font-lab")?.scrollIntoView({ behavior: enhanced ? "smooth" : "auto", block: "start" });
  };

  return (
    <header className="font-hero" data-phase={phase} data-enhanced={enhanced ? "true" : "false"}>
      <div className="font-hero-meta" aria-label="Font metadata">
        <span>{fontFacts.family}</span>
        <span>{fontFacts.variableLabel}</span>
        <span>Version {fontFacts.version}</span>
      </div>

      <div
        className="font-hero-stage"
        onPointerMove={(event) => {
          if (event.pointerType === "touch") return;
          const bounds = event.currentTarget.getBoundingClientRect();
          frame.current.pointer = {
            x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
            y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2,
          };
          event.currentTarget.querySelector("canvas")?.dispatchEvent(new Event("font-scene-render"));
        }}
      >
        <h1 className="visually-hidden">Moriatz Sans</h1>
        <svg className="font-hero-wordmark" viewBox={viewBox} aria-hidden="true">
          <defs>
            <mask id="font-hero-ink-mask">
              <rect width="100%" height="100%" fill="black" />
              {heroWordmark.strokes.map((stroke, index) => stroke.kind === "ink" ? (
                <path
                  key={`mask-${index}`}
                  ref={(node) => { inkPaths.current[index] = node; }}
                  d={stroke.path}
                  fill="none"
                  stroke="white"
                  strokeWidth="142"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={stroke.length}
                />
              ) : null)}
            </mask>
          </defs>
          <g mask="url(#font-hero-ink-mask)" className="font-hero-wordmark-text" aria-hidden="true">
            {heroWordmark.lineLayouts.map((line) => (
              <text key={line.text} x={line.x} y={line.baseline} textAnchor="middle" letterSpacing={line.tracking}>{line.text}</text>
            ))}
          </g>
          <g opacity="0" aria-hidden="true">
            {heroWordmark.strokes.map((stroke, index) => (
              <path key={`motion-${index}`} ref={(node) => { motionPaths.current[index] = node; }} d={stroke.path} fill="none" />
            ))}
          </g>
        </svg>
        {enhanced ? (
          <FontSceneCanvas
            key={replayKey}
            preset="hero-writing"
            frame={frame}
            className="font-hero-canvas"
            onUnavailable={handleUnavailable}
          />
        ) : <span className="font-hero-static-pen" aria-hidden="true" />}
      </div>

      <div className="font-hero-footer">
        <div className="font-hero-copy">
          <p className="font-hero-statement">Drawn to a point.</p>
          <p>A variable sans built from tapered strokes, architectural capitals, and lowercase forms tuned to share one baseline.</p>
        </div>
        <div className="font-hero-actions">
          <button type="button" className="font-hero-primary" onClick={tryFont}>Try the font</button>
          <a href={fontFacts.releaseUrl}>Download v{fontFacts.version} <span aria-hidden="true">↗</span></a>
          <button type="button" className="font-hero-replay" onClick={replay} disabled={!enhanced}>Replay drawing</button>
        </div>
      </div>
    </header>
  );
}
