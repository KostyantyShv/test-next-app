import { JSX, useState } from "react";
import Image from "next/image";

// Type definitions
interface SocialLink {
  id: string;
  tooltip: string;
  icon: JSX.Element;
}

interface InfoField {
  id: string;
  label: string;
  value: string;
  icon: JSX.Element;
}

const socialLinks: SocialLink[] = [
  {
    id: "twitter",
    tooltip: "Twitter (X)",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" className="fill-current">
        <path d="M14.074 3.75h2.172l-4.746 5.295L17.083 16.25h-4.37l-3.425-4.37-3.918 4.37H3.197l5.076-5.663L2.917 3.75h4.482l3.095 3.994L14.074 3.75zm-1.257 11.25h1.2l-7.75-8.75h-1.3l7.85 8.75z" />
      </svg>
    ),
  },
  {
    id: "linkedin",
    tooltip: "Linkedin",
    icon: (
      <svg
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
        className="fill-current"
      >
        <path
          d="M4.99992 3.95834C4.42462 3.95834 3.95825 4.42471 3.95825 5.00001V15C3.95825 15.5753 4.42462 16.0417 4.99992 16.0417H14.9999C15.5752 16.0417 16.0416 15.5753 16.0416 15V5.00001C16.0416 4.42471 15.5752 3.95834 14.9999 3.95834H4.99992ZM2.70825 5.00001C2.70825 3.73436 3.73427 2.70834 4.99992 2.70834H14.9999C16.2656 2.70834 17.2916 3.73436 17.2916 5.00001V15C17.2916 16.2657 16.2656 17.2917 14.9999 17.2917H4.99992C3.73427 17.2917 2.70825 16.2657 2.70825 15V5.00001ZM6.66659 6.04168C7.01176 6.04168 7.29158 6.3215 7.29158 6.66668V6.67501C7.29158 7.02019 7.01176 7.30001 6.66659 7.30001C6.32141 7.30001 6.04159 7.02019 6.04159 6.67501V6.66668C6.04159 6.3215 6.32141 6.04168 6.66659 6.04168ZM6.66659 8.54168C7.01176 8.54168 7.29158 8.8215 7.29158 9.16668V13.3333C7.29158 13.6785 7.01176 13.9583 6.66659 13.9583C6.32141 13.9583 6.04159 13.6785 6.04159 13.3333V9.16668C6.04159 8.8215 6.32141 8.54168 6.66659 8.54168ZM10.5337 8.8413C10.4239 8.66161 10.2259 8.54168 9.99992 8.54168C9.65474 8.54168 9.37492 8.8215 9.37492 9.16668V13.3333C9.37492 13.6785 9.65474 13.9583 9.99992 13.9583C10.3451 13.9583 10.6249 13.6785 10.6249 13.3333V10.8333C10.6249 10.5571 10.7347 10.2921 10.93 10.0968C11.1254 9.90142 11.3903 9.79168 11.6666 9.79168C11.9429 9.79168 12.2078 9.90142 12.4032 10.0968C12.5985 10.2921 12.7083 10.5571 12.7083 10.8333V13.3333C12.7083 13.6785 12.9881 13.9583 13.3333 13.9583C13.6784 13.9583 13.9583 13.6785 13.9583 13.3333V10.8333C13.9583 10.2256 13.7168 9.64266 13.287 9.21289C12.8573 8.78312 12.2744 8.54168 11.6666 8.54168C11.2659 8.54168 10.876 8.64663 10.5337 8.8413Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "facebook",
    tooltip: "Facebook",
    icon: (
      <svg
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
        className="fill-current"
      >
        <path
          d="M9.11194 3.27845C10.0106 2.37983 11.2293 1.875 12.5002 1.875H15.0002C15.3453 1.875 15.6252 2.15482 15.6252 2.5V5.83333C15.6252 6.17851 15.3453 6.45833 15.0002 6.45833H12.5002C12.4449 6.45833 12.3919 6.48028 12.3528 6.51935C12.3138 6.55842 12.2918 6.61141 12.2918 6.66667V7.70833H15.0002C15.1926 7.70833 15.3743 7.797 15.4928 7.9487C15.6112 8.1004 15.6532 8.2982 15.6065 8.48492L14.7732 11.8183C14.7036 12.0965 14.4536 12.2917 14.1668 12.2917H12.2918V17.5C12.2918 17.8452 12.012 18.125 11.6668 18.125H8.3335C7.98832 18.125 7.7085 17.8452 7.7085 17.5V12.2917H5.8335C5.48832 12.2917 5.2085 12.0118 5.2085 11.6667V8.33333C5.2085 7.98816 5.48832 7.70833 5.8335 7.70833H7.7085V6.66667C7.7085 5.39584 8.21333 4.17706 9.11194 3.27845ZM12.5002 3.125C11.5609 3.125 10.66 3.49814 9.99583 4.16233C9.33164 4.82652 8.9585 5.72736 8.9585 6.66667V8.33333C8.9585 8.67851 8.67867 8.95833 8.3335 8.95833H6.4585V11.0417H8.3335C8.67867 11.0417 8.9585 11.3215 8.9585 11.6667V16.875H11.0418V11.6667C11.0418 11.3215 11.3217 11.0417 11.6668 11.0417H13.6788L14.1997 8.95833H11.6668C11.3217 8.95833 11.0418 8.67851 11.0418 8.33333V6.66667C11.0418 6.27989 11.1955 5.90896 11.469 5.63547C11.7425 5.36198 12.1134 5.20833 12.5002 5.20833H14.3752V3.125H12.5002Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "instagram",
    tooltip: "Instagram",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" className="fill-current">
        <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
      </svg>
    ),
  },
];

// Information fields data
const infoFields: InfoField[] = [
  {
    id: "joined",
    label: "Joined",
    value: "Dec 15, 2024",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fill-current"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
        />
      </svg>
    ),
  },
  {
    id: "location",
    label: "Location",
    value: "Boston, MA",
    icon: (
      <svg
        width="20"
        height="20"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7
        c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"
        />
        <path
          d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3
        c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8
        C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1
        c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1
        C18.6,5.5,19.8,8.4,19.2,11.2z"
        />
      </svg>
    ),
  },
  {
    id: "website",
    label: "Website",
    value: "www.example.com",
    icon: (
      <svg
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="fill-current"
      >
        <path
          d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9851 4.00291C11.9933 4.00046 11.9982 4.00006 11.9996 4C12.001 4.00006 12.0067 4.00046 12.0149 4.00291C12.0256 4.00615 12.047 4.01416 12.079 4.03356C12.2092 4.11248 12.4258 4.32444 12.675 4.77696C12.9161 5.21453 13.1479 5.8046 13.3486 6.53263C13.6852 7.75315 13.9156 9.29169 13.981 11H10.019C10.0844 9.29169 10.3148 7.75315 10.6514 6.53263C10.8521 5.8046 11.0839 5.21453 11.325 4.77696C11.5742 4.32444 11.7908 4.11248 11.921 4.03356C11.953 4.01416 11.9744 4.00615 11.9851 4.00291ZM8.01766 11C8.08396 9.13314 8.33431 7.41167 8.72334 6.00094C8.87366 5.45584 9.04762 4.94639 9.24523 4.48694C6.48462 5.49946 4.43722 7.9901 4.06189 11H8.01766ZM4.06189 13H8.01766C8.09487 15.1737 8.42177 17.1555 8.93 18.6802C9.02641 18.9694 9.13134 19.2483 9.24522 19.5131C6.48461 18.5005 4.43722 16.0099 4.06189 13ZM10.019 13H13.981C13.9045 14.9972 13.6027 16.7574 13.1726 18.0477C12.9206 18.8038 12.6425 19.3436 12.3823 19.6737C12.2545 19.8359 12.1506 19.9225 12.0814 19.9649C12.0485 19.9852 12.0264 19.9935 12.0153 19.9969C12.0049 20.0001 11.9999 20 11.9999 20C11.9999 20 11.9948 20 11.9847 19.9969C11.9736 19.9935 11.9515 19.9852 11.9186 19.9649C11.8494 19.9225 11.7455 19.8359 11.6177 19.6737C11.3575 19.3436 11.0794 18.8038 10.8274 18.0477C10.3973 16.7574 10.0955 14.9972 10.019 13ZM15.9823 13C15.9051 15.1737 15.5782 17.1555 15.07 18.6802C14.9736 18.9694 14.8687 19.2483 14.7548 19.5131C17.5154 18.5005 19.5628 16.0099 19.9381 13H15.9823ZM19.9381 11C19.5628 7.99009 17.5154 5.49946 14.7548 4.48694C14.9524 4.94639 15.1263 5.45584 15.2767 6.00094C15.6657 7.41167 15.916 9.13314 15.9823 11H19.9381Z"
          clipRule="evenodd"
          fillRule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: "phone",
    label: "Phone",
    value: "+1 (555) 123-4567",
    icon: (
      <svg viewBox="0 0 20 20" width="20" height="20" className="fill-current">
        <path d="M15.833 14.167l-2.5-.833a.833.833 0 00-.833.167l-1.667 1.666a10 10 0 01-5-5L7.5 8.333a.833.833 0 00.167-.833l-.834-2.5a.833.833 0 00-.666-.583L3.333 4.167a.833.833 0 00-.916.666A13.333 13.333 0 0015.25 17.667a.833.833 0 00.667-.917l-.25-2.833a.833.833 0 00-.584-.666z" />
      </svg>
    ),
  },
];

// Avatar data
const avatarImages: string[] = [
  "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
  "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
  "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
  "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
  "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
  "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
  "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
];

// Tags data
const tags: string[] = [
  "Organic Chemistry",
  "Chemical Processing",
  "Research Methods",
  "Lab Management",
  "Academic Publishing",
  "Student Mentoring",
  "Industry Collaboration",
];

const AboutCard = ({ id }: { id: string }) => {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Fixed click animation handlers
  const handleTagClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const button = e.currentTarget;
    button.classList.add("scale-95");
    setTimeout(() => {
      // Check if button is still in the DOM before removing class
      if (button) {
        button.classList.remove("scale-95");
      }
    }, 100);
  };

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const link = e.currentTarget;
    link.classList.add("scale-95");
    setTimeout(() => {
      // Check if link is still in the DOM before modifying
      if (link) {
        link.classList.remove("scale-95");
        link.classList.add("-translate-y-0.5");
      }
    }, 100);
  };

  const handleMoreFollowersClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    e.preventDefault();
    const link = e.currentTarget;
    link.classList.remove("underline");
    setTimeout(() => {
      // Check if link is still in the DOM before adding class
      if (link) {
        link.classList.add("underline");
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex justify-center my-cardMargin" id={id}>
      <div className="w-full max-w-full bg-cardBackground rounded-cardBorderRadius shadow-cardShadow p-cardPadding">
        <div className="flex gap-6 mb-8 items-center flex-col sm:flex-row">
          <div className="relative w-[120px] h-[120px]">
            <Image
              width={120}
              height={120}
              src="https://i.ibb.co/YP71Tb6/profile9.jpg"
              alt="Lincoln Academy"
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold text-[#464646] mb-2 text-center sm:text-left">
              Lincoln Academy
            </h1>
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <span className="bg-[#EBFCF4] text-[#016853] px-3 py-1.5 rounded-full text-sm font-medium">
                Advanced Chemistry Expert
              </span>
              <span className="bg-[#EBFCF4] text-[#016853] px-3 py-1.5 rounded-full text-sm font-medium">
                Research Publication Lead
              </span>
              <span className="bg-[#EBFCF4] text-[#016853] px-3 py-1.5 rounded-full text-sm font-medium">
                Department Head
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {infoFields.map((field) => (
            <div key={field.id} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#F8F9FD] rounded-lg flex items-center justify-center text-[#4A4A4A]">
                {field.icon}
              </div>
              <div className="flex-1">
                <div className="text-xs text-[#5F5F5F] uppercase tracking-wider mb-1">
                  {field.label}
                </div>
                <div className="text-sm text-[#4A4A4A] font-medium">
                  {field.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.id}
              href="#"
              className="w-10 h-10 bg-[#F8F9FD] rounded-lg flex items-center justify-center text-[#4A4A4A] transition-all duration-200 ease-in-out hover:bg-[#EBFCF4] hover:text-[#016853] hover:-translate-y-0.5 relative"
              onMouseEnter={() => setHoveredSocial(social.id)}
              onMouseLeave={() => setHoveredSocial(null)}
              onClick={handleSocialClick}
            >
              {social.icon}
              <span
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white py-1 px-2 rounded text-xs whitespace-nowrap transition-all duration-200 ${
                  hoveredSocial === social.id
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                {social.tooltip}
              </span>
            </a>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#464646]">
              Followers
            </h2>
            <span className="bg-[#EBFCF4] text-[#016853] px-3 py-1 rounded-full text-sm font-medium">
              111
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {avatarImages.map((src, index) => (
              <div key={index} className="relative w-10 h-10 group">
                <Image
                  width={40}
                  height={40}
                  src={src}
                  alt={`Follower ${index + 1}`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm transition-transform duration-200 group-hover:scale-110 group-hover:z-10"
                />
              </div>
            ))}
          </div>
          <a
            href="#"
            onClick={handleMoreFollowersClick}
            className="text-[#346DC2] text-sm font-medium hover:underline"
          >
            +97 followers
          </a>
        </div>

        <div className="mb-8">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[#464646]">
              Areas of Expertise
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={handleTagClick}
                className="bg-[#F8F9FD] text-[#4A4A4A] px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-[#EBFCF4] hover:text-[#016853] hover:-translate-y-0.5"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCard;
