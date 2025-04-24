import { Drawer } from "./Drawer";

interface AssignToListingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const AssignToListingDrawer: React.FC<AssignToListingDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
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
      title="Assign to Listing"
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
            onClick={onSave}
          >
            Save
          </button>
        </>
      }
    >
      <form id="assignListingsForm">
        {listings.map((listing) => (
          <label
            className="flex items-center gap-3 p-3 border-b border-gray-200 last:border-b-0 cursor-pointer"
            htmlFor={`assignListing${listing.id}`}
            key={listing.id}
          >
            <input
              type="checkbox"
              id={`assignListing${listing.id}`}
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
      </form>
    </Drawer>
  );
};
