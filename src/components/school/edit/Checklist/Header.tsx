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
  const completedCount = totalItems - (incompleteCount + issuesCount);

  // Calculate progress percentages
  const incompleteProgress =
    totalItems > 0 ? (incompleteCount / totalItems) * 100 : 0;
  const issuesProgress = totalItems > 0 ? (issuesCount / totalItems) * 100 : 0;

  return (
    <div className="p-[24px_32px] border-b border-border flex justify-between items-center flex-col md:flex-row gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full md:w-auto">
        <h1 className="text-xl font-semibold text-header-green">
          Listing Checklist
        </h1>
        <div className="flex items-center max-md:flex-col gap-4 w-full md:w-auto">
          <div className="md:w-[240px] max-md:w-full relative">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#016853] absolute top-0 rounded-l-full left-0 transition-all"
                style={{
                  width: `${100 - incompleteProgress - issuesProgress}%`,
                }}
              ></div>
              <div
                className="h-full bg-[#ef4444] absolute rounded-l-full top-0 left-0 transition-all"
                style={{ width: `${issuesProgress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex md:gap-3 max-md:w-full text-sm max-md:justify-between font-medium">
            <span className="text-[#016853]">{incompleteCount} incomplete</span>
            <span className="text-[#ef4444]">{issuesCount} issues</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <div className="flex max-md:hidden gap-4 mr-[10px]">
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
        <div className="max-md:flex hidden gap-4 mr-[10px]">
          <ToggleSwitch
            label="Incomplete"
            checked={showIncomplete}
            onChange={() => setShowIncomplete(!showIncomplete)}
          />
          <ToggleSwitch
            label="Issues"
            checked={showIssues}
            onChange={() => setShowIssues(!showIssues)}
          />
        </div>
        <Dropdown expandMode={expandMode} handleExpand={handleExpand} />
      </div>
    </div>
  );
};
