import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from './SocialIcons';
import { person } from '../data/portfolio';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 border-t border-[var(--border)] relative overflow-hidden bg-[var(--bg)] text-[var(--text)] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-24 mb-16">
          <div className="space-y-6">
            <a href="#" className="flex flex-col group">
              <span className="font-display text-4xl tracking-tight leading-none text-[var(--text)]">Asmeret</span>
              <span className="font-display text-4xl italic text-[var(--accent)] tracking-tight leading-none ml-4">Teklu</span>
            </a>
            <p className="font-body text-[var(--text-muted)] max-w-sm text-sm leading-relaxed font-light">
              Architecting resilient digital systems from Mekelle, Tigray. Focused on high-impact full-stack engineering and AI integration.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-bold">Navigation</h4>
            <div className="flex flex-col gap-3">
              {['Work', 'Luna AI', 'About', 'Contact'].map(link => (
                <a key={link} href={`#${link.toLowerCase().replace(' ', '')}`} className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-light">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] font-bold">Social Architecture</h4>
            <div className="flex flex-col gap-3">
              <a href={person.github} target="_blank" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-light">GitHub</a>
              <a href={person.linkedin} target="_blank" className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-light">LinkedIn</a>
              <a href={`mailto:${person.email}`} className="text-sm font-body text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-light">Email</a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] font-medium">
              &copy; {new Date().getFullYear()} Asmeret Teklu · Mekelle, Tigray, Ethiopia
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] uppercase tracking-widest text-[var(--accent)]">Last Active: Recently</span>
              </div>
              <div className="h-3 w-px bg-[var(--border)]" />
              <div className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">
                Press <span className="text-[var(--accent)] px-1 rounded bg-[var(--accent-light)] font-mono">`</span> or <span className="text-[var(--accent)] px-1 rounded bg-[var(--accent-light)] font-mono">Ctrl+K</span> to open terminal
              </div>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2"
          >
            <div className="w-12 h-12 rounded-full border border-[var(--border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-all">
              <ArrowUp className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:-translate-y-1 transition-all" />
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)] font-bold group-hover:text-[var(--accent)]">Back to Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
