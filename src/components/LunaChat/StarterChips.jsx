import { motion } from 'framer-motion';
import { starterQuestions } from '../../data/portfolio';

const StarterChips = ({ onSelect }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
      {starterQuestions.map((q, idx) => (
        <motion.button
          key={q}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 + 0.3 }}
          onClick={() => onSelect(q)}
          style={{ 
            padding: '6px 14px',
            borderRadius: 100,
            fontFamily: "'DM Mono', 'DM Sans', monospace",
            fontSize: '0.62rem',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            border: '1px solid rgba(196,133,106,0.28)',
            background: 'rgba(196,133,106,0.1)',
            color: '#d4a088',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => { 
            e.target.style.background = 'rgba(196,133,106,0.2)'; 
            e.target.style.borderColor = 'rgba(196,133,106,0.5)'; 
            e.target.style.color = '#c4856a';
            e.target.style.transform = 'translateY(-1px)'; 
          }}
          onMouseLeave={(e) => { 
            e.target.style.background = 'rgba(196,133,106,0.1)'; 
            e.target.style.borderColor = 'rgba(196,133,106,0.28)'; 
            e.target.style.color = '#d4a088';
            e.target.style.transform = 'translateY(0)'; 
          }}
        >
          {q}
        </motion.button>
      ))}
    </div>
  );
};

export default StarterChips;
