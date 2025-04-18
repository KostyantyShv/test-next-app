import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { useTeam } from "../hooks/useTeam";
import { useToast } from "../hooks/useToast";

interface TeamTypeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TeamTypeDrawer({ isOpen, onClose }: TeamTypeDrawerProps) {
  const { teamType, setTeamType } = useTeam();
  const { showToast } = useToast();

  const handleTypeSelect = (type: "team" | "collaborators") => {
    if (type !== teamType) {
      setTeamType(type);
      showToast(
        `Switched view to: ${type.charAt(0).toUpperCase() + type.slice(1)}`,
        "info"
      );
    }
    onClose();
  };

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-bold-text">Select View</h2>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close View Select"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      <div className="px-2 py-2">
        <button
          className={`flex w-full items-center border-b border-gray-100 px-5 py-4 text-base transition-colors hover:bg-gray-100 ${
            teamType === "team"
              ? "font-semibold text-active-green"
              : "text-text-default"
          }`}
          onClick={() => handleTypeSelect("team")}
        >
          <span className="flex-1 text-left">Team</span>
        </button>
        <button
          className={`flex w-full items-center px-5 py-4 text-base transition-colors hover:bg-gray-100 ${
            teamType === "collaborators"
              ? "font-semibold text-active-green"
              : "text-text-default"
          }`}
          onClick={() => handleTypeSelect("collaborators")}
        >
          <span className="flex-1 text-left">Collaborators</span>
        </button>
      </div>
    </MobileDrawer>
  );
}
