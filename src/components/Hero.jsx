import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { person, stats } from '../data/portfolio';
import { useCountUp } from '../hooks/useCountUp';
import { useMagneticTilt } from '../hooks/useMagneticTilt';
import ScrollIndicator from './ScrollIndicator';
import CrescentDecoration from './CrescentDecoration';

const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

/* CMD-03: Stat card with countup */
const StatCard = ({ stat }) => {
  const { ref, display } = useCountUp(stat.value, 1500);
  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-display text-4xl md:text-5xl text-gold mb-1">{display}</span>
      <span className="font-mono text-xs uppercase tracking-wider text-paper2">{stat.label}</span>
      <span className="font-ui text-xs text-teal-light/70">{stat.sub}</span>
    </div>
  );
};

/* CMD-04: SVG ellipse circle draw around Teklu */
const TekluWithCircle = () => {
  const ellipseRef = useRef(null);

  useEffect(() => {
    const el = ellipseRef.current;
    if (!el) return;
    const length = el.getTotalLength();
    el.style.strokeDasharray = length;
    el.style.strokeDashoffset = length;
    
    const timeout = setTimeout(() => {
      el.style.transition = 'stroke-dashoffset 1.2s ease-out';
      el.style.strokeDashoffset = '0';
    }, 800);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <span className="relative inline-block">
      <span className="italic text-gold relative z-10">Teklu</span>
      <svg
        className="absolute -inset-x-3 -inset-y-1 w-[calc(100%+24px)] h-[calc(100%+8px)] z-0 pointer-events-none"
        viewBox="0 0 120 50"
        fill="none"
        preserveAspectRatio="none"
      >
        <ellipse
          ref={ellipseRef}
          cx="60"
          cy="25"
          rx="56"
          ry="22"
          stroke="var(--gold)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    </span>
  );
};

/* CMD-02: Currently strip with marquee */
const CurrentlyStrip = () => {
  const items = 'Currently  ✦  Building Luna AI  ✦  Based in Mekelle  ✦  Open to Opportunities  ✦  ';
  const doubled = `${items}${items}`;

  return (
    <div
      className="mt-4 overflow-hidden rounded-md relative shadow-lg shadow-gold/5"
      style={{
        border: '1px solid rgba(196,145,58,0.4)',
        background: 'rgba(196,145,58,0.15)',
        backdropFilter: 'blur(4px)',
        padding: '6px 0',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className="whitespace-nowrap font-mono text-gold pl-4"
        style={{
          fontSize: '0.62rem',
          animation: 'marquee-left 20s linear infinite',
        }}
      >
        {doubled}
      </div>
    </div>
  );
};

const OrbitingNodes = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            rotate: 360,
            x: [0, Math.cos(i) * 20, 0],
            y: [0, Math.sin(i) * 20, 0]
          }}
          transition={{
            rotate: { duration: 15 + i * 5, repeat: Infinity, ease: "linear" },
            x: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute left-1/2 top-1/2 w-2 h-2"
          style={{ originX: "0px", originY: "160px", transform: `rotate(${i * 90}deg)` }}
        >
          <div className="w-1.5 h-1.5 bg-gold/60 rounded-full blur-[1px] shadow-[0_0_8px_rgba(196,145,58,0.4)]" />
        </motion.div>
      ))}
    </div>
  );
};

const LiveCircuitBorder = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible" viewBox="0 0 110 120" fill="none">
    <motion.path
      d="M55 2 L108 30 L108 90 L55 118 L2 90 L2 30 Z"
      stroke="var(--gold)"
      strokeWidth="1.5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ 
        pathLength: [0, 0.4, 0.4, 0.8, 1],
        opacity: [0.3, 1, 0.3],
        pathOffset: [0, 1]
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      className="filter drop-shadow-[0_0_4px_rgba(196,145,58,0.8)]"
    />
  </svg>
);

const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden z-10 px-6 lg:px-12 max-w-6xl mx-auto">
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [-30, 30, -30], y: [0, -40, 0], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: 'rgba(196,145,58,0.15)' }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-[130px]"
          style={{ background: 'rgba(196,133,106,0.12)' }}
        />
      </div>
      {/* Crescent moon decoration */}
      <CrescentDecoration section="hero" />

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:items-start"
      >
        {/* Left Col */}
        <div className="flex flex-col gap-6 relative z-10 pt-8">
          {/* CMD-02: Eyebrow */}
          <motion.p variants={item} className="font-mono text-gold text-sm tracking-widest">
            // she codes · she ships · she's from tigray
          </motion.p>
          
          {/* CMD-02: H1 with CMD-04 circle draw on Teklu */}
          <motion.h1 variants={item} className="font-display text-6xl md:text-7xl lg:text-[7rem] leading-[0.92] text-paper">
            {person.name.first}
            <br />
            <TekluWithCircle />
          </motion.h1>
          
          {/* CMD-02: Subtitle */}
          <motion.p variants={item} className="font-display text-xl md:text-2xl text-paper2 max-w-[38ch] leading-relaxed">
            {person.bio}
          </motion.p>

          {/* CMD-02: Currently strip */}
          <motion.div variants={item}>
            <CurrentlyStrip />
          </motion.div>
          
          {/* Buttons with new design system */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3 mt-4">
            <a href="#work" className="btn-gold">
              View Work <span className="font-mono text-sm">↓</span>
            </a>
            <a href="#contact" className="btn-ghost">
              Let's talk
            </a>
            <a href="/Asmeret_Teklu_CV.pdf" download className="btn-ghost" title="Download CV">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              CV
            </a>
          </motion.div>
          
          <motion.div variants={item} className="flex items-center gap-6 mt-8">
            <a href={person.github} target="_blank" rel="noreferrer" className="text-paper2 hover:text-gold transition-colors">
              <GithubIcon size={20} />
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="text-paper2 hover:text-gold transition-colors">
              <LinkedinIcon size={20} />
            </a>
            <a href={`mailto:${person.email}`} className="text-paper2 hover:text-gold transition-colors">
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        {/* Right Col */}
        <motion.div variants={item} className="relative z-10 flex flex-col items-center lg:items-end w-full lg:pr-8">
          {/* CMD-14: Photo Blob Frame */}
          <div className="relative group w-[280px] h-[280px] md:w-[320px] md:h-[320px] mb-12">
            
            {/* Fix #8: Radial warm gold glow behind photo */}
            <div className="absolute inset-x-[-20%] inset-y-[-20%] pointer-events-none z-[-1]" style={{ background: 'radial-gradient(ellipse, rgba(196,145,58,0.12) 0%, transparent 65%)' }}></div>

            {/* Gold border wrapper Hexagon */}
            <div
              className="absolute inset-0"
              style={{ padding: '3px', background: 'var(--gold)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            >
              <div
                className="w-full h-full overflow-hidden"
                style={{ background: 'var(--ink2)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                {/* Invisible spacer — actual image is in the next sibling */}
              </div>
            </div>
            {/* Image container with same Hexagon clip-path */}
            <div className="absolute inset-[3px] overflow-hidden flex items-center justify-center z-10" style={{ background: 'var(--ink2)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <img 
                src={person.photo} 
                alt={person.fullName}
                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="absolute inset-0 hidden items-center justify-center text-gold font-display text-7xl italic" style={{ background: 'var(--ink2)' }}>
                {person.name.first[0]}{person.name.last[0]}
              </div>
            </div>
          </div>

          {/* CMD-03: Stats with count-up. Fix #4: strict grid alignment */}
          <div className="grid grid-cols-2 items-start gap-x-12 gap-y-8 w-full max-w-[400px]" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* CMD-09: Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};

export default Hero;
