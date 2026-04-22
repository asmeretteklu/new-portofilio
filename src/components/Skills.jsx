import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { skills, certifications, businessImpact } from '../data/portfolio';

const GROUP_COLORS = {
  'Frontend': { bg: 'rgba(245,196,211,0.15)', border: 'rgba(237,147,177,0.3)', text: 'var(--blush-mid)' },
  'Backend & Database': { bg: 'rgba(201,169,110,0.12)', border: 'rgba(201,169,110,0.3)', text: 'var(--gold)' },
  'AI & Systems': { bg: 'rgba(159,139,189,0.12)', border: 'rgba(159,139,189,0.3)', text: 'var(--lavender)' },
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
          {/* Dark section card */}
          <div className="rounded-3xl p-8 md:p-12" style={{ background: 'var(--dark)' }}>
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-body uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'var(--blush-mid)', fontWeight: 500 }}>Capabilities</span>
                <div className="flex-1 h-[0.5px]" style={{ background: 'rgba(237,147,177,0.3)' }} />
              </div>
              <h2 className="font-display text-4xl md:text-5xl" style={{ color: '#FDF6F0' }}>
                The <span className="italic" style={{ color: 'var(--blush-mid)' }}>stack</span> ✦
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {skills.map((skillGroup, idx) => {
                const colors = GROUP_COLORS[skillGroup.group] || GROUP_COLORS['Frontend'];
                return (
                  <div key={idx} className="flex flex-col gap-4">
                    <h3 className="font-body text-lg pb-3" style={{ color: '#FDF6F0', borderBottom: '0.5px solid rgba(255,255,255,0.1)', fontWeight: 500 }}>
                      {skillGroup.group}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item, i) => (
                        <span 
                          key={i} 
                          className="skill-item font-body text-sm px-3 py-1.5 rounded-full cursor-default"
                          style={{ 
                            background: colors.bg, 
                            border: `0.5px solid ${colors.border}`, 
                            color: colors.text,
                            fontWeight: 400,
                          }}
                        >
                          {item}
                        </span>
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
              <div className="flex flex-col gap-4">
                {certifications.map((cert, i) => (
                  <div key={i} className="group cursor-default">
                    <h4 className="font-body transition-colors duration-300" style={{ fontSize: '1rem', color: 'var(--text)', fontWeight: 500 }}>{cert.name}</h4>
                    <p className="font-display mt-0.5" style={{ color: 'var(--text-mid)', opacity: 0.8 }}>{cert.detail}</p>
                  </div>
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
