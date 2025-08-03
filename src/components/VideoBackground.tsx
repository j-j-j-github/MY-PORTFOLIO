import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = NET({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x7a7a7a,
      backgroundColor: 0x0,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0, 
        pointerEvents: 'none',
      }}
    ></div>
  );
};

export default VantaBackground;