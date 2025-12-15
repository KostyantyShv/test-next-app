import { useState } from "react";
import { Drawer } from "./Drawer";

interface AddMemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSendInvitation: (data: {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
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

  const handleSubmit = () => {
    if (!email.trim()) return;
    onSendInvitation({ firstName, lastName, email, isAdmin });
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
            className="px-5 py-3 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-3 rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900 disabled:opacity-60"
            onClick={handleSubmit}
            disabled={!email.trim()}
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
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-100"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-100"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-100"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2.5 mb-4">
          <input
            type="checkbox"
            id="adminCheckbox"
            className="appearance-none h-5 w-5 border-2 border-gray-300 rounded checked:bg-green-800 checked:border-green-800 focus:outline-none"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label
            htmlFor="adminCheckbox"
            className="text-sm text-gray-600 cursor-pointer"
          >
            Admin access
          </label>
        </div>
        <div className="h-px bg-gray-200 my-5" />
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-4">
            Assign to Listings
          </h3>
          {listings.map((listing) => (
            <label
              className="flex items-center gap-3 p-3 border-b border-gray-200 last:border-b-0 cursor-pointer"
              htmlFor={`listing${listing.id}`}
              key={listing.id}
            >
              <input
                type="checkbox"
                id={`listing${listing.id}`}
                className="appearance-none h-5 w-5 border-2 border-gray-300 rounded checked:bg-green-800 checked:border-green-800 focus:outline-none"
                value={listing.id}
              />
              <img
                src={listing.image}
                alt={listing.name}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <span className="text-sm text-gray-600 flex-1 truncate">
                {listing.name}
              </span>
            </label>
          ))}
        </div>
      </form>
    </Drawer>
  );
};
