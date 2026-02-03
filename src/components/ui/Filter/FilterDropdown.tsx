interface FilterDropdownProps {
  children: React.ReactNode;
  isOpened: boolean;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  children,
  isOpened,
}) => (
  <div
    className={`filter-dropdown absolute top-full left-0 mt-2 bg-[var(--surface-secondary)] border border-[var(--border-color)] rounded-lg shadow-[0_4px_12px_var(--shadow-color)] p-2 min-w-[200px] text-[var(--text-default)] ${
      isOpened ? "block" : "hidden"
    } z-[1000]`}
  >
    {children}
  </div>
);
