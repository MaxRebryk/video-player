import React from "react";
import { FullscreenIcon, FullscreenExitIcon } from "@/video-player/icons/icons";
import styles from "./fullscreen-button.module.css";

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggle: () => void;
}

export default function FullscreenButton({
  isFullscreen,
  onToggle,
}: FullscreenButtonProps) {

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onToggle}
      aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </button>
  );
}
