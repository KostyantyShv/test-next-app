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
    <div className="border border-border rounded-lg mb-4 overflow-hidden last:mb-0 animate-fadeIn">
      <div
        className="p-4 grid grid-cols-[48px_1fr_auto_24px] gap-4 items-center bg-white"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleItem();
          }
        }}
      >
        <div className="flex items-center justify-center">
          <Icon name={icon} className="w-6 h-6 text-header-green" />
        </div>
        <div className="text-sm font-medium text-bold-text">{title}</div>
        {status === "completed" ? (
          <div className="flex items-center gap-2 text-sm font-medium text-[#089E68]">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
            </svg>
            Completed
          </div>
        ) : (
          <button
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium border border-border ${
              button?.type === "add"
                ? "bg-apply-button-bg text-header-green hover:bg-apply-button-hover"
                : "bg-gray-100 text-dark-text hover:bg-gray-200"
            } transition-all`}
            onClick={handleAction}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : button?.label}
          </button>
        )}
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={toggleItem}
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
        className={`p-4 bg-gray-50 border-t border-border ${
          isExpanded ? "block" : "hidden"
        }`}
      >
        {issues ? (
          <div className="p-3 bg-white border border-border rounded-md text-sm leading-6 text-text-default">
            Some of your {title.toLowerCase()} are incomplete or missing
            important details. Please review and complete the following:
            <div className="mt-3 flex flex-col gap-2">
              {issues.map((issue, index) => (
                <div
                  key={index}
                  className="mt-2 pt-2 border-t border-dashed border-border"
                >
                  <div className="font-medium text-bold-text">
                    {issue.title}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1 ml-5">
                    {issue.missing.map((field, idx) => (
                      <span
                        key={idx}
                        className="bg-error-bg text-error px-1 py-0.5 rounded text-xs font-medium"
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
          <div className="p-3 bg-white border border-border rounded-md text-sm leading-6 text-text-default">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};
