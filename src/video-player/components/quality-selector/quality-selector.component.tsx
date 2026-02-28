import React, { useState, useEffect, useRef } from "react";
import type { HlsLevel } from "@/video-player/types/video.types";
import { SettingsIcon } from "@/video-player/icons/icons";
import styles from "./quality-selector.module.css";

interface QualitySelectorProps {
  levels: HlsLevel[];
  currentLevel: number;
  setLevel: (level: number) => void;
  hlsSupported: boolean;
}

export default function QualitySelector({
  levels,
  currentLevel,
  setLevel,
  hlsSupported,
}: QualitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  if (!hlsSupported || levels.length === 0) return null;

  const currentLabel =
    currentLevel === -1 ? "Auto" : `${levels[currentLevel]?.height ?? 0}p`;

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type="button"
        className={styles.trigger}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={`Quality: ${currentLabel}`}
      >
        <SettingsIcon />
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          <li>
            <button
              type="button"
              className={`${styles.menuItem} ${currentLevel === -1 ? styles.menuItemActive : ""}`}
              onClick={() => {
                setLevel(-1);
                setIsOpen(false);
              }}
            >
              Auto
            </button>
          </li>
          {levels.map((level, index) => (
            <li key={index}>
              <button
                type="button"
                className={`${styles.menuItem} ${currentLevel === index ? styles.menuItemActive : ""}`}
                onClick={() => {
                  setLevel(index);
                  setIsOpen(false);
                }}
              >
                {level.height}p
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
