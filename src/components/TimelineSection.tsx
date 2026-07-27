import React, { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Clock, HelpCircle } from "lucide-react";

const timelineItems = [
  { 
    title: "Project Trainee", 
    institution: "Spiderline Technologies", 
    month: "MAY",
    yearNode: "2026",
    duration: "45 Days",
    icon: "icons/spiderline.jpg",
    cardGradient: "from-blue-500/20 to-white/5",
    hoverBorder: "hover:border-blue-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.blue.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-blue-600/10 group-hover:to-blue-600/5",
    iconBg: "group-hover:bg-blue-600/20",
    dateColor: "text-blue-400",
    branchLeft: "bg-gradient-to-r from-blue-500/80 to-transparent",
    branchRight: "bg-gradient-to-l from-blue-500/80 to-transparent",
    verticalLine: "bg-gradient-to-b from-transparent via-blue-500/80 to-transparent",
    details: `During my Summer Industry Immersion at Spiderline Technologies, I participated in Agile development to translate UI designs into clean, production-ready code.\n\nKey Contributions:\n• Diya Hero Modernization: Redesigned a legacy dealer website to maximize usability.\n• Corporate Interfaces: Architected responsive, multi-page layouts including structured flows for Accounts Hub.\n• UX Optimization: Implemented comprehensive registration forms with strict validation.`,
    
    // TWEAK THIS VALUE TO MOVE THE BOX UP OR DOWN:
    // Negative values (e.g. -150) move the box UP the timeline.
    // Positive values (e.g. 50) push the box DOWN.
    desktopOffsetPx: 0
  },
  { 
    title: "Campus Lead", 
    institution: "MuLearn MGP", 
    month: "FEB",
    yearNode: "2026",
    icon: "icons/mulearn.jpeg",
    cardGradient: "from-slate-400/20 to-white/5",
    hoverBorder: "hover:border-slate-400/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.slate.400)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-slate-500/10 group-hover:to-slate-500/5",
    iconBg: "group-hover:bg-slate-400/20",
    dateColor: "text-slate-300",
    branchLeft: "bg-gradient-to-r from-slate-400/80 to-transparent",
    branchRight: "bg-gradient-to-l from-slate-400/80 to-transparent",
    verticalLine: "bg-gradient-to-b from-transparent via-slate-400/80 to-transparent",
    details: `Campus Lead for µLearn at Saintgits College of Engineering, leading and scaling the Foundation’s initiatives across the campus to foster a culture of continuous learning, collaboration, and innovation. Responsible for planning and executing workshops, peer-learning programmes, industry connect sessions, technical events, and community-driven initiatives that help students develop practical skills beyond the classroom.

Actively mentor and coordinate student contributors across diverse domains, encouraging collaboration, knowledge sharing, and participation in real-world projects and learning opportunities. Serve as the primary liaison between the µLearn Foundation and campus leadership, ensuring effective communication and smooth execution of initiatives.`,
    
    // TWEAK THIS VALUE TO MOVE THE BOX UP OR DOWN:
    desktopOffsetPx: -390 
  },
  { 
    title: "Founder & Full Stack Engineer", 
    institution: "J3 Labs", 
    month: "JAN",
    yearNode: "2026",
    icon: "icons/logo.png",
    cardGradient: "from-white/20 to-white/5",
    hoverBorder: "hover:border-white/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.white)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-white/10 group-hover:to-white/5",
    iconBg: "group-hover:bg-white/20",
    dateColor: "text-white",
    branchLeft: "bg-gradient-to-r from-white/80 to-transparent",
    branchRight: "bg-gradient-to-l from-white/80 to-transparent",
    verticalLine: "bg-gradient-to-b from-transparent via-white/80 to-transparent",
    details: `Founded J3 Labs to design and deliver high-impact web and mobile software solutions. Lead end-to-end architecture, development, and product design with a focus on performance, usability, and scalable systems.\n\nKey Contributions:\n• Built and launched multiple production apps including ECHO (React), Daily Verse (Android/Kotlin), and Task Manager Team (ASP.NET Core).\n• Rapidly converted ideas into MVPs using modern stacks (React, C#, SQL), reducing development cycles.\n• Designed clean, minimalist UI/UX experiences that improved usability and user retention.\n• Owned full product lifecycle: ideation, design, development, deployment, and iteration.`,
    
    // TWEAK THIS VALUE TO MOVE THE BOX UP OR DOWN:
    desktopOffsetPx: -220
  },
  { 
    title: "Software Engineer Intern", 
    institution: "Believers Church Medical College Hospital", 
    month: "DEC",
    yearNode: "2025",
    duration: "29 Days",
    icon: "icons/believers.png",
    cardGradient: "from-red-500/20 to-white/5",
    hoverBorder: "hover:border-red-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.red.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-red-600/10 group-hover:to-red-600/5",
    iconBg: "group-hover:bg-red-600/20",
    dateColor: "text-red-400",
    branchLeft: "bg-gradient-to-r from-red-500/80 to-transparent",
    branchRight: "bg-gradient-to-l from-red-500/80 to-transparent",
    verticalLine: "bg-gradient-to-b from-transparent via-red-500/80 to-transparent",
    details: `During my internship, I analyzed the hospital's enterprise software ecosystem (including BeHive and HRMS) to understand large-scale data workflows and engineered a self-initiated task management solution.\n\nKey Contributions:\n• Developed "Task Manager Team" (TMT): A full-stack ASP.NET Core MVC app.\n• Proactive Monitoring: Built a "Smart Notification Engine".\n• Clinical UI: Collaborated on UI/UX for a Colposcopy reporting tool, implementing IFCPC 2011 standards.`,
    
    // TWEAK THIS VALUE TO MOVE THE BOX UP OR DOWN:
    desktopOffsetPx: -345
  },
  { 
    title: "Master of Computer Applications (MCA)", 
    institution: "Saintgits College of Engineering", 
    month: "JUL",
    yearNode: "2025",
    icon: "icons/sg.png",
    cardGradient: "bg-gradient-to-r from-blue-500/20 to-red-500/20",
    hoverBorder: "hover:border-purple-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.purple.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-blue-600/10 group-hover:to-red-600/5",
    iconBg: "group-hover:bg-purple-600/20",
    dateColor: "text-purple-400",
    branchLeft: "bg-gradient-to-r from-blue-500/80 to-transparent",
    branchRight: "bg-gradient-to-l from-blue-500/80 to-transparent",
    verticalLine: "bg-gradient-to-b from-transparent via-purple-500/80 to-transparent",
    type: 'education',
    details: `A 2-year intensive postgraduate program focusing on Advanced Software Engineering, Enterprise Solutions, and cutting-edge Computer Science domains.
    
    Activities: 
    Class Representative (S3)
Class Head Coordinator - Samyukta 9.0`,


    
    // TWEAK THIS VALUE TO MOVE THE BOX UP OR DOWN:
    desktopOffsetPx: -190
  },
  { 
    title: "Bachelor of Computer Applications (BCA)", 
    institution: "Saintgits College of Applied Sciences", 
    month: "NOV",
    yearNode: "2021",
    icon: "icons/sg.png",
    cardGradient: "bg-gradient-to-r from-blue-500/20 to-red-500/20",
    hoverBorder: "hover:border-purple-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.purple.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-blue-600/10 group-hover:to-red-600/5",
    iconBg: "group-hover:bg-purple-600/20",
    dateColor: "text-purple-400",
    branchLeft: "bg-gradient-to-r from-red-500/80 to-transparent",
    branchRight: "bg-gradient-to-l from-red-500/80 to-transparent",
    verticalLine: "bg-gradient-to-b from-transparent via-purple-500/80 to-transparent",
    type: 'education',
    details: `A 3-year intensive undergraduate program focused on Software Engineering with a strong foundation in modern computing technologies.
    
    Activities: 
    Event Host for Ventura College Fest.
Co-ordinator of GitsBlitz Fest.
Co-ordinator of CSI SCAS Student Association.`,
    
    // TWEAK THIS VALUE TO MOVE THE BOX UP OR DOWN:
    desktopOffsetPx: -215
  },
  { 
    title: "Higher Secondary - 12th", 
    institution: "BMM English Medium School, Kottayam", 
    month: "JUL",
    yearNode: "2021",
    icon: "icons/bmm.jpg",
    cardGradient: "from-amber-700/20 to-white/5",
    hoverBorder: "hover:border-amber-700/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.amber.700)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-amber-800/10 group-hover:to-amber-800/5",
    iconBg: "group-hover:bg-amber-700/20",
    dateColor: "text-amber-500",
    branchLeft: "bg-gradient-to-r from-amber-600/80 to-transparent",
    branchRight: "bg-gradient-to-l from-amber-600/80 to-transparent",
    verticalLine: "bg-gradient-to-b from-transparent via-amber-600/80 to-transparent",
    type: 'education',
    
    // TWEAK THIS VALUE TO MOVE THE BOX UP OR DOWN:
    desktopOffsetPx: -210
  },
  { 
    title: "Secondary School - 10th", 
    institution: "Delta English School, UAE", 
    month: "MAY",
    yearNode: "2019",
    icon: "icons/delta.jpg",
    cardGradient: "from-blue-500/20 to-white/5",
    hoverBorder: "hover:border-blue-500/40",
    glowColor: "bg-[radial-gradient(circle_at_center,theme(colors.blue.500)_0%,transparent_50%)]",
    hoverGlow: "group-hover:from-blue-600/10 group-hover:to-blue-600/5",
    iconBg: "group-hover:bg-blue-600/20",
    dateColor: "text-blue-400",
    branchLeft: "bg-gradient-to-r from-blue-500/80 to-transparent",
    branchRight: "bg-gradient-to-l from-blue-500/80 to-transparent",
    verticalLine: "bg-gradient-to-b from-transparent via-blue-500/80 to-transparent",
    type: 'education',
    
    // TWEAK THIS VALUE TO MOVE THE BOX UP OR DOWN:
    desktopOffsetPx: 25
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const TimelineCardContent = ({ item }: { item: any }) => {
  return (
      <div 
        className={`relative z-20 border border-white/5 backdrop-blur-[2px] rounded-2xl shadow-lg
        hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] bg-white/[0.02]
        ${item.cardGradient.includes('bg-gradient') ? item.cardGradient : `bg-gradient-to-b ${item.cardGradient}`} ${item.hoverBorder}
        transition-all duration-300 ease-in-out transform hover:-translate-y-1 
        flex flex-col text-left w-full p-5 md:p-7 overflow-hidden`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className={`absolute -inset-[100%] opacity-0 group-hover:opacity-20 transition-opacity duration-700 blur-3xl rounded-full ${item.glowColor}`} />
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent ${item.hoverGlow} transition-all duration-500 ease-out rounded-2xl`} />
        </div>

        <div className="relative z-10 flex flex-col w-full">
          {/* Header Row */}
          <div className="flex items-start gap-4 shrink-0 w-full">
              <div className={`p-2 rounded-xl bg-white/5 transition-colors duration-500 shrink-0 flex items-center justify-center overflow-hidden w-12 h-12 md:w-16 md:h-16 ${item.iconBg}`}>
                   {item.icon ? (
                       <img src={`${import.meta.env.BASE_URL}${item.icon}`} alt={item.institution} className="w-full h-full object-contain rounded-lg" />
                   ) : item.type === 'education' ? (
                       <GraduationCap className="h-6 w-6 text-neutral-400 group-hover:text-blue-400" />
                   ) : (
                       <Briefcase className="h-6 w-6 text-neutral-400 group-hover:text-emerald-400" />
                   )}
              </div>
              <div className="flex-1 pt-0.5 flex flex-col justify-start">
                <h3 className="text-base md:text-lg font-bold text-white tracking-tight leading-tight mb-1 pr-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed font-light">{item.institution}</p>
              </div>
          </div>
          
          {/* Fully Expanded Details Area */}
          {item.details && (
            <div className="border-t border-white/10 mt-5 pt-5 text-neutral-300 text-sm leading-relaxed font-light whitespace-pre-line">
              {item.duration && (
                <div className="mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded bg-white/5 border border-white/10 text-xs font-semibold text-neutral-400">
                    <Clock className="w-3 h-3 mr-1.5" />
                    Duration: {item.duration}
                  </span>
                </div>
              )}
              {item.details}
            </div>
          )}
        </div>
      </div>
  );
};

const TimelineSection = forwardRef<HTMLElement>((_, ref) => {
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const [showTimelineInfo, setShowTimelineInfo] = useState(false);

  return (
    <section
      ref={(el) => {
        if (typeof ref === "function") ref(el);
        else if (ref && 'current' in ref) ref.current = el;
      }}
      id="education" 
      className="relative py-16 md:py-24 text-white overflow-hidden bg-black border-t border-neutral-900 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]"
    >
      {/* Info Button */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 z-30 flex flex-row-reverse items-start">
        <button
          onClick={() => setShowTimelineInfo(!showTimelineInfo)}
          className="p-3 bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg rounded-full hover:bg-white/10 transition-all text-neutral-400 hover:text-white focus:outline-none"
          title="Timeline Info"
        >
          <HelpCircle className="w-6 h-6" />
        </button>

        {/* Pop up */}
        <AnimatePresence>
          {showTimelineInfo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 10 }}
              transition={{ duration: 0.2 }}
              className="mr-4 w-72 md:w-96 p-5 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] z-40 text-sm text-neutral-300 leading-relaxed text-left"
            >
              <p>
                <strong>Note:</strong> The month and year represented on the timeline indicates the start of the enrolled activity or work.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
        
        <div className="flex flex-col items-center justify-center mb-16 relative">
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
        
        <motion.div 
            animate={{ height: showFullTimeline ? "auto" : 900 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-full overflow-hidden"
        >
            
            <AnimatePresence>
                {!showFullTimeline && (
                   <motion.div 
                       initial={{ opacity: 1 }}
                       exit={{ opacity: 0 }}
                       transition={{ duration: 0.5 }}
                       className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-black via-black/90 to-transparent z-40 flex items-end justify-center pb-8 pointer-events-none"
                   >
                       <button 
                           onClick={() => setShowFullTimeline(true)}
                           className="pointer-events-auto px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold tracking-widest uppercase transition-all backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)] font-amanojaku text-sm"
                       >
                           Expand Timeline
                       </button>
                   </motion.div>
                )}
            </AnimatePresence>
            
            {/* Global Vertical Centered Line */}
            <div className="absolute left-[36px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-white/5 z-0 rounded-full" />
            
            <div className="flex flex-col w-full pb-8 pt-10">
                {timelineItems.map((item, idx) => {
                    const isLeft = idx % 2 === 0;
                    
                    return (
                        <motion.div 
                            key={`item-${idx}`}
                            id={`timeline-box-${idx}`}
                            className={`relative flex w-full mb-12 md:mb-12 justify-end md:justify-between items-start group`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={cardVariants}
                            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        >
                            {/* Inject explicit desktop-only margin based on the user-tweakable value */}
                            <style>{`
                                @media (min-width: 768px) {
                                    #timeline-box-${idx} {
                                        margin-top: ${item.desktopOffsetPx}px !important;
                                    }
                                }
                            `}</style>

                            {/* Glowing Vertical Segment */}
                            <div className={`absolute left-[36px] md:left-1/2 top-[-20px] bottom-[-20px] w-[2px] md:-translate-x-1/2 z-10 ${item.verticalLine}`} />
                            
                            {/* Mobile Branch Line */}
                            <div className={`md:hidden absolute top-[44px] -translate-y-1/2 left-[36px] w-[44px] h-[2px] z-20 ${item.branchRight}`} />
                            
                            {/* Desktop Branch Line */}
                            {isLeft ? (
                                <div className={`hidden md:block absolute top-[52px] -translate-y-1/2 right-[50%] w-[calc(5%+40px)] h-[2px] z-20 ${item.branchLeft}`} />
                            ) : (
                                <div className={`hidden md:block absolute top-[52px] -translate-y-1/2 left-[50%] w-[calc(5%+40px)] h-[2px] z-20 ${item.branchRight}`} />
                            )}
                            
                            {/* Desktop Left Side */}
                            {isLeft ? (
                                <div className="hidden md:block w-[45%] pr-10">
                                   <TimelineCardContent item={item} />
                                </div>
                            ) : (
                                <div className="hidden md:block w-[45%]" />
                            )}
                        
                            {/* Centered Date Node */}
                            <div className="absolute left-[36px] md:left-1/2 top-[44px] md:top-[52px] -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center py-2 bg-black/60 backdrop-blur-md rounded-xl px-4 border border-white/5 shadow-[0_0_20px_rgba(0,0,0,0.8)] min-w-[80px]">
                                <span className={`font-black text-white text-[1.4rem] leading-none tracking-wider whitespace-nowrap drop-shadow-md`}>{item.month}</span>
                                <span className={`text-neutral-300 font-black text-sm mt-1 whitespace-nowrap tracking-wider drop-shadow-md ${item.dateColor}`}>{item.yearNode}</span>
                            </div>
                        
                            {/* Desktop Right Side / Mobile Card */}
                            {!isLeft ? (
                                <div className="w-[calc(100%-80px)] md:w-[45%] pl-0 md:pl-10">
                                    <TimelineCardContent item={item} />
                                </div>
                            ) : (
                                <div className="w-[calc(100%-80px)] md:hidden pl-0">
                                    <TimelineCardContent item={item} />
                                </div>
                            )}
                        </motion.div>
                    )
                })}
                
                <AnimatePresence>
                    {showFullTimeline && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mt-16 flex justify-center relative z-20"
                        >
                            <button
                                onClick={() => {
                                    setShowFullTimeline(false);
                                    // Scroll slightly up to see the top of the timeline smoothly
                                    const el = document.getElementById("education");
                                    if (el) {
                                        const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }}
                                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold tracking-widest uppercase transition-all backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.05)] font-amanojaku text-sm"
                            >
                                Shrink Timeline
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
      </div>
    </section>
  );
});

export default TimelineSection;
