// components/TimelineSection.tsx
import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, Map } from "lucide-react";

const educationItems = [
  { 
    title: "Master of Computer Applications (MCA)", 
    institution: "Saintgits College of Engineering", 
    year: "Ongoing", 
    icon: "icons/sg.png",
    cardGradient: "from-red-500/30 to-white/5",
    hoverBorder: "hover:border-red-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.red.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-red-600/10 group-hover:to-red-600/5",
    iconBg: "group-hover:bg-red-600/20",
    badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
    topBorder: "from-red-500 to-transparent",
    dotColor: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
  },
  { 
    title: "Bachelor of Computer Applications (BCA)", 
    institution: "Saintgits College of Applied Sciences", 
    year: "2024", 
    icon: "icons/sg.png",
    cardGradient: "from-red-500/30 to-white/5",
    hoverBorder: "hover:border-red-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.red.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-red-600/10 group-hover:to-red-600/5",
    iconBg: "group-hover:bg-red-600/20",
    badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
    topBorder: "from-red-500 to-transparent",
    dotColor: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
  },
  { 
    title: "Higher Secondary - 12th", 
    institution: "BMM English Medium School, Kottayam", 
    year: "2021", 
    icon: "icons/bmm.jpg",
    cardGradient: "from-amber-700/30 to-white/5",
    hoverBorder: "hover:border-amber-700/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.amber.700)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-amber-800/10 group-hover:to-amber-800/5",
    iconBg: "group-hover:bg-amber-700/20",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    topBorder: "from-amber-700 to-transparent",
    dotColor: "bg-amber-700 shadow-[0_0_15px_rgba(180,83,9,0.6)]"
  },
  { 
    title: "Secondary School - 10th", 
    institution: "Delta English School, UAE", 
    year: "2019", 
    icon: "icons/delta.jpg",
    cardGradient: "from-blue-500/30 to-white/5",
    hoverBorder: "hover:border-blue-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.blue.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-blue-600/10 group-hover:to-blue-600/5",
    iconBg: "group-hover:bg-blue-600/20",
    badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    topBorder: "from-blue-500 to-transparent",
    dotColor: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
  },
];

const experienceItems = [
  { 
    title: "Founder & Full Stack Engineer", 
    institution: "J3 Labs", 
    year: "Jan 2026 - Present", 
    icon: "icons/logo.png",
    cardGradient: "from-neutral-400/30 to-white/5",
    hoverBorder: "hover:border-neutral-400/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.neutral.400)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-neutral-500/10 group-hover:to-neutral-500/5",
    iconBg: "group-hover:bg-neutral-400/20",
    badgeBg: "bg-neutral-400/10 text-neutral-300 border-neutral-400/20",
    topBorder: "from-neutral-400 to-transparent",
    dotColor: "bg-neutral-400 shadow-[0_0_15px_rgba(163,163,163,0.6)]"
  },
  { 
    title: "Project Trainee", 
    institution: "Spiderline Technologies", 
    year: "May 2026 - Jun 2026", 
    icon: "icons/spiderline.jpg",
    cardGradient: "from-blue-500/30 to-white/5",
    hoverBorder: "hover:border-blue-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.blue.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-blue-600/10 group-hover:to-blue-600/5",
    iconBg: "group-hover:bg-blue-600/20",
    badgeBg: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    topBorder: "from-blue-500 to-transparent",
    dotColor: "bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]"
  },
  { 
    title: "Software Engineer Intern", 
    institution: "Believers Church Medical College Hospital", 
    year: "Dec 2025", 
    icon: "icons/believers.png",
    cardGradient: "from-red-500/30 to-white/5",
    hoverBorder: "hover:border-red-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.red.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-red-600/10 group-hover:to-red-600/5",
    iconBg: "group-hover:bg-red-600/20",
    badgeBg: "bg-red-500/10 text-red-300 border-red-500/20",
    topBorder: "from-red-500 to-transparent",
    dotColor: "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]"
  },
  { 
    title: "Campus Lead", 
    institution: "MuLearn MGP", 
    year: "Feb 2026 - Present", 
    icon: "icons/mulearn.jpeg",
    cardGradient: "from-slate-400/30 to-white/5",
    hoverBorder: "hover:border-slate-400/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.slate.400)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-slate-500/10 group-hover:to-slate-500/5",
    iconBg: "group-hover:bg-slate-400/20",
    badgeBg: "bg-slate-400/10 text-slate-300 border-slate-400/20",
    topBorder: "from-slate-400 to-transparent",
    dotColor: "bg-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.6)]"
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const TimelineCard = ({ item, delay, type }: { item: any, delay: number, type: 'education' | 'experience' }) => (
  <motion.div
    className="relative pt-8 md:pt-0 md:pl-12"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={cardVariants}
    transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
  >
    {/* Connector Dot */}
    <div className={`absolute left-1/2 -translate-x-1/2 top-0 md:top-8 md:-left-[5px] md:translate-x-0 w-[14px] h-[14px] rounded-full border-2 border-black z-10 ${item.dotColor}`} />

    <div className={`relative group border border-white/10 backdrop-blur-[2px] p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(255,255,255,0.05)]
      hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] hover:bg-white/10
      bg-gradient-to-r ${item.cardGradient} ${item.hoverBorder}
      transition-all duration-500 ease-in-out transform hover:-translate-y-1 
      flex flex-col text-left overflow-hidden w-full`}
    >
      {/* Background Animated Gradient Glow */}
      <div className={`absolute -inset-[100%] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-3xl rounded-full ${item.glowColor}`} />
      
      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent ${item.hoverGlow} transition-all duration-700 ease-out rounded-2xl`} />
      
      {/* Shine Animation */}
      <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-transparent via-white/5 to-transparent 
        transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            <div className={`p-1.5 rounded-xl bg-white/5 transition-colors duration-500 shrink-0 flex items-center justify-center overflow-hidden w-14 h-14 ${item.iconBg}`}>
                 {item.icon ? (
                     <img src={`${import.meta.env.BASE_URL}${item.icon}`} alt={item.institution} className="w-full h-full object-contain rounded-lg" />
                 ) : type === 'education' ? (
                     <GraduationCap className="h-6 w-6 text-neutral-400 group-hover:text-blue-400 transition-colors duration-500" />
                 ) : (
                     <Briefcase className="h-6 w-6 text-neutral-400 group-hover:text-emerald-400 transition-colors duration-500" />
                 )}
            </div>
            <div className="pt-1 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white tracking-tight leading-tight">{item.title}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap w-fit ${item.badgeBg}`}>
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.year}
                  </span>
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">{item.institution}</p>
            </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const TimelineSection = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={(el) => {
        if (typeof ref === "function") ref(el);
        else if (ref && 'current' in ref) ref.current = el;
      }}
      id="education" 
      className="relative py-10 md:py-16 px-6 md:px-12 text-white overflow-hidden bg-black border-t border-neutral-900 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-20 relative">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-center flex items-center justify-center">
              My Timeline
          </h2>
          <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "120px" }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-1 bg-emerald-500 rounded-full mt-4"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 lg:gap-16">
            
            {/* EDUCATION COLUMN */}
            <div className="relative">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-12 md:ml-12">
                    <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <GraduationCap className="text-blue-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-[0.2em]">Education</h3>
                </div>
                {/* Connecting Line */}
                <div className="absolute top-16 bottom-0 left-1/2 md:left-[1px] -translate-x-1/2 md:translate-x-0 w-[2px] bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent" />
                
                <div className="flex flex-col gap-8">
                    {educationItems.map((item, idx) => (
                        <TimelineCard key={idx} item={item} delay={idx * 0.15} type="education" />
                    ))}
                </div>
            </div>

            {/* EXPERIENCE COLUMN */}
            <div className="relative">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-12 md:ml-12 mt-12 md:mt-0">
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                        <Briefcase className="text-emerald-500" size={24} />
                    </div>
                    <h3 className="text-xl font-bold uppercase tracking-[0.2em]">Experience</h3>
                </div>
                {/* Connecting Line */}
                <div className="absolute top-[160px] md:top-16 bottom-0 left-1/2 md:left-[1px] -translate-x-1/2 md:translate-x-0 w-[2px] bg-gradient-to-b from-emerald-500/50 via-white/10 to-transparent" />
                
                <div className="flex flex-col gap-8">
                    {experienceItems.map((item, idx) => (
                        <TimelineCard key={idx} item={item} delay={idx * 0.15} type="experience" />
                    ))}
                </div>
            </div>

        </div>
      </div>
    </section>
  );
});

export default TimelineSection;