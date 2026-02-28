import React from "react";
import { PlayIcon, PauseIcon } from "./icons";

export default function PlayPauseButton({
  isPlaying,
  videoRef,
}: {
  isPlaying: boolean;
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  return (
    <button
      type="button"
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
