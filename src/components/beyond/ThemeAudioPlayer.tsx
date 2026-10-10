import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YOUTUBE_VIDEO_ID = 'G5SAO7jS8xk';

export const ThemeAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const userExplicitlyPausedRef = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  // Send command to YouTube iframe via postMessage bridge
  const postCommand = useCallback((func: string, args: any = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func, args }),
          '*'
        );
      } catch (e) {
        console.warn('PostMessage error:', e);
      }
    }
  }, []);

  // Initialize and bind YouTube Player
  useEffect(() => {
    let isMounted = true;

    const initPlayer = () => {
      if (!isMounted || !iframeRef.current || !window.YT || !window.YT.Player) return;

      try {
        if (!playerRef.current) {
          playerRef.current = new window.YT.Player(iframeRef.current, {
            events: {
              onReady: (event: any) => {
                if (!isMounted) return;
                try {
                  event.target.unMute();
                  event.target.setVolume(100);
                  if (!userExplicitlyPausedRef.current) {
                    event.target.playVideo();
                  }
                } catch (e) {
                  console.warn('Autoplay waiting for user gesture:', e);
                }
              },
              onStateChange: (event: any) => {
                if (!isMounted) return;
                // 1: PLAYING
                if (event.data === 1) {
                  setIsPlaying(true);
                } else if (event.data === 2) {
                  // 2: PAUSED
                  setIsPlaying(false);
                } else if (event.data === 0) {
                  // 0: ENDED -> Loop smoothly
                  try {
                    event.target.playVideo();
                  } catch (_) {}
                }
              },
            },
          });
        }
      } catch (err) {
        console.warn('Error initializing YT.Player:', err);
      }
    };

    // Load YouTube IFrame API script if not present
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };

      if (!document.getElementById('youtube-iframe-api')) {
        const script = document.createElement('script');
        script.id = 'youtube-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
    }

    // Message fallback for YouTube postMessage
    const handleMessage = (e: MessageEvent) => {
      if (!isMounted) return;
      try {
        if (typeof e.data === 'string') {
          const data = JSON.parse(e.data);
          if (data.event === 'infoDelivery' && data.info) {
            if (typeof data.info.playerState === 'number') {
              if (data.info.playerState === 1) {
                setIsPlaying(true);
              } else if (data.info.playerState === 2) {
                setIsPlaying(false);
              }
            }
          }
        }
      } catch (_) {}
    };

    window.addEventListener('message', handleMessage);

    // Browser Autoplay Policy:
    // When the user clicks or taps anywhere on the page, unlock and ensure audio plays with full volume
    const handleFirstGesture = () => {
      if (!userExplicitlyPausedRef.current) {
        postCommand('unMute');
        postCommand('setVolume', [100]);
        postCommand('playVideo');
        if (playerRef.current) {
          try {
            playerRef.current.unMute();
            playerRef.current.setVolume(100);
            playerRef.current.playVideo();
          } catch (_) {}
        }
        setIsPlaying(true);
      }
      cleanupGestureListeners();
    };

    const cleanupGestureListeners = () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { passive: true, once: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true, once: true });
    window.addEventListener('keydown', handleFirstGesture, { passive: true, once: true });

    // Cleanup when poem page unmounts / closes: stops music instantly
    return () => {
      isMounted = false;
      cleanupGestureListeners();
      window.removeEventListener('message', handleMessage);

      if (playerRef.current) {
        try {
          playerRef.current.stopVideo();
          playerRef.current.destroy();
        } catch (_) {}
        playerRef.current = null;
      }

      if (iframeRef.current) {
        iframeRef.current.src = 'about:blank';
      }
    };
  }, [postCommand]);

  // Toggle Pause / Resume
  const togglePlayback = () => {
    if (isPlaying) {
      // Pause so user can resume back at the same point later
      userExplicitlyPausedRef.current = true;
      setIsPlaying(false);
      postCommand('pauseVideo');
      if (playerRef.current && typeof playerRef.current.pauseVideo === 'function') {
        try {
          playerRef.current.pauseVideo();
        } catch (_) {}
      }
    } else {
      // Resume playback with full volume and unMute
      userExplicitlyPausedRef.current = false;
      setIsPlaying(true);
      postCommand('unMute');
      postCommand('setVolume', [100]);
      postCommand('playVideo');
      if (playerRef.current) {
        try {
          playerRef.current.unMute();
          playerRef.current.setVolume(100);
          playerRef.current.playVideo();
        } catch (_) {}
      }
    }
  };

  return (
    <>
      {/* 
        CRITICAL: Positioned at bottom-0 right-0 z-[-1] with tabIndex={-1}.
        NEVER position at -top-[9999px] as browsers will scroll the page to top
        whenever YouTube updates focus/loop events!
      */}
      <div
        className="fixed bottom-0 right-0 w-[1px] h-[1px] opacity-[0.001] pointer-events-none z-[-1] overflow-hidden"
        aria-hidden="true"
        tabIndex={-1}
      >
        <iframe
          ref={iframeRef}
          id="poetry-theme-audio-iframe"
          title="Theme Music Audio"
          tabIndex={-1}
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&playsinline=1&modestbranding=1&rel=0`}
          allow="autoplay; encrypted-media"
          className="w-1 h-1 pointer-events-none"
        />
      </div>

      {/* Centered Glassmorphic Sound Button: Round on mobile/narrow screens, Pill on desktop */}
      <div className="relative group">
        <button
          onClick={togglePlayback}
          style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
          className={`relative flex items-center justify-center gap-2 sm:gap-2.5 w-9 h-9 sm:w-auto sm:h-auto p-0 sm:px-4 sm:py-2 rounded-full backdrop-blur-xl border transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 outline-none focus:outline-none select-none ${
            isPlaying
              ? 'bg-white/10 hover:bg-white/15 border-white/20 text-white shadow-[0_0_20px_rgba(255,255,255,0.12)]'
              : 'bg-white/5 hover:bg-white/10 border-white/10 text-neutral-400 hover:text-white'
          }`}
          aria-label={isPlaying ? 'Pause ambience theme music' : 'Play ambience theme music'}
          title={isPlaying ? 'Ambience ON — Click to pause' : 'Ambience OFF — Click to play'}
        >
          {/* Subtle Ambient Glow Ring when ON */}
          {isPlaying && (
            <motion.span
              className="absolute -inset-[1px] rounded-full border border-white/25 pointer-events-none"
              animate={{
                opacity: [0.25, 0.6, 0.25],
                scale: [1, 1.015, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.6,
                ease: 'easeInOut',
              }}
            />
          )}

          {/* Left: Speaker Icon */}
          <div className="flex items-center justify-center shrink-0">
            <AnimatePresence mode="wait" initial={false}>
              {isPlaying ? (
                <motion.div
                  key="playing"
                  initial={{ scale: 0.65, opacity: 0, rotate: 15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.65, opacity: 0, rotate: -15 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <Volume2 className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="paused"
                  initial={{ scale: 0.65, opacity: 0, rotate: -15 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  exit={{ scale: 0.65, opacity: 0, rotate: 15 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Middle: Ambience ON / Ambience OFF Text (Hidden on narrow/mobile, pill on desktop) */}
          <div className="hidden sm:flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.14em] uppercase font-mono select-none">
              <span className={isPlaying ? 'text-white' : 'text-neutral-400'}>Ambience </span>
              <span className={isPlaying ? 'text-emerald-400 font-bold' : 'text-neutral-500 font-medium'}>
                {isPlaying ? 'ON' : 'OFF'}
              </span>
            </span>
          </div>

          {/* Right: Live Dynamic Equalizer (Hidden on narrow/mobile, pill on desktop) */}
          <div className="hidden sm:flex items-end gap-[2px] h-3 sm:h-3.5 shrink-0 pl-0.5">
            <motion.span
              className={`w-[1.5px] sm:w-[2px] rounded-full transition-colors duration-300 ${
                isPlaying ? 'bg-white' : 'bg-neutral-600'
              }`}
              animate={{
                height: isPlaying ? ['3px', '13px', '5px', '14px', '3px'] : '3px',
              }}
              transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 1.1,
                ease: 'easeInOut',
              }}
            />
            <motion.span
              className={`w-[1.5px] sm:w-[2px] rounded-full transition-colors duration-300 ${
                isPlaying ? 'bg-white' : 'bg-neutral-600'
              }`}
              animate={{
                height: isPlaying ? ['8px', '3px', '14px', '6px', '8px'] : '3px',
              }}
              transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 0.85,
                ease: 'easeInOut',
                delay: 0.15,
              }}
            />
            <motion.span
              className={`w-[1.5px] sm:w-[2px] rounded-full transition-colors duration-300 ${
                isPlaying ? 'bg-white' : 'bg-neutral-600'
              }`}
              animate={{
                height: isPlaying ? ['4px', '11px', '3px', '12px', '4px'] : '3px',
              }}
              transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 1.25,
                ease: 'easeInOut',
                delay: 0.3,
              }}
            />
            <motion.span
              className={`w-[1.5px] sm:w-[2px] rounded-full transition-colors duration-300 ${
                isPlaying ? 'bg-white' : 'bg-neutral-600'
              }`}
              animate={{
                height: isPlaying ? ['6px', '14px', '4px', '9px', '6px'] : '3px',
              }}
              transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 0.95,
                ease: 'easeInOut',
                delay: 0.2,
              }}
            />
          </div>
        </button>

        {/* Floating Tooltip */}
        <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 top-full mt-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:translate-y-0 translate-y-1 z-50 whitespace-nowrap">
          <div className="px-2.5 py-1 rounded-md bg-neutral-900/90 backdrop-blur-md border border-white/10 text-[11px] font-sans text-neutral-200 shadow-xl flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'
              }`}
            />
            <span>
              {isPlaying
                ? 'Cigarettes After Sex • Late Night Playlist'
                : 'Ambience Off (Click to play)'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
