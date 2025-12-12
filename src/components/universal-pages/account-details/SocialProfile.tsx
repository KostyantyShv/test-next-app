import React from "react";
import FormField from "./FormField";
import { AccountDetailsFormData, FormFieldChangeEvent } from "./types";

interface SocialProfileProps {
  formData: AccountDetailsFormData;
  handleChange: (e: FormFieldChangeEvent) => void;
}

const SocialProfile: React.FC<SocialProfileProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="bg-white rounded-lg p-7 mb-7 shadow-card border border-[#e7eaf3] last:mb-0">
      <FormField
        label="Bio"
        id="bio"
        name="bio"
        as="textarea"
        placeholder="Public Bio"
        value={formData.bio}
        onChange={handleChange}
      />
      <FormField
        label="Facebook"
        id="facebook-url"
        name="facebookUrl"
        type="url"
        placeholder="Facebook URL"
        value={formData.facebookUrl}
        onChange={handleChange}
      />
      <FormField
        label="Twitter"
        id="twitter-url"
        name="twitterUrl"
        type="url"
        placeholder="Twitter URL"
        value={formData.twitterUrl}
        onChange={handleChange}
      />
      <FormField
        label="LinkedIn"
        id="linkedin-url"
        name="linkedinUrl"
        type="url"
        placeholder="LinkedIn URL"
        value={formData.linkedinUrl}
        onChange={handleChange}
      />
    </div>
  );
};

export default SocialProfile;
