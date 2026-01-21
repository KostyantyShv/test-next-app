import { Drawer } from "./Drawer";

interface OptionsDrawerProps {
  isOpen: boolean;
  sortFilter: string;
  onClose: () => void;
  onSortChange: (sort: string) => void;
}

export const OptionsDrawer: React.FC<OptionsDrawerProps> = ({
  isOpen,
  sortFilter,
  onClose,
  onSortChange,
}) => {
  const sortOptions = [
    { value: "name", label: "Name A-Z" },
    { value: "lastActive", label: "Last Active" },
    { value: "email", label: "Email A-Z" },
  ];

  const handleSortChange = (value: string) => {
    onSortChange(value);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Options">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <h3
          className="px-4 pb-3"
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#464646',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          Sort By
        </h3>
        <div className="flex flex-col">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-3 cursor-pointer transition-colors ${
                sortFilter === option.value
                  ? "bg-gray-50"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleSortChange(option.value)}
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{
                  fontSize: '15px',
                  color: sortFilter === option.value ? '#0B6333' : '#4A4A4A',
                  fontWeight: sortFilter === option.value ? 500 : 400,
                }}
              >
                <span>{option.label}</span>
                {sortFilter === option.value && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: '18px', height: '18px', color: '#0B6333' }}
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3
          className="px-4 pb-3"
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#464646',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          Layout
        </h3>
        <div className="flex flex-col">
          <div
            className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            <div className="flex items-center justify-between">
              <span>List View</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: '18px', height: '18px', color: '#0B6333' }}
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
          </div>
          <div
            className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
            style={{
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
          >
            Grid View
          </div>
        </div>
      </div>
    </Drawer>
  );
};
