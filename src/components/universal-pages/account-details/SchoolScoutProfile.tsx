import React from "react";
import Demographics from "./Demographics";
import TestScores from "./TestScores";
import CollegePreferences from "./CollegePreferences";
import HighSchoolInfo from "./HighSchoolInfo";
import { AccountDetailsFormData, FormFieldChangeEvent } from "./types";

interface SchoolScoutProfileProps {
  formData: AccountDetailsFormData;
  selectedMajors: string[];
  selectedStates: string[];
  handleChange: (e: FormFieldChangeEvent) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (
    name: keyof AccountDetailsFormData
  ) => (value: string) => void;
  handleAddMajor: (major: string) => void;
  handleRemoveMajor: (major: string) => void;
  handleAddState: (state: string) => void;
  handleRemoveState: (state: string) => void;
  handleSave: () => void;
}

const SchoolScoutProfile: React.FC<SchoolScoutProfileProps> = ({
  formData,
  selectedMajors,
  selectedStates,
  handleChange,
  handleCheckboxChange,
  handleRadioChange,
  handleAddMajor,
  handleRemoveMajor,
  handleAddState,
  handleRemoveState,
  handleSave,
}) => {
  return (
    <>
      <div className="bg-card-bg rounded-lg p-7 mb-7 shadow-card border border-[#e7eaf3] last:mb-0">
        <Demographics
          formData={formData}
          handleChange={handleChange}
          handleRadioChange={handleRadioChange}
        />
        <TestScores
          formData={formData}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
        />
        <CollegePreferences
          formData={formData}
          selectedMajors={selectedMajors}
          selectedStates={selectedStates}
          handleChange={handleChange}
          handleAddMajor={handleAddMajor}
          handleRemoveMajor={handleRemoveMajor}
          handleAddState={handleAddState}
          handleRemoveState={handleRemoveState}
        />
        <HighSchoolInfo formData={formData} handleChange={handleChange} />
      </div>
      <div className="flex justify-end mt-7 pt-5 border-t border-gray-200">
        <button
          onClick={handleSave}
          className="bg-save-button-bg text-white border-none py-2.5 px-5 rounded font-semibold text-sm hover:bg-save-button-hover transition-colors"
        >
          Save
        </button>
      </div>
    </>
  );
};

export default SchoolScoutProfile;
