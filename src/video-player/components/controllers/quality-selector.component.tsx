import React, { useState, useEffect, useRef } from "react";
import type { HlsLevel } from "../../types/video.types";
import { SettingsIcon } from "./icons";

export default function QualitySelector({
  levels,
  currentLevel,
  setLevel,
  hlsSupported,
}: {
  levels: HlsLevel[];
  currentLevel: number;
  setLevel: (level: number) => void;
  hlsSupported: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
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
    currentLevel === -1 ? "Auto" : `${levels[currentLevel]?.height}p` ?? "Auto";

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        aria-label={`Quality: ${currentLabel}`}
      >
        <SettingsIcon />
      </button>
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            bottom: "100%",
            right: 0,
            marginBottom: 4,
            margin: 0,
            padding: 4,
            listStyle: "none",
            background: "rgba(0,0,0,0.9)",
            borderRadius: 4,
            minWidth: 80,
          }}
        >
          <li>
            <button
              onClick={() => {
                setLevel(-1);
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "4px 8px",
                background: currentLevel === -1 ? "#555" : "transparent",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              Auto
            </button>
          </li>
          {levels.map((level, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  setLevel(index);
                  setIsOpen(false);
                }}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "4px 8px",
                  background: currentLevel === index ? "#555" : "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
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
