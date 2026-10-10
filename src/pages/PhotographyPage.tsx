import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const PhotographyPage: React.FC = () => {
  const { navigate } = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    document.title = "Frames | Jeeval";
    window.scrollTo(0, 0);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/#beyondcode', { sectionId: 'beyondcode' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-neutral-800">
      {/* Navigation to Return (Poem Page Style) */}
      <button
        onClick={() => navigate('/#beyondcode', { sectionId: 'beyondcode' })}
        style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/15 text-white transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 outline-none focus:outline-none select-none z-10"
        aria-label="Back to Jeeval's Space"
        title="Back to Jeeval's Space"
      >
        <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5 text-white" />
      </button>

      <div className="flex flex-col items-center justify-center text-center max-w-md px-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
          Deploying soon
        </h1>
        <p className="text-neutral-400 text-xs sm:text-sm font-mono tracking-wide text-center">
          Taking you back to home in <span className="text-white font-semibold">{countdown}s</span>...
        </p>
      </div>
    </div>
  );
};
