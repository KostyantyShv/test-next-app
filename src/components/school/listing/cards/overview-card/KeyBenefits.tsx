// components/KeyBenefits.tsx
interface KeyBenefitsProps {
  points: string[];
  isExpanded: boolean;
  toggleExpand: () => void;
}

const KeyBenefits: React.FC<KeyBenefitsProps> = ({
  points,
  isExpanded,
  toggleExpand,
}) => (
  <div className="my-8 md:px-4 md:pb-4">
    <h2 className="text-xl md:text-lg font-semibold mb-6 md:mb-4 text-[#222] md:text-[#464646]">
      Key Benefits
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {points.map((point, index) => (
        <div
          key={index}
          className={`bg-white border border-[#F0F0F0] md:border-[#E1E7EE] rounded-lg p-4 flex items-center gap-3 transition-all duration-200 hover:border-[#0B6333] hover:shadow-sm ${
            index >= 2 && !isExpanded ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="w-6 h-6 flex-shrink-0 text-[#0B6333]">
            <svg
              width="100%"
              viewBox="0 0 16 16"
              style={{ width: "24px", height: "24px" }}
              strokeLinejoin="round"
              height="100%"
            >
              <path
                fill="currentColor"
                d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-medium text-[#2C3E50] md:text-[#464646] text-sm leading-tight tracking-tight">
              {point}
            </div>
          </div>
        </div>
      ))}
    </div>
    <button
      className="text-[#089E68] font-medium flex items-center justify-center gap-1 cursor-pointer mt-4 p-3 bg-[#F7F7F7] rounded-lg w-full transition-all duration-200 hover:bg-[#F0F0F0] md:hover:bg-[#EBFCF4]"
      onClick={toggleExpand}
    >
      {isExpanded ? "Show less" : "Show more"}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d={isExpanded ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
);

export default KeyBenefits;
