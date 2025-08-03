// App.tsx
import React, { useState, useEffect, useRef } from 'react';
import VideoBackground from './components/VideoBackground';
import TimelineSection from "./components/TimelineSection";
import { Github, Linkedin, Mail, Code, Briefcase, User, Star, ChevronDown } from 'lucide-react';

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
        src="public/logo.png"
        alt="Logo"
        className={`h-10 w-10 md:h-12 md:w-12 object-contain transition-transform duration-300 ${spinning ? 'animate-logo-spin' : ''}`}
        draggable="false"
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

  return (
    <div className="min-h-screen text-white font-inter antialiased">
      <VideoBackground /> {/* Added this line for the video background */}
      
      {/* Navigation Bar with Glassmorphism */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg py-4 px-4 md:px-12 flex items-center">
        {/* Logo flush left */}
        <div className="flex-shrink-0">
          <Logo onClick={() => scrollToSection('hero')} />
        </div>
        {/* Centered nav items */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex space-x-8">
            <NavItem id="hero" label="Home" active={activeSection === 'hero'} onClick={scrollToSection} />
            <NavItem id="about" label="About" active={activeSection === 'about'} onClick={scrollToSection} />
            <NavItem id="skills" label="Skills" active={activeSection === 'skills'} onClick={scrollToSection} />
            <NavItem id="projects" label="Projects" active={activeSection === 'projects'} onClick={scrollToSection} />
            <NavItem id="contact" label="Contact" active={activeSection === 'contact'} onClick={scrollToSection} />
          </div>
        </div>
      </nav>

      <section id="hero" ref={(el) => (sectionsRef.current[0] = el)} className="relative flex items-center justify-center min-h-screen text-white text-center px-4 py-20 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-extrabold leading-tight tracking-tighter text-white drop-shadow-lg">
            Hello, I'm <span className="text-gray-300">Jeeval</span>.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
            A passionate <span className="font-semibold text-white">Full-Stack Developer</span> crafting elegant and efficient solutions for the web.
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
    <img
  src="front.jpg"
  alt="Front"
  className="w-full h-full object-cover rounded-full aspect-square"
/>
    </div>
    <div className="flip-back">
    <img
  src="back.jpg"
  alt="Back"
  className="w-full h-full object-cover rounded-full aspect-square"
/>
    </div>
  </div>
</div>





    {/* Text content remains untouched */}
    <div className="text-left space-y-6">
      <h2 className="text-4xl font-bold text-white flex items-center">
        <User className="mr-3 text-indigo-400" size={32} /> About Me
      </h2>
      <p className="text-lg text-gray-400 leading-relaxed">
        Hi there! I’m Jeeval, a passionate software engineering enthusiast currently pursuing my MCA after completing a BCA. I’m deeply interested in the world of full-stack development and DevOps, where I get to bridge the gap between coding and infrastructure.
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

      <TimelineSection />

      <section id="skills" ref={(el) => (sectionsRef.current[2] = el)} className="py-20 md:py-32 px-8 text-white">
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

      <section id="projects" ref={(el) => (sectionsRef.current[3] = el)} className="py-20 md:py-32 px-8 text-gray-200">
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

      <section id="contact" ref={(el) => (sectionsRef.current[4] = el)} className="py-20 md:py-32 px-8 text-white">
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
          {/* Centered "Send Me an Email" button */}
          <div className="flex justify-center mt-8">
            <Button primary={true} onClick={() => window.location.href = 'mailto:jeevaljolly@gmail.com'}>
              Send Me an Email <Mail className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer with Glassmorphism */}
      <footer className="py-10 bg-black/80 backdrop-blur-xl border-t border-white/10 shadow-lg text-gray-400 text-center text-sm transition-all">
        <p>&copy; {new Date().getFullYear()} Jeeval. All rights reserved.</p>
        <p className="mt-2">Designed with ☕️ and Code.</p>
      </footer>
    </div>
  );
};

// Nav Item Component with ANIMATION RESTORED
const NavItem = ({ id, label, active, onClick }: { id: string; label: string; active: boolean; onClick: (id: string) => void }) => (
    <button
        onClick={() => onClick(id)}
        className={`
            relative group overflow-hidden px-5 py-2 rounded-lg font-semibold text-sm md:text-base 
            transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02]
            bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg hover:shadow-2xl
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50
            ${active ? 'text-white shadow-lg shadow-indigo-700/50' : 'text-gray-300'}
        `}
    >
        {/* Effects from SkillCard */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-lg"></div>
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]">
            <div className="bg-black rounded-lg h-full w-full"></div>
        </div>
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

        {/* Content */}
        <div className="relative z-10 group-hover:text-white transition-colors duration-500">
            {label}
        </div>
        
        {/* Active state indicator */}
        {active && (
            <span className="absolute inset-0 rounded-lg ring-2 ring-indigo-400/40 animate-glow" />
        )}
    </button>
);

// Button Component with ANIMATION RESTORED
const Button = ({ children, primary, onClick }: { children: React.ReactNode; primary: boolean; onClick: () => void }) => {
  // The premium animation works best on dark, semi-transparent buttons.
  // We apply it to the primary button, but keep the non-primary (white) button simpler for a better look.
  if (primary) {
    return (
      <button
        onClick={onClick}
        className="relative group overflow-hidden px-6 py-3 rounded-full font-semibold text-lg flex items-center justify-center transition-all duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] text-white shadow-lg hover:shadow-2xl bg-indigo-500/30 border border-indigo-400/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {/* Effects from SkillCard */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-full"></div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]">
            <div className="bg-black rounded-full h-full w-full"></div>
        </div>
        <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center group-hover:text-white transition-colors duration-500">
            {children}
        </div>
      </button>
    );
  }

  // Non-primary button (white, inverse style)
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
    {/* Gradient overlay that fills on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-xl"></div>
    
    {/* Animated gradient border */}
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px]">
      <div className="bg-black rounded-xl h-full w-full"></div>
    </div>
    
    {/* Content */}
    <div className="relative z-10 flex flex-col items-center text-center">
      <Icon className="h-16 w-16 text-indigo-400 mb-4 animate-bounce-subtle group-hover:text-white transition-colors duration-500" />
      <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors duration-500">{name}</h3>
    </div>
    
    {/* Shimmer effect */}
    <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
  </div>
);

// Project Card Component with ANIMATION RESTORED
// App.tsx -> Replace ONLY the ProjectCard component with this one

// App.tsx -> Replace ONLY the ProjectCard component with this one

// Project Card Component with restored animations and fixed link position
const ProjectCard = ({ project }: { project: { title: string; description: string; image: string; tags: string[]; link: string } }) => (
  // Added `flex flex-col` to the main container from your original code
  <div className="relative group bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-500 ease-in-out shadow-lg hover:shadow-2xl flex flex-col">
      {/* Effects from SkillCard (untouched) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-indigo-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700 ease-out transform scale-0 group-hover:scale-100 rounded-xl z-10"></div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out p-[1px] z-10">
          <div className="bg-black rounded-xl h-full w-full"></div>
      </div>
      <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10"></div>
      
      {/* Make the main content wrapper a flex container that can grow */}
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
          {/* This content area is now a flex column that fills the remaining space */}
          <div className="p-6 flex flex-col flex-grow">
              {/* This wrapper grows to push the link to the bottom */}
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
              {/* This div is now always at the bottom */}
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

// Social Link Component (no direct glassmorphism, but part of the overall design)
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
  { name: 'MongoDB', icon: Code },
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
