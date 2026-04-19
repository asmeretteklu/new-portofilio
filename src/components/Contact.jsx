import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { person } from '../data/portfolio';
import CrescentDecoration from './CrescentDecoration';

const FloatingInput = ({ id, label, type = "text", ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className="relative pt-6">
      <motion.label 
        htmlFor={id}
        initial={false}
        animate={{ 
          y: isFocused || hasValue ? -24 : 16, 
          scale: isFocused || hasValue ? 0.8 : 1,
          color: isFocused ? 'var(--gold)' : 'var(--paper2)'
        }}
        className="absolute left-4 top-4 font-mono text-xs uppercase tracking-widest origin-left pointer-events-none"
      >
        {label}
      </motion.label>
      
      {type === 'textarea' ? (
        <textarea
          id={id}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => { setIsFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            if (props.onChange) props.onChange(e);
          }}
          className="w-full bg-ink/30 border border-border/30 rounded-xl px-5 py-4 focus:border-gold/50 outline-none text-paper font-ui transition-all resize-none block relative z-10"
          {...props}
        />
      ) : (
        <input
          id={id}
          type={type}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => { setIsFocused(false); setHasValue(e.target.value.length > 0); }}
          onChange={(e) => {
            setHasValue(e.target.value.length > 0);
            if (props.onChange) props.onChange(e);
          }}
          className="w-full bg-ink/30 border border-border/30 rounded-xl px-5 py-4 focus:border-gold/50 outline-none text-paper font-ui transition-all block relative z-10"
          {...props}
        />
      )}
      
      {/* Animated bottom trace */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: isFocused ? '100%' : '0%', opacity: isFocused ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 h-[2px] bg-gold rounded-full z-20"
      />
    </div>
  );
}

const Contact = () => {
  const { ref, controls, variants } = useScrollReveal();
  
  // Form State
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceID || !templateID || !publicKey) {
      setSubmitStatus('error');
      setErrorMessage('Email service not configured. Please email me directly at asmeretteklu03@gmail.com');
      setIsSubmitting(false);
      return;
    }

    try {
      await emailjs.sendForm(serviceID, templateID, formRef.current, {
        publicKey: publicKey,
      });
      setSubmitStatus('success');
      formRef.current.reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.text || 'Network error. Please try again or email me directly.');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const advantages = [
    { icon: "🎓", text: "2025 SE Graduate" },
    { icon: "🤖", text: "AI & Tech Specialist" },
    { icon: "⚡", text: "Adaptable Learner" },
    { icon: "💡", text: "Creative Problem Solver" }
  ];

  const infoCards = [
    { icon: '📍', label: 'Location', value: 'Mekelle, Ethiopia', sub: 'Remote Available' },
    { icon: '💼', label: 'Availability', value: 'Open to Opportunities', sub: 'Roles & Collabs' },
    { icon: '🌍', label: 'Timezone', value: 'EAT (UTC+3)', sub: 'Flexible Hours' },
    { icon: '⚡', label: 'Response', value: 'Within 24 Hours', sub: 'Usually Faster' }
  ];

  return (
    <section id="contact" className="py-32 bg-ink border-t border-border/30 relative overflow-hidden z-10">
      <CrescentDecoration section="contact" />

      {/* Floating Orbs Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen z-0">
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [0, -30, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gold/10 blur-[120px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, 40, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-teal-light/10 blur-[150px]"
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-16"
        >
          {/* Header */}
          <div className="text-center md:text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-gold mb-4 block">// SAY HELLO ✦</span>
            <h2 className="font-display text-5xl md:text-[5rem] leading-none text-paper relative inline-block">
              Let's build something <span className="italic text-gold">extraordinary.</span>
            </h2>
            <p className="font-ui text-paper2 max-w-2xl mt-6 text-lg">
              I'm passionate about turning ideas into reality. Whether you have a project in mind, need technical expertise, or just want to connect — I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column - Contact Details */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-12">
              
              {/* 3D Staggered Grid Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {infoCards.map((card, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex gap-4 p-4 rounded-xl border border-border/40 bg-ink2/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-gold hover:shadow-[0_0_30px_rgba(196,145,58,0.15)] transition-colors duration-500"
                  >
                    <div className="text-2xl text-gold">{card.icon}</div>
                    <div className="flex flex-col">
                      <h4 className="font-ui text-paper mb-1">{card.label}</h4>
                      <p className="font-display text-paper2">{card.value}</p>
                      <small className="font-mono text-[0.65rem] text-gold uppercase tracking-widest mt-1">{card.sub}</small>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Collaborate */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-ink2/30 backdrop-blur-xl border border-border/40 hover:border-gold hover:shadow-[0_0_30px_rgba(196,145,58,0.15)] transition-all duration-500 rounded-2xl p-6 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-gold mb-6 pb-4 border-b border-border/30 relative z-10">
                  Why Collaborate With Me?
                </h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {advantages.map((adv, i) => (
                    <div key={i} className="flex items-center gap-3 font-ui text-sm text-paper2 hover:text-gold transition-colors">
                      <span className="text-lg grayscale opacity-70 group-hover:grayscale-0">{adv.icon}</span>
                      <span>{adv.text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <div className="flex gap-4">
                <a href={`mailto:${person.email}`} className="flex-1 py-4 px-4 border border-border/30 hover:border-gold hover:bg-gold/5 rounded-xl flex items-center justify-center gap-2 group transition-all duration-300">
                  <span className="grayscale group-hover:grayscale-0 transition-all">📧</span> <span className="font-mono text-[0.7rem] uppercase tracking-wider text-paper2 group-hover:text-gold">Email</span>
                </a>
                <a href={person.linkedin} target="_blank" rel="noreferrer" className="flex-1 py-4 px-4 border border-border/30 hover:border-gold hover:bg-gold/5 rounded-xl flex items-center justify-center gap-2 group transition-all duration-300">
                  <span className="grayscale group-hover:grayscale-0 transition-all">💼</span> <span className="font-mono text-[0.7rem] uppercase tracking-wider text-paper2 group-hover:text-gold">LinkedIn</span>
                </a>
                <a href={person.github} target="_blank" rel="noreferrer" className="flex-1 py-4 px-4 border border-border/30 hover:border-gold hover:bg-gold/5 rounded-xl flex items-center justify-center gap-2 group transition-all duration-300">
                  <span className="grayscale group-hover:grayscale-0 transition-all">🐙</span> <span className="font-mono text-[0.7rem] uppercase tracking-wider text-paper2 group-hover:text-gold">GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="col-span-1 lg:col-span-7">
              <motion.div 
                className="bg-ink2/40 backdrop-blur-xl border border-border/30 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
              >
                {/* Form internal glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold/10 blur-[80px] pointer-events-none"></div>

                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="absolute top-0 left-0 w-full h-full bg-ink/90 backdrop-blur-md z-50 flex items-center justify-center flex-col gap-4 rounded-3xl"
                    >
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
                        className="w-20 h-20 rounded-full bg-teal-light/20 border border-teal-light flex items-center justify-center text-4xl"
                      >
                        ✅
                      </motion.div>
                      <h3 className="font-display text-2xl text-paper">Message Sent!</h3>
                      <p className="font-ui text-paper2">I'll get back to you within 24 hours.</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="absolute top-4 left-1/2 -translate-x-1/2 w-11/12 bg-rose/20 border border-rose text-rose text-sm px-4 py-3 rounded-lg text-center z-40 shadow-xl"
                    >
                      ❌ {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mb-8 relative z-10">
                  <h3 className="font-display text-3xl text-paper mb-2">Send me a message</h3>
                  <p className="font-ui text-paper2">Have a project in mind? Let's discuss how we can work together.</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <FloatingInput id="name" name="from_name" label="Full Name *" required />
                    <FloatingInput id="email" name="from_email" type="email" label="Email Address *" required />
                  </div>

                  <div className="relative pt-6">
                    <motion.label 
                      animate={{ y: -24, scale: 0.8, color: 'var(--gold)' }}
                      className="absolute left-4 top-4 font-mono text-xs uppercase tracking-widest origin-left pointer-events-none"
                    >
                      Subject *
                    </motion.label>
                    <select 
                      id="subject" name="subject" required defaultValue=""
                      className="w-full bg-ink/30 border border-border/30 rounded-xl px-5 py-4 focus:border-gold/50 outline-none text-paper font-ui transition-all block relative z-10 appearance-none cursor-pointer"
                    >
                      <option value="" disabled hidden className="bg-ink text-paper">Select an option...</option>
                      <option value="💼 Job Opportunity" className="bg-ink text-paper">💼 Job Opportunity</option>
                      <option value="🎓 Internship Inquiry" className="bg-ink text-paper">🎓 Internship Inquiry</option>
                      <option value="🤝 Project Collaboration" className="bg-ink text-paper">🤝 Project Collaboration</option>
                      <option value="⚡ Freelance Work" className="bg-ink text-paper">⚡ Freelance Work</option>
                      <option value="💬 General Inquiry" className="bg-ink text-paper">💬 General Inquiry</option>
                    </select>
                  </div>

                  <FloatingInput id="message" name="message" type="textarea" label="Your Message *" rows="5" required />

                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting || submitStatus === 'success'}
                    className={`group relative mt-6 py-5 rounded-xl font-mono text-sm uppercase tracking-widest transition-all overflow-hidden border border-gold/50
                      ${submitStatus === 'success' ? 'bg-teal-light text-ink border-teal-light' : 'bg-transparent text-gold hover:text-[#090b10]'}
                      disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {/* Magnetic hover background fill */}
                    <div className="absolute inset-0 bg-gold translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
                    
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          Establishing Uplink...
                        </>
                      ) : (
                        <>Send Transmission 🚀</>
                      )}
                    </span>
                  </motion.button>
                </form>

              </motion.div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
