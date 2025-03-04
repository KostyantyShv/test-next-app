"use client";

import Image from "next/image";
import { useState } from "react";

// Define types for our data
interface Review {
  id: number;
  author: string;
  location: string;
  country: string;
  countryFlag: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  tags: string[];
  avatar: string;
}

export default function ReviewsModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Sample review data
  const reviews: Review[] = [
    {
      id: 1,
      author: "Kelly R.",
      location: "Linz, Austria",
      country: "Austria",
      countryFlag: "https://flagcdn.com/at.svg",
      rating: 5.0,
      date: "6 months ago",
      title: "Dream College",
      content:
        "Great college with diverse academic opportunities. Affordable local education with transfer programs and career-focused tracks for students in the area. I am significantly more prepared and qualified for furthering my education after attending this college.",
      tags: ["Algorithm", "C# Programming", "Trading"],
      avatar:
        "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    },
    // You can add more review objects here
    {
      id: 2,
      author: "Kelly R.",
      location: "Linz, Austria",
      country: "Austria",
      countryFlag: "https://flagcdn.com/at.svg",
      rating: 5.0,
      date: "6 months ago",
      title: "Dream College",
      content:
        "Great college with diverse academic opportunities. Affordable local education with transfer programs and career-focused tracks for students in the area. I am significantly more prepared and qualified for furthering my education after attending this college.",
      tags: ["Algorithm", "C# Programming", "Trading"],
      avatar:
        "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
    },
  ];

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return "★".repeat(Math.floor(rating));
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto"; // Allow scrolling when modal is closed
  };

  // Function to handle clicking outside the modal to close it
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <a
        href="#"
        className="text-[#346DC2] no-underline flex items-center gap-2 font-semibold text-sm hover:text-[#1D77BD] transition-colors"
        onClick={(e) => {
          e.preventDefault();
          openModal();
        }}
      >
        <span>VIEW ALL REVIEWS</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100]"
          onClick={handleOutsideClick}
        >
          {/* Modal Container */}
          <div className="bg-white w-[90%] max-w-4xl max-h-[90vh] rounded-2xl shadow-lg flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-black/[0.08] flex justify-between items-center">
              <div className="flex items-center gap-2 text-[#1B1B1B]">
                <span className="text-2xl font-bold tracking-tight">5.0</span>
                <span className="text-[#5F5F5F] font-extrabold mx-1">·</span>
                <span className="text-2xl font-bold text-[#5F5F5F]">
                  {reviews.length} Reviews
                </span>
              </div>

              <div className="flex items-center gap-4">
                <button className="px-4 py-2 border border-black/10 rounded-lg bg-white text-[#464646] text-sm font-medium flex items-center gap-2 transition-all hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:text-[#0B6333]">
                  Rating
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <button className="px-4 py-2 border border-black/10 rounded-lg bg-white text-[#464646] text-sm font-medium flex items-center gap-2 transition-all hover:bg-[#EBFCF4] hover:border-[#0B6333] hover:text-[#0B6333]">
                  Sort by: Most Relevant
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <button
                  className="w-8 h-8 flex items-center justify-center text-[#5F5F5F] rounded-full transition-all hover:bg-black/5 hover:text-[#1B1B1B]"
                  onClick={closeModal}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div
              className="p-6 md:p-8 overflow-y-auto"
              style={{ maxHeight: "calc(90vh - 90px)" }}
            >
              <div className="flex flex-col gap-6">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="py-6 border-b border-black/[0.08] last:border-b-0"
                  >
                    <div className="flex gap-4 mb-4">
                      <Image
                        height={48}
                        width={48}
                        src={review.avatar}
                        alt={`${review.author} avatar`}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="text-[#016853] font-semibold mb-1 flex items-center gap-2">
                          {review.author}
                          <span className="text-sm text-[#5F5F5F] font-medium flex items-center gap-1">
                            <Image
                              height={20}
                              width={14}
                              src={review.countryFlag}
                              alt={`${review.country} flag`}
                              className="w-5 h-3.5 rounded object-cover"
                            />
                            {review.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#089E68] text-sm font-medium">
                          <span className="font-bold text-[#00DF8B]">
                            {renderStars(review.rating)}
                          </span>
                          <span>{review.rating.toFixed(1)}</span>
                          <span className="text-[#5F5F5F]">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-[#464646] mb-3">
                      {review.title}
                    </div>
                    <p className="text-[#5F5F5F] text-sm leading-relaxed mb-4">
                      {review.content}
                    </p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {review.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-[#EBFCF4] text-[#0B6333] text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6">
                      <button className="flex items-center gap-2 text-[#5F5F5F] cursor-pointer transition-colors hover:text-[#346DC2]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                        <span className="font-medium text-sm">Helpful</span>
                      </button>
                      <button className="flex items-center gap-2 text-[#5F5F5F] cursor-pointer transition-colors hover:text-[#346DC2]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <span className="font-medium text-sm">Not Helpful</span>
                      </button>
                      <button className="ml-auto p-2 rounded-full text-[#5F5F5F] cursor-pointer transition-all hover:bg-black/5 hover:text-[#1B1B1B]">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
