import React from "react";
import styles from "./time-display.module.css";

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

export default function TimeDisplay({
  currentTime,
  duration,
}: TimeDisplayProps) {
  return (
    <span className={styles.display}>
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  );
}
