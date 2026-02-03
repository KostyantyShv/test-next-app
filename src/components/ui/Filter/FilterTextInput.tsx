import React from "react";

export const FilterTextInput: React.FC<{
  inputPlaceholder: string;
}> = ({ inputPlaceholder }) => {
  return (
    <input
      type="text"
      placeholder={`${inputPlaceholder}`}
      className="w-full px-[10px] py-[12px] border border-[var(--border-color)] rounded-[4px] text-sm outline-none bg-[var(--surface-color)] text-[var(--text-default)] placeholder:text-[var(--subtle-text)]"
    />
  );
};
