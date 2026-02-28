import { useState } from "react";
import VideoPlayer from "../video-player/components/video-player.component";
import styles from "./App.module.css";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.app}>
      <h1>Video Player</h1>
      <VideoPlayer />
    </div>
  );
}

export default App;
