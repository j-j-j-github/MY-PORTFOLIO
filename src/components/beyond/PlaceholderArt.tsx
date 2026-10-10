import React from 'react';
import { Watch, Camera, Feather } from 'lucide-react';

interface PlaceholderArtProps {
  type: 'watches' | 'photography' | 'poetry';
  title?: string;
  className?: string;
  imageUrl?: string;
}

export const PlaceholderArt: React.FC<PlaceholderArtProps> = ({
  type,
  title,
  className = '',
  imageUrl,
}) => {
  if (imageUrl) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-neutral-950 ${className}`}>
        <img
          src={imageUrl}
          alt={title || type}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </div>
    );
  }

  if (type === 'watches') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex items-center justify-center p-6 select-none ${className}`}>
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />
        
        {/* Horological Dial Blueprint Graphic */}
        <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.8)] group-hover:border-blue-500/30 transition-colors duration-500">
          {/* Inner bezel */}
          <div className="absolute inset-2 rounded-full border border-dashed border-white/10 group-hover:border-white/20 transition-colors duration-500" />
          <div className="absolute inset-6 rounded-full border border-white/5 bg-neutral-900/60 backdrop-blur-sm" />

          {/* Dial Markers (12, 3, 6, 9) */}
          <div className="absolute top-2 w-1 h-3 bg-neutral-400 group-hover:bg-blue-400 rounded-full transition-colors" />
          <div className="absolute bottom-2 w-1 h-3 bg-neutral-500 rounded-full" />
          <div className="absolute left-2 h-1 w-3 bg-neutral-500 rounded-full" />
          <div className="absolute right-2 h-1 w-3 bg-neutral-500 rounded-full" />

          {/* Subdial / Date aperture */}
          <div className="absolute bottom-9 px-2 py-0.5 rounded border border-white/10 text-[9px] font-mono text-neutral-400 tracking-wider">
            AUTO
          </div>

          {/* Watch Hands */}
          <div className="absolute w-0.5 h-12 bg-neutral-200 origin-bottom -translate-y-6 rotate-[42deg] group-hover:rotate-[50deg] transition-transform duration-700 rounded-full" />
          <div className="absolute w-1 h-8 bg-neutral-300 origin-bottom -translate-y-4 -rotate-[78deg] group-hover:-rotate-[70deg] transition-transform duration-700 rounded-full" />
          <div className="absolute w-0.5 h-14 bg-blue-500 origin-bottom -translate-y-7 rotate-[195deg] group-hover:rotate-[210deg] transition-transform duration-1000" />
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-neutral-900 z-10" />
        </div>

        {/* Minimal Category Tag */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
          <Watch className="w-3.5 h-3.5 text-blue-400" />
          <span>Horology Journal</span>
        </div>
      </div>
    );
  }

  if (type === 'photography') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex items-center justify-center p-6 select-none ${className}`}>
        {/* Subtle radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />

        {/* Lens Aperture and Framing Lines */}
        <div className="relative w-44 h-36 border border-white/10 rounded-xl flex items-center justify-center group-hover:border-emerald-500/30 transition-colors duration-500">
          {/* Rule of Thirds Guides */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none opacity-20">
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-r border-b border-white" />
            <div className="border-b border-white" />
            <div className="border-r border-white" />
            <div className="border-r border-white" />
            <div />
          </div>

          {/* Aperture Circle */}
          <div className="relative w-24 h-24 rounded-full border-2 border-white/15 flex items-center justify-center bg-neutral-900/70 backdrop-blur-sm group-hover:scale-105 group-hover:border-emerald-500/40 transition-all duration-500">
            <div className="w-16 h-16 rounded-full border border-dashed border-emerald-400/40 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>

          {/* Viewfinder Corner Brackets */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-neutral-400" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-neutral-400" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-neutral-400" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-neutral-400" />
        </div>

        {/* Minimal Category Tag */}
        <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
          <Camera className="w-3.5 h-3.5 text-emerald-400" />
          <span>Visual Journal</span>
        </div>
      </div>
    );
  }

  // Poetry
  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black flex items-center justify-center p-6 select-none ${className}`}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.08)_0%,transparent_70%)]" />

      {/* Understated Literary Paper / Stanza Composition */}
      <div className="relative w-44 h-36 bg-neutral-900/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between shadow-2xl group-hover:border-rose-500/30 transition-colors duration-500">
        {/* Notebook Ruled Lines with Poetic Indentation */}
        <div className="space-y-2.5 pt-1">
          <div className="w-16 h-1.5 bg-rose-400/60 rounded-full" />
          <div className="w-28 h-1 bg-white/20 rounded-full" />
          <div className="w-24 h-1 bg-white/15 rounded-full" />
          <div className="w-32 h-1 bg-white/20 rounded-full" />
          <div className="w-20 h-1 bg-white/10 rounded-full ml-4" />
          <div className="w-24 h-1 bg-white/15 rounded-full ml-4" />
        </div>

        {/* Quill / Ink Accent */}
        <div className="flex justify-between items-end border-t border-white/5 pt-2">
          <span className="text-[10px] font-mono text-neutral-500">35mm & Ink</span>
          <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Feather className="w-3.5 h-3.5 text-rose-400" />
          </div>
        </div>
      </div>

      {/* Minimal Category Tag */}
      <div className="absolute bottom-4 left-6 flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
        <Feather className="w-3.5 h-3.5 text-rose-400" />
        <span>Selected Writings</span>
      </div>
    </div>
  );
};
