import React from "react";
import styles from "../styles";

function ImageGenerator() {
  return (
    <div style={styles.page}>
      <h2>🖼️ AI Image Generator</h2>
      <input style={styles.input} type="text" placeholder="Enter image prompt..." />
      <button style={styles.button}>Generate Image</button>
    </div>
  );
}

export default ImageGenerator;
