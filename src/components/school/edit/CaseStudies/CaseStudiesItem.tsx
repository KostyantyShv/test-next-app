import { CaseStudy } from "./types/caseStudy";

interface CaseStudyItemProps {
  caseStudy: CaseStudy;
  onEdit: () => void;
  onTogglePin: () => void;
}

export default function CaseStudyItem({
  caseStudy,
  onEdit,
  onTogglePin,
}: CaseStudyItemProps) {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > maxLength - 20) {
      return truncated.substr(0, lastSpace) + "...";
    }
    return truncated + "...";
  };

  return (
    <div
      className={`flex items-start gap-5 max-md:gap-3 p-5 max-md:p-4 mb-4 max-md:mb-3 rounded-lg max-md:rounded-lg ${
        caseStudy.pinned
          ? "bg-[#EBFCF4] max-md:bg-[#EBFCF4] border border-[#D7F7E9] max-md:border-[#D7F7E9]"
          : "bg-[#F8F9FA] max-md:bg-[#F8F9FA]"
      }`}
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      <div className="w-[75px] h-[75px] max-md:w-[60px] max-md:h-[60px] rounded-lg max-md:rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={caseStudy.thumbnail}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2 max-md:mb-2">
          <div className="flex flex-col max-md:flex-col flex-1 min-w-0">
            <span className="font-semibold max-md:font-semibold text-[#262B3D] max-md:text-[#262B3D] text-sm max-md:text-[13px] whitespace-nowrap overflow-hidden text-ellipsis">
              {caseStudy.category}
            </span>
            <div className="flex items-center gap-2 max-md:gap-2 mt-0.5 max-md:mt-0">
              <span
                className={`text-sm max-md:text-xs font-medium max-md:font-medium ${
                  caseStudy.status === "published"
                    ? "text-[#0B6333] max-md:text-[#0B6333]"
                    : "text-[#5F5F5F] max-md:text-[#5F5F5F]"
                }`}
              >
                {caseStudy.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
          </div>
          <div className="flex gap-3 max-md:gap-2 flex-shrink-0">
            <button
              onClick={onTogglePin}
              className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-full max-md:rounded-full border border-[#E5E5E5] max-md:border-[#E5E5E5] bg-white max-md:bg-white flex items-center justify-center hover:bg-[#f8f9fa] max-md:hover:bg-[#f8f9fa] transition-colors"
              type="button"
            >
              <svg viewBox="0 0 20 20" fill="none" width="20" height="20" className="max-md:w-[20px] max-md:h-[20px]">
                <path
                  d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.5 12.5L3.75 16.25"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.084 3.33398L16.6673 7.91732"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={onEdit}
              className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-full max-md:rounded-full border border-[#E5E5E5] max-md:border-[#E5E5E5] bg-white max-md:bg-white flex items-center justify-center hover:bg-[#f8f9fa] max-md:hover:bg-[#f8f9fa] transition-colors"
              type="button"
            >
              <svg fill="none" viewBox="0 0 24 24" width="20" height="20" className="max-md:w-[20px] max-md:h-[20px]">
                <path
                  fill="currentColor"
                  d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <h3 className="text-lg max-md:text-base font-semibold max-md:font-semibold text-[#262B3D] max-md:text-[#262B3D] mb-2 max-md:mb-1.5 max-md:line-clamp-2 max-md:overflow-hidden max-md:text-ellipsis max-md:max-h-[44px]">
          {caseStudy.title}
        </h3>
        <div className="text-sm max-md:text-[13px] text-[#4A4A4A] max-md:text-[#4A4A4A] leading-[1.6] max-md:leading-[1.5] line-clamp-2 max-md:line-clamp-2">
          {truncateText(caseStudy.description, 150)}
        </div>
      </div>
    </div>
  );
}
