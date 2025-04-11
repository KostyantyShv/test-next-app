import React from "react";
import { AccountDetailsFormData, FormFieldChangeEvent } from "./types";
import FormField from "./FormField";
import {
  collegeTypeOptions,
  degreeTypeOptions,
  majorsList,
  rotcOptions,
  sportsOptions,
  statesList,
} from "./mock";
import Autocomplete from "./Autocomplete";

interface CollegePreferencesProps {
  formData: AccountDetailsFormData;
  selectedMajors: string[];
  selectedStates: string[];
  handleChange: (e: FormFieldChangeEvent) => void;
  handleAddMajor: (major: string) => void;
  handleRemoveMajor: (major: string) => void;
  handleAddState: (state: string) => void;
  handleRemoveState: (state: string) => void;
}

const CollegePreferences: React.FC<CollegePreferencesProps> = ({
  formData,
  selectedMajors,
  selectedStates,
  handleChange,
  handleAddMajor,
  handleRemoveMajor,
  handleAddState,
  handleRemoveState,
}) => {
  return (
    <div className="mt-9 pt-6 border-t border-[#e9ecef]">
      <h3 className="text-lg font-semibold text-[#464646] mb-6">
        College Preferences
      </h3>
      <FormField
        label="Intended Degree Type"
        id="intendedDegreeType"
        name="intendedDegreeType"
        as="select"
        value={formData.intendedDegreeType}
        onChange={handleChange}
        options={degreeTypeOptions}
      />
      <FormField
        label="Intended College Type"
        id="intendedCollegeType"
        name="intendedCollegeType"
        as="select"
        value={formData.intendedCollegeType}
        onChange={handleChange}
        options={collegeTypeOptions}
      />
      <FormField
        label="Do you intend to be recruited for a sport?"
        id="sports"
        name="sports"
        as="select"
        value={formData.sports}
        onChange={handleChange}
        options={sportsOptions}
      />
      <FormField label="Majors You're Interested In" id="major-input" name="">
        <Autocomplete
          id="major-input"
          placeholder="Enter a major"
          dataList={majorsList}
          selectedItems={selectedMajors}
          onAddItem={handleAddMajor}
          onRemoveItem={handleRemoveMajor}
        />
      </FormField>
      <FormField
        label="States You're Interested In"
        id="state-input"
        hint="By default, we'll search anywhere in the U.S."
        name=""
      >
        <Autocomplete
          id="state-input"
          placeholder="Enter a state"
          dataList={statesList}
          selectedItems={selectedStates}
          onAddItem={handleAddState}
          onRemoveItem={handleRemoveState}
        />
      </FormField>
      <FormField
        label="Are you interested in receiving information about ROTC from schools?"
        id="rotc"
        name="rotc"
        as="select"
        value={formData.rotc}
        onChange={handleChange}
        options={rotcOptions}
      />
    </div>
  );
};

export default CollegePreferences;
