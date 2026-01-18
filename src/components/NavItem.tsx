// src/components/NavItem.tsx
import React, { forwardRef } from 'react';

const NavItem = forwardRef(
  (
    {
      id,
      label,
      active,
      onClick,
    }: {
      id: string;
      label: string;
      active: boolean;
      onClick: (id: string) => void;
    },
    ref
  ) => (
    <button
      ref={ref}
      onClick={() => onClick(id)}
      className={`
        relative group overflow-hidden px-6 py-2.5 rounded-full text-sm font-medium tracking-wide
        transition-all duration-300 ease-out transform
        border
        ${active 
          ? 'text-white bg-white/10 border-white/10 shadow-[0_0_20px_rgba(37,99,235,0.25)] scale-105' 
          : 'text-neutral-400 border-transparent hover:text-white hover:bg-white/5 hover:border-white/5'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500/50
      `}
    >
      {/* Label */}
      <span className="relative z-10">{label}</span>

      {/* Active State: Sophisticated Blue Reflection */}
      <div 
        className={`
          absolute inset-0 pointer-events-none transition-opacity duration-500
          ${active ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {/* Subtle bottom blue light reflection (like macOS dock) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-blue-600/20 blur-md rounded-full"></div>
        <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-blue-400 blur-[2px]"></div>
      </div>

      {/* Hover: Minimalist Shine Swipe (White) */}
      <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none"></div>
    </button>
  )
);

export default NavItem;