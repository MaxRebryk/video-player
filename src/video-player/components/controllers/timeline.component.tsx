import React, { useRef, useState, useCallback } from "react";
import type { Chapter } from "../../types/video.types";
import ChapterTooltip from "../chapter-tooltip.component";
import styles from "./timeline.module.css";

function getChapterAtTime(chapters: Chapter[], time: number): Chapter | null {
  return (
    chapters.find((c) => time >= c.start && time < c.end) ?? null
  );
}

const CHAPTER_COLOR = "rgba(255, 255, 255, 0.5)";

export default function Timeline({
  videoRef,
  chapters,
  videoLength,
  currentTime,
  isLoaded,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  chapters: Chapter[];
  videoLength: number;
  currentTime: number;
  isLoaded: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverChapter, setHoverChapter] = useState<Chapter | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const getTimeFromClientX = useCallback(
    (clientX: number): number => {
      const track = trackRef.current;
      if (!track || videoLength <= 0) return 0;
      const rect = track.getBoundingClientRect();
      const x = clientX - rect.left;
      const percent = Math.max(0, Math.min(1, x / rect.width));
      return Math.round(percent * videoLength * 10) / 10;
    },
    [videoLength],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const time = getTimeFromClientX(e.clientX);
      setHoverTime(time);
      setHoverChapter(getChapterAtTime(chapters, time));
      setTooltipPos({ x: e.clientX, y: e.clientY });
    },
    [chapters, getTimeFromClientX],
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setHoverTime(null);
    setHoverChapter(null);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const video = videoRef.current;
      if (!video || !isLoaded) return;
      const time = getTimeFromClientX(e.clientX);
      video.currentTime = time;
    },
    [videoRef, isLoaded, getTimeFromClientX],
  );

  const progressPercent =
    videoLength > 0 ? (currentTime / videoLength) * 100 : 0;

  return (
    <div className={styles.timeline}>
      <div
        ref={trackRef}
        className={styles.track}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      >
        {chapters.length > 0 ? (
          chapters.map((chapter, i) => {
            const duration = chapter.end - chapter.start;
            return (
              <div
                key={i}
                className={styles.chapterSegment}
                style={{
                  flex: duration,
                  background: CHAPTER_COLOR,
                }}
              />
            );
          })
        ) : (
          <div
            className={styles.chapterSegment}
            style={{ flex: 1, background: CHAPTER_COLOR }}
          />
        )}
        <div
          className={styles.progressFill}
          style={{ width: `${progressPercent}%` }}
        />
        <div
          className={styles.scrubber}
          style={{ left: `${progressPercent}%` }}
        />
      </div>
      {isHovering && hoverTime !== null && (
        <ChapterTooltip
          time={hoverTime}
          chapterTitle={hoverChapter?.title ?? "—"}
          x={tooltipPos.x}
          y={tooltipPos.y}
        />
      )}
    </div>
  );
}
