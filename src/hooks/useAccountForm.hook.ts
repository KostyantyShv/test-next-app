import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase_utils/client";
import { AccountDetailsFormData, FormFieldChangeEvent } from "../components/universal-pages/account-details/types";

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
  const supabase = createClient();
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

  // Load current user profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      if (data) {
        setFormData((prev) => ({
          ...prev,
          firstName: data.first_name ?? "",
          lastName: data.last_name ?? "",
          username: data.username ?? user.email?.split('@')[0] ?? "",
          email: data.email ?? user.email ?? "",
          accountId: data.account_id ?? user.id.slice(0, 10).toUpperCase() ?? "",
          addressLine1: data.address_line1 ?? "",
          addressLine2: data.address_line2 ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          zip: data.zip ?? "",
          country: data.country ?? "US",
          phone: data.phone ?? "",
          homePhone: data.home_phone ?? "",
          preferredContact: data.preferred_contact ?? "phone",
          bio: data.bio ?? "",
          facebookUrl: data.facebook_url ?? "",
          twitterUrl: data.twitter_url ?? "",
          linkedinUrl: data.linkedin_url ?? "",
          birthdate: data.birthdate ?? "",
          gender: data.gender ?? "",
          religion: data.religion ?? "",
          race: data.race ?? "",
          firstGen: (data.first_gen ? "yes" : "") as any,
          veteran: (data.veteran ? "yes" : "") as any,
          hispanicLatinx: (data.hispanic_latinx ? "yes" : "") as any,
          citizenshipStatus: data.citizenship_status ?? "",
          primaryCitizenship: data.primary_citizenship ?? "",
          noTests: data.no_tests ?? false,
          satEbrw: data.sat_ebrw ?? "",
          satMath: data.sat_math ?? "",
          actEnglish: data.act_english ?? "",
          actMath: data.act_math ?? "",
          actReading: data.act_reading ?? "",
          actScience: data.act_science ?? "",
          intendedDegreeType: data.intended_degree_type ?? "bachelors",
          intendedCollegeType: data.intended_college_type ?? "online",
          sports: data.sports ?? "",
          rotc: data.rotc ?? "",
          highSchoolName: data.high_school_name ?? "",
          gradYear: data.grad_year ?? "",
          ceebCode: data.ceeb_code ?? "",
          gpa: data.gpa ?? "",
        }));
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please log in to save changes.");
      return;
    }
    const payload = {
      id: user.id,
      email: formData.email,
      username: formData.username || null,
      first_name: formData.firstName || null,
      last_name: formData.lastName || null,
      full_name: [formData.firstName, formData.lastName].filter(Boolean).join(" ") || null,
      account_id: formData.accountId || null,
      address_line1: formData.addressLine1 || null,
      address_line2: formData.addressLine2 || null,
      city: formData.city || null,
      state: formData.state || null,
      zip: formData.zip || null,
      country: formData.country || null,
      phone: formData.phone || null,
      home_phone: formData.homePhone || null,
      preferred_contact: formData.preferredContact || null,
      bio: formData.bio || null,
      facebook_url: formData.facebookUrl || null,
      twitter_url: formData.twitterUrl || null,
      linkedin_url: formData.linkedinUrl || null,
      birthdate: formData.birthdate || null,
      gender: formData.gender || null,
      religion: formData.religion || null,
      race: formData.race || null,
      first_gen: !!formData.firstGen,
      veteran: !!formData.veteran,
      hispanic_latinx: !!formData.hispanicLatinx,
      citizenship_status: formData.citizenshipStatus || null,
      primary_citizenship: formData.primaryCitizenship || null,
      no_tests: formData.noTests,
      sat_ebrw: formData.satEbrw || null,
      sat_math: formData.satMath || null,
      act_english: formData.actEnglish || null,
      act_math: formData.actMath || null,
      act_reading: formData.actReading || null,
      act_science: formData.actScience || null,
      intended_degree_type: formData.intendedDegreeType || null,
      intended_college_type: formData.intendedCollegeType || null,
      sports: formData.sports || null,
      rotc: formData.rotc || null,
      high_school_name: formData.highSchoolName || null,
      grad_year: formData.gradYear || null,
      ceeb_code: formData.ceebCode || null,
      gpa: formData.gpa || null,
    };
    const { error } = await supabase.from("profiles").upsert(payload).single();
    if (error) {
      alert(`Save failed: ${error.message}`);
    } else {
      alert("Saved successfully.");
    }
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
