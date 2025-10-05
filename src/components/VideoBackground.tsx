import { useEffect } from "react";

declare var VANTA: any; // tells TypeScript about the global VANTA

const VideoBackground = () => {
  useEffect(() => {
    const effect = VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x7a7a7a,      // particle color from first snippet
      backgroundColor: 0x0, // background color from first snippet
      // You can also add points and maxDistance if needed:
      points: 14.0,
      maxDistance: 25.0,
    });

    return () => {
      effect.destroy();
    };
  }, []);

  return (
    <div
      id="vanta-bg"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default VideoBackground;