import { ChecklistItem } from "./ChecklistItem";
import ProgressCircle from "./ProgressCircle";
import { ChecklistItemProps } from "./types";

interface SectionProps {
  title: string;
  items: ChecklistItemProps[];
  isExpanded: boolean;
  toggleSection: (title: string) => void;
  expandedItems: string[];
  toggleItem: (title: string) => void;
  completeItem: (sectionTitle: string, itemTitle: string) => Promise<void>;
  showIncomplete: boolean;
  showIssues: boolean;
}

export const Section: React.FC<SectionProps> = ({
  title,
  items,
  isExpanded,
  toggleSection,
  expandedItems,
  toggleItem,
  completeItem,
  showIncomplete,
  showIssues,
}) => {
  const incompleteCount = items.filter(
    (item) => item.button?.type === "add"
  ).length;
  const issuesCount = items.filter(
    (item) => item.button?.type === "fix"
  ).length;
  const totalItems = items.length;
  const completedCount = totalItems - (incompleteCount + issuesCount);
  const progress = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

  const visibleItems = items.filter((item) => {
    const isOption = item.button?.type === "add";
    const isIssue = item.button?.type === "fix";
    const isCompleted = item.status === "completed";
    if (isCompleted) return true;
    if (showIncomplete && showIssues) return isOption || isIssue;
    if (showIncomplete) return isOption;
    if (showIssues) return isIssue;
    return true;
  });

  return (
    <div className="m-4 max-md:m-2 border max-md:border-[#E5E7EB] rounded-lg max-md:rounded-lg overflow-hidden max-md:overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      <div
        className="px-6 max-md:px-3 py-4 max-md:py-3 flex justify-between max-md:justify-between items-center max-md:items-center cursor-pointer max-md:cursor-pointer"
        style={{ background: 'var(--surface-secondary)' }}
        onClick={() => toggleSection(title)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleSection(title);
          }
        }}
      >
        <div className="flex items-center max-md:items-start gap-4 max-md:gap-0 flex-grow max-md:flex-grow overflow-hidden max-md:overflow-hidden">
          <div className="flex flex-col max-md:flex-col items-start max-md:items-start gap-1 max-md:gap-1 flex-grow max-md:flex-grow min-w-0 max-md:min-w-0">
            <div className="text-base max-md:text-[15px] font-semibold max-md:font-semibold whitespace-nowrap max-md:whitespace-nowrap overflow-hidden max-md:overflow-hidden text-ellipsis max-md:text-ellipsis max-w-full max-md:max-w-full" style={{ color: 'var(--header-green)' }}>
              {title}
            </div>
            {completedCount === totalItems ? (
              <div className="inline-flex items-center gap-1 max-md:gap-1 px-2 max-md:px-2 py-0.5 max-md:py-[3px] rounded-full max-md:rounded-full text-[11px] max-md:text-[11px] font-medium max-md:font-medium whitespace-nowrap max-md:whitespace-nowrap" style={{ background: '#d1fae5', color: '#089E68' }}>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="max-md:w-[10px] max-md:h-[10px]"
                >
                  <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
                </svg>
                All done
              </div>
            ) : incompleteCount > 0 && issuesCount === 0 ? (
              <div className="inline-flex items-center gap-1 max-md:gap-1 px-2 max-md:px-2 py-0.5 max-md:py-[3px] rounded-full max-md:rounded-full text-[11px] max-md:text-[11px] font-medium max-md:font-medium whitespace-nowrap max-md:whitespace-nowrap" style={{ background: '#ebf5ff', color: '#1d77bd' }}>
                <svg
                  viewBox="0 0 448 512"
                  width="10"
                  height="10"
                  fill="currentColor"
                  className="max-md:w-[10px] max-md:h-[10px]"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
                {incompleteCount} incomplete
              </div>
            ) : (
              <div className="inline-flex items-center gap-1 max-md:gap-1 px-2 max-md:px-2 py-0.5 max-md:py-[3px] rounded-full max-md:rounded-full text-[11px] max-md:text-[11px] font-medium max-md:font-medium whitespace-nowrap max-md:whitespace-nowrap" style={{ background: '#fee2e2', color: '#ef4444' }}>
                <svg
                  viewBox="0 0 15 15"
                  width="10"
                  height="10"
                  fill="currentColor"
                  className="max-md:w-[10px] max-md:h-[10px]"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  />
                </svg>
                {incompleteCount > 0 && issuesCount > 0
                  ? `${incompleteCount} inc, ${issuesCount} iss`
                  : issuesCount > 0
                  ? `${issuesCount} issues`
                  : `${incompleteCount} incomplete`}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center max-md:items-center gap-2 max-md:gap-2 flex-shrink-0 max-md:flex-shrink-0">
          <ProgressCircle progress={progress} />
          <div className="chevron max-md:chevron w-[18px] max-md:w-[18px] h-[18px] max-md:h-[18px] transition-transform max-md:transition-transform flex items-center max-md:items-center justify-center max-md:justify-center">
            <svg
              className={`w-full max-md:w-full h-full max-md:h-full transition-transform max-md:transition-transform ${
                isExpanded ? "rotate-180 max-md:rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              style={{ color: 'var(--dark-text)' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className={`p-3 max-md:p-3 border-t max-md:border-t ${isExpanded ? "block max-md:block" : "hidden max-md:hidden"}`} style={{ borderColor: 'var(--border-color)' }}>
        {visibleItems.map((item) => (
          <ChecklistItem
            key={item.title}
            {...item}
            isExpanded={expandedItems.includes(item.title)}
            toggleItem={() => toggleItem(item.title)}
            completeItem={() => completeItem(title, item.title)}
          />
        ))}
      </div>
    </div>
  );
};
