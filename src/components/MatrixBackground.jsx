import { useEffect, useRef, useState } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains('light'));
    };
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const geez = 'ሀለሐመሠረሰቀበተኀነአከወዐዘየደገጠጰጸፀፈፐቈኈኰኲኳኴኵ኶';
    
    // Create a static field of characters
    const charCount = 100;
    const chars = Array.from({ length: charCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      char: geez.charAt(Math.floor(Math.random() * geez.length)),
      size: 10 + Math.random() * 20,
      opacity: 0.02 + Math.random() * 0.08,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      flicker: Math.random() * 0.01
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const isLightMode = document.documentElement.classList.contains('light');
      const accentColor = isLightMode ? '#BC8A76' : '#E0A387'; // Subtle rose gold for light mode
      
      chars.forEach(c => {
        // Move characters slowly
        c.x += c.x > width ? -width : c.x < 0 ? width : c.speedX;
        c.y += c.y > height ? -height : c.y < 0 ? height : c.speedY;

        // Subtle flicker
        const currentOpacity = c.opacity + (Math.sin(Date.now() * 0.001 + c.x) * 0.01);
        
        ctx.font = `${c.size}px "Noto Sans Ethiopic"`;
        ctx.fillStyle = accentColor;
        // Subtle balance for light mode
        ctx.globalAlpha = isLightMode ? Math.min(currentOpacity * 3, 0.15) : currentOpacity; 
        ctx.fillText(c.char, c.x, c.y);
      });

      requestAnimationFrame(draw);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    const anim = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{ opacity: isLight ? 1 : 0.8 }}
    />
  );
};

export default MatrixBackground;
