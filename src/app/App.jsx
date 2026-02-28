import VideoPlayer from "@/video-player/components/video-player/video-player.component";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <h1>Video Player</h1>
      <VideoPlayer />
    </div>
  );
}

export default App;
