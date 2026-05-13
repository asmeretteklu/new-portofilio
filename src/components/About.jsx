import { motion } from 'framer-motion';
import { academicTimeline, community } from '../data/portfolio';

const About = () => {
  return (
    <section id="about" className="py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">
        {/* Left Column: Story Header */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <div className="h-px w-8 bg-[var(--accent)]" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--accent)] font-bold">The Narrative</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl leading-tight font-light"
          >
            Building software <br />
            <span className="italic font-normal text-[var(--accent)]">that makes life easier</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-body text-lg text-[var(--text-mid)] leading-relaxed font-light italic border-l-2 border-[var(--accent-light)] pl-6"
          >
            "Growing up in Mekelle, I learned that technology isn't a luxury—it's a lifeline. I didn't start with a computer; I started with a pen and a conviction."
          </motion.p>
        </div>

        {/* Right Column: Detailed Story & Data */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-[17px] text-[var(--text-mid)] leading-relaxed font-light space-y-6"
          >
            <p>
              I grew up in Mekelle, Tigray, before I owned a phone or a computer. I chose Software Engineering anyway — not because it was practical, but because I couldn't imagine choosing anything else.
            </p>
            <p>
              I studied through internet blackouts and power cuts. I took handwritten notes when there was nothing else. When war came to Tigray in 2020, I kept studying. By candlelight sometimes. From printed pages when there was no electricity. I graduated in August 2025 with a 3.74 GPA — Great Distinction, top of my cohort.
            </p>
            <p>
              Since then I have built real systems for real people: a lottery platform running live in production, a student registration system that turned a 7-day process into 5 minutes, and Luna AI — a women's health app built specifically for Ethiopian and African women, powered by Gemini, because the global health tech industry largely forgot we exist.
            </p>
            <p>
              I build software that works under difficult conditions because that is the only kind of software that matters where I come from. Slow internet. Power cuts. Users who speak Amharic and Tigrinya. Those are not edge cases to me. They are the main case.
            </p>
            <p>
              Right now I am applying for a Master's degree in Computer Science in Italy — because I want to go deeper, build smarter, and come back with more tools to solve harder problems.
            </p>
          </motion.div>

          {/* Community Impact */}
          <div className="grid md:grid-cols-3 gap-8 py-8 border-y border-[var(--border)]">
            {community.map((item, i) => (
              <div key={i} className="space-y-2">
                <span className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">{item.title}</span>
                <p className="font-display text-lg leading-tight">{item.org}</p>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Academic Progression */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
              <h3 className="font-display text-2xl font-light">Academic Progression</h3>
              <span className="text-[10px] uppercase tracking-widest text-[var(--accent)]">Top of Cohort</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {academicTimeline.map((item, i) => (
                <div key={i} className="flex flex-col space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{item.year}</span>
                  <span className="font-display text-3xl font-light leading-none">{item.gpa}</span>
                  <span className="text-[9px] uppercase tracking-tighter text-[var(--accent)]">{item.semester}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Grid */}
          <div className="space-y-6">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-bold">Linguistic Capability</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Tigrigna', level: 'Native / Mother Tongue' },
                { name: 'English', level: 'Full Fluency (Diploma w/ Distinction)' },
                { name: 'Amharic', level: 'Full Professional Proficiency' }
              ].map((lang) => (
                <div key={lang.name} className="space-y-1">
                  <p className="font-display text-xl font-light">{lang.name}</p>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">{lang.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


