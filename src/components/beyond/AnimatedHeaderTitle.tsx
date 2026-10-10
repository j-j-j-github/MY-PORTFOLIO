import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedHeaderTitleProps {
  onClick: () => void;
}

export const AnimatedHeaderTitle: React.FC<AnimatedHeaderTitleProps> = ({ onClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger transition when scrolled past the first section / cover banner (~280px)
      const scrolled = window.scrollY > 280;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    if (isScrolled) {
      // When it says "Writings of J", smoothly scroll back to the top of the poetry archive
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // When it says "Jeeval's Space", navigate to homepage
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      style={{ WebkitTapHighlightColor: 'transparent', outline: 'none' }}
      className="relative flex items-center justify-center text-white outline-none focus:outline-none focus:ring-0 select-none z-10 whitespace-nowrap cursor-pointer group hover:opacity-85 transition-opacity"
      aria-label={isScrolled ? 'Writings of J (Click to scroll to top)' : "Jeeval's Space (Click for home)"}
      title={isScrolled ? 'Writings of J • Click to return to top' : "Jeeval's Space • Click for home"}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isScrolled ? (
          <motion.span
            key="writings"
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="inline-block font-['Caveat',cursive] normal-case text-2xl sm:text-3xl font-bold tracking-wide leading-none"
          >
            Writings of J
          </motion.span>
        ) : (
          <motion.span
            key="jeevals"
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="inline-block font-bold text-xs sm:text-base md:text-lg tracking-[0.16em] sm:tracking-[0.2em] uppercase font-sans"
          >
            Jeeval&apos;s Space
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};
