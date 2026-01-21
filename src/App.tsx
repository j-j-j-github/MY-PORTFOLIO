// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import VideoBackground from './components/VideoBackground';
import TimelineSection from "./components/TimelineSection";
import { Github, Linkedin, Mail, Code, Briefcase, User, Star, ChevronDown, ArrowRight, Rocket } from 'lucide-react';
import NavItem from './components/NavItem';

// --- HELPER: CONSISTENT TAG COLORS ---
// This ensures "React" is always one color, "Python" is always another, etc.
const getTagColor = (tag: string) => {
  const colors = [
    'bg-blue-500/10 text-blue-300 border-blue-500/20',     // Blue
    'bg-emerald-500/10 text-emerald-300 border-emerald-500/20', // Green
    'bg-violet-500/10 text-violet-300 border-violet-500/20',   // Purple
    'bg-amber-500/10 text-amber-300 border-amber-500/20',     // Orange
    'bg-rose-500/10 text-rose-300 border-rose-500/20',       // Red
    'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',       // Cyan
    'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20', // Pink
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

// Premium Button: Apple-style rounded, smooth transitions
const Button = ({ children, primary, onClick }: { children: React.ReactNode; primary: boolean; onClick: () => void }) => {
  if (primary) {
    return (
      <button
        onClick={onClick}
        className="relative group overflow-hidden px-8 py-3.5 rounded-full font-medium text-lg flex items-center justify-center transition-all duration-300 ease-out transform hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] text-white bg-blue-600 border border-blue-500 focus:outline-none"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="relative z-10 flex items-center justify-center gap-2">
            {children}
        </div>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="px-8 py-3.5 rounded-full font-medium text-lg flex items-center justify-center transition-all duration-300 ease-out bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/30 backdrop-blur-md focus:outline-none transform hover:-translate-y-1"
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
const ProjectCard = ({ project }: { project: { title: string; description: string; image: string; tags: string[]; link: string } }) => (
  <div className="flex flex-col h-full group bg-neutral-900/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative w-full h-64 overflow-hidden bg-neutral-950">
          <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/600x400/171717/404040?text=${encodeURIComponent(project.title)}`;
              }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow relative">
          <h3 className="text-2xl font-bold text-white tracking-tight mb-3 group-hover:text-blue-400 transition-colors duration-300">{project.title}</h3>
          <p className="text-neutral-400 text-base leading-relaxed mb-6 font-light line-clamp-3">{project.description}</p>
          
          <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, index) => (
                    <span key={index} className={`px-3 py-1 text-xs font-medium rounded-full border ${getTagColor(tag)}`}>
                        {tag}
                    </span>
                ))}
            </div>
            
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-semibold text-white hover:text-blue-400 transition-colors">
                View Project <ArrowRight className="ml-2 h-4 w-4" />
            </a>
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
    { id: 'education', label: 'Education' },
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
      title: 'ECHO - Seek the Silence',
      description: 'A minimalist, ephemeral social experience where users share anonymous questions into a living void. Features real-time presence, impermanent posts, cinematic share artifacts, and a dark-first UI designed for reflection over reaction.',
      image: 'echo.png',
      tags: ['React', 'Supabase', 'Realtime', 'Canvas API', 'Tailwind CSS', 'Framer Motion'],
      link: 'https://www.voidecho.space/',
    },
    {
    title: 'Daily Verse - Android App',
    description: 'A minimalist, offline-first daily devotion app featuring a synchronized home screen widget, reliable background scheduling via WorkManager, and a custom OLED dark mode engine. Built with native Kotlin and Material Design 3.',
    image: 'dailyverse.jpg',
    tags: ['Kotlin', 'Android SDK', 'WorkManager', 'AppWidgets', 'Material Design 3', 'JSON'],
    link: 'https://github.com/j-j-j-github/DAILYVERSE',
  },
    {
      title: 'TMT - Task Manager Team',
      description: 'A robust full-stack task tracking application featuring real-time CRUD operations via AJAX, dynamic user assignment, and secure search functionality. Built with ASP.NET Core and Entity Framework.',
      image: 'taskmanager.jpg', 
      tags: ['ASP.NET Core', 'C#', 'Entity Framework', 'SQLite', 'AJAX', 'Bootstrap 5'],
      link: 'https://github.com/j-j-j-github/TASKMANAGER',
    },
    {
      title: 'ISS Sensory Lab',
      description: 'An interactive website that allows users to experience astronaut training and spacewalks. Features include astronaut customization, realistic Cupola, NBL simulation, and a 2D Space EVA game.',
      image: 'iss.jpg',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Canvas', 'Physics Simulation'],
      link: 'https://j-j-j-github.github.io/ISS-SENSORY-LAB/',
    },
    {
      title: 'JBlog Platform',
      description: 'A modern, full-stack blogging platform supporting real-time user registration, authentication, profile management (including profile pictures), and rich-text post creation/editing.',
      image: 'jblog.jpg', 
      tags: ['Django', 'Python', 'SQLite', 'HTML/CSS', 'Template Inheritance', 'User Authentication', 'CKEditor'],
      link: 'https://github.com/j-j-j-github/JBLOG',
  },
    {
      title: 'Auto Motors',
      description: 'An online marketplace for new and used vehicles, featuring advanced search with filters, detailed listings, and dashboards for both buyers and sellers.',
      image: 'automotors.jpg',
      tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'jQuery'],
      link: 'https://github.com/j-j-j-github/AUTO-MOTORS',
    },
    {
      title: 'Bus Reservation Website',
      description: 'A comprehensive bus booking platform allowing users to search routes, view seat layouts, and manage bookings with a secure payment system.',
      image: 'busbooking.jpg',
      tags: ['Python', 'Django', 'MySQL', 'JavaScript', 'HTML/CSS'],
      link: 'https://github.com/j-j-j-github/BUS-RESERVATION-WEBSITE',
    },
    {
      title: 'Renewly',
      description: 'Renewly is a smart, easy-to-use app that helps you track all your subscriptions in one place so you never miss a renewal or waste money again.',
      image: 'https://placehold.co/600x400/E0E7FF/4F46E5?text=Coming+Soon',
      tags: ['Android', 'Kotlin', 'Room', 'AlarmManager'],
      link: '#', 
    },
  ];

  return (
    <div className="min-h-screen text-white font-sans antialiased selection:bg-blue-500/30 selection:text-blue-100">
      <VideoBackground />
      
      {/* CSS Override for the Timeline Component to fix the colors */}
      <style>{`
        .vertical-timeline-element-content { background: rgba(23, 23, 23, 0.4) !important; color: #fff !important; box-shadow: none !important; border: 1px solid rgba(255,255,255,0.05); border-radius: 1.5rem !important; backdrop-filter: blur(12px); }
        .vertical-timeline-element-content-arrow { border-right: 7px solid rgba(255,255,255,0.05) !important; }
        .vertical-timeline-element-icon { box-shadow: 0 0 0 4px #000, inset 0 0 10px rgba(0,0,0,0.2) !important; background: #0a0a0a !important; color: #3b82f6 !important; }
        .vertical-timeline::before { background: #262626 !important; }
        .vertical-timeline-element-date { opacity: 0.6; font-weight: 500; }
      `}</style>

      {/* Navigation */}
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

      <div className="pt-20 md:pt-24">
        {/* HERO SECTION (Original Layout, Updated Colors) */}
        <section id="hero" ref={(el) => { sectionsRef.current[0] = el; }} className="relative flex items-center justify-center min-h-screen text-white text-center px-4 py-20 overflow-hidden">
            <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-bold leading-tight tracking-tighter drop-shadow-2xl">
  <span className="text-neutral-400">Welcome to</span>
  <br />
  <span className="text-white">Jeeval's Space</span>.
</h1>
            <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
                A passionate <span className="font-semibold text-blue-400">Full-Stack Developer</span> crafting elegant and efficient solutions for web and mobile.
            </p>
            <div className="flex justify-center space-x-4 mt-8">
                <Button primary={true} onClick={() => scrollToSection('projects')}>
                    View My Work <Briefcase className="ml-2 h-5 w-5" />
                </Button>
                <Button primary={false} onClick={() => scrollToSection('contact')}>
                    Get In Touch <Mail className="ml-2 h-5 w-5" />
                </Button>
            </div>
            </div>
            <div className="absolute bottom-10 animate-bounce">
                <ChevronDown className="h-8 w-8 text-neutral-600" />
            </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" ref={(el) => { sectionsRef.current[1] = el; }} className="py-24 md:py-32 px-8 bg-black/40 backdrop-blur-sm border-t border-white/5">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="flip-container w-56 h-56 flex-shrink-0 group">
                <div className="flip-inner">
                <div className="flip-front rounded-full p-1 border border-white/10">
                    <img src="front.jpg" alt="Front" className="w-full h-full object-cover rounded-full aspect-square" />
                </div>
                <div className="flip-back rounded-full p-1 border border-white/10">
                    <img src="back.jpg" alt="Back" className="w-full h-full object-cover rounded-full aspect-square" />
                </div>
                </div>
            </div>
            <div className="text-left space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center tracking-tighter">
                <User className="mr-4 text-blue-500" size={40} /> About Me
                </h2>
                <div className="space-y-4 text-lg text-neutral-400 leading-relaxed font-light">
                    <p>
                        Hi there! I’m <span className="text-white font-medium">Jeeval Jolly Jacob</span>, a software engineering enthusiast currently pursuing my MCA after completing my BCA, with a strong focus on full-stack development and DevOps.
                    </p>
                    <p>
                        I enjoy experimenting with new technologies and building side projects for fun, it’s how I understand systems deeply and turn ideas into real-world solutions.
                    </p>
                    <p>
                        Beyond academics, I’m constantly exploring new concepts, running small experiments, and sharpening my skills. Curious by nature and driven by growth, I’m always pushing myself to become a better developer.
                    </p>
                </div>
                
                {/* BUTTONS CONTAINER */}
                <div className="flex flex-wrap gap-4 pt-4">
                    {/* LinkedIn Button */}
                    <a 
                        href="https://www.linkedin.com/in/jeeval-jolly-jacob-5a28b4329/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm transition-all duration-300 hover:bg-blue-600/10 hover:border-blue-500/30 hover:text-blue-400 group"
                    >
                        <Linkedin className="w-4 h-4 mr-2" />
                        <span>Connect on LinkedIn</span>
                        <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
                    </a>

                    {/* J3 Labs Venture Button */}
<a 
    href="https://j-j-j-github.github.io/J3-Labs/#about" 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm transition-all duration-300 hover:bg-emerald-600/10 hover:border-emerald-500/30 hover:text-emerald-400 group"
>
    {/* Icon also needs to turn green on group hover */}
    <Rocket className="w-4 h-4 mr-2 text-neutral-400 group-hover:text-emerald-400 transition-colors" />
    <span>Meet my Venture: J3 Labs</span>
    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out" />
</a>
                </div>

            </div>
            </div>
        </section>

        {/* TIMELINE SECTION (Colors fixed via CSS override above) */}
        <TimelineSection ref={(el) => { sectionsRef.current[2] = el; }} />

        {/* SKILLS SECTION */}
        <section id="skills" ref={(el) => { sectionsRef.current[3] = el; }} className="py-24 md:py-32 px-8">
            <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 flex items-center justify-center tracking-tighter">
                <Code className="mr-4 text-blue-500" size={40} /> My Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {skills.map((skill, index) => (
                <SkillCard key={index} icon={skill.icon} name={skill.name} />
                ))}
            </div>
            </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" ref={(el) => { sectionsRef.current[4] = el; }} className="py-24 md:py-32 px-8 bg-gradient-to-b from-black/0 via-black/20 to-black/0 border-y border-white/5">
            <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 flex items-center justify-center tracking-tighter">
                <Briefcase className="mr-4 text-blue-500" size={40} /> Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                {projects.map((project, index) => (
                <ProjectCard key={index} project={project} />
                ))}
            </div>
            </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" ref={(el) => { sectionsRef.current[5] = el; }} className="py-24 md:py-32 px-8">
            <div className="max-w-2xl mx-auto text-center space-y-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center tracking-tighter">
                <Mail className="mr-4 text-blue-500" size={40} /> Get In Touch
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed font-light">
                Have a project in mind or just want to say hello? Feel free to reach out! I'm always open to new opportunities and collaborations.
            </p>
            <div className="flex justify-center space-x-12 py-8">
                <SocialLink icon={Github} href="https://github.com/j-j-j-github" label="GitHub" />
                <SocialLink icon={Linkedin} href="https://www.linkedin.com/in/jeeval-jolly-jacob-5a28b4329/" label="LinkedIn" />
                <SocialLink icon={Mail} href="https://mail.google.com/mail/?view=cm&fs=1&to=jeevaljolly@gmail.com" label="Email" />
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
        <p>&copy; {new Date().getFullYear()} Jeeval. Designed with ☕️ and Code.</p>
      </footer>
    </div>
  );
};

export default App;