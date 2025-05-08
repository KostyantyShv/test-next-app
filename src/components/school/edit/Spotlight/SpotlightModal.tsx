"use client";

import { useState, useEffect, useRef } from "react";
import ContactSection from "./ContactSection";
import CtaRowsSection from "./CTARowsSection";
import ImageGallerySection from "./ImageGallerySection";
import RichTextEditor from "./RichTextEditor";
import SidebarSection from "./SidebarSection";
import StatsSection from "./StatsSection";
import TagsSection from "./TagsSection";
import {
  SpotlightFormData,
  Spotlight,
  Stat,
  CtaRow,
  SidebarLink,
  SocialButton,
} from "./types";

interface SpotlightModalProps {
  onClose: () => void;
  onSave: (formData: SpotlightFormData) => void;
  onDelete: () => void;
  spotlight?: Spotlight;
}

export default function SpotlightModal({
  onClose,
  onSave,
  onDelete,
  spotlight,
}: SpotlightModalProps) {
  const [authorName, setAuthorName] = useState(spotlight?.author.name || "");
  const [authorAvatar, setAuthorAvatar] = useState(
    spotlight?.author.avatar ||
      "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
  );
  const [projectDate, setProjectDate] = useState("");
  const [projectTitle, setProjectTitle] = useState(spotlight?.title || "");
  const [projectDescription, setProjectDescription] = useState(
    spotlight?.description || ""
  );
  const [stats, setStats] = useState<Stat[]>(spotlight?.stats || []);
  const [images, setImages] = useState<string[]>(spotlight?.images || []);
  const [ctaRows, setCtaRows] = useState<CtaRow[]>(spotlight?.ctaRows || []);
  const [tags, setTags] = useState<string[]>(spotlight?.tags || []);
  const [contactLogo, setContactLogo] = useState(
    spotlight?.contact.logo || "https://i.ibb.co/Z1RrcHzB/dribble.png"
  );
  const [contactTitle, setContactTitle] = useState(
    spotlight?.contact.title || ""
  );
  const [contactDescription, setContactDescription] = useState(
    spotlight?.contact.description || ""
  );
  const [contactButtonText, setContactButtonText] = useState(
    spotlight?.contact.buttonText || ""
  );
  const [sidebarBanner, setSidebarBanner] = useState(
    spotlight?.sidebar.banner || "https://i.ibb.co/jJ4GHXP/img1.jpg"
  );
  const [sidebarTitle, setSidebarTitle] = useState(
    spotlight?.sidebar.title || ""
  );
  const [sidebarDescription, setSidebarDescription] = useState(
    spotlight?.sidebar.description || ""
  );
  const [sidebarLinks, setSidebarLinks] = useState<SidebarLink[]>(
    spotlight?.sidebar.links || []
  );
  const [socialButtons, setSocialButtons] = useState<SocialButton[]>(
    spotlight?.sidebar.socialButtons || []
  );

  const authorInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const vendorLogoInputRef = useRef<HTMLInputElement>(null);
  const sidebarBannerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (spotlight) {
      const dateParts = spotlight.projectDate.split(" ");
      const monthIndex =
        new Date(Date.parse(dateParts[0] + " 1, 2000")).getMonth() + 1;
      const formattedDate = `${dateParts[1]}-${monthIndex
        .toString()
        .padStart(2, "0")}`;
      setProjectDate(formattedDate);
    } else {
      const today = new Date();
      setProjectDate(
        `${today.getFullYear()}-${(today.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`
      );
    }
  }, [spotlight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!authorName.trim()) {
      alert("Author Name is required.");
      return;
    }
    if (!projectTitle.trim()) {
      alert("Project Title is required.");
      return;
    }

    const date = new Date(projectDate);
    const formattedDate = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    const formData: SpotlightFormData = {
      author: { name: authorName, avatar: authorAvatar },
      projectDate: formattedDate,
      title: projectTitle,
      description: projectDescription,
      stats,
      images,
      ctaRows,
      tags,
      contact: {
        logo: contactLogo,
        title: contactTitle,
        description: contactDescription,
        buttonText: contactButtonText,
      },
      sidebar: {
        banner: sidebarBanner,
        title: sidebarTitle,
        description: sidebarDescription,
        links: sidebarLinks,
        socialButtons,
      },
    };

    onSave(formData);
  };

  const handleAuthorImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setAuthorAvatar(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVendorLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setContactLogo(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSidebarBannerUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setSidebarBanner(ev.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-xl w-full max-w-[850px] max-h-[90vh] overflow-y-auto shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
        <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-6 border-b border-[#E5E5E5]">
          <h2 className="text-2xl font-bold text-[#262B47]">
            {spotlight ? "Edit Spotlight" : "Create Spotlight"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#E1E7EE] rounded-full"
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
        <form onSubmit={handleSubmit} className="p-6">
          {/* Author Information */}
          <div className="border-b border-[#eee] pb-6 mb-6">
            <h3 className="text-lg font-semibold text-[#262B47] mb-4">
              Author Information
            </h3>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-[100px] h-[100px] rounded-full overflow-hidden border-4 border-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    <img
                      src={authorAvatar}
                      alt="Author"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => authorInputRef.current?.click()}
                      className="px-4 py-2 bg-[#f5f5f5] border border-[#ddd] rounded text-sm hover:bg-[#eee] transition-colors"
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline mr-2"
                      >
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
                      type="file"
                      ref={authorInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleAuthorImageUpload}
                    />
                    <div className="mt-2 text-[#5F5F5F] text-xs">
                      Recommended size: 100x100 pixels
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-6">
                  <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                    placeholder="Enter author name"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
                    Project Date
                  </label>
                  <input
                    type="month"
                    value={projectDate}
                    onChange={(e) => setProjectDate(e.target.value)}
                    className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="border-b border-[#eee] pb-6 mb-6">
            <h3 className="text-lg font-semibold text-[#262B47] mb-4">
              Project Details
            </h3>
            <div className="mb-6">
              <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
                Project Title
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                placeholder="Enter project title"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
                Project Description
              </label>
              <RichTextEditor
                content={projectDescription}
                onChange={setProjectDescription}
              />
            </div>
          </div>

          {/* Project Stats */}
          <StatsSection stats={stats} setStats={setStats} />

          {/* Image Gallery */}
          <ImageGallerySection
            images={images}
            setImages={setImages}
            inputRef={galleryInputRef}
          />

          {/* CTA Rows */}
          <CtaRowsSection ctaRows={ctaRows} setCtaRows={setCtaRows} />

          {/* Project Tags */}
          <TagsSection tags={tags} setTags={setTags} />

          {/* Contact Section */}
          <ContactSection
            logo={contactLogo}
            title={contactTitle}
            description={contactDescription}
            buttonText={contactButtonText}
            setLogo={setContactLogo}
            setTitle={setContactTitle}
            setDescription={setContactDescription}
            setButtonText={setContactButtonText}
            inputRef={vendorLogoInputRef}
            onLogoUpload={handleVendorLogoUpload}
          />

          {/* Sidebar Details */}
          <SidebarSection
            banner={sidebarBanner}
            title={sidebarTitle}
            description={sidebarDescription}
            links={sidebarLinks}
            socialButtons={socialButtons}
            setBanner={setSidebarBanner}
            setTitle={setSidebarTitle}
            setDescription={setSidebarDescription}
            setLinks={setSidebarLinks}
            setSocialButtons={setSocialButtons}
            inputRef={sidebarBannerInputRef}
            onBannerUpload={handleSidebarBannerUpload}
          />

          <div className="flex justify-between items-center p-6 border-t border-[#E5E5E5]">
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center gap-2 text-[#f93a37] text-sm bg-none"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#f93a37"
                  d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
              Delete
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-[#F8F9FA] border border-[#E5E5E5] text-[#4A4A4A] rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#02C5AF] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
