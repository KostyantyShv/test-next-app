import { useState, useEffect } from "react";
import { Drawer } from "./Drawer";
import { TeamMember } from "../../types";

interface EditMemberDrawerProps {
  isOpen: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onSaveChanges: (data: {
    firstName: string;
    lastName: string;
    email: string;
    listingIds: number[];
    isAdmin: boolean;
  }) => void;
  availableListings?: TeamMember["listings"];
}

export const EditMemberDrawer: React.FC<EditMemberDrawerProps> = ({
  isOpen,
  member,
  onClose,
  onSaveChanges,
  availableListings = [],
}) => {
  // Initialize state exactly like desktop version
  const [firstName, setFirstName] = useState(() => {
    if (!member) return '';
    return member.firstName;
  });
  const [lastName, setLastName] = useState(() => {
    if (!member) return '';
    return member.lastName;
  });
  const [email, setEmail] = useState(() => {
    if (!member) return '';
    return member.email;
  });
  const [selectedListingIds, setSelectedListingIds] = useState<number[]>(() => {
    if (!member) return [];
    return member.listings.map((l) => l.id);
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    if (!member) return false;
    return member.isAdmin;
  });

  // Update selected listings when member changes - exactly like desktop
  useEffect(() => {
    if (member) {
      setFirstName(member.firstName);
      setLastName(member.lastName);
      setEmail(member.email);
      setSelectedListingIds(member.listings.map((l) => l.id));
      setIsAdmin(member.isAdmin);
    }
  }, [member?.id, member?.listings?.length, member?.isAdmin]);

  // Clear listings when isAdmin is toggled to true - exactly like desktop
  useEffect(() => {
    if (isAdmin) {
      setSelectedListingIds([]);
    }
  }, [isAdmin]);

  // Toggle listing - exactly like desktop
  const handleToggleListing = (listingId: number) => {
    setSelectedListingIds((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Team Member"
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
            onClick={() => {
              if (!email.trim()) return;
              onSaveChanges({
                firstName,
                lastName,
                email,
                listingIds: isAdmin ? [] : selectedListingIds,
                isAdmin,
              });
            }}
            disabled={!email.trim()}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Save Changes
          </button>
        </>
      }
    >
      <form id="editMemberForm">
        <div className="mb-4">
          <label
            htmlFor="editFirstName"
            className="block mb-1.5"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#464646',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            First Name
          </label>
          <input
            type="text"
            id="editFirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg !bg-white focus:outline-none focus:border-[#0B6333] focus:shadow-[0_0_0_2px_rgba(11,99,51,0.1)]"
            required
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="editLastName"
            className="block mb-1.5"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#464646',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Last Name
          </label>
          <input
            type="text"
            id="editLastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg !bg-white focus:outline-none focus:border-[#0B6333] focus:shadow-[0_0_0_2px_rgba(11,99,51,0.1)]"
            required
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="editEmail"
            className="block mb-1.5"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#464646',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="editEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg !bg-white focus:outline-none focus:border-[#0B6333] focus:shadow-[0_0_0_2px_rgba(11,99,51,0.1)]"
            required
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          />
        </div>
        <div className="flex items-center gap-2.5 mb-4">
          <div className="relative flex-shrink-0">
          <input
            type="checkbox"
            id="editAdminCheckbox"
              className="appearance-none h-5 w-5 border-2 border-gray-300 rounded focus:outline-none"
              style={{
                backgroundColor: isAdmin ? '#0B6333' : 'white',
                borderColor: isAdmin ? '#0B6333' : '#D1D5DB',
              }}
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            {isAdmin && (
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
          <label
            htmlFor="editAdminCheckbox"
            className="cursor-pointer"
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Admin access
          </label>
        </div>
        {!isAdmin && (
          <>
        <div className="h-px bg-gray-200 my-5" />
        <div>
          <h3 
            className="mb-4"
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: '#464646',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Assign to Listings
          </h3>
              {availableListings.map((listing) => {
            const isChecked = selectedListingIds.includes(listing.id);
            return (
            <label
                className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer"
              htmlFor={`editListing${listing.id}`}
              key={listing.id}
            >
                <div className="relative flex-shrink-0">
              <input
                type="checkbox"
                id={`editListing${listing.id}`}
                    className="appearance-none h-5 w-5 border-2 border-gray-300 rounded focus:outline-none"
                    style={{
                      backgroundColor: isChecked ? '#0B6333' : 'white',
                      borderColor: isChecked ? '#0B6333' : '#D1D5DB',
                    }}
                    checked={isChecked}
                    onChange={() => handleToggleListing(listing.id)}
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
        </div>
          </>
        )}
      </form>
    </Drawer>
  );
};
