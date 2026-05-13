import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Mail, Download, ArrowRight, Terminal } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './SocialIcons';
import { person, stats } from '../data/portfolio';
import { useCountUp } from '../hooks/useCountUp';

const StatCard = ({ stat }) => {
  const { ref, display } = useCountUp(stat.value, 2000);
  
  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-4xl sm:text-5xl text-[var(--accent)] font-light leading-none">
        {stat.badge ? stat.value : display}
      </span>
      <span className="font-body text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] mt-2">
        {stat.label}
      </span>
    </div>
  );
};

const PHOTOS = [
  { src: '/photo.jpg', label: 'Software Engineer', location: 'MEKELLE' },
  { src: '/photo2.jpg', label: 'Full-Stack Developer', location: 'TIGRAY' },
];

const Hero = () => {
  const [currentRepo, setCurrentRepo] = useState(null);
  const [frontIndex, setFrontIndex] = useState(0);

  // Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });
  const rotateX = useTransform(springY, [-500, 500], [5, -5]);
  const rotateY = useTransform(springX, [-500, 500], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const nextPhoto = () => setFrontIndex((prev) => (prev + 1) % PHOTOS.length);
  const prevPhoto = () => setFrontIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);

  useEffect(() => {
    fetch('https://api.github.com/users/asmeretteklu/repos?sort=pushed&per_page=1')
      .then(r => r.json())
      .then(data => {
        if (data[0]) {
          setCurrentRepo({
            name: data[0].name.replace(/-/g, ' '),
            url: data[0].html_url,
            language: data[0].language
          });
        }
      })
      .catch(() => {
        setCurrentRepo({ name: 'Luna AI', url: person.github, language: 'React Native' });
      });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section 
      className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--accent)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center"
      >
        <div className="flex flex-col space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4 items-center">
              <motion.div variants={item} className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-[var(--accent-light)] border border-[var(--border)] backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text)] font-bold">Systems Online</span>
                </div>
                <div className="w-px h-3 bg-[var(--border)]" />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-medium">Mekelle, ET — {new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Addis_Ababa', hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                </div>
              </motion.div>
              
              <motion.div variants={item} className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[var(--border)] bg-[var(--card-bg)] shadow-sm">
                <Terminal className="w-3 h-3 text-[var(--text-muted)]" />
                <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">Terminal: <span className="text-[var(--accent)] font-mono">Ctrl</span> + <span className="text-[var(--accent)] font-mono">K</span></span>
              </motion.div>
            </div>
            
            <motion.h1 variants={item} className="font-display text-7xl md:text-9xl leading-[0.85] tracking-tight relative">
              <span className="block text-xl md:text-2xl font-body text-[var(--accent)]/80 mb-4 tracking-widest uppercase">
                <span className="font-serif">ሰላም</span> — እንቋዕ ብደሓን መጻእኩም
              </span>
              <span className="block text-[var(--text)] font-light">Asmeret</span>
              <span className="block italic text-[var(--accent)] font-normal ml-8 md:ml-16">Teklu</span>
            </motion.h1>
          </div>

          <motion.p variants={item} className="font-body text-lg md:text-xl text-[var(--text-mid)] max-w-xl leading-relaxed font-light">
            {person.bio}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <a href="#work" className="group flex items-center gap-3 bg-[var(--accent)] text-[var(--onyx)] px-8 py-4 rounded-full font-medium transition-all hover:bg-[var(--paper)]">
              View Work
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-full border border-[var(--border)] font-medium transition-all hover:bg-[var(--accent-light)]">
              Start a conversation
            </a>
            <a href="/Asmeret_Teklu_CV.pdf" download="Asmeret_Teklu_CV.pdf" className="px-8 py-4 rounded-full border border-[var(--border)] font-medium transition-all hover:bg-[var(--accent-light)] flex items-center gap-2 group/cv">
              <Download className="w-4 h-4 text-[var(--accent)] transition-transform group-hover/cv:-translate-y-0.5" />
              <span>Download CV</span>
            </a>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-8 pt-4">
            <a href={person.github} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${person.email}`} className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            
            <div className="h-px flex-1 bg-[var(--border)] max-w-[100px]" />
            
            <AnimatePresence mode="wait">
              {currentRepo && (
                <motion.a 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  href={currentRepo.url}
                  target="_blank"
                  className="text-[11px] font-mono text-[var(--accent)] hover:underline flex items-center gap-2"
                >
                  <span className="opacity-50 tracking-tighter">BUILDING_NOW:</span>
                  {currentRepo.name.toUpperCase()}
                </motion.a>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Column - Sophisticated Image Presentation */}
        <motion.div 
          variants={item} 
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="relative aspect-[4/5] w-full max-w-md mx-auto lg:ml-auto group"
        >
          <div className="absolute inset-0 border border-[var(--accent)] opacity-20 rounded-2xl transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
          <div className="absolute inset-0 border border-[var(--accent)] opacity-10 rounded-2xl transform -translate-x-4 -translate-y-4 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" />
          
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--card-bg)] shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.img 
                key={frontIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                src={PHOTOS[frontIndex].src} 
                alt="Asmeret"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </AnimatePresence>
            
            {/* Slide Navigation Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
              <button 
                onClick={prevPhoto}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all shadow-lg transform -translate-x-2 group-hover:translate-x-0"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextPhoto}
                className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-all shadow-lg transform translate-x-2 group-hover:translate-x-0"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 group-hover:from-black/80 transition-all duration-500">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-1">{PHOTOS[frontIndex].location}</p>
                  <h3 className="font-display text-2xl font-light text-white">{PHOTOS[frontIndex].label}</h3>
                </div>
                <div className="flex gap-2">
                  {PHOTOS.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setFrontIndex(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === frontIndex ? 'bg-[var(--accent)] w-4' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div 
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-20 lg:mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-[var(--border)]"
      >
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
