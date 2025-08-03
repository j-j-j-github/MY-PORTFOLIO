import React, { forwardRef, useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap } from "lucide-react";

const timelineItems = [
  { title: "Secondary School - 10th", institution: "Delta English School, United Arab Emirates", year: "2019" },
  { title: "Higher Secondary - 12th", institution: "BMM English Medium School, Kottayam", year: "2021" },
  { title: "Bachelor of Computer Applications", institution: "Saintgits College of Applied Sciences", year: "2024" },
  { title: "Masters of Computer Applications", institution: "Saintgits College of Engineering", year: "Ongoing" },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

const TimelineCard = ({ item, delay }) => (
  <motion.div
    className="relative pt-8"
    initial="hidden"
    animate="visible"
    variants={cardVariants}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-lg border-2 border-white z-10" />

    <div className="relative group border border-white/10 bg-neutral-950 p-6 rounded-xl shadow-lg hover:shadow-2xl 
      transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] 
      flex flex-col items-center text-center overflow-hidden w-56 h-64"
    >
      {/* Hover-only effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 
        group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 
        transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-xl"
      />
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]"
      >
        <div className="bg-black/90 rounded-xl h-full w-full" />
      </div>
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent 
        transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center h-full">
        <GraduationCap className="h-12 w-12 text-indigo-400 mb-4 group-hover:text-white transition-colors duration-500" />
        <div className="flex flex-col flex-grow w-full">
          <h3 className="text-xl font-semibold mb-1 text-white">{item.title}</h3>
          <p className="text-gray-300 text-sm leading-tight flex-grow">{item.institution}</p>
          <span className="mt-4 text-xs text-indigo-300 font-mono tracking-wider">{item.year}</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const TimelineSection = forwardRef((_, ref) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (isInView) setTriggered(true);
  }, [isInView]);

  return (
    <motion.section
      ref={(el) => {
        containerRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      }}
      id="education"
      className="relative py-20 px-6 md:px-12 text-white"
      style={{
        backgroundImage: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 80%)",
      }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={triggered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-bold mb-16 text-center">My Education Journey</h2>
      <div className="relative max-w-6xl mx-auto">
        <div className="absolute top-[16px] left-4 right-4 h-[2px] bg-white/10" />
        <div className="relative flex justify-center items-start gap-x-8 flex-wrap min-h-[300px]">
          {timelineItems.map((item, idx) =>
            triggered ? (
              <TimelineCard key={item.title} item={item} delay={idx * 0.4} />
            ) : (
              <div key={item.title} className="pt-8 w-56 h-64" />
            )
          )}
        </div>
      </div>
    </motion.section>
  );
});

export default TimelineSection;