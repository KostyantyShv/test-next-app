import { useEffect } from "react";
import AcceptanceRateSection from "./AcceptanceRateSection";
import AdmissionsStatsSection from "./AdmissionsStatsSection";
import DeadlinesSection from "./DeadlinesSection";
import RequirementsSection from "./RequirementsSection";
import WillYouGetInSection from "./WillYouGetInSection";
import styles from "./AdmissionsModalDesktop.module.css";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdmissionsModalDesktop({
  isOpen,
  onClose,
}: PopupProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]"
      onClick={onClose}
    >
      <div
        className={`${styles.scrollbar} bg-white w-[875px] max-h-[90vh] rounded-xl p-8 relative overflow-y-auto shadow-[0_4px_24px_rgba(0,0,0,0.15)]`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-6 bg-transparent border-none cursor-pointer text-[#5F5F5F] p-1"
          onClick={onClose}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <AcceptanceRateSection />
        <WillYouGetInSection />
        <AdmissionsStatsSection />
        <DeadlinesSection />
        <RequirementsSection />
      </div>
    </div>
  );
}
