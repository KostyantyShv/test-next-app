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
  filters: Partial<FiltersType>;
  filterKey: keyof FiltersType;
  tooltip?: string;
  hasTextInput?: boolean;
  inputPlaceholder?: string;
  withSubOptions?: boolean;
}

// Generic helper function to get nested filter data
const getNestedFilterData = (
  filters: Partial<FiltersType>,
  filterKey: keyof FiltersType,
  withSubOptions: boolean
): Record<string, string[]> | string[] | string | undefined => {
  if (!withSubOptions) {
    return filters[filterKey] as string[] | string | undefined;
  }

  // For nested structures, return the nested object
  return filters[filterKey] as Record<string, string[]> | undefined;
};

// Generic function to check if an option is selected
const isOptionChecked = (
  optionValue: string,
  filters: Partial<FiltersType>,
  filterKey: keyof FiltersType,
  withSubOptions: boolean = false
): boolean => {
  if (withSubOptions) {
    const [type, subType] = optionValue.split(": ");
    const nestedData = getNestedFilterData(filters, filterKey, true) as
      | Record<string, string[]>
      | undefined;

    return subType && nestedData && nestedData[type]
      ? nestedData[type].includes(subType)
      : false;
  }

  const filterValues = getNestedFilterData(filters, filterKey, false) as
    | string[]
    | string
    | undefined;

  // Handle string data
  if (typeof filterValues === "string") {
    return filterValues === optionValue;
  }

  // Handle array data
  if (Array.isArray(filterValues)) {
    return filterValues.includes(optionValue);
  }

  // Handle undefined/null
  return false;
};

// Generic function to check if all suboptions are selected
const areAllSuboptionsChecked = (
  subOptions: FilterOptionType[],
  filters: Partial<FiltersType>,
  filterKey: keyof FiltersType,
  parentValue: string = ""
): boolean => {
  return subOptions.every((subOption) =>
    isOptionChecked(
      `${parentValue}: ${subOption.value}`,
      filters,
      filterKey,
      true
    )
  );
};

// Generic function to get active count for any filter type
const getActiveCount = (
  options: FilterOptionType[],
  filters: Partial<FiltersType>,
  filterKey: keyof FiltersType,
  withSubOptions: boolean = false
): number => {
  return options.reduce((count, option) => {
    if (option.subOptions && withSubOptions) {
      // Count active suboptions
      return (
        count +
        option.subOptions.filter((subOption) =>
          isOptionChecked(
            `${option.value}: ${subOption.value}`,
            filters,
            filterKey,
            true
          )
        ).length
      );
    } else {
      // Count regular options
      return (
        count +
        (isOptionChecked(option.value, filters, filterKey, withSubOptions)
          ? 1
          : 0)
      );
    }
  }, 0);
};

// Helper function to check if any option is selected (useful for determining if filter has active state)
const hasActiveSelection = (
  filters: Partial<FiltersType>,
  filterKey: keyof FiltersType,
  withSubOptions: boolean = false
): boolean => {
  const filterData = getNestedFilterData(filters, filterKey, withSubOptions);

  if (withSubOptions) {
    const nestedData = filterData as Record<string, string[]> | undefined;
    if (!nestedData) return false;
    return Object.values(nestedData).some((arr) => arr.length > 0);
  }

  if (typeof filterData === "string") {
    return filterData.length > 0;
  }

  if (Array.isArray(filterData)) {
    return filterData.length > 0;
  }

  return false;
};

// Updated component with generic functions
export const FilterButtonComponent = ({
  category,
  onChange,
  filters,
  filterKey,
  tooltip,
  hasTextInput = false,
  inputPlaceholder = "",
  withSubOptions = false,
}: FilterButtonComponentProps) => {
  const { isOpened, ref, setIsOpened } = useDisclosure();
  const toggleDropdown = () => setIsOpened((prev) => !prev);

  // Use the generic functions
  const checkOption = (optionValue: string) =>
    isOptionChecked(optionValue, filters, filterKey, withSubOptions);

  const checkAllSuboptions = (
    subOptions: FilterOptionType[],
    parentValue: string
  ) => areAllSuboptionsChecked(subOptions, filters, filterKey, parentValue);

  const getCount = () =>
    getActiveCount(category.options, filters, filterKey, withSubOptions);

  return (
    <div className="relative" ref={ref}>
      <Filter.Button
        icon={category.icon}
        label={category.label}
        onDropdownOpen={toggleDropdown}
        activeCount={getCount()}
        tooltip={tooltip}
        className={
          isOpened
            ? "bg-[var(--apply-button-bg)] border border-[var(--apply-button-bg)] text-[var(--header-green)]"
            : "bg-[var(--surface-secondary)] border border-[var(--border-color)]"
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
              withSubOptions
                ? option.subOptions?.some((sub) =>
                    checkOption(`${option.value}: ${sub.value}`)
                  )
                : checkOption(option.value) ||
                  (option.subOptions &&
                    checkAllSuboptions(option.subOptions, option.value))
            }
            isOptionChecked={(optionValue: string) => checkOption(optionValue)}
          />
        ))}
      </Filter.Dropdown>
    </div>
  );
};
