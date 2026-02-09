import { Dropdown } from "./Dropdown";
import { ToggleSwitch } from "./ToggleSwitch";
import { ChecklistItemProps } from "./types";

interface HeaderProps {
  showIncomplete: boolean;
  setShowIncomplete: (value: boolean) => void;
  showIssues: boolean;
  setShowIssues: (value: boolean) => void;
  expandMode: "all" | "incomplete" | "issues" | "completed" | null;
  handleExpand: (mode: "all" | "incomplete" | "issues" | "completed") => void;
  items: { title: string; items: ChecklistItemProps[] }[];
}

export const Header: React.FC<HeaderProps> = ({
  showIncomplete,
  setShowIncomplete,
  showIssues,
  setShowIssues,
  expandMode,
  handleExpand,
  items,
}) => {
  // Calculate dynamic counts
  const totalItems = items.flatMap((section) => section.items).length;
  const incompleteCount = items
    .flatMap((section) => section.items)
    .filter((item) => item.button?.type === "add").length;
  const issuesCount = items
    .flatMap((section) => section.items)
    .filter((item) => item.button?.type === "fix").length;

  // Calculate progress percentages - options (incomplete) and issues
  const optionsPercent = totalItems > 0 ? (incompleteCount / totalItems) * 100 : 0;
  const issuesPercent = totalItems > 0 ? (issuesCount / totalItems) * 100 : 0;

  return (
    <div className="content-header">
      <div className="header-left">
        <h1 className="header-title">Listing Checklist</h1>

        <div className="header-progress">
          <div className="progress-container">
            <div className="progress-bar-wrapper">
              <div className="progress-bar">
                <div
                  className="progress-fill-options"
                  style={{ width: `${optionsPercent}%` }}
                />
                <div
                  className="progress-fill-issues"
                  style={{ width: `${issuesPercent}%` }}
                />
              </div>
            </div>
            <div className="counts-container">
              <span className="options-count">{incompleteCount} incomplete</span>
              <span className="issues-count">{issuesCount} issues</span>
            </div>
          </div>
        </div>
      </div>

      <div className="expand-dropdown">
        <div className="toggle-container">
          <ToggleSwitch
            label="Show Incomplete"
            checked={showIncomplete}
            onChange={() => setShowIncomplete(!showIncomplete)}
          />
          <ToggleSwitch
            label="Show Issues"
            checked={showIssues}
            onChange={() => setShowIssues(!showIssues)}
          />
        </div>

        <Dropdown expandMode={expandMode} handleExpand={handleExpand} />
      </div>
    </div>
  );
};
