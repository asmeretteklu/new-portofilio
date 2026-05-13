import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { GithubIcon as Github } from './SocialIcons';
import { projects } from '../data/portfolio';

const PROJECT_ICONS = {
  luna: '🌙',
  keno: '🎰',
  registration: '🎓',
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] transition-all duration-500 flex flex-col shadow-sm"
    >
      <div className="p-8 h-full flex flex-col space-y-6">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center text-2xl">
            {PROJECT_ICONS[project.id] || '✦'}
          </div>
          <div className="flex gap-2">
            <a href={project.github || '#'} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-[var(--accent-light)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors" title="View Source">
              <Github className="w-4 h-4" />
            </a>
            <a href={project.demo || '#'} target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-[var(--accent-light)] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors" title="Live Demo">
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl font-light tracking-tight">{project.name}</h3>
              {project.status === 'live' && (
                <span className="text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[var(--accent)] text-[var(--onyx)] font-bold">Live</span>
              )}
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-bold opacity-80">{project.statusLabel}</p>
          </div>
          
          <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed line-clamp-4 font-light">
            {project.description}
          </p>

          <div className="grid grid-cols-2 gap-6 py-6 border-y border-[var(--border)]">
            {project.metrics?.map((metric, i) => (
              <div key={i} className="flex flex-col space-y-1">
                <span className="text-xl font-display text-[var(--accent)] leading-none">{metric.value}</span>
                <span className="text-[9px] uppercase tracking-wider text-[var(--text-muted)] font-medium">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 space-y-6">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] font-mono text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                #{tag.replace(/\s+/g, '').toLowerCase()}
              </span>
            ))}
          </div>
          
          <a href={project.demo || '#'} className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
            Project Details <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="work" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-8 bg-[var(--accent)]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--accent)] font-bold">The Portfolio</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl leading-none font-light"
          >
            Engineering <br />
            <span className="italic font-normal text-[var(--accent)]">with Intent</span>
          </motion.h2>
        </div>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-[var(--text-muted)] max-w-xs leading-relaxed font-light text-sm"
        >
          A selection of production-grade systems, automated college infrastructures, and AI health solutions.
        </motion.p>
      </div>

      <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 snap-x snap-mandatory scrollbar-hide">
        {projects.map((project, idx) => (
          <div key={project.id} className="min-w-[85vw] md:min-w-0 snap-center">
            <ProjectCard project={project} index={idx} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;


