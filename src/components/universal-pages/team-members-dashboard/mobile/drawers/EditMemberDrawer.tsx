import { Drawer } from "./Drawer";

interface EditMemberDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveChanges: () => void;
}

export const EditMemberDrawer: React.FC<EditMemberDrawerProps> = ({
  isOpen,
  onClose,
  onSaveChanges,
}) => {
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
      title="Edit Team Member"
      footer={
        <>
          <button
            className="px-5 py-3 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-3 rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
            onClick={onSaveChanges}
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
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            First Name
          </label>
          <input
            type="text"
            id="editFirstName"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="editLastName"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Last Name
          </label>
          <input
            type="text"
            id="editLastName"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="editEmail"
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Email
          </label>
          <input
            type="email"
            id="editEmail"
            className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-600 focus:outline-none focus:border-green-800 focus:ring-2 focus:ring-green-100"
            required
          />
        </div>
        <div className="flex items-center gap-2.5 mb-4">
          <input
            type="checkbox"
            id="editAdminCheckbox"
            className="appearance-none h-5 w-5 border-2 border-gray-300 rounded checked:bg-green-800 checked:border-green-800 focus:outline-none"
          />
          <label
            htmlFor="editAdminCheckbox"
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
              htmlFor={`editListing${listing.id}`}
              key={listing.id}
            >
              <input
                type="checkbox"
                id={`editListing${listing.id}`}
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
