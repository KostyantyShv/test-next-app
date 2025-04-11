"use client";
import React from "react";
import { useAccountForm } from "./useAccountForm.hook";
import Section from "./Section";
import PersonalDetails from "./PersonalDetails";
import SocialProfile from "./SocialProfile";
import SchoolScoutProfile from "./SchoolScoutProfile";

const AccountDetails: React.FC = () => {
  const {
    formData,
    emailReadOnly,
    selectedMajors,
    selectedStates,
    handleChange,
    handleCheckboxChange,
    handleRadioChange,
    handleSave,
    handleEmailChangeToggle,
    handleAddMajor,
    handleRemoveMajor,
    handleAddState,
    handleRemoveState,
  } = useAccountForm();

  return (
    <div className="max-w-[1140px] mx-auto px-5 py-10">
      <div className="flex justify-between items-center mb-10 pb-5 max-md:flex-col max-md:items-start max-md:gap-4">
        <h1 className="text-3xl font-bold text-[#464646]">Account Details</h1>
        <button
          onClick={handleSave}
          className="bg-[#1B1B1B] text-white border-none rounded px-4 py-2 font-medium text-sm"
        >
          Save
        </button>
      </div>

      <Section
        title="Personal Details"
        description="Edit your account information, here."
      >
        <PersonalDetails
          formData={formData}
          emailReadOnly={emailReadOnly}
          handleChange={handleChange}
          handleEmailChangeToggle={handleEmailChangeToggle}
        />
      </Section>

      <Section
        title="Social Profile"
        description="Edit information displayed publicly on course details page & communities."
      >
        <SocialProfile formData={formData} handleChange={handleChange} />
      </Section>

      <Section
        title="SchoolScout Profile"
        description="Information related to your academic and college search journey."
      >
        <SchoolScoutProfile
          formData={formData}
          selectedMajors={selectedMajors}
          selectedStates={selectedStates}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          handleRadioChange={handleRadioChange}
          handleAddMajor={handleAddMajor}
          handleRemoveMajor={handleRemoveMajor}
          handleAddState={handleAddState}
          handleRemoveState={handleRemoveState}
          handleSave={handleSave}
        />
      </Section>
    </div>
  );
};

export default AccountDetails;
