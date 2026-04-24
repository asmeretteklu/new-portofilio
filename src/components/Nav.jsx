import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { person } from '../data/portfolio';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const links = [
    { name: 'Work', href: '#work' },
    { name: 'Luna AI', href: '#luna' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
      style={{
        background: scrolled ? 'var(--bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid var(--blush)' : '0.5px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-baseline gap-1.5 group z-50 relative">
          <span className="font-display text-2xl" style={{ fontWeight: 400, color: 'var(--text)' }}>Asmeret</span>
          <span className="font-display italic text-2xl" style={{ color: 'var(--blush-mid)' }}>Teklu</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-body uppercase tracking-wider transition-colors relative group"
              style={{ fontSize: '12px', letterSpacing: '0.1em', color: 'var(--muted)' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--blush-mid)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--muted)'}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full" style={{ background: 'var(--blush-mid)' }} />
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary-blush"
            style={{ padding: '0.55rem 1.4rem', fontSize: '11px' }}
          >
            Say hello ✦
          </a>
          <button 
            onClick={toggleTheme}
            className="transition-colors ml-2"
            style={{ color: 'var(--muted)' }}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex md:hidden items-center gap-4 z-50">
          <button 
            onClick={toggleTheme}
            className="transition-colors"
            style={{ color: 'var(--muted)' }}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button 
            className="md:hidden transition-colors"
            style={{ color: 'var(--muted)' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 w-screen h-screen z-40 flex flex-col items-center justify-center gap-6 pb-20 overflow-y-auto"
            style={{ background: 'var(--bg)', backdropFilter: 'blur(20px)' }}
          >
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-4xl transition-colors hover:text-[var(--blush-mid)]"
                style={{ color: 'var(--text)' }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary-blush mt-8"
              style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
            >
              Let's talk ✦
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
