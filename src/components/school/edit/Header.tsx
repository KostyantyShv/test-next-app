"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActiveType } from "./types/active-tab";

type NavLink = {
  href: string;
  label: string;
  isActive?: boolean;
};

export default function ResponsiveHeader({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveType>>;
}) {
  const [saveButtonText, setSaveButtonText] = useState<string>("Save");
  const [showScrollLeft, setShowScrollLeft] = useState<boolean>(false);
  const [showScrollRight, setShowScrollRight] = useState<boolean>(true);
  const router = useRouter();
  const tabNavRef = useRef<HTMLDivElement>(null);

  const navLinks: NavLink[] = [
    { href: "#general", label: "General", isActive: activeTab === "general" },
    { href: "#reviews", label: "Reviews", isActive: activeTab === "reviews" },
    {
      href: "#spotlight",
      label: "Spotlight",
      isActive: activeTab === "spotlight",
    },
    {
      href: "#case-studies",
      label: "Case Studies",
      isActive: activeTab === "case-studies",
    },
    { href: "#forms", label: "Forms", isActive: activeTab === "forms" },
    { href: "#offers", label: "Offers", isActive: activeTab === "offers" },
    {
      href: "#checklist",
      label: "Checklist",
      isActive: activeTab === "checklist",
    },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setActiveTab(href.replace("#", "") as ActiveType);
    const newPathname = `/schools/edit/${href}`;
    router.push(newPathname);
  };

  const handleSaveClick = () => {
    setSaveButtonText("Saving...");
    setTimeout(() => {
      setSaveButtonText("Saved!");
      setTimeout(() => {
        setSaveButtonText("Save");
      }, 2000);
    }, 1000);
  };

  const handleInfoClick = () => {
    // Mobile shows alert, desktop opens link
    if (window.innerWidth < 768) {
      alert("University Information");
    } else {
      window.open("https://example.com", "_blank");
    }
  };

  // Scroll tab navigation left
  const scrollTabsLeft = () => {
    if (!tabNavRef.current) return;

    tabNavRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  // Scroll tab navigation right
  const scrollTabsRight = () => {
    if (!tabNavRef.current) return;

    tabNavRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  // Handle scrolling active tab into view
  useEffect(() => {
    if (!tabNavRef.current) return;

    const tabNav = tabNavRef.current;
    const activeTabElement = tabNav.querySelector(".active");

    if (activeTabElement) {
      // Calculate position to center the active tab
      const tabRect = activeTabElement.getBoundingClientRect();
      const navRect = tabNav.getBoundingClientRect();
      const targetScroll =
        tabRect.left - navRect.left - (navRect.width - tabRect.width) / 2;

      // Smooth scroll to position
      tabNav.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  }, [activeTab]);

  // Check scroll position to show/hide scroll buttons
  const checkScrollPosition = () => {
    if (!tabNavRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = tabNavRef.current;
    setShowScrollLeft(scrollLeft > 0);
    setShowScrollRight(scrollLeft < scrollWidth - clientWidth - 5); // 5px buffer
  };

  // Listen for tab nav scroll
  useEffect(() => {
    const tabNav = tabNavRef.current;
    if (!tabNav) return;

    checkScrollPosition();
    tabNav.addEventListener("scroll", checkScrollPosition);

    // Check if scrollable initially
    const isScrollable = tabNav.scrollWidth > tabNav.clientWidth;
    setShowScrollRight(isScrollable);

    return () => {
      tabNav.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // Recheck scroll indicators on window resize
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-[#E1E7EE]">
      {/* Mobile Header (md:hidden) — matches HTML reference */}
      <div className="md:hidden bg-white border-b border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="p-4 flex items-center gap-3">
          <Image
            src="https://i.ibb.co/jJ4GHXP/img1.jpg"
            alt="Stanford University"
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <h1 className="text-[16px] font-semibold text-[#464646] flex items-center gap-1">
            Stanford University
            <svg
              className="w-4 h-4 ml-1 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-200"
              viewBox="0 0 24 24"
              onClick={handleInfoClick}
            >
              <path
                d="M12 23a11 11 0 1 1 0-22 11 11 0 0 1 0 22m0-20a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-.09-4a1 1 0 0 1-.32-1.95c.6-.2 2.32-1 2.32-2.05A2 2 0 0 0 10 9.33a1 1 0 1 1-1.88-.66a4 4 0 0 1 3.767-2.656A4 4 0 0 1 15.89 10c0 2.64-3.31 3.82-3.68 3.95a1.3 1.3 0 0 1-.29.05z"
                fill="currentColor"
              />
            </svg>
          </h1>
        </div>

        {/* Tab Navigation — matches .tab-nav in HTML */}
        <nav
          className="overflow-x-auto whitespace-nowrap px-4 mb-2"
          ref={tabNavRef}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="inline-flex gap-6 pb-2">
            {navLinks.map(({ href, label, isActive }) => (
              <Link
                key={href}
                href={href}
                className={`relative pb-2 text-[14px] font-medium transition-colors duration-200 ${isActive
                  ? "text-[#0B6333] active"
                  : "text-[#5F5F5F] hover:text-[#464646]"
                  }`}
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
                {isActive && (
                  <span className="absolute -bottom-[9px] left-0 h-0.5 w-full bg-[#0B6333] [clip-path:polygon(4px_0,calc(100%_-_4px)_0,100%_100%,0_100%)]"></span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Desktop Header (hidden on mobile) */}
      <div className="hidden md:block py-6 px-8">
        <div className="relative mx-auto flex justify-between rounded-lg pb-3">
          <div className="flex items-start gap-6">
            <Image
              src="https://i.ibb.co/jJ4GHXP/img1.jpg"
              alt="Listing thumbnail"
              width={120}
              height={80}
              className="rounded-lg object-cover"
            />
            <div className="flex h-20 flex-col justify-between">
              <h1 className="-mt-0.5 flex items-center gap-2 text-2xl font-semibold text-[#464646]" style={{ letterSpacing: '-0.01em', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
                Stanford University
                <svg
                  className="h-5 w-5 cursor-pointer opacity-60 transition-opacity duration-200 hover:opacity-100"
                  viewBox="0 0 24 24"
                  onClick={handleInfoClick}
                >
                  <path
                    d="M12 23a11 11 0 1 1 0-22 11 11 0 0 1 0 22m0-20a9 9 0 1 0 0 18 9 9 0 0 0 0-18m0 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2m-.09-4a1 1 0 0 1-.32-1.95c.6-.2 2.32-1 2.32-2.05A2 2 0 0 0 10 9.33a1 1 0 1 1-1.88-.66a4 4 0 0 1 3.767-2.656A4 4 0 0 1 15.89 10c0 2.64-3.31 3.82-3.68 3.95a1.3 1.3 0 0 1-.29.05z"
                    fill="currentColor"
                  />
                </svg>
              </h1>
              <nav className="-mb-2 flex gap-8">
                {navLinks.map(({ href, label, isActive }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`relative pb-2 font-medium transition-all duration-200 ${isActive
                      ? "text-[#0B6333]"
                      : "text-[#5F5F5F] hover:text-[#464646]"
                      }`}
                    style={{ fontSize: '15px' }}
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    {label}
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-0 h-0.5 w-full bg-[#0B6333] [clip-path:polygon(4px_0,calc(100%_-_4px)_0,100%_100%,0_100%)]"></span>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="group relative pb-2">
              <button
                type="button"
                className="relative flex items-center gap-[8px] rounded-[8px] border border-[#e0e0e0] bg-white px-[16px] py-[8px] text-[14px] font-medium text-[#1B1B1B] transition-all duration-[0.2s] cursor-pointer hover:border-[#ccc] hover:bg-[#f8f8f8]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                Preview
                <svg
                  height="16"
                  aria-hidden="true"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>

              <div className="pointer-events-none absolute right-0 top-full min-w-[225px] translate-y-[-4px] rounded-lg bg-white py-2 opacity-0 shadow-md transition-all duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 z-50">
                <div className="flex cursor-pointer items-center gap-3 px-4 py-2 transition-all duration-200 hover:bg-[#f5f5f5]" style={{ fontSize: '14px' }}>
                  <svg viewBox="0 0 20 20" width={16} height={16}>
                    <path
                      fill="#5F5F5F"
                      d="M4.16671 4.08331C4.14461 4.08331 4.12341 4.09209 4.10778 4.10772C4.09215 4.12335 4.08337 4.14455 4.08337 4.16665V5.91665H5.91671V4.08331H4.16671ZM4.16671 2.58331C3.74678 2.58331 3.34405 2.75013 3.04712 3.04706C2.75019 3.34399 2.58337 3.74672 2.58337 4.16665V15.8333C2.58337 16.2532 2.75019 16.656 3.04712 16.9529C3.34406 17.2498 3.74678 17.4166 4.16671 17.4166H15.8334C16.2533 17.4166 16.656 17.2498 16.953 16.9529C17.2499 16.656 17.4167 16.2532 17.4167 15.8333V4.16665C17.4167 3.74672 17.2499 3.34399 16.953 3.04706C16.656 2.75013 16.2533 2.58331 15.8334 2.58331H4.16671ZM7.41671 4.08331V5.91665H15.9167V4.16665C15.9167 4.14454 15.9079 4.12335 15.8923 4.10772C15.8767 4.09209 15.8555 4.08331 15.8334 4.08331H7.41671ZM15.9167 7.41665H4.08337V15.8333C4.08337 15.8554 4.09215 15.8766 4.10778 15.8922C4.12341 15.9079 4.1446 15.9166 4.16671 15.9166H15.8334C15.8555 15.9166 15.8767 15.9079 15.8923 15.8922C15.9079 15.8766 15.9167 15.8554 15.9167 15.8333V7.41665Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                    <path
                      fill="#5F5F5F"
                      d="M7.6529 11.25C8.54057 12.2158 9.3248 12.5834 9.99996 12.5834C10.6751 12.5834 11.4593 12.2158 12.347 11.25C11.4593 10.2842 10.6751 9.91669 9.99996 9.91669C9.3248 9.91669 8.54057 10.2842 7.6529 11.25ZM9.99996 8.41669C11.4473 8.41669 12.7509 9.32129 13.919 10.7815C14.1381 11.0554 14.1381 11.4446 13.919 11.7185C12.7509 13.1787 11.4473 14.0834 9.99996 14.0834C8.55263 14.0834 7.24902 13.1787 6.08095 11.7185C5.86185 11.4446 5.86185 11.0554 6.08095 10.7815C7.24902 9.32129 8.55263 8.41669 9.99996 8.41669ZM9.24329 11.2502C9.24329 10.8359 9.57907 10.5002 9.99329 10.5002H9.99995C10.4142 10.5002 10.75 10.8359 10.75 11.2502C10.75 11.6644 10.4142 12.0002 9.99995 12.0002H9.99329C9.57907 12.0002 9.24329 11.6644 9.24329 11.2502Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  Preview Listing Page
                </div>
                <div className="flex cursor-pointer items-center gap-3 px-4 py-2 transition-all duration-200 hover:bg-[#f5f5f5]" style={{ fontSize: '14px' }}>
                  <svg fill="none" viewBox="0 0 20 20" width={16} height={16}>
                    <path
                      fill="#5F5F5F"
                      d="M5.00004 4.08331C4.75693 4.08331 4.52377 4.17989 4.35186 4.3518C4.17995 4.52371 4.08337 4.75686 4.08337 4.99998V6.66665C4.08337 7.08086 3.74759 7.41665 3.33337 7.41665C2.91916 7.41665 2.58337 7.08086 2.58337 6.66665V4.99998C2.58337 4.35904 2.83799 3.74435 3.2912 3.29114C3.74441 2.83793 4.3591 2.58331 5.00004 2.58331H6.66671C7.41671 2.58331 7.41671 2.9191 7.41671 3.33331C7.41671 3.74753 7.08092 4.08331 6.66671 4.08331H5.00004ZM12.5834 3.33331C12.5834 2.9191 12.9192 2.58331 13.3334 2.58331H15C15.641 2.58331 16.2557 2.83793 16.7089 3.29114C17.1621 3.74435 17.4167 4.35904 17.4167 4.99998V6.66665C17.4167 7.08086 17.0809 7.41665 16.6667 7.41665C16.2525 7.41665 15.9167 7.08086 15.9167 6.66665V4.99998C15.9167 4.75686 15.8201 4.52371 15.6482 4.3518C15.4763 4.17989 15.2432 4.08331 15 4.08331H13.3334C12.9192 4.08331 12.5834 3.74753 12.5834 3.33331ZM3.33337 12.5833C3.74759 12.5833 4.08337 12.9191 4.08337 13.3333V15C4.08337 15.2431 4.17995 15.4763 4.35186 15.6482C4.52377 15.8201 4.75693 15.9166 5.00004 15.9166H6.66671C7.08092 15.9166 7.41671 16.2524 7.41671 16.6666C7.41671 17.0809 7.08092 17.4166 6.66671 17.4166H5.00004C4.3591 17.4166 3.74441 17.162 3.2912 16.7088C2.83799 16.2556 2.58337 15.6409 2.58337 15V13.3333C2.58337 12.9191 2.91916 12.5833 3.33337 12.5833ZM16.6667 12.5833C17.0809 12.5833 17.4167 12.9191 17.4167 13.3333V15C17.4167 15.6409 17.1621 16.2556 16.7089 16.7088C16.2557 17.162 15.641 17.4166 15 17.4166H13.3334C12.9192 17.4166 12.5834 17.0809 12.5834 16.6666C12.5834 16.2524 12.9192 15.9166 13.3334 15.9166H15C15.2432 15.9166 15.4763 15.8201 15.6482 15.6482C15.8201 15.4763 15.9167 15.2431 15.9167 15V13.3333C15.9167 12.9191 16.2525 12.5833 16.6667 12.5833Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                    <path
                      fill="#5F5F5F"
                      d="M7.63052 6.34733C7.86565 6.2142 8.15421 6.21784 8.38591 6.35686L13.3859 9.35686C13.6118 9.4924 13.75 9.73653 13.75 9.99998C13.75 10.2634 13.6118 10.5076 13.3859 10.6431L8.38591 13.6431C8.15421 13.7821 7.86565 13.7858 7.63052 13.6526C7.39538 13.5195 7.25004 13.2702 7.25004 13V6.99998C7.25004 6.72978 7.39538 6.48046 7.63052 6.34733ZM8.75004 8.32462V11.6753L11.5423 9.99998L8.75004 8.32462Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  Preview Details View
                </div>
              </div>
            </div>
            <button
              className="rounded-[8px] bg-[#1a1a1a] px-[24px] py-[8px] text-[14px] font-medium text-white transition-all duration-[0.2s] hover:bg-[#333] cursor-pointer"
              onClick={handleSaveClick}
            >
              {saveButtonText}
            </button>
            <button className="rounded-full p-2 text-[#5F5F5F] transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#1B1B1B]">
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
          <div className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"></div>
        </div>
      </div>
    </header>
  );
}
