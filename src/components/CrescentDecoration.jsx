const crescents = [
  // Hero right background
  { id: 'hero', top: '15%', right: '5%', size: 180, rotate: 25, opacity: 0.06 },
  // Luna section background
  { id: 'luna', top: '10%', left: '3%', size: 140, rotate: -40, opacity: 0.05 },
  // About section
  { id: 'about', bottom: '20%', right: '8%', size: 100, rotate: 70, opacity: 0.07 },
  // Contact section
  { id: 'contact', top: '30%', left: '5%', size: 200, rotate: -15, opacity: 0.08 },
];

const CrescentMoonSVG = ({ size, rotate, opacity }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotate}deg)`, opacity }}
  >
    <path
      d="M70 15 A40 40 0 1 0 70 85 A30 30 0 1 1 70 15Z"
      stroke="var(--gold)"
      strokeWidth="1"
      fill="none"
    />
  </svg>
);

const CrescentDecoration = ({ section }) => {
  const config = crescents.find(c => c.id === section);
  if (!config) return null;

  const posStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    zIndex: 0,
  };

  if (config.top) posStyle.top = config.top;
  if (config.bottom) posStyle.bottom = config.bottom;
  if (config.left) posStyle.left = config.left;
  if (config.right) posStyle.right = config.right;

  return (
    <div style={posStyle}>
      <CrescentMoonSVG size={config.size} rotate={config.rotate} opacity={config.opacity} />
    </div>
  );
};

export default CrescentDecoration;
