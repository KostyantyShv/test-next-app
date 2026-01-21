import { useState, useEffect } from "react";
import { Drawer } from "./Drawer";
import { TeamMember } from "../../types";

interface AssignToListingDrawerProps {
  isOpen: boolean;
  currentMemberId: number | null;
  members: TeamMember[];
  onClose: () => void;
  onSave: (memberId: number, selectedListingIds: number[]) => void;
}

const allListings = [
  {
    id: 1,
    name: "Harvard University",
    image: "https://i.ibb.co/fGKH7fDq/product2.png",
  },
  {
    id: 2,
    name: "Stanford University",
    image: "https://i.ibb.co/fGKH7fDq/product2.png",
  },
  {
    id: 3,
    name: "Massachusetts Institute of Technology",
    image: "https://i.ibb.co/63Y8x85/product3.jpg",
  },
];

export const AssignToListingDrawer: React.FC<AssignToListingDrawerProps> = ({
  isOpen,
  currentMemberId,
  members,
  onClose,
  onSave,
}) => {
  const currentMember = members.find((m) => m.id === currentMemberId);
  const currentListingIds = currentMember?.listings.map((l) => l.id) || [];

  const [selectedListingIds, setSelectedListingIds] = useState<number[]>([]);

  useEffect(() => {
    if (isOpen && currentMember) {
      const listingIds = currentMember.listings.map((l) => l.id);
      setSelectedListingIds(listingIds);
    }
  }, [isOpen, currentMemberId, currentMember]);

  const handleCheckboxChange = (listingId: number) => {
    setSelectedListingIds((prev) => {
      if (prev.includes(listingId)) {
        return prev.filter((id) => id !== listingId);
      } else {
        return [...prev, listingId];
      }
    });
  };

  const handleSave = () => {
    if (currentMemberId) {
      onSave(currentMemberId, selectedListingIds);
      onClose();
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Assign to Listing"
      footer={
        <>
          <button
            className="px-5 py-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100"
            onClick={onClose}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#4B5563',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Cancel
          </button>
          <button
            className="px-5 py-3 rounded-lg text-white bg-[#1B1B1B] hover:bg-black"
            onClick={handleSave}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Save
          </button>
        </>
      }
    >
      <form id="assignListingsForm">
        {allListings.map((listing) => {
          const isChecked = selectedListingIds.includes(listing.id);
          return (
            <label
              className="flex items-center gap-3 p-3 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
              htmlFor={`assignListing${listing.id}`}
              key={listing.id}
            >
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  id={`assignListing${listing.id}`}
                  className="appearance-none h-5 w-5 border-2 border-gray-300 rounded focus:outline-none"
                  style={{
                    backgroundColor: isChecked ? '#0B6333' : 'white',
                    borderColor: isChecked ? '#0B6333' : '#D1D5DB',
                  }}
                  checked={isChecked}
                  onChange={() => handleCheckboxChange(listing.id)}
                />
                {isChecked && (
                  <svg
                    className="absolute top-0 left-0 pointer-events-none"
                    viewBox="0 0 20 20"
                    fill="none"
                    style={{ width: '20px', height: '20px' }}
                  >
                    <path
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      fill="white"
                    />
                  </svg>
                )}
              </div>
              <img
                src={listing.image}
                alt={listing.name}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <span
                className="flex-1 truncate"
                style={{
                  fontSize: '15px',
                  color: '#4A4A4A',
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
                }}
              >
                {listing.name}
              </span>
            </label>
          );
        })}
      </form>
    </Drawer>
  );
};
