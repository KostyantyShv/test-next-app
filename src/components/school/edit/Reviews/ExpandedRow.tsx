import { useState, useEffect, useRef } from "react";

interface Review {
  id: string;
  reply?: { content: string; date: string };
}

interface ExpandedRowProps {
  review: Review;
  onCancel: (reviewId: string) => void;
  onSave: (reviewId: string, replyText: string) => void;
}

export default function ExpandedRow({
  review,
  onCancel,
  onSave,
}: ExpandedRowProps) {
  const [replyText, setReplyText] = useState(review.reply?.content || "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <tr className="expanded-content">
      <td colSpan={8} className="p-0">
        <div className="bg-[#EBFCF4] p-6 rounded-lg m-4 mb-4 border-b border-[#E5E7EB]">
          <div className="font-semibold text-sm mb-6 text-[#016853]">
            {review.reply ? "Edit Reply" : "Reply to Review"}
          </div>
          <textarea
            ref={textareaRef}
            className="w-full p-3 border border-[#E5E7EB] rounded-lg text-sm text-[#4A4A4A] resize-y min-h-[100px] mb-6 bg-white focus:outline-none focus:border-[#089E68] focus:ring-2 focus:ring-[rgba(8,158,104,0.1)]"
            placeholder="Write your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
          <div className="flex justify-end gap-4">
            <button
              className="px-5 py-2.5 rounded-md bg-white border border-[#E5E7EB] text-[#5F5F5F] text-sm font-medium hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-all"
              onClick={() => onCancel(review.id)}
            >
              Cancel
            </button>
            <button
              className="px-5 py-2.5 rounded-md bg-[#089E68] border-none text-white text-sm font-medium hover:bg-[#0B6333] transition-all"
              onClick={() => onSave(review.id, replyText)}
            >
              {review.reply ? "Update Reply" : "Save Reply"}
            </button>
          </div>
          {review.reply && (
            <div className="mt-5 p-4 bg-[#F8F9FA] rounded-[10px] border border-[#E5E7EB]">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://i.ibb.co/KpsVRD83/AVATAR-midtone-ux-instrgram.jpg"
                  alt="Lincoln Academy"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="text-[#016853] font-semibold text-sm mb-1">
                    Lincoln Academy
                  </div>
                  <div className="text-[#5F5F5F] text-xs">
                    Replied on {review.reply.date}
                  </div>
                </div>
              </div>
              <div className="text-[#5F5F5F] text-sm leading-relaxed">
                {review.reply.content}
              </div>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}
