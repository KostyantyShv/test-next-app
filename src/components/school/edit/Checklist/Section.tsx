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
    <div className="m-4 border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
      <div
        className="px-6 py-4 flex justify-between items-center"
        style={{ background: 'var(--surface-secondary)' }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const chevron = e.currentTarget.querySelector('.chevron');
            if (chevron) (chevron as HTMLElement).click();
          }
        }}
      >
        <div className="flex items-center gap-4">
          <div className="text-base font-semibold" style={{ color: 'var(--header-green)' }}>
            {title}
          </div>
          {completedCount === totalItems ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium min-w-[95px]" style={{ background: 'var(--state-success-bg)', color: 'var(--success-green)' }}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
              </svg>
              All done
            </div>
          ) : incompleteCount > 0 && issuesCount === 0 ? (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium min-w-[95px]" style={{ background: 'var(--state-incomplete-bg)', color: 'var(--verification-blue)' }}>
              <svg
                viewBox="0 0 448 512"
                width="15"
                height="15"
                fill="currentColor"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
              </svg>
              {incompleteCount} incomplete
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium min-w-[95px]" style={{ background: 'var(--state-error-bg)', color: 'var(--state-error-text)' }}>
              <svg
                viewBox="0 0 15 15"
                width="15"
                height="15"
                fill="currentColor"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                />
              </svg>
              {incompleteCount > 0 && issuesCount > 0
                ? `${incompleteCount} incomplete, ${issuesCount} issues`
                : issuesCount > 0
                ? `${issuesCount} issues`
                : `${incompleteCount} incomplete`}
            </div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ProgressCircle progress={progress} />
          <svg
            className={`chevron w-5 h-5 transition-transform cursor-pointer ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={(e) => {
              e.stopPropagation();
              toggleSection(title);
            }}
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
      <div className={`p-4 ${isExpanded ? "block" : "hidden"}`}>
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
