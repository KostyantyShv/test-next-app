"use client";
import React, { useState } from "react";
import Header from "./header/Header";
import SchoolInfo from "./school-info/SchoolInfo";
import Content from "./content/Content";
import ImagesGrid from "./images-grid/ImagesGrid";
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />
      
      {/* School Info Section */}
      <SchoolInfo 
        schoolInfo={schoolInfo || defaultSchoolInfo} 
        images={images} 
      />
      
      {/* Images Grid */}
      <ImagesGrid images={images} />
      
      {/* Photo Gallery */}
      <PhotoGallery 
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
        schoolName="Lincoln Academy"
      />
      
      {/* Main Content */}
      <Content />
      
      {/* Mobile Footer */}
      <FooterMobile 
        isFooterVisible={isFooterVisible}
        images={images}
      />
    </div>
  );
};

export default Listing;
