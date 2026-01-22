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
      <div
        style={{
          padding: '8px 0',
          borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            padding: '16px 16px 8px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#464646',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          Sort By
        </div>
        <div className="flex flex-col">
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer transition-colors"
              onClick={() => handleSortChange(option.value)}
              style={{
                padding: '12px 16px',
                fontSize: '15px',
                color: sortFilter === option.value ? '#0093B0' : '#4A4A4A',
                fontWeight: sortFilter === option.value ? 600 : 400,
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                if (sortFilter !== option.value) {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
        >
              {option.label}
            </div>
          ))}
        </div>
        </div>
        <div
        style={{
          padding: '8px 0',
        }}
      >
        <div
          style={{
            padding: '16px 16px 8px',
            fontSize: '16px',
            fontWeight: 500,
            color: '#464646',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
          }}
        >
          Layout
        </div>
        <div className="flex flex-col">
          <div
            className="cursor-pointer transition-colors"
            style={{
              padding: '12px 16px',
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
        >
            List View
        </div>
        <div
            className="cursor-pointer transition-colors"
            style={{
              padding: '12px 16px',
              fontSize: '15px',
              color: '#4A4A4A',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif",
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F3F4F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
        >
            Grid View
        </div>
        </div>
      </div>
    </Drawer>
  );
};
