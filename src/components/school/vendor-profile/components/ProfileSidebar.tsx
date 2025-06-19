import { useState } from "react";

export default function ProfileSidebar() {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialAboutText = `Lincoln University is a distinguished higher education institution established in 1854, making it one of the oldest educational establishments in the region. Located in Cambridge, Massachusetts, the university is renowned for its exceptional academic programs and commitment to educational excellence.

With a diverse faculty of over 500 professors and instructors, Lincoln University offers comprehensive undergraduate and graduate programs across various disciplines including Arts & Sciences, Business, Engineering, Law, and Medicine. The university maintains a strong focus on research and innovation, contributing significantly to advancements in multiple fields.

Lincoln University prides itself on its inclusive and dynamic campus community, which hosts students from over 80 countries. The institution is dedicated to providing a supportive and intellectually stimulating environment where students can develop critical thinking skills and prepare for meaningful careers.`;

  const additionalAboutText = `
The university's campus spans over 200 acres and features state-of-the-art facilities, including advanced research laboratories, modern classrooms, and extensive libraries housing over 5 million volumes. Lincoln University is also home to several specialized research centers focused on areas such as environmental sustainability, artificial intelligence, biomedical sciences, and social policy.

With a strong commitment to community engagement, Lincoln University actively participates in local and global initiatives aimed at addressing pressing societal challenges. The university offers numerous opportunities for students to engage in service-learning, internships, and study abroad programs, enriching their educational experience and preparing them for leadership roles in an increasingly interconnected world.
`;

  const handleShowMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden h-fit shadow-[0_1px_3px_rgba(0,0,0,0.1)] lg:mt-0 mt-8">
      <div className="flex flex-col divide-y divide-[#E5E7EB]">
        {/* Published Content Section */}
        <div className="p-4">
          <h2 className="flex items-center justify-between text-[15px] font-semibold mb-4 text-[#464646]">
            Published Content
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 text-[#4F4F4F]">
                <svg viewBox="0 0 16 16" strokeLinejoin="round">
                  <path
                    fill="currentColor"
                    d="M2.5 4C3.19036 4 3.75 3.44036 3.75 2.75C3.75 2.05964 3.19036 1.5 2.5 1.5C1.80964 1.5 1.25 2.05964 1.25 2.75C1.25 3.44036 1.80964 4 2.5 4ZM2.5 9.25C3.19036 9.25 3.75 8.69036 3.75 8C3.75 7.30964 3.19036 6.75 2.5 6.75C1.80964 6.75 1.25 7.30964 1.25 8C1.25 8.69036 1.80964 9.25 2.5 9.25ZM3.75 13.25C3.75 13.9404 3.19036 14.5 2.5 14.5C1.80964 14.5 1.25 13.9404 1.25 13.25C1.25 12.5596 1.80964 12 2.5 12C3.19036 12 3.75 12.5596 3.75 13.25ZM6.75 2H6V3.5H6.75H14.25H15V2H14.25H6.75ZM6.75 7.25H6V8.75H6.75H14.25H15V7.25H14.25H6.75ZM6.75 12.5H6V14H6.75H14.25H15V12.5H14.25H6.75Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </span>
              <span className="text-sm text-[#1A1D1F]">25 Listings</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 text-[#4F4F4F]">
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.2"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <rect
                    ry="1.5"
                    rx="1.5"
                    height="8"
                    width="12"
                    y="6.5"
                    x="3"
                  ></rect>
                  <path d="M7 6.5V5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1"></path>
                </svg>
              </span>
              <span className="text-sm text-[#1A1D1F]">9 Offers</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-5 h-5 text-[#4F4F4F]">
                <svg
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.954 9.395C22.832 9.017 22.481 8.756 22.058 8.747L15.298 8.823L12.878 1.628C12.746 1.252 12.39 1 11.992 1H11.99C11.591 1 11.236 1.254 11.103 1.639L8.72301 8.822L1.92101 8.686C1.52101 8.693 1.16901 8.953 1.04601 9.333C0.922011 9.714 1.05401 10.132 1.36001 10.361L6.82101 14.607L4.55601 21.791C4.44101 22.173 4.58101 22.588 4.90501 22.821C5.23101 23.056 5.66501 23.056 5.99101 22.829L12.121 18.526L17.994 22.83C18.155 22.942 18.343 22.998 18.531 22.998C18.726 22.998 18.919 22.938 19.083 22.819C19.406 22.583 19.544 22.169 19.424 21.777L17.129 14.74L22.628 10.43C22.946 10.189 23.077 9.772 22.954 9.393V9.395ZM16.211 13.554C15.736 13.916 15.534 14.541 15.711 15.123L17.463 20.581L12.942 17.268C12.451 16.925 11.794 16.927 11.304 17.268L6.49301 20.646L8.25601 15.053C8.42901 14.482 8.22601 13.856 7.76201 13.504L3.60601 10.222L8.80301 10.326C9.39901 10.313 9.93101 9.927 10.13 9.353L11.997 3.719L13.895 9.363C14.091 9.927 14.622 10.313 15.243 10.326L20.405 10.267L16.211 13.554Z"></path>
                </svg>
              </span>
              <span className="text-sm text-[#1A1D1F]">
                <strong>4.9</strong> (575)
              </span>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="p-4">
          <h2 className="flex items-center justify-between text-[15px] font-semibold mb-4 text-[#464646]">
            Badges
          </h2>
          <div className="flex gap-3 flex-wrap">
            <div className="relative w-9 h-9 cursor-pointer">
              <svg
                viewBox="0 0 33 36"
                fill="none"
                height="36"
                width="33"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12.847v10.306c0 2.772 1.464 5.318 3.878 6.734l8.662 5.05a7.91 7.91 0 0 0 7.92 0l8.662-5.05A7.81 7.81 0 0 0 33 23.153V12.847c0-2.772-1.464-5.317-3.878-6.734l-8.662-5.05a7.91 7.91 0 0 0-7.92 0l-8.662 5.05A7.81 7.81 0 0 0 0 12.847"
                  fill="#03EF62"
                ></path>
                <g clipPath="url(#TopProductSmall_svg__a)">
                  <path
                    d="M14.82 21.91V22a.82.82 0 01-.82.82H8.82a.82.82 0 01-.82-.82v-5.15a.82.82 0 01.82-.82h1.65v-1.65a3.29 3.29 0 013.29-3.29h.02a3.29 3.29 0 013.29 3.29v1.65h1.65a.82.82 0 01.82.82v2.06a.82.82 0 01-.24.58l-3.09 3.09a.82.82 0 01-.58.24h-2.06a.82.82 0 01-.58-.24l-3.09-3.09a.82.82 0 01-.24-.58v-1.23h-1.65v3.29h3.29v-1.65l2.47 2.47h.82zm1.65-7.41a1.65 1.65 0 00-1.65-1.65h-.02a1.65 1.65 0 00-1.65 1.65v1.65h3.29v-1.65z"
                    fill="#fff"
                  ></path>
                </g>
                <defs>
                  <clipPath id="TopProductSmall_svg__a">
                    <path
                      fill="#fff"
                      transform="translate(7 8)"
                      d="M0 0h19v19H0z"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
              <span className="absolute top-[-8px] right-[-8px] w-4 h-4 bg-[#FF4D4D] rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
                3
              </span>
            </div>
            <div className="relative w-9 h-9 cursor-pointer">
              <svg
                viewBox="0 0 33 36"
                fill="none"
                height="36"
                width="33"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12.847v10.306c0 2.772 1.464 5.318 3.878 6.734l8.662 5.05a7.91 7.91 0 0 0 7.92 0l8.662-5.05A7.81 7.81 0 0 0 33 23.153V12.847c0-2.772-1.464-5.317-3.878-6.734l-8.662-5.05a7.91 7.91 0 0 0-7.92 0l-8.662 5.05A7.81 7.81 0 0 0 0 12.847"
                  fill="#FFD700"
                ></path>
                <g clipPath="url(#TopProductSmall_svg__b)">
                  <path
                    d="M14.82 21.91V22a.82.82 0 01-.82.82H8.82a.82.82 0 01-.82-.82v-5.15a.82.82 0 01.82-.82h1.65v-1.65a3.29 3.29 0 013.29-3.29h.02a3.29 3.29 0 013.29 3.29v1.65h1.65a.82.82 0 01.82.82v2.06a.82.82 0 01-.24.58l-3.09 3.09a.82.82 0 01-.58.24h-2.06a.82.82 0 01-.58-.24l-3.09-3.09a.82.82 0 01-.24-.58v-1.23h-1.65v3.29h3.29v-1.65l2.47 2.47h.82zm1.65-7.41a1.65 1.65 0 00-1.65-1.65h-.02a1.65 1.65 0 00-1.65 1.65v1.65h3.29v-1.65z"
                    fill="#fff"
                  ></path>
                </g>
                <defs>
                  <clipPath id="TopProductSmall_svg__b">
                    <path
                      fill="#fff"
                      transform="translate(7 8)"
                      d="M0 0h19v19H0z"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
              <span className="absolute top-[-8px] right-[-8px] w-4 h-4 bg-[#FF4D4D] rounded-full flex items-center justify-center text-white text-[10px] font-semibold">
                2
              </span>
            </div>
          </div>
        </div>

        {/* Social & Links Section */}
        <div className="p-4">
          <h2 className="flex items-center justify-between text-[15px] font-semibold mb-4 text-[#464646]">
            Social & Links
          </h2>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center bg-[#F5F5F7] rounded-md cursor-pointer hover:bg-[#E5E7EB] transition-colors"
            >
              <svg viewBox="0 0 80 80" className="w-4 h-4 text-[#4F4F4F]">
                <path
                  fill="currentColor"
                  strokeLinejoin="miter"
                  clipRule="unset"
                  fillRule={undefined}
                  d="M40 7.5c-17.949 0-32.5 14.551-32.5 32.5s14.551 32.5 32.5 32.5c17.949 0 32.5-14.551 32.5-32.5v0c-0.019-17.942-14.558-32.481-32.498-32.5h-0.002zM66.033 48.767h-11.567c0.565-2.632 0.893-5.659 0.9-8.761v-0.005c-0.018-2.745-0.272-5.418-0.742-8.016l0.042 0.282h11.033c0.095 0.009 0.205 0.014 0.317 0.014s0.222-0.005 0.331-0.015l-0.014 0.001c0.733 2.312 1.159 4.972 1.167 7.73v0.004c-0.008 3.141-0.544 6.154-1.525 8.958l0.058-0.192zM30.567 48.767c-0.593-2.621-0.933-5.631-0.933-8.72 0-0.016 0-0.033 0-0.049v0.003c0.019-2.747 0.297-5.417 0.811-8.002l-0.045 0.269h19.2c0.47 2.316 0.748 4.986 0.767 7.718l0 0.015c-0.002 3.083-0.341 6.086-0.985 8.974l0.051-0.274zM48.033 53.767c-1.925 4.893-4.646 9.081-8.045 12.612l0.012-0.012c-3.394-3.537-6.116-7.748-7.944-12.409l-0.089-0.258zM13.967 48.767c-0.922-2.613-1.459-5.626-1.467-8.763v-0.004c-0-0.019-0-0.042-0-0.065 0-2.784 0.427-5.468 1.218-7.991l-0.051 0.189c0.095 0.009 0.205 0.014 0.317 0.014s0.222-0.005 0.331-0.015l-0.014 0.001h11.033c-0.436 2.36-0.69 5.080-0.7 7.858v0.008c0.012 3.087 0.339 6.090 0.951 8.988l-0.051-0.288h-11.233zM31.7 27.267c1.868-5.306 4.699-9.854 8.314-13.649l-0.014 0.015c3.601 3.779 6.432 8.328 8.219 13.37l0.081 0.263zM64.333 27.267h-10.833c-1.62-5.343-4.094-9.985-7.299-14.019l0.066 0.086c7.891 1.89 14.333 6.979 17.995 13.787l0.072 0.147zM33.733 13.333c-3.079 3.954-5.498 8.597-6.992 13.638l-0.075 0.295h-11c3.734-6.954 10.176-12.044 17.879-13.895l0.188-0.038zM16.167 53.7h10.5c1.699 4.974 4.111 9.279 7.162 13.045l-0.062-0.079c-7.548-1.804-13.765-6.507-17.53-12.839l-0.070-0.127zM46.167 66.767c3.010-3.719 5.444-8.055 7.076-12.767l0.090-0.3h10.6c-3.843 6.478-10.089 11.187-17.479 12.929l-0.187 0.037z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center bg-[#F5F5F7] rounded-md cursor-pointer hover:bg-[#E5E7EB] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="w-4 h-4 text-[#4F4F4F]"
              >
                <path
                  fill="currentColor"
                  d="M14.0738 3.75H16.2461L11.5003 9.04487L17.0834 16.25H12.7119L9.28791 11.8801L5.37012 16.25H3.1965L8.27267 10.5865L2.91675 3.75H7.39928L10.4942 7.74423L14.0738 3.75Z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center bg-[#F5F5F7] rounded-md cursor-pointer hover:bg-[#E5E7EB] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="w-4 h-4 text-[#4F4F4F]"
              >
                <path
                  fill="currentColor"
                  d="M9.11194 3.27845C10.0106 2.37983 11.2293 1.875 12.5002 1.875H15.0002C15.3453 1.875 15.6252 2.15482 15.6252 2.5V5.83333C15.6252 6.17851 15.3453 6.45833 15.0002 6.45833H12.5002C12.4449 6.45833 12.3919 6.48028 12.3528 6.51935C12.3138 6.55842 12.2918 6.61141 12.2918 6.66667V7.70833H15.0002C15.1926 7.70833 15.3743 7.797 15.4928 7.9487C15.6112 8.1004 15.6532 8.2982 15.6065 8.48492L14.7732 11.8183C14.7036 12.0965 14.4536 12.2917 14.1668 12.2917H12.2918V17.5C12.2918 17.8452 12.012 18.125 11.6668 18.125H8.3335C7.98832 18.125 7.7085 17.8452 7.7085 17.5V12.2917H5.8335C5.48832 12.2917 5.2085 12.0118 5.2085 11.6667V8.33333C5.2085 7.98816 5.48832 7.70833 5.8335 7.70833H7.7085V6.66667C7.7085 5.39584 8.21333 4.17706 9.11194 3.27845ZM12.5002 3.125C11.5609 3.125 10.66 3.49814 9.99583 4.16233C9.33164 4.82652 8.9585 5.72736 8.9585 6.66667V8.33333C8.9585 8.67851 8.67867 8.95833 8.3335 8.95833H6.4585V11.0417H8.3335C8.67867 11.0417 8.9585 11.3215 8.9585 11.6667V16.875H11.0418V11.6667C11.0418 11.3215 11.3217 11.0417 11.6668 11.0417H13.6788L14.1997 8.95833H11.6668C11.3217 8.95833 11.0418 8.67851 11.0418 8.33333V6.66667C11.0418 6.27989 11.1955 5.90896 11.469 5.63547C11.7425 5.36198 12.1134 5.20833 12.5002 5.20833H14.3752V3.125H12.5002Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="w-8 h-8 flex items-center justify-center bg-[#F5F5F7] rounded-md cursor-pointer hover:bg-[#E5E7EB] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
                className="w-4 h-4 text-[#4F4F4F]"
              >
                <path
                  fill="currentColor"
                  d="M4.99992 3.95834C4.42462 3.95834 3.95825 4.42471 3.95825 5.00001V15C3.95825 15.5753 4.42462 16.0417 4.99992 16.0417H14.9999C15.5752 16.0417 16.0416 15.5753 16.0416 15V5.00001C16.0416 4.42471 15.5752 3.95834 14.9999 3.95834H4.99992ZM2.70825 5.00001C2.70825 3.73436 3.73427 2.70834 4.99992 2.70834H14.9999C16.2656 2.70834 17.2916 3.73436 17.2916 5.00001V15C17.2916 16.2657 16.2656 17.2917 14.9999 17.2917H4.99992C3.73427 17.2917 2.70825 16.2657 2.70825 15V5.00001ZM6.66659 6.04168C7.01176 6.04168 7.29158 6.3215 7.29158 6.66668V6.67501C7.29158 7.02019 7.01176 7.30001 6.66659 7.30001C6.32141 7.30001 6.04159 7.02019 6.04159 6.67501V6.66668C6.04159 6.3215 6.32141 6.04168 6.66659 6.04168ZM6.66659 8.54168C7.01176 8.54168 7.29158 8.8215 7.29158 9.16668V13.3333C7.29158 13.6785 7.01176 13.9583 6.66659 13.9583C6.32141 13.9583 6.04159 13.6785 6.04159 13.3333V9.16668C6.04159 8.8215 6.32141 8.54168 6.66659 8.54168ZM10.5337 8.8413C10.4239 8.66161 10.2259 8.54168 9.99992 8.54168C9.65474 8.54168 9.37492 8.8215 9.37492 9.16668V13.3333C9.37492 13.6785 9.65474 13.9583 9.99992 13.9583C10.3451 13.9583 10.6249 13.6785 10.6249 13.3333V10.8333C10.6249 10.5571 10.7347 10.2921 10.93 10.0968C11.1254 9.90142 11.3903 9.79168 11.6666 9.79168C11.9429 9.79168 12.2078 9.90142 12.4032 10.0968C12.5985 10.2921 12.7083 10.5571 12.7083 10.8333V13.3333C12.7083 13.6785 12.9881 13.9583 13.3333 13.9583C13.6784 13.9583 13.9583 13.6785 13.9583 13.3333V10.8333C13.9583 10.2256 13.7168 9.64266 13.287 9.21289C12.8573 8.78312 12.2744 8.54168 11.6666 8.54168C11.2659 8.54168 10.876 8.64663 10.5337 8.8413Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Followers Section */}
        <div className="p-4">
          <h2 className="flex items-center justify-between text-[15px] font-semibold mb-4 text-[#464646]">
            Followers
            <div className="inline-flex items-center bg-[#f6f8fa] px-3 py-1 rounded-full text-sm text-[#1F2328] font-medium">
              111
            </div>
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            <img
              src="https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg"
              alt="Follower"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <img
              src="https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
              alt="Follower"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <img
              src="https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg"
              alt="Follower"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <img
              src="https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
              alt="Follower"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <img
              src="https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg"
              alt="Follower"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <img
              src="https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
              alt="Follower"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <img
              src="https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg"
              alt="Follower"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <img
              src="https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
              alt="Follower"
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
          </div>
          <button className="w-full text-sm text-[#016853] font-medium hover:text-[#015745] transition-colors">
            View all followers
          </button>
        </div>

        {/* About Section */}
        <div className="p-4">
          <h2 className="flex items-center justify-between text-[15px] font-semibold mb-4 text-[#464646]">
            About
          </h2>
          <div className="text-sm text-[#6F767E] leading-relaxed">
            <p className={isExpanded ? "" : "line-clamp-6"}>
              {initialAboutText}
              {isExpanded && additionalAboutText}
            </p>
            <button
              onClick={handleShowMore}
              className="mt-2 text-sm text-[#016853] font-medium hover:text-[#015745] transition-colors"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
