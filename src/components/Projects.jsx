import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useMagneticTilt } from '../hooks/useMagneticTilt';
import { projects } from '../data/portfolio';

const ProjectCard = ({ project, index }) => {
  const tiltRef = useMagneticTilt();

  const descParts = project.name.split(project.accent);

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex flex-col p-8 gap-6 transition-colors duration-500 bg-ink2/30 backdrop-blur-xl border border-border/40 hover:border-t-2 hover:border-t-gold hover:shadow-[0_0_30px_rgba(196,145,58,0.15)] rounded-xl ${
        project.featured ? 'md:col-span-2' : 'col-span-1'
      }`}
      style={{ perspective: '900px' }}
    >
      <div className="flex justify-between items-start w-full">
        <h3 className="font-display text-4xl text-paper">
          {descParts[0]}
          {project.accent && <span className="italic text-gold">{project.accent}</span>}
          {descParts[1]}
        </h3>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-ink2 border border-border rounded-full group-hover:border-gold/50 transition-colors shrink-0 mt-1">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.status === 'live' ? 'bg-[#4ade80]' : 'bg-gold'}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${project.status === 'live' ? 'bg-[#4ade80]' : 'bg-gold'}`}></span>
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-paper2">
            {project.statusLabel}
          </span>
        </div>
      </div>

      <p className="font-ui text-paper2 leading-relaxed flex-grow">
        {project.description}
      </p>

      {project.metrics.length > 0 && (
        <div className="flex flex-wrap gap-x-8 gap-y-4 py-4 border-y border-border/30">
          {project.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-display text-gold-light" style={{ fontSize: '1.8rem' }}>{metric.value}</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-paper2">{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tags.map(tag => (
          <span key={tag} className="glass font-mono text-[0.65rem] px-2 py-1 text-paper2 uppercase tracking-wide group-hover:border-gold/30 transition-colors">
            {tag}
          </span>
        ))}
      </div>

      {/* Hover arrow */}
      <span className="absolute bottom-4 right-4 font-display text-gold text-xl opacity-0 translate-x-[-8px] group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300">
        →
      </span>
    </motion.div>
  );
};

const Projects = () => {
  const { ref, controls, variants } = useScrollReveal();

  return (
    <section id="work" className="py-32 bg-ink">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 block">// SELECTED WORK</span>
          <h2 className="font-display text-5xl md:text-6xl text-paper">
            Things I've <span className="italic text-gold">actually built</span> ✦
          </h2>
          <p className="font-display text-lg text-paper2 mt-4 max-w-2xl leading-relaxed">
            Every project here is deployed, used by real people, solving a real problem.
          </p>
        </motion.div>

        {/* projects-mobile-scroll class for horizontal scroll on mobile */}
        <div className="projects-mobile-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        {/* Swipe hint for mobile */}
        <p className="block md:hidden text-center font-mono text-paper2/40 mt-3" style={{ fontSize: '0.6rem' }}>
          ← swipe →
        </p>

      </div>
    </section>
  );
};

export default Projects;
