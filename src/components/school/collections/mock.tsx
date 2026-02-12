import { SortData } from "@/types/sort";
import {
  CollectionsFilterMockType,
  DropdownCategoryIconType,
  DropdownCategoryType,
  DropdownSubcategoryIconType,
  DropdownType,
} from "./types";
import { CollectionsFiltersWithPartialFiltersType } from "@/types/schools-collections";
import { FilterData } from "@/types/filter";
import { CATEGORIES_ENUM } from "./enums";
import { SUBCATEGORIES_ENUM } from "@/store/enum";

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
    { value: "recently-added", label: "Recently Added" },
    { value: "older-first", label: "Older First" },
    { value: "title-a-z", label: "Title A-Z" },
    { value: "title-z-a", label: "Title Z-A" },
    { value: "highest-rated", label: "Highest Rated" },
  ],
};

export const FILTER_MOCK: CollectionsFilterMockType = {
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
      {
        value: "K12",
        label: "K12",
        subOptions: [
          { value: "Traditional", label: "Traditional" },
          { value: "Charter", label: "Charter" },
          { value: "Magnet", label: "Magnet" },
          { value: "Private", label: "Private" },
        ],
      },
      {
        value: "Colleges",
        label: "Colleges",
        subOptions: [
          {
            value: "2-year",
            label: "2-year",
          },
          {
            value: "4-year",
            label: "4-year",
          },
        ],
      },
      {
        value: "Graduates",
        label: "Graduates",
        subOptions: [
          {
            value: "Public",
            label: "Public",
          },
          {
            value: "Private",
            label: "Private",
          },
        ],
      },
      {
        value: "District",
        label: "District",
        subOptions: [
          {
            value: "Public",
            label: "Public",
          },
          {
            value: "Private",
            label: "Private",
          },
        ],
      },
    ],
  },
  RATING: {
    id: "rating",
    label: "Rating",
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
      { value: "1", label: "1+" },
      { value: "2", label: "2+" },
      { value: "3", label: "3+" },
      { value: "4", label: "4+" },
      { value: "5", label: "5+" },
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
  VENDOR: {
    id: "vendor",
    label: "Vendor",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
      </svg>
    ),
    options: [
      { value: "Vendor A", label: "Vendor A" },
      { value: "Vendor B", label: "Vendor B" },
      { value: "Vendor C", label: "Vendor C" },
    ],
  },
  CATEGORIES: {
    id: "categories",
    label: "Categories",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
      </svg>
    ),
    options: [
      { value: "STEM", label: "STEM" },
      { value: "Arts & Music", label: "Arts & Music" },
      { value: "Language Immersion", label: "Language Immersion" },
      { value: "Sports & Athletics", label: "Sports & Athletics" },
      { value: "Special Needs", label: "Special Needs" },
    ],
  },
  STATUS: {
    id: "status",
    label: "Status",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
      </svg>
    ),
    options: [
      { value: "Researching", label: "Researching" },
      { value: "Scheduled Tour", label: "Scheduled Tour" },
      { value: "Visited Campus", label: "Visited Campus" },
      { value: "Started Application", label: "Started Application" },
      { value: "Applied", label: "Applied" },
      { value: "Accepted", label: "Accepted" },
      { value: "Enrolled", label: "Enrolled" },
    ],
  },
  NOTES: {
    id: "status",
    label: "Status",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
      </svg>
    ),
    options: [
      { value: "With Notes", label: "With Notes" },
      { value: "Without Notes", label: "Without Notes" },
    ],
  },
  SCHOOL_SCOUT_GRADE: {
    id: "status",
    label: "Status",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
      </svg>
    ),
    options: [
      { value: "Researching", label: "Researching" },
      { value: "Scheduled Tour", label: "Scheduled Tour" },
      { value: "Visited Campus", label: "Visited Campus" },
      { value: "Started Application", label: "Started Application" },
      { value: "Applied", label: "Applied" },
      { value: "Accepted", label: "Accepted" },
      { value: "Enrolled", label: "Enrolled" },
    ],
  },
};

export const FILTER_CONFIG: Array<{
  category: FilterData;
  filterKey: keyof CollectionsFiltersWithPartialFiltersType;
  tooltip?: string;
  hasTextInput?: boolean;
  inputPlaceholder?: string;
  withSubOptions?: boolean;
}> = [
  { category: FILTER_MOCK.TYPE, filterKey: "studyType", withSubOptions: true },
  { category: FILTER_MOCK.RATING, filterKey: "rating" },
  { category: FILTER_MOCK.RELIGION, filterKey: "religion" },
  { category: FILTER_MOCK.SPECIALTY, filterKey: "specialty" },
  { category: FILTER_MOCK.VENDOR, filterKey: "vendor" },
];

export const DROPDOWN_SUBCATEGORIES_ICONS: DropdownSubcategoryIconType = {
  "College Applications": (
    <svg
      height={20}
      width={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#4F4F4F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h6v6h-6z"></path>
      <path d="M14 4h6v6h-6z"></path>
      <path d="M4 14h6v6h-6z"></path>
      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    </svg>
  ),
  "My Reports": (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      height={20}
      width={20}
    >
      <path d="M2.69965 2C2.31984 2 2 2.30985 2 2.69965V21.3003C2 21.6802 2.30985 22 2.69965 22H21.3003C21.6802 22 22 21.6902 22 21.3003V2.69965C22 2.31984 21.6902 2 21.3003 2H2.69965ZM20.5907 3.38931V20.6007H3.38931V3.38931H20.6007H20.5907Z"></path>
      <path d="M18.1219 18.012C18.5017 18.012 18.8216 17.7021 18.8216 17.3123C18.8216 16.9225 18.5117 16.6227 18.1219 16.6227H17.992V12.4048C17.992 12.025 17.6822 11.7051 17.2924 11.7051C16.9025 11.7051 16.5927 12.015 16.5927 12.4048V16.6227H15.5132V9.94603C15.5132 9.75612 15.4533 9.58621 15.3133 9.45627C15.1734 9.32634 15.0035 9.25637 14.8236 9.25637C14.4438 9.25637 14.1339 9.56622 14.1239 9.94603V16.6227H13.0545V5.84808C13.0545 5.46827 12.7446 5.14843 12.3548 5.14843C11.965 5.14843 11.6552 5.45827 11.6552 5.84808V16.6227H10.5857V14.044C10.5857 13.6642 10.2759 13.3443 9.88606 13.3443C9.49625 13.3443 9.18641 13.6542 9.18641 14.044V16.6227H8.11694V9.94603C8.11694 9.56622 7.8071 9.25637 7.41729 9.25637C7.02749 9.25637 6.71764 9.56622 6.71764 9.94603V16.6227H5.76812C5.38831 16.6227 5.06847 16.9325 5.06847 17.3123C5.06847 17.6922 5.37831 18.012 5.76812 18.012H18.1219Z"></path>
    </svg>
  ),
  "Recent Views": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      height={20}
      width={20}
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M10.6263 2.00291C6.38461 1.88624 2.90961 5.29458 2.90961 9.50291H1.41795C1.04295 9.50291 0.859612 9.95291 1.12628 10.2112L3.45128 12.5446C3.61795 12.7112 3.87628 12.7112 4.04295 12.5446L6.36795 10.2112C6.62628 9.95291 6.44295 9.50291 6.06795 9.50291H4.57628C4.57628 6.25291 7.22628 3.62791 10.4929 3.66958C13.5929 3.71124 16.2013 6.31957 16.2429 9.41957C16.2486 9.85992 16.2055 10.2893 16.1188 10.7027C16.6755 10.8586 17.1961 11.1008 17.6654 11.4137C17.8437 10.7372 17.9299 10.0233 17.9096 9.28624C17.8013 5.37791 14.5346 2.11124 10.6263 2.00291ZM11.4111 16.9365C10.8226 16.5013 10.3247 15.9506 9.95053 15.3182C8.78552 15.2265 7.71309 14.7887 6.84295 14.1029C6.50961 13.8446 6.04295 13.8696 5.74295 14.1696C5.39295 14.5196 5.41795 15.1112 5.80961 15.4112C7.07628 16.4112 8.66795 17.0029 10.4096 17.0029C10.7491 17.0029 11.0834 16.9803 11.4111 16.9365ZM12.8327 10.8109C12.362 10.9772 11.921 11.2063 11.5197 11.4881L9.98461 10.5779C9.73461 10.4279 9.57628 10.1529 9.57628 9.86124V6.79457C9.57628 6.45291 9.85961 6.16957 10.2013 6.16957C10.5429 6.16957 10.8263 6.45291 10.8263 6.78624V9.61958L12.8327 10.8109Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        d="M14.6468 11.291C12.6731 11.291 10.9876 12.5186 10.3047 14.2515C10.9876 15.9844 12.6731 17.2121 14.6468 17.2121C16.6205 17.2121 18.306 15.9844 18.9889 14.2515C18.306 12.5186 16.6205 11.291 14.6468 11.291ZM14.6468 16.2252C13.5573 16.2252 12.6731 15.341 12.6731 14.2515C12.6731 13.1621 13.5573 12.2779 14.6468 12.2779C15.7363 12.2779 16.6205 13.1621 16.6205 14.2515C16.6205 15.341 15.7363 16.2252 14.6468 16.2252ZM13.4626 14.2515C13.4626 13.5963 13.9915 13.0673 14.6468 13.0673C15.3021 13.0673 15.831 13.5963 15.831 14.2515C15.831 14.9068 15.3021 15.4358 14.6468 15.4358C13.9915 15.4358 13.4626 14.9068 13.4626 14.2515Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  "Summary Programs": (
    <svg
      viewBox="0 0 24 24"
      height={20}
      width={20}
      fill="none"
      stroke="#4F4F4F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h6v6h-6z"></path>
      <path d="M14 4h6v6h-6z"></path>
      <path d="M4 14h6v6h-6z"></path>
      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    </svg>
  ),
  "Top Schools": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      height={20}
      width={20}
      stroke="#4F4F4F"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h6v6h-6z"></path>
      <path d="M14 4h6v6h-6z"></path>
      <path d="M4 14h6v6h-6z"></path>
      <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
    </svg>
  ),
  Liked: (
    <svg fill="none" viewBox="0 0 16 16" height={20} width={20}>
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="1.5"
        stroke="#4F4F4F"
        d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
      ></path>
    </svg>
  ),
};

export const DROPDOWN_ITEMS: DropdownType = {
  Pinned: [
    {
      id: "1",
      icon: DROPDOWN_SUBCATEGORIES_ICONS[SUBCATEGORIES_ENUM.COLLEGE_APP],
      title: SUBCATEGORIES_ENUM.COLLEGE_APP,
      viewsCount: "8",
    },
  ],
  System: [
    {
      id: "1",
      icon: DROPDOWN_SUBCATEGORIES_ICONS[SUBCATEGORIES_ENUM.LIKED],
      title: SUBCATEGORIES_ENUM.LIKED,
      viewsCount: "255",
    },
    {
      id: "2",
      icon: DROPDOWN_SUBCATEGORIES_ICONS[SUBCATEGORIES_ENUM.RECENT_VIEWS],
      title: SUBCATEGORIES_ENUM.RECENT_VIEWS,
      viewsCount: "120",
    },
    {
      id: "3",
      icon: DROPDOWN_SUBCATEGORIES_ICONS[SUBCATEGORIES_ENUM.MY_REPORTS],
      title: SUBCATEGORIES_ENUM.MY_REPORTS,
      viewsCount: "75",
    },
  ],
  Collections: [
    {
      id: "1",
      icon: DROPDOWN_SUBCATEGORIES_ICONS[SUBCATEGORIES_ENUM.TOP_SCHOOLS],
      title: SUBCATEGORIES_ENUM.TOP_SCHOOLS,
      viewsCount: "12",
    },
    {
      id: "2",
      icon: DROPDOWN_SUBCATEGORIES_ICONS[SUBCATEGORIES_ENUM.SUMMARY_PROGRAMS],
      title: SUBCATEGORIES_ENUM.SUMMARY_PROGRAMS,
      viewsCount: "5",
    },
  ],
};

export const DROPDOWN_CATEGORIES: DropdownCategoryType[] = [
  CATEGORIES_ENUM.PINNED,
  CATEGORIES_ENUM.SYSTEM,
  CATEGORIES_ENUM.COLLECTIONS,
];

export const DROPDOWN_CATEGORIES_ICONS: DropdownCategoryIconType = {
  Pinned: (
    <svg viewBox="0 0 20 20" fill="none" height={20} width={20}>
      <path
        d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M7.5 12.5L3.75 16.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M12.084 3.33398L16.6673 7.91732"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  ),
  System: (
    <svg
      fill="currentColor"
      height={20}
      width={20}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="nonzero"
        d="M16 9a7 7 0 1 1 0 14 7 7 0 1 1 0-14zm4-7a2 2 0 0 1 2 2v4h-1.5V3.5h-17v17H8V22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16zm-3 10h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z"
      />
    </svg>
  ),
  Collections: (
    <svg fill="none" viewBox="0 0 24 24" height={20} width={20}>
      <path
        fill="#4F4F4F"
        d="M5.64124 3.64124C6.53204 2.75044 7.74022 2.25 9 2.25C10.2598 2.25 11.468 2.75044 12.3588 3.64124C13.2496 4.53204 13.75 5.74022 13.75 7C13.75 8.25978 13.2496 9.46796 12.3588 10.3588C11.468 11.2496 10.2598 11.75 9 11.75C7.74022 11.75 6.53204 11.2496 5.64124 10.3588C4.75044 9.46796 4.25 8.25978 4.25 7C4.25 5.74022 4.75044 4.53204 5.64124 3.64124ZM9 3.75C8.13805 3.75 7.3114 4.09241 6.7019 4.7019C6.09241 5.3114 5.75 6.13805 5.75 7C5.75 7.86195 6.09241 8.6886 6.7019 9.2981C7.3114 9.90759 8.13805 10.25 9 10.25C9.86195 10.25 10.6886 9.90759 11.2981 9.2981C11.9076 8.6886 12.25 7.86195 12.25 7C12.25 6.13805 11.9076 5.3114 11.2981 4.7019C10.6886 4.09241 9.86195 3.75 9 3.75ZM15.2734 2.94385C15.3762 2.54258 15.7848 2.30058 16.186 2.40332C17.2078 2.66493 18.1134 3.25915 18.7601 4.09231C19.4068 4.92547 19.7578 5.95018 19.7578 7.00488C19.7578 8.05959 19.4068 9.08429 18.7601 9.91745C18.1134 10.7506 17.2078 11.3448 16.186 11.6064C15.7848 11.7092 15.3762 11.4672 15.2734 11.0659C15.1707 10.6646 15.4127 10.2561 15.814 10.1533C16.5131 9.97433 17.1327 9.56775 17.5752 8.99769C18.0177 8.42763 18.2578 7.72652 18.2578 7.00488C18.2578 6.28325 18.0177 5.58213 17.5752 5.01207C17.1327 4.44201 16.5131 4.03544 15.814 3.85645C15.4127 3.7537 15.1707 3.34512 15.2734 2.94385ZM7 15.75C6.13805 15.75 5.3114 16.0924 4.7019 16.7019C4.09241 17.3114 3.75 18.138 3.75 19V21C3.75 21.4142 3.41421 21.75 3 21.75C2.58579 21.75 2.25 21.4142 2.25 21V19C2.25 17.7402 2.75044 16.532 3.64124 15.6412C4.53204 14.7504 5.74022 14.25 7 14.25H11C12.2598 14.25 13.468 14.7504 14.3588 15.6412C15.2496 16.532 15.75 17.7402 15.75 19V21C15.75 21.4142 15.4142 21.75 15 21.75C14.5858 21.75 14.25 21.4142 14.25 21V19C14.25 18.138 13.9076 17.3114 13.2981 16.7019C12.6886 16.0924 11.862 15.75 11 15.75H7ZM17.2738 14.9624C17.3774 14.5614 17.7864 14.3202 18.1875 14.4237C19.2026 14.6858 20.1025 15.2763 20.7469 16.1033C21.3913 16.9303 21.744 17.9472 21.75 18.9956L21.75 18.9999L21.75 20.9999C21.75 21.4141 21.4142 21.7499 21 21.7499C20.5858 21.7499 20.25 21.4141 20.25 20.9999V19.002C20.2454 18.2855 20.0041 17.5905 19.5637 17.0253C19.1228 16.4595 18.5071 16.0554 17.8125 15.8761C17.4115 15.7725 17.1703 15.3635 17.2738 14.9624Z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
};

export const layouts = [
  {
    type: "grid",
    icon: (
      <svg viewBox="0 0 16 16">
        <path
          fill="currentColor"
          d="M2.5 5.5V2.5H5.5V5.5H2.5ZM1 2C1 1.44772 1.44772 1 2 1H6C6.55228 1 7 1.44772 7 2V6C7 6.55228 6.55228 7 6 7H2C1.44772 7 1 6.55228 1 6V2ZM2.5 13.5V10.5H5.5V13.5H2.5ZM1 10C1 9.44772 1.44772 9 2 9H6C6.55228 9 7 9.44772 7 10V14C7 14.5523 6.55228 15 6 15H2C1.44772 15 1 14.5523 1 14V10ZM10.5 2.5V5.5H13.5V2.5H10.5ZM10 1C9.44772 1 9 1.44772 9 2V6C9 6.55228 9.44772 7 10 7H14C14.5523 7 15 6.55228 15 6V2C15 1.44772 14.5523 1 14 1H10ZM10.5 13.5V10.5H13.5V13.5H10.5ZM9 10C9 9.44772 9.44772 9 10 9H14C14.5523 9 15 9.44772 15 10V14C15 14.5523 14.5523 15 14 15H10C9.44772 15 9 14.5523 9 14V10Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    type: "list",
    icon: (
      <svg viewBox="0 0 16 16">
        <path
          fill="currentColor"
          d="M2.5 4C3.19036 4 3.75 3.44036 3.75 2.75C3.75 2.05964 3.19036 1.5 2.5 1.5C1.80964 1.5 1.25 2.05964 1.25 2.75C1.25 3.44036 1.80964 4 2.5 4ZM2.5 9.25C3.19036 9.25 3.75 8.69036 3.75 8C3.75 7.30964 3.19036 6.75 2.5 6.75C1.80964 6.75 1.25 7.30964 1.25 8C1.25 8.69036 1.80964 9.25 2.5 9.25ZM3.75 13.25C3.75 13.9404 3.19036 14.5 2.5 14.5C1.80964 14.5 1.25 13.9404 1.25 13.25C1.25 12.5596 1.80964 12 2.5 12C3.19036 12 3.75 12.5596 3.75 13.25ZM6.75 2H6V3.5H6.75H14.25H15V2H14.25H6.75ZM6.75 7.25H6V8.75H6.75H14.25H15V7.25H14.25H6.75ZM6.75 12.5H6V14H6.75H14.25H15V12.5H14.25H6.75Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    type: "magazine",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M3 5h18v14H3V5Zm2 2v10h7V7H5Zm9 0h5v2h-5V7Zm0 4h5v2h-5v-2Zm0 4h5v2h-5v-2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    type: "hybrid",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M10 5h11m-11 7h11m-11 7h11M6 3.5H3v3h3v-3zm0 7H3v3h3v-3zm0 7H3v3h3v-3z"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    type: "table",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M17.882 2H2.118A1.118 1.118 0 0 0 1 3.116v13.768A1.118 1.118 0 0 0 2.118 18h15.764A1.118 1.118 0 0 0 19 16.884V3.116A1.118 1.118 0 0 0 17.882 2ZM2.25 3.25h15.5V7H2.25V3.25Zm15.5 13.5H2.25v-3.5h15.5v3.5Zm0-4.75H2.25V8.25h15.5V12Z"></path>
      </svg>
    ),
  },
  {
    type: "card",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M19 9H1V2.119A1.119 1.119 0 0 1 2.118 1h15.764A1.119 1.119 0 0 1 19 2.119V9ZM1 17.881A1.119 1.119 0 0 0 2.118 19h15.764A1.12 1.12 0 0 0 19 17.881V11H1v6.881Z"></path>
      </svg>
    ),
  },
  {
    type: "classic",
    icon: (
      <svg viewBox="0 0 48 48">
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          d="M6 4C4.89543 4 4 4.89543 4 6V12C4 13.1046 4.89543 14 6 14H12C13.1046 14 14 13.1046 14 12V6C14 4.89543 13.1046 4 12 4H6ZM6 18C4.89543 18 4 18.8954 4 20V26C4 27.1046 4.89543 28 6 28H12C13.1046 28 14 27.1046 14 26V20C14 18.8954 13.1046 18 12 18H6ZM6 32C4.89543 32 4 32.8954 4 34V40C4 41.1046 4.89543 42 6 42H12C13.1046 42 14 41.1046 14 40V34C14 32.8954 13.1046 32 12 32H6ZM20 4C18.8954 4 18 4.89543 18 6V12C18 13.1046 18.8954 14 20 14H26C27.1046 14 28 13.1046 28 12V6C28 4.89543 27.1046 4 26 4H20ZM20 18C18.8954 18 18 18.8954 18 20V26C18 27.1046 18.8954 28 20 28H26C27.1046 28 28 27.1046 28 26V20C28 18.8954 27.1046 18 26 18H20ZM20 32C18.8954 32 18 32.8954 18 34V40C18 41.1046 18.8954 42 20 42H26C27.1046 42 28 41.1046 28 40V34C28 32.8954 27.1046 32 26 32H20ZM34 4C32.8954 4 32 4.89543 32 6V12C32 13.1046 32.8954 14 34 14H40C41.1046 14 42 13.1046 42 12V6C42 4.89543 41.1046 4 40 4H34ZM34 18C32.8954 18 32 18.8954 32 20V26C32 27.1046 32.8954 28 34 28H40C41.1046 28 42 27.1046 42 26V20C42 18.8954 41.1046 18 40 18H34ZM34 32C32.8954 32 32 32.8954 32 34V40C32 41.1046 32.8954 42 34 42H40C41.1046 42 42 41.1046 42 40V34C42 32.8954 41.1046 32 40 32H34Z"
        />
      </svg>
    ),
  },
];
