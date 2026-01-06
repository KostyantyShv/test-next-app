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
      className={`flex items-start gap-5 p-5 mb-4 rounded-lg ${
        caseStudy.pinned
          ? "bg-[#EBFCF4] border border-[#D7F7E9]"
          : "bg-[#F8F9FA]"
      }`}
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      <div className="w-[75px] h-[75px] rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={caseStudy.thumbnail}
          alt={caseStudy.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <span className="font-semibold text-[#262B3D] text-sm">
              {caseStudy.category}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className={`text-sm font-medium ${
                  caseStudy.status === "published"
                    ? "text-[var(--active-green)]"
                    : "text-[#5F5F5F]"
                }`}
              >
                {caseStudy.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={onTogglePin}
              className="w-9 h-9 rounded-full border border-theme bg-surface flex items-center justify-center hover:bg-surface-secondary transition-colors"
              type="button"
            >
              <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
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
              className="w-9 h-9 rounded-full border border-theme bg-surface flex items-center justify-center hover:bg-surface-secondary transition-colors"
              type="button"
            >
              <svg fill="none" viewBox="0 0 24 24" width="20" height="20">
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
        <h3 className="text-lg font-semibold text-[#262B3D] mb-2">
          {caseStudy.title}
        </h3>
        <div className="text-sm text-[#4A4A4A] leading-[1.6] line-clamp-2">
          {truncateText(caseStudy.description, 150)}
        </div>
      </div>
    </div>
  );
}
