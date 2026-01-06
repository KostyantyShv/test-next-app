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
    <div className="px-8 py-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
      <div className="flex justify-between items-center max-md:flex-col max-md:gap-4">
        <div className="flex items-center gap-6 max-md:w-full max-md:flex-col max-md:items-start">
          <p className="text-xl font-semibold whitespace-nowrap" style={{ color: 'var(--header-green)' }}>
            Listing Checklist
          </p>
          <div className="flex items-center gap-4 max-md:w-full max-md:flex-col">
            <div className="w-[240px] max-md:w-full relative">
              <div className="w-full h-2 rounded" style={{ background: 'var(--gray-200)' }}>
                <div
                  className="h-full absolute top-0 left-0 transition-all rounded"
                  style={{
                    width: `${optionsPercent}%`,
                    background: 'var(--header-green)',
                    zIndex: 1,
                  }}
                ></div>
                <div
                  className="h-full absolute top-0 left-0 transition-all rounded"
                  style={{
                    width: `${issuesPercent}%`,
                    background: 'var(--state-error-text)',
                    zIndex: 2,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex gap-3 text-xs font-medium whitespace-nowrap">
              <span style={{ color: 'var(--header-green)' }}>{incompleteCount} incomplete</span>
              <span style={{ color: 'var(--state-error-text)' }}>{issuesCount} issues</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 max-md:w-full max-md:justify-start">
          <div className="flex gap-4">
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
    </div>
  );
};
