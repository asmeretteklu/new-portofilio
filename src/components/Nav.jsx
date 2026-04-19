import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { person } from '../data/portfolio';

/* CMD-11: Nav Logo Hand-Drawn Squiggly Underline */
const SquigglyUnderline = ({ visible }) => (
  <svg
    className="absolute -bottom-1 left-0 w-full overflow-visible pointer-events-none"
    height="8"
    viewBox="0 0 90 8"
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      d="M0,4 Q15,0 30,4 Q45,8 60,4 Q75,0 90,4"
      stroke="var(--gold)"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="100"
      strokeDashoffset={visible ? '0' : '100'}
      style={{
        transition: 'stroke-dashoffset 0.4s ease',
      }}
    />
  </svg>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || (!saved && window.matchMedia('(prefers-color-scheme: light)').matches)) {
      setIsLight(true);
      document.documentElement.classList.add('light');
    }
  }, []);

  const toggleTheme = () => {
    setIsLight(!isLight);
    if (!isLight) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  const links = [
    { name: 'Work', href: '#work' },
    { name: 'Luna AI', href: '#luna' },
    { name: 'Skills', href: '#skills' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b-[1px] border-border py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo with CMD-11 squiggly underline */}
        <a
          href="#"
          className="flex items-baseline gap-1 group z-50 relative"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <span className="font-display italic text-gold text-2xl group-hover:scale-105 transition-transform origin-left">Asmeret</span>
          <span className="font-ui font-semibold text-paper text-xl">Teklu</span>
          <SquigglyUnderline visible={logoHovered} />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-mono text-[0.68rem] uppercase tracking-widest text-paper2 hover:text-gold transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="px-5 py-2 font-mono text-[0.7rem] uppercase tracking-wider border border-border hover:border-gold text-gold rounded-full transition-colors"
          >
            Say hello ✦
          </a>
          <button 
            onClick={toggleTheme}
            className="text-paper2 hover:text-gold transition-colors ml-2"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex md:hidden items-center gap-4 z-50">
          <button 
            onClick={toggleTheme}
            className="text-paper2 hover:text-gold transition-colors"
            aria-label="Toggle Theme"
          >
            {isLight ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          
          <button 
            className="md:hidden text-paper2 hover:text-gold transition-colors"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-ink/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 pt-20"
          >
            {links.map(link => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-ui text-2xl text-paper hover:text-gold transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 px-8 py-3 bg-gold text-ink font-ui font-semibold rounded-full"
            >
              Let's talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
