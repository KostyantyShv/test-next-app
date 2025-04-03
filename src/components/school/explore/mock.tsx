// mock.ts
import {
  AcademicsMockType,
  BoardingMockType,
  FilterData,
} from "@/types/filter";
import { SortData } from "@/types/sort";
import { FilterMockType, School } from "./types";
import { EstablishmentType, FiltersType } from "@/types/schools-explore";

export const FILTER_MOCK: FilterMockType = {
  GRADE: {
    id: "grade",
    label: "Grade",
    icon: (
      <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor">
        <path
          d="M10.8571 26.2857C10.8571 27.2325 10.0896 28 9.14286 28H5.71429C4.76751 28 4 27.2325 4 26.2857V22C4 21.0532 4.76751 20.2857 5.71429 20.2857H9.14286C10.0896 20.2857 10.8571 21.0532 10.8571 22V26.2857ZM19.4286 26.2857V14.2857C19.4286 13.3389 18.6611 12.5714 17.7143 12.5714H14.2857C13.3389 12.5714 12.5714 13.3389 12.5714 14.2857V26.2857C12.5714 27.2325 13.3389 28 14.2857 28H17.7143C18.6611 28 19.4286 27.2325 19.4286 26.2857ZM21.1429 26.2857C21.1429 27.2325 21.9104 28 22.8571 28H26.2857C27.2325 28 28 27.2325 28 26.2857V5.71429C28 4.76751 27.2325 4 26.2857 4H22.8571C21.9104 4 21.1429 4.76751 21.1429 5.71429V26.2857ZM17.7143 14.2857H14.2857V26.2857H17.7143V14.2857ZM26.2857 5.71429H22.8571V26.2857H26.2857V5.71429Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    ),
    options: [
      { value: "pre-k", label: "Pre-K" },
      { value: "elementary", label: "Elementary" },
      { value: "middle", label: "Middle" },
      { value: "high school", label: "High School" },
    ],
  },
  TYPE: {
    id: "type",
    label: "Type",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path
          fill="currentColor"
          d="M8.33333 3.25C8.31123 3.25 8.29004 3.25878 8.27441 3.27441C8.25878 3.29004 8.25 3.31123 8.25 3.33333V8.02267L11.3637 11.1363C11.5043 11.277 11.5833 11.4678 11.5833 11.6667V16.75H16.75V3.33333C16.75 3.31123 16.7412 3.29003 16.7256 3.27441C16.71 3.25878 16.6888 3.25 16.6667 3.25H8.33333ZM10.0833 16.75V11.9773L6.66667 8.56066L3.25 11.9773V16.75H5.91667V14.1667C5.91667 13.7525 6.25245 13.4167 6.66667 13.4167C7.08088 13.4167 7.41667 13.7525 7.41667 14.1667V16.75H10.0833ZM6.75 6.75462C6.53133 6.73031 6.30401 6.80199 6.13634 6.96967L1.96967 11.1363C1.82902 11.277 1.75 11.4678 1.75 11.6667V17.5C1.75 17.9142 2.08579 18.25 2.5 18.25H17.5C17.9142 18.25 18.25 17.9142 18.25 17.5V3.33333C18.25 2.91341 18.0832 2.51068 17.7863 2.21375C17.4893 1.91681 17.0866 1.75 16.6667 1.75H8.33333C7.91341 1.75 7.51068 1.91681 7.21375 2.21375C6.91682 2.51068 6.75 2.91341 6.75 3.33333V6.75462ZM10.8333 5.08333C11.2475 5.08333 11.5833 5.41912 11.5833 5.83333V5.84167C11.5833 6.25588 11.2475 6.59167 10.8333 6.59167C10.4191 6.59167 10.0833 6.25588 10.0833 5.84167V5.83333C10.0833 5.41912 10.4191 5.08333 10.8333 5.08333ZM14.1667 5.08333C14.5809 5.08333 14.9167 5.41912 14.9167 5.83333V5.84167C14.9167 6.25588 14.5809 6.59167 14.1667 6.59167C13.7525 6.59167 13.4167 6.25588 13.4167 5.84167V5.83333C13.4167 5.41912 13.7525 5.08333 14.1667 5.08333ZM14.1667 8.41667C14.5809 8.41667 14.9167 8.75245 14.9167 9.16667V9.175C14.9167 9.58921 14.5809 9.925 14.1667 9.925C13.7525 9.925 13.4167 9.58921 13.4167 9.175V9.16667C13.4167 8.75245 13.7525 8.41667 14.1667 8.41667ZM14.1667 11.75C14.5809 11.75 14.9167 12.0858 14.9167 12.5V12.5083C14.9167 12.9225 14.5809 13.2583 14.1667 13.2583C13.7525 13.2583 13.4167 12.9225 13.4167 12.5083V12.5C13.4167 12.0858 13.7525 11.75 14.1667 11.75Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    ),
    options: [
      { value: "public", label: "Public" },
      { value: "private", label: "Private" },
      { value: "charter", label: "Charter" },
      { value: "magnet", label: "Magnet" },
    ],
  },
  RELIGION: {
    id: "religion",
    label: "Religion",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    options: [
      { value: "catholic", label: "Catholic" },
      { value: "christian", label: "Christian" },
      { value: "jewish", label: "Jewish" },
      { value: "islamic", label: "Islamic" },
    ],
  },
  SPECIALTY: {
    id: "specialty",
    label: "Specialty",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M11.665 1.33a.75.75 0 0 1 .67 0l10 5a.75.75 0 0 1 0 1.34l-10 5a.75.75 0 0 1-.67 0l-10-5a.75.75 0 0 1 0-1.34l10-5ZM3.677 7 12 11.162 20.323 7 12 2.839 3.677 7ZM1.33 11.665a.75.75 0 0 1 1.006-.336L12 16.162l9.665-4.833a.75.75 0 0 1 .67 1.342l-10 5a.75.75 0 0 1-.67 0l-10-5a.75.75 0 0 1-.336-1.006Zm0 5a.75.75 0 0 1 1.006-.336L12 21.162l9.665-4.833a.75.75 0 0 1 .67 1.342l-10 5a.75.75 0 0 1-.67 0l-10-5a.75.75 0 0 1-.336-1.006Z"
          clipRule="evenodd"
        />
      </svg>
    ),
    options: [
      { value: "online", label: "Online" },
      { value: "special-ed", label: "Special Education" },
      { value: "montessori", label: "Montessori" },
      { value: "therapeutic", label: "Therapeutic" },
    ],
  },
  COLLEGE_SPECIALTY: {
    id: "collegeSpecialty",
    label: "College Specialty",
    icon: null,
    options: [
      { value: "Liberal arts", label: "Liberal arts" },
      { value: "All-women", label: "All-women" },
      { value: "All-men", label: "All-men" },
      { value: "HBCU", label: "HBCU" },
      {
        value: "Hispanic-serving institutions",
        label: "Hispanic-serving institutions",
      },
    ],
  },
  GOOD_FOR: {
    id: "goodFor",
    label: "Good for",
    icon: null,
    options: [
      { value: "Liberal arts", label: "Liberal arts" },
      { value: "International students", label: "International students" },
      { value: "Adults learners", label: "Adults learners" },
      { value: "Low-income students", label: "Low-income students" },
      { value: "Middle-class students", label: "Middle-class students" },
    ],
  },
  MAJORS: {
    id: "majors",
    label: "Majors",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    options: [
      { value: "Online", label: "Online" },
      { value: "Campus", label: "Campus" },
    ],
  },
  ONLINE_FRIENDLINESS: {
    id: "onlineFriendliness",
    label: "Online Friendliness",
    icon: null,
    options: [
      { value: "Fully online", label: "Fully online" },
      { value: "Large online program", label: "Large online program" },
      { value: "Some online degrees", label: "Some online degrees" },
    ],
  },
  SELECTIVITY: {
    id: "selectivity",
    label: "Selectivity",
    icon: null,
    options: [
      { value: "Extremely selective", label: "Extremely selective" },
      { value: "Very selective", label: "Very selective" },
      { value: "Selective", label: "Selective" },
      { value: "Average", label: "Average" },
      { value: "Not selective", label: "Not selective" },
    ],
  },
  STUDENT_BODY_SIZE: {
    id: "studentBodySize",
    label: "Student Body Size",
    icon: null,
    options: [
      { value: "Small", label: "Small" },
      { value: "Medium", label: "Medium" },
      { value: "Large", label: "Large" },
    ],
  },
  PROGRAM: {
    id: "program",
    label: "Program",
    icon: (
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
          fill="currentColor"
        ></path>
      </svg>
    ),
    options: [
      { value: "Online", label: "Online" },
      { value: "Masters", label: "Masters" },
      { value: "Doctorate", label: "Doctorate" },
    ],
  },
  COLLEGE_TYPE: {
    id: "college type",
    label: "College type",
    icon: (
      <svg width="16" height="16" viewBox="0 0 32 32">
        <path
          fill="currentColor"
          d="M10.8571 26.2857C10.8571 27.2325 10.0896 28 9.14286 28H5.71429C4.76751 28 4 27.2325 4 26.2857V22C4 21.0532 4.76751 20.2857 5.71429 20.2857H9.14286C10.0896 20.2857 10.8571 21.0532 10.8571 22V26.2857ZM19.4286 26.2857V14.2857C19.4286 13.3389 18.6611 12.5714 17.7143 12.5714H14.2857C13.3389 12.5714 12.5714 13.3389 12.5714 14.2857V26.2857C12.5714 27.2325 13.3389 28 14.2857 28H17.7143C18.6611 28 19.4286 27.2325 19.4286 26.2857ZM21.1429 26.2857C21.1429 27.2325 21.9104 28 22.8571 28H26.2857C27.2325 28 28 27.2325 28 26.2857V5.71429C28 4.76751 27.2325 4 26.2857 4H22.8571C21.9104 4 21.1429 4.76751 21.1429 5.71429V26.2857ZM17.7143 14.2857H14.2857V26.2857H17.7143V14.2857ZM26.2857 5.71429H22.8571V26.2857H26.2857V5.71429Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    ),
    options: [
      {
        value: "4-year",
        label: "4-year",
        subOptions: [
          { value: "Private", label: "Private" },
          { value: "Public", label: "Public" },
        ],
      },
      {
        value: "2-year",
        label: "2-year",
        subOptions: [
          {
            value: "Community",
            label: "Community",
          },
          {
            value: "Trade/Career",
            label: "Trade/Career",
          },
          {
            value: "Other",
            label: "Other",
          },
        ],
      },
    ],
  },
};

export const FILTER_CONFIG: Record<
  EstablishmentType,
  Array<{
    category: FilterData;
    filterKey: keyof FiltersType;
    tooltip?: string;
    hasTextInput?: boolean;
    inputPlaceholder?: string;
  }>
> = {
  "K-12": [
    { category: FILTER_MOCK.GRADE, filterKey: "grade" },
    { category: FILTER_MOCK.TYPE, filterKey: "type" },
    { category: FILTER_MOCK.RELIGION, filterKey: "religion" },
    { category: FILTER_MOCK.SPECIALTY, filterKey: "specialty" },
  ],
  Colleges: [
    { category: FILTER_MOCK.COLLEGE_TYPE, filterKey: "collegeType" },
    { category: FILTER_MOCK.RELIGION, filterKey: "religion" },
    {
      category: FILTER_MOCK.MAJORS,
      filterKey: "majors",
      hasTextInput: true,
      inputPlaceholder: "Search majors...",
    },
    { category: FILTER_MOCK.SPECIALTY, filterKey: "specialty" },
  ],
  Graduates: [
    { category: FILTER_MOCK.COLLEGE_TYPE, filterKey: "collegeType" },
    { category: FILTER_MOCK.RELIGION, filterKey: "religion" },
    { category: FILTER_MOCK.SPECIALTY, filterKey: "specialty" },
    {
      category: FILTER_MOCK.PROGRAM,
      filterKey: "program",
      tooltip:
        "Select a program to filter your search to only schools that offer degrees in that specific program.",
      hasTextInput: true,
      inputPlaceholder: "Enter a program",
    },
  ],
};

export const sortMock: SortData = {
  id: "sort",
  label: "Best match",
  icon: (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="#0093b0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
    </svg>
  ),
  options: [
    { value: "best-match", label: "Best Match" },
    { value: "newest", label: "Newest" },
    { value: "highest-rated", label: "Highest Rated" },
    { value: "most-wished", label: "Most Wished" },
    { value: "most-reactions", label: "Most Reactions" },
  ],
};

export const ACADEMICS_MOCK: AcademicsMockType = {
  id: "academics",
  label: "Academics",
  options: [
    { value: "AP Program", label: "AP Program" },
    { value: "IB Program", label: "IB Program" },
    { value: "Gifted/Talented program", label: "Gifted/Talented program" },
  ],
};
export const BOARDING_MOCK: BoardingMockType = {
  id: "boarding",
  label: "Boarding",
  options: [{ value: "Offers boarding", label: "Offers boarding" }],
};

export const highestGrade = [
  { label: "Any", value: "any" },
  { label: "Pre-K", value: "pre-k" },
  { label: "Kindergarten", value: "kindergarten" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" },
];

export const generalAreaOfStudy = [
  { label: "Any", value: "any" },
  { label: "Agricultural Sciences", value: "Agricultural Sciences" },
  { label: "Anthropology and Sociology", value: "Anthropology and Sociology" },
  { label: "Architecture", value: "Architecture" },
  { label: "Art", value: "Art" },
  { label: "Arts Management", value: "Arts Management" },
  { label: "Biology", value: "Biology" },
  { label: "Building and Construction", value: "Building and Construction" },
  { label: "Business and Management", value: "Business and Management" },
  { label: "Chemistry", value: "Chemistry" },
  { label: "Communications", value: "Communications" },
];

export const admissionsProcess = [
  { label: "Any", value: "Any" },
  { label: "No Application Fee", value: "No Application Fee" },
  { label: "Accepts Common App", value: "Accepts Common App" },
  { label: "Test-Optional", value: "Test-Optional" },
  { label: "Offers Early Decision", value: "Offers Early Decision" },
  { label: "Offers Early Action", value: "Offers Early Action" },
  { label: "Rolling Admission", value: "Rolling Admission" },
];

export const religionAffiliation = [
  { label: "Any", value: "Any" },
  { label: "Catholic", value: "Catholic" },
  { label: "Christian", value: "Christian" },
  { label: "Jewish", value: "Jewish" },
];

export const startingSalaryAfterGraduation = [
  { label: "Any", value: "Any" },
  { label: "$30,000+", value: "$30,000+" },
  { label: "$40,000+", value: "$40,000+" },
  { label: "$50,000+", value: "$50,000+" },
  { label: "$60,000+", value: "$60,000+" },
  { label: "$70,000+", value: "$70,000+" },
  { label: "$80,000+", value: "$80,000+" },
  { label: "$90,000+", value: "$90,000+" },
  { label: "$100,000+", value: "$100,000+" },
];

export const ORGANIZATION_MOCK = [
  { label: "Any", value: "any" },
  {
    label: "National Association of Independent Schools",
    value: "NAIS",
  },
  {
    label: "The Association of Boarding Schools",
    value: "TABS",
  },
  {
    label: "National Catholic Education Association",
    value: "NCEA",
  },
  {
    label: "Association of Christian Schools International",
    value: "ACSI",
  },
];

export const schools: School[] = [
  {
    name: "Massachusetts Institute of Technology",
    schoolType: "PRIVATE SCHOOL",
    location: "Cambridge, MA",
    ratio: "8:1",
    rating: "4.9 (875)",
    image: "https://i.ibb.co/J8QjpbD/school1.webp",
    avatar: "https://i.ibb.co/J8QjpbD/school1.webp",
    ranking: "#1 Best Private High Schools in Houston Area",
    grade: "A+",
    students: "1,756",
    price: "$53,790",
    grades: "PK, K-12",
    specialty: "hot",
    description:
      "MIT offers an unparalleled academic experience with world-class faculty, cutting-edge research, and a collaborative culture. The opportunities for innovation, networking, and career advancement are exceptional.",
    reviews: 672,
  },
  {
    name: "Stanford University",
    schoolType: "CHARTER SCHOOL",
    location: "Stanford, CA",
    ratio: "6:1",
    rating: "4.8 (923)",
    image: "https://i.ibb.co/fVRCnNZY/school2.webp",
    avatar: "https://i.ibb.co/fVRCnNZY/school2.webp",
    ranking: "#1 Best Private High Schools in America",
    grade: "A+",
    students: "1,343",
    price: "$56,169",
    grades: "9-12",
    specialty: "instant-book",
    description:
      "Stanford combines academic excellence, entrepreneurial spirit, and innovation in the heart of Silicon Valley. The university's interdisciplinary approach and research opportunities are unmatched.",
    reviews: 845,
  },
  {
    name: "Harvard University",
    schoolType: "MAGNET SCHOOL",
    location: "Cambridge, MA",
    ratio: "12:1",
    rating: "4.7 (1k+)",
    image: "https://i.ibb.co/fzzhd5tf/school4.webp",
    avatar: "https://i.ibb.co/fzzhd5tf/school4.webp",
    ranking: "#1 Best Private High Schools in Houston Area",
    grade: "A+",
    students: "1,469",
    price: "$54,768",
    grades: "6-12",
    specialty: "sponsored",
    description:
      "Harvard provides a transformative educational experience with renowned faculty, diverse perspectives, and extensive resources. The university's rich history and global network create unique opportunities.",
    reviews: 957,
  },
  {
    name: "California Institute of Technology",
    schoolType: "TRADITIONAL SCHOOL",
    location: "Pasadena, CA",
    ratio: "3:1",
    rating: "4.8 (456)",
    image: "https://i.ibb.co/B5pFBbB2/school5.webp",
    avatar: "https://i.ibb.co/B5pFBbB2/school5.webp",
    ranking: "#3 in Best School for Physics in America",
    grade: "A+",
    students: "789",
    price: "$52,506",
    grades: "K-12",
    description:
      "Caltech offers an intensive focus on science and engineering with small class sizes and close faculty collaboration. The institute's research facilities and theoretical approach are world-renowned.",
    reviews: 389,
  },
];
