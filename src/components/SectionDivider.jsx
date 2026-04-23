const SectionDivider = () => (
  <div className="flex items-center justify-center py-10 opacity-30 pointer-events-none">
    <div className="h-[0.5px] w-20 sm:w-32 bg-gradient-to-r from-transparent to-[var(--blush-mid)]" />
    <span className="mx-4 text-xs" style={{ color: 'var(--blush-mid)' }}>✦</span>
    <div className="h-[0.5px] w-20 sm:w-32 bg-gradient-to-l from-transparent to-[var(--blush-mid)]" />
  </div>
);

export default SectionDivider;
