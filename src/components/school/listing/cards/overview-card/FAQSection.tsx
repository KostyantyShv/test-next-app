// components/FAQSection.tsx
interface FAQSectionProps {
  activeTab: "instructor" | "marketplace";
  setActiveTab: (tab: "instructor" | "marketplace") => void;
  faqData: {
    instructor: { question: string; answer: string }[];
    marketplace: { question: string; answer: string }[];
  };
  activeFaqItem: number | null;
  toggleFaqItem: (index: number) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  activeTab,
  setActiveTab,
  faqData,
  activeFaqItem,
  toggleFaqItem,
}) => (
  <>
    <div className="flex items-center justify-between mb-6 md:px-4">
      <h2 className="text-xl md:text-lg font-semibold text-[#222] md:text-[#464646] mb-0">
        FAQ
      </h2>
      <div className="inline-flex bg-[#F0F0F0] p-1 rounded-lg">
        <button
          className={`py-2 px-4 md:py-1.5 md:px-3 rounded-md border-none text-sm md:text-xs font-medium transition-all duration-200 ${
            activeTab === "instructor"
              ? "bg-white text-[#333] md:text-[#4A4A4A] shadow-sm"
              : "bg-transparent text-[#666] md:text-[#5F5F5F]"
          }`}
          onClick={() => setActiveTab("instructor")}
        >
          Vendor
        </button>
        <button
          className={`py-2 px-4 md:py-1.5 md:px-3 rounded-md border-none text-sm md:text-xs font-medium transition-all duration-200 ${
            activeTab === "marketplace"
              ? "bg-white text-[#333] md:text-[#4A4A4A] shadow-sm"
              : "bg-transparent text-[#666] md:text-[#5F5F5F]"
          }`}
          onClick={() => setActiveTab("marketplace")}
        >
          Platform
        </button>
      </div>
    </div>
    <div
      className={`${
        activeTab === "instructor" ? "block" : "hidden"
      } md:px-4 md:pb-6`}
    >
      {faqData.instructor.map((item, index) => (
        <div key={index} className="mb-4">
          <div
            className="p-5 md:p-4 bg-[#F7F7F7] rounded-t-lg font-semibold flex justify-between items-center cursor-pointer text-[#333] md:text-[#464646] text-sm transition-all duration-200 hover:bg-[#F0F0F0]"
            onClick={() => toggleFaqItem(index)}
          >
            <span className="md:pr-2.5">{item.question}</span>
            <svg
              className={`transition-transform duration-300 ${
                activeFaqItem === index ? "rotate-180" : ""
              }`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className={`bg-[#F7F7F7] rounded-b-lg text-[#666] md:text-[#5F5F5F] leading-6 text-sm transition-all duration-300 ${
              activeFaqItem === index
                ? "max-h-48 p-5 md:p-4 visible opacity-100"
                : "max-h-0 px-5 md:px-4 invisible opacity-0"
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
    <div
      className={`${
        activeTab === "marketplace" ? "block" : "hidden"
      } md:px-4 md:pb-6`}
    >
      {faqData.marketplace.map((item, index) => (
        <div key={index} className="mb-4">
          <div
            className="p-5 md:p-4 bg-[#F7F7F7] rounded-t-lg font-semibold flex justify-between items-center cursor-pointer text-[#333] md:text-[#464646] text-sm transition-all duration-200 hover:bg-[#F0F0F0]"
            onClick={() => toggleFaqItem(index)}
          >
            <span className="md:pr-2.5">{item.question}</span>
            <svg
              className={`transition-transform duration-300 ${
                activeFaqItem === index ? "rotate-180" : ""
              }`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            className={`bg-[#F7F7F7] rounded-b-lg text-[#666] md:text-[#5F5F5F] leading-6 text-sm transition-all duration-300 ${
              activeFaqItem === index
                ? "max-h-48 p-5 md:p-4 visible opacity-100"
                : "max-h-0 px-5 md:px-4 invisible opacity-0"
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  </>
);

export default FAQSection;
