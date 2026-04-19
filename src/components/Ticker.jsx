import { tickerItems } from '../data/portfolio';

const Ticker = () => {
  const repeatedItems = [...tickerItems, ...tickerItems]; // Duplicate for seamless infinite scroll

  return (
    <div className="w-full bg-gold-pale border-y border-border py-4 overflow-hidden flex relative group cursor-default z-10">
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
        <span className="font-mono text-[0.72rem] text-gold uppercase tracking-[0.2em] px-4 flex items-center">
          {repeatedItems.map((item, index) => (
            <span key={index} className="flex items-center">
              {item}
              {index !== repeatedItems.length - 1 && <span className="mx-6 text-border-hover">·</span>}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Ticker;
