import Link from "next/link";
import React from "react";

const AdmissionsCard = ({ id }: { id: string }) => {
  return (
    <div
      id={id}
      className="my-cardMargin p-cardPadding box-border shadow-cardShadow rounded-cardBorderRadius bg-cardBackground w-full flex justify-center font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]"
    >
      <div className="w-full">
        <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-tight">
          Admissions
        </h2>

        <div className="flex justify-between mb-8 gap-10">
          <div className="flex-1">
            <div className="flex items-center text-[#4A4A4A] text-base mb-3 tracking-wider font-normal relative">
              Application Deadline
              <svg
                className="w-[18px] h-[18px] ml-2 fill-[#5F5F5F] cursor-help"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 18.4C11.1 18.4 10.5 17.7 10.5 16.9C10.5 16.3 11 15.5 12 15.5C13 15.5 13.4 16.1 13.4 16.9C13.4 17.5 12.9 18.4 12 18.4ZM12.9 13.1C12.9 13.8 12.4 14.2 11.8 14.2C11.2 14.2 10.8 13.8 10.8 13.2C10.8 10.7 14 9.9 14.2 8.8C14.3 8.1 13.8 7.4 12.4 7.4C10.5 7.4 10.5 8.9 9.6 9.1C9.2 9.2 8.9 9.1 8.6 8.8C8.4 8.7 8.3 8.4 8.4 8C8.6 7.2 9.9 5.6 12.2 5.6C15.5 5.6 16.3 7.5 16.3 8.5C16.3 11.1 12.9 11.6 12.9 13.1Z"></path>
              </svg>
              <div className="absolute bottom-full left-6 bg-[#1B1B1B] text-white py-2 px-3 rounded text-sm leading-tight w-[280px] text-center hidden mb-2 z-10 group-hover:block peer-hover:block after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-[6px] after:border-[6px] after:border-solid after:border-[#1B1B1B_transparent_transparent_transparent]">
                Deadline for application submissions. Please contact the school
                for more details.
              </div>
            </div>
            <div className="text-[#464646] text-[36px] font-medium tracking-tighter mb-8">
              January 2
            </div>
          </div>

          <div className="flex-1">
            <div className="text-[#4A4A4A] text-base mb-3 tracking-wider font-normal">
              Acceptance Rate
            </div>
            <div className="text-[#464646] text-[36px] font-medium tracking-tighter mb-8">
              5%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-10">
          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              SAT Range
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              1500-1580
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              ACT Range
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              33-35
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              Application Fee
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              $80
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              SAT/ACT
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              Required
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              High School GPA
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              Considered but not required
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              Early Decision/Early Action
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              Yes
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              Accepts Common App
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              Yes
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              Application Website
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              <Link
                href="https://admissions.yale.edu/first-year-application"
                className="text-[#346DC2] no-underline text-[14.5px] font-normal hover:underline"
              >
                admissions.yale.edu/first-y...
              </Link>
            </span>
          </div>

          <div className="flex justify-between py-3 border-b border-[#E1E7EE]">
            <span className="text-[#4A4A4A] text-[14.5px] tracking-[0.1px]">
              Admissions Website
            </span>
            <span className="text-[#464646] text-[14.5px] font-medium text-right tracking-[0.1px]">
              <Link
                href="https://admissions.yale.edu"
                className="text-[#346DC2] no-underline text-[14.5px] font-normal hover:underline"
              >
                admissions.yale.edu
              </Link>
            </span>
          </div>
        </div>

        <div className="mt-6 w-full">
          <div className="text-[#4A4A4A] text-base mb-5 font-medium tracking-wider">
            Students also applied to ...
          </div>
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="flex items-center py-2">
              <div className="bg-[#00DF8B] text-white w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0">
                A+
              </div>
              <Link
                href="#"
                className="text-[#346DC2] no-underline text-[15px] tracking-[0.1px] font-normal leading-tight hover:underline"
              >
                Harvard University
              </Link>
            </div>
            <div className="flex items-center py-2">
              <div className="bg-[#00DF8B] text-white w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0">
                A+
              </div>
              <Link
                href="#"
                className="text-[#346DC2] no-underline text-[15px] tracking-[0.1px] font-normal leading-tight hover:underline"
              >
                Princeton University
              </Link>
            </div>
            <div className="flex items-center py-2">
              <div className="bg-[#00DF8B] text-white w-[26px] h-[26px] rounded-full flex items-center justify-center text-xs font-semibold mr-3 flex-shrink-0">
                A+
              </div>
              <Link
                href="#"
                className="text-[#346DC2] no-underline text-[15px] tracking-[0.1px] font-normal leading-tight hover:underline"
              >
                Stanford University
              </Link>
            </div>
          </div>
          <Link
            href="#"
            className="text-[#346DC2] text-sm no-underline flex items-center mt-4 font-medium hover:underline"
          >
            More
            <svg
              className="w-[18px] h-[18px] ml-1 fill-[#346DC2]"
              viewBox="0 0 24 24"
            >
              <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
            </svg>
          </Link>
        </div>

        <Link
          href="#"
          className="flex items-center text-[#346DC2] no-underline text-[14.5px] mt-6 pt-6 border-t border-[#E1E7EE] font-medium tracking-wider justify-end hover:underline"
        >
          Read More About Admissions
          <svg className="w-5 h-5 ml-2 fill-[#346DC2]" viewBox="0 0 24 24">
            <path
              d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default AdmissionsCard;
