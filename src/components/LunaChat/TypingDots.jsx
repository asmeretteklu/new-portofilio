const TypingDots = () => {
  return (
    <div style={{
      display: 'flex',
      gap: 6,
      padding: '12px 16px',
      width: 'fit-content',
      background: 'rgba(196,133,106,0.08)',
      borderLeft: '2px solid #c4856a',
      borderRadius: '12px 12px 12px 2px',
      marginTop: 8,
    }}>
      <style>{`
        @keyframes luna-typing-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
        .luna-dot {
          animation: luna-typing-bounce 1.2s infinite;
        }
        .luna-dot-1 { animation-delay: 0s; }
        .luna-dot-2 { animation-delay: 0.15s; }
        .luna-dot-3 { animation-delay: 0.3s; }
      `}</style>
      <div className="luna-dot luna-dot-1" style={{ width: 6, height: 6, borderRadius: '50%', background: '#c4856a' }}></div>
      <div className="luna-dot luna-dot-2" style={{ width: 6, height: 6, borderRadius: '50%', background: '#c4856a' }}></div>
      <div className="luna-dot luna-dot-3" style={{ width: 6, height: 6, borderRadius: '50%', background: '#c4856a' }}></div>
    </div>
  );
};

export default TypingDots;
