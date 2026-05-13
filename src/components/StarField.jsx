import { useEffect, useState } from 'react';

const StarField = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starCount = 150;
    const newStars = Array.from({ length: starCount }).map(() => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2,
      opacity: Math.random(),
      duration: 2 + Math.random() * 3
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[var(--star-opacity)]">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-[var(--accent)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s infinite ease-in-out`
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
