import { useState, useEffect } from "react";
import { Drawer } from "./Drawer";

interface AddMemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvitation: (data: {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    listingIds?: number[];
  }) => void;
}

export const AddMemberDrawer: React.FC<AddMemberDrawerProps> = ({
  isOpen,
  onClose,
  onSendInvitation,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedListingIds, setSelectedListingIds] = useState<number[]>([]);

  const handleToggleListing = (listingId: number) => {
    setSelectedListingIds((prev) =>
      prev.includes(listingId)
        ? prev.filter((id) => id !== listingId)
        : [...prev, listingId]
    );
  };

  useEffect(() => {
    if (isAdmin) {
      setSelectedListingIds([]);
    }
  }, [isAdmin]);

  const handleSubmit = () => {
    if (!email.trim()) return;
    onSendInvitation({ 
      firstName, 
      lastName, 
      email, 
      isAdmin,
      listingIds: isAdmin ? [] : selectedListingIds
    });
  };
  const listings = [
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

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Add Team Member"
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
            className="px-5 py-3 rounded-lg text-white bg-[#1B1B1B] hover:bg-black disabled:opacity-60"
            onClick={handleSubmit}
            disabled={!email.trim()}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Send Invitation
          </button>
        </>
      }
    >
      <form id="addMemberForm">
        <div className="mb-4">
          <label
            htmlFor="firstName"
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
            id="firstName"
            className="w-full p-3 border border-gray-300 rounded-lg !bg-white focus:outline-none focus:border-[#0B6333] focus:shadow-[0_0_0_2px_rgba(11,99,51,0.1)]"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
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
            id="lastName"
            className="w-full p-3 border border-gray-300 rounded-lg !bg-white focus:outline-none focus:border-[#0B6333] focus:shadow-[0_0_0_2px_rgba(11,99,51,0.1)]"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
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
            id="email"
            className="w-full p-3 border border-gray-300 rounded-lg !bg-white focus:outline-none focus:border-[#0B6333] focus:shadow-[0_0_0_2px_rgba(11,99,51,0.1)]"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              id="adminCheckbox"
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
            htmlFor="adminCheckbox"
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
          {listings.map((listing) => {
            const isChecked = selectedListingIds.includes(listing.id);
            return (
              <label
                className="flex items-center gap-3 py-3 border-b border-gray-200 last:border-b-0 cursor-pointer"
                htmlFor={`listing${listing.id}`}
                key={listing.id}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    id={`listing${listing.id}`}
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
      </form>
    </Drawer>
  );
};
