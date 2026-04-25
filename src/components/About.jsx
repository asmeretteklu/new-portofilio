import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { academicTimeline } from '../data/portfolio';

const About = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-10"
        >
          <div>
            <div className="section-label mb-4">My Story</div>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
              Where I'm <span className="italic" style={{ color: 'var(--blush-mid)' }}>from</span> ✦
            </h2>
            <p className="font-display italic text-lg mt-3 mb-8" style={{ color: 'var(--text-mid)' }}>
              Mekelle raised me. Software is how I give back.
            </p>
            
            <div className="space-y-5 font-display text-xl md:text-2xl leading-relaxed" style={{ color: 'var(--text-mid)' }}>
              <div className="relative">
                <span
                  className="absolute -top-4 -left-2 font-display pointer-events-none select-none"
                  style={{ fontSize: '7rem', opacity: 0.08, lineHeight: 1, color: 'var(--blush-mid)' }}
                >
                  "
                </span>
                <p className="relative z-10">
                  I don't just write code; I build systems that survive. Growing up in Mekelle, I learned that technology isn't a luxury—it's a lifeline. When the power went out, I wrote logic on paper. When the internet cut, I focused on local-first architectures.
                </p>
              </div>
              <p>
                Today, I use those lessons to build AI and full-stack platforms that are as resilient as the people using them. 
              </p>
              <p>
                Whether it's optimizing a registration system at Microlink or architecting Luna AI, my work is driven by the conviction that the best software is deeply contextual and built to last.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-10" style={{ borderTop: '0.5px solid var(--taupe)' }}>
            <div>
              <div className="section-label mb-5">Education</div>
              <div className="flex flex-col gap-2">
                <h4 className="font-body text-lg" style={{ color: 'var(--text)', fontWeight: 500 }}>BSc, Software Engineering</h4>
                <p className="font-display flex items-center gap-1" style={{ color: 'var(--text-mid)' }}>
                  Microlink IT College, Mekelle
                  <span style={{ color: 'var(--blush-mid)', fontSize: '0.75rem' }}>↗</span>
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-display italic" style={{ fontSize: '0.9rem', color: 'var(--blush-mid)' }}>Great Distinction</span>
                </div>
              </div>
              <p className="font-display italic mt-5" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                est. August 2025 · Mekelle, Ethiopia ✦
              </p>
            </div>
            
            <div>
              <div className="section-label mb-5">Languages</div>
              <ul className="flex flex-col gap-3 font-body" style={{ color: 'var(--text-mid)' }}>
                <li className="flex justify-between items-center group">
                  <span className="group-hover:text-blush-mid transition-colors"  style={{ color: 'var(--text)' }}>Tigrigna</span>
                  <span className="font-body uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--muted)' }}>Native</span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="group-hover:text-blush-mid transition-colors" style={{ color: 'var(--text)' }}>English</span>
                  <span className="font-body uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--muted)' }}>Fluent</span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="group-hover:text-blush-mid transition-colors" style={{ color: 'var(--text)' }}>Amharic</span>
                  <span className="font-body uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.08em', color: 'var(--muted)' }}>Conversational</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Research Interests */}
          <div className="pt-6" style={{ borderTop: '0.5px solid var(--taupe)' }}>
            <div className="section-label mb-5">Research Interests</div>
            <div className="flex flex-wrap gap-2">
              {['AI for Social Good', 'Women\'s Health Tech', 'HCI', 'Culturally-Adaptive Systems'].map(interest => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full font-body"
                  style={{
                    fontSize: '0.78rem',
                    background: 'var(--lavender-light)',
                    border: '0.5px solid rgba(159,139,189,0.3)',
                    color: 'var(--lavender)',
                    fontWeight: 500,
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Academic Timeline */}
          <div className="mt-4 pt-10" style={{ borderTop: '0.5px solid var(--taupe)' }}>
            <div className="section-label mb-3">Academic Progression</div>
            <p className="font-body text-sm mb-10" style={{ color: 'var(--muted)' }}>
              I got stronger every year — through conflict.
            </p>
            <div className="relative flex flex-col md:flex-row justify-between items-end gap-4 md:gap-0 w-full px-2">
              <div className="hidden md:block absolute top-[52px] left-0 w-full h-[0.5px] z-0" style={{ background: 'var(--taupe)' }} />
              
              {academicTimeline.map((item, i) => {
                const isFinal = i === academicTimeline.length - 1;
                return (
                  <div key={i} className="flex md:flex-col items-center md:items-start gap-6 relative z-10 w-full md:w-auto pb-6 md:pb-0 last:border-0 group" style={{ borderBottom: 'none' }}>
                    <div className="flex flex-col md:mb-4 w-24 md:w-auto">
                      <span className="font-body" style={{ color: 'var(--text)', fontWeight: 500 }}>{item.year}</span>
                      <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.08em', color: 'var(--muted)' }}>{item.semester}</span>
                    </div>
                    <div className="hidden md:flex w-3 h-3 rounded-full outline outline-4 transition-colors relative z-10" style={{ background: isFinal ? 'var(--blush-mid)' : 'var(--taupe)', outlineColor: 'var(--bg)' }} />
                    <div className="ml-auto md:ml-0 flex flex-col items-end md:items-start md:mt-4">
                      <span className={`font-display text-3xl md:text-4xl ${isFinal ? '' : 'group-hover:text-blush-mid transition-colors'}`} style={{ color: isFinal ? 'var(--blush-mid)' : 'var(--text)' }}>{item.gpa}</span>
                      {item.distinction && <span className="font-display italic text-sm mt-1 max-w-[100px] leading-tight" style={{ color: 'var(--blush-mid)' }}>{item.distinction}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
