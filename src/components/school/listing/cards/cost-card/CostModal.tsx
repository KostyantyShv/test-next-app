// components/CostModal.tsx
import React from "react";

interface CostModalProps {
  isOpen: boolean;
  handleOverlayClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  closePopup: () => void;
  popupRef: React.RefObject<HTMLDivElement | null>;
  headerRef: React.RefObject<HTMLDivElement | null>;
}

const CostModal: React.FC<CostModalProps> = ({
  isOpen,
  closePopup,
  handleOverlayClick,
  popupRef,
  headerRef,
}) => {
  return (
    <div className="text-[#4A4A4A] font-['Inter'] leading-6">
      {/* Popup Overlay */}
      <div
        className={`fixed inset-0 bg-[rgba(0,0,0,0.45)] transition-opacity duration-200 ${
          isOpen ? "flex opacity-100" : "opacity-0 pointer-events-none hidden"
        } justify-center items-center z-[1000]`}
        onClick={handleOverlayClick}
      >
        <div
          ref={popupRef}
          className="w-[900px] max-h-[85vh] bg-white rounded-2xl relative overflow-y-auto shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] cost-popup"
        >
          {/* Popup Header */}
          <div
            ref={headerRef}
            className="sticky top-0 bg-white p-6 border-b border-[rgba(0,0,0,0.08)] flex justify-between items-center z-[2] popup-header"
          >
            <h2 className="text-[#016853] text-2xl font-semibold tracking-[-0.02em]">
              Yale University Cost Breakdown
            </h2>
            <button
              className="w-9 h-9 rounded-full border-none bg-[#f5f5f5] text-[#5F5F5F] cursor-pointer flex items-center justify-center hover:bg-[#ebebeb] hover:text-[#1B1B1B] transition-all duration-200"
              onClick={closePopup}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Popup Content */}
          <div className="p-8">
            {/* Value Section */}
            <section className="bg-white rounded-xl p-8 mb-6 grid grid-cols-[2fr_1fr] gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    A
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-[#016853] text-base font-semibold mb-1">
                      Value
                    </h3>
                    <p className="text-[#4A4A4A] text-sm leading-6">
                      Based on average net price, earnings potential, student
                      and alumni reviews, and additional factors.
                    </p>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-[#5F5F5F] text-[15px] font-medium mb-2">
                    Net Price
                  </div>
                  <div className="text-[#464646] text-[36px] font-bold mb-1 tracking-[-0.02em]">
                    $11,740
                  </div>
                  <div className="text-[#5F5F5F] text-base">/ year</div>
                  <div className="text-[#5F5F5F] text-sm mt-1">
                    National $15,523
                  </div>
                </div>
                <div className="w-full h-px bg-[rgba(0,0,0,0.08)] my-6"></div>
                <p className="text-[#4A4A4A] text-sm leading-6 max-w-[90%]">
                  Average cost after financial aid for students receiving grant
                  or scholarship aid, as reported by the college.
                </p>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href="#"
                  className="text-[#346DC2] text-[15px] font-medium py-2 flex items-center gap-2 hover:text-[#1D77BD] transition-colors duration-200"
                >
                  Learn More About Student Loans
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-[#346DC2] text-[15px] font-medium py-2 flex items-center gap-2 hover:text-[#1D77BD] transition-colors duration-200"
                >
                  See Scholarships & Financial Aid
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </section>

            {/* Net Price Breakdown Section */}
            <section className="bg-white rounded-xl p-8 mb-6">
              <h3 className="text-[#016853] text-xl font-semibold mb-6">
                Net Price Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-12">
                <div>
                  <table className="w-full border-spacing-0 mb-6">
                    <tbody>
                      <tr>
                        <td className="py-4 text-[#4A4A4A] font-medium text-[15px]">
                          Net Price
                        </td>
                        <td className="py-4 text-right text-[#089E68] font-semibold text-[15px]">
                          $11,740 / year
                          <div className="text-[#5F5F5F] text-[13px] mt-1">
                            National $15,523
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-[#4A4A4A] font-medium text-[15px]">
                          Average Total Aid Awarded
                        </td>
                        <td className="py-4 text-right text-[#089E68] font-semibold text-[15px]">
                          $10,555 / year
                          <div className="text-[#5F5F5F] text-[13px] mt-1">
                            National $7,535
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-[#4A4A4A] font-medium text-[15px]">
                          Students Receiving Financial Aid
                        </td>
                        <td className="py-4 text-right text-[#089E68] font-semibold text-[15px]">
                          94%
                        </td>
                      </tr>
                      <tr>
                        <td className="py-4 text-[#4A4A4A] font-medium text-[15px]">
                          Net Price Calculator
                        </td>
                        <td className="py-4 text-right">
                          <a
                            href="npc.collegeboard.org/student"
                            className="text-[#346DC2] text-[15px] font-medium inline-flex items-center gap-2 hover:text-[#1D77BD]"
                          >
                            Calculator
                            <svg
                              viewBox="0 0 24 24"
                              width="16"
                              height="16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h4 className="text-[#464646] text-base font-semibold mb-5 flex items-center gap-2">
                    Net Price by Household Income
                    <svg
                      className="info-icon"
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4m0-4h.01" />
                    </svg>
                  </h4>
                  <table className="w-full border-spacing-0">
                    <tbody>
                      <tr>
                        <td className="py-3 text-[#4A4A4A] font-medium text-[15px]">
                          {`<`}$30k
                        </td>
                        <td className="py-3 text-right text-[#089E68] font-semibold text-[15px]">
                          $2,033 / year
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#4A4A4A] font-medium text-[15px]">
                          $30-48k
                        </td>
                        <td className="py-3 text-right text-[#089E68] font-semibold text-[15px]">
                          $3,599 / year
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#4A4A4A] font-medium text-[15px]">
                          $49-75k
                        </td>
                        <td className="py-3 text-right text-[#089E68] font-semibold text-[15px]">
                          $8,897 / year
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#4A4A4A] font-medium text-[15px]">
                          $76-110k
                        </td>
                        <td className="py-3 text-right text-[#089E68] font-semibold text-[15px]">
                          $14,440 / year
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 text-[#4A4A4A] font-medium text-[15px]">
                          $110k+
                        </td>
                        <td className="py-3 text-right text-[#089E68] font-semibold text-[15px]">
                          $15,203 / year
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="text-[#4A4A4A] text-sm leading-6 mt-6 max-w-[90%]">
                    Net price is the average cost after financial aid for
                    students receiving grant or scholarship aid, as reported by
                    the college.
                  </p>
                </div>
              </div>
            </section>

            {/* Sticker Price Section */}
            <section className="bg-white rounded-xl p-8">
              <h3 className="text-[#016853] text-xl font-semibold mb-6">
                Sticker Price Breakdown
              </h3>
              <div className="grid grid-cols-2 gap-12 mb-8">
                <div className="flex flex-col bg-[#F8FCFF] p-6 gap-2">
                  <div className="text-[#4A4A4A] text-base font-medium">
                    In-State Tuition
                  </div>
                  <div className="text-[#464646] text-[36px] font-bold tracking-[-0.02em]">
                    $6,381
                  </div>
                  <div className="text-[#5F5F5F] text-base">/ year</div>
                </div>
                <div className="flex flex-col bg-[#F8FCFF] p-6 gap-2">
                  <div className="text-[#4A4A4A] text-base font-medium">
                    Out-of-State Tuition
                  </div>
                  <div className="text-[#464646] text-[36px] font-bold tracking-[-0.02em]">
                    $28,659
                  </div>
                  <div className="text-[#5F5F5F] text-base">/ year</div>
                </div>
              </div>
              <table className="w-full border-spacing-0 mt-6">
                <tbody>
                  <tr>
                    <td className="py-4 text-[#4A4A4A] font-medium text-[15px]">
                      Average Housing Cost
                    </td>
                    <td className="py-4 text-right text-[#089E68] font-semibold text-[15px]">
                      $6,350 / year
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[#4A4A4A] font-medium text-[15px]">
                      Average Meal Plan Cost
                    </td>
                    <td className="py-4 text-right text-[#089E68] font-semibold text-[15px]">
                      $4,600 / year
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 text-[#4A4A4A] font-medium text-[15px]">
                      Books & Supplies
                    </td>
                    <td className="py-4 text-right text-[#089E68] font-semibold text-[15px]">
                      $810 / year
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-8 grid gap-4">
                <div className="flex justify-between items-center p-4 bg-[#f8fafc] rounded-lg">
                  <div className="text-[#4A4A4A] text-[15px] font-medium flex items-center gap-2">
                    Tuition Guarantee Plan
                    <svg
                      className="info-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.61C7.25 20.61 3.39 16.75 3.39 12C3.39 7.25 7.25 3.39 12 3.39C16.75 3.39 20.61 7.25 20.61 12C20.61 16.75 16.75 20.61 12 20.61Z"></path>
                      <path d="M11.65 14.61C10.99 14.61 10.6 15.12 10.6 15.61C10.6 16.1 10.97 16.67 11.65 16.67C12.33 16.67 12.66 16.13 12.66 15.61C12.66 15.12 12.31 14.61 11.65 14.61Z"></path>
                      <path d="M11.97 7.32C9.92 7.32 8.74 8.74 8.72 9.21C8.72 9.48 8.82 9.65 8.91 9.74C9.05 9.88 9.25 9.96 9.49 9.96C9.77 9.96 9.98 9.76 10.19 9.54C10.52 9.2 10.98 8.75 11.99 8.75C12.7 8.75 13.75 9.1 13.75 9.85C13.75 10.29 13.04 10.72 12.27 11.12C10.98 11.79 10.84 12.69 10.84 13.04C10.84 13.49 11.2 13.9 11.6 13.9C11.97 13.9 12.37 13.6 12.37 13.14C12.37 12.97 12.69 12.49 13.42 12.15C13.93 11.91 15.28 11.28 15.28 9.8C15.28 8.94 14.59 7.32 11.96 7.32H11.97Z"></path>
                    </svg>
                  </div>
                  <div className="text-[#dc2626] text-[15px] font-semibold">
                    No
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#f8fafc] rounded-lg">
                  <div className="text-[#4A4A4A] text-[15px] font-medium flex items-center gap-2">
                    Tuition Payment Plan
                    <svg
                      className="info-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.61C7.25 20.61 3.39 16.75 3.39 12C3.39 7.25 7.25 3.39 12 3.39C16.75 3.39 20.61 7.25 20.61 12C20.61 16.75 16.75 20.61 12 20.61Z"></path>
                      <path d="M11.65 14.61C10.99 14.61 10.6 15.12 10.6 15.61C10.6 16.1 10.97 16.67 11.65 16.67C12.33 16.67 12.66 16.13 12.66 15.61C12.66 15.12 12.31 14.61 11.65 14.61Z"></path>
                      <path d="M11.97 7.32C9.92 7.32 8.74 8.74 8.72 9.21C8.72 9.48 8.82 9.65 8.91 9.74C9.05 9.88 9.25 9.96 9.49 9.96C9.77 9.96 9.98 9.76 10.19 9.54C10.52 9.2 10.98 8.75 11.99 8.75C12.7 8.75 13.75 9.1 13.75 9.85C13.75 10.29 13.04 10.72 12.27 11.12C10.98 11.79 10.84 12.69 10.84 13.04C10.84 13.49 11.2 13.9 11.6 13.9C11.97 13.9 12.37 13.6 12.37 13.14C12.37 12.97 12.69 12.49 13.42 12.15C13.93 11.91 15.28 11.28 15.28 9.8C15.28 8.94 14.59 7.32 11.96 7.32H11.97Z"></path>
                    </svg>
                  </div>
                  <div className="text-[#089E68] text-[15px] font-semibold">
                    Yes
                  </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#f8fafc] rounded-lg">
                  <div className="text-[#4A4A4A] text-[15px] font-medium flex items-center gap-2">
                    Prepaid Tuition Plan
                    <svg
                      className="info-icon"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.61C7.25 20.61 3.39 16.75 3.39 12C3.39 7.25 7.25 3.39 12 3.39C16.75 3.39 20.61 7.25 20.61 12C20.61 16.75 16.75 20.61 12 20.61Z"></path>
                      <path d="M11.65 14.61C10.99 14.61 10.6 15.12 10.6 15.61C10.6 16.1 10.97 16.67 11.65 16.67C12.33 16.67 12.66 16.13 12.66 15.61C12.66 15.12 12.31 14.61 11.65 14.61Z"></path>
                      <path d="M11.97 7.32C9.92 7.32 8.74 8.74 8.72 9.21C8.72 9.48 8.82 9.65 8.91 9.74C9.05 9.88 9.25 9.96 9.49 9.96C9.77 9.96 9.98 9.76 10.19 9.54C10.52 9.2 10.98 8.75 11.99 8.75C12.7 8.75 13.75 9.1 13.75 9.85C13.75 10.29 13.04 10.72 12.27 11.12C10.98 11.79 10.84 12.69 10.84 13.04C10.84 13.49 11.2 13.9 11.6 13.9C11.97 13.9 12.37 13.6 12.37 13.14C12.37 12.97 12.69 12.49 13.42 12.15C13.93 11.91 15.28 11.28 15.28 9.8C15.28 8.94 14.59 7.32 11.96 7.32H11.97Z"></path>
                    </svg>
                  </div>
                  <div className="text-[#089E68] text-[15px] font-semibold">
                    Yes
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostModal;
