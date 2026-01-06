import React, { useState, useCallback } from "react";
import ReviewRow from "./ReviewRow";
import ExpandedRow from "./ExpandedRow";
import Pagination from "./Pagination";
import ReplyDrawer from "./ReplyDrawer";
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
  const [activeReview, setActiveReview] = useState<Review | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
      setActiveReview(review);
      setIsEditMode(!!review.reply);
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
    setActiveReview(null);
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
    setActiveReview(null);
  }, []);

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
    setExpandedRow(null);
    setActiveDropdown(null);
    setIsDrawerOpen(false);
    setActiveReview(null);
  }, []);

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
      <div className="block md:hidden space-y-4">
        {paginatedReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl p-4 shadow-sm"
            data-review-id={review.id}
            data-has-reply={review.reply ? "true" : "false"}
          >
            <div className="flex items-center gap-3 mb-4 relative">
              <button
                className="w-7 h-7 rounded-md bg-[#F1F3F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
                onClick={() => toggleRow(review.id)}
              >
                <svg
                  height="16"
                  width="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${
                    expandedRow === review.id ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <div className="relative group flex-grow">
                <span className="font-semibold text-[#016853] text-sm">
                  {(() => {
                    const parts = review.author.fullName.trim().split(/\s+/);
                    if (parts.length >= 2) {
                      return `${parts[0]} ${parts[1][0]}.`;
                    }
                    return review.author.fullName;
                  })()}
                </span>
                <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-[#464646] text-white text-xs rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap">
                  {review.author.fullName}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-[#464646] border-x-transparent border-b-transparent"></span>
                </span>
              </div>
              <div className="relative">
                <button
                  className="w-7 h-7 flex items-center justify-center text-[#4A4A4A] font-bold hover:bg-[#F8F9FA] rounded-md transition-colors"
                  onClick={() => toggleDropdown(review.id)}
                >
                  ⋮
                </button>
                <div
                  className={`absolute top-full right-0 bg-white border border-[#E5E7EB] rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] min-w-[200px] z-50 ${
                    activeDropdown === review.id ? "block" : "hidden"
                  }`}
                >
                  <button
                    className="w-full text-left px-4 py-3 text-sm text-[#4A4A4A] hover:bg-[#F8F9FA] flex items-center gap-3 transition-colors"
                    onClick={() => handleReplyClick(review, true)}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      height="18"
                      width="18"
                      fill="currentColor"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fillRule="nonzero"
                        d="M19 1a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-1.263v4l-5.39-4H5a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h14zm0 1.5H5a.5.5 0 0 0-.5.5v14a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM16.25 12a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5zm0-3a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5zm0-3a.75.75 0 1 1 0 1.5h-8.5a.75.75 0 1 1 0-1.5h8.5z"
                      ></path>
                    </svg>
                    Reply to Review
                  </button>
                  <button className="w-full text-left px-4 py-3 text-sm text-[#4A4A4A] hover:bg-[#F8F9FA] flex items-center gap-3 transition-colors">
                    <svg fill="none" viewBox="0 0 20 20" width="18" height="18" className="text-[#5F5F5F]">
                      <path
                        fill="currentColor"
                        d="M3.38189 10C5.24313 12.9154 7.45153 14.25 10 14.25C12.5485 14.25 14.7569 12.9154 16.6181 10C14.7569 7.0846 12.5485 5.75 10 5.75C7.45153 5.75 5.24313 7.0846 3.38189 10ZM1.85688 9.61413C3.94664 6.13119 6.65833 4.25 10 4.25C13.3417 4.25 16.0534 6.13119 18.1431 9.61413C18.2856 9.85164 18.2856 10.1484 18.1431 10.3859C16.0534 13.8688 13.3417 15.75 10 15.75C6.65833 15.75 3.94664 13.8688 1.85688 10.3859C1.71437 10.1484 1.71437 9.85164 1.85688 9.61413ZM8.29116 8.29116C8.74437 7.83795 9.35906 7.58333 10 7.58333C10.6409 7.58333 11.2556 7.83795 11.7088 8.29116C12.1621 8.74437 12.4167 9.35906 12.4167 10C12.4167 10.6409 12.1621 11.2556 11.7088 11.7088C11.2556 12.1621 10.6409 12.4167 10 12.4167C9.35906 12.4167 8.74437 12.1621 8.29116 11.7088C7.83795 11.2556 7.58333 10.6409 7.58333 10C7.58333 9.35906 7.83795 8.74437 8.29116 8.29116ZM10 9.08333C9.75689 9.08333 9.52373 9.17991 9.35182 9.35182C9.17991 9.52373 9.08333 9.75689 9.08333 10C9.08333 10.2431 9.17991 10.4763 9.35182 10.6482C9.52373 10.8201 9.75689 10.9167 10 10.9167C10.2431 10.9167 10.4763 10.8201 10.6482 10.6482C10.8201 10.4763 10.9167 10.2431 10.9167 10C10.9167 9.75689 10.8201 9.52373 10.6482 9.35182C10.4763 9.17991 10.2431 9.08333 10 9.08333Z"
                      ></path>
                    </svg>
                    View Review
                  </button>
                  {review.reply && (
                    <>
                      <div className="h-px bg-[#E0E0E0] my-2"></div>
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-[#FF4D4D] hover:bg-[#FFF1F1] flex items-center gap-3 transition-colors"
                        onClick={() => handleDelete(review.id)}
                      >
                        <svg viewBox="0 0 20 20" width="18" height="18">
                          <g fillRule="nonzero" fill="#F44336">
                            <path d="M11.429 2.357c1.014 0 1.845.783 1.922 1.778l.006.15v1.43a.5.5 0 0 1-.992.09l-.008-.09v-1.43a.93.93 0 0 0-.82-.922l-.108-.006H8.57a.93.93 0 0 0-.922.82l-.006.109v1.428a.5.5 0 0 1-.992.09l-.008-.09V4.286c0-1.015.783-1.846 1.778-1.923l.15-.006z"></path>
                            <path d="M16.429 5.214a.5.5 0 0 1 .09.992l-.09.008H3.57a.5.5 0 0 1-.09-.992l.09-.008z"></path>
                            <path d="M15 5.214H5a.5.5 0 0 0-.5.5v10c0 1.065.863 1.929 1.929 1.929h7.142a1.93 1.93 0 0 0 1.929-1.929v-10a.5.5 0 0 0-.5-.5m-9.5 1h większą9v9.5a.93.93 0 0 1-.929.929H6.43l-.109-.006a.93.93 0 0 1-.82-.923z"></path>
                          </g>
                        </svg>
                        Delete Reply
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm text-gray-700">
              <span className="text-xs uppercase text-[#5F5F5F]">Title</span>
              <div className="relative group">
                <span className="text-[#4A4A4A] line-clamp-3 block overflow-hidden">{review.title.short}</span>
                <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-[#464646] text-white text-xs rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap">
                  {review.title.full}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-[#464646] border-x-transparent border-b-transparent"></span>
                </span>
              </div>
              <span className="text-xs uppercase text-[#5F5F5F]">Rating</span>
              <div className="flex items-center gap-1 font-semibold text-[#089E68]">
                <span className="text-[#00DF8B]">★</span>
                <span>{review.rating}</span>
              </div>
              <span className="text-xs uppercase text-[#5F5F5F]">Published</span>
              <div className="relative group">
                <span className="text-[#5F5F5F]">{review.published.short}</span>
                <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-[#464646] text-white text-xs rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap">
                  {review.published.full}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-[#464646] border-x-transparent border-b-transparent"></span>
                </span>
              </div>
              <span className="text-xs uppercase text-[#5F5F5F]">Votes</span>
              <div className="flex items-center gap-[6px] text-[#5F5F5F] font-medium">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  width="18"
                  height="18"
                  className="text-[#5F5F5F]"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                {review.votes}
              </div>
              <span className="text-xs uppercase text-[#5F5F5F]">Featured</span>
              <label className="relative inline-block w-9 h-5">
                <input
                  type="checkbox"
                  checked={review.featured}
                  onChange={() => handleToggleFeatured(review.id)}
                  className="opacity-0 w-0 h-0"
                />
                <span
                  className={`absolute cursor-pointer inset-0 rounded-full transition-colors ${
                    review.featured ? "bg-[#0B6333]" : "bg-[#E5E7EB]"
                  }`}
                ></span>
                <span
                  className={`absolute h-4 w-4 left-0.5 bottom-0.5 bg-white rounded-full transition-transform ${
                    review.featured ? "translate-x-4" : ""
                  }`}
                ></span>
              </label>
            </div>
            {expandedRow === review.id && review.reply && (
              <div className="mt-4 p-4 bg-[#EBFCF4] rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://i.ibb.co/KpsVRD83/AVATAR-midtone-ux-instrgram.jpg"
                    alt="Lincoln Academy"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#016853]">
                      Lincoln Academy
                    </div>
                    <div className="text-xs text-[#5F5F5F]">
                      Replied on {review.reply.date}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-[#4A4A4A]">
                  {review.reply.content}
                </div>
              </div>
            )}
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

      <ReplyDrawer
        review={activeReview}
        isOpen={isDrawerOpen}
        isEditMode={isEditMode}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
