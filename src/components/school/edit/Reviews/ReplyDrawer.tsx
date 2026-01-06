import { useState, useEffect, useRef } from "react";
import { Review } from "./types/review";

interface ReplyDrawerProps {
  review: Review | null;
  isOpen: boolean;
  isEditMode: boolean;
  onClose: () => void;
  onSave: (reviewId: string, replyText: string) => void;
  onDelete?: (reviewId: string) => void;
}

export default function ReplyDrawer({
  review,
  isOpen,
  isEditMode,
  onClose,
  onSave,
  onDelete,
}: ReplyDrawerProps) {
  const [replyText, setReplyText] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  useEffect(() => {
    if (review) {
      setReplyText(review.reply?.content || "");
      setIsEditing(!!review.reply);
      setShowDeleteConfirmation(false);
    }
  }, [isOpen, review]);

  useEffect(() => {
    if (isOpen && textareaRef.current && !review?.reply) {
      textareaRef.current.focus();
    }
  }, [isOpen, review]);

  if (!review) return null;

  const hasReply = !!review.reply;
  const isDisabled = hasReply && !isEditing;

  const handleSave = () => {
    if (!replyText.trim()) {
      alert("Please enter a reply before saving.");
      return;
    }
    onSave(review.id, replyText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (hasReply && !isEditing) {
      onClose();
    } else {
      setReplyText(review.reply?.content || "");
      setIsEditing(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(review.id);
    }
    setShowDeleteConfirmation(false);
    setReplyText("");
    setIsEditing(false);
    onClose();
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[100] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      />
      
      {/* Drawer */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-[20px] max-h-[90vh] overflow-y-auto transition-transform duration-300 z-[101] ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E5E7EB] flex justify-between items-center">
          <div className="text-lg font-semibold text-[#016853]">Reply to Review</div>
          <button
            onClick={onClose}
            className="w-6 h-6 flex items-center justify-center bg-none border-none cursor-pointer text-[#5F5F5F]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
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

          {/* Reply Section Title */}
          <div className="mb-4">
            <span className="text-[#016853] font-semibold text-sm">
              {isEditing ? "Edit Your Reply" : "Reply to Review"}
            </span>
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirmation && (
            <div className="p-4 bg-[#FFF1F1] rounded-md mb-4 border border-[#FFD6D6]">
              <div className="text-[#4A4A4A] text-sm mb-4">
                Are you sure you want to delete your reply?
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="py-3 bg-white border border-[#E5E7EB] text-[#5F5F5F] rounded-lg text-sm font-medium"
                  onClick={handleCancelDelete}
                >
                  Cancel
                </button>
                <button
                  className="py-3 bg-[#FF4D4D] border-none text-white rounded-lg text-sm font-medium"
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
              <div className="bg-white border border-[#E5E7EB] rounded-lg mb-6 relative overflow-hidden focus-within:border-[#089E68] focus-within:shadow-[0_0_0_2px_rgba(8,158,104,0.1)]">
                {/* School Reply Header */}
                {hasReply && !isEditing && (
                  <div className="flex items-center gap-3 p-3 bg-[#F8F9FA]">
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
                        Replied on {review.reply?.date}
                      </div>
                    </div>
                  </div>
                )}

                {/* Textarea Wrapper */}
                <div className="relative">
                  {/* Reply Actions */}
                  {hasReply && !isEditing && (
                    <div className="absolute top-3.5 right-3 flex gap-3 items-start z-10">
                      <button
                        className="text-[#089E68] text-xs font-medium cursor-pointer bg-none border-none p-0 hover:underline"
                        onClick={handleEdit}
                      >
                        Edit
                      </button>
                      <button
                        className="text-[#089E68] text-xs font-medium cursor-pointer bg-none border-none p-0 hover:underline"
                        onClick={handleDeleteClick}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  <textarea
                    ref={textareaRef}
                    className={`w-full border-none rounded-lg text-sm text-[#4A4A4A] resize-y min-h-[120px] bg-white font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif leading-relaxed ${
                      isDisabled
                        ? "cursor-default pr-[100px] pt-3.5 pb-3 px-4"
                        : "pt-3 pb-3 px-4"
                    } ${hasReply && !isEditing ? "has-actions" : ""}`}
                    placeholder="Enter your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    disabled={isDisabled}
                    style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  />
                </div>
              </div>

              {/* Drawer Buttons */}
              {(!hasReply || isEditing) && (
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="py-3 bg-[#F2F2F2] border border-[#E5E7EB] text-[#5F5F5F] rounded-lg text-sm font-medium"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-3 bg-[#089E68] border-none text-white rounded-lg text-sm font-medium"
                    onClick={handleSave}
                  >
                    Save Reply
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
