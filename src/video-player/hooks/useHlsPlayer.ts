import { useEffect, useState, useRef, useCallback } from "react";
import Hls from "hls.js";
import type { HlsLevel } from "../types/video.types";

type VideoRef = React.RefObject<HTMLVideoElement | null>;

export default function useHlsPlayer(videoRef: VideoRef, url: string) {
  const [levels, setLevels] = useState<HlsLevel[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(-1);
  const [hlsInstance, setHlsInstance] = useState<Hls | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const setLevel = useCallback((level: number) => {
    const hls = hlsRef.current;
    if (hls) {
      hls.currentLevel = level;
      setCurrentLevel(level);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !url) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls();
      hlsRef.current = hls;
      setHlsInstance(hls);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (hls?.levels?.length) {
          setLevels(
            hls.levels.map((l) => ({
              height: l.height,
              width: l.width,
              bitrate: l.bitrate,
              url: l.url,
            })),
          );
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHING, (_e, data) => {
        setCurrentLevel(data.level);
      });

      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    }

    return () => {
      if (hls) {
        hls.destroy();
        hlsRef.current = null;
        setHlsInstance(null);
      }
    };
  }, [videoRef, url]);

  return { hlsInstance, levels, currentLevel, setLevel };
}
