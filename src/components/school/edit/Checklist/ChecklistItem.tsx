import { useState } from "react";
import { ChecklistItemProps } from "./types";
import { Icon } from "./Icon";

export const ChecklistItem: React.FC<
  ChecklistItemProps & {
    isExpanded: boolean;
    toggleItem: () => void;
    completeItem: () => Promise<void>;
  }
> = ({
  icon,
  title,
  button,
  description,
  issues,
  status,
  isExpanded,
  toggleItem,
  completeItem,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAction = async () => {
    setIsProcessing(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API
      await completeItem();
    } catch (error) {
      console.error(
        `Error ${button?.type === "add" ? "completing" : "fixing"} item:`,
        error
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={`border max-md:border-[#E5E7EB] rounded-lg max-md:rounded-lg mb-3 max-md:mb-3 overflow-hidden max-md:overflow-hidden last:mb-0 max-md:last:mb-0 ${isExpanded ? 'expanded max-md:expanded' : ''}`} style={{ borderColor: 'var(--border-color)' }}>
      <div
        className="p-3 max-md:p-3 grid max-md:grid grid-cols-[28px_1fr_24px] max-md:grid-cols-[28px_1fr_24px] gap-2 max-md:gap-2 items-center max-md:items-center cursor-pointer max-md:cursor-pointer"
        style={{ 
          backgroundColor: 'white',
        }}
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest('button')) {
            toggleItem();
          }
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!(e.target as HTMLElement).closest('button')) {
              toggleItem();
            }
          }
        }}
      >
        <div className="flex items-center justify-center max-md:flex max-md:items-center max-md:justify-center">
          <Icon name={icon} className="w-5 h-5 max-md:w-5 max-md:h-5" style={{ color: 'var(--header-green)' }} />
        </div>
        <div className="text-sm max-md:text-sm font-medium max-md:font-medium overflow-hidden max-md:overflow-hidden text-ellipsis max-md:text-ellipsis whitespace-nowrap max-md:whitespace-nowrap" style={{ color: 'var(--bold-text)' }}>{title}</div>
        <div className="item-expand-icon max-md:item-expand-icon flex items-center max-md:flex max-md:items-center justify-center max-md:justify-center">
          <svg
            className={`w-[18px] max-md:w-[18px] h-[18px] max-md:h-[18px] transition-transform max-md:transition-transform ${
              isExpanded ? "rotate-180 max-md:rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            style={{ color: 'var(--dark-text)' }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div className="item-action-row max-md:item-action-row px-3 max-md:px-3 pb-3 max-md:pb-3">
        {status === "completed" ? (
          <div className="item-status max-md:item-status status-completed max-md:status-completed flex items-center max-md:flex max-md:items-center justify-center max-md:justify-center gap-1.5 max-md:gap-1.5" style={{ background: '#d1fae5', color: '#089E68', border: '1px solid #089E68' }}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="max-md:w-[14px] max-md:h-[14px]"
            >
              <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
            </svg>
            Completed
          </div>
        ) : (
          <button
            className={`item-button max-md:item-button ${button?.type === "add" ? "add-button max-md:add-button" : "fix-button max-md:fix-button"} flex items-center max-md:flex max-md:items-center justify-center max-md:justify-center gap-1.5 max-md:gap-1.5`}
            style={{
              background: button?.type === "add" ? '#EBFCF4' : '#F3F4F6',
              color: button?.type === "add" ? 'var(--header-green)' : 'var(--dark-text)',
              border: '1px solid var(--border-color)',
            }}
            onMouseEnter={(e) => {
              if (button?.type === "add") {
                (e.currentTarget as HTMLButtonElement).style.background = '#D7F7E9';
              } else {
                (e.currentTarget as HTMLButtonElement).style.background = '#E5E7EB';
              }
            }}
            onMouseLeave={(e) => {
              if (button?.type === "add") {
                (e.currentTarget as HTMLButtonElement).style.background = '#EBFCF4';
              } else {
                (e.currentTarget as HTMLButtonElement).style.background = '#F3F4F6';
              }
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleAction();
            }}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : button?.label}
          </button>
        )}
      </div>
      <div
        className={`item-details max-md:item-details p-3 max-md:p-3 border-t max-md:border-t ${isExpanded ? "block max-md:block" : "hidden max-md:hidden"}`}
        style={{ background: '#F9FAFB', borderColor: 'var(--border-color)' }}
      >
        {issues ? (
          <div className="issue-description max-md:issue-description p-2.5 max-md:p-2.5 border max-md:border-[#E5E7EB] rounded-md max-md:rounded-md text-[13px] max-md:text-[13px] leading-[1.5] max-md:leading-[1.5]" style={{ backgroundColor: 'white', borderColor: 'var(--border-color)', color: 'var(--text-default)' }}>
            Some of your {title.toLowerCase()} are incomplete or missing important details. Please review and complete the following:
            <div className="affected-items max-md:affected-items mt-3 max-md:mt-3 flex flex-col max-md:flex-col gap-2 max-md:gap-2">
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className="affected-group max-md:affected-group mt-2 max-md:mt-2 pt-2 max-md:pt-2 border-t max-md:border-t border-dashed max-md:border-dashed"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="affected-title max-md:affected-title font-medium max-md:font-medium mb-1 max-md:mb-1 text-[13px] max-md:text-[13px]" style={{ color: 'var(--bold-text)' }}>
                    {issue.title}
                  </div>
                  <div className="missing-fields max-md:missing-fields flex flex-wrap max-md:flex-wrap gap-1 max-md:gap-1 mt-1 max-md:mt-1">
                    {issue.missing.map((field, idx) => (
                      <span
                        key={idx}
                        className="keyword-highlight max-md:keyword-highlight px-1 max-md:px-1 py-0.5 max-md:py-0.5 rounded max-md:rounded text-[11px] max-md:text-[11px] font-medium max-md:font-medium"
                        style={{ background: '#fee2e2', color: '#ef4444' }}
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="option-description max-md:option-description p-2.5 max-md:p-2.5 border max-md:border-[#E5E7EB] rounded-md max-md:rounded-md text-[13px] max-md:text-[13px] leading-[1.5] max-md:leading-[1.5]" style={{ backgroundColor: 'white', borderColor: 'var(--border-color)', color: 'var(--text-default)' }}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
