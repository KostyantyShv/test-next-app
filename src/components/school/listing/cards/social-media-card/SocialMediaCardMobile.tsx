"use client";

import { useEffect, useRef, useState } from "react";
import { mockSocialData } from "./mock";
import { interactionIcons } from "./icons";

const SocialMediaCardMobile: React.FC<{ id: string }> = ({ id }) => {
  const socialCardsRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideToCard = (index: number) => {
    if (socialCardsRef.current) {
      const cardWidth = socialCardsRef.current.offsetWidth;
      socialCardsRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const slidePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      slideToCard(currentIndex - 1);
    }
  };

  const slideNext = () => {
    if (currentIndex < mockSocialData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      slideToCard(currentIndex + 1);
    }
  };

  const handleScroll = () => {
    if (socialCardsRef.current) {
      const cardWidth = socialCardsRef.current.offsetWidth;
      const newIndex = Math.round(
        socialCardsRef.current.scrollLeft / cardWidth
      );
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const container = socialCardsRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      id={id}
      className="w-full max-w-[390px] mx-auto h-auto min-h-[400px] bg-[#E1E7EE] rounded-2xl overflow-hidden flex flex-col md:max-w-lg lg:max-w-xl"
    >
      <div className="flex-1 p-4 sm:p-5">
        <h2 className="text-xl sm:text-2xl font-bold text-[#1B1B1B] mb-4 sm:mb-5">
          Social Media
        </h2>

        <div className="relative mb-5">
          <div
            className="absolute top-1/2 -translate-y-1/2 left-[-12px] w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer z-10"
            onClick={slidePrev}
            style={{
              opacity: currentIndex === 0 ? 0.5 : 1,
              pointerEvents: currentIndex === 0 ? "none" : "auto",
            }}
          >
            <div className="text-[#464646]">{interactionIcons.prevArrow}</div>
          </div>

          <div
            ref={socialCardsRef}
            className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory mb-4"
          >
            {mockSocialData.map((data, index) => (
              <div
                key={index}
                className="min-w-full snap-start rounded-xl bg-white shadow-sm overflow-hidden mr-4 flex flex-col last:mr-0"
              >
                <div className="flex items-center p-3 sm:p-4 border-b border-[rgba(0,0,0,0.08)]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden mr-2 sm:mr-3">
                    <img
                      src={data.avatarSrc}
                      alt={data.authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm sm:text-base text-[#464646]">
                      {data.authorName}
                    </div>
                    <div className="text-xs sm:text-sm text-[#5F5F5F]">
                      {data.username}
                    </div>
                  </div>
                  <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[#4A4A4A]">
                    {data.platformIcon}
                  </div>
                </div>
                <div className="w-full h-40 sm:h-48 md:h-52 overflow-hidden">
                  <img
                    src={data.thumbnailSrc}
                    alt="Post"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 sm:p-4 flex-1">
                  <div className="text-sm sm:text-[15px] leading-relaxed mb-2 sm:mb-3 text-[#464646]">
                    {data.content}
                  </div>
                  <div className="flex text-xs sm:text-[13px] text-[#5F5F5F] mb-2 sm:mb-3">
                    <div className="relative mr-3 after:content-['•'] after:absolute after:right-[-11px]">
                      {data.date}
                    </div>
                    {data.time && <div className="ml-1">{data.time}</div>}
                  </div>
                  <a
                    href="#"
                    className="text-xs sm:text-[13px] text-[#346DC2] font-medium no-underline"
                  >
                    {data.linkText || "Full post here"}
                  </a>
                </div>
                <div className="p-3 border-t border-[rgba(0,0,0,0.08)] flex justify-between items-center">
                  <div className="flex items-center text-[13px] text-[#5F5F5F]">
                    <div className="flex items-center mr-4">
                      <div className="w-[18px] h-[18px] mr-1 flex items-center justify-center">
                        {interactionIcons.heart}
                      </div>
                      <span>{data.likes}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <div className="w-[18px] h-[18px] mr-1 flex items-center justify-center">
                        {data.platform === "Twitter"
                          ? interactionIcons.retweet
                          : interactionIcons.comment}
                      </div>
                      <span>{data.comments}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-[13px] text-[#5F5F5F]">
                    <div className="w-[18px] h-[18px] mr-1 flex items-center justify-center">
                      {interactionIcons.share}
                    </div>
                    <span>{data.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="absolute top-1/2 -translate-y-1/2 right-[-12px] w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer z-10"
            onClick={slideNext}
            style={{
              opacity: currentIndex === mockSocialData.length - 1 ? 0.5 : 1,
              pointerEvents:
                currentIndex === mockSocialData.length - 1 ? "none" : "auto",
            }}
          >
            <div className="text-[#464646]">{interactionIcons.nextArrow}</div>
          </div>

          <div className="flex justify-center gap-2">
            {mockSocialData.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                  index === currentIndex ? "bg-[#0B6333]" : "bg-[#DFDDDB]"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  slideToCard(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaCardMobile;
