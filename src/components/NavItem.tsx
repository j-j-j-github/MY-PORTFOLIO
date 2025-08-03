// src/components/NavItem.tsx
import React, { forwardRef } from 'react';

// The component now accepts 'ref' as a prop and forwards it to the button.
const NavItem = forwardRef(({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick: (id: string) => void }, ref) => (
    <button
        ref={ref}
        onClick={() => onClick(id)}
        className={`
            relative group overflow-hidden px-5 py-2 rounded-lg font-semibold text-sm md:text-base 
            transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]
            bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-2xl
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            ${active ? 'text-white shadow-lg shadow-indigo-700/50' : 'text-gray-300'}
        `}
    >
        {/* Effects from SkillCard */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-lg"></div>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]">
            <div className="bg-black rounded-lg h-full w-full"></div>
        </div>
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

        {/* Content */}
        <div className="relative z-10 group-hover:text-white transition-colors duration-500">
            {label}
        </div>
        
        {/* Active state indicator */}
        {active && (
            <span className="absolute inset-0 rounded-lg ring-2 ring-indigo-400/40 animate-glow" />
        )}
    </button>
));

export default NavItem;