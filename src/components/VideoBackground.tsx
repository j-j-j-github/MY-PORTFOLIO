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
      color: 0x525252,      
      backgroundColor: 0x0, 
      
      // Dynamic scaling for mobile to look zoomed-in instead of squashed
      points: isMobile ? 10.0 : 20.0,
      maxDistance: isMobile ? 30.0 : 21.0,
      spacing: isMobile ? 25.0 : 14.0,
    });

    // Resize observer to force Vanta to recalculate size when the container dimensions change
    const resizeObserver = new ResizeObserver(() => {
        if (effect && typeof effect.resize === 'function') {
            effect.resize();
        }
    });

    const vantaEl = document.getElementById("vanta-bg");
    if (vantaEl) {
        resizeObserver.observe(vantaEl);
    }

    return () => {
      resizeObserver.disconnect();
      if (effect) effect.destroy();
    };
  }, []);

  return (
    <div
      id="vanta-bg"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
};

export default VideoBackground;