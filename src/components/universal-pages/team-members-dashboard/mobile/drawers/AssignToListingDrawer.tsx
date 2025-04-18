import { useState } from "react";
import { useTeam } from "../hooks/useTeam";
import { useToast } from "../hooks/useToast";
import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface AssignToListingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AssignToListingDrawer({
  isOpen,
  onClose,
}: AssignToListingDrawerProps) {
  const { members, setMembers, currentMemberId } = useTeam();
  const [listing, setListing] = useState("");
  const { showToast } = useToast();

  const handleAssign = () => {
    if (listing.trim()) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === currentMemberId
            ? {
                ...m,
                listings: [
                  ...m.listings,
                  {
                    id: Date.now(),
                    name: listing,
                    image: "https://i.ibb.co/fGKH7fDq/product2.png",
                  },
                ],
              }
            : m
        )
      );
      showToast(`Assigned to ${listing}`, "success");
      setListing("");
      onClose();
    } else {
      showToast("Please enter a listing name", "error");
    }
  };

  return (
    <MobileDrawer isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
        <h2 className="text-lg font-semibold text-bold-text">
          Assign to Listing
        </h2>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100"
          onClick={onClose}
          aria-label="Close Assign to Listing"
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
      <div className="px-5 py-4">
        <label
          htmlFor="listing"
          className="mb-2 block text-sm font-medium text-bold-text"
        >
          Listing Name
        </label>
        <input
          id="listing"
          type="text"
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-text-default focus:border-active-green focus:outline-none focus:ring-2 focus:ring-active-green/10"
          placeholder="Enter listing name"
          value={listing}
          onChange={(e) => setListing(e.target.value)}
        />
      </div>
      <div className="sticky bottom-0 border-t border-gray-200 bg-white px-5 py-4">
        <button
          className="w-full rounded-lg bg-apply-button-bg px-4 py-2.5 text-sm font-semibold text-active-green transition-colors hover:bg-apply-button-hover"
          onClick={handleAssign}
        >
          Assign
        </button>
      </div>
    </MobileDrawer>
  );
}
