import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  ArrowLeft,
  Check,
  Instagram,
  Feather,
  BookOpen,
  Sparkles,
  Layers,
  Star,
  Bookmark,
  RotateCcw,
  Mail,
  ExternalLink
} from 'lucide-react';
import { useRouter } from '../context/RouterContext';
import { poemsData, poemThemes } from '../data/poetry';
import type { PoemTheme } from '../data/poetry';
import { ThemeAudioPlayer } from '../components/beyond/ThemeAudioPlayer';
import { AnimatedHeaderTitle } from '../components/beyond/AnimatedHeaderTitle';

interface InkTextProps {
  text: string;
  inkRgb: string; // e.g. "29, 155, 240" for blue tick, "239, 68, 68" for red
  as?: 'h1' | 'span';
  className?: string;
}

interface InkPoint {
  x: number;
  y: number;
  alpha: number;
}

interface HandDrawnUnderlineProps {
  variant?: 1 | 2 | 3;
  className?: string;
}

const HandDrawnUnderline: React.FC<HandDrawnUnderlineProps> = ({ variant = 1, className = '' }) => {
  // Slight organic variations so multiple headings feel individually sketched by hand
  const paths: Record<1 | 2 | 3, string> = {
    1: 'M 2 7 C 50 4, 105 8.5, 155 5 C 190 3, 218 6.5, 238 5',
    2: 'M 2 5.5 C 50 8, 105 4, 150 7 C 195 9, 215 4.5, 238 6',
    3: 'M 2 6 C 45 4.5, 90 7.5, 135 5.5 C 180 3.5, 210 7, 238 5.5',
  };

  return (
    <svg
      viewBox="0 0 240 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={`absolute left-0 bottom-0 w-full h-[6px] pointer-events-none overflow-visible ${className}`}
      aria-hidden="true"
    >
      <path
        d={paths[variant]}
        stroke="white"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: 'drop-shadow(0 0 1px rgba(255,255,255,0.45))' }}
      />
    </svg>
  );
};

const InkText: React.FC<InkTextProps> = ({ text, inkRgb, as = 'span', className = '' }) => {
  const containerRef = useRef<HTMLElement>(null);
  const inkLayerRef = useRef<HTMLSpanElement>(null);
  const pointsRef = useRef<InkPoint[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const updateGradients = useCallback(() => {
    const points = pointsRef.current;
    const inkLayer = inkLayerRef.current;
    if (!inkLayer) return;

    if (points.length === 0) {
      inkLayer.style.backgroundImage = 'none';
      animFrameRef.current = null;
      return;
    }

    // Decay all points smoothly
    for (let i = points.length - 1; i >= 0; i--) {
      points[i].alpha -= 0.012; // lingers ~1.4 seconds before fading completely
      if (points[i].alpha <= 0) {
        points.splice(i, 1);
      }
    }

    if (points.length > 0) {
      // Keep up to 18 active points for silky performance
      const activePoints = points.slice(-18);
      const gradients = activePoints.map((p) => {
        const radius = 65 + (1 - p.alpha) * 15;
        const a1 = p.alpha.toFixed(2);
        const a2 = (p.alpha * 0.85).toFixed(2);
        const a3 = (p.alpha * 0.35).toFixed(2);
        return `radial-gradient(circle ${radius.toFixed(1)}px at ${p.x.toFixed(1)}px ${p.y.toFixed(1)}px, rgba(${inkRgb}, ${a1}) 0%, rgba(${inkRgb}, ${a2}) 50%, rgba(${inkRgb}, ${a3}) 75%, transparent 100%)`;
      });
      inkLayer.style.backgroundImage = gradients.join(', ');
      animFrameRef.current = requestAnimationFrame(updateGradients);
    } else {
      inkLayer.style.backgroundImage = 'none';
      animFrameRef.current = null;
    }
  }, [inkRgb]);

  const addPoint = useCallback((clientX: number, clientY: number) => {
    const el = inkLayerRef.current || containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const points = pointsRef.current;
    const last = points[points.length - 1];
    if (!last || Math.hypot(last.x - x, last.y - y) > 3) {
      points.push({ x, y, alpha: 1.0 });
      if (!animFrameRef.current) {
        animFrameRef.current = requestAnimationFrame(updateGradients);
      }
    }
  }, [updateGradients]);

  const handleMouseMove = (e: React.MouseEvent) => {
    addPoint(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      addPoint(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const Component = as;

  return (
    <Component
      ref={containerRef as any}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      className={`relative inline-block select-none cursor-default overflow-visible py-4 sm:py-5 px-3 sm:px-4 -my-4 sm:-my-5 -mx-3 sm:-mx-4 ${className}`}
    >
      {/* Base Solid White Text - 100% visible, fully rendered, never clipped */}
      <span className="text-white select-none pointer-events-none block overflow-visible">
        {text}
      </span>

      {/* Layer 2: Liquid Ink Overlay - Expanded to cover all ascenders, descenders, and flourishes */}
      <span
        ref={inkLayerRef}
        aria-hidden="true"
        className="absolute inset-0 select-none pointer-events-none block overflow-visible py-4 sm:py-5 px-3 sm:px-4"
        style={{
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          backgroundImage: 'none',
        }}
      >
        {text}
      </span>
    </Component>
  );
};

// Hand-drawn red sketch pen star for notebook page corners
const StarSketch: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    {/* Red sketch pen star - Primary hand-drawn contour */}
    <path
      d="M50 14 L61 38 L87 39 L66 54 L74 79 L50 64 L26 79 L34 54 L13 39 L39 38 Z"
      stroke="#dc2626"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Second red sketch pen stroke pass (doodle overlap) */}
    <path
      d="M50 11 L62 39 L89 40 L67 55 L75 81 L49 65 L25 80 L33 54 L11 40 L38 37 Z"
      stroke="#ef4444"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Subtle red sketch pen hatch strokes in center */}
    <path
      d="M50 14 L50 64 M34 54 L66 54 M39 38 L61 38"
      stroke="rgba(220, 38, 38, 0.55)"
      strokeWidth="1"
      strokeDasharray="3 2"
      strokeLinecap="round"
    />
    {/* Little companion red sketch pen star rays / dots */}
    <path
      d="M80 18 L86 18 M83 15 L83 21"
      stroke="#dc2626"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="20" cy="24" r="1.3" fill="#dc2626" />
    <circle cx="78" cy="74" r="1.1" fill="#ef4444" />
  </svg>
);

export const PoetryPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<'all' | PoemTheme>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const paperAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Writings of J | Jeeval's Space";
    window.scrollTo(0, 0);
  }, []);

  // Filter poems according to selected collection theme
  const filteredPoems = useMemo(() => {
    if (selectedTheme === 'all') return poemsData;
    return poemsData.filter((p) => p.theme === selectedTheme);
  }, [selectedTheme]);

  const totalPoems = filteredPoems.length;

  const [recentLineIdx, setRecentLineIdx] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);

  // Dedicated lookups for "Most Recent" and "His Favorites"
  const overlookedPoem = useMemo(() => poemsData.find((p) => p.id === 'overlooked'), []);
  const overlookedLines = useMemo(() => {
    if (!overlookedPoem?.body) return [];
    return overlookedPoem.body
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean);
  }, [overlookedPoem]);

  const handleNextRecentLine = useCallback(() => {
    setSlideDirection(1);
    setRecentLineIdx((prev) => (prev < overlookedLines.length - 1 ? prev + 1 : 0));
  }, [overlookedLines.length]);

  const handlePrevRecentLine = useCallback(() => {
    setSlideDirection(-1);
    setRecentLineIdx((prev) => (prev > 0 ? prev - 1 : overlookedLines.length - 1));
  }, [overlookedLines.length]);

  const handleResetRecentLine = useCallback(() => {
    setSlideDirection(-1);
    setRecentLineIdx(0);
  }, []);

  const favoritesList = useMemo(() => [
    poemsData.find((p) => p.id === 'silent-plunge'),
    poemsData.find((p) => p.id === 'captive-heart'),
    poemsData.find((p) => p.id === 'bittersweet-release'),
  ].filter(Boolean) as typeof poemsData, []);

  // Reset or constrain index when theme filter changes, and smoothly scroll down to paper area
  const handleThemeChange = (theme: 'all' | PoemTheme) => {
    setSelectedTheme(theme);
    setCurrentIndex(0);
    setTimeout(() => {
      paperAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPoems - 1));
  }, [totalPoems]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalPoems - 1 ? prev + 1 : 0));
  }, [totalPoems]);

  // Activate realistic quill cursor generated from public/beyondcode/poem/quill.png
  useEffect(() => {
    document.body.classList.add('quill-cursor');

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `${import.meta.env.BASE_URL}beyondcode/poem/quill.png`;

    img.onload = () => {
      try {
        const sampleSize = 128;
        const sampleCanvas = document.createElement('canvas');
        sampleCanvas.width = sampleSize;
        sampleCanvas.height = sampleSize;
        const sCtx = sampleCanvas.getContext('2d');
        if (!sCtx) return;

        sCtx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imgData = sCtx.getImageData(0, 0, sampleSize, sampleSize).data;

        // Locate the nib tip (closest non-transparent pixel to top-left)
        let bestDist = Infinity;
        let tipX = 0;
        let tipY = 0;

        for (let y = 0; y < sampleSize; y++) {
          for (let x = 0; x < sampleSize; x++) {
            const alpha = imgData[(y * sampleSize + x) * 4 + 3];
            if (alpha > 45) {
              const dist = x * x + y * y;
              if (dist < bestDist) {
                bestDist = dist;
                tipX = x;
                tipY = y;
              }
            }
          }
        }

        // Render crisp native 32x32 cursor (strictly within browser native limits, 0 flicker)
        const cursorCanvas = document.createElement('canvas');
        cursorCanvas.width = 32;
        cursorCanvas.height = 32;
        const cCtx = cursorCanvas.getContext('2d');
        if (!cCtx) return;

        cCtx.imageSmoothingEnabled = true;
        cCtx.imageSmoothingQuality = 'high';

        const scale = 30 / (sampleSize - Math.min(tipX, tipY));
        const drawX = 1 - tipX * scale;
        const drawY = 1 - tipY * scale;

        cCtx.drawImage(sampleCanvas, drawX, drawY, sampleSize * scale, sampleSize * scale);
        const dataUrl = cursorCanvas.toDataURL('image/png');

        // Apply single source of truth CSS variable
        document.body.style.setProperty('--quill-cursor-url', `url("${dataUrl}") 1 1, auto`);
      } catch (err) {
        console.warn('Could not generate dynamic quill cursor:', err);
      }
    };

    return () => {
      document.body.classList.remove('quill-cursor');
      document.body.style.removeProperty('--quill-cursor-url');
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX.current;
    const swipeThreshold = 40;

    if (deltaX < -swipeThreshold) {
      handleNext();
    } else if (deltaX > swipeThreshold) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleShare = () => {
    const shareUrl = 'https://jeevals.space/writingsofj';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Dynamic font size calculator so fixed ratio cards never jump or overflow
  const getDynamicBodyStyle = (text: string) => {
    const chars = text.length;
    const lines = text.split('\n').filter(Boolean).length;

    if (chars > 700 || lines > 20) {
      return 'text-[11.5px] sm:text-[12px] md:text-[13px] leading-[1.6]';
    } else if (chars > 480 || lines > 15) {
      return 'text-[12.5px] sm:text-[13px] md:text-[14px] leading-[1.62]';
    } else if (chars > 280 || lines > 10) {
      return 'text-[13px] sm:text-[14px] md:text-[15px] leading-[1.65]';
    } else {
      return 'text-[14.5px] sm:text-[15.5px] md:text-[16.5px] leading-[1.7]';
    }
  };

  // Torn paper jagged edge clip-path for natural handmade journal look
  const tornPaperClipPath = `polygon(
    0% 9px, 3% 3px, 6% 12px, 9% 3px, 12% 10px, 15% 4px, 18% 12px, 21% 3px, 24% 10px, 27% 3px, 
    30% 12px, 33% 4px, 36% 10px, 39% 3px, 42% 12px, 45% 4px, 48% 11px, 51% 3px, 54% 12px, 57% 3px, 
    60% 10px, 63% 4px, 66% 12px, 69% 3px, 72% 11px, 75% 3px, 78% 12px, 81% 4px, 84% 10px, 87% 3px, 
    90% 12px, 93% 4px, 96% 11px, 100% 3px, 
    100% calc(100% - 9px), 97% calc(100% - 3px), 94% calc(100% - 11px), 91% calc(100% - 3px), 
    88% calc(100% - 12px), 85% calc(100% - 4px), 82% calc(100% - 11px), 79% calc(100% - 3px), 
    76% calc(100% - 10px), 73% calc(100% - 4px), 70% calc(100% - 12px), 67% calc(100% - 3px), 
    64% calc(100% - 11px), 61% calc(100% - 4px), 58% calc(100% - 10px), 55% calc(100% - 3px), 
    52% calc(100% - 12px), 49% calc(100% - 4px), 46% calc(100% - 11px), 43% calc(100% - 3px), 
    40% calc(100% - 10px), 37% calc(100% - 4px), 34% calc(100% - 12px), 31% calc(100% - 3px), 
    28% calc(100% - 11px), 25% calc(100% - 4px), 22% calc(100% - 10px), 19% calc(100% - 3px), 
    16% calc(100% - 12px), 13% calc(100% - 4px), 10% calc(100% - 11px), 7% calc(100% - 3px), 
    4% calc(100% - 10px), 0% calc(100% - 4px)
  )`;

  // Continuous shortest circular difference so stack loops infinitely without jumps
  const getCircularDiff = (index: number, active: number, total: number) => {
    let diff = index - active;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div 
      onContextMenu={(e) => e.preventDefault()}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
        WebkitTouchCallout: 'none',
      }}
      className="relative min-h-screen bg-black text-white font-sans antialiased selection:bg-transparent pb-6 sm:pb-8 select-none fountain-pen-cursor quill-cursor overflow-x-hidden"
    >
      {/* Faded Dark Grey Realistic Quill Background Art - Confined strictly to top header/profile (never scrolls over poetry reading area) */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none z-0 overflow-hidden select-none"
      >
        {/* Soft Dark Radial Vignette for atmospheric depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_25%,rgba(30,30,42,0.6)_0%,rgba(0,0,0,0.98)_85%)]" />

        {/* Top-Right: Realistic Vintage Feather Quill Art (Modelled on quill.png) */}
        <div className="absolute -top-8 -right-8 sm:right-2 md:right-10 w-[420px] sm:w-[540px] md:w-[680px] h-[580px] sm:h-[750px] md:h-[950px] opacity-[0.25] rotate-[18deg] transition-opacity duration-1000">
          <svg viewBox="0 0 500 750" className="w-full h-full text-slate-300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Pointed Nib Tip */}
            <path d="M45 45 L58 32 L72 46 L58 60 Z" fill="currentColor" fillOpacity="0.35" stroke="currentColor" strokeWidth="2" />
            <line x1="45" y1="45" x2="62" y2="62" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="62" cy="62" r="2.5" fill="currentColor" />

            {/* Ornate Baroque Grip / Ferrule Collar (as seen in quill.png) */}
            <path d="M68 52 C76 46 86 50 94 58 L116 86 C122 94 121 104 113 112 L98 125 C90 131 80 129 74 121 L52 95 C46 88 48 76 56 70 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
            {/* Detailed Filigree Engraving Rings on the Metal Collar */}
            <path d="M66 66 C73 60 83 67 89 75" stroke="currentColor" strokeWidth="1.4" />
            <path d="M78 79 C85 73 95 80 101 88" stroke="currentColor" strokeWidth="1.4" />
            <path d="M90 91 C98 86 106 91 112 99" stroke="currentColor" strokeWidth="1.4" />
            <circle cx="85" cy="85" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />

            {/* Calamus socket where the feather quill emerges */}
            <path d="M102 118 L122 138" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

            {/* Central Quill Spine / Rachis Shaft */}
            <path d="M112 128 Q260 380 440 680" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M114 130 Q262 382 442 682" stroke="currentColor" strokeWidth="1.4" opacity="0.7" />

            {/* Realistic Goose Feather Vane - Upper Flank */}
            <path d="M120 138 C140 150 168 185 200 235 C240 300 295 385 345 475 C390 555 430 625 440 680 C410 660 375 605 330 530 C280 445 225 355 180 275 C150 220 130 170 120 138 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />

            {/* Realistic Goose Feather Vane - Lower Flank */}
            <path d="M115 145 C110 180 125 240 155 315 C195 410 250 515 315 605 C360 665 405 710 440 680 C415 630 365 540 310 445 C255 350 200 255 160 185 C140 150 125 138 115 145 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.8" />

            {/* Realistic Parallel Natural Barb Striations (Upper Vane) */}
            <path d="M145 180 L185 165 M170 220 L225 195 M195 265 L260 235 M225 315 L300 275 M260 370 L340 325 M295 425 L380 375 M335 485 L415 435 M375 550 L440 505" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />

            {/* Realistic Parallel Natural Barb Striations (Lower Vane) */}
            <path d="M140 215 L125 260 M165 260 L145 320 M195 315 L170 385 M230 370 L200 450 M270 430 L235 520 M315 495 L275 585 M360 560 L320 645" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />

            {/* Authentic Natural Feather Splits (Natural Gaps in Feather) */}
            <path d="M255 240 L240 275 M335 330 L320 375 M375 380 L360 425" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.95" />
          </svg>
        </div>

        {/* Mid-Left: Mirrored Realistic Poised Quill Art */}
        <div className="absolute top-[36%] -left-12 sm:left-2 md:left-8 w-[360px] sm:w-[480px] md:w-[600px] h-[520px] sm:h-[680px] md:h-[840px] opacity-[0.22] -rotate-[35deg] transition-opacity duration-1000">
          <svg viewBox="0 0 500 750" className="w-full h-full text-stone-300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Nib Tip */}
            <path d="M45 45 L58 32 L72 46 L58 60 Z" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="2" />
            <line x1="45" y1="45" x2="62" y2="62" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="62" cy="62" r="2.5" fill="currentColor" />

            {/* Ornate Ferrule */}
            <path d="M68 52 C76 46 86 50 94 58 L116 86 C122 94 121 104 113 112 L98 125 C90 131 80 129 74 121 L52 95 C46 88 48 76 56 70 Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2" />
            <circle cx="85" cy="85" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />

            {/* Central Spine */}
            <path d="M112 128 Q260 380 440 680" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />

            {/* Feather Vane Body */}
            <path d="M120 138 C140 150 168 185 200 235 C240 300 295 385 345 475 C390 555 430 625 440 680 C410 660 375 605 330 530 C280 445 225 355 180 275 C150 220 130 170 120 138 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
            <path d="M115 145 C110 180 125 240 155 315 C195 410 250 515 315 605 C360 665 405 710 440 680 C415 630 365 540 310 445 C255 350 200 255 160 185 C140 150 125 138 115 145 Z" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="1.8" />

            {/* Barbs */}
            <path d="M145 180 L185 165 M170 220 L225 195 M195 265 L260 235 M225 315 L300 275 M260 370 L340 325 M295 425 L380 375" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
            <path d="M140 215 L125 260 M165 260 L145 320 M195 315 L170 385 M230 370 L200 450 M270 430 L235 520" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>
      </div>

      {/* Foreground Interactive Content Wrapper (z-10) */}
      <div className="relative z-10 w-full">
        {/* Top Header Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-black/85 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 flex items-center justify-between">
          {/* Left: Back Button */}
          <button
            onClick={() => navigate('/#beyondcode', { sectionId: 'beyondcode' })}
            style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 outline-none focus:outline-none select-none z-10"
            aria-label="Back to Jeeval's Space"
            title="Back to Jeeval's Space"
          >
            <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5 text-white" />
          </button>

          {/* Center: Animated Brand Title (Jeeval's Space <-> Writings of J) */}
          <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
            <AnimatedHeaderTitle onClick={() => navigate('/')} />
          </div>

          {/* Right: Ambience Sound Pill */}
          <div className="flex items-center justify-end z-10">
            <ThemeAudioPlayer />
          </div>
        </header>

        {/* Social Media Account Profile Header - Full Width matching Homescreen */}
      <div className="pt-[64px] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cover Photo / Wall (wall.jpg) - Secured against drag and download */}
        <div 
          onContextMenu={(e) => e.preventDefault()}
          className="relative w-full h-48 sm:h-64 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden mt-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-neutral-900 group select-none pointer-events-none"
        >
          <img
            src={`${import.meta.env.BASE_URL}beyondcode/poem/wall.jpg`}
            alt="Writings of J Cover"
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105 select-none pointer-events-none"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = `${import.meta.env.BASE_URL}beyondcode/wall.jpg`;
            }}
          />
          {/* Subtle cinematic gradient vignette over banner */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent pointer-events-none" />
        </div>

        {/* Profile Info Overlap Area */}
        <div className="relative px-0">
          {/* Top Row Directly Below Cover Photo Banner: DP on Left & Action Buttons on Right (Inline on mobile and desktop) */}
          <div className="flex flex-row items-end sm:items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 px-0">
            {/* Rounded DP on side (dp.jpg) - Overlaps Cover Photo Banner */}
            <div className="-mt-12 sm:-mt-18 md:-mt-22 select-none shrink-0 pl-1 sm:pl-2">
              <div 
                onContextMenu={(e) => e.preventDefault()}
                className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-4 sm:border-[5px] border-black bg-neutral-900 overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.95)] ring-2 ring-white/20 pointer-events-none select-none group"
              >
                <img
                  src={`${import.meta.env.BASE_URL}beyondcode/poem/dp.jpg`}
                  alt="Writings of J Avatar"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 select-none pointer-events-none"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `${import.meta.env.BASE_URL}beyondcode/dp.jpg`;
                  }}
                />
              </div>
            </div>

            {/* Profile Action Buttons: Desktop Top-Right below banner */}
            <div className="hidden sm:flex flex-wrap items-center justify-end gap-2 sm:gap-2.5 sm:mt-3.5 sm:pt-1 pr-0">
              <a
                href="mailto:jeevaljolly@gmail.com"
                className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 backdrop-blur-2xl border border-white/15 hover:border-white/35 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-neutral-200 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_32px_rgba(168,85,247,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                title="Write to me (jeevaljolly@gmail.com)"
              >
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-mono text-[10px] sm:text-[11.5px] whitespace-nowrap">Write to Me</span>
              </a>

              <a
                href="https://www.instagram.com/writingsofj"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 backdrop-blur-2xl border border-white/15 hover:border-white/35 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-neutral-200 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_32px_rgba(236,72,153,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                title="Find on Instagram (@writingsofj)"
              >
                <Instagram className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-mono text-[10px] sm:text-[11.5px] whitespace-nowrap">Follow</span>
              </a>

              <button
                onClick={handleShare}
                className="group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 backdrop-blur-2xl border border-white/15 hover:border-white/35 text-[10px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 text-neutral-200 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_8px_32px_rgba(59,130,246,0.2),inset_0_1px_1px_rgba(255,255,255,0.3)]"
                title="Share Archive (jeevals.space/writingsofj)"
              >
                {copied ? (
                  <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                ) : (
                  <Share2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                )}
                <span className="font-mono text-[10px] sm:text-[11.5px] whitespace-nowrap">{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Name & Bio Block */}
          <div className="space-y-3 mb-8 px-1 sm:px-2">
            <div className="flex items-center gap-3 flex-wrap">
              <InkText
                text="Writings of J"
                inkRgb="29, 155, 240"
                as="h1"
                className="text-4xl sm:text-5xl md:text-6xl font-['Caveat',cursive] font-bold tracking-wide !leading-[1.25] overflow-visible"
              />

              {/* Authentic Twitter/Instagram Blue Verified Tick */}
              <span title="Verified Author">
                <svg className="w-6 h-6 text-[#1d9bf0] fill-current drop-shadow-[0_0_8px_rgba(29,155,240,0.5)]" viewBox="0 0 24 24">
                  <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4.08s-2.6-1.3-4.04-.79C14.54 2.5 13.34 1.75 12 1.75s-2.54.75-3.21 2.04c-1.44-.51-3.03-.32-4.04.79s-1.27 2.69-.81 4.08C2.63 9.33 1.75 10.57 1.75 12s.88 2.67 2.19 3.34c-.46 1.39-.2 2.97.81 4.08 1.01 1.11 2.6 1.3 4.04.79.67 1.29 1.87 2.04 3.21 2.04s2.54-.75 3.21-2.04c1.44.51 3.03.32 4.04-.79 1.01-1.11 1.27-2.69.81-4.08 1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.33 2.33 4.99-4.99 1.42 1.41-6.41 6.41z" />
                </svg>
              </span>
            </div>

            <p className="text-sm font-mono text-neutral-400 tracking-wider">
              @writingsofj &bull; <span className="text-neutral-500">Poetry, Unspoken Thoughts & Words Kept</span>
            </p>

            <p className="max-w-2xl text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              Words, poems, and unspoken thoughts that deserve a little space. Written in quiet hours when thoughts are easier to write down than explain.
            </p>

            {/* Sleek, Proportionate Stats: Writings, Readers & Chapters */}
            <div className="flex items-center gap-6 sm:gap-7 pt-2 text-neutral-400 font-mono">
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">{poemsData.length}</span>
                <span className="text-xs uppercase tracking-wider text-neutral-400">Writings</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">2,322</span>
                <span className="text-xs uppercase tracking-wider text-neutral-400">Readers</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">3</span>
                <span className="text-xs uppercase tracking-wider text-neutral-400">Chapters</span>
              </div>
            </div>

            {/* Mobile Action Buttons: Sits right under Writings, Readers, Chapters with dynamic fluid scaling */}
            <div className="flex sm:hidden items-center justify-between gap-1.5 pt-3.5 w-full">
              <a
                href="mailto:jeevaljolly@gmail.com"
                className="group flex-1 min-w-0 flex items-center justify-center gap-1 px-1.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 backdrop-blur-2xl border border-white/15 hover:border-white/35 font-semibold tracking-wider uppercase transition-all duration-300 text-neutral-200 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.5)] text-[clamp(9px,2.5vw,11.5px)]"
                title="Write to me (jeevaljolly@gmail.com)"
              >
                <Mail className="w-3 h-3 text-purple-400 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                <span className="font-mono whitespace-nowrap truncate">Write to Me</span>
              </a>

              <a
                href="https://www.instagram.com/writingsofj"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1 min-w-0 flex items-center justify-center gap-1 px-1.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 backdrop-blur-2xl border border-white/15 hover:border-white/35 font-semibold tracking-wider uppercase transition-all duration-300 text-neutral-200 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.5)] text-[clamp(9px,2.5vw,11.5px)]"
                title="Find on Instagram (@writingsofj)"
              >
                <Instagram className="w-3 h-3 text-pink-400 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                <span className="font-mono whitespace-nowrap truncate">Follow</span>
              </a>

              <button
                onClick={handleShare}
                className="group flex-1 min-w-0 flex items-center justify-center gap-1 px-1.5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.16] active:scale-95 backdrop-blur-2xl border border-white/15 hover:border-white/35 font-semibold tracking-wider uppercase transition-all duration-300 text-neutral-200 hover:text-white shadow-[0_4px_24px_rgba(0,0,0,0.5)] text-[clamp(9px,2.5vw,11.5px)]"
                title="Share Archive (jeevals.space/writingsofj)"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : (
                  <Share2 className="w-3 h-3 text-blue-400 group-hover:scale-110 transition-transform duration-300 shrink-0" />
                )}
                <span className="font-mono whitespace-nowrap truncate">{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* FEATURED FIRST SECTION: "The Writer and His Words" in paper-like style with yearning "About the writings:" on the side */}
        <section 
          aria-label="Preface & Context"
          className="my-10 p-4 sm:p-6 md:p-8 rounded-3xl bg-neutral-900/50 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden"
        >
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* The Writer and His Words - In Authentic Torn Notebook Paper Style with Spiral Binder Holes */}
            <div className="lg:col-span-7 flex flex-col justify-center relative">
              {/* Paperclip from paperclip.png with customizable X & Y axis position controls */}
              <div 
                aria-hidden="true" 
                style={{
                  top: '-8px',       // Y-axis: edit this value to move up or down (e.g. '16px', '20px')
                  left: '-14px',     // X-axis: edit this value to move left or right (e.g. '-14px', '-10px')
                  transform: 'rotate(75deg)', // Tilt angle: edit degrees clockwise (e.g. 75deg)
                }}
                className="absolute z-30 pointer-events-none drop-shadow-[0_12px_18px_rgba(0,0,0,0.7)] select-none"
              >
                <img
                  src={`${import.meta.env.BASE_URL}beyondcode/poem/paperclip.png`}
                  alt="Paperclip"
                  draggable={false}
                  style={{ width: '105px' }} // Width: edit pixel size here (e.g. '105px', '115px')
                  className="h-auto object-contain select-none pointer-events-none"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `${import.meta.env.BASE_URL}beyondcode/paperclip.png`;
                  }}
                />
              </div>

              <div 
                style={{ clipPath: tornPaperClipPath }}
                onCopy={(e) => e.preventDefault()}
                className="relative w-full bg-[#faf7ee] text-stone-900 overflow-hidden flex flex-col p-6 sm:p-8 md:p-9 shadow-[0_25px_45px_rgba(0,0,0,0.85)] border-t border-b border-amber-900/15 select-none"
              >
                {/* Natural Paper Texture Gradient & Subtle Aging Vignette */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(243,237,220,0.85) 75%, rgba(225,214,192,0.95) 100%)',
                  }}
                />

                {/* Ruled Notebook Lines */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-70"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100, 130, 175, 0.5) 28px)',
                    backgroundPosition: '0 50px',
                  }}
                />

                {/* Realistic Spiral Binder Punch Holes along the left edge */}
                <div className="absolute left-2 sm:left-3 top-6 bottom-6 flex flex-col justify-between items-center pointer-events-none z-20">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-neutral-950 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.9),0_0.5px_1px_rgba(255,255,255,0.6)] border border-amber-950/40"
                    />
                  ))}
                </div>

                {/* Authentic Left Margin Red Line */}
                <div className="absolute left-8 sm:left-10 md:left-11 top-0 bottom-0 w-[1.5px] bg-red-400/35 pointer-events-none" />

                {/* Paper Content Area */}
                <div className="relative z-10 flex-1 flex flex-col justify-between pl-6 sm:pl-9 pt-2">
                  <div>
                    {/* Title in Writing Font */}
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-['Caveat',cursive] font-bold text-stone-900 tracking-wide mb-3">
                      The Writer and His Words:
                    </h2>

                    {/* Poem Body with Tuned Natural Typography */}
                    <div 
                      className="text-stone-800 font-serif text-xs sm:text-sm md:text-[14.5px] leading-[1.68] whitespace-pre-line tracking-wide"
                      style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                    >
{`I am the writer, the thoughts unbound,
But she, the words, brings depth profound.
Together we weave, in perfect accord,
Her graceful lines, the voice I've adored.

With every stroke, I set the scene,
Yet her voice whispers, like a dream.
Through her, emotions find their flight,
Her language, the palette, painting it right.

In this dance of expression, our souls unite,
I bring the vision, she brings the light.
For I am the writer, and she, the words,
In this poetic harmony, our story is heard.`}
                    </div>
                  </div>

                  {/* Delicate Handwriting Signature */}
                  <div className="mt-3 pt-2 border-t border-amber-900/15 flex items-center justify-between">
                    <span className="font-['Caveat'] text-base sm:text-lg font-medium text-stone-600/90 select-none tracking-wide">
                      — Writings of J
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* A Little About Me companion box */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-neutral-950/70 border border-white/10 p-6 sm:p-8 rounded-2xl shadow-xl">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <Feather className="w-5 h-5 text-blue-400" />
                  <h3 className="relative inline-block text-2xl sm:text-3xl font-['Caveat',cursive] font-bold text-white tracking-wide pb-1.5">
                    A Little About Me:
                    <HandDrawnUnderline variant={2} />
                  </h3>
                </div>

                <div className="space-y-3.5 text-neutral-300 text-xs sm:text-sm leading-relaxed font-light">
                  <p>
                    I'm Jeeval, a mind full of thoughts that don't always find their way into conversation, and a heart that often finds its voice in words.
                  </p>
                  <p>
                    Writing, for me, is a way of giving shape to the things I feel but cannot always explain. The fleeting moments, the unspoken emotions, the people who leave a mark, and the thoughts that linger long after the world has moved on.
                  </p>
                  <p>
                    This space is a collection of those fragments. Some are imagined, some are remembered, and some are simply feelings that needed somewhere to belong.
                  </p>
                  <p>
                    If you find a piece of yourself in any of these words, perhaps we understand each other more than we know.
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-end">
                <span className="font-['Caveat',cursive] text-lg sm:text-xl font-medium text-neutral-400 select-none tracking-wide">
                  — Jeeval Jolly Jacob
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: MOST RECENT - Fixed Size Card with recent.jpg + Dim Moving Light Blurred Glass Card */}
        <section
          aria-label="Most Recent"
          className="my-10 sm:my-14 relative"
        >
          {/* Main Section Heading with Colon */}
          <div className="mb-5 sm:mb-6">
            <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl font-['Caveat',cursive] font-bold text-white tracking-wide !leading-[1.25] overflow-visible pb-1.5">
              <InkText text="Most Recent:" inkRgb="29, 155, 240" />
              <HandDrawnUnderline variant={1} />
            </h2>
          </div>

          {/* Grid Layout: Left Interactive Card + Right Dim Moving Light Blur Glass Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch w-full">
            {/* Left Card: Fixed-Size Card with recent.jpg background & Spotify-Style Smooth Lyrics Animation */}
            <div className="lg:col-span-7 xl:col-span-8 h-[360px] sm:h-[380px] relative rounded-3xl border border-white/20 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden select-none flex flex-col justify-between">
              {/* Background Image: recent.jpg */}
              <img
                src={`${import.meta.env.BASE_URL}beyondcode/poem/recent.jpg`}
                alt="Recent Background"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              />
              {/* Dark Overlay for rich contrast and readable white typography */}
              <div className="absolute inset-0 bg-black/65 backdrop-blur-[1.5px] pointer-events-none" />

              {/* Top Bar: Poem Title in Clean Typography & White (No handwriting font) */}
              <div className="relative z-10 flex items-center justify-between pb-1">
                <div className="flex items-center gap-2">
                  <Feather className="w-4 h-4 text-sky-400 shrink-0" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-sans font-bold text-white tracking-tight">
                    {overlookedPoem?.title || 'The Overlooked'}
                  </h3>
                </div>
                <span className="font-['Caveat',cursive] text-xl sm:text-2xl text-white/90 font-bold select-none tracking-wide">
                  — Writings of J
                </span>
              </div>

              {/* Fixed Height Stage: Smooth Vertical Lyrics Gliding (All Lines Animate Together, Zero Clipping) */}
              <div 
                onClick={handleNextRecentLine}
                title="Click to advance"
                className="relative z-10 my-auto h-[190px] flex flex-col justify-center items-center text-center cursor-pointer select-none px-3 overflow-hidden"
              >
                <AnimatePresence mode="wait" custom={slideDirection}>
                  <motion.div
                    key={recentLineIdx}
                    custom={slideDirection}
                    variants={{
                      enter: (dir: number) => ({
                        y: dir > 0 ? 32 : -32,
                        opacity: 0,
                      }),
                      center: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: { type: 'spring', stiffness: 220, damping: 24, mass: 0.8 },
                          opacity: { duration: 0.32, ease: 'easeOut' },
                        },
                      },
                      exit: (dir: number) => ({
                        y: dir > 0 ? -32 : 32,
                        opacity: 0,
                        transition: {
                          y: { type: 'spring', stiffness: 220, damping: 24, mass: 0.8 },
                          opacity: { duration: 0.22, ease: 'easeIn' },
                        },
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="w-full max-w-xl flex flex-col items-center justify-center gap-1.5 py-1"
                  >
                    {/* Previous Line (above) */}
                    <div className="h-7 flex items-center justify-center px-2">
                      {recentLineIdx > 0 ? (
                        <p className="text-white/45 font-['Caveat',cursive] text-lg sm:text-xl truncate max-w-md select-none tracking-wide">
                          &ldquo;{overlookedLines[recentLineIdx - 1]}&rdquo;
                        </p>
                      ) : (
                        <div className="h-7" />
                      )}
                    </div>

                    {/* Active Hero Line (center) - generous height and line-height prevents any clipping */}
                    <div className="min-h-[80px] sm:min-h-[88px] flex items-center justify-center px-3 py-1">
                      <p className="text-white font-['Caveat',cursive] font-bold text-3xl sm:text-4xl md:text-[40px] !leading-[1.3] tracking-wide select-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
                        &ldquo;{overlookedLines[recentLineIdx]}&rdquo;
                      </p>
                    </div>

                    {/* Next Line (bottom) */}
                    <div className="h-7 flex items-center justify-center px-2">
                      {recentLineIdx < overlookedLines.length - 1 ? (
                        <p className="text-white/45 font-['Caveat',cursive] text-lg sm:text-xl truncate max-w-md select-none tracking-wide">
                          &ldquo;{overlookedLines[recentLineIdx + 1]}&rdquo;
                        </p>
                      ) : (
                        <div className="h-7" />
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Retro Controls (No dividing horizontal line, clean font for counter) */}
              <div className="relative z-10 pt-1 flex items-center justify-between">
                <span className="font-mono text-xs sm:text-sm text-white/70 tracking-wider">
                  {recentLineIdx + 1} / {overlookedLines.length}
                </span>

                {/* Navigation Buttons: Beginning, Previous, Next */}
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResetRecentLine();
                    }}
                    title="Start from beginning"
                    className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 active:scale-95 border border-white/20"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevRecentLine();
                    }}
                    disabled={recentLineIdx === 0}
                    title="Previous line"
                    className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white transition-all duration-300 active:scale-95 border border-white/20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextRecentLine();
                    }}
                    title="Next line"
                    className="group flex items-center gap-1.5 px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-stone-900 hover:bg-neutral-200 active:scale-95 text-xs sm:text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg"
                  >
                    <span>{recentLineIdx === overlookedLines.length - 1 ? 'Start Over' : 'Next'}</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Card: Fixed-Height Glassmorphic Context Card with Moving Dim Light Blur Effect & Rich Typography */}
            <div className="lg:col-span-5 xl:col-span-4 h-[360px] sm:h-[380px] relative rounded-3xl bg-neutral-950/75 border border-white/10 backdrop-blur-2xl p-6 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden text-left flex flex-col justify-between">
              {/* Moving Dim Light Orbs behind blurred glass */}
              <motion.div
                animate={{
                  x: [-20, 60, -40, 20, -20],
                  y: [-20, 30, -30, 20, -20],
                  scale: [1, 1.25, 0.9, 1.2, 1],
                  opacity: [0.15, 0.28, 0.12, 0.25, 0.15],
                }}
                transition={{
                  duration: 16,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/25 via-sky-400/20 to-transparent blur-[70px] pointer-events-none"
              />
              <motion.div
                animate={{
                  x: [30, -50, 40, -20, 30],
                  y: [20, -40, 30, -30, 20],
                  scale: [1, 0.85, 1.3, 0.95, 1],
                  opacity: [0.12, 0.25, 0.15, 0.28, 0.12],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full bg-gradient-to-tl from-purple-500/25 via-blue-600/20 to-transparent blur-[75px] pointer-events-none"
              />
              <motion.div
                animate={{
                  x: [0, 35, -25, 0],
                  y: [0, -25, 30, 0],
                  opacity: [0.06, 0.16, 0.08, 0.06],
                }}
                transition={{
                  duration: 14,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
                className="absolute top-1/3 left-1/4 w-44 h-44 rounded-full bg-cyan-400/15 blur-[65px] pointer-events-none"
              />

              {/* Context Header */}
              <div className="relative z-10">
                <h4 className="relative inline-block text-2xl sm:text-3xl font-['Caveat',cursive] font-bold text-white tracking-wide pb-1.5">
                  Behind the Words:
                  <HandDrawnUnderline variant={3} />
                </h4>
              </div>

              {/* Context Explanation - Richer font size gracefully filling the card */}
              <div className="relative z-10 space-y-3 sm:space-y-3.5 text-neutral-300 leading-relaxed font-light">
                <p className="text-sm sm:text-[15px] md:text-base italic text-white/95 leading-relaxed font-serif">
                  &ldquo;Written about the quiet art of retreating before being asked to leave, and the subtle grief of convincing oneself that what was lost was never desired.&rdquo;
                </p>
                <p className="text-xs sm:text-[13.5px] md:text-sm text-neutral-300 leading-relaxed">
                  It explores the human instinct of preemptive withdrawal: choosing solitude over the sting of being second choice, and finding quiet dignity in walking away before anyone can close the door.
                </p>
              </div>

              {/* Bottom Context Footnote */}
              <div className="relative z-10 pt-1 flex items-center justify-between text-xs font-mono text-neutral-400">
                <span className="text-neutral-400 tracking-wider">Reflections &bull; Piece 01</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: HIS FAVORITES - Bigger Pages Starting from Same Padding Sides as Others */}
        <section
          aria-label="His Favorites"
          className="my-10 sm:my-14 relative"
        >
          {/* Header with Colon */}
          <div className="mb-5 sm:mb-6">
            <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl font-['Caveat',cursive] font-bold text-white tracking-wide !leading-[1.25] overflow-visible pb-1.5">
              <InkText text="His" inkRgb="29, 155, 240" />
              <span className="inline-block">&nbsp;</span>
              <InkText text="Favorites:" inkRgb="239, 68, 68" />
              <HandDrawnUnderline variant={2} />
            </h2>
          </div>

          {/* Full Width Grid Starting from Same Padding Sides as Other Sections (w-full) */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8">
              {favoritesList.map((poem, idx) => {
                if (!poem) return null;
                return (
                  <div
                    key={poem.id}
                    style={{ clipPath: tornPaperClipPath }}
                    onCopy={(e) => e.preventDefault()}
                    className="relative w-full bg-[#faf7ee] text-stone-900 overflow-hidden flex flex-col p-5 sm:p-6 md:p-7 shadow-[0_20px_45px_rgba(0,0,0,0.85)] border-t border-b border-amber-900/15 select-none transition-transform duration-300 hover:-translate-y-1.5"
                  >
                    {/* Natural Paper Texture Gradient */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(243,237,220,0.85) 75%, rgba(225,214,192,0.95) 100%)',
                      }}
                    />

                    {/* Ruled Notebook Lines */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-70"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 24px, rgba(100, 130, 175, 0.45) 25px)',
                        backgroundPosition: '0 40px',
                      }}
                    />

                    {/* Spiral Punch Holes along the left edge */}
                    <div className="absolute left-1.5 sm:left-2 top-4 bottom-4 flex flex-col justify-between items-center pointer-events-none z-20">
                      {[...Array(7)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full bg-neutral-950 shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)] border border-amber-950/40"
                        />
                      ))}
                    </div>

                    {/* Left Margin Red Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-[1.5px] bg-red-400/35 pointer-events-none" />

                    {/* Corner Uploaded star.png with Red Sketch Pen styling */}
                    <div className="absolute top-3 right-3 pointer-events-none select-none z-20">
                      <img
                        src={`${import.meta.env.BASE_URL}beyondcode/poem/star.png`}
                        alt="Star"
                        draggable={false}
                        className={`w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain select-none pointer-events-none ${
                          idx === 0 ? '-rotate-6' : idx === 1 ? 'rotate-3' : '-rotate-4'
                        }`}
                        style={{
                          filter: 'brightness(0) saturate(100%) invert(18%) sepia(88%) saturate(5436%) hue-rotate(353deg) brightness(91%) contrast(92%)',
                          mixBlendMode: 'multiply',
                          opacity: 0.9,
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/beyondcode/poem/star.png';
                        }}
                      />
                    </div>

                    {/* Paper Content Area - Bigger Sizing */}
                    <div className="relative z-10 flex-1 flex flex-col justify-between pl-6 sm:pl-7 pr-2 pt-1">
                      <div>
                        {/* Favorite # Badge & Title in Caveat */}
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-mono tracking-[0.16em] uppercase text-stone-500 font-semibold">
                            #{idx + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-['Caveat',cursive] font-bold text-stone-900 tracking-wide mb-2.5 leading-tight">
                          {poem.title}
                        </h3>

                        {/* Poem Body: Bigger, comfortable, readable typography */}
                        <div
                          className="text-stone-900 font-serif text-[13px] sm:text-[13.5px] md:text-[14px] leading-[1.62] sm:leading-[1.65] whitespace-pre-line tracking-tight"
                          style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
                        >
                          {poem.body}
                        </div>
                      </div>

                      {/* Handwriting Signature: "Writings by J" */}
                      <div className="mt-5 pt-2.5 border-t border-amber-900/15 flex items-center justify-end text-stone-600">
                        <span className="font-['Caveat',cursive] text-base sm:text-lg font-bold select-none tracking-wide text-stone-800">
                          — Writings by J
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Book Covers Collection Selection - No scrollbar, realistic book cover design without crease line */}
        <div className="mt-10 sm:mt-14 mb-8">
          <div className="mb-5 sm:mb-6">
            <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl font-['Caveat',cursive] font-bold text-white tracking-wide !leading-[1.25] overflow-visible pb-1.5">
              <InkText text="Chapters of the" inkRgb="29, 155, 240" />
              <span className="inline-block">&nbsp;</span>
              <InkText text="Heart:" inkRgb="239, 68, 68" />
              <HandDrawnUnderline variant={1} />
            </h2>
          </div>

          {/* Responsive 4 Book Cover Cards Grid (No scrollbar!) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                id: 'all' as const,
                volume: 'COMPLETE',
                title: 'The Whole of It',
                description: 'Every piece, a part of me',
                coverImage: 'all.jpeg',
              },
              {
                id: 'unspoken' as const,
                volume: 'VOL. I',
                title: 'What Remained Unsaid',
                description: 'Feelings that never found a voice',
                coverImage: 'unspoken.jpg',
              },
              {
                id: 'letting-go' as const,
                volume: 'VOL. II',
                title: 'Things We Leave Behind',
                description: 'Some goodbyes never quite end',
                coverImage: 'lettinggo.jpg',
              },
              {
                id: 'reflections' as const,
                volume: 'VOL. III',
                title: 'Somewhere Within',
                description: 'Conversations with the self',
                coverImage: 'echoes.jpg',
              },
            ].map((col) => {
              const isActive = selectedTheme === col.id;
              const count = col.id === 'all' 
                ? poemsData.length 
                : poemsData.filter((p) => p.theme === col.id).length;

              return (
                <button
                  key={col.id}
                  onClick={() => handleThemeChange(col.id)}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                  className={`group relative text-center rounded-2xl overflow-hidden aspect-[3/4.2] sm:aspect-[3/4.4] flex flex-col justify-between p-4 sm:p-5 transition-all duration-300 select-none focus:outline-none transform-gpu will-change-transform ${
                    isActive
                      ? 'ring-2 ring-white shadow-[0_0_35px_rgba(255,255,255,0.4),0_15px_40px_rgba(0,0,0,0.85)]'
                      : 'ring-1 ring-white/10 hover:ring-white/40 shadow-2xl opacity-90 hover:opacity-100'
                  }`}
                >
                  {/* Background Book Cover Image from poem folder */}
                  <img
                    src={`${import.meta.env.BASE_URL}beyondcode/poem/${col.coverImage}`}
                    alt={col.title}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none transform-gpu will-change-transform [backface-visibility:hidden]"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `${import.meta.env.BASE_URL}beyondcode/${col.coverImage}`;
                    }}
                  />

                  {/* Dark Atmospheric Gradient Overlays for Readability and Depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/60 pointer-events-none" />

                  {/* Top Header on Book Cover - Clean Volume and Bold Count Number */}
                  <div className="relative z-20 flex items-center justify-between gap-1 w-full">
                    <span className="text-[11px] font-mono tracking-[0.22em] uppercase text-neutral-200 font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      {col.volume}
                    </span>
                    <span className="font-['Montserrat',sans-serif] font-bold text-sm sm:text-base text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] tracking-tight">
                      {count}
                    </span>
                  </div>

                  {/* Centered Big Book Title: Classic, stylish, book-like typography with one word per line */}
                  <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-1 sm:px-2 w-full my-auto">
                    <h3 className="font-['Cinzel',serif] font-bold text-xl sm:text-2xl md:text-[26px] lg:text-[30px] text-white tracking-[0.14em] uppercase leading-[0.96] sm:leading-[0.98] drop-shadow-[0_4px_24px_rgba(0,0,0,1)] select-none transition-transform duration-300 group-hover:scale-105">
                      {col.title.split(' ').map((word, wIdx) => (
                        <span key={wIdx} className="block my-0.5">
                          {word}
                        </span>
                      ))}
                    </h3>
                  </div>

                  {/* Bottom of Book: Smooth Hover Description */}
                  <div className="relative z-20 w-full min-h-[36px] flex items-center justify-center text-center">
                    <p className="font-sans text-[11px] sm:text-xs text-neutral-200 font-medium leading-tight tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,1)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[200px] px-1 pointer-events-none">
                      {col.description}
                    </p>
                  </div>

                  {/* Active White Glow Inner Border */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/80 shadow-[inset_0_0_20px_rgba(255,255,255,0.18)] pointer-events-none z-30" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Heading Bar: MY WRITINGS on left, Piece text on right (no lines) */}
        <div ref={paperAreaRef} className="py-4 px-2 flex items-center justify-between flex-wrap gap-3 scroll-mt-24">
          <div className="flex items-center gap-3">
            <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl font-['Caveat',cursive] font-bold text-white tracking-wide !leading-[1.25] overflow-visible pb-1.5">
              <InkText text="My" inkRgb="29, 155, 240" />
              <span className="inline-block">&nbsp;</span>
              <InkText text="Writings:" inkRgb="239, 68, 68" />
              <HandDrawnUnderline variant={3} />
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-neutral-400 font-mono">
            Piece {currentIndex + 1} &bull; <span className="text-neutral-200 italic">{filteredPoems[currentIndex]?.title}</span>
          </div>
        </div>
      </div>

      {/* Main 3D Card Deck Carousel Section - Protected & Sized so sides never get cut off */}
      <main className="w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-10 relative mt-8 sm:mt-10 overflow-x-clip select-none">
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onContextMenu={(e) => e.preventDefault()}
          className="relative min-h-[550px] sm:min-h-[610px] md:min-h-[660px] flex items-center justify-center py-4 touch-pan-y"
        >
          {/* Previous Arrow Button - Smooth slow fade to white on hover */}
          <button
            onClick={handlePrev}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Previous Poem"
            className="absolute left-1 sm:left-4 md:left-6 z-50 p-3 sm:p-4 rounded-full bg-neutral-900/90 hover:bg-white text-neutral-300 hover:text-black border border-white/20 hover:border-white backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-500 ease-out hover:scale-110 active:scale-95 group focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:-translate-x-0.5" />
          </button>

          {/* Next Arrow Button - Smooth slow fade to white on hover */}
          <button
            onClick={handleNext}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            aria-label="Next Poem"
            className="absolute right-1 sm:right-4 md:right-6 z-50 p-3 sm:p-4 rounded-full bg-neutral-900/90 hover:bg-white text-neutral-300 hover:text-black border border-white/20 hover:border-white backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-500 ease-out hover:scale-110 active:scale-95 group focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-500 group-hover:translate-x-0.5" />
          </button>

          {/* Continuous Loop 3D Stack: Animated fade in/out on chapter selection */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTheme}
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -14 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full flex items-center justify-center"
            >
              {filteredPoems.map((poem, index) => {
              const diff = getCircularDiff(index, currentIndex, totalPoems);
              const absDiff = Math.abs(diff);

              // Don't render cards that are far away in the stack
              if (absDiff > 2) {
                return null;
              }

              const isCenter = diff === 0;
              const isLeft1 = diff === -1;
              const isRight1 = diff === 1;

              let xValue = '0%';
              let scaleValue = 1;
              let zIndexValue = 40;
              let opacityValue = 1;
              let rotateValue = 0;
              let blurValue = 'blur(0px)';
              let pointerEvents: 'auto' | 'none' = 'none';

              // Adjusted offsets so paper sides are NEVER cut off by containers or screen margins
              if (isCenter) {
                xValue = '0%';
                scaleValue = 1;
                zIndexValue = 40;
                opacityValue = 1;
                rotateValue = 0;
                blurValue = 'blur(0px)';
                pointerEvents = 'auto';
              } else if (isLeft1) {
                xValue = '-50%';
                scaleValue = 0.88;
                zIndexValue = 30;
                opacityValue = 1;
                rotateValue = -3.5;
                blurValue = 'brightness(0.75) contrast(0.95)';
                pointerEvents = 'auto';
              } else if (isRight1) {
                xValue = '50%';
                scaleValue = 0.88;
                zIndexValue = 30;
                opacityValue = 1;
                rotateValue = 3.5;
                blurValue = 'brightness(0.75) contrast(0.95)';
                pointerEvents = 'auto';
              } else if (diff === -2) {
                xValue = '-84%';
                scaleValue = 0.78;
                zIndexValue = 20;
                opacityValue = 1;
                rotateValue = -6.5;
                blurValue = 'brightness(0.52) contrast(0.9)';
                pointerEvents = 'none';
              } else if (diff === 2) {
                xValue = '84%';
                scaleValue = 0.78;
                zIndexValue = 20;
                opacityValue = 1;
                rotateValue = 6.5;
                blurValue = 'brightness(0.52) contrast(0.9)';
                pointerEvents = 'none';
              }

              return (
                <motion.div
                  key={poem.id}
                  onClick={() => {
                    if (isLeft1) handlePrev();
                    if (isRight1) handleNext();
                  }}
                  initial={false}
                  animate={{
                    x: xValue,
                    scale: scaleValue,
                    zIndex: zIndexValue,
                    opacity: opacityValue,
                    rotate: rotateValue,
                    filter: blurValue,
                  }}
                  transition={{
                    duration: 0.32,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    pointerEvents,
                    filter: blurValue,
                  }}
                  className={`absolute w-[82vw] max-w-[320px] sm:max-w-[380px] md:max-w-[430px] h-[500px] sm:h-[560px] md:h-[600px] select-none transform-gpu will-change-transform drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] ${
                    isCenter ? 'cursor-default' : 'cursor-pointer hover:opacity-85'
                  }`}
                >
                  {/* Outer Torn Paper Container with Natural Jagged Edges */}
                  <div
                    style={{
                      clipPath: tornPaperClipPath,
                    }}
                    onCopy={(e) => e.preventDefault()}
                    className="relative w-full h-full bg-[#faf7ee] text-stone-900 overflow-hidden flex flex-col p-5 sm:p-7 md:p-9 border-t border-b border-amber-900/10 select-none"
                  >
                    {/* Natural Paper Texture Gradient & Subtle Aging Vignette */}
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(243,237,220,0.85) 75%, rgba(225,214,192,0.95) 100%)',
                      }}
                    />

                    {/* Ruled Notebook Lines */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-70"
                      style={{
                        backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(100, 130, 175, 0.5) 28px)',
                        backgroundPosition: '0 50px',
                      }}
                    />

                    {/* Realistic Spiral Binder Punch Holes along the left edge */}
                    <div className="absolute left-2 sm:left-3 top-6 bottom-6 flex flex-col justify-between items-center pointer-events-none z-20">
                      {[...Array(9)].map((_, i) => (
                        <div
                          key={i}
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-neutral-950 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.9),0_0.5px_1px_rgba(255,255,255,0.6)] border border-amber-950/40"
                        />
                      ))}
                    </div>

                    {/* Authentic Left Margin Red Line */}
                    <div className="absolute left-8 sm:left-10 md:left-11 top-0 bottom-0 w-[1.5px] bg-red-400/35 pointer-events-none" />

                    {/* Poem Content Area - Clean without header numbers */}
                    <div className="relative z-10 flex-1 flex flex-col justify-between pt-1 sm:pt-3 pl-6 sm:pl-8 overflow-hidden">
                      <div className="overflow-y-auto pr-1.5 sm:pr-2.5 space-y-3 paper-scroll">
                        {/* Poem Title in Writing Font */}
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Caveat',cursive] font-bold text-stone-900 tracking-wide pt-1 capitalize">
                          {poem.title}
                        </h2>

                        {/* Poem Body with Tuned Natural Line Spacing */}
                        <div
                          className={`text-stone-800 font-serif whitespace-pre-line tracking-wide font-normal ${getDynamicBodyStyle(
                            poem.body
                          )}`}
                          style={{
                            fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif',
                          }}
                        >
                          {poem.body}
                        </div>
                      </div>

                      {/* Author Signature & Attribution - Delicate handwriting */}
                      <div className="pt-2 mt-auto border-t border-amber-900/15 flex items-center justify-between">
                        <span className="font-['Caveat'] text-base sm:text-lg font-medium text-stone-600/90 select-none tracking-wide">
                          — {poem.author}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Bottom Control Navigation Indicator */}
        <div className="flex flex-col items-center justify-center gap-2.5 mt-4">
          {/* Keyboard instruction placed below the pages, centered */}
          <div className="text-xs font-mono text-neutral-400 flex items-center justify-center gap-1.5">
            <span>Use</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200 font-mono text-[11px] border border-white/15">←</kbd>
            <span>and</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-neutral-200 font-mono text-[11px] border border-white/15">→</kbd>
            <span>arrow keys to flip pages</span>
          </div>

          {/* Direct Title and Position */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Piece {currentIndex + 1} of {totalPoems}
            </span>
            <span className="text-neutral-600">&bull;</span>
            <span className="text-sm font-semibold tracking-wide text-blue-300">
              {filteredPoems[currentIndex]?.title}
            </span>
          </div>

          {/* Section End Divider Line */}
          <div className="w-full border-b border-white/10 pt-6 sm:pt-8" />
        </div>

        {/* SECTION 4: APP SHOWCASE - Echo App ("Want to vent something out?") */}
        <section
          aria-label="App Showcase - Echo"
          className="my-10 sm:my-14 relative"
        >
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-2xl p-7 sm:p-10 md:p-12 shadow-[0_24px_60px_rgba(0,0,0,0.7)] text-center overflow-hidden">
            {/* Header Content */}
            <div className="max-w-2xl mx-auto space-y-3 mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Caveat',cursive] font-bold text-white tracking-wide !leading-[1.25] overflow-visible">
                <InkText text="Want to vent something out?" inkRgb="29, 155, 240" />
              </h2>

              <p className="text-stone-300 text-base sm:text-lg font-light tracking-wide max-w-xl mx-auto">
                Try the app I built just for this. A quiet, anonymous haven where raw thoughts, quiet aches, and unsaid words can echo and dissolve into peace.
              </p>

              <div className="pt-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.j3labs.echo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-stone-950 hover:bg-neutral-200 active:scale-95 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.25)]"
                >
                  <span>Experience Echo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* 3 App Screenshots Showcase: echo1.png, echo2.png, echo3.png */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto items-center">
              {[
                { src: 'echo1.png', label: 'Express Unfiltered Thoughts' },
                { src: 'echo2.png', label: 'Tuned to understand you' },
                { src: 'echo3.png', label: 'Release Into the Void' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center"
                >
                  {/* Phone Mockup Frame - White hover effect */}
                  <div className="relative w-full max-w-[260px] aspect-[9/18.5] rounded-[2.2rem] p-2 bg-gradient-to-b from-neutral-700 via-neutral-900 to-black border-2 border-white/20 shadow-[0_20px_45px_rgba(0,0,0,0.85)] group-hover:border-white/70 group-hover:shadow-[0_25px_50px_rgba(255,255,255,0.22)] group-hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                    {/* Screen Glare Highlight */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-10" />

                    {/* Screenshot Image */}
                    <div className="w-full h-full rounded-[1.8rem] overflow-hidden bg-black">
                      <img
                        src={`${import.meta.env.BASE_URL}beyondcode/poem/${item.src}`}
                        alt={`Echo App Screenshot ${idx + 1}`}
                        draggable={false}
                        className="w-full h-full object-cover object-top select-none group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `${import.meta.env.BASE_URL}beyondcode/${item.src}`;
                        }}
                      />
                    </div>
                  </div>

                  {/* Caption - White hover effect */}
                  <span className="mt-3.5 text-xs font-mono uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
};
