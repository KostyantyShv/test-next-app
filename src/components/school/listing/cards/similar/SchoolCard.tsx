import Image from "next/image";
import React from "react";

interface SchoolCardProps {
  imageSrc: string;
  alt: string;
  name: string;
  location: string;
  reviews: number;
}

const SchoolCard: React.FC<SchoolCardProps> = ({
  imageSrc,
  alt,
  name,
  location,
  reviews,
}) => {
  return (
    <div className="flex p-4 border border-gray-200 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300">
      <Image
        height={60}
        width={60}
        src={imageSrc}
        alt={alt}
        className="w-[60px] h-[60px] object-cover rounded-md mr-4 flex-shrink-0"
      />
      <div className="flex-1">
        <h3 className="text-base font-semibold text-[#464646] mb-2 leading-tight">
          {name}
        </h3>
        <div className="flex flex-wrap gap-3 items-center mb-3">
          <span className="bg-[#00DF8B] text-white w-7 h-7 rounded-full flex items-center justify-center font-semibold text-[13px]">
            A+
          </span>
          <div className="flex items-center gap-1.5 text-[#5F5F5F] text-[13px]">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-4 h-4 text-[#565656]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z"
                fill="currentColor"
              ></path>
            </svg>
            4 yr
          </div>
          <div className="flex items-center gap-1.5 text-[#5F5F5F] text-[13px]">
            <svg
              className="w-4 h-4 text-[#565656]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill="currentColor"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
              />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" />
            </svg>
            {location}
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#5F5F5F] text-[13px]">
          <div className="flex gap-0.5">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <svg
                  key={i}
                  className="w-[14px] h-[14px] text-[#00DF8B]"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  />
                </svg>
              ))}
          </div>
          <span>{reviews} reviews</span>
        </div>
      </div>
    </div>
  );
};

export default SchoolCard;
