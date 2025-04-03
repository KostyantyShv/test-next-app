import React from "react";
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
  const { isOpened, ref, setIsOpened } = useDisclosure();

  const toggleDropdown = () => setIsOpened((prev) => !prev);

  const isOptionChecked = (optionValue: string): boolean => {
    if (filterKey === "collegeTypeColleges") {
      const [type, subType] = optionValue.split(": ");
      return subType
        ? filters.collegeTypeColleges[type as CollegeTypeFilter]?.includes(
            subType as CollegeSubTypeFilter
          ) || false
        : false;
    }
    const filterValues = filters[filterKey] || [];
    return (
      Array.isArray(filterValues) &&
      filterValues.includes(optionValue as FilterValue)
    );
  };

  const areAllSuboptionsChecked = (subOptions: FilterOptionType[]): boolean =>
    subOptions.every((subOption) =>
      isOptionChecked(`${subOption.parentValue || ""}: ${subOption.value}`)
    );

  const getActiveCount = (options: FilterOptionType[]): number =>
    options.reduce(
      (count, option) =>
        count +
        (option.subOptions
          ? option.subOptions.filter((subOption) =>
              isOptionChecked(`${option.value}: ${subOption.value}`)
            ).length
          : isOptionChecked(option.value)
          ? 1
          : 0),
      0
    );

  return (
    <div className="relative" ref={ref}>
      <Filter.Button
        icon={category.icon}
        label={category.label}
        onDropdownOpen={toggleDropdown}
        activeCount={getActiveCount(category.options)}
        tooltip={tooltip}
        className={
          isOpened
            ? "bg-[#EBFCF4] border-[#EBFCF4] text-[#016853]"
            : "bg-white border border-[rgba(0,0,0,0.1)]"
        }
      />
      <Filter.Dropdown isOpened={isOpened}>
        {hasTextInput && (
          <Filter.TextInput inputPlaceholder={inputPlaceholder} />
        )}
        {category.options.map((option) => (
          <Filter.Option
            key={`${category.id}-${option.value}`}
            filter={category.id}
            option={{ ...option, parentValue: undefined }}
            onChange={onChange}
            isChecked={
              filterKey === "collegeTypeColleges"
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
