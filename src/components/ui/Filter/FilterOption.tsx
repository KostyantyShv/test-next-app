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
  const { value, label, subOptions, parentValue } = option;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange(e);

    if (subOptions?.length) {
      const isMainChecked = e.target.checked;
      subOptions.forEach((subOption) => {
        const syntheticEvent = {
          target: {
            dataset: { filter, value: `${value}: ${subOption.value}` },
            checked: isMainChecked,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      });
    }
  };

  const areAllSuboptionsChecked =
    subOptions?.length && isOptionChecked
      ? subOptions.every((sub) => isOptionChecked(`${value}: ${sub.value}`))
      : false;

  const finalChecked = isChecked || areAllSuboptionsChecked;
  const valueForInput = parentValue ? `${parentValue}: ${value}` : value;

  return (
    <div className="filter-option-wrapper">
      <label
        className="filter-option flex items-center gap-2 px-3 py-2 rounded hover:bg-[var(--hover-bg)] cursor-pointer text-sm text-[var(--text-default)]"
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        <input
          type="checkbox"
          data-filter={filter}
          data-value={valueForInput}
          checked={finalChecked}
          className="w-4 h-4 border-2 border-[var(--border-color)] rounded cursor-pointer accent-[var(--header-green)]"
          onChange={handleChange}
        />
        {label}
      </label>
      {subOptions && subOptions?.length > 0 && (
        <div className="sub-options">
          {subOptions.map((subOption) => (
            <FilterOption
              key={`${filter}-${subOption.value}`}
              filter={filter}
              option={{ ...subOption, parentValue: value }}
              onChange={onChange}
              isChecked={
                isOptionChecked?.(`${value}: ${subOption.value}`) ?? false
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
