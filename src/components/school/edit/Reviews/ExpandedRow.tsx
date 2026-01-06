import { memo, useState, useEffect, useRef } from "react";
import { Review } from "./types/review";

interface ExpandedRowProps {
  review: Review;
  onCancel: (reviewId: string) => void;
  onSave: (reviewId: string, replyText: string) => void;
  onDelete: (reviewId: string) => void;
}

function ExpandedRow({ review, onCancel, onSave, onDelete }: ExpandedRowProps) {
  const [replyText, setReplyText] = useState(review.reply?.content || "");
  const [isEditMode, setIsEditMode] = useState(!review.reply);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update replyText when review.reply changes
  useEffect(() => {
    setReplyText(review.reply?.content || "");
    setIsEditMode(!review.reply);
  }, [review.reply]);

  useEffect(() => {
    if (textareaRef.current && isEditMode) {
      textareaRef.current.focus();
    }
  }, [isEditMode]);

  const hasReply = !!review.reply && !isEditMode;

  const handleCancel = () => {
    if (hasReply) {
      // If reply exists, just disable editing
      setIsEditMode(false);
      setReplyText(review.reply?.content || "");
    } else {
      // No reply: collapse the panel
      onCancel(review.id);
    }
  };

  const handleSave = () => {
    if (!replyText.trim()) {
      alert("Please enter a reply before saving.");
      return;
    }
    onSave(review.id, replyText);
    // Don't set isEditMode to false here - let the useEffect handle it when review.reply updates
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setShowDeleteConfirmation(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    onDelete(review.id);
    setShowDeleteConfirmation(false);
    setIsEditMode(true);
    setReplyText("");
  };

  // Get author initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <tr className="expanded-content">
      <td colSpan={8} className="p-0 bg-transparent border-b border-[#E5E7EB]">
        <div className="p-6 bg-apply-button-bg">
          {/* Original Review */}
          <div className="mb-5 p-4 bg-[#F8F9FA] rounded-[10px] border border-[#E5E7EB]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#089E68] to-[#016853] flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(review.author.fullName)}
              </div>
              <div className="flex-1">
                <div className="text-[#016853] font-semibold text-sm mb-1">
                  {(() => {
                    const parts = review.author.fullName.trim().split(/\s+/);
                    if (parts.length >= 2) {
                      return `${parts[0]} ${parts[1][0]}.`;
                    }
                    return review.author.fullName;
                  })()}
                </div>
                <div className="text-[#5F5F5F] text-xs">
                  Reviewed on {review.published.short}
                </div>
              </div>
            </div>
            <div className="text-[#4A4A4A] text-sm leading-relaxed">
              This course was absolutely fantastic! The instructor explained complex concepts in a clear and engaging way. The hands-on projects really helped solidify my understanding of Python and data visualization. Highly recommend to anyone looking to get started in data analysis.
            </div>
          </div>

          {/* Reply Panel Header */}
          <div className="mb-4">
            <span className="text-[#016853] font-semibold text-sm">
              {hasReply ? "Reply to Review" : "Reply to Review"}
            </span>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirmation && (
            <div className="p-4 bg-[#FFF1F1] rounded-md border border-[#FFD6D6] mb-4">
              <div className="text-[#4A4A4A] text-sm mb-4">
                Are you sure you want to delete your reply?
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-white border border-[#E5E7EB] text-[#5F5F5F] rounded-md text-sm font-medium hover:bg-[#F9FAFB] transition-colors"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#FF4D4D] border-none text-white rounded-md text-sm font-medium hover:bg-[#E63939] transition-colors"
                  onClick={handleConfirmDelete}
                >
                  Delete Reply
                </button>
              </div>
            </div>
          )}

          {/* Reply Content Section */}
          {!showDeleteConfirmation && (
            <div>
              <div className="bg-white border border-[#E5E7EB] rounded-lg mb-4 relative overflow-hidden focus-within:border-[#089E68] focus-within:shadow-[0_0_0_2px_rgba(8,158,104,0.1)] transition-all">
                {/* School Reply Header (shown when reply exists) */}
                {hasReply && review.reply && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#F8F9FA]">
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
                )}

                {/* Textarea Wrapper */}
                <div className="relative">
                  {/* Reply Actions (Edit/Delete) - shown when reply exists */}
                  {hasReply && (
                    <div className="absolute top-3.5 right-3 flex gap-3 items-start z-10">
                      <button
                        className="text-[#089E68] text-xs font-medium hover:text-[#016853] hover:underline transition-colors"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="text-[#089E68] text-xs font-medium hover:text-[#016853] hover:underline transition-colors"
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                  <textarea
                    ref={textareaRef}
                    disabled={hasReply}
                    className={`w-full px-4 py-3 border-none rounded-lg text-sm text-[#4A4A4A] resize-y min-h-[120px] bg-white focus:outline-none font-['Inter'] ${
                      hasReply ? "cursor-default" : ""
                    } ${hasReply ? "pr-24" : ""}`}
                    style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
                    placeholder="Enter your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                </div>
              </div>

              {/* Reply Panel Buttons */}
              {!hasReply && (
                <div className="flex justify-end gap-4">
                  <button
                    className="px-5 py-2.5 bg-white border border-[#E5E7EB] text-[#5F5F5F] rounded-md text-sm font-medium hover:bg-[#F9FAFB] hover:border-[#D1D5DB] transition-colors"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2.5 bg-[#089E68] border-none text-white rounded-md text-sm font-medium hover:bg-[#0B6333] transition-colors"
                    onClick={handleSave}
                  >
                    Save Reply
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

export default memo(ExpandedRow);
