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
          className="px-3 py-1.5 rounded-full border border-border/50 bg-ink hover:bg-gold-pale hover:border-gold/50 text-paper2 hover:text-gold font-mono text-[0.65rem] uppercase tracking-wider text-left transition-all"
        >
          {q}
        </motion.button>
      ))}
    </div>
  );
};

export default StarterChips;
