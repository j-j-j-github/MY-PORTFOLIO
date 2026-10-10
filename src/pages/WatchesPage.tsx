import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const WatchesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    document.title = "Objects & Time | Jeeval";
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
      {/* Discreet Navigation to Return */}
      <button
        onClick={() => navigate('/#beyondcode', { sectionId: 'beyondcode' })}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors text-xs font-mono uppercase tracking-wider focus:outline-none"
        aria-label="Back to Beyond Code"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
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
