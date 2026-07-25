import { useEffect } from "react";

declare var VANTA: any; // tells TypeScript about the global VANTA

const VideoBackground = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    const effect = VANTA.NET({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x7a7a7a,      
      backgroundColor: 0x0, 
      
      // Dynamic scaling for mobile to look zoomed-in instead of squashed
      points: isMobile ? 7.0 : 14.0,
      maxDistance: isMobile ? 35.0 : 25.0,
      spacing: isMobile ? 30.0 : 15.0,
    });

    return () => {
      effect.destroy();
    };
  }, []);

  return (
    <div
      id="vanta-bg"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default VideoBackground;