import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { skills, certifications, businessImpact } from '../data/portfolio';

const Skills = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section id="skills" className="py-32 bg-ink relative overflow-hidden">
      {/* Ambient teal glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none" style={{ background: 'rgba(45,154,130,0.06)' }} />
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-16"
        >
          {/* Header */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 block">// CAPABILITIES</span>
            <h2 className="font-display text-5xl md:text-6xl text-paper">
              The <span className="italic text-gold">stack</span> ✦
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Skills Columns */}
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="flex flex-col gap-6">
                <h3 className="font-ui text-xl text-paper border-b border-border/30 pb-4">
                  {skillGroup.group}
                </h3>
                <ul className="flex flex-col gap-3">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="skill-item font-mono text-sm text-paper2 uppercase tracking-wide flex items-center gap-2 group cursor-default">
                      <span className="w-1.5 h-1.5 bg-border rounded-full group-hover:bg-gold transition-colors"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Split Row: Certifications & Business Impact */}
          <div className="mt-12 pt-16 border-t border-border/20 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-gold mb-8">Certifications & Programs</h3>
              <div className="flex flex-col gap-5">
                {certifications.map((cert, i) => (
                  <div key={i} className="group cursor-default">
                    <h4 className="font-ui text-lg text-paper group-hover:text-gold transition-colors duration-300">{cert.name}</h4>
                    <p className="font-display text-paper2 mt-1 opacity-80">{cert.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-mono text-sm uppercase tracking-widest text-gold mb-8">Business Impact</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {businessImpact.map((item, i) => (
                  <div key={i} className="p-5 border border-border/30 rounded-xl bg-ink2/20 backdrop-blur-sm group hover:border-gold/50 transition-colors">
                    <span className="font-display text-4xl text-paper group-hover:text-gold transition-colors block mb-2">{item.metric}</span>
                    <h4 className="font-ui text-sm text-paper mb-1">{item.label}</h4>
                    <p className="font-mono text-[0.65rem] text-gold uppercase tracking-widest">{item.sub}</p>
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
