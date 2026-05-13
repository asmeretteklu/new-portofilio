import { motion } from 'framer-motion';
import { skills, certifications, businessImpact } from '../data/portfolio';
import { Code2, Layout, Database, Sparkles, Trophy, Zap } from 'lucide-react';

const SKILL_ICONS = {
  'Languages & Core': Code2,
  'Frontend & Mobile': Layout,
  'Backend & Database': Database,
  'AI & Tools': Sparkles
};

const SkillGroup = ({ group, index }) => {
  const Icon = SKILL_ICONS[group.group] || Code2;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="space-y-6 group/group"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[var(--accent-light)] flex items-center justify-center transition-transform group-hover/group:rotate-12">
          <Icon className="w-5 h-5 text-[var(--accent)]" />
        </div>
        <h3 className="font-display text-2xl font-light whitespace-nowrap">{group.group}</h3>
        <div className="h-px w-full bg-[var(--border)] origin-left scale-x-0 group-hover/group:scale-x-100 transition-transform duration-700" />
      </div>
      <div className="flex flex-wrap gap-3">
        {group.items.map((item) => (
          <motion.div 
            key={item}
            whileHover={{ scale: 1.05, y: -2 }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-[14px] bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)] transition-all duration-300 shadow-sm hover:shadow-[0_4px_20px_rgba(224,163,135,0.15)] cursor-default group/pill overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent)]/5 to-transparent -translate-x-full group-hover/pill:translate-x-full transition-transform duration-1000" />
            
            <div className="relative w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] group-hover/pill:bg-[var(--accent)] group-hover/pill:shadow-[0_0_8px_var(--accent)] transition-all duration-300" />
            
            <span className="relative z-10 text-[11px] font-body uppercase tracking-[0.15em] text-[var(--text-mid)] group-hover/pill:text-[var(--accent)] font-medium transition-colors duration-300">
              {item}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[1fr_1.8fr] gap-20 lg:gap-32">
        {/* Left Column: Contextual Data */}
        <div className="space-y-16">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-8 bg-[var(--accent)]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--accent)] font-bold">The Ecosystem</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-6xl md:text-8xl leading-[0.9] font-light"
            >
              My Stack <br />
              <span className="italic font-normal text-[var(--accent)] ml-8 md:ml-16">& Tools</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-12 pt-4">
            {/* Project Leadership */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-bold">Impact</h3>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {businessImpact.map((item) => (
                  <div key={item.label} className="group flex flex-col">
                    <div className="flex items-end gap-2">
                      <span className="font-display text-4xl text-[var(--accent)] group-hover:italic transition-all leading-none">{item.metric}</span>
                      <div className="h-px flex-1 bg-[var(--border)] mb-1" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-2 font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Credentials */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <Trophy className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-bold">Validation</h3>
              </div>
              <div className="space-y-6">
                {certifications.slice(0, 3).map((cert) => (
                  <div key={cert.name} className="relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-[var(--accent)] before:to-transparent">
                    <p className="font-display text-lg leading-tight font-medium">{cert.name}</p>
                    <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] mt-1">{cert.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Skills Map */}
        <div className="space-y-16 lg:pt-12">
          {skills.map((group, idx) => (
            <SkillGroup key={group.group} group={group} index={idx} />
          ))}
          
          {/* Smart Status Note */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-8 rounded-3xl bg-[var(--accent-light)] border border-[var(--border)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
              <Zap className="w-12 h-12 text-[var(--accent)]" />
            </div>
            <p className="font-body text-sm text-[var(--accent)] leading-relaxed font-light italic">
              "Currently specializing in bilingual AI architectures (Tigrinya/English) and offline-first mobile synchronization systems for resilient deployments."
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

