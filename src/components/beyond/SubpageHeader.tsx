import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from '../../context/RouterContext';

interface SubpageHeaderProps {
  badge: string;
  title: string;
  subtitle: string;
}

export const SubpageHeader: React.FC<SubpageHeaderProps> = ({
  badge,
  title,
  subtitle,
}) => {
  const { navigate } = useRouter();

  return (
    <div>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-[64px] bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 md:px-12 flex items-center justify-between">
        <button
          onClick={() => navigate('/#beyondcode', { sectionId: 'beyondcode' })}
          style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
          className="group flex items-center gap-2.5 text-neutral-400 hover:text-white transition-colors duration-300 text-xs md:text-sm font-medium tracking-wider uppercase outline-none focus:outline-none focus:ring-0 rounded-lg px-2 py-1 -ml-2 select-none"
          aria-label="Back to Jeeval's Space"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 text-blue-400" />
          <span>Back to Jeeval&apos;s Space</span>
        </button>

        <button
          onClick={() => navigate('/#beyondcode', { sectionId: 'beyondcode' })}
          style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
          className="font-bold text-base md:text-lg tracking-[0.2em] text-white hover:text-blue-400 transition-colors uppercase outline-none focus:outline-none focus:ring-0 select-none"
        >
          Jeeval&apos;s Space
        </button>
      </header>

      {/* Hero Header Area */}
      <div className="pt-32 pb-12 md:pt-36 md:pb-16 px-6 md:px-12 max-w-5xl mx-auto text-center">
        {/* Subtle Category Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-mono uppercase tracking-[0.2em] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          {badge}
        </div>

        {/* Page Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white uppercase">
          {title}
        </h1>

        {/* Blue Accent Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-1 bg-blue-500 rounded-full mx-auto mt-5 mb-6"
        />

        {/* Introductory Copy */}
        <p className="max-w-2xl mx-auto text-neutral-400 text-base md:text-lg font-light leading-relaxed">
          {subtitle}
        </p>
      </div>
    </div>
  );
};
