// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import VideoBackground from './components/VideoBackground';
import TimelineSection from "./components/TimelineSection";
import { Github, Linkedin, Mail, Code, Briefcase, User, Star, ChevronDown, ChevronUp, ArrowRight, Rocket, Download, Layout, Server, Smartphone, HelpCircle } from 'lucide-react';
import NavItem from './components/NavItem';
import { motion, AnimatePresence } from 'framer-motion';

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

// Premium Button: Apple-style rounded, smooth transitions, colored hover effect
const Button = ({ children, primary, onClick }: { children: React.ReactNode; primary?: boolean; onClick: () => void }) => {
  const hoverBg = primary ? 'hover:bg-blue-600 hover:border-blue-600 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)]' : 'hover:bg-emerald-600 hover:border-emerald-600 hover:shadow-[0_10px_20px_rgba(16,185,129,0.3)]';
  const textColor = primary ? 'text-blue-400 group-hover:text-white' : 'text-emerald-400 group-hover:text-white';

  return (
    <button
      onClick={onClick}
      className={`group px-8 py-3.5 rounded-full font-medium text-lg flex items-center justify-center transition-all duration-300 ease-out bg-white/5 border border-white/10 ${hoverBg} backdrop-blur-md focus:outline-none ${textColor} shadow-lg hover:-translate-y-1`}
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
  <div className="flex flex-col h-full group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] hover:shadow-2xl">
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

const App = () => {
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-xl border-b border-white/5 px-4 py-4 md:px-12 flex items-center">
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
          {/* Mobile Fade Overlay */}
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/80 to-transparent z-20 pointer-events-none" />
          
          <div ref={navRef} className="w-full flex justify-start md:justify-end overflow-x-auto whitespace-nowrap scrollbar-hide scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
        <section id="hero" ref={(el) => { sectionsRef.current[0] = el; }} className="relative flex flex-col justify-center md:flex-row md:items-center min-h-[100vh] bg-black overflow-hidden pt-20 md:pt-24 pb-12 md:pb-0">
          <VideoBackground />

          {/* Left Static Image */}
          <div className="relative md:absolute md:top-0 md:left-0 w-full md:w-1/2 h-[45vh] md:h-full z-10 flex items-center justify-center p-6 md:p-16 md:pt-36 cursor-default perspective-1000 mt-4 md:mt-0">
            <div className="w-[60%] sm:w-[45%] md:w-full h-full bg-white p-3 md:p-5 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.1)] flex transition-all duration-[1500ms] ease-out hover:scale-[1.03] hover:-translate-y-2 hover:rotate-1 hover:shadow-[0_20px_60px_rgba(255,255,255,0.25)] hover:cursor-pointer">
              <img
                src="hero/1.png"
                alt="Jeeval Jolly Jacob"
                className="w-full h-full object-cover object-[center_top] rounded-2xl shadow-inner transition-transform duration-[1500ms] ease-out"
              />
            </div>
          </div>

          {/* Right Aligned Text Content */}
          <div className="relative z-20 w-full max-w-7xl mx-auto flex justify-center md:justify-end px-6 lg:px-16 pointer-events-none py-10 md:py-20">
            <div className="w-full md:w-1/2 flex justify-center md:justify-center pointer-events-auto mt-[4vh] md:mt-0">
              <div className="w-full max-w-lg xl:max-w-xl space-y-6 md:space-y-8 animate-fade-in-up text-center md:text-left flex flex-col items-center md:items-start md:ml-12 lg:ml-24">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter drop-shadow-2xl flex flex-col md:items-start items-center">
                  <span className="text-neutral-400">Welcome to</span>
                  <span className="text-white font-playmaker font-normal tracking-normal whitespace-nowrap mt-2 md:mt-4 text-4xl sm:text-6xl md:text-7xl lg:text-8xl">Jeevals Space</span>
                </h1>
                <p className="text-base sm:text-lg md:text-2xl text-neutral-300 font-light leading-relaxed mx-auto md:mx-0 drop-shadow-lg">
                  A passionate <span className="font-semibold text-white">Full-Stack Developer</span> crafting elegant, efficient, and scalable solutions for modern mobile and web applications.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-8 pointer-events-auto w-full">
                  <Button primary={true} onClick={() => scrollToSection('projects')}>
                    View My Work <Briefcase className="ml-2 h-5 w-5" />
                  </Button>
                  <Button primary={false} onClick={() => scrollToSection('contact')}>
                    Get In Touch <Mail className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 pointer-events-none">
            <ChevronDown className="h-8 w-8 text-neutral-300" />
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={(el) => { sectionsRef.current[1] = el; }} className="pb-10 md:pb-16 pt-0 bg-white text-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">

          {/* Edge-to-Edge Banner Image with Overlay Heading */}
          <div className="relative w-full mb-12 md:mb-16 flex items-center justify-center bg-white">
            <img src="banner.jpg" alt="About Banner" className="w-full h-48 md:h-80 object-cover shadow-md border-y border-neutral-200 opacity-30" />

            {/* Overlay Centered Heading */}
            <div className="absolute inset-0 flex flex-col items-center justify-center w-full px-8 z-10">
              <h2 className="text-3xl md:text-5xl font-playmaker font-normal flex items-center justify-center text-black">
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
                Hi there! I’m <span className="text-black font-bold">Jeeval Jolly Jacob</span>, a software engineering enthusiast currently pursuing my MCA after completing my BCA, with a strong focus on full-stack development and DevOps.
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
                  className="flex flex-col items-center justify-center py-4 px-2 rounded-full bg-blue-600 border border-blue-500 text-white font-medium text-sm transition-all duration-300 hover:bg-blue-700 group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-600/20"
                >
                  <div className="flex items-center justify-center mb-1">
                    <Linkedin className="w-5 h-5 mr-2 text-white transition-colors" />
                    <span>LinkedIn</span>
                  </div>
                  <span className="text-xs text-blue-200 font-normal group-hover:text-white text-center">View my profile</span>
                </a>

                {/* J3 Labs Venture Button */}
                <a
                  href="https://j-j-j-github.github.io/J3-Labs/#about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center py-4 px-2 rounded-full bg-emerald-600 border border-emerald-500 text-white font-medium text-sm transition-all duration-300 hover:bg-emerald-700 group hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-600/20"
                >
                  <div className="flex items-center justify-center mb-1">
                    <Rocket className="w-5 h-5 mr-2 text-white transition-colors" />
                    <span>J3 Labs</span>
                  </div>
                  <span className="text-xs text-emerald-200 font-normal group-hover:text-white text-center">Explore my agency</span>
                </a>

                {/* Download Resume Button */}
                <a
                  href={`${import.meta.env.BASE_URL}Jeeval's%20Resume.pdf`}
                  download="Jeeval_Jolly_Jacob_Resume.pdf"
                  className="flex flex-col items-center justify-center py-4 px-2 rounded-full bg-rose-600 border border-rose-500 text-white font-medium text-sm transition-all duration-300 hover:bg-rose-700 group hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-600/20"
                >
                  <div className="flex items-center justify-center mb-1">
                    <Download className="w-5 h-5 mr-2 text-white group-hover:animate-bounce transition-colors" />
                    <span>Resume</span>
                  </div>
                  <span className="text-xs text-rose-200 font-normal group-hover:text-white text-center">Get a PDF copy</span>
                </a>
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
                className="text-3xl md:text-5xl font-playmaker font-normal flex items-center justify-center text-black"
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
                  className={`group relative z-10 hover:z-20 bg-gradient-to-b ${category.bgGradient} backdrop-blur-2xl border border-neutral-300 shadow-[0_12px_40px_rgba(0,0,0,0.12)] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-3 hover:scale-105 hover:shadow-[0_30px_60px_rgba(0,0,0,0.25)] ${category.glowColor} overflow-hidden`}
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
              <h2 className="text-3xl md:text-5xl font-playmaker font-normal text-white flex items-center justify-center">
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
              <h2 className="text-3xl md:text-5xl font-playmaker font-normal flex items-center justify-center text-black">
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