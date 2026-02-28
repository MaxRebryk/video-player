import { useEffect } from "react";
import Hls from "hls.js";

type VideoRef = React.RefObject<HTMLVideoElement | null>;

export default function useHlsPlayer(videoRef: VideoRef, url: string) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoRef, url]);
}
