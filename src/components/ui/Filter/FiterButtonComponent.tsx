"use client";
import Filter from "@/components/ui/Filter/Filter";
import { FilterData } from "@/types/filter";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
  GradeFilter,
  ReligionType,
  SpecialtyType,
  TypeFilter,
} from "@/types/schools-explore";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import { useEffect } from "react";

interface FilterButtonComponentProps {
  category: FilterData;
}

export const FilterButtonComponent: React.FC<FilterButtonComponentProps> = ({
  category,
}) => {
  const {
    isOpened: isDropdownOpened,
    ref: dropdownRef,
    setIsOpened: setIsDropdownOpened,
  } = useDisclosure();

  const filters = useSchoolsExplore((state) => state.filters);
  const { setGrade, setReligion, setSpecialty, setType } = useSchoolsExplore(
    (state) => state
  );

  const handleOpenDropdown = () => {
    setIsDropdownOpened((prev) => !prev);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filterId = e.target.dataset.filter as string;
    const value = e.target.dataset.value as string;

    // Update only the relevant filter category
    switch (filterId) {
      case "grade":
        setGrade(value as GradeFilter);
        break;
      case "type":
        setType(value as TypeFilter);
        break;
      case "religion":
        setReligion(value as ReligionType);
        break;
      case "specialty":
        setSpecialty(value as SpecialtyType);
        break;
      default:
        console.warn(`Unknown filter ID: ${filterId}`);
        break;
    }
  };

  useEffect(() => {
    console.log("Current filters:", filters);
  }, [filters]);

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
            onChange={handleOptionChange}
            isChecked={
              (category.id === "grade" &&
                filters.grade.includes(option.value as GradeFilter)) ||
              (category.id === "type" &&
                filters.type.includes(option.value as TypeFilter)) ||
              (category.id === "religion" &&
                filters.religion.includes(option.value as ReligionType)) ||
              (category.id === "specialty" &&
                filters.specialty.includes(option.value as SpecialtyType))
            }
          />
        ))}
      </Filter.Dropdown>
    </div>
  );
};
