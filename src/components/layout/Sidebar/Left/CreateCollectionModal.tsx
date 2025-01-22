import { FC, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Icon } from '@/components/ui/Icon';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateCollectionModal: FC<CreateCollectionModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState('shareable');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle collection creation
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Collection</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Close modal"
          >
            <Icon name="close" size="sm" className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <span className="text-sm text-gray-500">Emoji</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Collection Name.."
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="p-2 bg-gray-50 border border-gray-200 rounded-lg"
                aria-label="Choose emoji"
              >
                <span className="text-xl">😊</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A space for discussing latest tech insights..."
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
          </div>

          {/* Privacy */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">Privacy</label>
            <button
              type="button"
              onClick={() => setPrivacy(privacy === 'shareable' ? 'private' : 'shareable')}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-left flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Icon name="share" size="sm" className="text-gray-500" />
                <span className="text-sm text-gray-900">Shareable</span>
              </div>
              <Icon name="chevron-down" size="sm" className="text-gray-500" />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create
          </button>
        </form>
      </div>
    </Modal>
  );
}; 