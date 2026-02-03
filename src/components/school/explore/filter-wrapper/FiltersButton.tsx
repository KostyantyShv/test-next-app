import { FilterItem } from "@/types/schools-explore";
import React from "react";

interface FiltersButtonProps {
  onClick: () => void;
  filtersFlat: () => FilterItem[];
}

const FiltersButton: React.FC<FiltersButtonProps> = ({
  filtersFlat,
  onClick,
}) => {
  return (
    <button
      className="more-filters-button flex items-center gap-2 px-4 py-2 bg-[var(--surface-secondary)] border border-[var(--border-color)] rounded-md text-[var(--text-default)] font-medium text-sm hover:bg-[var(--hover-bg)] transition-all"
      id="moreFiltersBtn"
      onClick={onClick}
    >
      {filtersFlat().length ? (
        <span
          className={`${
            filtersFlat().length ? "flex" : "hidden"
          } bg-[#00DF8B] text-white w-5 h-5 rounded-full text-xs font-medium items-center justify-center`}
        >
          {filtersFlat().length}
        </span>
      ) : (
        <span className="filter-add-icon">
          <svg viewBox="0 0 448 512" width="14" height="14" fill="currentColor">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
        </span>
      )}
      Filters
    </button>
  );
};

export default FiltersButton;
