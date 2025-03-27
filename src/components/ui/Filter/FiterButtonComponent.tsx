"use client";
import Filter from "@/components/ui/Filter/Filter";
import { FilterData } from "@/types/filter";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useEffect } from "react";
import { FiltersType, FilterValue } from "@/types/schools-explore";

interface FilterButtonComponentProps {
  category: FilterData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters: FiltersType;
  filterKey: keyof FiltersType;
}

interface FilterButtonComponentProps {
  category: FilterData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters: FiltersType;
  filterKey: keyof FiltersType;
}

export const FilterButtonComponent = ({
  category,
  onChange,
  filters,
  filterKey,
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
    const filterValues = filters[filterKey] || [];
    if (Array.isArray(filterValues)) {
      return filterValues.includes(optionValue as FilterValue);
    }
    return false;
  };

  const activeCount = Array.isArray(filters[filterKey])
    ? filters[filterKey].length
    : 0;

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
      />
      <Filter.Dropdown minWidth={category.minWidth} isOpened={isDropdownOpened}>
        {category.options.map((option) => (
          <Filter.Option
            key={`${category.id}-${option.value}`}
            filter={category.id}
            option={option}
            onChange={onChange}
            isChecked={isOptionChecked(option.value)}
          />
        ))}
      </Filter.Dropdown>
    </div>
  );
};
