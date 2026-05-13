import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = () => {
  const [show, setShow] = useState(false);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);

  const bootLogs = [
    "INITIALIZING CORE v2.0...",
    "AUTHENTICATING BIOMETRICS...",
    "ESTABLISHING SECURE UPLINK...",
    "SYNCING TIGRAY DATA NODES...",
    "REFINING LUNA AI PARAMETERS...",
    "SYSTEMS OPTIMIZED."
  ];

  useEffect(() => {
    if (!sessionStorage.getItem('splash_shown')) {
      setShow(true);
      
      let currentLog = 0;
      const logInterval = setInterval(() => {
        if (currentLog < bootLogs.length) {
          setLogs(prev => [...prev, bootLogs[currentLog]]);
          currentLog++;
        } else {
          clearInterval(logInterval);
          setTimeout(() => {
            setShow(false);
            sessionStorage.setItem('splash_shown', 'true');
          }, 800);
        }
      }, 300);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 5;
        });
      }, 150);

      return () => {
        clearInterval(logInterval);
        clearInterval(progressInterval);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="fixed inset-0 z-[10000] bg-[var(--bg)] flex flex-col justify-center items-center text-[var(--text)] font-mono"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full max-w-md px-6 flex flex-col gap-8">
            <div className="flex justify-between items-end border-b border-[var(--accent)] pb-2">
              <span className="text-xs uppercase tracking-[0.3em] font-bold">Asmeret OS v2.0</span>
              <span className="text-sm font-bold">{Math.min(progress, 100)}%</span>
            </div>
            
            <div className="h-48 flex flex-col justify-end overflow-hidden">
              <AnimatePresence>
                {logs.map((log, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-[10px] sm:text-xs opacity-70 mb-2 font-bold tracking-widest"
                  >
                    &gt; {log}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="w-full h-1 bg-[var(--midnight)] rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[var(--accent)]"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
