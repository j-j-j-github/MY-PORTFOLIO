// components/TimelineSection.tsx
import React, { forwardRef, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const timelineItems = [
  { title: "Secondary School - 10th", institution: "Delta English School, UAE", year: "2019" },
  { title: "Higher Secondary - 12th", institution: "BMM English Medium, Kottayam", year: "2021" },
  { title: "Bachelor of Computer Applications", institution: "Saintgits College of Applied Sciences", year: "2024" },
  { title: "Masters of Computer Applications", institution: "Saintgits College of Engineering", year: "Ongoing" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const TimelineCard = ({ item, delay }: { item: any, delay: number }) => (
  <motion.div
    className="relative pt-10" // Added padding top to make room for the connector dot
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {/* Connector Dot - Electric Blue with Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)] border-[3px] border-black z-10" />

    <div className="relative group border border-white/5 bg-neutral-900/40 backdrop-blur-xl p-6 rounded-2xl shadow-lg 
      hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] hover:border-blue-500/30
      transition-all duration-500 ease-in-out transform hover:-translate-y-2 
      flex flex-col items-center text-center overflow-hidden w-64 h-72 mx-2"
    >
      {/* Hover Glow Effect (Blue) */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/0 
        group-hover:from-blue-600/5 group-hover:to-blue-600/10 
        transition-all duration-700 ease-out rounded-2xl"
      />
      
      {/* Shine Animation */}
      <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-transparent via-white/5 to-transparent 
        transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center h-full w-full">
        <div className="p-3 mb-4 rounded-full bg-white/5 group-hover:bg-blue-600/20 transition-colors duration-500">
             <GraduationCap className="h-8 w-8 text-neutral-400 group-hover:text-blue-400 transition-colors duration-500" />
        </div>
        
        <div className="flex flex-col flex-grow w-full justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{item.title}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">{item.institution}</p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 w-full flex justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                <Calendar className="w-3 h-3 mr-1.5" />
                {item.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const TimelineSection = forwardRef<HTMLElement>((_, ref) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isInView) setTriggered(true);
  }, [isInView]);

  return (
    <motion.section
      ref={(el) => {
        containerRef.current = el;
        // Handle both function and object refs for compatibility
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      id="education"
      className="relative py-24 px-6 md:px-12 text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={triggered ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-20 text-center tracking-tighter flex items-center justify-center">
        <GraduationCap className="mr-3 text-blue-500" size={40} /> Education Journey
      </h2>
      
      <div className="relative max-w-7xl mx-auto">
        {/* The Connecting Line */}
        <div className="absolute top-[18px] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="relative flex justify-center items-start flex-wrap gap-8 lg:gap-4 xl:gap-8 min-h-[350px]">
          {timelineItems.map((item, idx) =>
            triggered ? (
              <TimelineCard key={item.title} item={item} delay={idx * 0.2} />
            ) : (
              // Invisible placeholder to prevent layout shifts before animation
              <div key={item.title} className="w-64 h-72 mx-2 opacity-0" />
            )
          )}
        </div>
      </div>
    </motion.section>
  );
});

export default TimelineSection;