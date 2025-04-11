export const majorsList = [
  "Aerospace Engineering Technician",
  "Arts, Entertainment, and Media Management",
  "Arts",
  "Artificial Intelligence",
  "Art Teacher Education",
  "Art History",
  "Studio Arts",
  "Recording Arts Technician",
  "Performing Arts",
  "Liberal Arts and Humanities",
  "Fine Arts",
  "Culinary Arts and Food Service",
  "Make-Up Artist and Tattooing",
  "Visual and Performing Arts",
  "Metal and Jewelry Arts",
  "Fine and Studio Arts Management",
  "Commercial and Advertising Art",
  "Baking and Pastry Arts",
  "Accounting",
  "Biology",
  "Business Administration",
  "Chemistry",
  "Computer Science",
  "Economics",
  "Education",
  "Engineering (General)",
  "English",
  "Environmental Science",
  "Finance",
  "Graphic Design",
  "History",
  "Marketing",
  "Mathematics",
  "Nursing",
  "Physics",
  "Political Science",
  "Psychology",
  "Sociology",
];

export const statesList = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "District of Columbia",
  "Puerto Rico",
  "Guam",
  "American Samoa",
  "U.S. Virgin Islands",
  "Northern Mariana Islands",
];

export const gradYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const years = [{ value: "", label: "" }];
  for (let year = currentYear + 5; year >= currentYear - 10; year--) {
    years.push({ value: year.toString(), label: year.toString() });
  }
  return years;
};

export const preferredContactOptions = [
  { value: "phone", label: "Phone" },
  { value: "email", label: "Email" },
  { value: "text", label: "Text" },
];

export const countryOptions = [{ value: "US", label: "United States" }];

export const genderOptions = [
  { value: "", label: "" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "non-binary", label: "Non-binary" },
  { value: "prefer-not-to-say", label: "Prefer not to say" },
];

export const religionOptions = [
  { value: "", label: "" },
  { value: "adventist", label: "Adventist" },
  { value: "african-methodist", label: "African Methodist" },
  { value: "agnostic", label: "Agnostic" },
  { value: "anglican", label: "Anglican" },
  { value: "assembly-of-god", label: "Assembly of God" },
  { value: "atheist", label: "Atheist" },
  { value: "bahai", label: "Baha'i" },
  { value: "baptist", label: "Baptist" },
  { value: "buddhist", label: "Buddhist" },
  { value: "catholic", label: "Catholic" },
  {
    value: "christian-and-missionary-alliance",
    label: "Christian and Missionary Alliance",
  },
  { value: "christian-science", label: "Christian Science" },
  { value: "church-of-brethren", label: "Church of Brethren" },
  { value: "church-of-christ", label: "Church of Christ" },
  { value: "church-of-god", label: "Church of God" },
  { value: "church-of-scientology", label: "Church of Scientology" },
  { value: "church-of-the-nazarene", label: "Church of the Nazarene" },
  { value: "churches-of-christ", label: "Churches of Christ" },
  { value: "confucian", label: "Confucian" },
  { value: "congregational", label: "Congregational" },
  { value: "disciples-of-christ", label: "Disciples of Christ" },
  { value: "episcopal", label: "Episcopal" },
  {
    value: "evangelical-covenant-church",
    label: "Evangelical Covenant Church",
  },
  { value: "evangelical-free-church", label: "Evangelical Free Church" },
  { value: "greek-orthodox", label: "Greek Orthodox" },
  { value: "hindu", label: "Hindu" },
  { value: "i-prefer-not-to-answer", label: "I prefer not to answer" },
  { value: "islam", label: "Islam" },
  { value: "jehovahs-witness", label: "Jehovah's Witness" },
  { value: "jewish", label: "Jewish" },
  { value: "lds", label: "LDS" },
  { value: "lutheran", label: "Lutheran" },
  { value: "mennonite", label: "Mennonite" },
  { value: "methodist", label: "Methodist" },
  { value: "missionary-church", label: "Missionary Church" },
  { value: "moravian", label: "Moravian" },
  {
    value: "nondenominational-christian",
    label: "Nondenominational Christian",
  },
  { value: "none", label: "None" },
  { value: "other-not-listed", label: "Other/Not Listed" },
  { value: "pagan-wiccan", label: "Pagan/Wiccan" },
  { value: "pentecostal", label: "Pentecostal" },
  { value: "presbyterian", label: "Presbyterian" },
  { value: "protestant", label: "Protestant" },
  { value: "quaker", label: "Quaker" },
  { value: "reformed", label: "Reformed" },
  { value: "russian-orthodox", label: "Russian Orthodox" },
  { value: "sikh", label: "Sikh" },
  { value: "taoist", label: "Taoist" },
  { value: "unitarian-universalist", label: "Unitarian Universalist" },
  { value: "wesleyan", label: "Wesleyan" },
];

export const raceOptions = [
  { value: "", label: "" },
  { value: "african-american", label: "African American" },
  { value: "asian", label: "Asian" },
  { value: "hispanic", label: "Hispanic" },
  { value: "pacific-islander", label: "Pacific Islander" },
  { value: "multiracial", label: "Multiracial" },
  { value: "native-american", label: "Native American" },
  { value: "white", label: "White" },
  { value: "no-answer", label: "I prefer not to answer" },
];

export const yesNoOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const citizenshipStatusOptions = [
  { value: "", label: "" },
  {
    value: "us-citizen-us-national-or-us-dual-citizen",
    label: "U.S. citizen, U.S. national or U.S. dual citizen",
  },
  { value: "us-permanent-resident", label: "U.S. permanent resident" },
  {
    value: "current-or-expected-visa-holder",
    label: "Current or expected visa holder",
  },
  { value: "asylee", label: "Asylee" },
  {
    value: "daca-undocumented-or-deferred-enforced-departure",
    label: "DACA, undocumented or Deferred Enforced Departure",
  },
  { value: "humanitarian-parole", label: "Humanitarian Parole" },
  { value: "refugee", label: "Refugee" },
  { value: "temporary-protected-status", label: "Temporary Protected Status" },
];

export const primaryCitizenshipOptions = [
  { value: "", label: "" },
  { value: "United States", label: "United States" },
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Åland Islands", label: "Åland Islands" },
  { value: "Albania", label: "Albania" },
  // Add more countries as needed
];

export const degreeTypeOptions = [
  { value: "", label: "" },
  { value: "certificate", label: "Certificate" },
  { value: "associates", label: "Associate's (2 year)" },
  { value: "bachelors", label: "Bachelor's (4 year)" },
];

export const collegeTypeOptions = [
  { value: "", label: "" },
  { value: "online", label: "Online" },
  { value: "campus", label: "Campus" },
  { value: "both", label: "Both" },
];

export const sportsOptions = [
  { value: "", label: "" },
  { value: "no", label: "No" },
  { value: "archery", label: "Archery" },
  { value: "baseball", label: "Baseball" },
  { value: "basketball", label: "Basketball" },
  // Add more sports as needed
];

export const rotcOptions = [
  { value: "", label: "" },
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];
