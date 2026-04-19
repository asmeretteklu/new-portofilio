import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';

const PLAYLIST = [
  { title: "obsessed",        artist: "Olivia Rodrigo",      color: "#c4856a" },
  { title: "golden hour",     artist: "JVKE",                color: "#c4913a" },
  { title: "Creepin'",        artist: "Metro Boomin",         color: "#9b89c4" },
  { title: "Flowers",         artist: "Miley Cyrus",          color: "#2d9a82" },
  { title: "Kill Bill",       artist: "SZA",                  color: "#c4856a" },
  { title: "Calm Down",       artist: "Rema & Selena Gomez",  color: "#c4913a" },
  { title: "Lift Me Up",      artist: "Rihanna",              color: "#9b89c4" },
  { title: "Escapism",        artist: "RAYE",                 color: "#2d9a82" },
];

// Lofi ambient background audio (YouTube lofi stream)
const AUDIO_URL = "https://www.youtube.com/watch?v=jfKfPfyJRdk";

const VinylDisc = ({ color, spinning }) => (
  <svg width="28" height="28" viewBox="0 0 28 28" className={spinning ? 'vinyl-spin' : ''} style={{ flexShrink: 0 }}>
    <circle cx="14" cy="14" r="13" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
    <circle cx="14" cy="14" r="10" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
    <circle cx="14" cy="14" r="7" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
    <circle cx="14" cy="14" r="4" fill={color} opacity="0.8" />
    <circle cx="14" cy="14" r="1.5" fill="var(--ink)" />
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

  // Rotate display song every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % PLAYLIST.length);
      setIsLiked(false);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
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
      {/* Hidden Native Audio Player - Guaranteed to work across adblockers and mobile browsers */}
      <audio
        ref={(audioEl) => {
          if (audioEl) {
            audioEl.volume = volume;
            if (isPlaying) {
              audioEl.play().catch(e => console.error("Audio block:", e));
            } else {
              audioEl.pause();
            }
          }
        }}
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
        loop
        crossOrigin="anonymous"
      />

      {/* Tooltip on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-gold px-3 py-1 rounded-full border border-gold-border bg-ink2/90 backdrop-blur-sm shadow-lg"
            style={{ fontSize: '0.55rem', letterSpacing: '0.1em' }}
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
            className="absolute -top-9 left-1/2 -translate-x-1/2 font-mono text-gold px-3 py-1 rounded-full bg-ink2/95 backdrop-blur-sm border border-gold-border shadow-lg"
            style={{ fontSize: '0.6rem' }}
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
          background: 'rgba(17,14,26,0.88)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${song.color}33`,
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${song.color}10`,
        }}
      >
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-gold hover:text-gold-light transition-colors rounded-full ml-1"
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}><polygon points="5 3 19 12 5 21 5 3"/></svg>
          )}
        </button>

        {/* Vinyl + Waveform */}
        <div className="flex items-center gap-2 pr-1">
          <VinylDisc color={song.color} spinning={isPlaying} />
          <WaveformBars active={isPlaying} />
        </div>

        {/* Track info — click opens Spotify */}
        <button
          onClick={openSpotify}
          className="flex flex-col items-start overflow-hidden flex-1 relative z-10 px-2 py-2 text-left min-w-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <span
                className="font-mono uppercase tracking-widest block truncate"
                style={{ fontSize: '0.65rem', color: song.color }}
              >
                {song.title}
              </span>
              <span
                className="font-ui block truncate"
                style={{ fontSize: '0.55rem', color: 'var(--paper3)' }}
              >
                {song.artist}
              </span>
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Volume controls */}
        <div className="flex items-center gap-0 flex-shrink-0 pr-1">
          <button
            onClick={(e) => { e.stopPropagation(); adjustVolume(-0.1); }}
            className="w-7 h-7 flex items-center justify-center text-paper3 hover:text-gold transition-colors rounded-full"
            title="Volume down"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); adjustVolume(0.1); }}
            className="w-7 h-7 flex items-center justify-center text-paper3 hover:text-gold transition-colors rounded-full"
            title="Volume up"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>

        {/* Heart */}
        <button
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center text-sm transition-transform hover:scale-110 active:scale-90 mr-2"
          style={{ color: isLiked ? song.color : 'var(--paper4)' }}
        >
          {isLiked ? '♥' : '♡'}
        </button>
      </div>
    </motion.div>
  );
};

export default CurrentlyPlaying;
