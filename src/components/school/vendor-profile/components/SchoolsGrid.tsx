const ICONS = {
  like: (
    <svg fill="none" viewBox="0 0 16 16">
      <path
        strokeLinejoin="round"
        strokeLinecap="round"
        strokeWidth="1.5"
        stroke="currentColor"
        d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
      ></path>
    </svg>
  ),
  location: (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path>
      <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
    </svg>
  ),
  ratio: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.46497 2.65469C9.57557 2.61124 9.77125 2.55429 9.98782 2.53681C10.2347 2.51688 10.421 2.55461 10.5403 2.62526L16.1378 5.94193L16.1507 5.94942C16.4717 6.13196 16.669 6.47367 16.6667 6.84316V12.9183C16.6667 12.9168 16.6667 12.916 16.6667 12.916C16.666 12.9159 16.6598 12.9702 16.6016 13.0884C16.542 13.2096 16.4536 13.3459 16.351 13.4827C16.2503 13.6169 16.1476 13.7361 16.0692 13.8223C16.0454 13.8485 16.0242 13.8713 16.0065 13.89L10.4895 17.3799C10.3385 17.4588 10.1706 17.5 10.0001 17.5C9.82953 17.5 9.66161 17.4588 9.51062 17.3799L3.91059 13.8374C3.89558 13.8279 3.88028 13.8189 3.86471 13.8104C3.7042 13.7227 3.57021 13.5935 3.47675 13.4362C3.38341 13.2792 3.33391 13.1 3.33341 12.9174V6.8475C3.33341 6.48044 3.53431 6.13787 3.86648 5.95529C3.87383 5.95125 3.88112 5.9471 3.88834 5.94284L9.46497 2.65469ZM17.1604 15.0945C17.1651 15.0897 17.1701 15.0846 17.1754 15.079C17.2071 15.0463 17.2508 15.0003 17.3025 14.9434C17.4051 14.8305 17.5436 14.6702 17.6842 14.4829C17.8228 14.2982 17.9757 14.0708 18.097 13.8244C18.2128 13.5891 18.3334 13.2699 18.3334 12.9183V6.85072C18.3381 5.95164 17.8934 5.11464 17.157 4.61423C17.0764 4.53941 16.981 4.48034 16.8757 4.44191L11.3899 1.1914C10.8669 0.881526 10.2945 0.839973 9.85374 0.875543C9.40947 0.911399 9.01002 1.03219 8.75216 1.14659C8.72289 1.15957 8.6944 1.17423 8.66682 1.19049L3.05167 4.50135C2.19919 4.97552 1.66675 5.8708 1.66675 6.8475V12.9183V12.92C1.66772 13.4015 1.79804 13.874 2.0441 14.2879C2.2852 14.6935 2.62874 15.0283 3.04 15.2588L8.64458 18.8042C8.65912 18.8134 8.67394 18.8222 8.68902 18.8305C9.0908 19.0511 9.54173 19.1667 10.0001 19.1667C10.4584 19.1667 10.9094 19.0511 11.3111 18.8305C11.3262 18.8222 11.341 18.8134 11.3556 18.8042L16.9806 15.2459C17.0307 15.2142 17.0772 15.1773 17.1194 15.1358L16.5351 14.5417L17.1194 15.1358C17.1256 15.1297 17.1372 15.1181 17.1435 15.1118C17.1512 15.1039 17.1604 15.0945 16.5351 14.5417ZM7.64306 5.97631C8.26818 5.35119 9.11603 5 10.0001 5C10.8841 5 11.732 5.35119 12.3571 5.97631C12.9822 6.60143 13.3334 7.44928 13.3334 8.33333C13.3334 9.21739 12.9822 10.0652 12.3571 10.6904C11.732 11.3155 10.8841 11.6667 10.0001 11.6667C9.11603 11.6667 8.26818 11.3155 7.64306 10.6904C7.01794 10.0652 6.66675 9.21739 6.66675 8.33333C6.66675 7.44928 7.01794 6.60143 7.64306 5.97631ZM8.33341 8.33333C8.33341 8.77536 8.50901 9.19929 8.82157 9.51185C9.13413 9.82441 9.55805 10 10.0001 10C10.4421 10 10.866 9.82441 11.1786 9.51185C11.4912 9.19929 11.6667 8.77536 11.6667 8.33333C11.6667 7.89131 11.4912 7.46738 11.1786 7.15482C10.866 6.84226 10.4421 6.66667 10.0001 6.66667C9.55805 6.66667 9.13413 6.84226 8.82157 7.15482C8.50901 7.46738 8.33341 7.89131 8.33341 8.33333ZM5.89255 13.289C5.85082 13.3191 5.81197 13.353 5.77651 13.3904L4.39609 14.8425C4.079 15.1761 4.09237 15.7036 4.42594 16.0207C4.75951 16.3377 5.28698 16.3244 5.60407 15.9908L6.9273 14.5988C7.3415 14.3174 7.83122 14.1665 8.33308 14.1667H11.6667C11.6668 14.1665 11.6666 14.1665 11.6667 14.1667C12.5424 14.1665 13.396 13.8908 14.1061 13.3783C14.1479 13.3482 14.1868 13.3143 14.2224 13.2769L15.604 14.8424C15.9211 15.1759 15.9078 15.7034 15.5743 16.0206C15.2408 16.3377 14.7133 16.3244 14.3962 15.9909L13.0718 14.5982C12.6578 14.3172 12.1682 14.1665 11.6667 14.1667H8.33335C7.45703 14.1665 6.60295 14.4425 5.89255 14.9557C5.85082 14.9858 5.81197 15.0197 5.77651 15.0571L6.9273 14.5988ZM8.33335 12.5C8.33335 12.4998 8.33333 12.4998 8.33335 12.5H11.6667C11.6668 12.4998 11.6666 12.4998 11.6667 12.5Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  star: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m12 16.6 4.644 3.105-1.166-5.519 4.255-3.89-5.71-.49L12 4.72 9.978 9.806l-5.71.49 4.254 3.89-1.166 5.519L12 16.599Zm-9.733-6.102c-.513-.527-.257-1.58.512-1.58l6.147-.528 2.306-5.797c.256-.79 1.28-.79 1.536 0l2.306 5.797 6.147.527c.769 0 1.025 1.054.512 1.581l-4.61 4.216 1.28 6.061c.257.79-.512 1.318-1.28 1.054L12 18.404l-5.123 3.425c-.768.527-1.537-.263-1.280-1.054l1.280-6.06z"
        clipRule="evenodd"
      />
    </svg>
  ),
  students: (
    <svg viewBox="0 0 20 20" fill="none">
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z"
      ></path>
    </svg>
  ),
  hot: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.315 14.4652C11.0856 13.994 11.0112 13.5601 10.974 13.1075C10.9492 12.8162 10.8748 12.5434 10.5463 12.4566C10.1805 12.3636 9.94493 12.562 9.78994 12.8658C9.2072 13.994 9.11421 15.2091 9.12041 16.4552C9.12661 17.7446 9.87673 18.6684 10.5649 19.6293C10.8376 20.0136 11.0422 20.429 11.2716 20.8381C11.5754 21.3775 11.1848 21.8858 10.6145 21.9168C9.62256 21.9726 8.67406 21.83 7.76275 21.3713C5.68597 20.3174 4.29731 18.6436 3.41081 16.5482C2.79087 15.0851 2.90866 13.5911 3.5224 12.1404C3.70218 11.7127 3.91915 11.2911 4.13613 10.882C4.26632 10.634 4.4647 10.4294 4.71267 10.2744C5.26441 9.93346 5.80376 10.1504 5.90295 10.789C5.99594 11.3717 6.02693 11.9669 6.08893 12.5558C6.10753 12.7356 6.12612 12.9216 6.25631 13.1075C6.3555 11.9978 6.44229 10.913 6.56008 9.83427C6.72126 8.38362 7.03123 6.97637 7.87434 5.7427C8.01693 5.53192 8.18431 5.35214 8.41989 5.24055C8.92203 4.99258 9.2382 5.09796 9.47378 5.61251C9.75895 6.23245 9.98212 6.88958 10.5339 7.44132C10.5897 7.11275 10.6269 6.83378 10.6888 6.56101C11.0298 5.01737 11.6931 3.62252 12.6107 2.33925C12.7966 2.07888 13.0446 1.94249 13.3794 2.02308C13.6893 2.09748 13.8381 2.33305 13.8319 2.60582C13.8319 3.61632 14.3589 4.36024 15.0284 5.00497C16.4605 6.37503 17.1052 8.07985 17.285 10.0017C17.316 10.324 17.285 10.6526 17.285 11.1113C17.7065 10.572 17.9917 10.0884 18.2645 9.5925C18.4504 9.26393 18.6426 8.94776 19.1076 8.96016C19.4237 8.97256 19.6407 9.09035 19.7771 9.37552C20.676 11.3097 21.2712 13.3121 21.0604 15.4757C20.9302 16.8271 20.428 18.0298 19.4609 19.0031C18.562 19.9144 17.6817 20.8443 16.4976 21.3961C15.6731 21.7804 14.8238 22.0532 13.8939 21.9912C13.2306 21.9478 13.026 21.5758 13.2988 20.9745C13.5344 20.4538 13.9745 20.0818 14.2535 19.5921C15.4376 17.5463 15.6669 15.4447 14.7308 13.2315C14.3093 12.2272 13.9621 11.1919 13.5778 10.169C13.4476 9.82807 13.2678 9.5367 12.8338 9.61109C12.3999 9.69169 12.3503 10.0265 12.3379 10.3922C12.2883 12.097 11.9907 13.2935 11.315 14.4528V14.4652Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  instant: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.71308 2.29834C9.47618 2.49338 9.28465 2.77245 9.15992 3.10434L6.159 11.1068C6.04437 11.4118 5.99014 11.7508 6.00147 12.0917C6.0128 12.4325 6.08931 12.7638 6.22373 13.0541C6.35815 13.3444 6.54601 13.584 6.76947 13.7502C6.99292 13.9164 7.24454 14.0037 7.50041 14.0037H10.5812L9.04588 19.5214C8.96429 19.9635 8.99825 20.4295 9.14216 20.8425C9.28608 21.2554 9.53133 21.5905 9.8374 21.7925C10.1435 21.9944 10.4921 22.0511 10.8256 21.9532C11.1591 21.8553 11.4575 21.6086 11.6717 21.2539L17.6735 11.2508C17.8497 10.9567 17.9601 10.6022 17.9919 10.2281C18.0238 9.85408 17.9758 9.47564 17.8536 9.13629C17.7313 8.79695 17.5398 8.51048 17.3009 8.3098C17.062 8.10912 16.7855 8.00238 16.5032 8.00184H13.0844L14.9247 4.63281C14.9998 4.33221 15.0202 4.01213 14.9844 3.69892C14.9486 3.38571 14.8575 3.08833 14.7186 2.83126C14.5797 2.57418 14.397 2.36476 14.1855 2.22024C13.9741 2.07573 13.7399 2.00024 13.5023 2H10.5013C10.2229 2.00001 9.94998 2.10331 9.71308 2.29834Z"
        fill="currentColor"
      ></path>
    </svg>
  ),
  sponsored: (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
      <path d="m6.758 11.034.585 1.43a4.53 4.53 0 1 1 5.13-5.052l-1.419-.594a3.276 3.276 0 1 0-4.3 4.216h.004Zm-3.53 1.738a6.75 6.75 0 1 1 9.545-9.544A6.7 6.7 0 0 1 14.75 8c0 .121-.01.24-.018.36l1.218.51a8 8 0 1 0-7.177 7.093l-.5-1.225a6.722 6.722 0 0 1-5.046-1.966Zm9.623 7.141 1.2-2.874 2.021 2.011a.7.7 0 0 0 .99 0l1.885-1.87a.7.7 0 0 0 .007-.989l-1.994-2.038 2.5-1.024a.7.7 0 0 0 .431-.647L19.852 12 8.712 7.262a1.1 1.1 0 0 0-1.443 1.424l4.448 10.84a.7.7 0 0 0 .646.433l.488-.046Zm4.913-7.436L14.772 13.7l2.912 2.977-1.112 1.1-2.95-2.938-1.25 2.981-3.759-9.178 9.151 3.835Z"></path>
    </svg>
  ),
};

interface School {
  name: string;
  schoolType: string;
  location: string;
  ratio: string;
  rating: string;
  image: string;
  avatar: string;
  ranking: string;
  grade: string;
  students: string;
  price: string;
  grades: string;
  specialty: string;
  description: string;
  reviews: number;
}

const schools: School[] = [
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
    image: "https://i.ibb.co/fVRCnNZ/school2.webp",
    avatar: "https://i.ibb.co/fVRCnNZ/school2.webp",
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
    image: "https://i.ibb.co/fzzhd5t/school4.webp",
    avatar: "https://i.ibb.co/fzzhd5t/school4.webp",
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
    image: "https://i.ibb.co/B5pFBbB/school5.webp",
    avatar: "https://i.ibb.co/B5pFBbB/school5.webp",
    ranking: "#3 in Best School for Physics in America",
    grade: "A+",
    students: "789",
    price: "$52,506",
    grades: "K-12",
    specialty: "sponsored",
    description:
      "Caltech offers an intensive focus on science and engineering with small class sizes and close faculty collaboration. The institute's research facilities and theoretical approach are world-renowned.",
    reviews: 389,
  },
];

export default function SchoolsGrid() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 w-full">
      {schools.map((school) => (
        <div
          key={school.name}
          className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#E5E7EB] w-full"
        >
          <div className="hidden lg:block">
            <div className="relative w-full h-40 overflow-hidden">
              <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer text-[#4A4A4A] hover:bg-[#EBFCF4] hover:text-[#016853] transition-all z-10">
                <span className="w-4 h-4 mr-1">{ICONS.like}</span>
              </div>
              {school.specialty === "hot" && (
                <div className="absolute top-3 left-3 h-8 bg-white rounded-2xl flex items-center px-3 cursor-pointer text-[#FF4D4D] text-xs font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-10">
                  <span className="w-4 h-4 mr-1">{ICONS.hot}</span>
                  High demand
                </div>
              )}
              {school.specialty === "instant-book" && (
                <div className="absolute top-3 left-3 h-8 bg-white rounded-2xl flex items-center px-3 cursor-pointer text-[#1D77BD] text-xs font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-10">
                  <span className="w-4 h-4 mr-1">{ICONS.instant}</span>
                  Instant book
                </div>
              )}
              {school.specialty === "sponsored" && (
                <div className="absolute top-3 left-3 h-8 bg-white rounded-2xl flex items-center px-3 cursor-pointer text-[#FF9900] text-xs font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] z-10">
                  <span className="w-4 h-4 mr-1">{ICONS.sponsored}</span>
                  Sponsored
                </div>
              )}
              <img
                src={school.image}
                alt={school.name}
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-2.5 bg-white px-2 pt-1 text-xs font-semibold text-[#464646] uppercase tracking-wider rounded-t-md h-6 flex items-center shadow-[0_-1px_4px_rgba(0,0,0,0.1)] z-10">
                {school.schoolType}
              </div>
            </div>
            <div className="p-4 flex-grow">
              <div className="text-[#089E68] text-sm mb-2 whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                {school.ranking}
              </div>
              <h3 className="text-base font-semibold text-[#464646] mb-2 leading-tight">
                {school.name}
              </h3>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1.5 text-sm text-[#5F5F5F] font-[450]">
                  <span className="w-4 h-4 mr-1">{ICONS.location}</span>

                  <span className="text-[#464646]">{school.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#5F5F5F] font-[450]">
                  <span className="w-4 h-4 mr-1">{ICONS.ratio}</span>

                  <span className="text-[#464646]">{school.ratio}</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[#5F5F5F] font-[450]">
                  <span className="w-4 h-4 mr-1">{ICONS.star}</span>

                  <span className="text-[#464646]">{school.rating}</span>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-[rgba(1,104,83,0.1)] flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#016853] font-semibold">
                <div className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {school.grade}
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#5F5F5F]">
                <span className="w-4 h-4 mr-1">{ICONS.students}</span>

                <span>Students: {school.students}</span>
              </div>
            </div>
          </div>

          <div className="lg:hidden p-3 flex gap-3 w-full">
            <img
              src={school.image}
              alt={school.name}
              className="w-[100px] h-[70px] rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <div className="text-[#089E68] text-xs mb-1 font-medium truncate">
                  {school.ranking}
                </div>
                <h3 className="text-[15px] font-semibold text-[#464646] leading-[1.4] line-clamp-2 break-words">
                  {school.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mt-1">
                <div className="flex items-center gap-1 text-xs text-[#6F767E]">
                  <span className="w-3.5 h-3.5 flex-shrink-0">
                    {ICONS.location}
                  </span>
                  <span className="truncate">{school.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#6F767E]">
                  <span className="w-3.5 h-3.5 flex-shrink-0">
                    {ICONS.ratio}
                  </span>
                  <span>{school.ratio}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#6F767E]">
                  <span className="w-3.5 h-3.5 flex-shrink-0">
                    {ICONS.star}
                  </span>
                  <span>{school.rating}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:hidden px-3 py-3 flex items-center justify-between bg-[#F8F9FA] border-t border-[rgba(1,104,83,0.1)]">
            <div className="flex items-center gap-2 font-semibold text-[#016853]">
              <div className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                {school.grade}
              </div>
              <span>Grade</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#5F5F5F]">
              <span className="w-4 h-4 text-[#089E68] flex-shrink-0">
                {ICONS.students}
              </span>
              <span className="truncate">Students: {school.students}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
