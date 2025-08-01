import React from "react";

const YouTubeBackground = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: -1,
      overflow: "hidden",
      pointerEvents: "none" // Ensures no mouse interaction
    }}
  >
    <iframe
      title="Background Video"
      src="https://www.youtube.com/embed/uQUiSjNOmmM?autoplay=1&mute=1&controls=0&loop=1&playlist=uQUiSjNOmmM&modestbranding=1&showinfo=0&rel=0&disablekb=1&fs=0&playsinline=1"

      allow="autoplay; fullscreen"
      allowFullScreen={false}
      style={{
        width: "100vw",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        objectFit: "cover",
        pointerEvents: "none" // Still ensures page controls work
      }}
    ></iframe>
  </div>
);

export default YouTubeBackground;

