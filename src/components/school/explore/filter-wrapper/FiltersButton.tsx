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
      className="more-filters-button flex items-center bg-[#F2F2F2] border-none cursor-pointer text-[var(--text-default)] font-medium text-sm transition-all hover:bg-[#e2e8f0]"
      style={{
        gap: '8px',
        padding: '8px 16px',
        borderRadius: '6px',
      }}
      id="moreFiltersBtn"
      onClick={onClick}
    >
      {filtersFlat().length ? (
        <span
          className="flex bg-[#00DF8B] text-white rounded-full text-xs font-medium items-center justify-center"
          style={{
            width: '20px',
            height: '20px',
          }}
        >
          {filtersFlat().length}
        </span>
      ) : (
        <span className="filter-add-icon flex items-center justify-center">
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
