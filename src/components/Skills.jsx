import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { skills, certifications, businessImpact, digitalMarketingCreds } from '../data/portfolio';

const Skills = () => {
  const { ref, controls, variants } = useScrollReveal();
  const [showAllSkills, setShowAllSkills] = useState(false);

  const displayedSkills = showAllSkills ? skills : skills.slice(0, 4);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-12"
        >
          {/* Certificate 2: Floating Credential Badge positioned here per Command 02 */}
          <div className="flex justify-start mb-[-2rem] relative z-20">
            <motion.div 
              whileHover={{ boxShadow: '0 0 20px rgba(196,145,58,0.15)' }}
              className="inline-flex items-center"
              style={{
                background: 'rgba(196,145,58,0.08)',
                border: '1px solid rgba(196,145,58,0.3)',
                borderRadius: '100px',
                padding: '0.75rem 1.25rem',
                gap: '12px',
                transition: 'all 0.3s ease',
                cursor: 'default'
              }}
            >
              <div style={{ fontSize: '1.2rem' }}>🏆</div>
              <div className="flex flex-col">
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.82rem', color: 'var(--paper)', lineHeight: 1.2 }}>
                  5 Million Ethiopian Coders
                </span>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.6rem', color: 'var(--muted)', marginTop: '2px' }}>
                  AI & Fundamental Programming · 2023
                </span>
              </div>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '0.58rem', color: 'var(--gold)', marginLeft: '8px' }}>
                Verified ✦
              </div>
            </motion.div>
          </div>

          {/* Theme-responsive section card */}
          <div 
            className="rounded-3xl p-8 md:p-12 relative overflow-hidden transition-colors duration-300" 
            style={{ 
              background: 'var(--card-bg)', 
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)', 
              border: '1px solid var(--card-border)' 
            }}
          >
            <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] rounded-full filter blur-[80px] opacity-20 pointer-events-none" style={{ background: 'var(--blush-mid)' }}></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[300px] h-[300px] rounded-full filter blur-[80px] opacity-10 pointer-events-none" style={{ background: 'var(--gold)' }}></div>
            
            <div className="mb-10 relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-body uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--blush-mid)', fontWeight: 500 }}>Capabilities</span>
                <div className="flex-1 h-[0.5px]" style={{ background: 'var(--blush)', opacity: 0.3 }} />
              </div>
              <h2 className="font-display text-4xl md:text-5xl mb-2" style={{ color: 'var(--text)' }}>
                How I <span className="italic" style={{ color: 'var(--blush-mid)' }}>build</span> ✦
              </h2>
              <p className="font-body text-sm" style={{ color: 'var(--muted)' }}>
                A software engineer who writes, leads, designs, and ships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative z-10">
              <AnimatePresence>
                {displayedSkills.map((skillGroup, idx) => {
                  return (
                    <motion.div 
                      key={skillGroup.group}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className={`skill-group ${skillGroup.type || ''}`}
                    >
                      <h3 className="skill-group-name">
                        {skillGroup.group}
                      </h3>
                      <div className="flex flex-col">
                        {skillGroup.items.map((item, i) => (
                          <div key={i} className="skill-item">
                            {item}{i < skillGroup.items.length - 1 ? ',' : ''}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="mt-10 flex justify-center relative z-10">
              <button 
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="font-body uppercase px-6 py-3 rounded-full transition-all duration-300"
                style={{ 
                  fontSize: '0.7rem', 
                  letterSpacing: '0.1em',
                  color: 'var(--paper)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                {showAllSkills ? "Show less ✦" : "Show all skills ✦"}
              </button>
            </div>
          </div>

          {/* Certifications & Business Impact — outside dark card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
            <div>
              <div className="section-label mb-6">Certifications & Programs</div>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, i) => (
                  <motion.div 
                    key={i} 
                    className="rounded-[10px] transition-all duration-200 relative overflow-hidden group cursor-default"
                    style={{ 
                      background: cert.cardBg || '#1a1626', 
                      border: '1px solid rgba(196,145,58,0.12)',
                      borderLeft: `3px solid ${cert.borderColor || 'rgba(196,145,58,0.12)'}`,
                      padding: '1.25rem 1.5rem',
                    }}
                    whileHover={{ 
                      y: -2,
                      background: 'rgba(196,145,58,0.05)',
                      borderColor: 'rgba(196,145,58,0.28)',
                      borderLeftColor: cert.borderColor || 'rgba(196,145,58,0.28)'
                    }}
                  >
                    {cert.badge && (
                      <div className="absolute top-4 right-4 font-body uppercase" style={{
                        background: cert.badgeBg,
                        color: cert.badgeColor,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.55rem',
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: '0.06em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {cert.pulse && (
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: cert.badgeColor, animation: 'pulse 2s infinite' }} />
                        )}
                        {cert.badge}
                      </div>
                    )}
                    <h4 className="font-display font-bold text-[0.9rem] mb-1" style={{ color: 'var(--paper)', fontFamily: "'Syne', sans-serif" }}>
                      {cert.name}
                    </h4>
                    <p className="font-body mt-1" style={{ color: 'var(--paper3)', fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.06em' }}>
                      {cert.detail}
                    </p>
                  </motion.div>
                ))}

                {/* Digital & Marketing Credentials Sub-section */}
                <div className="mt-4 mb-2">
                  <div className="font-body uppercase text-xs" style={{ color: 'var(--teal)', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="w-4 h-px bg-[var(--teal)] opacity-50"></span>
                    Digital & Marketing Credentials
                  </div>
                </div>
                
                {digitalMarketingCreds.map((cred, i) => (
                  <motion.div 
                    key={`dm-${i}`}
                    className="rounded-[10px] transition-all duration-200 relative overflow-hidden group cursor-default"
                    style={{ 
                      background: 'rgba(80,200,180,0.04)', 
                      border: '1px solid rgba(80,200,180,0.12)',
                      borderLeft: '3px solid var(--teal)',
                      padding: '1.25rem 1.5rem',
                    }}
                    whileHover={{ 
                      y: -2,
                      background: 'rgba(80,200,180,0.08)',
                      borderColor: 'rgba(80,200,180,0.28)',
                    }}
                  >
                    <div className="absolute top-4 right-4 font-body uppercase" style={{
                      background: 'rgba(80,200,180,0.12)',
                      color: 'var(--teal)',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.55rem',
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: '0.06em',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      MARKETING ✦
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cred.icon}</span>
                      <div>
                        <h4 className="font-display font-bold text-[0.9rem] mb-1" style={{ color: 'var(--paper)', fontFamily: "'Syne', sans-serif" }}>
                          {cred.name}
                        </h4>
                        <p className="font-body mt-1" style={{ color: 'var(--paper3)', fontFamily: "'DM Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.06em' }}>
                          {cred.issuer} · {cred.year}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="section-label mb-6">Business Impact</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {businessImpact.map((item, i) => (
                  <div 
                    key={i} 
                    className="p-5 rounded-2xl transition-all duration-300"
                    style={{ background: 'var(--card-bg)', border: '0.5px solid var(--card-border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.border = '0.5px solid var(--blush-mid)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.border = '0.5px solid var(--card-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <span className="font-display text-3xl block mb-1" style={{ color: 'var(--blush-mid)' }}>{item.metric}</span>
                    <h4 className="font-body text-sm mb-0.5" style={{ color: 'var(--text)', fontWeight: 500 }}>{item.label}</h4>
                    <p className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--blush-mid)' }}>{item.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
