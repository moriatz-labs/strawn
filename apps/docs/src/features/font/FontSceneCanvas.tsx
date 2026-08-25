import { useEffect, useRef, type MutableRefObject } from "react";
import type { FontScenePreset } from "./fontData";
import type { FontSceneController, FontSceneFrame } from "./fontScene";

type FontSceneCanvasProps = {
  preset: FontScenePreset;
  frame: MutableRefObject<FontSceneFrame>;
  className?: string;
  onUnavailable?: () => void;
};

export function FontSceneCanvas({ preset, frame, className, onUnavailable }: FontSceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<FontSceneController | undefined>(undefined);
  const initialPresetRef = useRef(preset);

  useEffect(() => {
    controllerRef.current?.setPreset(preset);
    canvasRef.current?.dispatchEvent(new Event("font-scene-render"));
  }, [preset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let disposed = false;
    let animationFrame = 0;
    let controller: FontSceneController | undefined;
    const abortController = new AbortController();

    const start = async () => {
      try {
        const { createFontScene } = await import("./fontScene");
        if (disposed) return;
        controller = createFontScene(canvas, initialPresetRef.current);
        controllerRef.current = controller;
        const resizeObserver = new ResizeObserver(() => controller?.resize());
        resizeObserver.observe(canvas);
        abortController.signal.addEventListener("abort", () => resizeObserver.disconnect(), { once: true });

        let settledFrames = 0;
        const render = () => {
          if (disposed || document.hidden) return;
          controller?.render(frame.current);
          settledFrames = frame.current.phase === "settled" && initialPresetRef.current === "hero-writing" ? settledFrames + 1 : 0;
          if (settledFrames < 3 || initialPresetRef.current !== "hero-writing") animationFrame = requestAnimationFrame(render);
        };
        animationFrame = requestAnimationFrame(render);

        const resume = () => {
          if (document.hidden || disposed) return;
          cancelAnimationFrame(animationFrame);
          settledFrames = 0;
          animationFrame = requestAnimationFrame(render);
        };
        document.addEventListener("visibilitychange", resume, { signal: abortController.signal });
        canvas.addEventListener("font-scene-render", resume, { signal: abortController.signal });
      } catch {
        onUnavailable?.();
      }
    };

    void start();
    return () => {
      disposed = true;
      abortController.abort();
      cancelAnimationFrame(animationFrame);
      controller?.dispose();
      controllerRef.current = undefined;
    };
  }, [frame, onUnavailable]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
