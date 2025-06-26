interface SidebarHeaderProps {
  onClose: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => (
  <div className="p-4 md:p-6 border-b border-[rgba(0,0,0,0.1)] flex justify-between items-center">
    <h2 className="text-base md:text-lg font-semibold text-bold-text">All Filters</h2>
    <button
      className="bg-transparent border-none cursor-pointer p-1 text-subtle-text hover:bg-gray-100 rounded-full transition-colors"
      onClick={onClose}
    >
      <svg viewBox="0 0 24 24" className="w-5 h-5">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);
