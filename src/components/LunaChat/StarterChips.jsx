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
            border: '0.5px solid rgba(237,147,177,0.3)', 
            background: 'rgba(237,147,177,0.05)', 
            color: 'rgba(240,232,224,0.6)',
          }}
          onMouseEnter={(e) => { e.target.style.background = 'rgba(237,147,177,0.12)'; e.target.style.borderColor = 'var(--blush-mid)'; e.target.style.color = 'var(--blush-mid)'; }}
          onMouseLeave={(e) => { e.target.style.background = 'rgba(237,147,177,0.05)'; e.target.style.borderColor = 'rgba(237,147,177,0.3)'; e.target.style.color = 'rgba(240,232,224,0.6)'; }}
        >
          {q}
        </motion.button>
      ))}
    </div>
  );
};

export default StarterChips;
