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
      className="flip-card"
    >
      <div className="flip-inner">
        {/* FRONT — what shows normally */}
        <div className="flip-front">
          <div className="project-icon">{PROJECT_ICONS[project.id] || '✦'}</div>
          <h4 className="project-name">
            {descParts[0]}
            {project.accent && <span className="italic" style={{ color: 'var(--blush-mid)' }}>{project.accent}</span>}
            {descParts[1]}
          </h4>
          <p className="project-tech flex flex-wrap gap-1.5 mt-2">
            {project.tags.map(tag => (
              <span key={tag} className="font-body uppercase rounded-md px-2 py-1" style={{ fontSize: '0.6rem', letterSpacing: '0.04em', background: 'var(--blush-light)', color: 'var(--muted)', border: '0.5px solid var(--blush)' }}>
                {tag}
              </span>
            ))}
          </p>
          <span className="flip-hint">hover to explore ✦</span>
        </div>
        {/* BACK — shows on hover */}
        <div className="flip-back">
          <h4 className="flip-back-name">
            {descParts[0]}{project.accent}{descParts[1]}
          </h4>
          <p className="flip-back-desc">{project.description}</p>
          <p className="flip-back-why">{PROJECT_WHY[project.id] || ''}</p>
          <a 
            href={project.link || "https://github.com/asmeretteklu"} 
            target="_blank" 
            rel="noreferrer" 
            className="flip-back-btn"
          >
            View project ✦
          </a>
        </div>
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
