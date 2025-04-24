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
            className="px-5 py-3 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 bg-white hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-5 py-3 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            onClick={onDelete}
          >
            Delete
          </button>
        </>
      }
    >
      <p className="text-center text-base text-gray-700 mb-4">
        Are you sure you want to delete this team member? This action cannot be
        undone.
      </p>
    </Drawer>
  );
};
