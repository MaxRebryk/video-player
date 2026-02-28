import React from "react";
import { FullscreenIcon, FullscreenExitIcon } from "./icons";

export default function FullscreenButton({
  containerRef,
  isFullscreen,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isFullscreen: boolean;
}) {
  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      // Fullscreen not supported
    }
  };

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </button>
  );
}
