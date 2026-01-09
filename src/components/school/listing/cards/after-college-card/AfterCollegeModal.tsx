import React from "react";

interface AfterCollegeModalProps {
  onClose: () => void;
}

const AfterCollegeModal: React.FC<AfterCollegeModalProps> = ({ onClose }) => {
  return (
    <div
      className="w-full relative"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header - Sticky */}
      <div className="sticky top-0 flex justify-between items-center bg-white px-6 py-5 md:px-8 md:py-5 z-50 border-b border-gray-100">
        <h1 className="text-[#016853] text-xl md:text-2xl font-semibold tracking-[-0.02em]">
          Overall Value
        </h1>
        <button
          className="bg-transparent border-none cursor-pointer text-[#565656] p-1 w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">

        {/* Overall Value Section */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <div className="flex gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-2xl md:text-[32px] font-bold flex-shrink-0">
              A
            </div>
            <div className="text-[#4A4A4A] text-sm md:text-[15px] leading-[1.5] pt-1 md:pt-2">
              Based on average net price, earnings potential, student and alumni
              reviews, and additional factors.
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 h-6">
                <div className="relative h-6 w-6 flex items-center before:content-[''] before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8] before:clip-[rect(0,16px,20px,-20px)] before:h-5 before:left-4 before:absolute before:top-1 before:w-[6px]"></div>
                <div className="text-[#1D77BD] text-xs md:text-[13px] font-semibold uppercase tracking-[0.05em] pt-[5px]">
                  POLL
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-conic-gradient from-[#77d3fa] to-[#e8f4fc] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:w-8 md:before:w-10 before:h-8 md:before:h-10 before:bg-white before:rounded-full flex-shrink-0"></div>
                <div className="text-[#1B1B1B] text-3xl md:text-5xl font-bold leading-none">
                  82%
                </div>
              </div>
              <div className="text-[#4A4A4A] text-sm leading-[1.4]">
                of students feel like they are getting their money`s worth out
                of their program.
              </div>
              <div className="text-[#5F5F5F] text-xs md:text-[13px] mt-2">
                218 responses
              </div>
            </div>
            <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
              <div className="text-[#4A4A4A] text-sm font-semibold mb-2">
                Graduation Rate
              </div>
              <div className="text-[#1B1B1B] text-3xl md:text-5xl font-bold">
                90%
              </div>
              <div className="text-[#5F5F5F] text-xs md:text-[13px] mt-1">
                National 49%
              </div>
            </div>
          </div>
        </div>

        {/* Earnings Section */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h2 className="text-[#016853] text-xl md:text-2xl font-semibold mb-4 md:mb-6 tracking-[-0.02em]">
            Earnings
          </h2>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
              <div className="text-[#4A4A4A] text-sm md:text-[15px] font-medium mb-3 md:mb-4">
                Median Earnings 2 Years After Graduation
              </div>
              <div className="flex items-baseline gap-1 text-[#1B1B1B] text-2xl md:text-[36px] font-bold mb-2">
                $42,600
                <span className="text-[#5F5F5F] text-sm font-medium">
                  per year
                </span>
              </div>
              <div className="text-[#5F5F5F] text-xs md:text-[13px]">
                National $26,513
              </div>
            </div>
            <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
              <div className="text-[#4A4A4A] text-sm md:text-[15px] font-medium mb-3 md:mb-4">
                Median Earnings 6 Years After Graduation
              </div>
              <div className="flex items-baseline gap-1 text-[#1B1B1B] text-2xl md:text-[36px] font-bold mb-2">
                $56,000
                <span className="text-[#5F5F5F] text-sm font-medium">
                  per year
                </span>
              </div>
              <div className="text-[#5F5F5F] text-xs md:text-[13px]">
                National $33,028
              </div>
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="flex flex-col gap-3">
              <div className="text-[#4A4A4A] text-sm md:text-[15px] font-semibold mb-2 flex items-center gap-2">
                2 Years After Graduation
                <span className="text-[#565656]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.61C7.25 20.61 3.39 16.75 3.39 12C3.39 7.25 7.25 3.39 12 3.39C16.75 3.39 20.61 7.25 20.61 12C20.61 16.75 16.75 20.61 12 20.61Z" />
                    <path d="M11.65 14.61C10.99 14.61 10.6 15.12 10.6 15.61C10.6 16.1 10.97 16.67 11.65 16.67C12.33 16.67 12.66 16.13 12.66 15.61C12.66 15.12 12.31 14.61 11.65 14.61Z" />
                    <path d="M11.97 7.32C9.92 7.32 8.74 8.74 8.72 9.21C8.72 9.48 8.82 9.65 8.91 9.74C9.05 9.88 9.25 9.96 9.49 9.96C9.77 9.96 9.98 9.76 10.19 9.54C10.52 9.2 10.98 8.75 11.99 8.75C12.7 8.75 13.75 9.1 13.75 9.85C13.75 10.29 13.04 10.72 12.27 11.12C10.98 11.79 10.84 12.69 10.84 13.04C10.84 13.49 11.2 13.9 11.6 13.9C11.97 13.9 12.37 13.6 12.37 13.14C12.37 12.97 12.69 12.49 13.42 12.15C13.93 11.91 15.28 11.28 15.28 9.8C15.28 8.94 14.59 7.32 11.96 7.32H11.97Z" />
                  </svg>
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                <span>25% Earn Less Than</span>
                <span>$26,800 per year</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span>25% Earn More Than</span>
                <span>$62,000 per year</span>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-[#4A4A4A] text-sm md:text-[15px] font-semibold mb-2 flex items-center gap-2">
                6 Years After Graduation
                <span className="text-[#565656]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.61C7.25 20.61 3.39 16.75 3.39 12C3.39 7.25 7.25 3.39 12 3.39C16.75 3.39 20.61 7.25 20.61 12C20.61 16.75 16.75 20.61 12 20.61Z" />
                    <path d="M11.65 14.61C10.99 14.61 10.6 15.12 10.6 15.61C10.6 16.1 10.97 16.67 11.65 16.67C12.33 16.67 12.66 16.13 12.66 15.61C12.66 15.12 12.31 14.61 11.65 14.61Z" />
                    <path d="M11.97 7.32C9.92 7.32 8.74 8.74 8.72 9.21C8.72 9.48 8.82 9.65 8.91 9.74C9.05 9.88 9.25 9.96 9.49 9.96C9.77 9.96 9.98 9.76 10.19 9.54C10.52 9.2 10.98 8.75 11.99 8.75C12.7 8.75 13.75 9.1 13.75 9.85C13.75 10.29 13.04 10.72 12.27 11.12C10.98 11.79 10.84 12.69 10.84 13.04C10.84 13.49 11.2 13.9 11.6 13.9C11.97 13.9 12.37 13.6 12.37 13.14C12.37 12.97 12.69 12.49 13.42 12.15C13.93 11.91 15.28 11.28 15.28 9.8C15.28 8.94 14.59 7.32 11.96 7.32H11.97Z" />
                  </svg>
                </span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-gray-100">
                <span>25% Earn Less Than</span>
                <span>$36,600 per year</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span>25% Earn More Than</span>
                <span>$84,100 per year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Placement Section */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h2 className="text-[#016853] text-xl md:text-2xl font-semibold mb-4 md:mb-6 tracking-[-0.02em]">
            Job Placement
          </h2>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8">
            <div className="flex flex-col gap-4">
              <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
                <div className="text-[#1B1B1B] text-2xl md:text-[36px] font-bold mb-2">
                  92%
                </div>
                <div className="text-[#4A4A4A] text-sm leading-[1.4]">
                  Employed 2 Years After Graduation
                </div>
                <div className="text-[#5F5F5F] text-xs md:text-[13px] mt-1">
                  National 83%
                </div>
              </div>
              <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
                <div className="text-[#1B1B1B] text-2xl md:text-[36px] font-bold mb-2">
                  91%
                </div>
                <div className="text-[#4A4A4A] text-sm leading-[1.4]">
                  Employed 6 Years After Graduation
                </div>
              </div>
            </div>
            <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4 h-6">
                <div className="relative h-6 w-6 flex items-center before:content-[''] before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8] before:clip-[rect(0,16px,20px,-20px)] before:h-5 before:left-4 before:absolute before:top-1 before:w-[6px]"></div>
                <div className="text-[#1D77BD] text-xs md:text-[13px] font-semibold uppercase tracking-[0.05em] pt-[5px]">
                  POLLS
                </div>
              </div>
              <div className="text-[#1B1B1B] text-xl md:text-[24px] font-bold mb-2">
                97%
              </div>
              <div className="text-[#4A4A4A] text-sm leading-[1.4]">
                of students agree that the alumni network is very strong.
              </div>
              <div className="text-[#5F5F5F] text-xs md:text-[13px] mt-2">
                264 responses
              </div>
              <div className="mt-4 md:mt-6">
                <div className="text-[#1B1B1B] text-xl md:text-[24px] font-bold mb-2">
                  90%
                </div>
                <div className="text-[#4A4A4A] text-sm leading-[1.4]">
                  of students feel the career center was helpful in finding them
                  a job or internship.
                </div>
                <div className="text-[#5F5F5F] text-xs md:text-[13px] mt-2">
                  260 responses
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Student Debt Section */}
        <div className="mb-8 pb-6 border-b border-gray-100">
          <h2 className="text-[#016853] text-xl md:text-2xl font-semibold mb-4 md:mb-6 tracking-[-0.02em]">
            Student Debt
          </h2>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
            <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
              <div className="text-[#4A4A4A] text-sm md:text-[15px] font-medium mb-3 md:mb-4">
                Average Loan Amount
              </div>
              <div className="flex items-baseline gap-1 text-[#1B1B1B] text-2xl md:text-[36px] font-bold mb-2">
                $6,122
                <span className="text-[#5F5F5F] text-sm font-medium">
                  per year
                </span>
              </div>
              <div className="text-[#5F5F5F] text-xs md:text-[13px]">
                National $6,768
              </div>
            </div>
            <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
              <div className="text-[#4A4A4A] text-sm md:text-[15px] font-medium mb-3 md:mb-4">
                Loan Default Rate
              </div>
              <div className="text-[#1B1B1B] text-2xl md:text-[36px] font-bold mb-2">
                0%
              </div>
              <div className="text-[#5F5F5F] text-xs md:text-[13px]">
                National 11%
              </div>
            </div>
          </div>
          <div className="bg-[#F8FCFF] p-4 md:p-6 rounded-xl">
            <h3 className="text-[#1B1B1B] text-base mb-3 md:mb-4">
              Student Loan Options from Lenders
            </h3>
            <ul className="list-none mt-3 md:mt-4">
              <li className="mb-2 md:mb-3 pl-4 md:pl-6 relative text-[#4A4A4A] text-sm leading-[1.5] before:content-['•'] before:absolute before:left-1 md:before:left-2 before:text-[#016853]">
                Apply in as little as 3 minutes and get an instant credit
                decision
              </li>
              <li className="mb-2 md:mb-3 pl-4 md:pl-6 relative text-[#4A4A4A] text-sm leading-[1.5] before:content-['•'] before:absolute before:left-1 md:before:left-2 before:text-[#016853]">
                Choose from a variety of loan terms and competitive variable and
                fixed rate options
              </li>
              <li className="mb-2 md:mb-3 pl-4 md:pl-6 relative text-[#4A4A4A] text-sm leading-[1.5] before:content-['•'] before:absolute before:left-1 md:before:left-2 before:text-[#016853]">
                Multiple repayment options from deferred to immediate principal
                and interest
              </li>
              <li className="mb-2 md:mb-3 pl-4 md:pl-6 relative text-[#4A4A4A] text-sm leading-[1.5] before:content-['•'] before:absolute before:left-1 md:before:left-2 before:text-[#016853]">
                Students with little or no credit history will benefit from
                having a creditworthy co-signer
              </li>
            </ul>
            <a
              href="#"
              className="inline-block bg-[#1D77BD] text-white py-2 px-4 rounded-md text-sm font-medium mt-3 md:mt-4"
            >
              Learn More
            </a>
            <p className="text-[#5F5F5F] text-xs mt-3 md:mt-4 leading-[1.5]">
              Niche may be compensated by the third party lenders and others who
              place ads on the website. Niche is not a lender and does not
              endorse the products of these advertisers. Fees that Niche
              receives for ads do not affect the terms you may be offered by the
              lender you choose. There are many additional borrowing options
              available.
            </p>
          </div>
        </div>

        {/* Similar Colleges Section */}
        <div className="mb-0 pb-0">
          <h2 className="text-[#016853] text-xl md:text-2xl font-semibold mb-4 md:mb-6 tracking-[-0.02em]">
            Explore Life After Graduation at Similar Colleges
          </h2>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex p-3 md:p-4 border border-gray-100 rounded-lg transition-all hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:border-gray-200"
                >
                  <img
                    src="https://i.ibb.co/J8QjpbD/school1.webp"
                    alt="Evergreen Academy"
                    className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-md mr-3 md:mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="text-[#464646] text-sm md:text-[15px] font-semibold mb-1 md:mb-2">
                      Evergreen Academy
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap text-[#5F5F5F] text-xs md:text-[13px]">
                      <span className="bg-[#00DF8B] text-white w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center font-semibold text-xs md:text-[13px] flex-shrink-0">
                        A+
                      </span>
                      <div className="flex items-center gap-1">4 yr</div>
                      <div className="flex items-center gap-1">
                        <svg
                          className="w-3 md:w-[14px] h-3 md:h-[14px] text-[#565656]"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
                          />
                          <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                        </svg>
                        Boston, MA
                      </div>
                      <div className="flex items-center gap-1 text-[#565656] font-medium">
                        <svg viewBox="0 0 24 24" width="12" height="12">
                          <path
                            fill="currentColor"
                            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          />
                        </svg>
                        4.9
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <a
            href="#"
            className="text-[#346DC2] text-sm font-medium block mt-3 md:mt-4 text-center"
          >
            + More
          </a>
        </div>
      </div>
    </div>
  );
};

export default AfterCollegeModal;
