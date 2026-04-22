import { ArrowUp } from 'lucide-react';

const HeartbeatLine = () => (
  <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="my-3">
    <path
      d="M0,12 L20,12 L28,2 L36,22 L44,12 L80,12"
      stroke="var(--blush-mid)"
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
    <footer className="py-12" style={{ borderTop: '0.5px solid var(--taupe)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        <div className="flex flex-col items-center gap-4 mb-8">
          <HeartbeatLine />
          <p className="font-body" style={{ fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted)', opacity: 0.7 }}>
            Designed & built by Asmeret Teklu Gebremedhin
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6" style={{ borderTop: '0.5px solid var(--taupe)' }}>
          <p className="font-body" style={{ fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--muted)', opacity: 0.5 }}>
            asmeret.netlify.app · {new Date().getFullYear()}
          </p>
          <p className="font-body" style={{ fontSize: '0.58rem', letterSpacing: '0.08em', color: 'var(--muted)', opacity: 0.5 }}>
            Made in Mekelle, Tigray ✦ Powered by curiosity
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="font-display italic" style={{ fontSize: '0.75rem', color: 'var(--blush-mid)', opacity: 0.5 }}>
            Luna AI is coming. Stay close. 🌙
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <button 
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all group"
            style={{ border: '0.5px solid var(--taupe)', color: 'var(--muted)' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--blush-mid)'; e.currentTarget.style.color = 'var(--blush-mid)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--taupe)'; e.currentTarget.style.color = 'var(--muted)'; }}
          >
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
