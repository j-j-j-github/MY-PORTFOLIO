import React from 'react';
import { Camera, Watch, Image as ImageIcon } from 'lucide-react';

interface EditorialImagePlaceholderProps {
  src?: string;
  alt?: string;
  label?: string;
  sublabel?: string;
  aspectRatio?: string; // e.g. 'aspect-[4/3]', 'aspect-[16/10]', 'aspect-[3/4]', 'aspect-[1/1]'
  className?: string;
  iconType?: 'watch' | 'camera' | 'still-life';
  priority?: boolean;
}

export const EditorialImagePlaceholder: React.FC<EditorialImagePlaceholderProps> = ({
  src,
  alt = 'Photograph',
  label = 'Photograph',
  sublabel = 'Archive Plate',
  aspectRatio = 'aspect-[4/3]',
  className = '',
  iconType = 'watch',
}) => {
  // If an actual image is provided, display it gracefully
  if (src && src.trim().length > 0) {
    return (
      <div className={`relative overflow-hidden bg-neutral-900 ${aspectRatio} ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
        />
      </div>
    );
  }

  const renderIcon = () => {
    switch (iconType) {
      case 'watch':
        return <Watch className="w-5 h-5 text-neutral-500 stroke-[1.25]" />;
      case 'camera':
        return <Camera className="w-5 h-5 text-neutral-500 stroke-[1.25]" />;
      default:
        return <ImageIcon className="w-5 h-5 text-neutral-500 stroke-[1.25]" />;
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-neutral-950/70 border border-neutral-800/80 flex flex-col items-center justify-center p-6 text-center select-none group transition-colors duration-500 hover:border-neutral-700/80 ${aspectRatio} ${className}`}
      aria-label={`${label} placeholder`}
    >
      {/* Subtle Editorial Corner Registration Marks */}
      <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-neutral-700/60 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-2 h-2 border-t border-r border-neutral-700/60 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-2 h-2 border-b border-l border-neutral-700/60 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-neutral-700/60 pointer-events-none" />

      {/* Subtle Fine-Grid Grain Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40" />

      {/* Center Icon & Editorial Typography */}
      <div className="relative z-10 flex flex-col items-center gap-2 max-w-[200px]">
        <div className="p-2.5 rounded-full bg-neutral-900/90 border border-neutral-800 transition-transform duration-500 group-hover:scale-110">
          {renderIcon()}
        </div>
        <div className="space-y-0.5">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-neutral-400 font-medium">
            [ {label} ]
          </p>
          <p className="font-mono text-[9px] tracking-[0.16em] uppercase text-neutral-600">
            {sublabel}
          </p>
        </div>
      </div>
    </div>
  );
};
