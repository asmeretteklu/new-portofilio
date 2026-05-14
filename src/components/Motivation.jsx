import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TIGRAY_PHOTOS = [
  { src: '/gheralta.png', label: 'Gheralta Mountains' },
  { src: '/mekelle.png', label: 'Mekelle City' },
];

const Motivation = () => {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  return (
    <section id="motivation" className="py-32 px-6 lg:px-12 bg-transparent text-[var(--text)] relative overflow-hidden transition-colors duration-500">
      {/* Subtle warm glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(224,163,135,0.08)_0%,transparent_70%)]" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--accent)] font-bold">The Reason</span>
          <h2 className="font-display text-5xl md:text-7xl font-light">
            Why I Build
          </h2>
        </motion.div>

        {/* Strong Pull Quote */}
        <motion.blockquote 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-display text-2xl md:text-4xl text-center leading-relaxed font-light italic text-[var(--rose-gold-dim)] px-4 md:px-12"
        >
          "Most of my projects started with someone telling me something was broken."
        </motion.blockquote>

        {/* Narrative Text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-body text-lg md:text-xl text-[var(--text-mid)] leading-relaxed font-normal space-y-8 max-w-3xl mx-auto"
        >
          <p>
            Students waiting 7 days to register for class. Women whose health data was being analyzed by algorithms trained on data from other continents. A lottery system running on paper when it could run in real time.
          </p>
          <p className="font-medium text-[var(--text)]">
            I fix things. That is the simplest version of what I do.
          </p>
          <p>
            The longer version is this: I come from a region where technology has historically been something that happened to us — not something built by us or for us. I want to change that ratio. Every system I deploy in Ethiopia, every woman who uses Luna AI in her own language, every student who registers in 5 minutes instead of 7 days — that is what I am actually building toward.
          </p>
          <p className="italic text-[var(--accent)]/80">
            The code is just how I get there.
          </p>
        </motion.div>

        {/* Photo Gallery Header */}
        <div className="pt-8 border-t border-[var(--border)]">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-bold">Provenance</span>
          <h3 className="font-display text-3xl md:text-5xl font-light mt-2">Where I came from</h3>
        </div>

        <div className="relative group mt-8 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="w-full h-64 md:h-96 rounded-3xl overflow-hidden shadow-2xl relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <img 
                  src={TIGRAY_PHOTOS[currentPhoto].src} 
                  alt={TIGRAY_PHOTOS[currentPhoto].label} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-xs font-mono uppercase tracking-[0.3em] mb-1">Tigray, Ethiopia</p>
                  <h4 className="font-display text-2xl font-light">{TIGRAY_PHOTOS[currentPhoto].label}</h4>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Gallery Navigation */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <button 
                onClick={() => setCurrentPhoto((prev) => (prev - 1 + TIGRAY_PHOTOS.length) % TIGRAY_PHOTOS.length)}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[var(--accent)] transition-all border border-white/20"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setCurrentPhoto((prev) => (prev + 1) % TIGRAY_PHOTOS.length)}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-[var(--accent)] transition-all border border-white/20"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>

          {/* Indicators */}
          <div className="flex justify-center gap-3">
            {TIGRAY_PHOTOS.map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPhoto(i)}
                className={`h-1 rounded-full transition-all duration-500 ${i === currentPhoto ? 'bg-[var(--accent)] w-8' : 'bg-[var(--text-muted)]/20 w-4'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Motivation;
