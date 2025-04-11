import { useState } from "react";
import { AccountDetailsFormData, FormFieldChangeEvent } from "./types";

interface UseAccountFormReturn {
  formData: AccountDetailsFormData;
  emailReadOnly: boolean;
  selectedMajors: string[];
  selectedStates: string[];
  handleChange: (e: FormFieldChangeEvent) => void;
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRadioChange: (
    name: keyof AccountDetailsFormData
  ) => (value: string) => void;
  handleSave: () => void;
  handleEmailChangeToggle: () => void;
  handleAddMajor: (major: string) => void;
  handleRemoveMajor: (major: string) => void;
  handleAddState: (state: string) => void;
  handleRemoveState: (state: string) => void;
}

export const useAccountForm = (): UseAccountFormReturn => {
  const [formData, setFormData] = useState<AccountDetailsFormData>({
    firstName: "",
    lastName: "",
    username: "UserABC",
    email: "abc@gmail.com",
    accountId: "1234567899",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
    phone: "",
    homePhone: "",
    preferredContact: "phone",
    bio: "",
    facebookUrl: "",
    twitterUrl: "",
    linkedinUrl: "",
    birthdate: "",
    gender: "",
    religion: "",
    race: "",
    firstGen: "",
    veteran: "",
    hispanicLatinx: "",
    citizenshipStatus: "",
    primaryCitizenship: "",
    noTests: false,
    satEbrw: "",
    satMath: "",
    actEnglish: "",
    actMath: "",
    actReading: "",
    actScience: "",
    intendedDegreeType: "bachelors",
    intendedCollegeType: "online",
    sports: "",
    rotc: "",
    highSchoolName: "",
    gradYear: "",
    ceebCode: "",
    gpa: "",
  });

  const [emailReadOnly, setEmailReadOnly] = useState(true);
  const [selectedMajors, setSelectedMajors] = useState<string[]>([
    "Aerospace Engineering Technician",
    "Arts, Entertainment, and Media Management",
  ]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const handleChange = (e: FormFieldChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
      ...(checked && {
        satEbrw: "",
        satMath: "",
        actEnglish: "",
        actMath: "",
        actReading: "",
        actScience: "",
      }),
    }));
  };

  const handleRadioChange =
    (name: keyof AccountDetailsFormData) => (value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

  const handleSave = () => {
    console.log("Save button clicked!", formData);
    alert("Save functionality placeholder.");
  };

  const handleEmailChangeToggle = () => {
    setEmailReadOnly((prev) => !prev);
  };

  const handleAddMajor = (major: string) => {
    if (!selectedMajors.includes(major)) {
      setSelectedMajors((prev) => [...prev, major]);
    }
  };

  const handleRemoveMajor = (major: string) => {
    setSelectedMajors((prev) => prev.filter((m) => m !== major));
  };

  const handleAddState = (state: string) => {
    if (!selectedStates.includes(state)) {
      setSelectedStates((prev) => [...prev, state]);
    }
  };

  const handleRemoveState = (state: string) => {
    setSelectedStates((prev) => prev.filter((s) => s !== state));
  };

  return {
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
  };
};
