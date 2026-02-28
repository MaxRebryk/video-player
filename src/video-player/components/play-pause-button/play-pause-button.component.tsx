import React from "react";
import { PlayIcon, PauseIcon } from "@/video-player/icons/icons";
import styles from "./play-pause-button.module.css";

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
}

export default function PlayPauseButton({
  isPlaying,
  onPlay,
  onPause,
}: PlayPauseButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={isPlaying ? onPause : onPlay}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
