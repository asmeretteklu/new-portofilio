import { ArrowUp } from 'lucide-react';

/* Heartbeat ECG SVG — animated, gold, 80px wide */
const HeartbeatLine = () => (
  <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="my-3">
    <path
      d="M0,12 L20,12 L28,2 L36,22 L44,12 L80,12"
      stroke="var(--gold)"
      strokeWidth="1.5"
      fill="none"
      strokeDasharray="120"
      strokeDashoffset="0"
      style={{
        animation: 'heartbeat-pulse 2s linear infinite',
      }}
    />
  </svg>
);

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-ink border-t border-border/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Main footer content */}
        <div className="flex flex-col items-center gap-4 mb-8">
          {/* Row 1: Heartbeat */}
          <HeartbeatLine />
          
          {/* Row 2: Designed & built by */}
          <p className="font-mono text-paper2/50" style={{ fontSize: '0.65rem', letterSpacing: '0.1em' }}>
            Designed & built by Asmeret Teklu Gebremedhin
          </p>
        </div>

        {/* Row 3: Two columns */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t border-border/10 pt-6">
          <p className="font-mono text-paper2/40" style={{ fontSize: '0.58rem', letterSpacing: '0.08em' }}>
            asmeret.netlify.app · {new Date().getFullYear()}
          </p>
          <p className="font-mono text-paper2/40" style={{ fontSize: '0.58rem', letterSpacing: '0.08em' }}>
            Made in Mekelle, Tigray ✦ Powered by curiosity
          </p>
        </div>

        {/* Luna teaser at very bottom */}
        <div className="mt-8 text-center">
          <p className="font-display italic" style={{ fontSize: '0.75rem', color: 'var(--rose-pale)' }}>
            Luna AI is coming. Stay close. 🌙
          </p>
        </div>

        {/* Scroll to top */}
        <div className="flex justify-center mt-6">
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full border border-border/20 flex items-center justify-center text-paper2/40 hover:text-gold hover:border-gold/50 transition-all bg-ink2/30 group"
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
