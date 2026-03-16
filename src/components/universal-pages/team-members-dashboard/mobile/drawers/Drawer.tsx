import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  return (
    <MobileDrawer
      isOpen={isOpen}
      onClose={onClose}
      title={title || "Dialog"}
      showPullIndicator={Boolean(title)}
    >
      <div className="flex min-h-0 flex-col">
        {title && (
          <div className="sticky top-0 bg-white px-5 py-4 border-b border-gray-200 flex justify-between items-center z-10 flex-shrink-0">
            <h2 
              style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#464646',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
              }}
            >
              {title}
            </h2>
          <button
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 active:bg-gray-100 transition-colors"
            onClick={onClose}
            aria-label="Close Drawer"
              style={{
                fontSize: '24px',
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        )}
        <div
          className="flex-grow"
          style={{
            padding: title === '' ? '8px 0' : '16px 20px',
          }}
        >
          {children}
        </div>
        {footer && (
          <div 
            className="bg-white sticky bottom-0 flex justify-end gap-3 flex-shrink-0"
            style={{
              borderTopWidth: title === '' ? '8px' : '1px',
              borderTopColor: title === '' ? '#F3F4F6' : '#E5E7EB',
              borderTopStyle: 'solid',
              padding: title === '' ? '16px 20px' : '16px 20px',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </MobileDrawer>
  );
};
