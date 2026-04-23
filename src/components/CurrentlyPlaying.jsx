import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CurrentlyPlaying = () => {
  const [expanded, setExpanded] = useState(false);
  const [playlistUrl, setPlaylistUrl] = useState("https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0");
  const [inputUrl, setInputUrl] = useState("");
  const [showInput, setShowInput] = useState(false);

  const [isMini, setIsMini] = useState(false);

  const handleUrlSubmit = (e) => {
    if (e.key === 'Enter') {
      let finalUrl = inputUrl;
      if (inputUrl.includes('open.spotify.com/playlist/')) {
        const id = inputUrl.split('playlist/')[1].split('?')[0];
        finalUrl = `https://open.spotify.com/embed/playlist/${id}?utm_source=generator&theme=0`;
      }
      setPlaylistUrl(finalUrl);
      setShowInput(false);
      setInputUrl("");
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', left: '24px', zIndex: 600, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 15, scale: 0.9, rotate: -2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(12px)',
              borderRadius: '24px',
              padding: '12px',
              boxShadow: '0 20px 50px rgba(237,147,177,0.3)',
              width: '350px',
              border: '1.5px solid rgba(245,196,211,0.5)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'var(--blush-light)', borderRadius: '50%', filter: 'blur(30px)', opacity: 0.6 }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '4px 8px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--blush-mid)' }}>Vibes ✦</span>
                <div className="w-1 h-1 rounded-full bg-[#4ade80] animate-pulse"></div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button 
                  onClick={() => setShowInput(!showInput)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--blush-mid)', fontSize: '10px', fontWeight: 600 }}
                >
                  {showInput ? "CANCEL" : "CHANGE"}
                </button>
                <button 
                  onClick={() => setIsMini(!isMini)} 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '18px', padding: 0 }}
                  title={isMini ? "Expand" : "Minimize"}
                >
                  {isMini ? "□" : "—"}
                </button>
                <button onClick={() => setExpanded(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: '20px', padding: 0 }}>&times;</button>
              </div>
            </div>

            {showInput ? (
              <div style={{ padding: '0 8px 10px 8px', position: 'relative', zIndex: 1 }}>
                <input 
                  type="text" 
                  placeholder="Paste Spotify Link & Press Enter..."
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  onKeyDown={handleUrlSubmit}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--blush)', fontSize: '12px', outline: 'none' }}
                />
              </div>
            ) : (
              <iframe 
                style={{ borderRadius: '16px', position: 'relative', zIndex: 1, boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'height 0.3s ease' }} 
                src={playlistUrl}
                width="100%" 
                height={isMini ? "80" : "380"}
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button 
        onClick={() => setExpanded(!expanded)}
        whileHover={{ scale: 1.1, rotate: 12 }}
        whileTap={{ scale: 0.9 }}
        style={{
          background: 'linear-gradient(135deg, #ED93B1, #D4437C)',
          color: 'white', width: '54px', height: '54px',
          borderRadius: '27px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid white', cursor: 'pointer', 
          boxShadow: '0 8px 20px rgba(237,147,177,0.4)',
          fontSize: '22px', position: 'relative'
        }}
      >
        <span className="relative z-10">♪</span>
        {/* Ring animation */}
        <motion.div 
          animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', inset: -2, border: '2px solid #ED93B1', borderRadius: '50%' }}
        />
      </motion.button>
    </div>
  );
};

export default CurrentlyPlaying;

