import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { academicTimeline } from '../data/portfolio';
import CrescentDecoration from './CrescentDecoration';

const About = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section id="about" className="py-32 bg-ink2 border-t border-border/30 relative overflow-hidden">
      {/* Crescent moon decoration */}
      <CrescentDecoration section="about" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-12"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 block">// MY STORY</span>
            <h2 className="font-display text-5xl md:text-6xl text-paper mb-8">
              A builder from <span className="italic text-gold">Tigray</span>
            </h2>
            
            <div className="space-y-6 font-display text-xl md:text-2xl text-paper2 leading-relaxed">
              {/* Large decorative quote mark */}
              <div className="relative">
                <span
                  className="absolute -top-4 -left-2 font-display text-gold pointer-events-none select-none"
                  style={{ fontSize: '9rem', opacity: 0.15, lineHeight: 1 }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-border/20">
            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-gold mb-6 border-b border-border/30 pb-2">Education</h3>
              <div className="flex flex-col gap-2">
                <h4 className="font-ui text-lg text-paper">BSc, Software Engineering</h4>
                <p className="font-display text-paper2 flex items-center gap-1">
                  Microlink IT College, Mekelle
                  <span className="text-gold text-xs">↗</span>
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-sm text-gold italic font-display">Great Distinction</span>
                </div>
              </div>

              {/* Human detail note */}
              <p className="font-display italic text-paper3 mt-6" style={{ fontSize: '0.9rem' }}>
                est. August 2025 · Mekelle, Ethiopia ✦
              </p>
            </div>
            
            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-gold mb-6 border-b border-border/30 pb-2">Languages</h3>
              <ul className="flex flex-col gap-4 font-ui text-paper2">
                <li className="flex justify-between items-center group">
                  <span className="group-hover:text-gold transition-colors">Tigrigna</span>
                  <span className="font-mono text-xs text-border-hover uppercase tracking-widest">Native</span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="group-hover:text-gold transition-colors">English</span>
                  <span className="font-mono text-xs text-border-hover uppercase tracking-widest">Fluent</span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="group-hover:text-gold transition-colors">Amharic</span>
                  <span className="font-mono text-xs text-border-hover uppercase tracking-widest">Conversational</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Research Interests */}
          <div className="pt-8 border-t border-border/20">
            <h3 className="font-mono text-sm uppercase tracking-widest text-gold mb-6">Research Interests</h3>
            <div className="flex flex-wrap gap-2">
              {['AI for Social Good', 'Women\'s Health Tech', 'HCI', 'Culturally-Adaptive Systems'].map(interest => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full font-mono text-[0.72rem] uppercase tracking-wider border transition-colors"
                  style={{
                    background: 'var(--lavender-pale)',
                    borderColor: 'rgba(155,137,196,0.3)',
                    color: 'var(--lavender)',
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Academic Timeline */}
          <div className="mt-8 pt-16 border-t border-border/20">
            <h3 className="font-mono text-sm uppercase tracking-widest text-gold mb-4 text-center md:text-left">
              She got stronger every year — through conflict.
            </h3>
            <p className="font-mono text-xs text-paper2/50 mb-12 text-center md:text-left uppercase tracking-widest">Academic Progression</p>
            <div className="relative flex flex-col md:flex-row justify-between items-end gap-4 md:gap-0 w-full px-2">
              {/* Horizontal Line Desktop */}
              <div className="hidden md:block absolute top-[52px] left-0 w-full h-[1px] bg-border/50 z-0"></div>
              
              {academicTimeline.map((item, i) => {
                const isFinal = i === academicTimeline.length - 1;
                return (
                  <div key={i} className="flex md:flex-col items-center md:items-start gap-6 relative z-10 w-full md:w-auto pb-6 md:pb-0 border-b md:border-b-0 border-border/30 last:border-0 group">
                    <div className="flex flex-col md:mb-4 w-24 md:w-auto">
                      <span className="font-ui text-paper mb-0.5">{item.year}</span>
                      <span className="font-mono text-[0.65rem] text-paper2 uppercase tracking-widest">{item.semester}</span>
                    </div>
                    {/* Node on line */}
                    <div className="hidden md:flex w-3 h-3 rounded-full outline outline-4 outline-ink2 transition-colors group-hover:bg-gold relative z-10" style={{ background: isFinal ? 'var(--gold)' : 'var(--border)' }}></div>
                    {/* GPA */}
                    <div className="ml-auto md:ml-0 flex flex-col items-end md:items-start md:mt-4">
                      <span className={`font-display text-3xl md:text-4xl ${isFinal ? 'text-gold' : 'text-paper group-hover:text-gold transition-colors'}`}>{item.gpa}</span>
                      {item.distinction && <span className="font-display italic text-sm text-gold mt-1 max-w-[100px] leading-tight desktop-distinction">{item.distinction}</span>}
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
