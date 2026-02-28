import React from "react";
import { VolumeIcon, MutedIcon } from "@/video-player/icons/icons";
import styles from "./volume-control.module.css";

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onMuteToggle: (volumeToSave?: number) => void;
  onVolumeChange: (value: number) => void;
}

export default function VolumeControl({
  volume,
  isMuted,
  onMuteToggle,
  onVolumeChange,
}: VolumeControlProps) {
  const handleMuteToggle = () => {
    onMuteToggle(isMuted ? undefined : volume);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onVolumeChange(value);
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
        onChange={handleSliderChange}
        aria-label="Volume"
      />
    </div>
  );
}
