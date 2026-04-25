import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { skills, certifications, businessImpact } from '../data/portfolio';

const GROUP_COLORS = {
  'Frontend': { bg: 'rgba(245,196,211,0.15)', border: 'rgba(237,147,177,0.3)', text: 'var(--blush-mid)' },
  'Backend & Database': { bg: 'rgba(201,169,110,0.12)', border: 'rgba(201,169,110,0.3)', text: 'var(--gold)' },
  'AI & Systems': { bg: 'rgba(159,139,189,0.12)', border: 'rgba(159,139,189,0.3)', text: 'var(--lavender)' },
  'Smart Tools': { bg: 'rgba(80,200,180,0.12)', border: 'rgba(80,200,180,0.3)', text: 'var(--teal)' },
};

const Skills = () => {
  const { ref, controls, variants } = useScrollReveal();

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
              <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
                How I <span className="italic" style={{ color: 'var(--blush-mid)' }}>build</span> ✦
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 relative z-10">
              {skills.map((skillGroup, idx) => {
                const colors = GROUP_COLORS[skillGroup.group] || GROUP_COLORS['Frontend'];
                return (
                  <div key={idx} className="flex flex-col gap-4">
                    <h3 className="font-body text-lg pb-3" style={{ color: 'var(--text)', borderBottom: '0.5px solid var(--card-border)', fontWeight: 500 }}>
                      {skillGroup.group}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item, i) => (
                        <motion.span 
                          key={i} 
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          className="font-body text-sm px-4 py-2 rounded-full cursor-pointer relative overflow-hidden"
                          style={{ 
                            background: colors.bg, 
                            border: `0.5px solid ${colors.border}`, 
                            color: colors.text,
                            fontWeight: 400,
                            boxShadow: `0 4px 12px ${colors.bg}`
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                );
              })}
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
