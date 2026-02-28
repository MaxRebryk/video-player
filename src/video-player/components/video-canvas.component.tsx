import React from "react";

export default function VideoCanvas({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) {
  return (
    <div className="video-fill-wrapper">
      <video ref={videoRef} controls={false} playsInline />
    </div>
  );
}
