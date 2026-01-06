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
    <div className="border rounded-lg mb-4 overflow-hidden last:mb-0" style={{ borderColor: 'var(--border-color)' }}>
      <div
        className="p-4 max-md:grid max-md:grid-cols-[48px_1fr_24px] max-md:gap-4"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '48px 1fr auto 24px', 
          gap: '16px', 
          alignItems: 'center',
          backgroundColor: 'var(--surface-color)',
        }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            const expandButton = e.currentTarget.querySelector('.item-expand');
            if (expandButton) (expandButton as HTMLElement).click();
          }
        }}
      >
        <div className="flex items-center justify-center">
          <Icon name={icon} className="w-6 h-6" style={{ color: 'var(--header-green)' }} />
        </div>
        <div className="text-sm font-medium" style={{ color: 'var(--bold-text)' }}>{title}</div>
        {status === "completed" ? (
          <div className="flex items-center gap-2 text-sm font-medium max-md:col-span-2 max-md:mt-2" style={{ color: 'var(--success-green)' }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
            </svg>
            Completed
          </div>
        ) : (
          <button
            className={`px-4 py-1.5 rounded text-[13px] font-medium border transition-all max-md:col-span-2 max-md:mt-2 ${
              button?.type === "add"
                ? "hover:opacity-90"
                : ""
            }`}
            onMouseEnter={(e) => {
              if (button?.type !== "add") {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--gray-200)';
              }
            }}
            onMouseLeave={(e) => {
              if (button?.type !== "add") {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'var(--hover-bg)';
              }
            }}
            style={{
              background: button?.type === "add" ? 'var(--apply-button-bg)' : 'var(--hover-bg)',
              color: button?.type === "add" ? 'var(--header-green)' : 'var(--dark-text)',
              borderColor: 'var(--border-color)',
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
        <div
          className="item-expand flex items-center justify-center cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            toggleItem();
          }}
        >
          <svg
            className={`w-5 h-5 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
      <div
        className={`p-4 border-t ${isExpanded ? "block" : "hidden"}`}
        style={{ background: 'var(--surface-secondary)', borderColor: 'var(--border-color)' }}
      >
        {issues ? (
          <div className="p-3 border rounded text-sm leading-6" style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-default)' }}>
            Some of your {title.toLowerCase()} are incomplete or missing important details. Please review and complete the following:
            <div className="mt-3 flex flex-col gap-2">
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className="mt-2 pt-2 border-t border-dashed"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="font-medium mb-1" style={{ color: 'var(--bold-text)' }}>
                    {issue.title}
                  </div>
                  <div className="flex flex-wrap gap-1 ml-5">
                    {issue.missing.map((field, idx) => (
                      <span
                        key={idx}
                        className="px-1 py-0.5 rounded text-xs font-medium"
                        style={{ background: 'var(--state-error-bg)', color: 'var(--state-error-text)' }}
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
          <div className="p-3 border rounded text-sm leading-6" style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', color: 'var(--text-default)' }}>
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
