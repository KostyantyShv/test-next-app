import React, { useState, useCallback } from "react";
import ReviewRow from "./ReviewRow";
import ExpandedRow from "./ExpandedRow";
import Pagination from "./Pagination";

interface Review {
  id: string;
  author: { name: string; fullName: string };
  title: { short: string; full: string };
  rating: number;
  published: { short: string; full: string };
  votes: number;
  featured: boolean;
  reply?: { content: string; date: string };
}

interface ReviewTableProps {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export default function ReviewTable({ reviews, setReviews }: ReviewTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Calculate the reviews to display based on pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedReviews = reviews.slice(startIndex, endIndex);

  // Generate page numbers for pagination
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

  const handleReplyClick = useCallback((reviewId: string) => {
    setExpandedRow(reviewId);
    setActiveDropdown(null);
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
          ? {
              ...review,
              reply: {
                content: replyText,
                date: formattedDate,
              },
            }
          : review
      )
    );
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
    setExpandedRow(null); // Close expanded rows when changing pages
    setActiveDropdown(null); // Close dropdowns when changing pages
  }, []);

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page changes
    setExpandedRow(null);
    setActiveDropdown(null);
  }, []);

  return (
    <div>
      <table
        className="w-full border-separate"
        style={{ borderSpacing: 0 }}
        onClick={closeAllDropdowns}
      >
        <thead>
          <tr>
            <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-wider bg-[#F9FAFB] border-b border-[#E5E7EB]"></th>
            <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-wider bg-[#F9FAFB] border-b border-[#E5E7EB]">
              AUTHOR
            </th>
            <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-wider bg-[#F9FAFB] border-b border-[#E5E7EB]">
              TITLE
            </th>
            <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-wider bg-[#F9FAFB] border-b border-[#E5E7EB]">
              RATING
            </th>
            <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-wider bg-[#F9FAFB] border-b border-[#E5E7EB]">
              PUBLISHED
            </th>
            <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-wider bg-[#F9FAFB] border-b border-[#E5E7EB]">
              VOTES
            </th>
            <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-wider bg-[#F9FAFB] border-b border-[#E5E7EB]">
              FEATURED
            </th>
            <th className="text-left px-4 py-3 text-[#5F5F5F] font-medium text-xs uppercase tracking-wider bg-[#F9FAFB] border-b border-[#E5E7EB]"></th>
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
                onReplyClick={handleReplyClick}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPageValue={itemsPerPage}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
        getPageNumbers={getPageNumbers}
      />
    </div>
  );
}
