import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, FileText, CheckCircle } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './SocialIcons';
import emailjs from '@emailjs/browser';
import { person } from '../data/portfolio';

const ContactInfo = ({ icon: Icon, label, value }) => (
  <div className="flex gap-4 group">
    <div className="w-12 h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
      <Icon className="w-5 h-5 text-[var(--accent)]" />
    </div>
    <div className="space-y-1">
      <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">{label}</p>
      <p className="font-display text-xl font-light">{value}</p>
    </div>
  </div>
);

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const sendEmail = (e) => {
    e.preventDefault();
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ state: 'error', message: "Email service not configured. Please use LinkedIn. ✦" });
      return;
    }

    setStatus({ state: 'sending', message: 'Encrypting message...' });

    emailjs.sendForm(serviceId, templateId, formRef.current, {
        publicKey: publicKey,
      })
      .then(() => {
        setStatus({ state: 'success', message: "Transmission complete. I'll reach out soon." });
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error details:", err);
        setStatus({ state: 'error', message: `Transmission failed: ${err.text || 'Unknown error'}. Please reach out via LinkedIn. ✦` });
      });
  };

  return (
    <section id="contact" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 lg:gap-32">
        {/* Left Column: Context & Info */}
        <div className="space-y-12">
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              <div className="h-px w-8 bg-[var(--accent)]" />
              <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--accent)] font-bold">Inquiries</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl leading-tight font-light"
            >
              Let's Start a <br />
              <span className="italic font-normal text-[var(--accent)]">Dialogue</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-body text-xl text-[var(--text-mid)] max-w-sm leading-relaxed font-light"
            >
              Available for full-stack engineering roles, strategic AI consulting, and technical collaborations. 
            </motion.p>
          </div>

          <div className="space-y-8">
            <ContactInfo icon={MapPin} label="Location" value="Mekelle, Ethiopia (GMT+3)" />
            <ContactInfo icon={Mail} label="Professional Email" value={person.email} />
          </div>

          <div className="flex gap-4 pt-4">
            {[
              { icon: Linkedin, href: person.linkedin },
              { icon: Github, href: person.github },
              { icon: FileText, href: '/Asmeret_Teklu_CV.pdf' }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                target="_blank" 
                rel="noreferrer" 
                className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--accent-light)] transition-all"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--accent)] opacity-[0.03] blur-3xl -z-10" />
          
          <form ref={formRef} onSubmit={sendEmail} className="space-y-8 bg-[var(--card-bg)] p-10 md:p-16 rounded-[2.5rem] border border-[var(--border)] relative overflow-hidden group/form">
            {/* Success Overlay */}
            {status.state === 'success' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[var(--bg)] z-20 flex flex-col items-center justify-center text-center p-8"
              >
                <CheckCircle className="w-16 h-16 text-[var(--accent)] mb-6" />
                <h3 className="font-display text-3xl mb-2 font-light text-[var(--text)]">Transmission Received</h3>
                <p className="text-[var(--text-muted)] font-body font-light">{status.message}</p>
                <button onClick={() => setStatus({ state: 'idle', message: '' })} className="mt-8 text-[10px] uppercase tracking-widest text-[var(--accent)] border-b border-[var(--accent)] pb-1 font-bold">New Message</button>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">Identity</label>
                <input name="from_name" type="text" placeholder="Your full name" required className="w-full bg-transparent border-b border-[var(--border)] py-3 outline-none focus:border-[var(--accent)] transition-colors font-body text-lg font-light placeholder:text-[var(--text-muted)] placeholder:opacity-50 text-[var(--text)]" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">Endpoint</label>
                <input name="from_email" type="email" placeholder="your@email.com" required className="w-full bg-transparent border-b border-[var(--border)] py-3 outline-none focus:border-[var(--accent)] transition-colors font-body text-lg font-light placeholder:text-[var(--text-muted)] placeholder:opacity-50 text-[var(--text)]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-[var(--accent)] font-bold">Manifesto</label>
              <textarea name="message" rows="4" placeholder="Briefly describe the collaboration..." required className="w-full bg-transparent border-b border-[var(--border)] py-3 outline-none focus:border-[var(--accent)] transition-colors font-body text-lg font-light resize-none placeholder:text-[var(--text-muted)] placeholder:opacity-50 text-[var(--text)]" />
            </div>

            <button 
              type="submit" 
              disabled={status.state === 'sending'}
              className="group/btn inline-flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-bold text-[var(--text)] disabled:opacity-50"
            >
              <span className="group-hover/btn:text-[var(--accent)] transition-colors">
                {status.state === 'sending' ? 'Sending...' : 'Start a conversation'}
              </span>
              <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center group-hover/btn:scale-110 transition-transform shadow-lg shadow-[var(--accent-light)]">
                <Send className="w-4 h-4 text-[var(--onyx)]" />
              </div>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;


