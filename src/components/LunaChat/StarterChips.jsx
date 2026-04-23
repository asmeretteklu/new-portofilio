import { motion } from 'framer-motion';
import { starterQuestions } from '../../data/portfolio';

const StarterChips = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {starterQuestions.map((q, idx) => (
        <motion.button
          key={q}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 + 0.3 }}
          onClick={() => onSelect(q)}
          className="px-3 py-1.5 rounded-full font-body text-left transition-all"
          style={{ 
            fontSize: '0.65rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.06em',
            border: '0.5px solid var(--border-color)', 
            background: 'var(--card-bg)', 
            color: 'var(--text-muted)',
          }}
          onMouseEnter={(e) => { e.target.style.background = 'var(--blush-light)'; e.target.style.borderColor = 'var(--blush-mid)'; e.target.style.color = 'var(--blush-mid)'; }}
          onMouseLeave={(e) => { e.target.style.background = 'var(--card-bg)'; e.target.style.borderColor = 'var(--border-color)'; e.target.style.color = 'var(--text-muted)'; }}
        >
          {q}
        </motion.button>
      ))}
    </div>
  );
};

export default StarterChips;
