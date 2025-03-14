import React, { useState } from "react";

interface MajorsModalContentProps {
  closeModal: () => void;
}

const MajorsModalContent: React.FC<MajorsModalContentProps> = ({
  closeModal,
}) => {
  const [activeCategory, setActiveCategory] = useState("Arts");

  const categories = [
    "Arts",
    "Business",
    "Humanities",
    "Science, Technology, and Math",
    "Trades and Personal Services",
  ];
  return (
    <div className="flex flex-col h-full font-['Inter'] relative">
      {/* Fixed Header within Modal */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="h-2 bg-gradient-to-r from-[#016853] to-[#089E68] md:h-[11px] md:mb-[-1px]" />
        <div className="relative p-5 md:p-8 md:border-b md:border-black/8">
          <h1 className="text-[#016853] text-[22px] font-bold mb-2 md:text-[28px]">
            University of Florida Majors
          </h1>
          <p className="text-[#5F5F5F] text-sm leading-5 mb-4 md:text-base md:leading-6">
            Discover the majors and programs offered by University of Florida
            and the types of degrees awarded.
          </p>
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 p-2 text-[#5F5F5F] hover:bg-black/5 hover:text-[#464646] transition-all duration-200 rounded-full md:top-6 md:right-6"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 md:p-8">
          {/* Category Navigation */}
          <nav className="flex gap-2.5 pb-3 mb-6 overflow-x-auto md:flex-wrap md:m-[-8px] md:mb-8 md:p-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-2 border border-[#016853] rounded-full text-[13px] font-medium whitespace-nowrap transition-all duration-200 hover:bg-[#016853] hover:text-white ${
                  activeCategory === category
                    ? "bg-[#016853] text-white"
                    : "bg-white text-[#016853]"
                } md:text-sm md:px-4`}
              >
                {category}
              </button>
            ))}
          </nav>
          {/* Top Section */}
          <div className="mb-7 pb-6 border-b border-black/8 md:grid md:grid-cols-2 md:gap-12 md:mb-16 md:pb-12">
            {/* Top Ranked Majors */}
            <div className="mb-6 md:pr-6">
              <h2 className="text-[#464646] text-lg font-semibold mb-4 md:text-xl md:mb-6">
                Top Ranked Majors
              </h2>
              <a
                href="#"
                className="flex items-start gap-3 p-4 bg-[#F8F9FA] rounded-xl mb-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:gap-4 md:p-6 md:mb-4"
              >
                <svg
                  className="w-8 h-8 p-1.5 bg-[#016853]/5 rounded-lg text-[#016853] flex-shrink-0 md:w-10 md:h-10 md:p-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
                <div className="flex-grow">
                  <h3 className="text-[#346DC2] text-sm font-semibold mb-1.5 hover:text-[#1D77BD] md:text-base md:mb-2">
                    Best Colleges for Education in America
                  </h3>
                  <p className="text-[#464646] text-[13px] font-medium m-0 md:text-sm">
                    <strong className="font-bold">#2</strong> of 957
                  </p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-start gap-3 p-4 bg-[#F8F9FA] rounded-xl mb-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md md:gap-4 md:p-6 md:mb-4"
              >
                <svg
                  className="w-8 h-8 p-1.5 bg-[#016853]/5 rounded-lg text-[#016853] flex-shrink-0 md:w-10 md:h-10 md:p-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                </svg>
                <div className="flex-grow">
                  <h3 className="text-[#346DC2] text-sm font-semibold mb-1.5 hover:text-[#1D77BD] md:text-base md:mb-2">
                    Best Colleges for Kinesiology and Physical Therapy in
                    America
                  </h3>
                  <p className="text-[#464646] text-[13px] font-medium m-0 md:text-sm">
                    <strong className="font-bold">#2</strong> of 584
                  </p>
                </div>
              </a>
            </div>

            {/* Popular Majors */}
            <div>
              <h2 className="text-[#464646] text-lg font-semibold mb-4 md:text-xl md:mb-6">
                Most Popular Majors
              </h2>
              <div className="flex justify-between py-3.5 border-b border-black/8 md:py-4">
                <span className="text-[#4A4A4A] text-sm font-medium md:text-[15px]">
                  Psychology
                </span>
                <span className="text-[#089E68] text-sm font-semibold md:text-[15px]">
                  599 Graduates
                </span>
              </div>
              <div className="flex justify-between py-3.5 border-b border-black/8 md:py-4">
                <span className="text-[#4A4A4A] text-sm font-medium md:text-[15px]">
                  Biology
                </span>
                <span className="text-[#089E68] text-sm font-semibold md:text-[15px]">
                  595 Graduates
                </span>
              </div>
              <div className="flex justify-between py-3.5 border-b border-black/8 md:py-4">
                <span className="text-[#4A4A4A] text-sm font-medium md:text-[15px]">
                  Business
                </span>
                <span className="text-[#089E68] text-sm font-semibold md:text-[15px]">
                  452 Graduates
                </span>
              </div>
            </div>
          </div>

          {/* All Majors */}
          <div className="mb-8 md:mb-16">
            <h2 className="text-[#016853] text-xl font-semibold mb-5 pb-3 border-b border-black/8 md:text-2xl md:mb-8 md:pb-4">
              All Majors
            </h2>

            {/* Arts Category */}
            <div className="mb-6 p-5 bg-[#F8F9FA] rounded-xl md:mb-12 md:p-8">
              <h3 className="text-[#016853] text-lg font-semibold mb-4 md:text-xl md:mb-6">
                Arts
              </h3>
              <table className="w-full border-separate border-spacing-0 mb-6 md:mb-12">
                <tbody>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Dance
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Certificate
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      5 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      25 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Drama and Theatre Production
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Certificate
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      1 Graduate
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      66 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Business Category */}
            <div className="mb-6 p-5 bg-[#F8F9FA] rounded-xl md:mb-12 md:p-8">
              <h3 className="text-[#016853] text-lg font-semibold mb-4 md:text-xl md:mb-6">
                Business
              </h3>
              <table className="w-full border-separate border-spacing-0 mb-6 md:mb-12">
                <tbody>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Accounting
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      140 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Business
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      452 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      Offered Online
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Marketing
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      218 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Education Category */}
            <div className="mb-6 p-5 bg-[#F8F9FA] rounded-xl md:mb-12 md:p-8">
              <h3 className="text-[#016853] text-lg font-semibold mb-4 md:text-xl md:mb-6">
                Education
              </h3>
              <table className="w-full border-separate border-spacing-0 mb-6 md:mb-12">
                <tbody>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Agricultural Teacher Education
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      63 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Art Teacher Education
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Certificate
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      3 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      1 Graduate
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Education
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      56 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      Offered Online
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Educational Administration
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Certificate
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      0 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={3}
                      className="text-[#464646] text-base font-semibold p-4 bg-white -mx-4 mb-0 md:text-lg md:m-6"
                    >
                      Elementary Education
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2.5 border-b border-black/5 text-[#4A4A4A] font-medium w-[35%] md:p-4">
                      Bachelors
                    </td>
                    <td className="p-2.5 border-b border-black/5 md:p-4">
                      70 Graduates
                    </td>
                    <td className="p-2.5 border-b border-black/5 text-[#5F5F5F] text-[13px] text-right w-[30%] md:p-4 md:text-sm">
                      No Online
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Placeholder for remaining categories */}
            <div className="mb-6 p-5 bg-[#F8F9FA] rounded-xl md:mb-12 md:p-8">
              <h3 className="text-[#016853] text-lg font-semibold mb-4 md:text-xl md:mb-6">
                Humanities
              </h3>
              {/* Add Humanities majors here */}
            </div>

            <div className="mb-6 p-5 bg-[#F8F9FA] rounded-xl md:mb-12 md:p-8">
              <h3 className="text-[#016853] text-lg font-semibold mb-4 md:text-xl md:mb-6">
                Science, Technology, and Math
              </h3>
              {/* Add STM majors here */}
            </div>

            <div className="mb-6 p-5 bg-[#F8F9FA] rounded-xl md:mb-12 md:p-8">
              <h3 className="text-[#016853] text-lg font-semibold mb-4 md:text-xl md:mb-6">
                Trades and Personal Services
              </h3>
              {/* Add Trades majors here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MajorsModalContent;
