import { Drawer } from "./Drawer";

interface TeamTypeDrawerProps {
  isOpen: boolean;
  currentTeamType: string;
  onClose: () => void;
  onTeamTypeChange: (type: string) => void;
}

export const TeamTypeDrawer: React.FC<TeamTypeDrawerProps> = ({
  isOpen,
  currentTeamType,
  onClose,
  onTeamTypeChange,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Select View">
      <div className="p-2">
        <button
          className={`w-full text-left px-5 py-4 text-base border-b border-gray-100 hover:bg-gray-100 ${
            currentTeamType === "team"
              ? "font-semibold text-green-800"
              : "text-gray-600"
          }`}
          onClick={() => onTeamTypeChange("team")}
        >
          Team
        </button>
        <button
          className={`w-full text-left px-5 py-4 text-base hover:bg-gray-100 ${
            currentTeamType === "collaborators"
              ? "font-semibold text-green-800"
              : "text-gray-600"
          }`}
          onClick={() => onTeamTypeChange("collaborators")}
        >
          Collaborators
        </button>
      </div>
    </Drawer>
  );
};
