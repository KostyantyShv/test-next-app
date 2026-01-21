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
        className={`fixed bottom-0 left-0 w-full max-h-[70%] bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-[3000] transition-all duration-300 overflow-y-auto scrollbar-hide ${
          isOpen ? "bottom-0 visible" : "bottom-[-100%] invisible"
        }`}
      >
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center z-10">
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
            className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
            onClick={onClose}
            aria-label="Close Drawer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto flex-grow">{children}</div>
        {footer && (
          <div className="p-4 border-t border-gray-200 bg-white sticky bottom-0 flex justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </>
  );
};
