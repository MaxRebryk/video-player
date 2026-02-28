import React, { useRef } from "react";
import { videoData } from "../mocs/video-data";
import Hls from "hls.js";
import useHlsPlayer from "../hooks/useHlsPlayer";

export default function VideoCanvas({
  videoElement,
}: {
  videoElement: HTMLVideoElement;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useHlsPlayer(videoRef, videoData.hlsPlaylistUrl);

  return <video ref={videoRef} controls={false} playsInline />;
}
