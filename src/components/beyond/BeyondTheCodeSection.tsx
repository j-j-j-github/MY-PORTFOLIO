import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from '../../context/RouterContext';

interface InterestCardData {
  id: string;
  title: string;
  subtitle: string;
  destination: string;
  image: string;
}

const interests: InterestCardData[] = [
  {
    id: 'watches',
    title: 'Objects & Time',
    subtitle: 'A growing collection of watches and the stories behind them.',
    destination: '/watches',
    image: `${import.meta.env.BASE_URL}beyondcode/watches.jpg`,
  },
  {
    id: 'photography',
    title: 'Frames',
    subtitle: 'Everyday moments, interesting light, and perspectives worth keeping.',
    destination: '/photography',
    image: `${import.meta.env.BASE_URL}beyondcode/photo.jpg`,
  },
  {
    id: 'poetry',
    title: 'Writings of J',
    subtitle: 'Poems, thoughts, and words that deserve a little space.',
    destination: '/writingsofj',
    image: `${import.meta.env.BASE_URL}beyondcode/poem.jpg`,
  },
];

interface BeyondTheCodeSectionProps {
  sectionRef?: (el: HTMLElement | null) => void;
}

export const BeyondTheCodeSection: React.FC<BeyondTheCodeSectionProps> = ({ sectionRef }) => {
  const { navigate } = useRouter();

  const handleCardClick = (destination: string) => {
    sessionStorage.setItem('returnSection', 'beyondcode');
    navigate(destination);
  };

  return (
    <section
      id="beyondcode"
      ref={sectionRef}
      className="scroll-mt-20 py-16 md:py-24 px-6 md:px-12 bg-white text-black border-t border-neutral-200 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] relative"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col items-center justify-center mb-14 md:mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase flex items-center justify-center"
          >
            BEYOND CODE
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-1 bg-blue-600 rounded-full mt-4"
          />

          <p className="max-w-2xl text-neutral-600 font-light text-base md:text-lg leading-relaxed mt-6">
            A little about what I enjoy when I am not building software: the objects I collect, the moments I capture, and the words I write.
          </p>
        </div>

        {/* Three Full-Bleed Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={() => handleCardClick(interest.destination)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(interest.destination);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`Explore ${interest.title}`}
              className="group relative h-[460px] md:h-[500px] rounded-3xl overflow-hidden border border-neutral-300 shadow-[0_12px_36px_rgba(0,0,0,0.14)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.28)] hover:border-blue-500/50 hover:-translate-y-2 transition-all duration-500 cursor-pointer focus:outline-none select-none bg-neutral-900"
            >
              {/* Full-bleed Background Image (Top remains 100% bright and undimmed) */}
              <img
                src={interest.image}
                alt={interest.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Bottom gradient overlay only (for text readability, top remains undimmed) */}
              <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

              {/* Bottom Text Content */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end z-10 pointer-events-none">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-[0.16em] text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {interest.title}
                </h3>

                <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light mb-5">
                  {interest.subtitle}
                </p>

                <div className="flex items-center text-xs font-bold uppercase tracking-wider text-blue-400 group-hover:text-blue-300 transition-colors">
                  <span>Explore Archive</span>
                  <span className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300 text-sm">
                    &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
