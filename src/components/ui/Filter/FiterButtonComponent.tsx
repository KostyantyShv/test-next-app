import React, { useEffect } from "react";
import Filter from "@/components/ui/Filter/Filter";
import { FilterData, FilterOptionType } from "@/types/filter";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
  CollegeSubTypeFilter,
  CollegeTypeFilter,
  FiltersType,
  FilterValue,
} from "@/types/schools-explore";

interface FilterButtonComponentProps {
  category: FilterData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters: FiltersType;
  filterKey: keyof FiltersType;
  tooltip?: string;
  hasTextInput?: boolean;
  inputPlaceholder?: string;
}

export const FilterButtonComponent = ({
  category,
  onChange,
  filters,
  filterKey,
  tooltip,
  hasTextInput = false,
  inputPlaceholder = "",
}: FilterButtonComponentProps) => {
  const {
    isOpened: isDropdownOpened,
    ref: dropdownRef,
    setIsOpened: setIsDropdownOpened,
  } = useDisclosure();

  const handleOpenDropdown = () => {
    setIsDropdownOpened((prev) => !prev);
  };

  const isOptionChecked = (optionValue: string): boolean => {
    if (filterKey === "collegeType") {
      const [type, subType] = optionValue.split(": ");
      return subType
        ? filters.collegeType[type as CollegeTypeFilter]?.includes(
            subType as CollegeSubTypeFilter
          ) || false
        : false; // Top-level collegeType (e.g., "2-year") isn’t directly checked
    }
    const filterValues = filters[filterKey] || [];
    if (Array.isArray(filterValues)) {
      return filterValues.includes(optionValue as FilterValue);
    }
    return false;
  };

  const areAllSuboptionsChecked = (subOptions: FilterOptionType[]): boolean => {
    return subOptions.every((subOption) =>
      isOptionChecked(`${subOption.parentValue || ""}: ${subOption.value}`)
    );
  };

  const getActiveCount = (options: FilterOptionType[]): number => {
    let count = 0;
    options.forEach((option) => {
      if (option.subOptions) {
        count += option.subOptions.filter((subOption) =>
          isOptionChecked(`${option.value}: ${subOption.value}`)
        ).length;
      } else if (isOptionChecked(option.value)) {
        count++;
      }
    });
    return count;
  };

  const activeCount = getActiveCount(category.options);

  useEffect(() => {
    console.log(`Current ${String(filterKey)} filters:`, filters[filterKey]);
  }, [filters, filterKey]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Filter.Button
        icon={category.icon}
        label={category.label}
        onDropdownOpen={handleOpenDropdown}
        activeCount={activeCount}
        tooltip={tooltip}
      />
      <Filter.Dropdown isOpened={isDropdownOpened}>
        {hasTextInput ? (
          <Filter.TextInput inputPlaceholder={inputPlaceholder} />
        ) : null}
        {category.options.map((option) => (
          <Filter.Option
            key={`${category.id}-${option.value}`}
            filter={category.id}
            option={{ ...option, parentValue: undefined }} // No parentValue for top-level options
            onChange={onChange}
            isChecked={
              filterKey === "collegeType"
                ? option.subOptions?.some((sub) =>
                    isOptionChecked(`${option.value}: ${sub.value}`)
                  )
                : isOptionChecked(option.value) ||
                  (option.subOptions &&
                    areAllSuboptionsChecked(option.subOptions))
            }
            isOptionChecked={isOptionChecked}
          />
        ))}
      </Filter.Dropdown>
    </div>
  );
};
