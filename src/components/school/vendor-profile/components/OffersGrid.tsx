"use client";

import React from "react";
import Image from "next/image";

interface OfferData {
  title: string;
  description: string;
  price: string;
  rating: string;
  reviews: string;
  days: string;
  revisions: string;
  hasSourceFile: boolean;
  hasQuickHire: boolean;
}

export const OffersGrid: React.FC = () => {
  const offerImages = [
    "https://i.ibb.co/67bNbd9X/cover1.webp",
    "https://i.ibb.co/QjxjsjdZ/butterfly.webp",
    "https://i.ibb.co/kgwFwhKr/commuting-desktop.webp",
    "https://i.ibb.co/BHcDXgQt/product5.webp",
  ];

  const offerData: OfferData[] = [
    {
      title: "Website Design & Development",
      description:
        "Create a modern, responsive website with clean code and optimized for performance. Includes SEO best practices and mobile-friendly design.",
      price: "$200",
      rating: "4.9",
      reviews: "127",
      days: "2",
      revisions: "3",
      hasSourceFile: true,
      hasQuickHire: true,
    },
    {
      title: "Logo Design & Branding Package",
      description:
        "Professional logo design with brand guidelines. Includes multiple concepts, unlimited revisions, and all source files for future editing.",
      price: "$150",
      rating: "4.8",
      reviews: "213",
      days: "3",
      revisions: "Unlimited",
      hasSourceFile: true,
      hasQuickHire: false,
    },
    {
      title: "E-commerce Store Setup",
      description:
        "Complete setup of your online store with product listings, payment gateway integration, and customized design to match your brand identity.",
      price: "$300",
      rating: "4.7",
      reviews: "94",
      days: "5",
      revisions: "2",
      hasSourceFile: true,
      hasQuickHire: true,
    },
    {
      title: "Mobile App UI/UX Design",
      description:
        "User-centered design for your mobile application. Includes wireframes, prototypes, and high-fidelity mockups for a seamless user experience.",
      price: "$250",
      rating: "5.0",
      reviews: "76",
      days: "4",
      revisions: "4",
      hasSourceFile: true,
      hasQuickHire: false,
    },
    {
      title: "SEO Optimization Package",
      description:
        "Comprehensive SEO audit and optimization to improve your website ranking. Includes keyword research, on-page SEO, and technical improvements.",
      price: "$180",
      rating: "4.6",
      reviews: "152",
      days: "3",
      revisions: "2",
      hasSourceFile: false,
      hasQuickHire: true,
    },
    {
      title: "Social Media Marketing Campaign",
      description:
        "Strategic social media campaign across multiple platforms. Includes content creation, scheduling, and performance analytics to boost engagement.",
      price: "$220",
      rating: "4.8",
      reviews: "108",
      days: "7",
      revisions: "3",
      hasSourceFile: true,
      hasQuickHire: false,
    },
  ];

  const CheckmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z"></path>
    </svg>
  );

  const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m12 16.6 4.644 3.105-1.166-5.519 4.255-3.89-5.71-.49L12 4.72 9.978 9.806l-5.71.49 4.254 3.89-1.166 5.519L12 16.599Zm-9.733-6.102c-.513-.527-.257-1.58.512-1.58l6.147-.528 2.306-5.797c.256-.79 1.28-.79 1.536 0l2.306 5.797 6.147.527c.769 0 1.025 1.054.512 1.581l-4.61 4.216 1.28 6.061c.257.79-.512 1.318-1.28 1.054L12 18.404l-5.123 3.425c-.768.527-1.537-.263-1.28-1.054l1.28-6.06z"
        clipRule="evenodd"
      />
    </svg>
  );

  const LightningIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );

  const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="1.2"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 18 18"
      className={className}
    >
      <rect ry="1.5" rx="1.5" height="8" width="12" y="6.5" x="3"></rect>
      <path d="M7 6.5V5.5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1"></path>
    </svg>
  );

  return (
    <div>
      <div className="mx-auto">
        {/* Mobile Header */}
        <div className="lg:hidden mb-4">
          <h1 className="text-xl font-semibold text-[#016853] flex items-center gap-2">
            <BriefcaseIcon className="w-6 h-6" />
            Offers
          </h1>
        </div>

        <div>
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col gap-4 w-full">
            {offerData.map((offer, index) => {
              const imageUrl = offerImages[index % offerImages.length];

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden border border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.08)] flex flex-col"
                >
                  <div className="relative w-full h-[160px] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={offer.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw"
                    />
                  </div>

                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-base font-semibold text-[#464646] mb-2.5 leading-[1.4]">
                      {offer.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-2.5">
                      <span className="flex items-center gap-1 text-xs text-[#5F5F5F]">
                        <CheckmarkIcon className="w-3.5 h-3.5 text-[#0B6333] flex-shrink-0" />
                        {offer.days} days
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[#5F5F5F]">
                        <CheckmarkIcon className="w-3.5 h-3.5 text-[#0B6333] flex-shrink-0" />
                        {offer.revisions} revisions
                      </span>
                      {offer.hasSourceFile && (
                        <span className="flex items-center gap-1 text-xs text-[#5F5F5F]">
                          <CheckmarkIcon className="w-3.5 h-3.5 text-[#0B6333] flex-shrink-0" />
                          Source file
                        </span>
                      )}
                    </div>

                    <p className="text-[13px] leading-[1.5] text-[#4A4A4A] mb-3 flex-grow line-clamp-2">
                      {offer.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="text-base font-semibold text-[#464646]">
                          {offer.price}
                        </div>
                        <div className="flex items-center gap-0.5">
                          <StarIcon className="w-3.5 h-3.5 text-[#464646] mr-0.5" />
                          <span className="font-semibold text-sm text-[#464646]">
                            {offer.rating}
                          </span>
                          <span className="text-[13px] text-[#5F5F5F]">
                            ({offer.reviews})
                          </span>
                        </div>
                      </div>
                      {offer.hasQuickHire && (
                        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium bg-[#EBFCF4] text-[#016853]">
                          <LightningIcon className="w-3 h-3" />
                          Quick Hire
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-3 gap-6 w-full">
            {offerData.map((offer, index) => {
              const imageUrl = offerImages[index % offerImages.length];

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.08)";
                  }}
                >
                  <div className="relative w-full h-[200px] overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={offer.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <h3
                      className="text-lg font-semibold mb-3 leading-tight"
                      style={{ color: "#464646" }}
                    >
                      {offer.title}
                    </h3>

                    <div className="flex flex-wrap gap-3 mb-3">
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "#5F5F5F" }}
                      >
                        <CheckmarkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                        {offer.days} days
                      </span>
                      <span
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "#5F5F5F" }}
                      >
                        <CheckmarkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                        {offer.revisions} revisions
                      </span>
                      {offer.hasSourceFile && (
                        <span
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: "#5F5F5F" }}
                        >
                          <CheckmarkIcon className="w-3.5 h-3.5 flex-shrink-0" />
                          Source file
                        </span>
                      )}
                    </div>

                    <p
                      className="text-sm leading-relaxed mb-4 flex-grow"
                      style={{
                        color: "#4A4A4A",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {offer.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3">
                        <div
                          className="text-base font-semibold"
                          style={{ color: "#464646" }}
                        >
                          {offer.price}
                        </div>
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-3.5 h-3.5 mr-0.5" />
                          <span
                            className="font-semibold text-sm"
                            style={{ color: "#464646" }}
                          >
                            {offer.rating}
                          </span>
                          <span
                            className="text-sm"
                            style={{ color: "#5F5F5F" }}
                          >
                            ({offer.reviews})
                          </span>
                        </div>
                      </div>
                      {offer.hasQuickHire && (
                        <div
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium"
                          style={{
                            backgroundColor: "#EBFCF4",
                            color: "#016853",
                          }}
                        >
                          <LightningIcon className="w-3 h-3" />
                          Quick Hire
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
