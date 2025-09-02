import { FC, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Icon } from '@/components/ui/Icon';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamically import EmojiPicker to avoid SSR issues
const EmojiPicker = dynamic(
  () => import('emoji-picker-react').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <div className="w-full h-[350px] bg-gray-100 rounded-xl flex items-center justify-center">Loading emoji picker...</div>
  }
);

// Type for emoji data
interface EmojiClickData {
  emoji: string;
  unified: string;
  names: string[];
  activeSkinTone: string;
}

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PrivacyOption {
  id: 'secret' | 'shareable';
  label: string;
  description: string;
  icon: 'lock' | 'share';
}

const privacyOptions: PrivacyOption[] = [
  {
    id: 'secret',
    label: 'Secret',
    description: 'Only owner and contributors can view',
    icon: 'lock'
  },
  {
    id: 'shareable',
    label: 'Shareable',
    description: 'Anyone with the link can view',
    icon: 'share'
  }
];

export const CreateCollectionModal: FC<CreateCollectionModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacy, setPrivacy] = useState<PrivacyOption['id']>('shareable');
  const [isPrivacyDropdownOpen, setIsPrivacyDropdownOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

  const selectedPrivacy = privacyOptions.find(option => option.id === privacy)!;

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setSelectedEmoji(emojiData.emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle collection creation with emoji
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="rounded-3xl">
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Collection</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <Icon name="close" size="sm" className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title with Emoji */}
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
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="relative">
                {selectedEmoji ? (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                      className="h-[48px] w-[48px] bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                      aria-label="Change emoji"
                    >
                      <span className="text-4xl relative z-10">{selectedEmoji}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedEmoji('')}
                      className="absolute -top-1.5 -right-1.5 p-1 bg-white rounded-full border border-gray-200 shadow-sm hover:bg-gray-100"
                      aria-label="Remove emoji"
                    >
                      <Icon name="close" size="xs" className="text-gray-500" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                    className="h-[48px] w-[48px] bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                    aria-label="Choose emoji"
                  >
                    <Icon name="plus" size="sm" className="text-gray-500" />
                  </button>
                )}

                {/* Emoji Picker Popover */}
                {isEmojiPickerOpen && (
                  <div className="absolute right-0 mt-1 z-50">
                    <div 
                      className="fixed inset-0" 
                      onClick={() => setIsEmojiPickerOpen(false)}
                    />
                    <div className="relative">
                      <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        width={320}
                        height={400}
                      />
                    </div>
                  </div>
                )}
              </div>
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
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
            />
          </div>

          {/* Privacy */}
          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-gray-700">Privacy</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPrivacyDropdownOpen(!isPrivacyDropdownOpen)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Icon name={selectedPrivacy.icon} size="sm" className="text-gray-500" />
                  <span className="text-sm text-gray-900">{selectedPrivacy.label}</span>
                </div>
                <Icon 
                  name="chevron-down" 
                  size="sm" 
                  className={cn(
                    "text-gray-500 transition-transform",
                    isPrivacyDropdownOpen && "rotate-180"
                  )} 
                />
              </button>

              {/* Dropdown Menu */}
              {isPrivacyDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                  {privacyOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setPrivacy(option.id);
                        setIsPrivacyDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full px-4 py-2 text-left flex items-center gap-3",
                        "hover:bg-gray-50",
                        "first:rounded-t-lg last:rounded-b-lg",
                        privacy === option.id && "bg-blue-50"
                      )}
                    >
                      <Icon name={option.icon} size="sm" className="text-gray-500" />
                      <div>
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {option.label}
                          {privacy === option.id && (
                            <Icon name="check" size="sm" className="text-blue-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!title.trim()}
            className={cn(
              "w-full px-4 py-2.5 rounded-2xl transition-colors",
              "text-white",
              title.trim() 
                ? "bg-blue-500 hover:bg-blue-600" 
                : "bg-blue-300 cursor-not-allowed"
            )}
          >
            Create
          </button>
        </form>
      </div>
    </Modal>
  );
}; 