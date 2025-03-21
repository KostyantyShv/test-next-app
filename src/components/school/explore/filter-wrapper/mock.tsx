import { FilterData } from "@/types/filter";
import { SortData } from "@/types/sort";

export const filtersMock: FilterData[] = [
  {
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
      { value: "prek", label: "Pre-K" },
      { value: "elementary", label: "Elementary" },
      { value: "middle", label: "Middle" },
      { value: "high", label: "High School" },
    ],
    minWidth: "",
  },
  {
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
    minWidth: "",
  },
  {
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
    minWidth: "",
  },
  {
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
    minWidth: "",
  },
];

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
  minWidth: "200px",
};
