import React from "react";
import { AccountDetailsFormData, FormFieldChangeEvent } from "./types";
import FormField from "./FormField";
import { gradYearOptions } from "./mock";

interface HighSchoolInfoProps {
  formData: AccountDetailsFormData;
  handleChange: (e: FormFieldChangeEvent) => void;
}

const HighSchoolInfo: React.FC<HighSchoolInfoProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="mt-9 pt-6 border-t border-[#e9ecef]">
      <h3 className="text-lg font-semibold text-[#464646] mb-6">
        High School Information
      </h3>
      <FormField
        label="High School Name"
        id="high-school-name"
        name="highSchoolName"
        placeholder="High School Name"
        value={formData.highSchoolName}
        onChange={handleChange}
      />
      <FormField
        label="Graduation Year"
        id="grad-year"
        name="gradYear"
        as="select"
        value={formData.gradYear}
        onChange={handleChange}
        options={gradYearOptions()}
      />
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <FormField
          label="CEEB Code"
          id="ceeb-code"
          name="ceebCode"
          placeholder="CEEB Code (Optional)"
          value={formData.ceebCode}
          onChange={handleChange}
        />
        <FormField
          label="GPA"
          id="gpa"
          name="gpa"
          type="number"
          placeholder="e.g., 3.85"
          value={formData.gpa}
          onChange={handleChange}
          step="0.01"
          min={0}
          max={5.0}
        />
      </div>
    </div>
  );
};

export default HighSchoolInfo;
