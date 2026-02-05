import React, { RefObject } from "react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarFooter } from "./SidebarFooter";

interface FilterSidebarProps {
  isSidePanelOpen: boolean;
  onClose: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
  renderFilters: () => React.ReactNode | null;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isSidePanelOpen,
  onClose,
  sidebarRef,
  renderFilters,
}) => {
  return (
    <aside
      ref={sidebarRef}
      id="sidePanel"
      className={`fixed top-[64px] bottom-0 right-0 w-full md:w-[400px] bg-[var(--surface-color)] shadow-[-4px_0_6px_-1px_var(--shadow-color)] transition-transform duration-300 ease-in-out z-[1001] flex flex-col overflow-y-auto ${isSidePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <SidebarHeader onClose={onClose} />
      <div className="p-4 md:p-6 flex-1 overflow-y-auto">{renderFilters()}</div>
      <SidebarFooter />
    </aside>
  );
};

export default FilterSidebar;

