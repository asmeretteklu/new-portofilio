import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';

const PLAYLIST = [
  { title: "willow",               artist: "sombr",            color: "#C9A96E", url: "https://www.youtube.com/watch?v=KLnLOT6qZH4" },
  { title: "everything i wanted",  artist: "Billie Eilish",    color: "#9F8BBD", url: "https://www.youtube.com/watch?v=rodyJ8gGEFc" },
  { title: "Caroline",             artist: "sombr",            color: "#ED93B1", url: "https://www.youtube.com/watch?v=aFPPIPV4vlk" },
  { title: "ocean eyes",           artist: "Billie Eilish",    color: "#9F8BBD", url: "https://www.youtube.com/watch?v=HQitbbtPZz8" },
  { title: "bad guy",              artist: "Billie Eilish",    color: "#ED93B1", url: "https://www.youtube.com/watch?v=4-TbQnONe_w" },
  { title: "weak",                 artist: "sombr",            color: "#C9A96E", url: "https://www.youtube.com/watch?v=F1Y5sbeZx_k" },
  { title: "happier than ever",    artist: "Billie Eilish",    color: "#9F8BBD", url: "https://www.youtube.com/watch?v=VC17QJXu0nc" },
];

const VinylDisc = ({ color, spinning }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" className={spinning ? 'vinyl-spin' : ''} style={{ flexShrink: 0 }}>
    <circle cx="14" cy="14" r="13" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    <circle cx="14" cy="14" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
    <circle cx="14" cy="14" r="7" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
    <circle cx="14" cy="14" r="4" fill={color} opacity="0.8" />
    <circle cx="14" cy="14" r="1.5" fill="var(--bg)" />
  </svg>
);

const WaveformBars = ({ active }) => (
  <div className="flex items-end gap-[2px] h-3">
    {[1,2,3,4].map(i => (
      <div
        key={i}
        className="waveform-bar"
        style={{
          height: active ? undefined : `${3 + i * 2}px`,
          animationPlayState: active ? 'running' : 'paused',
        }}
      />
    ))}
  </div>
);

const CurrentlyPlaying = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolume, setShowVolume] = useState(false);
  const volumeTimeout = useRef(null);

  const song = PLAYLIST[currentIndex];

  // Fade in after 3s
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = useCallback((e) => {
    e.stopPropagation();
    setIsPlaying(prev => !prev);
  }, []);

  // nextSong without requiring event (for onEnded callback from ReactPlayer)
  const nextSong = useCallback((e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % PLAYLIST.length);
    setIsLiked(false);
  }, []);

  const handleEnded = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % PLAYLIST.length);
    setIsLiked(false);
  }, []);

  const prevSong = useCallback((e) => {
    e.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsLiked(false);
  }, []);

  const adjustVolume = useCallback((delta) => {
    setVolume(prev => Math.min(1, Math.max(0, +(prev + delta).toFixed(2))));
    setShowVolume(true);
    if (volumeTimeout.current) clearTimeout(volumeTimeout.current);
    volumeTimeout.current = setTimeout(() => setShowVolume(false), 1500);
  }, []);

  const openSpotify = useCallback(() => {
    window.open(`https://open.spotify.com/search/${encodeURIComponent(song.title + ' ' + song.artist)}`, '_blank');
  }, [song]);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 left-4 sm:left-6 z-[60] pointer-events-auto"
    >
      {/* ReactPlayer — Must technically be 'visible' inside the viewport so YouTube doesn't auto-pause it to save resources. We hide it behind everything else using a negative z-index. */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px', opacity: 0.01, pointerEvents: 'none', zIndex: -50 }}>
        <ReactPlayer
          url={song.url}
          playing={isPlaying}
          volume={volume}
          width="300px"
          height="300px"
          onEnded={handleEnded}
          playsinline={true}
          onError={(e) => console.error("ReactPlayer Error:", e)}
          config={{
            youtube: {
              playerVars: { showinfo: 0, controls: 0, playsinline: 1, origin: typeof window !== 'undefined' ? window.location.origin : '' }
            }
          }}
        />
      </div>

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full shadow-lg font-body"
            style={{ fontSize: '0.55rem', letterSpacing: '0.1em', color: 'var(--blush-mid)', background: 'var(--card-bg)', border: '0.5px solid var(--blush)' }}
          >
            asmeret's current vibe ✦
          </motion.div>
        )}
      </AnimatePresence>

      {/* Volume indicator */}
      <AnimatePresence>
        {showVolume && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full shadow-lg font-body"
            style={{ fontSize: '0.6rem', color: 'var(--blush-mid)', background: 'var(--card-bg)', border: '0.5px solid var(--blush)' }}
          >
            🔊 {Math.round(volume * 100)}%
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative overflow-hidden rounded-full flex items-center transition-all duration-300 group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'var(--card-bg)',
          backdropFilter: 'blur(12px)',
          border: `0.5px solid ${song.color}44`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.08), 0 0 20px ${song.color}10`,
        }}
      >
        {/* Playback Controls */}
        <div className="flex items-center gap-1 pl-3 pr-1">
          <button onClick={prevSong} className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors rounded-full" style={{ color: 'var(--muted)' }} title="Previous track">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2"></line></svg>
          </button>

          <button onClick={togglePlay} className="flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors rounded-full" style={{ color: 'var(--blush-mid)' }} title={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>

          <button onClick={nextSong} className="flex-shrink-0 w-6 h-6 flex items-center justify-center transition-colors rounded-full" style={{ color: 'var(--muted)' }} title="Next track">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2"></line></svg>
          </button>
        </div>

        {/* Vinyl + Waveform */}
        <div className="flex items-center gap-2 pr-1">
          <VinylDisc color={song.color} spinning={isPlaying} />
          <WaveformBars active={isPlaying} />
        </div>

        {/* Track info */}
        <button onClick={openSpotify} className="flex flex-col items-start overflow-hidden flex-1 relative z-10 px-2 py-2 text-left min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <span className="font-body uppercase tracking-widest block truncate" style={{ fontSize: '0.65rem', color: song.color, fontWeight: 500 }}>
                {song.title}
              </span>
              <span className="font-body block truncate" style={{ fontSize: '0.55rem', color: 'var(--muted)' }}>
                {song.artist}
              </span>
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Volume */}
        <div className="flex items-center gap-0 flex-shrink-0 pr-1">
          <button onClick={(e) => { e.stopPropagation(); adjustVolume(-0.1); }} className="w-7 h-7 flex items-center justify-center transition-colors rounded-full" style={{ color: 'var(--muted)' }} title="Volume down">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button onClick={(e) => { e.stopPropagation(); adjustVolume(0.1); }} className="w-7 h-7 flex items-center justify-center transition-colors rounded-full" style={{ color: 'var(--muted)' }} title="Volume up">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        {/* Heart */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-sm transition-transform hover:scale-110 active:scale-90 mr-2"
          style={{ color: isLiked ? song.color : 'var(--muted)' }}
        >
          {isLiked ? '♥' : '♡'}
        </button>
      </div>
    </motion.div>
  );
};

export default CurrentlyPlaying;
