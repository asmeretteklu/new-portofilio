import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { person } from '../data/portfolio';

const FormField = ({ id, label, type = "text", ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--blush-mid)', fontWeight: 500 }}>
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={id}
        className="w-full rounded-xl px-4 py-3 outline-none font-body text-sm transition-all resize-none"
        style={{ background: 'var(--blush-light)', border: '0.5px solid var(--taupe)', color: 'var(--text)' }}
        onFocus={(e) => e.target.style.borderColor = 'var(--blush-mid)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--taupe)'}
        {...props}
      />
    ) : (
      <input
        id={id}
        type={type}
        className="w-full rounded-xl px-4 py-3 outline-none font-body text-sm transition-all"
        style={{ background: 'var(--blush-light)', border: '0.5px solid var(--taupe)', color: 'var(--text)' }}
        onFocus={(e) => e.target.style.borderColor = 'var(--blush-mid)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--taupe)'}
        {...props}
      />
    )}
  </div>
);

const Contact = () => {
  const { ref, controls, variants } = useScrollReveal();
  
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
      await emailjs.sendForm(serviceID, templateID, formRef.current, { publicKey });
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
    <section id="contact" className="py-16 sm:py-24 relative overflow-hidden z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={variants}
          className="flex flex-col gap-10"
        >
          {/* Header */}
          <div className="text-center md:text-left">
            <div className="section-label mb-4">Say Hello ✦</div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-none" style={{ color: 'var(--text)' }}>
              Let's build something <span className="italic" style={{ color: 'var(--blush-mid)' }}>extraordinary.</span>
            </h2>
            <p className="font-body max-w-2xl mt-4 text-sm sm:text-base" style={{ color: 'var(--text-mid)' }}>
              I'm passionate about turning ideas into reality. Whether you have a project in mind, need technical expertise, or just want to connect.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column */}
            <div className="col-span-1 lg:col-span-5 flex flex-col gap-6">
              
              <div className="grid grid-cols-2 gap-3">
                {infoCards.map((card, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-2.5 p-3 sm:p-4 rounded-xl transition-all duration-300"
                    style={{ background: 'var(--card-bg)', border: '0.5px solid var(--card-border)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.border = '0.5px solid var(--blush-mid)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.border = '0.5px solid var(--card-border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    <div className="text-lg flex-shrink-0">{card.icon}</div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="font-body truncate" style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.8rem' }}>{card.label}</h4>
                      <p className="font-body truncate" style={{ color: 'var(--text-mid)', fontSize: '0.75rem' }}>{card.value}</p>
                      <small className="font-body uppercase mt-0.5 truncate" style={{ fontSize: '0.5rem', letterSpacing: '0.08em', color: 'var(--blush-mid)' }}>{card.sub}</small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Why Collaborate */}
              <div className="rounded-2xl p-4 sm:p-5" style={{ background: 'var(--card-bg)', border: '0.5px solid var(--card-border)' }}>
                <div className="section-label mb-4">Why Collaborate With Me?</div>
                <div className="grid grid-cols-2 gap-3">
                  {advantages.map((adv, i) => (
                    <div key={i} className="flex items-center gap-2 font-body text-sm" style={{ color: 'var(--text-mid)' }}>
                      <span className="text-base">{adv.icon}</span>
                      <span>{adv.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2.5">
                <a href={`mailto:${person.email}`} className="flex-1 py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300" style={{ border: '0.5px solid var(--card-border)', background: 'var(--card-bg)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--blush-mid)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}>
                  <span>📧</span> <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.04em', color: 'var(--muted)' }}>Email</span>
                </a>
                <a href={person.linkedin} target="_blank" rel="noreferrer" className="flex-1 py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300" style={{ border: '0.5px solid var(--card-border)', background: 'var(--card-bg)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--blush-mid)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}>
                  <span>💼</span> <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.04em', color: 'var(--muted)' }}>LinkedIn</span>
                </a>
                <a href={person.github} target="_blank" rel="noreferrer" className="flex-1 py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300" style={{ border: '0.5px solid var(--card-border)', background: 'var(--card-bg)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--blush-mid)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}>
                  <span>🐙</span> <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.04em', color: 'var(--muted)' }}>GitHub</span>
                </a>
              </div>
            </div>

            {/* Right Column — Form */}
            <div className="col-span-1 lg:col-span-7">
              <div 
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden"
                style={{ background: 'var(--card-bg)', border: '0.5px solid var(--card-border)', boxShadow: '0 20px 60px rgba(0,0,0,0.04)' }}
              >
                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 z-50 flex items-center justify-center flex-col gap-4 rounded-3xl"
                      style={{ background: 'var(--card-bg)' }}
                    >
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }} className="text-5xl">✅</motion.div>
                      <h3 className="font-display text-2xl" style={{ color: 'var(--text)' }}>Message Sent!</h3>
                      <p className="font-body text-sm" style={{ color: 'var(--text-mid)' }}>I'll get back to you within 24 hours.</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      className="mb-4 text-sm px-4 py-3 rounded-lg text-center z-40"
                      style={{ background: 'rgba(237,147,177,0.15)', border: '1px solid var(--blush-mid)', color: 'var(--blush-mid)' }}
                    >
                      ❌ {errorMessage}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mb-6">
                  <h3 className="font-display text-xl sm:text-2xl mb-1" style={{ color: 'var(--text)' }}>Send me a message</h3>
                  <p className="font-body text-sm" style={{ color: 'var(--text-mid)' }}>Have a project in mind? Let's discuss how we can work together.</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField id="name" name="from_name" label="Full Name *" placeholder="Your name" required />
                    <FormField id="email" name="from_email" type="email" label="Email *" placeholder="you@email.com" required />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--blush-mid)', fontWeight: 500 }}>
                      Subject *
                    </label>
                    <select 
                      id="subject" name="subject" required defaultValue=""
                      className="w-full rounded-xl px-4 py-3 outline-none font-body text-sm transition-all appearance-none cursor-pointer"
                      style={{ background: 'var(--blush-light)', border: '0.5px solid var(--taupe)', color: 'var(--text)' }}
                    >
                      <option value="" disabled hidden>Select an option...</option>
                      <option value="💼 Job Opportunity">💼 Job Opportunity</option>
                      <option value="🎓 Internship Inquiry">🎓 Internship</option>
                      <option value="🤝 Project Collaboration">🤝 Collaboration</option>
                      <option value="⚡ Freelance Work">⚡ Freelance</option>
                      <option value="💬 General Inquiry">💬 General</option>
                    </select>
                  </div>

                  <FormField id="message" name="message" type="textarea" label="Your Message *" placeholder="Tell me about your project..." rows="4" required />

                  <motion.button 
                    type="submit" 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting || submitStatus === 'success'}
                    className="btn-primary-blush w-full justify-center mt-2 py-4"
                    style={{ fontSize: '0.8rem', letterSpacing: '0.08em' }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Sending...
                      </span>
                    ) : (
                      <>Send Message 🚀</>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
