import React, { useState } from "react";
import Image from "next/image";
import { articlesMock, featuredArticle } from "./mock";
import { Article } from "./types";

const ArticlesCardMobile: React.FC<{ id: string }> = ({ id }) => {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingAll, setViewingAll] = useState(false);
  const [likedArticles, setLikedArticles] = useState<{ [key: string]: number }>(
    {}
  );

  // Constants
  const articlesPerPage = 1;
  const totalPages = Math.ceil(articlesMock.length / articlesPerPage);

  // Functions
  const truncateTitle = (title: string) => {
    const maxLength = 65;
    if (title.length > maxLength) {
      return title.substring(0, maxLength - 2) + "..";
    }
    return title;
  };

  const truncateAuthorName = (name: string) => {
    if (name.length > 12) {
      return name.substring(0, 10) + "..";
    }
    return name;
  };

  // Article like functionality
  const handleLike = (articleTitle: string, initialLikes: number) => {
    setLikedArticles((prev) => {
      const currentLikes = prev[articleTitle] || initialLikes;
      return {
        ...prev,
        [articleTitle]: currentLikes + 1,
      };
    });
  };

  // Article share functionality
  const handleShare = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    target.style.color = "#016853";
    setTimeout(() => {
      target.style.color = "#5F5F5F";
    }, 300);
  };

  // Toggle view all articles
  const toggleViewAll = () => {
    setViewingAll(!viewingAll);
    if (viewingAll) {
      // Would scroll back to top when collapsing in a real app
    }
  };

  // Navigate to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Navigate to specific page
  const goToPage = (pageIndex: number) => {
    setCurrentPage(Math.floor(pageIndex / articlesPerPage) + 1);
  };

  const getLikeCount = (article: Article) => {
    return likedArticles[article.title] || article.likes;
  };

  return (
    <div
      id={id}
      className="font-['Inter',sans-serif] rounded-cardBorderRadius shadow-cardShadow my-cardMargin text-[#4A4A4A] overflow-y-auto overflow-x-hidden w-full mx-auto"
    >
      <div className="w-full min-h-screen">
        <div className="w-full bg-cardBackground p-cardPadding ">
          <div className="mb-6">
            <h2 className="text-[#1B1B1B] text-[22px] font-semibold relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-[3px] after:bg-[#016853]">
              Featured Articles
            </h2>
          </div>

          {/* Featured Article */}
          <div className="mb-6 pb-5 border-b border-[#E0E0E0] block">
            <div className="relative w-full h-[200px] rounded-lg overflow-hidden mb-4">
              <Image
                src={featuredArticle.coverImage}
                alt={featuredArticle.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300"
              />
            </div>
            <span className="text-[#016853] text-sm font-medium mb-2 uppercase tracking-wider block">
              {featuredArticle.category}
            </span>
            <h3 className="text-[#464646] text-lg font-semibold mb-3 leading-[1.4] line-clamp-2">
              {truncateTitle(featuredArticle.title)}
            </h3>
            <p className="text-[#4A4A4A] text-sm leading-[1.5] mb-4 line-clamp-3">
              {featuredArticle.excerpt}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative w-9 h-9 rounded-full overflow-hidden mr-3">
                  <Image
                    src={featuredArticle.avatar}
                    alt={featuredArticle.author}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-[#464646] text-sm font-medium max-w-[120px] truncate">
                    {truncateAuthorName(featuredArticle.author)}
                  </span>
                  <span className="text-[#5F5F5F] text-xs">
                    {featuredArticle.date}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div
                  className="flex items-center gap-1.5 text-[#5F5F5F] text-sm cursor-pointer transition-colors duration-200 hover:text-[#016853]"
                  onClick={() =>
                    handleLike(featuredArticle.title, featuredArticle.likes)
                  }
                  style={{
                    color: likedArticles[featuredArticle.title]
                      ? "#016853"
                      : "#5F5F5F",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="like-icon"
                  >
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                    ></path>
                  </svg>
                  <span>{getLikeCount(featuredArticle)}</span>
                </div>
                <div
                  className="flex items-center gap-1.5 text-[#5F5F5F] text-sm cursor-pointer transition-colors duration-200 hover:text-[#016853]"
                  onClick={handleShare}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.81673 0.0474412C4.46798 0.142323 4.15947 0.406639 4.01192 0.738727C3.95156 0.860718 3.94486 1.04371 3.93144 2.28395L3.91132 3.68686L2.52303 3.70719C1.1951 3.72752 1.12133 3.72752 0.967077 3.80207C0.712222 3.92406 0.517727 4.1206 0.3903 4.38492L0.269579 4.6289L0.256165 9.7661C0.249459 14.8965 0.249459 14.9033 0.323233 15.1541C0.3903 15.3709 0.43054 15.4319 0.618328 15.6285C0.812822 15.8182 0.873183 15.8657 1.0878 15.9267C1.33595 16.0012 1.34265 16.0012 6.41963 15.9944L11.5033 15.9809L11.7448 15.8589C12.0063 15.7301 12.2008 15.5336 12.3215 15.2761C12.3953 15.1202 12.3953 15.0456 12.4154 13.7105L12.4356 12.3076L13.8238 12.2873C15.1451 12.2669 15.2188 12.2669 15.3731 12.1924C15.6279 12.0704 15.8224 11.8738 15.9499 11.6095L16.0706 11.3655L16.084 6.23512C16.0907 1.1047 16.0907 1.09792 16.0169 0.847164C15.9499 0.63029 15.9096 0.569294 15.7218 0.372752C15.5341 0.182987 15.4603 0.135546 15.2591 0.0745504C15.0109 2.42375e-08 14.9908 0 9.99431 0C6.13795 0 4.93745 0.0135546 4.81673 0.0474412ZM14.8768 6.14024V11.0606H10.0077H5.13865V6.14024V1.21992H10.0077H14.8768V6.14024ZM3.92474 8.14633V11.3655L4.02534 11.5824C4.14606 11.84 4.33385 12.0433 4.58199 12.172L4.76307 12.2669L7.9823 12.2805L11.2015 12.2873V13.5275V14.7745H6.33245H1.46337V9.85421V4.93388H2.6907H3.91803V8.14633H3.92474Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M9.18965 2.50078C8.70677 2.67699 8.65312 3.34794 9.10246 3.61226C9.22319 3.68681 9.29025 3.68681 10.3834 3.70036L11.537 3.71392L9.60547 5.66578C8.27754 7.01447 7.66052 7.66509 7.62028 7.75319C7.54651 7.94296 7.55321 8.10561 7.64711 8.2886C7.79466 8.56647 8.11658 8.68168 8.41167 8.55969C8.49886 8.51903 9.14271 7.89551 10.4773 6.55361L12.4089 4.60174L12.4223 5.76744C12.4357 6.87214 12.4357 6.93992 12.5095 7.06191C12.5967 7.21101 12.771 7.33978 12.9387 7.37366C13.2271 7.42788 13.549 7.21778 13.6295 6.92636C13.6563 6.81792 13.663 6.19441 13.6563 4.83895L13.6429 2.90064L13.5624 2.76509C13.5155 2.69054 13.4216 2.59566 13.3478 2.54822L13.2137 2.46689L11.2687 2.46011C9.65912 2.45334 9.30367 2.46011 9.18965 2.50078Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="flex flex-col gap-4">
            {articlesMock.map((article, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] border border-[#E0E0E0] flex flex-col ${
                  viewingAll ||
                  Math.floor(index / articlesPerPage) + 1 === currentPage
                    ? "flex"
                    : "hidden"
                }`}
              >
                <div className="relative w-full h-[160px] overflow-hidden">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300"
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className="text-[#016853] text-sm font-medium mb-2 uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h3 className="text-[#464646] text-lg font-semibold mb-3 leading-[1.4] line-clamp-2">
                    {truncateTitle(article.title)}
                  </h3>
                  <p className="text-[#4A4A4A] text-sm leading-[1.5] mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-start mt-auto">
                    <div className="flex items-center">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden mr-3">
                        <Image
                          src={article.avatar}
                          alt={article.author}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#464646] text-sm font-medium max-w-[120px] truncate">
                          {truncateAuthorName(article.author)}
                        </span>
                        <span className="text-[#5F5F5F] text-xs">
                          {article.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div
                        className="flex items-center gap-1.5 text-[#5F5F5F] text-sm cursor-pointer transition-colors duration-200 hover:text-[#016853]"
                        onClick={() => handleLike(article.title, article.likes)}
                        style={{
                          color: likedArticles[article.title]
                            ? "#016853"
                            : "#5F5F5F",
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="like-icon"
                        >
                          <path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                          ></path>
                        </svg>
                        <span>{getLikeCount(article)}</span>
                      </div>
                      <div
                        className="flex items-center gap-1.5 text-[#5F5F5F] text-sm cursor-pointer transition-colors duration-200 hover:text-[#016853]"
                        onClick={handleShare}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 17 16"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.81673 0.0474412C4.46798 0.142323 4.15947 0.406639 4.01192 0.738727C3.95156 0.860718 3.94486 1.04371 3.93144 2.28395L3.91132 3.68686L2.52303 3.70719C1.1951 3.72752 1.12133 3.72752 0.967077 3.80207C0.712222 3.92406 0.517727 4.1206 0.3903 4.38492L0.269579 4.6289L0.256165 9.7661C0.249459 14.8965 0.249459 14.9033 0.323233 15.1541C0.3903 15.3709 0.43054 15.4319 0.618328 15.6285C0.812822 15.8182 0.873183 15.8657 1.0878 15.9267C1.33595 16.0012 1.34265 16.0012 6.41963 15.9944L11.5033 15.9809L11.7448 15.8589C12.0063 15.7301 12.2008 15.5336 12.3215 15.2761C12.3953 15.1202 12.3953 15.0456 12.4154 13.7105L12.4356 12.3076L13.8238 12.2873C15.1451 12.2669 15.2188 12.2669 15.3731 12.1924C15.6279 12.0704 15.8224 11.8738 15.9499 11.6095L16.0706 11.3655L16.084 6.23512C16.0907 1.1047 16.0907 1.09792 16.0169 0.847164C15.9499 0.63029 15.9096 0.569294 15.7218 0.372752C15.5341 0.182987 15.4603 0.135546 15.2591 0.0745504C15.0109 2.42375e-08 14.9908 0 9.99431 0C6.13795 0 4.93745 0.0135546 4.81673 0.0474412ZM14.8768 6.14024V11.0606H10.0077H5.13865V6.14024V1.21992H10.0077H14.8768V6.14024ZM3.92474 8.14633V11.3655L4.02534 11.5824C4.14606 11.84 4.33385 12.0433 4.58199 12.172L4.76307 12.2669L7.9823 12.2805L11.2015 12.2873V13.5275V14.7745H6.33245H1.46337V9.85421V4.93388H2.6907H3.91803V8.14633H3.92474Z"
                            fill="currentColor"
                          ></path>
                          <path
                            d="M9.18965 2.50078C8.70677 2.67699 8.65312 3.34794 9.10246 3.61226C9.22319 3.68681 9.29025 3.68681 10.3834 3.70036L11.537 3.71392L9.60547 5.66578C8.27754 7.01447 7.66052 7.66509 7.62028 7.75319C7.54651 7.94296 7.55321 8.10561 7.64711 8.2886C7.79466 8.56647 8.11658 8.68168 8.41167 8.55969C8.49886 8.51903 9.14271 7.89551 10.4773 6.55361L12.4089 4.60174L12.4223 5.76744C12.4357 6.87214 12.4357 6.93992 12.5095 7.06191C12.5967 7.21101 12.771 7.33978 12.9387 7.37366C13.2271 7.42788 13.549 7.21778 13.6295 6.92636C13.6563 6.81792 13.663 6.19441 13.6563 4.83895L13.6429 2.90064L13.5624 2.76509C13.5155 2.69054 13.4216 2.59566 13.3478 2.54822L13.2137 2.46689L11.2687 2.46011C9.65912 2.45334 9.30367 2.46011 9.18965 2.50078Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div
            className={`flex justify-center items-center mt-6 gap-2 ${
              viewingAll ? "hidden" : "flex"
            }`}
          >
            <button
              className={`w-9 h-9 rounded-[18px] border border-opacity-10 bg-white text-[#5F5F5F] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#016853] ${
                currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage <= 1}
              onClick={goToPrevPage}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="w-3/5 h-1 bg-[#f0f0f0] rounded-sm relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#016853] rounded-sm transition-transform duration-300"
                style={{
                  width: `${(1 / totalPages) * 100}%`,
                  transform: `translateX(${(currentPage - 1) * 100}%)`,
                }}
              ></div>
            </div>
            <div className="text-sm text-[#5F5F5F] mx-2">
              {currentPage}/{totalPages}
            </div>
            <button
              className={`w-9 h-9 rounded-[18px] border border-opacity-10 bg-white text-[#5F5F5F] cursor-pointer flex items-center justify-center transition-all duration-200 hover:bg-[#f5f5f5] hover:text-[#016853] ${
                currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentPage >= totalPages}
              onClick={goToNextPage}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Nav Dots */}
          <div
            className={`flex justify-center mt-3 gap-1.5 ${
              viewingAll ? "hidden" : "flex"
            }`}
          >
            {articlesMock.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                  Math.floor(index / articlesPerPage) + 1 === currentPage
                    ? "bg-[#016853]"
                    : "bg-[#DFDDDB]"
                }`}
                onClick={() => goToPage(index)}
              ></div>
            ))}
          </div>

          {/* View More Button */}
          <button
            className="flex items-center justify-center w-full py-3.5 bg-white text-[#346DC2] text-base font-medium text-center border border-[#E0E0E0] rounded-lg cursor-pointer transition-all duration-300 hover:bg-[#EBFCF4] hover:text-[#016853] hover:border-[#016853] mt-6"
            onClick={toggleViewAll}
          >
            {viewingAll ? "SHOW LESS" : "VIEW ALL ARTICLES"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticlesCardMobile;
