import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('light', !newDark);
    document.documentElement.setAttribute('data-theme', newDark ? 'dark' : 'light');
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  const links = [
    { name: 'Work', href: '#work' },
    { name: 'Luna AI', href: '#luna' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'var(--bg)',
          opacity: 0.9,
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center relative z-10">
        {/* Logo */}
        <a href="#" className="group flex flex-col">
          <span className="font-display text-2xl tracking-tight leading-none">Asmeret</span>
          <span className="font-display text-2xl italic text-[var(--accent)] tracking-tight leading-none ml-2">Teklu</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-bold"
            >
              {link.name}
            </a>
          ))}
          
          <div className="h-4 w-px bg-[var(--border)]" />

          <button 
            onClick={toggleTheme}
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full border border-[var(--accent)] text-[var(--accent)] text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[var(--accent)] hover:text-[var(--onyx)] transition-all"
          >
            Connect
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="text-[var(--text-muted)]"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-[var(--text)]"
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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 w-screen h-screen bg-[var(--bg)] z-40 flex flex-col items-center justify-center gap-8"
          >
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-display text-4xl hover:text-[var(--accent)] transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={() => {
                window.dispatchEvent(new CustomEvent('toggle-terminal'));
                setIsOpen(false);
              }}
              className="font-display text-4xl text-[var(--accent)] hover:opacity-80 transition-colors flex items-center gap-4"
            >
              Terminal <span className="text-xs font-mono px-2 py-1 border border-[var(--accent)] rounded tracking-widest">_</span>
            </button>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-8 px-10 py-4 rounded-full bg-[var(--accent)] text-[var(--onyx)] font-bold uppercase tracking-widest"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;

