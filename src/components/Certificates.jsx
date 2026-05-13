import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: 'Data Analysis Fundamentals',
    issuer: 'Udacity (5 Million Ethiopian Coders)',
    year: '2023',
    detail: 'Advanced certification in data manipulation, SQL, and predictive analytics.',
    link: 'https://5millioncoders.gov.et/'
  },
  {
    id: 2,
    title: 'Programming Fundamentals',
    issuer: 'Udacity (5 Million Ethiopian Coders)',
    year: '2023',
    detail: 'Core computer science principles and algorithmic problem solving.',
    link: 'https://5millioncoders.gov.et/'
  },
  {
    id: 3,
    title: 'Full Stack Web Development',
    issuer: 'FreeCodeCamp',
    year: '2023',
    detail: 'Comprehensive certification covering front-end frameworks and back-end architecture.',
    link: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/'
  },
  {
    id: 4,
    title: 'Scientific Computing with Python',
    issuer: 'FreeCodeCamp',
    year: '2023',
    detail: 'Data structures, algorithms, and computational thinking in Python.',
    link: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/'
  },
  {
    id: 5,
    title: 'CS50x — Intro to Computer Science',
    issuer: 'Harvard University',
    year: '2022',
    detail: 'Comprehensive study of algorithms, data structures, and software engineering principles.',
    link: 'https://cs50.harvard.edu/x/'
  },
  {
    id: 6,
    title: 'Fundamentals of Digital Marketing',
    issuer: 'Google Digital Garage',
    year: '2023',
    detail: 'Strategic marketing principles and digital growth mechanics. Mastering online visibility.',
    link: 'https://skillshop.exceedlms.com/student/path/69428-fundamentals-of-digital-marketing'
  }
];

const CertCard = ({ cert, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-[380px] w-full perspective-[1000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div 
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        
        {/* FRONT FACE */}
        <div 
          className="absolute inset-0 bg-[var(--card-bg)] border border-[var(--border)] p-10 rounded-[2rem] overflow-hidden flex flex-col justify-between shadow-xl"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(1px)' }}
        >
          {/* Decorative Background Icon */}
          <div className="absolute -top-4 -right-4 opacity-[0.03] transition-opacity">
            <Award size={120} className="text-[var(--accent)]" />
          </div>

          <div className="relative z-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--accent)] font-bold">{cert.year}</span>
            </div>
          </div>

          <div className="relative z-10 space-y-3 mb-8">
            <h3 className="font-display text-3xl font-light leading-tight text-[var(--text)]">{cert.title}</h3>
            <p className="text-xs text-[var(--accent)] uppercase tracking-widest font-medium">{cert.issuer}</p>
          </div>
          
          <div className="relative z-10 flex items-center gap-2 text-[var(--text-muted)] text-[10px] uppercase tracking-widest font-bold">
            {isFlipped ? 'Inspecting...' : <>Hover to inspect <span className="opacity-50">→</span></>}
          </div>
        </div>

        {/* BACK FACE */}
        <div 
          className="absolute inset-0 bg-[var(--bg)] border border-[var(--border)] p-10 rounded-[2rem] overflow-hidden flex flex-col items-center justify-center text-center shadow-2xl"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(1px)' }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=600&auto=format&fit=crop')] opacity-[0.03] bg-cover bg-center mix-blend-multiply" />
          
          <div className="relative z-10 space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full border border-[var(--accent)] flex items-center justify-center bg-[var(--accent-light)] shadow-sm">
              <Award className="w-8 h-8 text-[var(--accent)]" />
            </div>
            
            <p className="text-[15px] text-[var(--text)] font-body leading-relaxed font-medium">
              {cert.detail}
            </p>

              <a 
                href={cert.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[var(--accent)] text-white text-[10px] uppercase tracking-widest font-bold hover:brightness-110 transition-all mt-4 shadow-md"
                onClick={(e) => e.stopPropagation()}
              >
                Verify & Learn <ExternalLink size={12} />
              </a>
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  return (
    <section id="certificates" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24 mb-20">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-8 bg-[var(--accent)]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--accent)] font-bold">Verification</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl leading-tight font-light"
          >
            Verified <br />
            <span className="italic font-normal text-[var(--accent)]">Honors</span>
          </motion.h2>
        </div>
        <div className="flex flex-col justify-end lg:pb-4">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-lg text-[var(--text-muted)] max-w-xl leading-relaxed font-light"
          >
            A curated record of academic excellence and technical certifications from Harvard, Google, and national innovation institutions.
          </motion.p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, idx) => (
          <CertCard key={cert.id} cert={cert} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default Certificates;

