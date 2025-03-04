// components/MajorsModal.tsx
"use client";

import { useState } from "react";

const MajorsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Arts");

  const categories = [
    "Arts",
    "Business",
    "Humanities",
    "Science, Technology, and Math",
    "Trades and Personal Services",
  ];

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      document.body.style.overflow = "";
    }
  };

  const openModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <a
        href="#"
        onClick={openModal}
        className="flex items-center gap-[6px] text-[#346DC2] text-sm font-medium no-underline hover:text-[#1D77BD]"
      >
        See All Majors
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M4.5 2.5L8 6L4.5 9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>

      <div
        className={`fixed inset-0 bg-black/50 z-[1000] justify-center items-center ${
          isOpen ? "flex" : "hidden"
        }`}
        onClick={handleOverlayClick}
      >
        <div
          className={`bg-white w-[90%] max-w-[1200px] max-h-[90vh] rounded-2xl overflow-hidden flex flex-col ${
            isOpen ? "animate-fadeIn" : ""
          }`}
        >
          <div className="h-[11px] bg-gradient-to-r from-[#016853] to-[#089E68] mb-[-1px]" />

          <div className="p-6 md:p-8 border-b border-black/8 bg-white relative">
            <h1 className="text-[#016853] text-[28px] font-bold m-0 mb-2">
              University of Florida Majors
            </h1>
            <p className="text-[#5F5F5F] text-base leading-6 m-0">
              Discover the majors and programs offered by University of Florida
              and the types of degrees awarded.
            </p>
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 bg-transparent border-none text-[#5F5F5F] cursor-pointer p-2 rounded-full flex items-center justify-center hover:bg-black/5 hover:text-[#464646] transition-all duration-200"
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

          <div className="p-8 overflow-y-auto flex-grow">
            <nav className="flex gap-3 m-[-8px] mb-8 p-2 flex-wrap top-0 bg-white z-10">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 border border-[#016853] rounded-[20px] text-[#016853] text-sm font-medium bg-white cursor-pointer transition-all duration-200 hover:bg-[#016853] hover:text-white ${
                    activeCategory === category ? "bg-[#016853] text-white" : ""
                  }`}
                >
                  {category}
                </button>
              ))}
            </nav>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 pb-12 border-b border-black/8">
              <div className="pr-0 md:pr-6">
                <h2 className="text-[#464646] text-xl font-semibold mb-6">
                  Top Ranked Majors
                </h2>
                <a
                  href="#"
                  className="flex items-start gap-4 p-6 bg-[#F8F9FA] rounded-xl mb-4 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md"
                >
                  <svg
                    className="w-10 h-10 p-2 bg-[#016853]/5 rounded-lg text-[#016853]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                  </svg>
                  <div className="flex-grow">
                    <h3 className="text-[#346DC2] text-base font-semibold m-0 mb-2 hover:text-[#1D77BD]">
                      Best Colleges for Education in America
                    </h3>
                    <p className="text-[#464646] text-sm m-0 font-medium">
                      <strong className="font-bold">#2</strong> of 957
                    </p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-start gap-4 p-6 bg-[#F8F9FA] rounded-xl mb-4 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-md"
                >
                  <svg
                    className="w-10 h-10 p-2 bg-[#016853]/5 rounded-lg text-[#016853]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z" />
                  </svg>
                  <div className="flex-grow">
                    <h3 className="text-[#346DC2] text-base font-semibold m-0 mb-2 hover:text-[#1D77BD]">
                      Best Colleges for Kinesiology and Physical Therapy in
                      America
                    </h3>
                    <p className="text-[#464646] text-sm m-0 font-medium">
                      <strong className="font-bold">#2</strong> of 584
                    </p>
                  </div>
                </a>
              </div>

              <div>
                <h2 className="text-[#464646] text-xl font-semibold mb-6">
                  Most Popular Majors
                </h2>
                <div className="flex justify-between py-4 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Psychology
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    599 Graduates
                  </span>
                </div>
                <div className="flex justify-between py-4 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Biology
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    595 Graduates
                  </span>
                </div>
                <div className="flex justify-between py-4 border-b border-black/8">
                  <span className="text-[#4A4A4A] text-[15px] font-medium">
                    Business
                  </span>
                  <span className="text-[#089E68] text-[15px] font-semibold">
                    452 Graduates
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-16">
              <h2 className="text-[#016853] text-2xl font-semibold mb-8 pb-4 border-b border-black/8">
                All Majors
              </h2>

              <div className="mb-12 p-8 bg-[#FAFAFA] rounded-xl">
                <h3 className="text-[#016853] text-xl font-semibold mb-6">
                  Arts
                </h3>
                <table className="w-full border-separate border-spacing-0 mb-12">
                  <tbody>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Dance
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Certificate
                      </td>
                      <td className="p-4 border-b border-black/8">
                        5 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        25 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Drama and Theatre Production
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Certificate
                      </td>
                      <td className="p-4 border-b border-black/8">
                        1 Graduate
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        66 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-12 p-8 bg-[#FAFAFA] rounded-xl">
                <h3 className="text-[#016853] text-xl font-semibold mb-6">
                  Business
                </h3>
                <table className="w-full border-separate border-spacing-0 mb-12">
                  <tbody>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Accounting
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        140 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Business
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        452 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        Offered Online
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Marketing
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        218 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mb-12 p-8 bg-[#FAFAFA] rounded-xl">
                <h3 className="text-[#016853] text-xl font-semibold mb-6">
                  Education
                </h3>
                <table className="w-full border-separate border-spacing-0 mb-12">
                  <tbody>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Agricultural Teacher Education
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        63 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Art Teacher Education
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Certificate
                      </td>
                      <td className="p-4 border-b border-black/8">
                        3 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        1 Graduate
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Education
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        56 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        Offered Online
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Educational Administration
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Certificate
                      </td>
                      <td className="p-4 border-b border-black/8">
                        0 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={3}
                        className="text-[#464646] text-lg font-semibold p-4 bg-white m-6 -mx-4 mb-0"
                      >
                        Elementary Education
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-black/8 text-[#4A4A4A] font-medium">
                        Bachelors
                      </td>
                      <td className="p-4 border-b border-black/8">
                        70 Graduates
                      </td>
                      <td className="p-4 border-b border-black/8 text-[#5F5F5F] text-sm">
                        No Online
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MajorsModal;
