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
            border: '1px solid var(--border)',
            background: 'var(--accent-light)',
            color: 'var(--accent)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => { 
            e.target.style.background = 'var(--accent)'; 
            e.target.style.color = 'var(--onyx)';
            e.target.style.transform = 'translateY(-1px)'; 
          }}
          onMouseLeave={(e) => { 
            e.target.style.background = 'var(--accent-light)'; 
            e.target.style.color = 'var(--accent)';
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
