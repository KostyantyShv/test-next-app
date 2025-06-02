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
    setExpandedRow(null);
    setReviews((prev) =>
      prev.map((review) =>
        review.id === reviewId && !review.reply
          ? { ...review, reply: undefined }
          : review
      )
    );
  }, []);

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
    setExpandedRow(null);
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
              <th className="text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200"></th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                Author
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                Title
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                Rating
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                Published
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                Votes
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200">
                Featured
              </th>
              <th className="text-left px-4 py-3 text-gray-600 font-medium text-xs uppercase tracking-wider bg-gray-50 border-b border-gray-200"></th>
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
                className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center"
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
                <span className="font-semibold text-green-800 text-sm">
                  {review.author.name}
                </span>
                <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap">
                  {review.author.fullName}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-gray-800 border-x-transparent border-b-transparent"></span>
                </span>
              </div>
              <div className="relative">
                <button
                  className="w-7 h-7 flex items-center justify-center text-gray-600"
                  onClick={() => toggleDropdown(review.id)}
                >
                  ⋮
                </button>
                <div
                  className={`absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] z-50 ${
                    activeDropdown === review.id ? "block" : "hidden"
                  }`}
                >
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3"
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
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-3">
                    <svg fill="none" viewBox="0 0 20 20" width="18" height="18">
                      <path
                        fill="currentColor"
                        d="M3.38189 10C5.24313 12.9154 7.45153 14.25 10 14.25C12.5485 14.25 14.7569 12.9154 16.6181 10C14.7569 7.0846 12.5485 5.75 10 5.75C7.45153 5.75 5.24313 7.0846 3.38189 10ZM1.85688 9.61413C3.94664 6.13119 6.65833 4.25 10 4.25C13.3417 4.25 16.0534 6.13119 18.1431 9.61413C18.2856 9.85164 18.2856 10.1484 18.1431 10.3859C16.0534 13.8688 13.3417 15.75 10 15.75C6.65833 15.75 3.94664 13.8688 1.85688 10.3859C1.71437 10.1484 1.71437 9.85164 1.85688 9.61413ZM8.29116 8.29116C8.74437 7.83795 9.35906 7.58333 10 7.58333C10.6409 7.58333 11.2556 7.83795 11.7088 8.29116C12.1621 8.74437 12.4167 9.35906 12.4167 10C12.4167 10.6409 12.1621 11.2556 11.7088 11.7088C11.2556 12.1621 10.6409 12.4167 10 12.4167C9.35906 12.4167 8.74437 12.1621 8.29116 11.7088C7.83795 11.2556 7.58333 10.6409 7.58333 10C7.58333 9.35906 7.83795 8.74437 8.29116 8.29116ZM10 9.08333C9.75689 9.08333 9.52373 9.17991 9.35182 9.35182C9.17991 9.52373 9.08333 9.75689 9.08333 10C9.08333 10.2431 9.17991 10.4763 9.35182 10.6482C9.52373 10.8201 9.75689 10.9167 10 10.9167C10.2431 10.9167 10.4763 10.8201 10.6482 10.6482C10.8201 10.4763 10.9167 10.2431 10.9167 10C10.9167 9.75689 10.8201 9.52373 10.6482 9.35182C10.4763 9.17991 10.2431 9.08333 10 9.08333Z"
                      ></path>
                    </svg>
                    View Review
                  </button>
                  {review.reply && (
                    <>
                      <div className="h-px bg-gray-200 my-2"></div>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
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
              <span className="text-xs uppercase text-gray-600">Title</span>
              <div className="relative group">
                <span>{review.title.short}</span>
                <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap">
                  {review.title.full}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-gray-800 border-x-transparent border-b-transparent"></span>
                </span>
              </div>
              <span className="text-xs uppercase text-gray-600">Rating</span>
              <div className="flex items-center gap-1 font-semibold text-green-600">
                <span className="text-green-400">★</span>
                <span>{review.rating}</span>
              </div>
              <span className="text-xs uppercase text-gray-600">Published</span>
              <div className="relative group">
                <span>{review.published.short}</span>
                <span className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-[125%] left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded-md py-2 px-3 z-10 min-w-[120px] whitespace-nowrap">
                  {review.published.full}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-t-gray-800 border-x-transparent border-b-transparent"></span>
                </span>
              </div>
              <span className="text-xs uppercase text-gray-600">Votes</span>
              <div className="flex items-center gap-2 text-gray-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                {review.votes}
              </div>
              <span className="text-xs uppercase text-gray-600">Featured</span>
              <label className="relative inline-block w-9 h-5">
                <input
                  type="checkbox"
                  checked={review.featured}
                  onChange={() => handleToggleFeatured(review.id)}
                  className="opacity-0 w-0 h-0"
                />
                <span
                  className={`absolute cursor-pointer inset-0 rounded-full transition-colors ${
                    review.featured ? "bg-green-700" : "bg-gray-300"
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
