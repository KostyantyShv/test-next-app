import React from "react";
import { AccountDetailsFormData, FormFieldChangeEvent } from "./types";
import FormField from "./FormField";
import AvatarUpload from "./AvatarUpload";
import { countryOptions, preferredContactOptions } from "./mock";

interface PersonalDetailsProps {
  formData: AccountDetailsFormData;
  emailReadOnly: boolean;
  handleChange: (e: FormFieldChangeEvent) => void;
  handleEmailChangeToggle: () => void;
}

const PersonalDetails: React.FC<PersonalDetailsProps> = ({
  formData,
  emailReadOnly,
  handleChange,
  handleEmailChangeToggle,
}) => {
  return (
    <div className="bg-white rounded-lg p-7 mb-7 shadow-card border border-[#e7eaf3] last:mb-0">
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <FormField
          label="First Name"
          id="first-name"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <FormField
          label="Last Name"
          id="last-name"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <FormField
        label="Username"
        id="username"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="!bg-[#f6f6f6]"
      />
      <FormField label="Email" id="email" name="email">
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            readOnly={emailReadOnly}
            className="w-full p-2.5 border border-border-color rounded !bg-[#f6f6f6] text-text-color focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors pr-24"
          />
          <span
            onClick={handleEmailChangeToggle}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary font-semibold text-xs cursor-pointer select-none"
          >
            Change Email
          </span>
        </div>
      </FormField>
      <FormField
        label="Account ID"
        id="account-id"
        name="accountId"
        placeholder="Account ID"
        value={formData.accountId ?? ""}
        readOnly
        hint="Your unique account identifier"
        className="!bg-[#f6f6f6]"
      />
      <FormField label="Avatar" id="avatar" name="">
        <AvatarUpload defaultSrc="https://via.placeholder.com/80" />
      </FormField>
      <FormField
        label="Address"
        id="address-line1"
        name="addressLine1"
        placeholder="Start typing your address..."
        value={formData.addressLine1}
        onChange={handleChange}
      />
      <FormField
        label="Address Line 2"
        id="address-line2"
        name="addressLine2"
        placeholder="PO Box, apartment number, etc."
        value={formData.addressLine2}
        onChange={handleChange}
      />
      <div className="grid grid-cols-3 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
        <FormField
          label="City"
          id="city"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <FormField
          label="State"
          id="state"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />
        <FormField
          label="ZIP"
          id="zip"
          name="zip"
          placeholder="ZIP Code"
          value={formData.zip}
          onChange={handleChange}
        />
      </div>
      <FormField
        label="Country"
        id="country"
        name="country"
        as="select"
        value={formData.country}
        onChange={handleChange}
        options={countryOptions}
      />
      <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1">
        <FormField
          label="Phone"
          id="phone"
          name="phone"
          type="tel"
          placeholder="(555) 555-5555"
          value={formData.phone}
          onChange={handleChange}
          hint="Including area code"
        />
        <FormField
          label="Home phone"
          id="home-phone"
          name="homePhone"
          type="tel"
          placeholder="(555) 555-5555"
          value={formData.homePhone}
          onChange={handleChange}
          hint="If different from Phone, including area code"
        />
      </div>
      <FormField
        label="Preferred method of contact"
        id="preferred-contact"
        name="preferredContact"
        as="select"
        value={formData.preferredContact}
        onChange={handleChange}
        options={preferredContactOptions}
      />
    </div>
  );
};

export default PersonalDetails;
