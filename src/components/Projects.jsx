import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { projects } from '../data/portfolio';

const PROJECT_ICONS = {
  luna: '🌙',
  keno: '🎰',
  ethiomarket: '🛍️',
  registration: '🎓',
  moodnotes: '🎵',
  codecollab: '💻',
  unfooler: '🔍',
};

const PROJECT_WHY = {
  luna: "Because the women I love deserved better health access.",
  keno: "Because real-time systems should just work — for every role.",
  ethiomarket: "Because Ethiopian artisans deserve a global storefront.",
  registration: "Because no student should wait 7 days to enroll.",
  moodnotes: "Because your playlist should match how you actually feel.",
  codecollab: "Because Mekelle's blackouts shouldn't stop collaboration.",
  unfooler: "Because authenticity online shouldn't be this hard to find.",
};

const ICON_COLORS = {
  luna: 'var(--blush-light)',
  keno: 'var(--lavender-light)',
  ethiomarket: 'var(--gold-light)',
  registration: 'var(--blush-light)',
  moodnotes: 'var(--lavender-light)',
  codecollab: 'var(--gold-light)',
  unfooler: 'var(--blush-light)',
};

const ProjectCard = ({ project, index }) => {
  const descParts = project.name.split(project.accent);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
      className="group relative flex flex-col p-7 gap-5 rounded-2xl transition-all duration-300"
      style={{
        background: 'var(--card-bg)',
        border: '0.5px solid var(--card-border)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = '0.5px solid var(--blush-mid)';
        e.currentTarget.style.background = 'var(--blush-light)';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(237,147,177,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = '0.5px solid var(--card-border)';
        e.currentTarget.style.background = 'var(--card-bg)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Icon box */}
      <div 
        className="w-10 h-10 rounded-[10px] flex items-center justify-center text-lg"
        style={{ background: ICON_COLORS[project.id] || 'var(--blush-light)' }}
      >
        {PROJECT_ICONS[project.id] || '✦'}
      </div>

      <div className="flex justify-between items-start w-full">
        <div>
          <h3 className="font-display" style={{ fontSize: '1.25rem', color: 'var(--text)' }}>
            {descParts[0]}
            {project.accent && <span className="italic" style={{ color: 'var(--blush-mid)' }}>{project.accent}</span>}
            {descParts[1]}
          </h3>
          {/* Personal "why I built this" */}
          <p className="font-display italic mt-1" style={{ fontSize: '0.85rem', color: 'var(--blush-mid)' }}>
            {PROJECT_WHY[project.id] || ''}
          </p>
        </div>
        
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full shrink-0 mt-1" style={{ background: 'var(--blush-light)', border: '0.5px solid var(--blush)' }}>
          <span className="relative flex h-1.5 w-1.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${project.status === 'live' ? 'bg-[#4ade80]' : ''}`} style={project.status !== 'live' ? { background: 'var(--gold)' } : {}} />
            <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${project.status === 'live' ? 'bg-[#4ade80]' : ''}`} style={project.status !== 'live' ? { background: 'var(--gold)' } : {}} />
          </span>
          <span className="font-body uppercase" style={{ fontSize: '0.55rem', letterSpacing: '0.06em', color: 'var(--muted)' }}>
            {project.statusLabel}
          </span>
        </div>
      </div>

      <p className="font-body leading-relaxed flex-grow" style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>
        {project.description}
      </p>

      {project.metrics.length > 0 && (
        <div className="flex flex-wrap gap-x-8 gap-y-3 py-3" style={{ borderTop: '0.5px solid var(--taupe)', borderBottom: '0.5px solid var(--taupe)' }}>
          {project.metrics.map((metric, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-display" style={{ fontSize: '1.5rem', color: 'var(--blush-mid)' }}>{metric.value}</span>
              <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.06em', color: 'var(--muted)' }}>{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
        {project.tags.map(tag => (
          <span key={tag} className="font-body uppercase rounded-md px-2 py-1" style={{ fontSize: '0.6rem', letterSpacing: '0.04em', background: 'var(--blush-light)', color: 'var(--muted)', border: '0.5px solid var(--blush)' }}>
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const { ref, controls, variants } = useScrollReveal();
  const nonLunaProjects = projects.filter(p => p.id !== 'luna');

  return (
    <section id="work" className="py-24">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="mb-12"
        >
          <div className="section-label mb-4">Selected Work</div>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--text)' }}>
            Things I've <span className="italic" style={{ color: 'var(--blush-mid)' }}>actually built</span> ✦
          </h2>
          <p className="font-display text-lg mt-3 max-w-2xl leading-relaxed" style={{ color: 'var(--text-mid)' }}>
            Every project here is deployed, used by real people, solving a real problem.
          </p>
        </motion.div>

        <div className="projects-mobile-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {nonLunaProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        <p className="block md:hidden text-center font-body mt-3" style={{ fontSize: '0.6rem', color: 'var(--muted)', opacity: 0.5 }}>
          ← swipe →
        </p>

      </div>
    </section>
  );
};

export default Projects;
