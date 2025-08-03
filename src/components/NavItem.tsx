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
        relative group overflow-hidden px-5 py-2 rounded-lg font-semibold text-sm md:text-base 
        transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]
        bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-2xl
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
        ${active ? 'text-white' : 'text-gray-300'}
      `}
    >
      {/* Hover Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-lg"></div>

      {/* Border Highlight on Hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]">
        <div className="bg-black rounded-lg h-full w-full"></div>
      </div>

      {/* Moving Shine */}
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

      {/* Label */}
      <div className="relative z-10 group-hover:text-white transition-colors duration-500">
        {label}
      </div>

      {/* Smoky Underglow Effect with Smooth Transition */}
      {/* Enhanced Smoky Underglow */}
{/* Vibrant Indigo Glow with Tightened Blur */}
<div
  className={`
    pointer-events-none absolute inset-x-0 bottom-[-10px] transition-opacity duration-700 ease-in-out
    ${active ? 'opacity-100' : 'opacity-0'}
  `}
>
  {/* Rich, colorful radial glow */}
  <div
    className="
      mx-auto w-[120%] h-[70px]
      bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.75)_0%,_rgba(129,140,248,0.5)_40%,_transparent_90%)]
      blur-[45px] opacity-95
    "
  />
  {/* Crisper inner light bar */}
  <div
    className="
      absolute inset-x-10 bottom-[2px] h-[8px] rounded-full bg-indigo-400
      blur-md opacity-95 shadow-[0_0_30px_10px_rgba(129,140,248,0.6)]
    "
  />
</div>
    </button>
  )
);

export default NavItem;