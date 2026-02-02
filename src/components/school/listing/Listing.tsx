"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./header/Header";
import SchoolInfo from "./school-info/SchoolInfo";
import SchoolInfoDesktop from "./school-info/SchoolInfoDesktop";
import Content from "./content/Content";
import ImagesGrid from "./images-grid/ImagesGrid";
import ImagesGrigDesktop from "./images-grid/ImagesGrigDesktop";
import PhotoGallery from "./photo-gallery/PhotoGalleryDesktop";
import FooterMobile from "./footer-mobile/FooterMobile";
import { SchoolInfoInterface } from "@/types/school-listings";
import { useLeftSidebar } from "@/store/use-left-sidebar";
import { useListingStickyHeader } from "@/store/use-listing-sticky-header";

type SchoolType = "k12" | "college" | "grad";

interface ListingProps {
  schoolInfo?: SchoolInfoInterface;
  images?: string[];
}

const Listing: React.FC<ListingProps> = ({ 
  schoolInfo, 
  images = [
    "https://i.ibb.co/J8QjpbD/school1.webp",
    "https://i.ibb.co/J8QjpbD/school2.webp",
    "https://i.ibb.co/J8QjpbD/school3.webp",
    "https://i.ibb.co/J8QjpbD/school4.webp",
    "https://i.ibb.co/J8QjpbD/school5.webp"
  ]
}) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isDesktopStickyHeaderVisible, setIsDesktopStickyHeaderVisible] =
    useState(false);
  const schoolInfoRef = useRef<HTMLDivElement>(null);
  const desktopStickyTriggerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const setIsCollapsed = useLeftSidebar((s) => s.setIsCollapsed);
  const isLeftSidebarCollapsed = useLeftSidebar((s) => s.isCollapsed);
  const setIsDesktopListingStickyHeaderVisible = useListingStickyHeader(
    (s) => s.setIsDesktopStickyHeaderVisible
  );
  const rafRef = useRef<number | null>(null);
  
  // Get active school type from URL
  const getSchoolType = (): SchoolType => {
    if (searchParams.has("k12")) return "k12";
    if (searchParams.has("grad")) return "grad";
    if (searchParams.has("college")) return "college";
    return "college"; // default
  };
  
  const schoolType = getSchoolType();

  const defaultSchoolInfo: SchoolInfoInterface = {
    name: "Lincoln Academy",
    location: "New York, NY",
    type: "Private School",
    ranking: "#1 in Arts",
    grade: "A+",
    grades: "K-12",
    reviews: {
      rating: 4.8,
      count: 9
    }
  };

  // Force-collapse desktop left sidebar on listing page to keep layout consistent across browsers
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(min-width: 768px)").matches) {
      setIsCollapsed(true);
    }
  }, [setIsCollapsed]);

  // Mobile footer visibility observer
  useEffect(() => {
    const schoolInfoElement = schoolInfoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsFooterVisible(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0,
      }
    );

    if (schoolInfoElement) {
      observer.observe(schoolInfoElement);
    }

    return () => {
      if (schoolInfoElement) {
        observer.unobserve(schoolInfoElement);
      }
    };
  }, []);

  // Desktop sticky header visibility:
  // show it when the "hero" (school info/photos) has scrolled out of view.
  useEffect(() => {
    const triggerEl = desktopStickyTriggerRef.current;
    if (!triggerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // When the trigger is NOT intersecting the viewport, it means we've scrolled past the hero.
        const nextVisible = !entry.isIntersecting;

        // Avoid "lag": batch updates to the next animation frame and only update on changes.
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setIsDesktopStickyHeaderVisible((prev) => {
            if (prev === nextVisible) return prev;
            // Sync to global layout immediately (no extra render cycle).
            setIsDesktopListingStickyHeaderVisible(nextVisible);
            return nextVisible;
          });
        });
      },
      {
        root: null,
        // Account for the stacked global header height on desktop:
        // app header (63px) + header bottom bar (12px) + layout spacer (12px) = 87px
        rootMargin: "-87px 0px 0px 0px",
        threshold: 0,
      }
    );

    observer.observe(triggerEl);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      setIsDesktopListingStickyHeaderVisible(false);
    };
  }, [setIsDesktopListingStickyHeaderVisible]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      {/* School Info Section with ref for mobile footer visibility */}
      <div ref={schoolInfoRef} className="w-full max-w-[1077px] mx-auto">
        {/* Mobile - separate components */}
        <div className="block md:hidden">
          <SchoolInfo 
            schoolInfo={schoolInfo || defaultSchoolInfo} 
            images={images} 
          />
          <ImagesGrid images={images} />
        </div>
        
        {/* Desktop - combined in one wrapper */}
        <div className="hidden md:block">
          <div className="school-info-wrapper block text-[0] leading-none bg-white rounded-lg">
            <div className="school-photos flex gap-[2px] w-full rounded-t-lg overflow-hidden text-base leading-normal max-w-[1077px]">
              <ImagesGrigDesktop images={images} />
            </div>
            <SchoolInfoDesktop schoolInfo={schoolInfo || defaultSchoolInfo} />
          </div>
        </div>

        {/* Desktop sticky-header trigger (sentinel) */}
        <div ref={desktopStickyTriggerRef} className="hidden md:block h-px w-full" />
      </div>

      {/* Desktop sticky header:
          appears when the main (school info) section is no longer visible,
          then sticks under the global header while scrolling */}
      <div
        className={`hidden md:block w-full ${
          isDesktopStickyHeaderVisible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        // No layout shifts: fixed header overlay, aligned to content column.
        style={{
          position: "fixed",
          // Anchor at the top of the viewport.
          top: 0,
          // Don't sit under the main app sidebar; align to content area.
          left: isLeftSidebarCollapsed ? 80 : 256,
          width: `calc(100% - ${isLeftSidebarCollapsed ? 80 : 256}px)`,
          // Keep below the main (left) sidebar so it never covers it.
          zIndex: 900,
        }}
      >
        <Header position="fixed" topOffsetPx={0} classes="transition-none" />
      </div>
      
      {/* Photo Gallery */}
      <PhotoGallery 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
        schoolName="Lincoln Academy"
      />
      
      {/* Main Content */}
      <div
        className="w-full"
        // When the fixed header is visible, prevent content from being hidden under it.
        style={isDesktopStickyHeaderVisible ? { paddingTop: 112 } : undefined}
      >
        <Content schoolType={schoolType} />
      </div>
      
      {/* Mobile Footer - Only visible on mobile */}
      <div className="block md:hidden">
        <FooterMobile 
          isFooterVisible={isFooterVisible}
          images={images}
        />
      </div>
    </div>
  );
};

export default Listing;
