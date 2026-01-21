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
            onClick={onSaveChanges}
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B6333] focus:ring-2 focus:ring-[#0B6333]/20"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B6333] focus:ring-2 focus:ring-[#0B6333]/20"
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0B6333] focus:ring-2 focus:ring-[#0B6333]/20"
            required
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          />
        </div>
        <div className="flex items-center gap-2.5 mb-4">
          <input
            type="checkbox"
            id="editAdminCheckbox"
            className="appearance-none h-5 w-5 border-2 border-gray-300 rounded checked:bg-[#0B6333] checked:border-[#0B6333] focus:outline-none"
          />
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
          {listings.map((listing) => (
            <label
              className="flex items-center gap-3 p-3 border-b border-gray-200 last:border-b-0 cursor-pointer"
              htmlFor={`editListing${listing.id}`}
              key={listing.id}
            >
              <input
                type="checkbox"
                id={`editListing${listing.id}`}
                className="appearance-none h-5 w-5 border-2 border-gray-300 rounded checked:bg-[#0B6333] checked:border-[#0B6333] focus:outline-none"
                value={listing.id}
              />
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
          ))}
        </div>
      </form>
    </Drawer>
  );
};
