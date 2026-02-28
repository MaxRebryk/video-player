import React, { useCallback, useEffect, useRef, useState } from "react";
import { videoData } from "@/video-player/mocks/video-data";
import useHlsPlayer from "@/video-player/hooks/useHlsPlayer";
import { useVideoState } from "@/video-player/hooks/useVideoState";
import VideoCanvas from "@/video-player/components/video-canvas/video-canvas.component";
import PlayPauseButton from "@/video-player/components/play-pause-button/play-pause-button.component";
import VolumeControl from "@/video-player/components/volume-control/volume-control.component";
import TimeDisplay from "@/video-player/components/time-display/time-display.component";
import QualitySelector from "@/video-player/components/quality-selector/quality-selector.component";
import FullscreenButton from "@/video-player/components/fullscreen-button/fullscreen-button.component";
import Timeline from "@/video-player/components/timeline/timeline.component";
import styles from "./video-player.module.css";

const DEFAULT_VOLUME = 0.5;

export default function VideoPlayer() {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prevVolume, setPrevVolume] = useState(1);
  const { levels, currentLevel, setLevel, hlsInstance } = useHlsPlayer(
    videoRef,
    videoData.hlsPlaylistUrl,
  );
  const { isPlaying, currentTime, duration, volume, isMuted } =
    useVideoState(videoRef);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handlePlay = useCallback(() => videoRef.current?.play(), []);
  const handlePause = useCallback(() => videoRef.current?.pause(), []);
  const handleSeek = useCallback((time: number) => {
    const video = videoRef.current;
    if (video) video.currentTime = time;
  }, []);
  const handleMuteToggle = useCallback(
    (volumeToSave?: number) => {
      const video = videoRef.current;
      if (!video) return;
      if (video.muted) {
        video.muted = false;
        video.volume = volumeToSave ?? prevVolume ?? DEFAULT_VOLUME;
      } else {
        setPrevVolume(volumeToSave ?? video.volume);
        video.muted = true;
      }
    },
    [prevVolume],
  );
  const handleVolumeChange = useCallback((value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = value;
    video.muted = value === 0;
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add("in-fullscreen");
    } else {
      document.body.classList.remove("in-fullscreen");
    }
    return () => document.body.classList.remove("in-fullscreen");
  }, [isFullscreen]);

  const isLoaded = duration > 0;
  const videoLength = duration > 0 ? duration : videoData.videoLength;

  return (
    <div
      ref={playerRef}
      className={`${styles.player} ${isFullscreen ? styles.playerFullscreen : ""}`}
      data-video-player
    >
      <div className={styles.videoWrapper}>
        <VideoCanvas videoRef={videoRef} />
        <div className={styles.controlsOverlay}>
          <div className={styles.progressBar}>
            <Timeline
              chapters={videoData.chapters}
              videoLength={videoLength}
              currentTime={currentTime}
              isLoaded={isLoaded}
              onSeek={handleSeek}
            />
          </div>
          <div className={styles.controlsRow}>
            <PlayPauseButton
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={handlePause}
            />
            <VolumeControl
              volume={volume}
              isMuted={isMuted}
              onMuteToggle={handleMuteToggle}
              onVolumeChange={handleVolumeChange}
            />
            <TimeDisplay currentTime={currentTime} duration={duration} />
            <div className={styles.spacer} />
            <QualitySelector
              levels={levels}
              currentLevel={currentLevel}
              setLevel={setLevel}
              hlsSupported={!!hlsInstance}
            />
            <FullscreenButton
              isFullscreen={isFullscreen}
              onToggle={toggleFullscreen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
