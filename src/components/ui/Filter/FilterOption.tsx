import { FilterOptionType } from "@/types/filter";
import React from "react";

export interface FilterOptionProps {
  filter: string;
  option: FilterOptionType;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean | undefined;
  level?: number;
  isOptionChecked?: (optionValue: string) => boolean;
}

export const FilterOption: React.FC<FilterOptionProps> = ({
  filter,
  option,
  onChange,
  isChecked,
  level = 0,
  isOptionChecked,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);

      if (option.subOptions && option.subOptions.length > 0) {
        const isMainChecked = e.target.checked;
        option.subOptions.forEach((subOption) => {
          const syntheticEvent = {
            target: {
              dataset: { filter, value: `${option.value}: ${subOption.value}` },
              checked: isMainChecked,
            },
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        });
      }
    }
  };

  const areAllSuboptionsChecked =
    option.subOptions && option.subOptions.length > 0 && isOptionChecked
      ? option.subOptions.every((subOption) =>
          isOptionChecked(`${option.value}: ${subOption.value}`)
        )
      : false;

  const finalChecked = isChecked || areAllSuboptionsChecked;

  // Use parentValue only for collegeType suboptions; otherwise, use option.value alone
  const valueForInput = option.parentValue
    ? `${option.parentValue}: ${option.value}` // Suboption case (e.g., "2-year: Community")
    : option.value; // Top-level or non-nested case (e.g., "2-year" or "christian")

  return (
    <div className="filter-option-wrapper">
      <label
        className={`filter-option flex items-center gap-2 px-3 py-2 rounded hover:bg-[#f8fafc] cursor-pointer text-sm`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        <input
          type="checkbox"
          data-filter={filter}
          data-value={valueForInput}
          checked={finalChecked}
          className="w-4 h-4 border-2 border-[#cbd5e0] rounded cursor-pointer"
          onChange={handleChange}
        />
        {option.label}
      </label>
      {option.subOptions && option.subOptions.length > 0 && (
        <div className="sub-options">
          {option.subOptions.map((subOption: FilterOptionType) => (
            <FilterOption
              key={`${filter}-${subOption.value}`}
              filter={filter}
              option={{ ...subOption, parentValue: option.value }}
              onChange={onChange}
              isChecked={
                isOptionChecked
                  ? isOptionChecked(`${option.value}: ${subOption.value}`)
                  : false
              }
              level={level + 1}
              isOptionChecked={isOptionChecked}
            />
          ))}
        </div>
      )}
    </div>
  );
};
