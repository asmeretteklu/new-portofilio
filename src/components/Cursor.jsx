import { useEffect, useRef, useState } from 'react';

const Cursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Show cursor on mousemove instead of leaving it in middle
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)`;
      }
    };

    const handleMouseOver = (e) => {
      // Check if hovering over clickable elements
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Animation loop for the lagging ring
    let reqId;
    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }
      reqId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(reqId);
    };
  }, []);

  // Use inline styles for dynamic hover state transforms combined with the position
  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-[10px] h-[10px] bg-gold rounded-full pointer-events-none z-[9999] -ml-[5px] -mt-[5px] transition-transform duration-200"
        style={{ transform: `scale(${isHovering ? 2.5 : 1})` }}
      />
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-[36px] h-[36px] border-[1.5px] border-gold rounded-full pointer-events-none z-[9999] -ml-[18px] -mt-[18px] transition-all duration-300 ease-out ${isHovering ? 'scale-[1.6] opacity-50' : 'scale-100 opacity-100'}`}
      />
    </>
  );
};

export default Cursor;
