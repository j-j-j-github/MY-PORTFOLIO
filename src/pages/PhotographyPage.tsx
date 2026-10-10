import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

export const PhotographyPage: React.FC = () => {
  const { navigate, goBack } = useRouter();

  useEffect(() => {
    document.title = "Frames | Jeeval";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-neutral-800">
      {/* Discreet Navigation to Return */}
      <button
        onClick={() => {
          if (window.history.length > 1) {
            goBack();
          } else {
            navigate('/');
          }
        }}
        className="absolute top-6 left-6 sm:top-8 sm:left-8 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors text-xs font-mono uppercase tracking-wider focus:outline-none"
        aria-label="Back to home"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back</span>
      </button>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-center">
        Deploying soon
      </h1>
    </div>
  );
};
