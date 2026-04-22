import { tickerItems } from '../data/portfolio';

const Ticker = () => {
  const repeatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="w-full py-4 overflow-hidden flex relative group cursor-default z-10" style={{ background: 'var(--blush-light)', borderTop: '0.5px solid var(--blush)', borderBottom: '0.5px solid var(--blush)' }}>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="flex animate-marquee whitespace-nowrap min-w-max">
        <span className="font-body uppercase px-4 flex items-center" style={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: 'var(--blush-mid)', fontWeight: 500 }}>
          {repeatedItems.map((item, index) => (
            <span key={index} className="flex items-center">
              {item}
              {index !== repeatedItems.length - 1 && <span className="mx-6" style={{ color: 'var(--blush)' }}>·</span>}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Ticker;
