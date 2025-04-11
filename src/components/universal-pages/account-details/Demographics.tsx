import React from "react";
import { AccountDetailsFormData, FormFieldChangeEvent } from "./types";
import FormField from "./FormField";
import {
  citizenshipStatusOptions,
  genderOptions,
  primaryCitizenshipOptions,
  raceOptions,
  religionOptions,
  yesNoOptions,
} from "./mock";
import RadioGroup from "./RadioGroup";

interface DemographicsProps {
  formData: AccountDetailsFormData;
  handleChange: (e: FormFieldChangeEvent) => void;
  handleRadioChange: (
    name: keyof AccountDetailsFormData
  ) => (value: string) => void;
}

const Demographics: React.FC<DemographicsProps> = ({
  formData,
  handleChange,
  handleRadioChange,
}) => {
  return (
    <div className="mt-9 pt-6 border-t border-[#e9ecef] first:mt-0 first:pt-0 first:border-t-0">
      <h3 className="text-lg font-semibold text-[#464646] mb-6">
        Demographics
      </h3>
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <FormField
          label="Birthdate"
          id="birthdate"
          name="birthdate"
          type="date"
          value={formData.birthdate}
          onChange={handleChange}
        />
        <FormField
          label="Gender"
          id="gender"
          name="gender"
          as="select"
          value={formData.gender}
          onChange={handleChange}
          options={genderOptions}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <FormField
          label="Religion"
          id="religion"
          name="religion"
          as="select"
          value={formData.religion}
          onChange={handleChange}
          options={religionOptions}
        />
        <FormField
          label="Race"
          id="race"
          name="race"
          as="select"
          value={formData.race}
          onChange={handleChange}
          options={raceOptions}
        />
      </div>
      <RadioGroup
        label="Are you a first generation student?"
        name="firstGen"
        value={formData.firstGen}
        onChange={handleRadioChange("firstGen")}
        options={yesNoOptions}
      />
      <RadioGroup
        label="Are you a veteran or currently serving in the U.S. Military (including reserves)?"
        name="veteran"
        value={formData.veteran}
        onChange={handleRadioChange("veteran")}
        options={yesNoOptions}
      />
      <RadioGroup
        label="Hispanic or Latinx?"
        name="hispanicLatinx"
        value={formData.hispanicLatinx}
        onChange={handleRadioChange("hispanicLatinx")}
        options={yesNoOptions}
      />
      <FormField
        label="Citizenship Status"
        id="citizenshipStatus"
        name="citizenshipStatus"
        as="select"
        value={formData.citizenshipStatus}
        onChange={handleChange}
        options={citizenshipStatusOptions}
      />
      <FormField
        label="Primary country of citizenship"
        id="primaryCitizenship"
        name="primaryCitizenship"
        as="select"
        value={formData.primaryCitizenship}
        onChange={handleChange}
        options={primaryCitizenshipOptions}
      />
    </div>
  );
};

export default Demographics;
