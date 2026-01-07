import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";
import { useState } from "react";
import { ReviewsModalContent } from "./ReviewsModalContent";
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";

export default function ReviewsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const openReviews = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeReviews = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <button
        className="flex items-center gap-2 px-4 py-2 text-[#346DC2] font-semibold text-sm rounded-full hover:bg-[#346DC2]/10 transition-colors"
        onClick={openReviews}
      >
        <span>VIEW ALL REVIEWS</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
      <div className="block md:hidden">
        <MobileDrawer isOpen={isOpen} onClose={closeReviews}>
          <ReviewsModalContent onClose={closeReviews} />
        </MobileDrawer>
      </div>
      <div className="hidden md:block">
        <DesktopModal isOpen={isOpen} onClose={closeReviews} className="w-[800px]">
          <ReviewsModalContent onClose={closeReviews} />
        </DesktopModal>
      </div>
    </>
  );
}
