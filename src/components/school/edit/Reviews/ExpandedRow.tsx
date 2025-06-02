import { memo, useState, useEffect, useRef } from "react";
import { Review } from "./types/review";

interface ExpandedRowProps {
  review: Review;
  onCancel: (reviewId: string) => void;
  onSave: (reviewId: string, replyText: string) => void;
}

function ExpandedRow({ review, onCancel, onSave }: ExpandedRowProps) {
  const [replyText, setReplyText] = useState(review.reply?.content || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <tr className="expanded-content">
      <td colSpan={8} className="p-0 bg-transparent border-none">
        <div className="px-4 pb-4 pt-2">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            {review.reply && (
              <div className="mb-6">
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
            <textarea
              ref={textareaRef}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 min-h-[120px] resize-y focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="Write your reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                className="py-3 bg-gray-100 border border-gray-200 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200"
                onClick={() => onCancel(review.id)}
              >
                Cancel
              </button>
              <button
                className="py-3 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                onClick={() => onSave(review.id, replyText)}
              >
                Save Reply
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}

export default memo(ExpandedRow);
