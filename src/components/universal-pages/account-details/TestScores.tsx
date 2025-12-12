import React from "react";
import { AccountDetailsFormData, FormFieldChangeEvent } from "./types";
import FormField from "./FormField";

interface TestScoresProps {
  formData: AccountDetailsFormData;
  handleChange: (e: FormFieldChangeEvent) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TestScores: React.FC<TestScoresProps> = ({
  formData,
  handleChange,
  handleCheckboxChange,
}) => {
  return (
    <div className="mt-9 pt-6 border-t border-[#e9ecef]">
      <h3 className="text-lg font-semibold text-[#464646] mb-6">Test Scores</h3>
      <div className="mb-5">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="no-tests"
            name="noTests"
            checked={formData.noTests}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-primary border-border-color !bg-white focus:ring-0 cursor-pointer"
          />
          <label
            htmlFor="no-tests"
            className="ml-2.5 text-sm text-text-color cursor-pointer"
          >
            I do not plan on taking the SAT or ACT tests.
          </label>
        </div>
      </div>
      <fieldset
        disabled={formData.noTests}
        className={formData.noTests ? "opacity-50" : ""}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-color mb-2">
            SAT Scores
          </label>
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <FormField
              id="sat-ebrw"
              name="satEbrw"
              type="number"
              placeholder="EBRW"
              value={formData.satEbrw}
              onChange={handleChange}
              min={200}
              max={800}
              className="text-center"
            />
            <FormField
              id="sat-math"
              name="satMath"
              type="number"
              placeholder="Math"
              value={formData.satMath}
              onChange={handleChange}
              min={200}
              max={800}
              className="text-center"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-text-color mb-2">
            ACT Scores
          </label>
          <div className="grid grid-cols-4 gap-4 max-md:grid-cols-2 max-sm:grid-cols-1">
            <FormField
              id="act-english"
              name="actEnglish"
              type="number"
              placeholder="English"
              value={formData.actEnglish}
              onChange={handleChange}
              min={1}
              max={36}
              className="text-center"
            />
            <FormField
              id="act-math"
              name="actMath"
              type="number"
              placeholder="Math"
              value={formData.actMath}
              onChange={handleChange}
              min={1}
              max={36}
              className="text-center"
            />
            <FormField
              id="act-reading"
              name="actReading"
              type="number"
              placeholder="Reading"
              value={formData.actReading}
              onChange={handleChange}
              min={1}
              max={36}
              className="text-center"
            />
            <FormField
              id="act-science"
              name="actScience"
              type="number"
              placeholder="Science"
              value={formData.actScience}
              onChange={handleChange}
              min={1}
              max={36}
              className="text-center"
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default TestScores;
