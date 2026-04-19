const TypingDots = () => {
  return (
    <div className="flex gap-1.5 p-3 w-fit bg-ink3 rounded-2xl rounded-tl-sm mt-2">
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
      <div className="w-1.5 h-1.5 bg-paper2/50 rounded-full dot dot-1"></div>
      <div className="w-1.5 h-1.5 bg-paper2/50 rounded-full dot dot-2"></div>
      <div className="w-1.5 h-1.5 bg-paper2/50 rounded-full dot dot-3"></div>
    </div>
  );
};

export default TypingDots;
