import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const SecretVideoModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10001] bg-black/95 flex items-center justify-center p-6 backdrop-blur-xl"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-all border border-white/10"
            >
              <X size={24} />
            </button>
            
            <video 
              autoPlay 
              controls 
              playsInline
              className="w-full h-full object-contain"
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="absolute bottom-6 left-6 z-20 px-6 py-2 rounded-full bg-[var(--accent)]/90 backdrop-blur-md text-[var(--onyx)] font-mono text-xs font-bold uppercase tracking-widest">
              Access Granted: The Story Behind The Code
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretVideoModal;
