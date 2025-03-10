"use client";

import { useEffect, useRef, useState } from "react";
import CTADrawer from "./CTADrawer";
import Header from "../header/HeaderMobile";
import Footer from "../footer-mobile/FooterMobile";

interface SchoolInfoProps {
  images: string[];
}

const SchoolInfoMobile: React.FC<SchoolInfoProps> = ({ images }) => {
  const [isCTADrawerOpen, setIsCTADrawerOpen] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const schoolInfoRef = useRef<HTMLDivElement>(null);

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
    <>
      <div
        ref={schoolInfoRef}
        className="bg-white rounded-b-lg overflow-hidden p-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold text-[#464646]">Lincoln Academy</h1>
          <svg className="w-5 h-5 fill-[#1D77BD]" viewBox="0 0 30 30">
            <path d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z" />
            <path
              stroke="white"
              fill="white"
              d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
            />
          </svg>
        </div>
        <div className="text-[#089E68] text-sm mb-3">
          #4 in Best Public Elementary Schools in Arizona
        </div>
        <div className="flex flex-wrap items-center gap-y-2 gap-x-1 text-sm">
          <span className="bg-[#00DF8B] text-white py-0.5 px-2 rounded-full font-semibold">
            A+
          </span>
          <span>Overall Grade</span>
          <span className="text-[#5F5F5F] mx-1">•</span>
          <span>Public, Charter</span>
          <span className="text-[#5F5F5F] mx-1">•</span>
          <span>K-12</span>
          <span className="text-[#5F5F5F] mx-1">•</span>
          <span>FLAGSTAFF, AZ</span>
          <span>★★★★☆ 73 reviews</span>
          <button
            onClick={() => setIsCTADrawerOpen(true)}
            className="ml-auto p-1 transition-transform duration-200"
            style={{
              transform: isCTADrawerOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 7l8 8 8-8"
                stroke="#4B5563"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <button className="p-3 bg-[#EBFCF4] text-[#016853] rounded-md font-semibold text-base hover:bg-[#D7F7E9] w-full">
            Apply Now
          </button>
          <button className="p-3 bg-[#F3F4F6] text-[#4B5563] rounded-md font-semibold text-base w-full">
            Virtual Tour
          </button>
        </div>
      </div>

      <Header isFooterVisible={isFooterVisible} />
      <Footer isFooterVisible={isFooterVisible} images={images} />
      <CTADrawer
        isCTADrawerOpen={isCTADrawerOpen}
        setIsCTADrawerOpen={setIsCTADrawerOpen}
      />
    </>
  );
};

export default SchoolInfoMobile;
