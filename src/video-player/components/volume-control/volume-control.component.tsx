import React, { useState } from "react";
import { VolumeIcon, MutedIcon } from "@/video-player/icons/icons";
import styles from "./volume-control.module.css";

interface VolumeControlProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  volume: number;
  isMuted: boolean;
}

export default function VolumeControl({
  videoRef,
  volume,
  isMuted,
}: VolumeControlProps) {
  const [prevVolume, setPrevVolume] = useState(1);

  const handleMuteToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.muted) {
      video.muted = false;
      video.volume = prevVolume || 0.5;
    } else {
      setPrevVolume(video.volume);
      video.muted = true;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const value = parseFloat(e.target.value);
    video.volume = value;
    video.muted = value === 0;
  };

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.button}
        onClick={handleMuteToggle}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <MutedIcon /> : <VolumeIcon />}
      </button>
      <input
        type="range"
        className={styles.slider}
        min={0}
        max={1}
        step={0.1}
        value={isMuted ? 0 : volume}
        onChange={handleVolumeChange}
        aria-label="Volume"
      />
    </div>
  );
}
