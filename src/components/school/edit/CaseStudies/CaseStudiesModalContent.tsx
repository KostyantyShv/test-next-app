"use client";

import { useState, useEffect } from "react";
import HeroSection from "./HeroSectionEditor";
import ContentSections from "./ContentSectionEditor";
import GallerySection from "./GalleryEditor";
import TestimonialSection from "./TestimonialEditor";
import { CaseStudy } from "./types/caseStudy";

interface CaseStudyModalContentProps {
  caseStudy?: CaseStudy;
  onSave: (caseStudy: Omit<CaseStudy, "id" | "pinned">) => void;
  onDelete: () => void;
  onClose: () => void;
}

export default function CaseStudyModalContent({
  caseStudy,
  onSave,
  onDelete,
  onClose,
}: CaseStudyModalContentProps) {
  const [activeTab, setActiveTab] = useState("hero");
  const [formData, setFormData] = useState<Omit<CaseStudy, "id" | "pinned">>({
    title: "",
    category: "",
    description: "",
    thumbnail: "https://i.ibb.co/nMwVdhDY/hero1.webp",
    status: "published",
    hero: {
      subtitle: "",
      title: "",
      buttonText: "",
      buttonUrl: "",
      image: "https://i.ibb.co/nMwVdhDY/hero1.webp",
    },
    infoColumns: {
      column1: { title: "", items: [] },
      column2: { title: "", items: [] },
    },
    overview: { title: "", text: "" },
    sections: [],
    keyFeatures: { label: "", title: "", features: [] },
    gallery: [],
    testimonial: {
      label: "",
      title: "",
      text: "",
      author: {
        name: "",
        title: "",
        image: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
      },
      video: { image: "https://i.ibb.co/vcJmbRn/japan.webp", buttonText: "" },
    },
  });

  useEffect(() => {
    if (caseStudy) {
      setFormData(caseStudy);
    }
  }, [caseStudy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Case Study Title is required.");
      return;
    }
    if (!formData.category.trim()) {
      alert("Category is required.");
      return;
    }
    onSave(formData);
  };

  return (
    <>
      <div className="flex justify-between items-center px-6 py-6 border-b border-theme sticky top-0 bg-surface z-10">
        <h2 className="text-2xl font-bold text-dark" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
          {caseStudy ? "Edit Case Study" : "Create Case Study"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[#E1E7EE] rounded-full transition-colors"
          type="button"
        >
          <svg fill="none" viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="currentColor"
              d="M5.63603 5.63604C6.02656 5.24552 6.65972 5.24552 7.05025 5.63604L12 10.5858L16.9497 5.63604C17.3403 5.24552 17.9734 5.24552 18.364 5.63604C18.7545 6.02657 18.7545 6.65973 18.364 7.05025L13.4142 12L18.364 16.9497C18.7545 17.3403 18.7545 17.9734 18.364 18.364C17.9734 18.7545 17.3403 18.7545 16.9497 18.364L12 13.4142L7.05025 18.364C6.65972 18.7545 6.02656 18.7545 5.63603 18.364C5.24551 17.9734 5.24551 17.3403 5.63603 16.9497L10.5858 12L5.63603 7.05025C5.24551 6.65973 5.24551 6.02657 5.63603 5.63604Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <form id="caseStudyForm" onSubmit={handleSubmit} className="px-6 py-6" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-sm font-semibold text-default">Status:</span>
          <label className="relative inline-block w-[50px] h-[26px]">
            <input
              type="checkbox"
              checked={formData.status === "published"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.checked ? "published" : "draft",
                })
              }
              className="opacity-0 w-0 h-0"
            />
            <span
              className={`absolute cursor-pointer inset-0 bg-[var(--gray-300)] transition-all duration-400 rounded-[34px] before:absolute before:content-[''] before:h-[18px] before:w-[18px] before:left-1 before:bottom-1 before:bg-surface before:transition-all before:duration-400 before:rounded-full ${
                formData.status === "published"
                  ? "bg-[var(--active-green)] before:translate-x-6"
                  : ""
              }`}
            />
          </label>
          <span className="text-sm font-medium">
            {formData.status === "published" ? "Published" : "Draft"}
          </span>
        </div>
        <div className="border-b border-theme pb-6 mb-6">
          <h3 className="text-lg font-semibold text-dark mb-4">
            Basic Information
          </h3>
          <div className="flex gap-4 max-md:flex-col mb-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-default mb-2">
                Case Study Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default focus:outline-none focus:border-[var(--brand-teal)] bg-surface"
                placeholder="Enter the main title"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-default mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default focus:outline-none focus:border-[var(--brand-teal)] bg-surface"
                placeholder="e.g., Web Design, App Development"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-default mb-2">
              Brief Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-3 border border-theme rounded-lg text-sm text-default focus:outline-none focus:border-[var(--brand-teal)] bg-surface"
              rows={3}
              placeholder="Brief summary of the case study"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-default mb-2">
              Thumbnail
            </label>
            <div className="flex items-start gap-4 mt-2">
              <div className="w-[120px] h-[120px] rounded-lg overflow-hidden border border-theme">
                <img
                  src={formData.thumbnail}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("thumbnailInput")?.click()
                  }
                  className="px-4 py-2 ms-2 bg-surface-secondary border border-theme rounded text-sm hover:bg-hover transition-colors flex items-center gap-2"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65692L12.7071 4.70701C12.3166 4.31649 11.6834 4.31649 11.2929 4.70701L6.34315 9.65692C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                    <path
                      fill="currentColor"
                      d="M3 14C3 13.4477 3.44772 13 4 13C4.55228 13 5 13.4477 5 14V18C5 18.5523 5.44772 19 6 19H18C18.5523 19 19 18.5523 19 18V14C19 13.4477 19.4477 13 20 13C20.5523 13 21 13.4477 21 14V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18V14Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  Choose Image
                </button>
                <input
                  id="thumbnailInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () =>
                        setFormData({
                          ...formData,
                          thumbnail: reader.result as string,
                        });
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div className="mt-2 text-[#5F5F5F] text-xs">
                  Recommended size: 300x300 pixels
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex border-b max-md:overflow-x-scroll scrollbar-hide border-theme mb-6">
          {["hero", "content", "gallery", "testimonial"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-semibold cursor-pointer border-b-2 transition-colors ${
                activeTab === tab
                  ? "text-[var(--brand-teal)] border-[var(--brand-teal)]"
                  : "text-[#5F5F5F] border-transparent"
              }`}
            >
              {tab === "hero"
                ? "Hero Section"
                : tab === "content"
                ? "Content Sections"
                : tab === "gallery"
                ? "Gallery"
                : "Testimonial"}
            </div>
          ))}
        </div>
        <div className={activeTab === "hero" ? "block" : "hidden"}>
          <HeroSection formData={formData} setFormData={setFormData} />
        </div>
        <div className={activeTab === "content" ? "block" : "hidden"}>
          <ContentSections formData={formData} setFormData={setFormData} />
        </div>
        <div className={activeTab === "gallery" ? "block" : "hidden"}>
          <GallerySection formData={formData} setFormData={setFormData} />
        </div>
        <div className={activeTab === "testimonial" ? "block" : "hidden"}>
          <TestimonialSection formData={formData} setFormData={setFormData} />
        </div>
      </form>
      <div className="flex justify-between max-md:flex-col max-md:gap-4 md:items-center px-6 py-6 border-t border-theme">
        <button
          onClick={onDelete}
          type="button"
          className="flex max-md:w-full items-center gap-2 text-[#f93a37] text-sm bg-transparent border-none"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              fill="#f93a37"
              d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          Delete
        </button>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            type="button"
            className="px-6 py-3 max-md:w-full bg-surface-secondary border border-theme text-default rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="caseStudyForm"
            className="px-6 py-3 max-md:w-full bg-[var(--brand-teal)] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
