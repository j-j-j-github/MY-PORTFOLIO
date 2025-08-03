import React from "react";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const timelineItems = [
  { title: "10th Grade", institution: "DES, United Arab Emirates", year: "2019" },
  { title: "12th Grade", institution: "BMM English Medium School", year: "2021" },
  { title: "BCA", institution: "Saintgits College of Applied Sciences", year: "2024" },
  { title: "MCA", institution: "Saintgits College of Engineering", year: "Ongoing" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

const TimelineCard = ({ item, variants, transition }) => (
  <div className="relative pt-8">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full shadow-lg border-2 border-white z-10" />
    <motion.div
      className="relative group bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] flex flex-col items-center text-center overflow-hidden w-56 h-64"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={variants}
      transition={transition}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-xl"></div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]">
        <div className="bg-black/90 rounded-xl h-full w-full"></div>
      </div>
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      <div className="relative z-10 flex flex-col items-center text-center h-full">
        <GraduationCap className="h-12 w-12 text-indigo-400 mb-4 group-hover:text-white transition-colors duration-500" />
        <div className="flex flex-col flex-grow w-full">
            <h3 className="text-xl font-semibold mb-1 text-white">{item.title}</h3>
            <p className="text-gray-300 text-sm leading-tight flex-grow">{item.institution}</p>
            <span className="mt-4 text-xs text-indigo-300 font-mono tracking-wider">{item.year}</span>
        </div>
      </div>
    </motion.div>
  </div>
);

const TimelineSection = () => (
  <section
    id="timeline"
    className="relative py-20 px-6 md:px-12 text-white"
    // THIS STYLE CREATES THE DIMMED VIGNETTE EFFECT
    style={{
      backgroundImage: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 80%)'
    }}
  >
    <h2 className="text-4xl font-bold mb-16 text-center">
      My Education Journey
    </h2>
    <div className="relative max-w-6xl mx-auto">
      <div className="absolute top-[16px] left-4 right-4 h-[2px] bg-white/10" />
      <div className="relative flex justify-center items-start gap-x-8 flex-wrap">
        {timelineItems.map((item, idx) => (
          <TimelineCard 
            key={idx} 
            item={item} 
            variants={cardVariants}
            transition={{ duration: 0.5, delay: idx * 0.11 }} 
          />
        ))}
      </div>
    </div>
  </section>
);

export default TimelineSection;