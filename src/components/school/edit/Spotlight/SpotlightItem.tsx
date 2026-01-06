import { Spotlight } from "./types";

interface SpotlightItemProps {
  spotlight: Spotlight;
  onEdit: () => void;
  onTogglePin: () => void;
}

export default function SpotlightItem({
  spotlight,
  onEdit,
  onTogglePin,
}: SpotlightItemProps) {
  // Truncate HTML description
  const truncateHTML = (html: string, maxLength: number): string => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    if (text.length <= maxLength) return html;
    let truncated = text.substring(0, maxLength);
    if (truncated.lastIndexOf(".") > maxLength - 20) {
      truncated = truncated.substring(0, truncated.lastIndexOf(".") + 1);
    } else {
      truncated += "...";
    }
    return truncated;
  };

  const truncatedDescription = truncateHTML(spotlight.description, 150);

  return (
    <div
      className={`${
        spotlight.pinned
          ? "bg-[#EBFCF4] border-[#D7F7E9] border max-md:bg-[#EBFCF4] max-md:border-[#D7F7E9]"
          : "bg-[#F8F9FA] max-md:bg-[#F8F9FA]"
      } rounded-lg max-md:rounded-lg p-5 max-md:p-4 mb-4 max-md:mb-3 flex items-start gap-5 max-md:gap-3`}
    >
      <div className="w-12 h-12 max-md:w-10 max-md:h-10 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={spotlight.author.avatar}
          alt={spotlight.author.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2 max-md:mb-2">
          <div className="flex flex-col max-md:flex-col min-w-0 flex-1">
            <span className="font-semibold text-[#262B47] max-md:text-[#262B3D] text-base max-md:text-sm max-md:font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              {spotlight.author.name}
            </span>
            <span className="text-[#5F5F5F] text-sm max-md:text-xs">
              {spotlight.projectDate}
            </span>
          </div>
          <div className="flex gap-3 max-md:gap-2 items-center flex-shrink-0">
            <button
              onClick={onTogglePin}
              className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:bg-[#f8f9fa] max-md:hover:bg-[#f8f9fa] transition-colors"
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
              className="w-9 h-9 max-md:w-8 max-md:h-8 rounded-full border border-[#E5E5E5] bg-white flex items-center justify-center hover:bg-[#f8f9fa] max-md:hover:bg-[#f8f9fa] transition-colors"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="max-md:w-[20px] max-md:h-[20px]">
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
        <h3 className="text-lg max-md:text-base font-semibold text-[#262B47] max-md:text-[#262B3D] mb-2 max-md:mb-1.5 max-md:line-clamp-2 max-md:overflow-hidden max-md:text-ellipsis max-md:max-h-[44px]">
          {spotlight.title}
        </h3>
        <div
          className="text-sm max-md:text-[13px] text-[#4A4A4A] leading-relaxed max-md:leading-[1.5] line-clamp-2 max-md:line-clamp-2"
          dangerouslySetInnerHTML={{ __html: truncatedDescription }}
        />
      </div>
    </div>
  );
}
