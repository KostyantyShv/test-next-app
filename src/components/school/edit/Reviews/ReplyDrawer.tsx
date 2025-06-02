import { useState, useEffect, useRef } from "react";
import { Review } from "./types/review";

interface ReplyDrawerProps {
  review: Review | null;
  isOpen: boolean;
  isEditMode: boolean;
  onClose: () => void;
  onSave: (reviewId: string, replyText: string) => void;
}

export default function ReplyDrawer({
  review,
  isOpen,
  isEditMode,
  onClose,
  onSave,
}: ReplyDrawerProps) {
  const [replyText, setReplyText] = useState(review?.reply?.content || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setReplyText(review?.reply?.content || "");
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen, review]);

  if (!review) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-50 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-green-800">
            {isEditMode ? "Edit Reply" : "Reply to Review"}
          </h2>
          <button onClick={onClose} className="text-gray-600">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="p-5">
          <textarea
            ref={textareaRef}
            className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 min-h-[120px] resize-y focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            placeholder="Write your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          {review.reply && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://i.ibb.co/KpsVRD83/AVATAR-midtone-ux-instrgram.jpg"
                  alt="Lincoln Academy"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold text-green-800">
                    Lincoln Academy
                  </div>
                  <div className="text-xs text-gray-600">
                    Replied on {review.reply.date}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {review.reply.content}
              </div>
            </div>
          )}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              className="py-3 bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
              onClick={() => onSave(review.id, replyText)}
            >
              {isEditMode ? "Update Reply" : "Save Reply"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
