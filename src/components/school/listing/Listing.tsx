"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "./header/Header";
import SchoolInfo from "./school-info/SchoolInfo";
import SchoolInfoDesktop from "./school-info/SchoolInfoDesktop";
import Content from "./content/Content";
import ImagesGrid from "./images-grid/ImagesGrid";
import ImagesGrigDesktop from "./images-grid/ImagesGrigDesktop";
import PhotoGallery from "./photo-gallery/PhotoGalleryDesktop";
import FooterMobile from "./footer-mobile/FooterMobile";
import { SchoolInfoInterface } from "@/types/school-listings";

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
  const schoolInfoRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Desktop Header - Hidden on mobile */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      {/* School Info Section with ref for mobile footer visibility */}
      <div ref={schoolInfoRef} className="max-w-[1077px]">
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
      </div>
      
      {/* Photo Gallery */}
      <PhotoGallery 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
        schoolName="Lincoln Academy"
      />
      
      {/* Main Content */}
      <Content />
      
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
