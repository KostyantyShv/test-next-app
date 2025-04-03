interface FilterDropdownProps {
  children: React.ReactNode;
  isOpened: boolean;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  children,
  isOpened,
}) => (
  <div
    className={`filter-dropdown absolute top-full left-0 mt-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-2 min-w-[200px] ${
      isOpened ? "block" : "hidden"
    } z-[1000]`}
  >
    {children}
  </div>
);
