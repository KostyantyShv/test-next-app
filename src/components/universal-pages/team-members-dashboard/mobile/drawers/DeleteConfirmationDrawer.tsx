import { Drawer } from "./Drawer";

interface DeleteConfirmationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteConfirmationDrawer: React.FC<
  DeleteConfirmationDrawerProps
> = ({ isOpen, onClose, onDelete }) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Deletion"
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
            className="px-5 py-3 rounded-lg text-white border-transparent"
            onClick={onDelete}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              backgroundColor: '#ef4444',
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
            }}
          >
            Delete
          </button>
        </>
      }
    >
      <p 
        className="text-center mb-4"
        style={{
          fontSize: '16px',
          color: '#464646',
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"
        }}
      >
        Are you sure you want to delete this team member? This action cannot be
        undone.
      </p>
    </Drawer>
  );
};
