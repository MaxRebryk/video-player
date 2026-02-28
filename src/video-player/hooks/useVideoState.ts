import { useEffect, useState } from "react";

export const useVideoState = (
  videoRef: React.RefObject<HTMLVideoElement | null>,
) => {
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

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleVolumeChange = () => {
      setVolume(video.volume);
      setIsMuted(video.muted);
    };
    const handlePlaybackRateChange = () =>
      setPlaybackRate(video.playbackRate);
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement &&
          (document.fullscreenElement === video ||
            document.fullscreenElement.contains(video)),
      );
    };
    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };
    const handleError = () => {
      setIsError(true);
      setIsPlaying(false);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("volumechange", handleVolumeChange);
    video.addEventListener("playbackratechange", handlePlaybackRateChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("volumechange", handleVolumeChange);
      video.removeEventListener("playbackratechange", handlePlaybackRateChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
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
