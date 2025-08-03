import React from "react";

const YouTubeBackground = () => {
  return (
    <div className="video-background-container" style={{ position: "fixed", inset: 0, zIndex: -1, overflow: "hidden", pointerEvents: "none" }}>
      <iframe
        title="Background Video"
        src="https://www.youtube.com/embed/k3UevKvP9RU?autoplay=1&mute=1&controls=0&loop=1&playlist=k3UevKvP9RU&modestbranding=1&showinfo=0&rel=0&disablekb=1&fs=0&playsinline=1"
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen={false}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "177.78vh",      // 100vh * (16 / 9)
          height: "100vh",
          minWidth: "100vw",
          minHeight: "56.25vw",   // 100vw * (9 / 16)
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default YouTubeBackground;
