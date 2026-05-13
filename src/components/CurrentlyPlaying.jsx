import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ExternalLink, ChevronUp, ChevronDown } from 'lucide-react';

const CurrentlyPlaying = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [playlistId, setPlaylistId] = useState('37i9dQZEVXbMDoHDwVN2tF'); 
  const [input, setInput] = useState('');

  const handleUpdatePlaylist = (e) => {
    e.preventDefault();
    const match = input.match(/playlist\/([a-zA-Z0-9]+)/);
    const newId = match ? match[1] : input;
    if (newId) {
      setPlaylistId(newId);
      setInput('');
      setShowSearch(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 md:bottom-8 md:left-8 z-[100] max-w-[calc(100vw-32px)]">
      <motion.div 
        layout
        className="bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--border)] rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col transition-all duration-500"
        style={{ width: isExpanded ? (window.innerWidth < 640 ? '300px' : '340px') : '180px' }}
      >
        {/* Header / Mini View */}
        <div 
          className="p-4 flex items-center gap-4 cursor-pointer group select-none"
          onClick={() => {
            setIsExpanded(!isExpanded);
            if (isExpanded) setShowSearch(false);
          }}
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-[#1DB954]/10 flex items-center justify-center text-[#1DB954] transition-transform group-hover:scale-110">
              <Music className="w-5 h-5" />
            </div>
            {isExpanded && (
              <motion.div 
                layoutId="pulse"
                className="absolute inset-0 rounded-full bg-[#1DB954]/20 animate-ping"
              />
            )}
          </div>
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <span className="text-[8px] uppercase tracking-[0.25em] text-[#1DB954] font-bold mb-1 opacity-80">
              {isExpanded ? 'Now Curating' : 'Pulse Radio'}
            </span>
            <span className="text-[11px] text-[var(--text)] font-semibold leading-none truncate">
              {isExpanded ? 'Personal Session' : 'Discovery Mix'}
            </span>
          </div>

          <div className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
            {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </div>
        </div>

        {/* Expanded View - Keep mounted so music doesn't stop */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="px-4 overflow-hidden"
        >
          <div className="pb-4 space-y-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">Source Control</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowSearch(!showSearch); }}
                className="text-[10px] text-[var(--accent)] hover:underline font-bold"
              >
                {showSearch ? 'Cancel' : 'Change Stream'}
              </button>
            </div>

            {showSearch && (
              <motion.form 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleUpdatePlaylist} 
                className="flex gap-2"
              >
                <input 
                  type="text" 
                  placeholder="Spotify URL or ID..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  autoFocus
                  className="flex-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-2 text-[10px] outline-none focus:border-[var(--accent)] transition-all text-[var(--text)] placeholder:opacity-30"
                />
                <button type="submit" className="px-4 py-2 rounded-xl bg-[var(--accent)] text-[var(--onyx)] text-[10px] font-bold shadow-lg shadow-[var(--accent-light)]">Update</button>
              </motion.form>
            )}

            <div className="bg-[var(--bg)] border border-[var(--border)] rounded-2xl overflow-hidden h-[380px] shadow-inner relative">
              <iframe 
                title="Spotify Embed"
                src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
                width="100%" 
                height="380" 
                frameBorder="0" 
                allowFullScreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="w-full h-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CurrentlyPlaying;
