"use client";
import Filter from "@/components/ui/Filter/Filter";
import { FilterData } from "@/types/filter";
import { useDropdown } from "@/hooks/useDropdown";

interface FilterButtonComponentProps {
  category: FilterData;
}

export const FilterButtonComponent: React.FC<FilterButtonComponentProps> = ({
  category,
}) => {
  const { isDropdownOpened, dropdownRef, setIsDropdownOpened } = useDropdown();

  const handleOpenDropdown = () => {
    setIsDropdownOpened((prev) => !prev);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Filter.Button
        icon={category.icon}
        label={category.label}
        onDropdownOpen={handleOpenDropdown}
      />
      <Filter.Dropdown minWidth={category.minWidth} isOpened={isDropdownOpened}>
        {category.options.map((option) => (
          <Filter.Option
            key={`${category.id}-${option.value}`}
            filter={category.id}
            option={option}
          />
        ))}
      </Filter.Dropdown>
    </div>
  );
};
