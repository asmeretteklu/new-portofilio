import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { person } from '../data/portfolio';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { ref, controls, variants } = useScrollReveal();
  const formRef = useRef(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ state: 'error', message: "Email service not configured. Please add your EmailJS keys to .env 🌸" });
      return;
    }

    setStatus({ state: 'sending', message: 'Sending...' });

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(() => {
        setStatus({ state: 'success', message: "Message sent! I'll get back to you soon 🌸" });
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setStatus({ state: 'error', message: "Something went wrong — please email me directly ✦" });
      });
  };

  const infoCards = [
    { icon: '📍', label: 'Location', value: 'Mekelle, Ethiopia', sub: 'Remote Available' },
    { icon: '💼', label: 'Availability', value: 'Open to Opportunities', sub: 'Roles & Collabs' },
    { icon: '🌍', label: 'Timezone', value: 'EAT (UTC+3)', sub: 'Flexible Hours' },
    { icon: '⚡', label: 'Response', value: 'Within 24 Hours', sub: 'Usually Faster' }
  ];

  const advantages = [
    { icon: "🎓", text: "2025 SE Graduate" },
    { icon: "🤖", text: "AI & Tech Specialist" },
    { icon: "⚡", text: "Adaptable Learner" },
    { icon: "💡", text: "Creative Problem Solver" }
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
                <a href="/Asmeret_Teklu_CV.pdf" download className="flex-1 py-3 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all duration-300" style={{ border: '0.5px solid var(--card-border)', background: 'var(--card-bg)' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--blush-mid)'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--card-border)'}>
                  <span>📄</span> <span className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.04em', color: 'var(--muted)' }}>CV</span>
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
                <div className="mb-6">
                  <h3 className="font-display text-xl sm:text-2xl mb-1" style={{ color: 'var(--text)' }}>Send me a message</h3>
                  <p className="font-body text-sm" style={{ color: 'var(--text-mid)' }}>Have a project in mind? Let's discuss how we can work together.</p>
                </div>

                <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="from_name" className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--blush-mid)', fontWeight: 500 }}>Full Name *</label>
                      <input id="from_name" name="from_name" placeholder="Your name" required className="w-full rounded-xl px-4 py-3 outline-none font-body text-sm transition-all" style={{ background: 'var(--blush-light)', border: '0.5px solid var(--taupe)', color: 'var(--text)' }} onFocus={(e) => e.target.style.borderColor = 'var(--blush-mid)'} onBlur={(e) => e.target.style.borderColor = 'var(--taupe)'} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="from_email" className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--blush-mid)', fontWeight: 500 }}>Email *</label>
                      <input id="from_email" name="from_email" type="email" placeholder="you@email.com" required className="w-full rounded-xl px-4 py-3 outline-none font-body text-sm transition-all" style={{ background: 'var(--blush-light)', border: '0.5px solid var(--taupe)', color: 'var(--text)' }} onFocus={(e) => e.target.style.borderColor = 'var(--blush-mid)'} onBlur={(e) => e.target.style.borderColor = 'var(--taupe)'} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-body uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--blush-mid)', fontWeight: 500 }}>Your Message *</label>
                    <textarea id="message" name="message" placeholder="Tell me about your project..." rows="4" required className="w-full rounded-xl px-4 py-3 outline-none font-body text-sm transition-all resize-none" style={{ background: 'var(--blush-light)', border: '0.5px solid var(--taupe)', color: 'var(--text)' }} onFocus={(e) => e.target.style.borderColor = 'var(--blush-mid)'} onBlur={(e) => e.target.style.borderColor = 'var(--taupe)'}></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status.state === 'sending'}
                    className="btn-primary-blush w-full justify-center mt-2 py-4 transition-all"
                    style={{ 
                      fontSize: '0.8rem', 
                      letterSpacing: '0.08em',
                      opacity: status.state === 'sending' ? 0.7 : 1,
                      cursor: status.state === 'sending' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {status.state === 'sending' ? 'Sending... ✦' : 'Send message ✦'}
                  </button>
                  {status.message && (
                    <span style={{ 
                      display: 'block', 
                      color: status.state === 'success' ? '#ED93B1' : '#9B8080', 
                      fontSize: '13px', 
                      marginTop: '10px' 
                    }}>
                      {status.message}
                    </span>
                  )}
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
