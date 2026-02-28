import React from "react";
import { PlayIcon, PauseIcon } from "@/video-player/icons/icons";
import styles from "./play-pause-button.module.css";

interface PlayPauseButtonProps {
  isPlaying: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function PlayPauseButton({
  isPlaying,
  videoRef,
}: PlayPauseButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => {
        if (isPlaying) {
          videoRef.current?.pause();
        } else {
          videoRef.current?.play();
        }
      }}
      aria-label={isPlaying ? "Pause" : "Play"}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
