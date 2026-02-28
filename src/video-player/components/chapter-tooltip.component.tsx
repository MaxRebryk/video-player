import React from "react";

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function ChapterTooltip({
  time,
  chapterTitle,
  x,
  y,
}: {
  time: number;
  chapterTitle: string;
  x: number;
  y: number;
}) {
  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y - 40,
        transform: "translateX(-50%)",
        padding: "4px 8px",
        background: "rgba(0,0,0,0.8)",
        color: "white",
        borderRadius: 4,
        fontSize: 12,
        pointerEvents: "none",
        zIndex: 1000,
        whiteSpace: "nowrap",
      }}
    >
      <div>{formatTime(time)}</div>
      <div style={{ opacity: 0.9 }}>{chapterTitle}</div>
    </div>
  );
}
