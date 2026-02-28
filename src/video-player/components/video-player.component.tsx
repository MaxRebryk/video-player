import React, { useRef } from "react";
import VideoCanvas from "./video-canvas.component";

const VideoPlayer = () => {
  const videoElement = useRef<HTMLVideoElement>(null);
  return (
    <div>
      <VideoCanvas videoElement={videoElement.current as HTMLVideoElement} />
    </div>
  );
};

export default VideoPlayer;
