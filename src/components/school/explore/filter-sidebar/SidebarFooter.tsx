export const SidebarFooter: React.FC = () => (
  <div className="p-4 border-t border-[rgba(0,0,0,0.1)] flex justify-between items-center gap-4">
    <button className="p-2 bg-white border border-[rgba(0,0,0,0.15)] rounded text-sm font-medium text-text-default transition-all hover:bg-[#f5f5f7]">
      Clear
    </button>
    <button className="p-2 bg-primary-blue border-none rounded text-sm font-medium text-white transition-all hover:bg-[#0080a0] bg-[#0093B0] flex-1">
      Show Results
    </button>
  </div>
);
