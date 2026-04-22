const TypingDots = () => {
  return (
    <div className="flex gap-1.5 p-3 w-fit rounded-2xl rounded-tl-sm mt-2" style={{ background: 'rgba(237,147,177,0.08)' }}>
      <style>{`
        @keyframes typing-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .dot {
          animation: typing-bounce 1s infinite;
        }
        .dot-1 { animation-delay: 0s; }
        .dot-2 { animation-delay: 0.15s; }
        .dot-3 { animation-delay: 0.3s; }
      `}</style>
      <div className="w-1.5 h-1.5 rounded-full dot dot-1" style={{ background: 'var(--blush-mid)', opacity: 0.5 }}></div>
      <div className="w-1.5 h-1.5 rounded-full dot dot-2" style={{ background: 'var(--blush-mid)', opacity: 0.5 }}></div>
      <div className="w-1.5 h-1.5 rounded-full dot dot-3" style={{ background: 'var(--blush-mid)', opacity: 0.5 }}></div>
    </div>
  );
};

export default TypingDots;
