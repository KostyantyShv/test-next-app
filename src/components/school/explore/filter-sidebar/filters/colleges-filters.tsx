import React from "react";
import { FilterSection } from "../FilterSection";
import { useSchoolsExplore } from "@/store/use-schools-explore";
import {
  admissionsProcess,
  FILTER_CONFIG,
  FILTER_MOCK,
  generalAreaOfStudy,
  religionAffiliation,
  startingSalaryAfterGraduation,
} from "../../mock";
import { DropdownFilter } from "../DropdownFilter";
import Filter from "@/components/ui/Filter/Filter";
import {
  AdmissionsProcess,
  CollegeSpecialty,
  CollegeSubTypeFilter,
  CollegeTypeFilter,
  FiltersType,
  FilterValue,
  GenAreaOfStudy,
  GoodFor,
  MajorsType,
  OnlineFriendliness,
  ReligionAffiliation,
  Selectivity,
  StartingSalaryAfterGraduation,
  StudentBodySize,
} from "@/types/schools-explore";
import SliderFilter from "../SliderFilter";
import { RatingFilter } from "../RatingFilter";

interface CollegesFiltersProps {
  isOptionChecked: (optionValue: string, key: keyof FiltersType) => boolean;
}

const CollegesFilters: React.FC<CollegesFiltersProps> = ({
  isOptionChecked,
}) => {
  const {
    filterColleges,
    setCollegeType,
    setGenAreaOfStudy,
    setRating,
    setMajors,
    setCost,
    setOnlineFriendliness,
    setStudentBodySize,
    setCollegeSpecialty,
    setAdmissionsProcess,
    setReligionAffiliation,
    setSelectivity,
    setAct,
    setSat,
    setGoodFor,
    setStartingSalaryAfterGraduation,
  } = useSchoolsExplore((state) => state);

  const isCollegeOptionChecked = (optionValue: string): boolean => {
    const [type, subType] = optionValue.split(": ");
    return subType
      ? filterColleges.collegeTypeColleges[type as CollegeTypeFilter]?.includes(
          subType as CollegeSubTypeFilter
        ) || false
      : false;
  };

  const handleStartingSalaryAfterGraduationChange = (value: string) => {
    setStartingSalaryAfterGraduation(value as StartingSalaryAfterGraduation);
  };

  const handleGoodForChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setGoodFor(value as GoodFor);
  };

  const handleSelectivityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setSelectivity(value as Selectivity);
  };

  const handleReligionAffiliation = (value: string) => {
    setReligionAffiliation(value as ReligionAffiliation);
  };
  const handleGenAreaOfStudyChange = (value: string) => {
    setGenAreaOfStudy(value as GenAreaOfStudy);
  };

  const handleStudentBodySizeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.dataset.value as string;
    setStudentBodySize(value as StudentBodySize);
  };

  const handleAdmissionsProcessChange = (value: string) => {
    setAdmissionsProcess(value as AdmissionsProcess);
  };

  const handleCollegeSpecialtyChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.dataset.value as string;
    setCollegeSpecialty(value as CollegeSpecialty);
  };

  const handleMajorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as string;
    setMajors(value as MajorsType);
  };

  const handleCollegeTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.dataset.value as FilterValue;
    const [type, subType] = (value as string).split(": ");
    if (subType) {
      setCollegeType(
        type as CollegeTypeFilter,
        subType as CollegeSubTypeFilter
      );
    }
  };

  const handleOnlineFriendlinessChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.dataset.value as string;
    setOnlineFriendliness(value as OnlineFriendliness);
  };

  return (
    <>
      <FilterSection title="College type" sectionId="college type">
        {FILTER_CONFIG.Colleges[0].category.options.map((option) => (
          <Filter.Option
            key={`${FILTER_CONFIG.Colleges[0].category.id}-${option.value}`}
            filter={FILTER_CONFIG.Colleges[0].category.id}
            option={{ ...option, parentValue: undefined }} // No parentValue for top-level options
            onChange={handleCollegeTypeChange}
            isChecked={option.subOptions?.some((sub) =>
              isCollegeOptionChecked(`${option.value}: ${sub.value}`)
            )}
            isOptionChecked={isCollegeOptionChecked}
          />
        ))}
      </FilterSection>
      <FilterSection
        title="General area of study"
        sectionId="general area of study"
        hasTooltip
        tooltipText="Select an area of study to view top schools for students studying in those general fields."
      >
        <DropdownFilter
          options={generalAreaOfStudy}
          defaultValue={filterColleges.genAreaOfStudy}
          onChange={handleGenAreaOfStudyChange}
        />
      </FilterSection>
      <FilterSection
        title="Majors"
        sectionId="Majors"
        hasTooltip
        tooltipText="Select a major to filter your search to only schools that offer degrees in that specific major or program. Enter a major before choosing whether you want to study online or on campus."
      >
        {FILTER_MOCK.MAJORS.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.MAJORS}-${option.value}`}
            filter={FILTER_MOCK.MAJORS.id}
            option={option}
            onChange={handleMajorsChange}
            isChecked={isOptionChecked(option.value, "majors")}
          />
        ))}
      </FilterSection>
      <FilterSection
        title="Online friendliness"
        sectionId="Online friendliness"
        hasTooltip
        tooltipText="Online categories are primarily based on the number of majors that can be completed online. For more information view the college's Niche profile or visit the college's website."
      >
        {FILTER_MOCK.ONLINE_FRIENDLINESS.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.ONLINE_FRIENDLINESS}-${option.value}`}
            filter={FILTER_MOCK.ONLINE_FRIENDLINESS.id}
            option={option}
            onChange={handleOnlineFriendlinessChange}
            isChecked={isOptionChecked(option.value, "onlineFriendliness")}
          />
        ))}
      </FilterSection>
      <FilterSection
        title="Cost (net price)"
        sectionId="Cost (net price)"
        hasTooltip
        tooltipText="Average cost of attendance after financial aid and scholarships are considered. Learn more about interpreting and comparing college costs."
      >
        <SliderFilter
          min={2000}
          max={35000}
          initialValue={2000}
          value={filterColleges.cost}
          onSetValue={setCost}
          unit="$"
          formatValue={(value) => `$${value.toLocaleString("en-US")}`}
        />
      </FilterSection>
      <FilterSection
        title="Student body size"
        sectionId="Student body size"
        hasTooltip
        tooltipText="Small: Less than 5,000 students
                            Medium: 5,000-15,000 students
                            Large: More than 15,000 students"
      >
        {FILTER_MOCK.STUDENT_BODY_SIZE.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.STUDENT_BODY_SIZE}-${option.value}`}
            filter={FILTER_MOCK.STUDENT_BODY_SIZE.id}
            option={option}
            onChange={handleStudentBodySizeChange}
            isChecked={isOptionChecked(option.value, "studentBodySize")}
          />
        ))}
      </FilterSection>
      <FilterSection title="Specialty" sectionId="Student body size">
        {FILTER_MOCK.COLLEGE_SPECIALTY.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.COLLEGE_SPECIALTY}-${option.value}`}
            filter={FILTER_MOCK.COLLEGE_SPECIALTY.id}
            option={option}
            onChange={handleCollegeSpecialtyChange}
            isChecked={isOptionChecked(option.value, "collegeSpecialty")}
          />
        ))}
      </FilterSection>
      <FilterSection
        title="Test scores"
        sectionId="Test scores"
        hasTooltip
        tooltipText="Average SAT and ACT scores of admitted students."
      >
        <SliderFilter
          min={0}
          label="SAT:"
          max={1600}
          initialValue={0}
          value={filterColleges.sat}
          onSetValue={setSat}
          formatValue={(value) => String(value)}
        />
        <SliderFilter
          min={12}
          max={36}
          label="ACT:"
          initialValue={12}
          value={filterColleges.act}
          onSetValue={setAct}
          formatValue={(value) => String(value)}
        />
      </FilterSection>
      <FilterSection title="Admissions process" sectionId="Admissions process">
        <DropdownFilter
          options={admissionsProcess}
          defaultValue={filterColleges.admissionsProcess}
          onChange={handleAdmissionsProcessChange}
        />
      </FilterSection>
      <FilterSection
        title="Selectivity"
        sectionId="Selectivity"
        hasTooltip
        tooltipText="Based on acceptance rates and SAT/ACT scores of previously accepted students."
      >
        {FILTER_MOCK.SELECTIVITY.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.SELECTIVITY}-${option.value}`}
            filter={FILTER_MOCK.SELECTIVITY.id}
            option={option}
            onChange={handleSelectivityChange}
            isChecked={isOptionChecked(option.value, "selectivity")}
          />
        ))}
      </FilterSection>
      <FilterSection
        title="Religion affiliation"
        sectionId="Religion affiliation"
      >
        <DropdownFilter
          options={religionAffiliation}
          defaultValue={filterColleges.religionAffiliation}
          onChange={handleReligionAffiliation}
        />
      </FilterSection>
      <FilterSection title="Rating" sectionId="rating">
        <RatingFilter rating={filterColleges.rating} setRating={setRating} />
      </FilterSection>
      <FilterSection
        title="Good for"
        sectionId="Good for"
        hasTooltip
        tooltipText=" A critical mass of the student body falls within the specified group, low and middle income students pay a reasonable net price, the school participates in tuition relief programs for veterans, and the school's overall Niche Grade is above a B-."
      >
        {FILTER_MOCK.GOOD_FOR.options.map((option) => (
          <Filter.Option
            key={`${FILTER_MOCK.GOOD_FOR}-${option.value}`}
            filter={FILTER_MOCK.GOOD_FOR.id}
            option={option}
            onChange={handleGoodForChange}
            isChecked={isOptionChecked(option.value, "goodFor")}
          />
        ))}
      </FilterSection>
      <FilterSection
        title="Starting salary after graduation"
        sectionId="Starting salary after graduation"
        hasTooltip
        tooltipText="Median salary of all students at the school employed 2 years after graduation."
      >
        <DropdownFilter
          options={startingSalaryAfterGraduation}
          defaultValue={filterColleges.startingSalaryAfterGraduation}
          onChange={handleStartingSalaryAfterGraduationChange}
        />
      </FilterSection>
    </>
  );
};

export default CollegesFilters;
