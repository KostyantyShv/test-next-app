import React, { RefObject } from "react";
import { FilterSection } from "./FilterSection"; // Import the updated FilterSection
import { Overlay } from "@/components/ui/Overlay/Overlay";
import { SidebarHeader } from "./SidebarHeader";
import { CheckboxFilter } from "./CheckBoxFilter";
import { DropdownFilter } from "./DropdownFilter";
import { SliderFilter } from "./SliderFilter";
import { SidebarFooter } from "./SidebarFooter";
import { RatingFilter } from "./RatingFilter";

interface FilterSidebarProps {
  isSidePanelOpen: boolean;
  onClose: () => void;
  sidebarRef: RefObject<HTMLDivElement | null>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isSidePanelOpen,
  onClose,
  sidebarRef,
}) => {
  const handleTuitionChange = (value: number) => {
    console.log("Tuition changed to:", value);
  };

  return (
    <>
      <Overlay isSidePanelOpen={isSidePanelOpen} />
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-[-4px_0_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out z-[1001] flex flex-col overflow-y-auto ${
          isSidePanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="sidePanel"
      >
        <SidebarHeader onClose={onClose} />
        <div className="p-6 flex-1 overflow-y-auto">
          {/* Grade Filter */}
          <FilterSection title="Grade" sectionId="grade">
            <CheckboxFilter label="Pre-K" filter="grade" value="prek" />
            <CheckboxFilter
              label="Elementary"
              filter="grade"
              value="elementary"
            />
            <CheckboxFilter label="Middle" filter="grade" value="middle" />
            <CheckboxFilter label="High School" filter="grade" value="high" />
          </FilterSection>

          {/* Highest Grade Offered Filter */}
          <FilterSection
            title="Highest grade offered"
            sectionId="highest-grade"
            hasTooltip
            tooltipText="Exclude schools that offer grades higher than the selected grade."
          >
            <DropdownFilter
              options={[
                { label: "Any", value: "any" },
                { label: "Pre-K", value: "prek" },
                { label: "Kindergarten", value: "k" },
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
                { label: "6", value: "6" },
                { label: "7", value: "7" },
                { label: "8", value: "8" },
                { label: "9", value: "9" },
                { label: "10", value: "10" },
                { label: "11", value: "11" },
                { label: "12", value: "12" },
              ]}
              defaultValue="any"
            />
          </FilterSection>

          {/* Boarding Status Filter */}
          <FilterSection title="Boarding status" sectionId="boarding">
            <CheckboxFilter
              label="Offers boarding"
              filter="boarding"
              value="yes"
            />
          </FilterSection>

          {/* Coed Status Filter */}
          <FilterSection title="Coed status" sectionId="coed">
            <div className="flex border border-[rgba(0,0,0,0.1)] rounded-3xl overflow-hidden w-fit">
              <button
                className="p-2 bg-none border-none cursor-pointer text-sm text-text-default transition-all hover:bg-[#f5f5f7] border-r border-[rgba(0,0,0,0.1)]"
                data-value="coed"
              >
                Coed
              </button>
              <button
                className="p-2 bg-none border-none cursor-pointer text-sm text-text-default transition-all hover:bg-[#f5f5f7] border-r border-[rgba(0,0,0,0.1)]"
                data-value="girls"
              >
                All-girls
              </button>
              <button
                className="p-2 bg-none border-none cursor-pointer text-sm text-text-default transition-all hover:bg-[#f5f5f7]"
                data-value="boys"
              >
                All-boys
              </button>
            </div>
          </FilterSection>

          {/* Type Filter */}
          <FilterSection title="Type" sectionId="type">
            <div className="flex flex-col">
              <CheckboxFilter
                label="Public"
                filter="type"
                value="public"
                parent="public"
              />
              <div className="ml-6 flex flex-col gap-2 mt-2">
                <CheckboxFilter
                  label="Traditional"
                  filter="type"
                  value="traditional"
                  parent="public"
                />
                <CheckboxFilter
                  label="Charter"
                  filter="type"
                  value="charter"
                  parent="public"
                />
                <CheckboxFilter
                  label="Magnet"
                  filter="type"
                  value="magnet"
                  parent="public"
                />
              </div>
            </div>
            <CheckboxFilter label="Private" filter="type" value="private" />
          </FilterSection>

          {/* Religion Filter */}
          <FilterSection title="Religion" sectionId="religion">
            <CheckboxFilter
              label="Catholic"
              filter="religion"
              value="catholic"
            />
            <CheckboxFilter
              label="Christian"
              filter="religion"
              value="christian"
            />
            <CheckboxFilter label="Jewish" filter="religion" value="jewish" />
            <CheckboxFilter label="Islamic" filter="religion" value="islamic" />
          </FilterSection>

          {/* Specialty Filter */}
          <FilterSection title="Specialty" sectionId="specialty">
            <CheckboxFilter label="Online" filter="specialty" value="online" />
            <CheckboxFilter
              label="Special Education"
              filter="specialty"
              value="special-ed"
            />
            <CheckboxFilter
              label="Montessori"
              filter="specialty"
              value="montessori"
            />
            <CheckboxFilter
              label="Therapeutic"
              filter="specialty"
              value="therapeutic"
            />
          </FilterSection>

          {/* Tuition Filter */}
          <FilterSection title="Tuition" sectionId="tuition">
            <SliderFilter
              min={0}
              max={50000}
              initialValue={25000}
              unit="$"
              onChange={handleTuitionChange}
              formatValue={(value) => `$${value.toLocaleString("en-US")}`}
            />
          </FilterSection>

          {/* Student-Teacher Ratio Filter */}
          <FilterSection
            title="Student-teacher ratio"
            sectionId="student-teacher-ratio"
            hasTooltip
            tooltipText="Ratio of students to full-time equivalent teachers. Please note: Student-teacher ratio is not a representation of average class size."
          >
            <SliderFilter
              min={2}
              max={50}
              initialValue={2}
              onChange={handleTuitionChange}
              formatValue={(value) => `${value.toLocaleString("en-US")}:1`}
            />
          </FilterSection>

          {/* Academics Filter */}
          <FilterSection title="Academics" sectionId="academics">
            <CheckboxFilter label="AP Program" filter="academics" value="ap" />
            <CheckboxFilter label="IB Program" filter="academics" value="ib" />
            <CheckboxFilter
              label="Gifted/Talented Program"
              filter="academics"
              value="gifted"
            />
          </FilterSection>

          {/* SchoolScout Grades Filter */}
          <FilterSection
            title="SchoolScout Grades"
            sectionId="schoolscout-grades"
          >
            <div className="grid gap-4">
              {["Academics", "Teachers", "Diversity", "Sports"].map(
                (category) => (
                  <div key={category} className="mb-4">
                    <div className="text-sm font-medium mb-2 text-bold-text">
                      {category}
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {["a", "b", "c", "d"].map((grade) => (
                        <button
                          key={grade}
                          className="w-9 h-9 flex items-center justify-center border border-[rgba(0,0,0,0.1)] rounded-full bg-white cursor-pointer text-sm font-medium transition-all hover:bg-[#f5f5f7]"
                          data-category={category.toLowerCase()}
                          data-grade={grade}
                        >
                          {grade.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </FilterSection>

          {/* Organization Filter */}
          <FilterSection title="Organization" sectionId="organization">
            <DropdownFilter
              options={[
                { label: "Any", value: "any" },
                {
                  label: "National Association of Independent Schools",
                  value: "nais",
                },
                {
                  label: "The Association of Boarding Schools",
                  value: "tabs",
                },
                {
                  label: "National Catholic Education Association",
                  value: "ncea",
                },
                {
                  label: "Association of Christian Schools International",
                  value: "acsi",
                },
              ]}
              defaultValue="any"
            />
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection title="Rating" sectionId="rating">
            <RatingFilter />
          </FilterSection>
        </div>
        <SidebarFooter />
      </div>
    </>
  );
};

export default FilterSidebar;
