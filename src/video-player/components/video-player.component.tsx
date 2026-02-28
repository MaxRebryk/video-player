import React, { useRef } from "react";
import { videoData } from "../mocs/video-data";
import useHlsPlayer from "../hooks/useHlsPlayer";
import { useVideoState } from "../hooks/useVideoState";
import VideoCanvas from "./video-canvas.component";
import PlayPauseButton from "./controllers/play-pause-button.component";
import VolumeControl from "./controllers/volume-control.component";
import TimeDisplay from "./controllers/time-display.component";
import QualitySelector from "./controllers/quality-selector.component";
import FullscreenButton from "./controllers/fullscreen-button.component";
import Timeline from "./controllers/timeline.component";
import styles from "./video-player.module.css";

export default function VideoPlayer() {
  const playerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { levels, currentLevel, setLevel, hlsInstance } = useHlsPlayer(
    videoRef,
    videoData.hlsPlaylistUrl,
  );
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isFullscreen,
  } = useVideoState(videoRef);

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
              videoRef={videoRef}
              chapters={videoData.chapters}
              videoLength={videoLength}
              currentTime={currentTime}
              isLoaded={isLoaded}
            />
          </div>
          <div className={styles.controlsRow}>
            <PlayPauseButton videoRef={videoRef} isPlaying={isPlaying} />
            <VolumeControl
              videoRef={videoRef}
              volume={volume}
              isMuted={isMuted}
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
              containerRef={playerRef}
              isFullscreen={isFullscreen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
