// App.tsx
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import VideoBackground from './components/VideoBackground';
import TimelineSection from "./components/TimelineSection";
import { Github, Linkedin, Mail, Code, Briefcase, User, Star, ChevronDown } from 'lucide-react';
import NavItem from './components/NavItem';
// The other components are now defined in this file.

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
        className={`h-10 w-10 md:h-12 md:w-12 object-contain transition-transform duration-300 ${spinning ? 'animate-logo-spin' : ''}`}
        draggable={false}
      />
    </button>
  );
};

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

  // **START OF NEW CODE FOR AUTO-SCROLL**
  const navRef = useRef(null);
  const linkRefs = useRef({}); 

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
  // **END OF NEW CODE FOR AUTO-SCROLL**
  
  const skills = [
    { name: 'React.js', icon: Star },
    { name: 'Node.js', icon: Code },
    { name: 'JavaScript', icon: Code },
    { name: 'Python', icon: Code },
    { name: 'Tailwind CSS', icon: Star },
    { name: 'Firebase', icon: Star },
    { name: 'C++', icon: Code },
    { name: 'SQL', icon: Code },
  ];
  
  const projects = [
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
      title: 'ISS Sensory Lab: Astronaut Training and EVA Simulation',
      description: 'An interactive website that allows users to experience astronaut training and spacewalks. Features include astronaut customization, realistic Cupola, NBL simulation, and a 2D Space EVA game.',
      image: 'iss.jpg',
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Canvas', 'Physics Simulation'],
      link: 'https://j-j-j-github.github.io/ISS-SENSORY-LAB/',
    },
    {
      title: 'Renewly',
      description: 'Renewly is a smart, easy-to-use app that helps you track all your subscriptions in one place so you never miss a renewal or waste money again.',
      image: 'https://placehold.co/600x400/E0E7FF/4F46E5?text=Coming+Soon',
      tags: ['...', '...', '...', '...'],
      
    },
  ];

  return (
    <div className="min-h-screen text-white font-inter antialiased">
      <VideoBackground />
      
      {/* **NEW: Nav tag updated with ref and scrolling classes** */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg px-4 py-4 md:px-12 flex items-center">
  {/* Logo always on the left */}
  <div className="flex-shrink-0">
    <Logo onClick={() => scrollToSection('hero')} />
  </div>
  
  {/* Navigation links container with mobile-specific and desktop-specific classes */}
  <div ref={navRef} className="flex-grow flex justify-start md:justify-center overflow-x-auto whitespace-nowrap scrollbar-hide">
    <div className="flex space-x-8">
      {navItemsData.map(item => (
          <NavItem 
              key={item.id}
              ref={el => linkRefs.current[item.id] = el}
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
      <section id="hero" ref={(el) => (sectionsRef.current[0] = el)} className="relative flex items-center justify-center min-h-screen text-white text-center px-4 py-20 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter text-white drop-shadow-lg">
            Welcome to <br></br><span className="text-gray-300">Jeeval's Space</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            A passionate <span className="font-semibold text-white">Full-Stack Developer</span> crafting elegant and efficient solutions for web and mobile.
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
          <ChevronDown className="h-8 w-8 text-gray-400" />
        </div>
      </section>

      <section id="about" ref={(el) => (sectionsRef.current[1] = el)} className="py-20 md:py-32 px-8 text-gray-200 bg-black/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flip-container w-48 h-48 flex-shrink-0">
            <div className="flip-inner">
              <div className="flip-front">
                <img src="front.jpg" alt="Front" className="w-full h-full object-cover rounded-full aspect-square" />
              </div>
              <div className="flip-back">
                <img src="back.jpg" alt="Back" className="w-full h-full object-cover rounded-full aspect-square" />
              </div>
            </div>
          </div>
          <div className="text-left space-y-6">
            <h2 className="text-4xl font-bold text-white flex items-center">
              <User className="mr-3 text-indigo-400" size={32} /> About Me
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              Hi there! I’m Jeeval, a passionate software engineering enthusiast currently pursuing my MCA after completing my BCA. I’m deeply interested in the world of full-stack development and DevOps, where I get to bridge the gap between coding and infrastructure.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              I love experimenting with new concepts and building side projects just for fun, it’s my way of exploring how software really works under the hood and bringing ideas to life through hands-on learning.
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Outside of my studies and coding sessions, I often dive into new topics, tools, and frameworks, building SMALL experiments to test ideas and understand systems better. I’m always curious, always learning, and constantly pushing myself to grow as a developer.
            </p>
          </div>
        </div>
      </section>

      <TimelineSection ref={(el) => (sectionsRef.current[2] = el)} />

      <section id="skills" ref={(el) => (sectionsRef.current[3] = el)} className="py-20 md:py-32 px-8 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12 flex items-center justify-center">
            <Code className="mr-3 text-indigo-400" size={32} /> My Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <SkillCard key={index} icon={skill.icon} name={skill.name} />
            ))}
          </div>
        </div>
      </section>

      <section id="projects" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 md:py-32 px-8 text-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12 flex items-center justify-center">
            <Briefcase className="mr-3 text-indigo-400" size={32} /> My Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" ref={(el) => (sectionsRef.current[5] = el)} className="py-20 md:py-32 px-8 text-white">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white flex items-center justify-center">
            <Mail className="mr-3 text-indigo-400" size={32} /> Get In Touch
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Have a project in mind or just want to say hello? Feel free to reach out! I'm always open to new opportunities and collaborations.
          </p>
          <div className="flex justify-center space-x-6 mt-8">
            <SocialLink icon={Github} href="https://github.com/j-j-j-github" label="GitHub" />
            <SocialLink icon={Linkedin} href="https://www.linkedin.com/in/jeeval-jolly-jacob-5a28b4329/" label="LinkedIn" />
            <SocialLink icon={Mail} href="mailto:jeevaljolly@gmail.com" label="Email" />
          </div>
          <div className="flex justify-center mt-8">
            <Button primary={true} onClick={() => window.location.href = 'mailto:jeevaljolly@gmail.com'}>
              Send Me an Email <Mail className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      </div>
      <footer className="py-10 bg-black/80 backdrop-blur-xl border-t border-white/10 shadow-lg text-gray-400 text-center text-sm transition-all">
        <p>&copy; {new Date().getFullYear()} Jeeval. All rights reserved.</p>
        <p className="mt-2">Designed with ☕️ and Code.</p>
      </footer>
    </div>
  );
};

// Button Component with ANIMATION RESTORED
const Button = ({ children, primary, onClick }: { children: React.ReactNode; primary: boolean; onClick: () => void }) => {
  if (primary) {
    return (
      <button
        onClick={onClick}
        className="relative group overflow-hidden px-6 py-3 rounded-full font-semibold text-lg flex items-center justify-center transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] text-white shadow-lg hover:shadow-2xl bg-indigo-500/30 border border-indigo-400/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-full"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]">
            <div className="bg-black rounded-full h-full w-full"></div>
        </div>
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        <div className="relative z-10 flex items-center justify-center group-hover:text-white transition-colors duration-500">
            {children}
        </div>
      </button>
    );
  }
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 rounded-full font-semibold text-lg flex items-center justify-center transition-all duration-300 ease-in-out bg-white/80 text-black border border-black/20 shadow-lg hover:bg-white/95 transform hover:-translate-y-1 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {children}
    </button>
  );
};

// Skill Card Component with Premium Gradient Animation
const SkillCard = ({ icon: Icon, name }: { icon: React.ComponentType<any>; name: string }) => (
  <div className="relative group bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] text-gray-100 flex flex-col items-center text-center overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-xl"></div>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]">
      <div className="bg-black rounded-xl h-full w-full"></div>
    </div>
    <div className="relative z-10 flex flex-col items-center text-center">
      <Icon className="h-16 w-16 text-indigo-400 mb-4 animate-bounce-subtle group-hover:text-white transition-colors duration-500" />
      <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors duration-500">{name}</h3>
    </div>
    <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
  </div>
);

const ProjectCard = ({ project }: { project: { title: string; description: string; image: string; tags: string[]; link: string } }) => (
  <div className="relative group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-xl z-10"></div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px] z-10">
          <div className="bg-black rounded-xl h-full w-full"></div>
      </div>
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10"></div>
      <div className="relative z-20 flex flex-col flex-grow">
          <div className="relative w-full h-56 bg-gray-900 overflow-hidden">
              <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://placehold.co/600x400/111111/FFFFFF?text=${encodeURIComponent(project.title.replace(/\s/g, '+'))}`;
                  }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
              <div className="flex-grow">
                  <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm font-medium rounded-full">
                              {tag}
                          </span>
                      ))}
                  </div>
              </div>
              <div className="flex justify-end mt-4">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-400 hover:text-indigo-200 font-semibold transition-colors duration-200">
                      View Project
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                  </a>
              </div>
          </div>
      </div>
  </div>
);

const SocialLink = ({ icon: Icon, href, label }: { icon: React.ComponentType<any>; href: string; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-400 hover:text-white transition-colors duration-300 group">
    <Icon className="h-10 w-10 mb-2 transform group-hover:scale-110 transition-transform duration-200" />
    <span className="text-sm font-medium">{label}</span>
  </a>
);

const skills = [
  { name: 'React.js', icon: Star },
  { name: 'Node.js', icon: Code },
  { name: 'JavaScript', icon: Code },
  { name: 'Python', icon: Code },
  { name: 'Tailwind CSS', icon: Star },
  { name: 'Firebase', icon: Star },
  { name: 'C++', icon: Code },
  { name: 'SQL', icon: Code },
];

const projects = [
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
    tags: ['...', '...', '...', '...'],
    
  },
];

export default App;