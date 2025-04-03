import React from "react";

export const FilterTextInput: React.FC<{
  inputPlaceholder: string;
}> = ({ inputPlaceholder }) => {
  return (
    <input
      type="text"
      placeholder={`${inputPlaceholder}`}
      className="w-full px-[10px] py-[12px] border border-[1px_solid_rgba(0,_0,_0,_0.15)] rounded-[4px] text-sm outline-none"
    />
  );
};
