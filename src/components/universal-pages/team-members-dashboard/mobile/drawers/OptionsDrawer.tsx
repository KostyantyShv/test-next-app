import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { bulkActionOptions } from "../../data/filter-options";
import { useToast } from "../hooks/useToast";

interface OptionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OptionsDrawer({ isOpen, onClose }: OptionsDrawerProps) {
  const { showToast } = useToast();

  const handleBulkAction = (action: string) => {
    if (action) {
      showToast(`Performing bulk action: ${action}`, "info");
    }
    onClose();
  };

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-bold-text">Options</h2>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close Options"
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
        {bulkActionOptions.map((option) => (
          <button
            key={option.value}
            className="flex w-full items-center px-5 py-4 text-base text-text-default transition-colors hover:bg-gray-100 disabled:text-gray-400"
            onClick={() => handleBulkAction(option.value)}
            disabled={!option.value}
          >
            <span className="flex-1 text-left">{option.label}</span>
          </button>
        ))}
      </div>
    </MobileDrawer>
  );
}
