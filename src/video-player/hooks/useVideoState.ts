import { useEffect, useState } from "react";

export const useVideoState = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));
    video.addEventListener("timeupdate", () =>
      setCurrentTime(video.currentTime),
    );
    video.addEventListener("durationchange", () => setDuration(video.duration));
    video.addEventListener("volumechange", () => setVolume(video.volume));
    video.addEventListener("playbackratechange", () =>
      setPlaybackRate(video.playbackRate),
    );
    video.addEventListener("mutedchange", () => setIsMuted(video.muted));
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement &&
          (document.fullscreenElement === video ||
            document.fullscreenElement.contains(video)),
      );
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    video.addEventListener("ended", () => {
      setIsEnded(true);
      setIsPlaying(false);
    });
    video.addEventListener("error", () => {
      setIsError(true);
      setIsPlaying(false);
    });

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [videoRef]);
  return {
    isPlaying,
    currentTime,
    duration,
    volume,
    playbackRate,
    isMuted,
    isFullscreen,
    isPaused,
    isEnded,
    isError,
  };
};
