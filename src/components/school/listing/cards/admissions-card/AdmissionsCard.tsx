import React, { useState } from "react";
import AdmissionsModal from "./AdmissionsModal";

const Admissions: React.FC<{ id: string }> = ({ id }) => {
  const [expanded, setExpanded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const additionalSchools = [
    { name: "Columbia University", grade: "A+" },
    { name: "Massachusetts Institute of Technology", grade: "A+" },
    { name: "University of Chicago", grade: "A+" },
  ];

  return (
    <div id={id} className="w-full max-w-[875px] mx-auto my-cardMargin">
      <div className="bg-white rounded-cardBorderRadius shadow-cardShadow p-5 md:p-8">
        <h2 className="text-[#016853] text-[20px] md:text-[24px] font-semibold mb-6 md:mb-8 tracking-[-0.2px]">
          Admissions
        </h2>

        <div className="flex flex-col md:flex-row md:justify-between mb-6 md:mb-8 gap-0 md:gap-10">
          <div className="flex-1 mb-6 md:mb-0">
            <div className="flex items-center text-[#4A4A4A] text-[14px] md:text-[16px] mb-2 md:mb-3 tracking-[0.2px] font-normal relative">
              Application Deadline
              <svg
                className="w-4 md:w-[18px] h-4 md:h-[18px] ml-2 fill-[#5F5F5F] cursor-help"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 18.4C11.1 18.4 10.5 17.7 10.5 16.9C10.5 16.3 11 15.5 12 15.5C13 15.5 13.4 16.1 13.4 16.9C13.4 17.5 12.9 18.4 12 18.4ZM12.9 13.1C12.9 13.8 12.4 14.2 11.8 14.2C11.2 14.2 10.8 13.8 10.8 13.2C10.8 10.7 14 9.9 14.2 8.8C14.3 8.1 13.8 7.4 12.4 7.4C10.5 7.4 10.5 8.9 9.6 9.1C9.2 9.2 8.9 9.1 8.6 8.8C8.4 8.7 8.3 8.4 8.4 8C8.6 7.2 9.9 5.6 12.2 5.6C15.5 5.6 16.3 7.5 16.3 8.5C16.3 11.1 12.9 11.6 12.9 13.1Z" />
              </svg>
              <div className="absolute bottom-full left-6 bg-[#1B1B1B] text-white p-2 md:p-3 rounded text-[12px] md:text-[13px] w-[250px] md:w-[280px] text-center hidden peer-hover:block mb-2 z-[100] after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-[6px] after:border-6 after:border-[#1B1B1B_transparent_transparent_transparent]">
                Deadline for application submissions. Please contact the school
                for more details.
              </div>
            </div>
            <div className="text-[#464646] text-[32px] md:text-[36px] font-medium tracking-[-0.4px] mb-4 md:mb-8">
              January 2
            </div>
          </div>

          <div className="flex-1 mb-6 md:mb-0">
            <div className="text-[#4A4A4A] text-[14px] md:text-[16px] mb-2 md:mb-3 tracking-[0.2px] font-normal">
              Acceptance Rate
            </div>
            <div className="text-[#464646] text-[32px] md:text-[36px] font-medium tracking-[-0.4px] mb-4 md:mb-8">
              5%
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-5 mb-6 md:mb-10">
          {[
            { label: "SAT Range", value: "1500-1580" },
            { label: "ACT Range", value: "33-35" },
            { label: "Application Fee", value: "$80" },
            { label: "SAT/ACT", value: "Required" },
            {
              label: "High School GPA",
              value: "Considered but not required",
            },
            { label: "Early Decision/Early Action", value: "Yes" },
            { label: "Accepts Common App", value: "Yes" },
            {
              label: "Application Website",
              value: (
                <a
                  href="https://admissions.yale.edu/first-year-application"
                  className="text-[#346DC2] no-underline hover:underline text-[14px] md:text-[14.5px] font-[450]"
                >
                  admissions.yale.edu/first-y...
                </a>
              ),
            },
            {
              label: "Admissions Website",
              value: (
                <a
                  href="https://admissions.yale.edu"
                  className="text-[#346DC2] no-underline hover:underline text-[14px] md:text-[14.5px] font-[450]"
                >
                  admissions.yale.edu
                </a>
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-3 border-b border-[#E1E7EE]"
            >
              <span className="text-[#4A4A4A] text-[14px] md:text-[14.5px] tracking-[0.1px]">
                {item.label}
              </span>
              <span className="text-[#464646] text-[14px] md:text-[14.5px] font-medium tracking-[0.1px] text-right">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 w-full">
          <div className="text-[#4A4A4A] text-[15px] md:text-[16px] mb-4 md:mb-5 font-medium tracking-[0.2px]">
            Students also applied to ...
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4">
            {[
              { name: "Harvard University", grade: "A+" },
              { name: "Princeton University", grade: "A+" },
              { name: "Stanford University", grade: "A+" },
              ...(expanded ? additionalSchools : []),
            ].map((school, index) => (
              <div key={index} className="flex items-center py-2">
                <div className="bg-[#00DF8B] text-white w-6 md:w-[26px] h-6 md:h-[26px] rounded-full flex items-center justify-center text-[12px] font-semibold mr-3 flex-shrink-0">
                  {school.grade}
                </div>
                <a
                  href="#"
                  className="text-[#346DC2] no-underline hover:underline text-[14px] md:text-[15px] font-[450] leading-[1.4]"
                >
                  {school.name}
                </a>
              </div>
            ))}
          </div>
          <a
            href="#"
            className="text-[#346DC2] text-[14px] no-underline hover:underline flex items-center mt-4 font-medium"
            onClick={(e) => {
              e.preventDefault();
              setExpanded(!expanded);
            }}
          >
            {expanded ? "Less" : "More"}
            {!expanded && (
              <svg
                className="w-[18px] h-[18px] ml-1 fill-[#346DC2]"
                viewBox="0 0 24 24"
              >
                <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
              </svg>
            )}
          </a>
        </div>

        <a
          href="#"
          className="flex items-center text-[#346DC2] no-underline hover:underline text-[14px] md:text-[14.5px] mt-5 md:mt-6 pt-5 md:pt-6 border-t border-[#E1E7EE] font-medium tracking-[0.2px] justify-center md:justify-end"
          onClick={(e) => {
            e.preventDefault();
            setIsPopupOpen(true);
          }}
        >
          Read More About Admissions
          <svg className="w-5 h-5 ml-2 fill-[#346DC2]" viewBox="0 0 24 24">
            <path
              d="M10.5 5.5L16 11H4v2h12l-5.5 5.5L12 20l8-8-8-8z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </a>
      </div>

      <AdmissionsModal
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default Admissions;
