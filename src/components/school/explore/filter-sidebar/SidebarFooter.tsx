export const SidebarFooter: React.FC = () => (
  <div className="p-4 border-t border-[var(--border-color)] flex justify-between items-center gap-3 md:gap-4">
    <button className="px-4 py-3 md:p-2 bg-[var(--surface-secondary)] border border-[var(--border-color)] rounded-lg md:rounded text-sm font-medium text-[var(--text-default)] transition-all hover:bg-[var(--hover-bg)]">
      Clear
    </button>
    <button className="px-4 py-3 md:p-2 border-none rounded-lg md:rounded text-sm font-medium text-white transition-all bg-[var(--verification-blue)] hover:opacity-90 flex-1">
      Show Results
    </button>
  </div>
);
