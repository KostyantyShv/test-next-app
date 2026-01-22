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
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-[2500] transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed bottom-0 left-0 w-full max-h-[90%] bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.15)] z-[3000] transition-all duration-300 overflow-hidden flex flex-col ${
          isOpen ? "bottom-0 visible" : "bottom-[-100%] invisible"
        }`}
      >
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
          className="overflow-y-auto flex-grow"
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
    </>
  );
};

