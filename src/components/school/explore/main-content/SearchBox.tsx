import React from "react";

interface SearchBoxProps {
  isSearchActive: boolean;
  setIsSearchActive: (value: boolean) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  isSearchActive,
  setIsSearchActive,
}) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        isSearchActive ? "block" : "hidden"
      }`}
    >
      <button
        className="p-2 text-[#5F5F5F]"
        onClick={() => setIsSearchActive(false)}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div className="flex items-center bg-white border border-[rgba(0,0,0,0.1)] rounded h-10 w-[350px]">
        <div className="text-sm font-semibold text-[#4A4A4A] px-3 whitespace-nowrap">
          Where
        </div>
        <div className="flex-1 flex items-center p-0 px-3 h-full relative">
          <input
            type="text"
            className="border-none outline-none p-0 text-sm w-full h-full bg-transparent"
            placeholder="Enter a city, state or country"
          />
          <button className="w-5 h-5 flex items-center justify-center text-[#5F5F5F] opacity-70 hover:opacity-100 hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6.34314 4.22183C5.75736 3.63604 4.80761 3.63604 4.22182 4.22183C3.63604 4.80761 3.63604 5.75736 4.22182 6.34315L9.87868 12L4.22182 17.6569C3.63604 18.2426 3.63604 19.1924 4.22182 19.7782C4.80761 20.364 5.75736 20.364 6.34314 19.7782L12 14.1213L17.6569 19.7782C18.2426 20.364 19.1924 20.364 19.7782 19.7782C20.364 19.1924 20.364 18.2426 19.7782 17.6569L14.1213 12L19.7782 6.34315C20.364 5.75736 20.364 4.80761 19.7782 4.22183C19.1924 3.63604 18.2426 3.63604 17.6569 4.22183L12 9.87868L6.34314 4.22183Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className="w-[1px] h-5 bg-[rgba(0,0,0,0.1)] mx-2 hidden"></div>
          <button className="w-6 h-6 flex items-center justify-center text-[#0093B0] opacity-80 hover:opacity-100">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7 c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path>
              <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3 c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8 C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1 c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1 C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
            </svg>
          </button>
          <button className="w-7 h-7 rounded-full bg-[#0093B0] flex items-center justify-center ml-2">
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="14"
              height="14"
            >
              <path d="M21.7,20.3l-3.3-2.9c1.5-1.7,2.3-3.8,2.3-6.1c0-5.1-4.2-9.3-9.3-9.3S2,6.2,2,11.3s4.2,9.3,9.3,9.3c2.1,0,4-0.7,5.7-1.9 l3.4,3c0.2,0.2,0.4,0.2,0.6,0.2c0.3,0,0.5-0.1,0.7-0.3C22.1,21.3,22.1,20.7,21.7,20.3z M11.3,18.7c-4.1,0-7.4-3.3-7.4-7.4 s3.3-7.4,7.4-7.4s7.4,3.3,7.4,7.4S15.4,18.7,11.3,18.7z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
