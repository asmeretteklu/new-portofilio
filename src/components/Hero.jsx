import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { person, stats } from '../data/portfolio';
import { useCountUp } from '../hooks/useCountUp';
import ScrollIndicator from './ScrollIndicator';

const GithubIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
);

const LinkedinIcon = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const StatCard = ({ stat }) => {
  const { ref, display } = useCountUp(stat.value, 1500);
  return (
    <div ref={ref} className="flex flex-col items-center">
      <span className="font-display text-3xl sm:text-4xl" style={{ fontWeight: 300, color: '#FDF6F0' }}>{display}</span>
      <span className="font-body uppercase tracking-wider" style={{ color: 'rgba(253,246,240,0.6)', fontSize: '9px' }}>{stat.label}</span>
    </div>
  );
};

/* ── Language color map (same as GitHub) ── */
const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5', Java: '#b07219',
  'C++': '#f34b7d', Go: '#00ADD8', Rust: '#dea584', Swift: '#F05138',
  Kotlin: '#A97BFF', HTML: '#e34c26', CSS: '#563d7c', Dart: '#00B4AB',
  default: 'var(--blush-mid)',
};

const getTimeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
};

const Hero = () => {
  const [currentRepo, setCurrentRepo] = useState(null);

  /* Fetch latest pushed repo from GitHub */
  useEffect(() => {
    fetch('https://api.github.com/users/asmeretteklu/repos?sort=pushed&per_page=1')
      .then(r => r.json())
      .then(data => {
        if (data[0]) {
          const repo = data[0];
          setCurrentRepo({
            name: repo.name.replace(/-/g, ' '),
            rawName: repo.name,
            language: repo.language || 'Code',
            description: repo.description || '',
            updatedAt: repo.pushed_at,
            stars: repo.stargazers_count,
            url: repo.html_url,
          });
        }
      })
      .catch(() => {
        // Fallback if offline
        setCurrentRepo({ name: 'Luna AI', rawName: 'luna', language: 'JavaScript', description: "Women's health intelligence app", updatedAt: new Date().toISOString(), stars: 0, url: person.github });
      });
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const skillTags = [
    { label: 'React & React Native', bg: 'var(--blush-light)', color: 'var(--blush-mid)' },
    { label: 'AI / ML', bg: 'var(--lavender-light)', color: 'var(--lavender)' },
    { label: 'Full-Stack', bg: 'var(--gold-light)', color: 'var(--gold)' },
    { label: 'Node.js', bg: 'var(--blush-light)', color: 'var(--blush-mid)' },
    { label: 'Python', bg: 'var(--lavender-light)', color: 'var(--lavender)' },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-28 sm:pt-24 pb-12 overflow-hidden z-10 px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto">
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-center lg:items-start"
      >
        {/* Left Col — Text */}
        <div className="flex flex-col gap-4 sm:gap-5 relative z-10 pt-4 sm:pt-8">
          {/* Name */}
          <motion.h1 variants={item} className="font-display leading-[0.92]" style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}>
            <span style={{ fontWeight: 300, color: 'var(--text)' }}>{person.name.first}</span>
            <br />
            <span className="italic" style={{ fontWeight: 400, color: 'var(--blush-mid)' }}>{person.name.last}</span>
          </motion.h1>
          
          {/* Manifesto quote */}
          <motion.blockquote 
            variants={item} 
            className="font-display italic text-base sm:text-lg leading-relaxed pl-5"
            style={{ borderLeft: '3px solid var(--blush)', color: 'var(--text-mid)', maxWidth: '38ch' }}
          >
            "I don't build for the resume. I build because someone out there needs it and isn't being seen."
          </motion.blockquote>

          {/* Currently building — LIVE from GitHub */}
          <motion.div variants={item}>
            <AnimatePresence mode="wait">
              {currentRepo ? (
                <motion.a
                  key={currentRepo.rawName}
                  href={currentRepo.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 py-2.5 px-4 rounded-xl w-fit group transition-all duration-300 no-underline"
                  style={{ background: 'var(--blush-light)', border: '0.5px solid var(--blush)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--blush-mid)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--blush)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <span className="pulse-blush inline-block w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#4ade80' }} />
                  <div className="flex flex-col min-w-0">
                    <span className="font-body text-sm truncate" style={{ color: 'var(--text)', fontWeight: 500 }}>
                      Currently building <span className="italic font-display" style={{ color: 'var(--blush-mid)' }}>{currentRepo.name}</span>
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      {currentRepo.language && (
                        <span className="flex items-center gap-1 font-body" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
                          <span className="w-2 h-2 rounded-full inline-block" style={{ background: LANG_COLORS[currentRepo.language] || LANG_COLORS.default }} />
                          {currentRepo.language}
                        </span>
                      )}
                      <span className="font-body" style={{ fontSize: '0.6rem', color: 'var(--muted)' }}>
                        · {getTimeAgo(currentRepo.updatedAt)}
                      </span>
                      {currentRepo.stars > 0 && (
                        <span className="font-body" style={{ fontSize: '0.6rem', color: 'var(--gold)' }}>
                          ★ {currentRepo.stars}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity ml-1" style={{ color: 'var(--blush-mid)' }}>↗</span>
                </motion.a>
              ) : (
                <motion.div className="flex items-center gap-2.5">
                  <span className="pulse-blush inline-block w-2 h-2 rounded-full" style={{ background: 'var(--blush-mid)' }} />
                  <span className="font-body text-sm" style={{ color: 'var(--muted)' }}>Loading from GitHub...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Skill tags */}
          <motion.div variants={item} className="flex flex-wrap gap-2 mt-1">
            {skillTags.map(tag => (
              <span 
                key={tag.label}
                className="font-body text-xs px-3 py-1.5 rounded-full"
                style={{ background: tag.bg, color: tag.color, fontWeight: 500 }}
              >
                {tag.label}
              </span>
            ))}
          </motion.div>
          
          {/* Buttons */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3 mt-3">
            <a href="#work" className="btn-primary-blush">
              View Work <span className="text-sm">↓</span>
            </a>
            <a href="#contact" className="btn-ghost">
              Let's talk
            </a>
            <a href="/Asmeret_Teklu_CV.pdf" download className="btn-ghost" title="Download CV">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              CV
            </a>
          </motion.div>
          
          {/* Social */}
          <motion.div variants={item} className="flex items-center gap-6 mt-4">
            <a href={person.github} target="_blank" rel="noreferrer" className="transition-colors" style={{ color: 'var(--muted)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--blush-mid)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              <GithubIcon size={20} />
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer" className="transition-colors" style={{ color: 'var(--muted)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--blush-mid)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              <LinkedinIcon size={20} />
            </a>
            <a href={`mailto:${person.email}`} className="transition-colors" style={{ color: 'var(--muted)' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--blush-mid)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>
              <Mail size={20} />
            </a>
          </motion.div>
        </div>

        {/* Right Col — Photo */}
        <motion.div variants={item} className="relative z-10 flex flex-col items-center lg:items-end w-full lg:pr-8">
          <div className="relative group w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] mb-8 sm:mb-12">
            
            {/* Decorative blobs */}
            <div className="absolute -top-12 -left-12 w-[200px] h-[200px] rounded-full pointer-events-none z-[-1]" style={{ background: 'rgba(245,196,211,0.3)', filter: 'blur(60px)' }} />
            <div className="absolute -bottom-8 -right-8 w-[160px] h-[160px] rounded-full pointer-events-none z-[-1]" style={{ background: 'rgba(201,169,110,0.25)', filter: 'blur(50px)' }} />

            {/* Main hexagon photo */}
            <div className="absolute inset-0" style={{ padding: '3px', background: 'var(--blush-mid)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <div className="w-full h-full overflow-hidden" style={{ background: 'var(--bg)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            </div>
            <div className="absolute inset-[3px] overflow-hidden flex items-center justify-center z-10" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <img src={person.photo} alt={person.fullName} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              <div className="absolute inset-0 hidden items-center justify-center font-display text-7xl italic" style={{ background: 'var(--blush-light)', color: 'var(--blush-mid)' }}>
                {person.name.first[0]}{person.name.last[0]}
              </div>
            </div>

            {/* Second candid photo — pill */}
            <div className="absolute -bottom-4 -left-4 sm:-left-6 z-20 overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105" style={{ width: '90px', height: '115px', borderRadius: '50px', border: '3px solid white', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
              <img src="/photo2.jpg" alt={`${person.fullName} candid`} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
              <div className="absolute inset-0 hidden items-center justify-center font-display text-2xl italic" style={{ background: 'var(--blush-light)', color: 'var(--blush-mid)' }}>✦</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-10 sm:mt-16 w-full rounded-2xl py-6 sm:py-8 px-4 sm:px-8 flex justify-center gap-8 sm:gap-16"
        style={{ background: 'var(--dark)' }}
      >
        {stats.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </motion.div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
