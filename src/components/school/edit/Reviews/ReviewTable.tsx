import React, { useState, useCallback } from "react";
import ReviewRow from "./ReviewRow";
import ExpandedRow from "./ExpandedRow";
import Pagination from "./Pagination";
import ReplyDrawer from "./ReplyDrawer";
import ActionsDrawer from "./ActionsDrawer";
import { Review } from "./types/review";

interface ReviewTableProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export default function ReviewTable({ reviews, setReviews }: ReviewTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeReviewId, setActiveReviewId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isActionsDrawerOpen, setIsActionsDrawerOpen] = useState(false);
  const [actionsReviewId, setActionsReviewId] = useState<string | null>(null);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  const getPageNumbers = useCallback(() => {
    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  const toggleRow = useCallback((reviewId: string) => {
    setExpandedRow((prev) => (prev === reviewId ? null : reviewId));
    setActiveDropdown(null);
  }, []);

  const toggleDropdown = useCallback((reviewId: string) => {
    setActiveDropdown((prev) => (prev === reviewId ? null : reviewId));
  }, []);

  const closeAllDropdowns = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  const handleReplyClick = useCallback((review: Review, isMobile: boolean) => {
    if (isMobile) {
      setActiveReviewId(review.id);
      setIsDrawerOpen(true);
      setActiveDropdown(null);
    } else {
      setExpandedRow(review.id);
      setActiveDropdown(null);
    }
  }, []);

  const handleCancel = useCallback((reviewId: string) => {
    const review = reviews.find((r) => r.id === reviewId);
    if (!review?.reply) {
      // No reply exists: collapse the panel
    setExpandedRow(null);
    }
    // If reply exists, ExpandedRow will handle it internally
  }, [reviews]);

  const handleSave = useCallback((reviewId: string, replyText: string) => {
    if (!replyText.trim()) {
      alert("Please enter a reply before saving.");
      return;
    }
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, reply: { content: replyText, date: formattedDate } }
          : review
      )
    );
    // Don't close the expanded row - let user see the saved reply
    setIsDrawerOpen(false);
    setActiveReviewId(null);
  }, []);

  const handleDelete = useCallback((reviewId: string) => {
    if (confirm("Are you sure you want to delete this reply?")) {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === reviewId ? { ...review, reply: undefined } : review
        )
      );
    }
  }, []);

  const handleToggleFeatured = useCallback((reviewId: string) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId
          ? { ...review, featured: !review.featured }
          : review
      )
    );
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setExpandedRow(null);
    setActiveDropdown(null);
    setIsDrawerOpen(false);
    setActiveReviewId(null);
  }, []);

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setExpandedRow(null);
    setActiveDropdown(null);
    setIsDrawerOpen(false);
    setActiveReviewId(null);
  }, []);

  const activeReview = activeReviewId
    ? reviews.find((r) => r.id === activeReviewId) ?? null
    : null;
  const actionsReview = actionsReviewId
    ? reviews.find((r) => r.id === actionsReviewId) ?? null
    : null;

  return (
    <div>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <table className="w-full border-separate" style={{ borderSpacing: 0 }}>
          <thead>
            <tr>
              <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-[0.05em] bg-[#F9FAFB] border-b border-[#E5E7EB]"></th>
              <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-[0.05em] bg-[#F9FAFB] border-b border-[#E5E7EB]">
                AUTHOR
              </th>
              <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-[0.05em] bg-[#F9FAFB] border-b border-[#E5E7EB]">
                TITLE
              </th>
              <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-[0.05em] bg-[#F9FAFB] border-b border-[#E5E7EB]">
                RATING
              </th>
              <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-[0.05em] bg-[#F9FAFB] border-b border-[#E5E7EB]">
                PUBLISHED
              </th>
              <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-[0.05em] bg-[#F9FAFB] border-b border-[#E5E7EB]">
                VOTES
              </th>
              <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-[0.05em] bg-[#F9FAFB] border-b border-[#E5E7EB]">
                FEATURED
              </th>
              <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-[0.05em] bg-[#F9FAFB] border-b border-[#E5E7EB]"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedReviews.map((review) => (
              <React.Fragment key={review.id}>
                <ReviewRow
                  review={review}
                  isExpanded={expandedRow === review.id}
                  isDropdownActive={activeDropdown === review.id}
                  onToggleRow={toggleRow}
                  onToggleDropdown={toggleDropdown}
                  onReplyClick={() => handleReplyClick(review, false)}
                  onDelete={handleDelete}
                  onToggleFeatured={handleToggleFeatured}
                />
                {expandedRow === review.id && (
                  <ExpandedRow
                    review={review}
                    onCancel={handleCancel}
                    onSave={handleSave}
                    onDelete={handleDelete}
                  />
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="reviews-mobile-list block md:hidden">
        {paginatedReviews.map((review) => (
          <div
            key={review.id}
            className="review-card"
            data-review-id={review.id}
            data-has-reply={review.reply ? "true" : "false"}
          >
            <div className="card-header">
              <button
                type="button"
                className="expand-button"
                onClick={() => handleReplyClick(review, true)}
                aria-label="Open reply drawer"
              >
                <svg
                  height="16"
                  width="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="expand-icon"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="author-name">
                {(() => {
                  const parts = review.author.fullName.trim().split(/\s+/);
                  if (parts.length >= 2) {
                    return `${parts[0]} ${parts[1][0]}.`;
                  }
                  return review.author.fullName;
                })()}
              </div>
              <button
                type="button"
                className="more-options"
                onClick={() => {
                  setActionsReviewId(review.id);
                  setIsActionsDrawerOpen(true);
                }}
                aria-label="Review actions"
              >
                ⋮
              </button>
            </div>
            <div className="card-content">
              <div className="card-label">Title</div>
              <div>{review.title.short}</div>

              <div className="card-label">Rating</div>
              <div className="rating">
                <span className="star">★</span>
                <span>{review.rating}</span>
              </div>

              <div className="card-label">Published</div>
              <div className="published-date">{review.published.short}</div>

              <div className="card-label">Votes</div>
              <div className="votes">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                <span>{review.votes}</span>
              </div>
              <div className="card-label">Featured</div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={review.featured}
                  onChange={() => handleToggleFeatured(review.id)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPageValue={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        getPageNumbers={getPageNumbers}
      />

      <ActionsDrawer
        review={actionsReview}
        isOpen={isActionsDrawerOpen}
        onClose={() => {
          setIsActionsDrawerOpen(false);
          setActionsReviewId(null);
        }}
        onReply={() => {
          if (actionsReview) {
            handleReplyClick(actionsReview, true);
          }
        }}
        onView={() => {
          alert('View review functionality');
        }}
        onDelete={() => {
          if (actionsReview) {
            handleDelete(actionsReview.id);
          }
        }}
      />
      
      <ReplyDrawer
        review={activeReview}
        isOpen={isDrawerOpen}
        isEditMode={false}
        onClose={() => {
          setIsDrawerOpen(false);
          setActiveReviewId(null);
        }}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
