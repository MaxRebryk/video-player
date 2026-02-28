import React from "react";
import styles from "./chapter-tooltip.module.css";

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

interface ChapterTooltipProps {
  time: number;
  chapterTitle: string;
  x: number;
  y: number;
}

export default function ChapterTooltip({
  time,
  chapterTitle,
  x,
  y,
}: ChapterTooltipProps) {
  return (
    <div
      className={styles.tooltip}
      style={{ left: x, top: y - 40 }}
    >
      <div>{formatTime(time)}</div>
      <div className={styles.title}>{chapterTitle}</div>
    </div>
  );
}
