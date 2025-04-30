export const MobileHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-20">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-[#202124]">
            What`s on this month?
          </span>
        </div>
      </div>
    </header>
  );
};
