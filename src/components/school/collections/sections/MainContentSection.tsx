import React, { useState } from "react";
import Header from "../../explore/main-content/Header";
import { schools } from "../../explore/mock";
import {
  DROPDOWN_CATEGORIES,
  DROPDOWN_CATEGORIES_ICONS,
  DROPDOWN_ITEMS,
  DROPDOWN_SUBCATEGORIES_ICONS,
  layouts,
} from "../mock";
import { useSchoolsCollection } from "@/store/use-schools-collections";
import { SubcategoryType } from "@/types/schools-collections";
import ActionsDropdown from "../components/ActionsDropdown/ActionsDropdown";
import CreateCollectionModal from "../components/CreateCollectionModal/CreateCollectionModal";
import ContentArea from "./ContentArea";

interface MainContentSectionProps {
  onContainerExpandChange?: (isExpanded: boolean) => void;
}

const MainContentSection: React.FC<MainContentSectionProps> = ({
  onContainerExpandChange,
}) => {
  const { subcategory, setSubcategory } = useSchoolsCollection(
    (state) => state
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [layout, setLayout] = useState("classic");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderDropdownItems = () => (
    <>
      {DROPDOWN_CATEGORIES.map((category, index) => {
        return (
          <div key={index} className="mb-6">
            <div className="flex flex-row gap-3 m-[12px_16px_0px] pb-3 border-b-2 items-center">
              <span className="text-[#4A4A4A]">
                {DROPDOWN_CATEGORIES_ICONS[category]}
              </span>
              <span className="text-[#464646] font-semibold text-sm">
                {category}
              </span>
            </div>
            <div>
              {DROPDOWN_ITEMS[category].map((item) => {
                const subcategory = item.title as SubcategoryType;
                return (
                  <div
                    key={item.id}
                    className="flex flex-row gap-3 p-[12px_16px_8px] hover:bg-[rgba(0,0,0,0.04)] items-center"
                    data-dropdown-select="true"
                    onClick={() => setSubcategory(subcategory)}
                  >
                    <span className="text-[#4A4A4A]">{item.icon}</span>
                    <span className="text-[#464646] text-sm">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );

  const handleOpenModal = (value: boolean) => {
    setIsModalOpen(value);
  };

  const renderActionsDropdown = () => (
    <ActionsDropdown handleOpenModal={handleOpenModal} />
  );

  const renderItemsCount = () => (
    <div className="text-sm text-[#4A4A4A]">
      <span className="flex items-center whitespace-nowrap gap-2">
        <strong>75</strong> items ·
        <div className="w-4 h-4">
          <svg viewBox="0 0 24 24">
            <g fillRule="evenodd" strokeWidth="1" stroke="none">
              <polygon
                points="2 2 22 2 22 22 2 22"
                opacity="0"
                fill="none"
              ></polygon>
              <path d="M17,11 L17,7 C17,4.25 14.75,2 12,2 C9.25,2 7,4.25 7,7 L7,11 C5.91666667,11 5,11.9166667 5,13 L5,20 C5,21.0833333 5.91666667,22 7,22 L17,22 C18.0833333,22 19,21.0833333 19,20 L19,13 C19,11.9166667 18.0833333,11 17,11 Z M12,18 C11.1666667,18 10.5,17.3333333 10.5,16.5 C10.5,15.6666667 11.1666667,15 12,15 C12.8333333,15 13.5,15.6666667 13.5,16.5 C13.5,17.3333333 12.8333333,18 12,18 Z M15,11 L9,11 L9,7 C9,5.33333333 10.3333333,4 12,4 C13.6666667,4 15,5.33333333 15,7 L15,11 Z"></path>
            </g>
          </svg>
        </div>
        <strong>private</strong>
      </span>
    </div>
  );

  return (
    <div className="w-full mx-auto bg-white rounded-none border-0 shadow-none md:rounded-xl md:border md:border-[rgba(0,0,0,0.1)] md:shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-visible">
      <Header
        schools={schools}
        layouts={layouts}
        dropdownValue={subcategory}
        dropdownIcon={DROPDOWN_SUBCATEGORIES_ICONS[subcategory]}
        renderDropdownItems={renderDropdownItems}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        isMapActive={isMapActive}
        setIsMapActive={setIsMapActive}
        layout={layout}
        setLayout={setLayout}
        renderActionsButton={renderActionsDropdown}
        renderItemsCount={renderItemsCount}
        onContainerExpandChange={onContainerExpandChange}
      />
      <ContentArea isMapActive={isMapActive} layout={layout} />
      <CreateCollectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MainContentSection;
