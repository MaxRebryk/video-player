import React from "react";
import styles from "./video-canvas.module.css";

interface VideoCanvasProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export default function VideoCanvas({ videoRef }: VideoCanvasProps) {
  return (
    <div className={`${styles.fillWrapper} video-fill-wrapper`}>
      <video ref={videoRef} controls={false} playsInline />
    </div>
  );
}
