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
      // Match provided HTML:
      // - if reply exists: open in "view" mode (disabled textarea + Edit/Delete actions)
      // - if no reply: show editable textarea + buttons (still "Reply to Review" title)
      setIsEditing(Boolean(isEditMode));
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
    // Keep drawer open and reset to "new reply" state (matches provided HTML).
    setShowDeleteConfirmation(false);
    setReplyText("");
    setIsEditing(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? "active" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className={`drawer ${isOpen ? "active" : ""}`}>
          <div className="drawer-header">
            <div className="drawer-title">Reply to Review</div>
            <button type="button" className="drawer-close" onClick={onClose} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="drawer-content">
            <div className="original-review">
              <div className="original-review-header">
                <div className="original-review-avatar">{getInitials(review.author.fullName)}</div>
                <div className="original-review-meta">
                  <div className="original-review-author">
                    {(() => {
                      const parts = review.author.fullName.trim().split(/\s+/);
                      if (parts.length >= 2) return `${parts[0]} ${parts[1][0]}.`;
                      return review.author.fullName;
                    })()}
                  </div>
                  <div className="original-review-date">Reviewed on {review.published.short}</div>
                </div>
              </div>
              <div className="original-review-content">
                This course was absolutely fantastic! The instructor explained complex concepts in a clear and engaging way. The hands-on projects really helped solidify my understanding of Python and data visualization. Highly recommend to anyone looking to get started in data analysis.
              </div>
            </div>

            <div className="reply-section-title">
              {isEditing ? "Edit Your Reply" : "Reply to Review"}
            </div>

            {showDeleteConfirmation && (
              <div className="delete-confirmation">
                <div className="delete-confirmation-text">
                  Are you sure you want to delete your reply?
                </div>
                <div className="delete-confirmation-buttons">
                  <button type="button" className="btn-cancel-delete" onClick={handleCancelDelete}>
                    Cancel
                  </button>
                  <button type="button" className="btn-confirm-delete" onClick={handleConfirmDelete}>
                    Delete Reply
                  </button>
                </div>
              </div>
            )}

            {!showDeleteConfirmation && (
              <div className="reply-content-section">
                <div className="reply-box-container">
                  <div className={`school-reply-header ${hasReply && !isEditing ? "" : "hidden"}`}>
                    <img
                      src="https://i.ibb.co/KpsVRD83/AVATAR-midtone-ux-instrgram.jpg"
                      alt="Lincoln Academy"
                      className="school-reply-avatar"
                    />
                    <div className="school-reply-meta">
                      <div className="school-reply-author">Lincoln Academy</div>
                      <div className="school-reply-date">Replied on {review.reply?.date}</div>
                    </div>
                  </div>

                  <div className="textarea-wrapper">
                    <div className={`reply-actions ${hasReply && !isEditing ? "" : "hidden"}`}>
                      <button type="button" className="reply-action-btn edit-btn" onClick={handleEdit}>
                        Edit
                      </button>
                      <button type="button" className="reply-action-btn delete-btn" onClick={handleDeleteClick}>
                        Delete
                      </button>
                    </div>
                    <textarea
                      ref={textareaRef}
                      className={`review-textarea ${hasReply && !isEditing ? "has-actions" : ""}`}
                      placeholder="Enter your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      disabled={isDisabled}
                    />
                  </div>
                </div>

                {(!hasReply || isEditing) && (
                  <div className="drawer-buttons">
                    <button type="button" className="btn btn-cancel" onClick={handleCancel}>
                      Cancel
                    </button>
                    <button type="button" className="btn btn-save" onClick={handleSave}>
                      Save Reply
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
