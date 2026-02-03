import { useSchoolsExplore } from "@/store/use-schools-explore";
import { FilterItem } from "@/types/schools-explore";
import React from "react";

interface ResetButtonProps {
  filters: () => FilterItem[];
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ filters, onClick }) => {
  return (
    <>
      {filters().length ? (
        <button
          className="items-center flex gap-1.5 w-fit bg-transparent border-none text-[var(--text-default)] text-xs cursor-pointer px-2 py-1 rounded hover:bg-[var(--hover-bg)] transition-all"
          id="resetAllBtn"
          onClick={onClick}
        >
          <svg
            fill="none"
            viewBox="0 0 14 14"
            strokeWidth="1.2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              d="M1 1L13 13M11.9588 2.62429H3.59188C3.47354 2.62419 3.35768 2.65941 3.25817 2.72574C3.15867 2.79208 3.07973 2.88671 3.03082 2.99831C2.98191 3.10991 2.9651 3.23374 2.98239 3.35498C2.99969 3.47622 3.05037 3.58973 3.12836 3.6819L6.39213 7.54388C6.49029 7.66021 6.54432 7.8095 6.54417 7.96399V11.0712C6.54417 11.1207 6.5553 11.1695 6.57667 11.2137C6.59804 11.258 6.62906 11.2965 6.66729 11.3262L8.51401 12.7605C8.55974 12.7961 8.61411 12.8177 8.67104 12.823C8.72797 12.8283 8.7852 12.8171 8.83633 12.7906C8.88745 12.7642 8.93045 12.7235 8.9605 12.6731C8.99055 12.6228 9.00647 12.5647 9.00647 12.5055V7.96399C9.00632 7.8095 9.06035 7.66021 9.15852 7.54388L12.4223 3.68127C12.7707 3.26944 12.4875 2.62429 11.9588 2.62429Z"
            />
          </svg>
          Reset All
        </button>
      ) : null}
    </>
  );
};

export default ResetButton;
