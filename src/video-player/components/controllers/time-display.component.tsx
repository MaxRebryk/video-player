import React from "react";

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export default function TimeDisplay({
  currentTime,
  duration,
}: {
  currentTime: number;
  duration: number;
}) {
  return (
    <span className="time-display">
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  );
}
