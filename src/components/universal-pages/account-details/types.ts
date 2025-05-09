export interface AccountDetailsFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  accountId: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  homePhone: string;
  preferredContact: string;
  bio: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  birthdate: string;
  gender: string;
  religion: string;
  race: string;
  firstGen: string;
  veteran: string;
  hispanicLatinx: string;
  citizenshipStatus: string;
  primaryCitizenship: string;
  noTests: boolean;
  satEbrw: string;
  satMath: string;
  actEnglish: string;
  actMath: string;
  actReading: string;
  actScience: string;
  intendedDegreeType: string;
  intendedCollegeType: string;
  sports: string;
  rotc: string;
  highSchoolName: string;
  gradYear: string;
  ceebCode: string;
  gpa: string;
}

export type FormFieldChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLTextAreaElement>;
