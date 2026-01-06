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
    <div className="px-8 max-md:px-4 py-6 max-md:py-4 border-b max-md:border-b max-md:border-[#E5E7EB] max-md:sticky max-md:top-0 max-md:z-[100] max-md:bg-white" style={{ borderColor: 'var(--border-color)' }}>
      {/* Desktop Layout */}
      <div className="max-md:hidden flex justify-between items-center">
        <div className="flex items-center gap-6">
          <p className="text-xl font-semibold whitespace-nowrap" style={{ color: 'var(--header-green)' }}>
            Listing Checklist
          </p>
          <div className="flex items-center gap-4">
            <div className="w-[240px] relative">
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
        <div className="flex items-center gap-4">
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

      {/* Mobile Layout */}
      <div className="hidden max-md:block">
        <h1 className="text-lg max-md:text-lg font-semibold max-md:font-semibold mb-3 max-md:mb-3" style={{ color: 'var(--header-green)' }}>
          Listing Checklist
        </h1>
        <div className="flex flex-col gap-1.5 max-md:gap-1.5 mb-2.5 max-md:mb-2.5">
          <div className="w-full max-md:w-full relative">
            <div className="w-full h-2 max-md:h-2 rounded max-md:rounded" style={{ background: '#e5e7eb' }}>
              <div
                className="h-full absolute top-0 left-0 transition-all rounded max-md:rounded"
                style={{
                  width: `${optionsPercent}%`,
                  background: 'var(--header-green)',
                  zIndex: 1,
                }}
              ></div>
              <div
                className="h-full absolute top-0 left-0 transition-all rounded max-md:rounded"
                style={{
                  width: `${issuesPercent}%`,
                  background: '#ef4444',
                  zIndex: 2,
                }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-[13px] max-md:text-[13px] font-medium max-md:font-medium">
            <span style={{ color: 'var(--header-green)' }}>{incompleteCount} incomplete</span>
            <span style={{ color: '#ef4444' }}>{issuesCount} issues</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-2 max-md:gap-2 flex-wrap max-md:flex-wrap">
          <div className="flex gap-3 max-md:gap-3 items-center max-md:items-center flex-grow max-md:flex-grow">
            <div className="flex items-center gap-1.5 max-md:gap-1.5">
              <span className="text-xs max-md:text-xs whitespace-nowrap max-md:whitespace-nowrap" style={{ color: 'var(--subtle-text)' }}>Incomplete</span>
              <ToggleSwitch
                label=""
                checked={showIncomplete}
                onChange={() => setShowIncomplete(!showIncomplete)}
              />
            </div>
            <div className="flex items-center gap-1.5 max-md:gap-1.5">
              <span className="text-xs max-md:text-xs whitespace-nowrap max-md:whitespace-nowrap" style={{ color: 'var(--subtle-text)' }}>Issues</span>
              <ToggleSwitch
                label=""
                checked={showIssues}
                onChange={() => setShowIssues(!showIssues)}
              />
            </div>
          </div>
          <div className="flex-shrink-0 max-md:flex-shrink-0">
            <Dropdown expandMode={expandMode} handleExpand={handleExpand} />
          </div>
        </div>
      </div>
    </div>
  );
};
