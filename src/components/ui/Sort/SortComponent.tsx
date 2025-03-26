"use client";
import React, { useState } from "react";
import Sort from "./Sort";
import { sortMock } from "@/components/school/explore/mock";
import { SortData, SortOption } from "@/types/sort";
import { useDisclosure } from "@/hooks/useDisclosure";

interface SortProps {
  sortData?: SortData;
  onSortChange?: (value: string) => void;
}

export const SortComponent: React.FC<SortProps> = ({
  sortData = sortMock,
  onSortChange,
}) => {
  const firstOption = sortData.options[0];
  const {
    ref: dropdownRef,
    isOpened: isDropdownOpened,
    setIsOpened: setIsDropdownOpened,
  } = useDisclosure();
  const [selectedOption, setSelectedOption] = useState(firstOption);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    setIsDropdownOpened(false);
    if (onSortChange) {
      onSortChange(option.value);
    }
  };

  const handleOpenDropdown = () =>
    setIsDropdownOpened((prev) => (prev = !prev));

  return (
    <div className="relative" ref={dropdownRef}>
      <Sort.Button
        icon={sortData.icon}
        label={selectedOption.label}
        onClick={handleOpenDropdown}
      />
      <Sort.Dropdown minWidth={sortData.minWidth} isOpened={isDropdownOpened}>
        {sortData.options.map((option) => (
          <Sort.Option
            key={option.value}
            option={option}
            isSelected={selectedOption.value === option.value}
            onClick={() => handleOptionClick(option)}
          />
        ))}
      </Sort.Dropdown>
    </div>
  );
};
