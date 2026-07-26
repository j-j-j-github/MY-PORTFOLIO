// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import TimelineSection from "./components/TimelineSection";
import { Github, Linkedin, Mail, Code, Briefcase, User, Star, ChevronDown, ChevronUp, ArrowRight, Rocket, Download, Layout, Server, Smartphone, HelpCircle } from 'lucide-react';
import NavItem from './components/NavItem';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const featuredMedia = [
  { title: "μLearn Orientation", image: "https://media.licdn.com/dms/image/v2/D4D2DAQGibW0FUflhRA/profile-treasury-image-shrink_1280_1280/B4DZ97CtWtJAAY-/0/1784475735789?e=1785600000&v=beta&t=W3Q79EFCCqJb9TSShP3Hxgo2TqDfbWkeg2boni2kYVg" },
  { title: "Spiderline", image: "https://media.licdn.com/dms/image/v2/D5622AQEl1UhorEiO8Q/feedshare-image-high-res/B56Z8ea8oSKUAY-/0/1782921809524?e=1786579200&v=beta&t=iWJERMuukZlQYWONyB-5kYETZUGO8-eMz5c4sWFdxas" },
  { title: "Anchoring Team", image: "https://media.licdn.com/dms/image/v2/D4E2DAQEdYBRQdfKpYg/profile-treasury-image-shrink_800_800/B4EZmI9uWYIoAc-/0/1758939512800?e=1785600000&v=beta&t=oRb2Gc3BKaGavroLVyQE0nmxoT4rjuiCfF082nmjigw" },
  { title: "MuMent Meet", image: "https://media.licdn.com/dms/image/v2/D5622AQGYXjrjg8SYtA/feedshare-image-high-res/B56Z1CWgH8KsAY-/0/1774934688743?e=1786579200&v=beta&t=YtPqIT2e127dlqtmeuxHCHks5FOZiu7UBr0yB_j81fo" },
  { title: "The Voice", image: "https://media.licdn.com/dms/image/v2/D562DAQH0baR4CcUzoA/profile-treasury-image-shrink_1280_1280/B56Z2pnBRdH4AQ-/0/1776667075792?e=1785600000&v=beta&t=1YYh7Y8tXo-q1F3mXkINzRz86yQFFd9-QrDe716rAKs" },
  { title: "BCMCH", image: "https://media.licdn.com/dms/image/v2/D5622AQGYdK8DHgwibg/feedshare-image-high-res/B56ZsNmPwsHYAs-/0/1765459698549?e=1786579200&v=beta&t=IDc-azIl0RB_LcqmvOkLL2eABRiKrm75-mDvt1uzt84" },
  { title: "Class of MCA", image: "https://media.licdn.com/dms/image/v2/D4E2DAQHPnUv_UXOoiA/profile-treasury-image-shrink_1280_1280/B4EZmeJE8AKQAQ-/0/1759294829879?e=1785600000&v=beta&t=d7GhCKiST-EQPhDBqnyNmzvQWx0UJkCIcahP_WbaDZ0" },
  { title: "GitzBlitz", image: "https://media.licdn.com/dms/image/v2/D4E2DAQGW5v_7bzqEtQ/profile-treasury-image-shrink_800_800/B4EZgO_4mQHoAY-/0/1752598286471?e=1785600000&v=beta&t=xAF0Eks5vtnnmazNOG7uOsMmdCu7AF0Rxp_CQ6w9Bao" },
  { title: "Class of BCA", image: "https://media.licdn.com/dms/image/v2/D4E2DAQHb52ECG110YQ/profile-treasury-image-shrink_800_800/B4EZmeH2izHIAY-/0/1759294492879?e=1785600000&v=beta&t=8jkAIOJ-WGZkVFB5MQP___Itgz4Ql50dywapNpAdLHs" },
  { title: "Convocation", image: "https://media.licdn.com/dms/image/v2/D4E2DAQFWokjGMnvLPg/profile-treasury-image-shrink_800_800/B4EZgJ4lWrGoAg-/0/1752512489393?e=1785600000&v=beta&t=IClturz9s0p-rTb0Uua2eAjhZ7XBmlGiNGeYic-8VoU" }
];

// --- HELPER: CONSISTENT TAG COLORS ---
// This ensures "React" is always one color, "Python" is always another, etc.
const getTagColor = (tag: string) => {
  const colors = [
    'bg-blue-500/10 text-blue-300 border-blue-500/20',
    'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    'bg-violet-500/10 text-violet-300 border-violet-500/20',
    'bg-amber-500/10 text-amber-300 border-amber-500/20',
    'bg-rose-500/10 text-rose-300 border-rose-500/20',
    'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20',
  ];

  // Simple hash function to map string to index
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

const Logo = ({ onClick }: { onClick: () => void }) => {
  const [spinning, setSpinning] = React.useState(false);

  return (
    <button
      onClick={onClick}
      className="group flex items-center focus:outline-none mr-8"
      aria-label="Home"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      onMouseEnter={() => setSpinning(true)}
      onAnimationEnd={() => setSpinning(false)}
    >
      <img
        src={`${import.meta.env.BASE_URL}logomain.png`}
        alt="Logo"
        className={`h-10 w-10 md:h-12 md:w-12 object-contain transition-transform duration-500 ease-out ${spinning ? 'animate-logo-spin' : 'group-hover:scale-105'}`}
        draggable={false}
      />
    </button>
  );
};

const Button = ({ children, primary, onClick }: { children: React.ReactNode; primary?: boolean; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`group px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center justify-center transition-all duration-500 ease-out focus:outline-none w-full sm:w-auto ${
        primary 
          ? 'bg-black text-white hover:bg-blue-600 hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 border border-black hover:border-blue-600' 
          : 'bg-transparent text-black border border-neutral-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 hover:shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1'
      }`}
    >
      {children}
    </button>
  );
};

// Skill Card: Dark Glass, Subtle Glow
const SkillCard = ({ icon: Icon, name }: { icon: React.ComponentType<any>; name: string }) => (
  <div className="relative group bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl transition-all duration-500 ease-out hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)] flex flex-col items-center text-center">
    <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:bg-blue-600/20 transition-colors duration-500">
      <Icon className="h-8 w-8 text-neutral-400 group-hover:text-blue-400 transition-colors duration-500" />
    </div>
    <h3 className="text-lg font-medium text-neutral-200 group-hover:text-white transition-colors duration-500 tracking-wide">{name}</h3>
  </div>
);

// Project Card: Modern B&W base with Colorful Tags
const ProjectCard = ({ project }: { project: { title: string; description: string; image: string; tags: string[]; link: string; overlayText?: string; isInternship?: boolean } }) => (
  <div className="flex flex-col h-full group bg-white/5 backdrop-blur-[2px] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] hover:shadow-2xl">
    <div className="relative w-full h-64 overflow-hidden bg-neutral-950">
      <img
        src={project.image}
        alt={project.title}
        className={`w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-90 group-hover:opacity-100 ${project.overlayText ? 'brightness-50 grayscale-[30%]' : ''}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = `https://placehold.co/600x400/171717/404040?text=${encodeURIComponent(project.title)}`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

      {project.overlayText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-white font-bold tracking-widest text-sm border border-white/10 shadow-2xl shadow-black/50 uppercase">
            {project.overlayText}
          </span>
        </div>
      )}
      {project.isInternship && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-md rounded-full text-white font-semibold text-xs border border-blue-400/30 shadow-lg flex items-center gap-1.5">
            <Briefcase size={12} /> Internship Project
          </span>
        </div>
      )}
    </div>

    <div className="p-8 flex flex-col flex-grow relative">
      <h3 className="text-base md:text-lg font-bold uppercase tracking-[0.2em] text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
      <p className="text-neutral-400 text-base leading-relaxed mb-6 font-light">{project.description}</p>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.map((tag, index) => (
            <span key={index} className={`px-2.5 py-0.5 text-[11px] font-medium rounded-full border ${getTagColor(tag)}`}>
              {tag}
            </span>
          ))}
        </div>

        {project.link === '#' || project.overlayText === 'Launching Soon' ? (
          <span className="inline-flex items-center text-sm font-semibold text-neutral-500 cursor-not-allowed">
            Under Development
          </span>
        ) : (
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-white hover:text-blue-400 transition-colors">
            {project.link.includes('play.google.com') ? 'View on Play Store' : 'View Project'} <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        )}
      </div>
    </div>
  </div>
);

const SocialLink = ({ icon: Icon, href, label }: { icon: React.ComponentType<any>; href: string; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
    <div className="p-3 rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
      <Icon className="h-6 w-6 text-neutral-400 group-hover:text-white transition-colors duration-300" />
    </div>
    <span className="text-xs font-medium text-neutral-500 mt-2 group-hover:text-neutral-300 transition-colors">{label}</span>
  </a>
);

// --- MAIN APP COMPONENT ---

const HeroHoverText = ({ style }: { style?: any }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <motion.h1 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={style}
      className="relative text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] font-black text-black leading-[0.95] tracking-tighter mb-6 md:mb-8 w-fit"
    >
      {/* Base Text (Always visible beneath) */}
      <span>Full-Stack</span><br />
      <span className="text-neutral-300">Developer.</span>

      {/* Spotlight Colored Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          backgroundImage: `linear-gradient(to bottom, #0066ff 10%, #00e676 90%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          WebkitMaskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black, transparent 80%)`,
          maskImage: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, black, transparent 80%)`
        }}
        aria-hidden="true"
      >
        <span>Full-Stack</span><br />
        <span>Developer.</span>
      </div>
    </motion.h1>
  );
};

const App = () => {
  const { scrollY } = useScroll();
  const textScale = useTransform(scrollY, [0, 600], [1, 3.5]);
  const textX = useTransform(scrollY, [0, 600], [0, 150]);
  const textY = useTransform(scrollY, [0, 600], [0, -100]);
  const textOpacity = useTransform(scrollY, [0, 400, 600], [1, 0.8, 0]);

  const [activeSection, setActiveSection] = useState('hero');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [showSkillInfo, setShowSkillInfo] = useState(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const navRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const navContainerEl = navRef.current;
    const activeLinkEl = linkRefs.current[activeSection];

    if (navContainerEl && activeLinkEl) {
      const scrollPosition = activeLinkEl.offsetLeft - (navContainerEl.offsetWidth / 2) + (activeLinkEl.offsetWidth / 2);
      navContainerEl.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  const navItemsData = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Timeline' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const skills = [
    { name: 'React.js', icon: Star },
    { name: 'Kotlin', icon: Code },
    { name: 'JavaScript', icon: Code },
    { name: 'Python', icon: Code },
    { name: 'Tailwind CSS', icon: Star },
    { name: 'Firebase', icon: Star },
    { name: 'C++', icon: Code },
    { name: 'SQL', icon: Code },
  ];

  const projects = [
    {
      title: 'Renewly',
      description: 'Smart subscription tracker managing all your recurring expenses in one place. Never miss a renewal again.',
      image: 'renewly.jpeg',
      tags: ['Android', 'Kotlin', 'Room', 'AlarmManager'],
      link: '#',
      overlayText: 'Launching Soon'
    },
    {
      title: 'ECHO - Seek the Silence',
      description: 'Minimalist, ephemeral social app for sharing anonymous thoughts into a living void. Features real-time presence.',
      image: 'echo.png',
      tags: ['Jetpack Compose', 'Supabase', 'Firebase FCM', 'WorkManager', 'Room DB'],
      link: 'https://play.google.com/store/apps/details?id=com.j3labs.echo',
    },
    {
      title: 'Daily Verse - Android App',
      description: 'Offline-first daily devotion app with a synchronized widget, background scheduling, and custom OLED dark mode.',
      image: 'dailyverse.jpg',
      tags: ['Kotlin', 'Android SDK', 'WorkManager', 'AppWidgets', 'Material Design 3', 'JSON'],
      link: 'https://play.google.com/store/apps/details?id=com.j3labs.dailyverse',
    },
    {
      title: 'Diya Hero Website Redesign',
      description: 'Modernized dealership website featuring a responsive UI, auto-sliding hero banner, and dynamic vehicle showcase.',
      image: 'Internship Projects/diya.png',
      tags: ['HTML5', 'CSS3', 'Responsive Design', 'Embedded Media', 'UI/UX'],
      link: '#',
      isInternship: true
    },
    {
      title: 'Accounts Hub Website Design',
      description: 'Structured financial services website crafted from scratch. Optimized complex layouts to drive lead generation.',
      image: 'Internship Projects/accounts.png',
      tags: ['HTML5', 'CSS3', 'Web Architecture', 'Responsive Design'],
      link: '#',
      isInternship: true
    },
    {
      title: 'Terresteel Website Design',
      description: 'Industrial manufacturing website featuring modular front-end architecture, responsive galleries, and clear navigation.',
      image: 'Internship Projects/terresteel.png',
      tags: ['HTML5', 'CSS3', 'Modular Design', 'Responsive UI'],
      link: '#',
      isInternship: true
    },
    {
      title: 'TMT - Task Manager Team',
      description: 'Robust full-stack task tracking app featuring real-time AJAX operations, dynamic user assignment, and secure search.',
      image: 'taskmanager.jpg',
      tags: ['ASP.NET Core', 'C#', 'Entity Framework', 'SQLite', 'AJAX', 'Bootstrap 5'],
      link: 'https://github.com/j-j-j-github/TASKMANAGER',
      isInternship: true
    },
    {
      title: 'ISS Sensory Lab',
      description: 'Interactive web experience simulating astronaut training. Features a realistic Cupola view and a 2D Space EVA game.',
      image: 'iss.jpg',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Canvas', 'Physics Simulation'],
      link: 'https://j-j-j-github.github.io/ISS-SENSORY-LAB/',
    },
    {
      title: 'JBlog Platform',
      description: 'Full-stack blogging platform supporting secure authentication, dynamic profile management, and intuitive post editing.',
      image: 'jblog.jpg',
      tags: ['Django', 'Python', 'SQLite', 'HTML/CSS', 'User Authentication', 'CKEditor'],
      link: 'https://github.com/j-j-j-github/JBLOG',
    },
    {
      title: 'Auto Motors',
      description: 'Online marketplace for new and used vehicles. Features advanced search filters, detailed listings, and dashboards.',
      image: 'automotors.jpg',
      tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery'],
      link: 'https://github.com/j-j-j-github/AUTO-MOTORS',
    },
    {
      title: 'Bus Reservation Website',
      description: 'Comprehensive bus booking platform featuring interactive seat layouts, route searching, and a secure payment system.',
      image: 'busbooking.jpg',
      tags: ['Python', 'Django', 'MySQL', 'JavaScript', 'HTML/CSS'],
      link: 'https://github.com/j-j-j-github/BUS-RESERVATION-WEBSITE',
    },
  ];

  return (
    <div className="min-h-screen font-sans antialiased bg-black text-white selection:bg-blue-500/30 selection:text-blue-100">

      {/* CSS Override for the Timeline Component to fix the colors */}
      <style>{`
        .vertical-timeline-element-content { background: rgba(23, 23, 23, 0.4) !important; color: #fff !important; box-shadow: none !important; border: 1px solid rgba(255,255,255,0.05); border-radius: 1.5rem !important; backdrop-filter: blur(12px); }
        .vertical-timeline-element-content-arrow { border-right: 7px solid rgba(255,255,255,0.05) !important; }
        .vertical-timeline-element-icon { box-shadow: 0 0 0 4px #000, inset 0 0 10px rgba(0,0,0,0.2) !important; background: #0a0a0a !important; color: #3b82f6 !important; }
        .vertical-timeline::before { background: #262626 !important; }
        .vertical-timeline-element-date { opacity: 0.6; font-weight: 500; }
      `}</style>

      {/* Navigation (Original)
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/5 px-4 py-4 md:px-12 flex items-center">
        <div className="flex-shrink-0">
          <Logo onClick={() => scrollToSection('hero')} />
        </div>
        
        <div ref={navRef} className="flex-grow flex justify-start md:justify-center overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex space-x-2 md:space-x-4 p-1">
            {navItemsData.map(item => (
                <NavItem 
                    key={item.id}
                    ref={(el: HTMLDivElement | null) => { linkRefs.current[item.id] = el; }}
                    id={item.id}
                    label={item.label}
                    active={activeSection === item.id}
                    onClick={scrollToSection}
                />
            ))}
          </div>
        </div>
      </nav>
      */}

      {/* Navigation (New: Text Logo, Left-Aligned Navbar) */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[76px] bg-black/70 backdrop-blur-xl border-b border-white/5 px-4 md:px-12 flex items-center">
        <div className="flex-shrink-0 mr-4 md:mr-8">
          <button
            onClick={() => scrollToSection('hero')}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            className="font-bold text-lg md:text-xl tracking-[0.2em] text-white transition-colors duration-300 focus:outline-none uppercase flex items-center"
          >
            <span className={`transition-all duration-500 ease-in-out ${isLogoHovered || activeSection !== 'hero' ? 'md:mr-0 mr-3' : 'mr-3'}`}>J</span>
            <span className={`overflow-hidden transition-all duration-500 ease-in-out ${isLogoHovered || activeSection !== 'hero' ? 'md:max-w-[100px] md:opacity-100 max-w-0 opacity-0' : 'max-w-0 opacity-0'}`}>EEVAL&nbsp;</span>
            <span className={`transition-all duration-500 ease-in-out ${isLogoHovered || activeSection !== 'hero' ? 'md:mr-0 mr-3' : 'mr-3'}`}>J</span>
            <span className={`overflow-hidden transition-all duration-500 ease-in-out ${isLogoHovered || activeSection !== 'hero' ? 'md:max-w-[100px] md:opacity-100 max-w-0 opacity-0' : 'max-w-0 opacity-0'}`}>OLLY&nbsp;</span>
            <span>J</span>
            <span className={`overflow-hidden transition-all duration-500 ease-in-out ${isLogoHovered || activeSection !== 'hero' ? 'md:max-w-[100px] md:opacity-100 max-w-0 opacity-0' : 'max-w-0 opacity-0'}`}>ACOB</span>
          </button>
        </div>

        <div className="flex-grow relative flex overflow-hidden">
          <div ref={navRef} className="w-full flex justify-start md:justify-end overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] nav-fade-mask">
            <div className="flex space-x-2 md:space-x-4 p-1 relative w-max md:w-auto">
              {navItemsData.map(item => (
                <NavItem
                  key={item.id}
                  ref={(el: HTMLDivElement | null) => { linkRefs.current[item.id] = el; }}
                  id={item.id}
                  label={item.label}
                  active={activeSection === item.id}
                  onClick={scrollToSection}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div>
        {/* HERO SECTION (Split Layout) */}
        <section id="hero" ref={(el) => { sectionsRef.current[0] = el; }} className="relative flex flex-col justify-center md:flex-row md:items-center min-h-[100vh] bg-transparent overflow-hidden pt-20 md:pt-24 pb-12 md:pb-0">
          {/* Background Image bounded to exactly below topbar */}
          <div className="absolute inset-x-0 bottom-0 top-[76px] z-0 bg-white">
             <img src="hero.png" alt="Hero Background" className="hidden md:block w-full h-full object-contain object-[left_center] translate-x-8 md:translate-x-12 transition-transform" />
          </div>

          {/* Right Aligned Text Content */}
          <div className="relative z-20 w-full max-w-7xl mx-auto flex justify-center md:justify-end px-6 lg:px-16 pointer-events-none py-10 md:py-20">
            <div className="w-full md:w-1/2 flex justify-center md:justify-start pointer-events-auto mt-[4vh] md:mt-0">
              
              <div className="flex flex-col items-center md:items-start text-center md:text-left w-full max-w-lg xl:max-w-xl animate-fade-in-up">
                
                {/* Overline Status Text */}
                <div className="flex items-center gap-3 mb-6 md:mb-8 text-neutral-500 font-bold uppercase tracking-[0.2em] text-xs sm:text-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Jeeval's Space
                </div>
                
                {/* Massive Headline (Interactive & Scroll Animated) */}
                <HeroHoverText style={{ scale: textScale, x: textX, y: textY, opacity: textOpacity }} />
                
                {/* Clean Description */}
                <p className="text-base sm:text-lg md:text-xl text-neutral-500 font-light max-w-full leading-relaxed mb-8 md:mb-12">
                  Engineering high-performance web and mobile applications from the ground up. Driven by clean code and scalable architecture, I turn complex technical challenges into seamless user experiences.
                </p>
                
                {/* Minimalist Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center md:justify-start">
                  <Button primary={true} onClick={() => scrollToSection('projects')}>
                    View My Work <ArrowRight className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                  <Button primary={false} onClick={() => scrollToSection('contact')}>
                    Get In Touch
                  </Button>
                </div>

              </div>

            </div>
          </div>

          {/* Foreground Cutout Layer (z-30) for Depth Effect */}
          <div className="hidden md:block absolute inset-x-0 bottom-0 top-[76px] z-30 pointer-events-none">
             <img src="hero overlay.png" alt="Hero Overlay" className="w-full h-full object-contain object-[left_center] translate-x-8 md:translate-x-12 transition-transform" />
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto cursor-pointer" onClick={() => scrollToSection('about')}>
            <div className="p-4 rounded-full border border-neutral-200 bg-white/50 backdrop-blur-md text-neutral-400 hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm hover:shadow-lg animate-bounce">
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={(el) => { sectionsRef.current[1] = el; }} className="pb-10 md:pb-16 pt-0 bg-white text-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">

          {/* Edge-to-Edge Banner Image with Overlay Heading */}
          <div className="relative w-full mb-12 md:mb-16 flex items-center justify-center bg-white">
            <img src="banner.jpg" alt="About Banner" className="w-full h-48 md:h-80 object-cover shadow-md border-y border-neutral-200 opacity-30" />

            {/* Overlay Centered Heading */}
            <div className="absolute inset-0 flex flex-col items-center justify-center w-full px-8 z-10">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center justify-center text-black">
                About Me
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "120px" }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-1.5 bg-blue-600 rounded-full mt-6"
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 px-8 items-center">

            {/* 1. Profile Picture (Left) */}
            <div className="flex justify-center lg:justify-start lg:col-span-3">
              <div className="flip-container w-64 h-64 md:w-72 md:h-72 flex-shrink-0 group">
                <div className="flip-inner">
                  <div className="flip-front rounded-full overflow-hidden shadow-2xl">
                    <img src="front.jpg" alt="Front" className="w-full h-full object-cover rounded-full aspect-square" />
                  </div>
                  <div className="flip-back rounded-full overflow-hidden shadow-2xl">
                    <img src="back.jpg" alt="Back" className="w-full h-full object-cover rounded-full aspect-square" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Description (Center) */}
            <div className="text-left space-y-5 text-base md:text-lg text-black leading-relaxed font-light lg:col-span-6">
              <p>
                Hey there! I’m <span className="text-black font-bold">Jeeval Jolly Jacob</span>, a software engineering enthusiast currently pursuing my MCA after completing my BCA, with a strong focus on full-stack development and DevOps.
              </p>
              <p>
                I enjoy experimenting with new technologies and building side projects for fun, it’s how I understand systems deeply and turn ideas into actual real-world solutions.
              </p>
              <p>
                Beyond academics, I’m constantly exploring new concepts, running small experiments, and sharpening my skills. Curious by nature and driven by growth, I’m always pushing myself to become a better developer.
              </p>
            </div>

            {/* 3. Buttons (Right) */}
            <div className="flex flex-col w-full max-w-sm mx-auto lg:col-span-3 lg:max-w-none">
              <h3 className="text-base font-bold uppercase tracking-[0.2em] text-black mb-4 flex items-center justify-center border-b border-neutral-200 pb-2">
                <Rocket className="w-5 h-5 mr-2 text-blue-600" /> Quick Links
              </h3>
              <div className="flex flex-col gap-4">
                {/* LinkedIn Button */}
                <a
                  href="https://www.linkedin.com/in/jeeval-jolly-jacob-5a28b4329/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center justify-center transition-all duration-500 ease-out w-full bg-blue-600 text-white hover:bg-blue-700 hover:shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:-translate-y-1 border border-blue-600"
                >
                  <Linkedin className="mr-3 h-5 w-5" /> LinkedIn
                </a>

                {/* GitHub Button (NEW - Green) */}
                <a
                  href="https://github.com/j-j-j-github"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center justify-center transition-all duration-500 ease-out w-full bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:-translate-y-1 border border-emerald-600"
                >
                  <Github className="mr-3 h-5 w-5" /> GitHub
                </a>

                {/* J3 Labs Venture Button */}
                <a
                  href="https://j-j-j-github.github.io/J3-Labs/#about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center justify-center transition-all duration-500 ease-out w-full bg-black text-white hover:bg-neutral-800 hover:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1 border border-black hover:border-neutral-800"
                >
                  <Rocket className="mr-3 h-5 w-5" /> J3 Labs
                </a>

                {/* Download Resume Button */}
                <a
                  href={`${import.meta.env.BASE_URL}resume.pdf`}
                  download="Jeeval_Jolly_Jacob_Resume.pdf"
                  className="group px-8 py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-[0.15em] flex items-center justify-center transition-all duration-500 ease-out w-full bg-rose-600 text-white hover:bg-rose-700 hover:shadow-[0_10px_30px_rgba(225,29,72,0.4)] hover:-translate-y-1 border border-rose-600"
                >
                  <Download className="mr-3 h-5 w-5" /> Resume
                </a>
              </div>
            </div>
          </div>

          {/* FEATURED MEDIA SECTION */}
          <div className="max-w-7xl mx-auto mt-12 mb-0 overflow-hidden relative">
            <div className="flex flex-col items-center justify-center mb-6 relative">
              <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-black flex items-center justify-center">
                Featured Media
              </h3>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-1 bg-blue-600 rounded-full mt-3"
              />
            </div>
            <div className="relative flex overflow-hidden w-full group py-6">
              {/* Fade masks for the edges */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              
              <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
                {/* Duplicate the array twice for seamless looping */}
                {[...featuredMedia, ...featuredMedia].map((media, idx) => (
                  <div key={idx} className="flex-shrink-0 w-48 md:w-64 mx-2 md:mx-4 bg-white p-2 md:p-3 pb-6 md:pb-8 rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-neutral-200 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] hover:rotate-2 hover:cursor-pointer">
                    <div className="w-full aspect-square overflow-hidden bg-neutral-100 rounded-sm">
                      <img src={media.image} alt={media.title} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <p className="mt-3 md:mt-5 text-center text-xl md:text-3xl font-['Caveat'] text-neutral-800 transform -rotate-1">{media.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* TIMELINE SECTION (Colors fixed via CSS override above) */}
        <TimelineSection ref={(el) => { sectionsRef.current[2] = el; }} />

        {/* SKILLS SECTION */}
        <section id="skills" ref={(el) => { sectionsRef.current[3] = el; }} className="py-10 md:py-16 px-8 relative bg-white border-t border-neutral-200 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          {/* Info Button */}
          <div className="absolute top-6 right-6 md:top-10 md:right-10 z-30 flex flex-row-reverse items-start">
            <button
              onClick={() => setShowSkillInfo(!showSkillInfo)}
              className="p-3 bg-neutral-900/5 backdrop-blur-xl border border-neutral-200/50 shadow-lg rounded-full hover:bg-neutral-900/10 transition-all text-neutral-500 hover:text-blue-600 focus:outline-none"
              title="Skill Bars Info"
            >
              <HelpCircle className="w-6 h-6" />
            </button>

            {/* Pop up */}
            <AnimatePresence>
              {showSkillInfo && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, x: 10 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mr-4 w-72 md:w-96 p-5 rounded-2xl bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-40 text-sm text-neutral-600 leading-relaxed text-left"
                >
                  <p>
                    <strong>Note:</strong> The progress bars below are purely visual elements designed to add aesthetic flair to the page. They do <em>not</em> represent actual expertise or proficiency levels.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center justify-center mb-20 relative">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-black tracking-tighter flex items-center justify-center text-black"
              >
                My Skills
              </motion.h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "120px" }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-1 bg-blue-600 rounded-full mt-4"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Languages",
                  icon: Code,
                  color: "group-hover:text-blue-400",
                  bgColor: "group-hover:bg-blue-500/20",
                  barColor: "bg-blue-500",
                  bgGradient: "from-blue-500/20 to-white/60",
                  glowColor: "hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
                  skills: ["JavaScript", "TypeScript", "Python", "C++", "Kotlin", "SQL"]
                },
                {
                  title: "Frontend",
                  icon: Layout,
                  color: "group-hover:text-emerald-400",
                  bgColor: "group-hover:bg-emerald-500/20",
                  barColor: "bg-emerald-500",
                  bgGradient: "from-emerald-500/20 to-white/60",
                  glowColor: "hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
                  skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Framer Motion"]
                },
                {
                  title: "Backend",
                  icon: Server,
                  color: "group-hover:text-violet-400",
                  bgColor: "group-hover:bg-violet-500/20",
                  barColor: "bg-violet-500",
                  bgGradient: "from-violet-500/20 to-white/60",
                  glowColor: "hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]",
                  skills: ["Node.js", "ASP.NET Core", "Django", "Firebase", "Supabase", "Entity Framework"]
                },
                {
                  title: "Mobile & DB",
                  icon: Smartphone,
                  color: "group-hover:text-rose-400",
                  bgColor: "group-hover:bg-rose-500/20",
                  barColor: "bg-rose-500",
                  bgGradient: "from-rose-500/20 to-white/60",
                  glowColor: "hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
                  skills: ["Android SDK", "Room DB", "MySQL", "SQLite", "PostgreSQL"]
                }
              ].map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className={`group relative z-10 hover:z-20 bg-gradient-to-b ${category.bgGradient} backdrop-blur-[2px] border border-neutral-300 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] ${category.glowColor} overflow-hidden`}
                >
                  {/* Shine Animation */}
                  <div className="absolute inset-0 -top-10 -bottom-10 bg-gradient-to-r from-transparent via-white/60 to-transparent 
                        transform -skew-x-12 -translate-x-full group-hover:translate-x-[150%] transition-transform duration-1000 ease-out pointer-events-none z-0"
                  />

                  {/* Animated Colored Background Glow */}
                  <div className={`absolute -inset-[100%] opacity-0 group-hover:opacity-[0.15] transition-opacity duration-1000 blur-3xl rounded-full ${category.barColor} pointer-events-none z-0`} />

                  {/* Content Container */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className={`p-3 rounded-xl bg-neutral-100 ${category.bgColor} transition-colors duration-500`}>
                        <category.icon className={`w-6 h-6 text-neutral-500 ${category.color} transition-colors duration-500`} />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-[0.2em] text-black">{category.title}</h3>
                    </div>

                    <div className="flex flex-col gap-5">
                      {category.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="w-full">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-neutral-600">{skill}</span>
                          </div>
                          <div className="w-full h-1.5 bg-neutral-200/60 rounded-full overflow-hidden relative">
                            <motion.div
                              className={`absolute top-0 left-0 h-full rounded-full ${category.barColor}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: skill === "HTML5" || skill === "CSS3" ? `${Math.random() * 15 + 80}%` : `${Math.random() * 20 + 40}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: idx * 0.15 + sIdx * 0.1, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" ref={(el) => { sectionsRef.current[4] = el; }} className="py-10 md:py-16 px-8 bg-black border-y border-neutral-900 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center mb-16 relative">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white flex items-center justify-center">
                Featured Projects
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "120px" }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-1 bg-blue-500 rounded-full mt-4"
              />
            </div>
            <div className="relative flex flex-col gap-8 md:gap-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {projects.slice(0, 3).map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </div>

              <AnimatePresence initial={false}>
                {showAllProjects && projects.length > 3 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                      {projects.slice(3).map((project, index) => (
                        <ProjectCard key={index + 3} project={project} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Blur Overlay when collapsed */}
              {!showAllProjects && projects.length > 3 && (
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
              )}
            </div>

            {/* Toggle Projects Button */}
            {projects.length > 3 && (
              <div className={`flex justify-center relative z-20 ${!showAllProjects ? '-mt-6' : 'mt-12'}`}>
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 border border-neutral-700 text-white font-medium hover:bg-neutral-800 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] hover:-translate-y-0.5"
                >
                  {showAllProjects ? (
                    <>Show Less <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>See {projects.length - 3} More <ChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" ref={(el) => { sectionsRef.current[5] = el; }} className="py-8 md:py-12 px-8 bg-white border-t border-neutral-200 text-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex flex-col items-center justify-center relative">
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter flex items-center justify-center text-black">
                Get In Touch
              </h2>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "120px" }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="h-1 bg-blue-600 rounded-full mt-4"
              />
            </div>
            <p className="text-xl text-black leading-relaxed font-light">
              Have a project in mind or just want to say hello? Feel free to reach out! I'm always open to new opportunities and collaborations.
            </p>
            <div className="flex justify-center space-x-12 py-4">
              <a href="https://github.com/j-j-j-github" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="p-3 rounded-full border border-black bg-black group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all duration-300 shadow-lg hover:-translate-y-1">
                  <Github className="h-6 w-6 text-emerald-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-bold text-black mt-2">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/jeeval-jolly-jacob-5a28b4329/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="p-3 rounded-full border border-black bg-black group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300 shadow-lg hover:-translate-y-1">
                  <Linkedin className="h-6 w-6 text-blue-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-bold text-black mt-2">LinkedIn</span>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=jeevaljolly@gmail.com" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="p-3 rounded-full border border-black bg-black group-hover:bg-red-600 group-hover:border-red-600 transition-all duration-300 shadow-lg hover:-translate-y-1">
                  <Mail className="h-6 w-6 text-red-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-bold text-black mt-2">Email</span>
              </a>
            </div>
            <div className="flex justify-center">
              <Button primary={true} onClick={() => window.location.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=jeevaljolly@gmail.com'}>
                Send Me an Email <Mail className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </div>
      <footer className="py-12 bg-black border-t border-white/10 text-neutral-500 text-center text-sm font-medium">
        <p>&copy; {new Date().getFullYear()} Jeeval Jolly Jacob. Designed with ☕️ and Code.</p>
      </footer>
    </div>
  );
};

export default App;