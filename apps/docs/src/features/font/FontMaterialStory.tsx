import { useCallback, useEffect, useRef, useState } from "react";
import { FontSceneCanvas } from "./FontSceneCanvas";
import { materialChapters, type FontScenePreset } from "./fontData";
import type { FontSceneFrame } from "./fontScene";

export function FontMaterialStory() {
  const [activePreset, setActivePreset] = useState<FontScenePreset>(materialChapters[0].preset);
  const [available, setAvailable] = useState(true);
  const stepsRef = useRef<Array<HTMLElement | null>>([]);
  const frame = useRef<FontSceneFrame>({ time: 0, progress: 0, phase: "settled" });
  const handleUnavailable = useCallback(() => setAvailable(false), []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset.chapterIndex);
      const chapter = materialChapters[index];
      if (!chapter) return;
      frame.current.progress = Math.min(1, Math.max(0, visible.intersectionRatio));
      setActivePreset(chapter.preset);
    }, { rootMargin: "-20% 0px -20%", threshold: [0.2, 0.45, 0.7] });

    stepsRef.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="font-material-story" aria-label="The construction of Moriatz Sans">
      <div className="font-material-visual" data-preset={activePreset}>
        {available ? (
          <FontSceneCanvas
            preset={activePreset}
            frame={frame}
            className="font-material-canvas"
            onUnavailable={handleUnavailable}
          />
        ) : <span className="font-material-static-pen" aria-hidden="true" />}
        <p aria-hidden="true">{activePreset.replace("-", " ")}</p>
      </div>
      <div className="font-material-chapters">
        {materialChapters.map((chapter, index) => (
          <article
            key={chapter.label}
            ref={(node) => { stepsRef.current[index] = node; }}
            data-chapter-index={index}
            data-active={activePreset === chapter.preset ? "true" : "false"}
          >
            <span>{chapter.label}</span>
            <h2>{chapter.title}</h2>
            <p>{chapter.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
