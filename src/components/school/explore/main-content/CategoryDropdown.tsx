"use client";
import { useDisclosure } from "@/hooks/useDisclosure";
import React, { JSX } from "react";

interface CategoryDropdownProps {
  value: string;
  renderDropdownItems: () => React.ReactNode;
  dropdownIcon?: JSX.Element;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  value,
  renderDropdownItems,
  dropdownIcon,
}) => {
  const { isOpened, setIsOpened, ref } = useDisclosure();

  const handleOpenDropdown = () => {
    setIsOpened((prev) => (prev = !prev));
  };

  const renderDropdownIcon = () => dropdownIcon;

  return (
    <div
      ref={ref}
      onClick={handleOpenDropdown}
      className="flex items-center gap-3 cursor-pointer p-2 rounded-[20px] hover:bg-[#f5f5f7] transition-colors duration-200 relative group"
    >
      <div className="w-6 h-6 flex items-center justify-center text-[#464646]">
        {dropdownIcon ? (
          renderDropdownIcon()
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4F4F4F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 4h6v6h-6z"></path>
            <path d="M14 4h6v6h-6z"></path>
            <path d="M4 14h6v6h-6z"></path>
            <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
          </svg>
        )}
      </div>
      <h1 className="text-lg font-semibold text-[#464646]">{value}</h1>
      <div className="w-4 h-4 ml-2 text-[#4A4A4A]">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
      <div
        className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] w-[240px] ${
          isOpened ? "block z-[1000]" : "hidden"
        }`}
      >
        {renderDropdownItems()}
      </div>
    </div>
  );
};

export default CategoryDropdown;
