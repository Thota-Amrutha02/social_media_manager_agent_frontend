import React from "react";
import styles from "../styles";

function ThumbnailCreator() {
  return (
    <div style={styles.page}>
      <h2>🎬 Thumbnail Creator</h2>
      <input style={styles.input} type="text" placeholder="Enter video title..." />
      <button style={styles.button}>Create Thumbnail</button>
    </div>
  );
}

export default ThumbnailCreator;
