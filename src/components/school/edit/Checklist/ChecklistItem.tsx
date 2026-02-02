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

  const issuesSubject =
    title.endsWith(" Issues")
      ? (() => {
          const base = title.replace(/ Issues$/, "");
          if (base === "Spotlight") return "spotlight sections";
          if (base === "Case Study") return "case studies";
          if (base === "Announcement") return "announcements";
          if (base === "Event") return "events";
          return `${base.toLowerCase()}s`;
        })()
      : title.toLowerCase();

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
    <div className="checklist-item">
      <div className="item-header">
        <div className="item-icon">
          <Icon name={icon} />
        </div>
        <div className="item-title">{title}</div>

        {status === "completed" ? (
          <div className="item-status status-completed">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
            </svg>
            Completed
          </div>
        ) : (
          <button
            type="button"
            className={button?.type === "add" ? "add-button" : "fix-button"}
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
          className="item-expand"
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            toggleItem();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleItem();
            }
          }}
        >
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" style={{ transform: isExpanded ? "rotate(180deg)" : undefined }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div className={`item-details ${isExpanded ? "expanded" : ""}`}>
        {issues ? (
          <div className="issue-description">
            Some of your {issuesSubject} are incomplete or missing important
            details. Please review and complete the following:
            <div className="affected-items">
              {issues.map((issue, index) => (
                <div key={index} className="affected-group">
                  <div className="affected-title">{issue.title}</div>
                  <div className="missing-fields">
                    {issue.missing.map((field, idx) => (
                      <span key={idx} className="keyword-highlight">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="option-description">{description}</div>
        )}
      </div>
    </div>
  );
};
