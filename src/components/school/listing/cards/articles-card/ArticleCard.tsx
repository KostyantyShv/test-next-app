import { Article } from "./types";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <div className="article-card flex flex-col h-full border border-[#E0E0E0] bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
      <div className="article-image-container relative w-full h-[200px] overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="article-image w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="article-content flex flex-col flex-1 p-5">
        <span className="category text-[#016853] text-sm font-medium mb-3 uppercase tracking-[0.5px]">
          {article.category}
        </span>
        <h3 className="article-title text-[#464646] text-xl font-semibold mb-3 leading-[1.4] line-clamp-2 overflow-hidden text-ellipsis">
          {article.title}
        </h3>
        <p className="article-excerpt text-[#4A4A4A] text-[15px] leading-[1.6] mb-5 line-clamp-3 overflow-hidden flex-grow">
          {article.excerpt}
        </p>
        <div className="footer-delimiter h-[1px] bg-[#E0E0E0] mb-4 w-full" />
        <div className="article-footer flex justify-between items-start mt-auto">
          <div className="author-info flex items-center">
            <img
              src={article.avatar}
              alt={article.author}
              className="author-avatar w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="author-details flex flex-col mt-[2px]">
              <span className="author-name text-[#464646] text-[15px] font-medium max-w-[120px] whitespace-nowrap overflow-hidden text-ellipsis">
                {article.author}
              </span>
              <span className="article-date text-[#5F5F5F] text-[13px]">
                {article.date}
              </span>
            </div>
          </div>
          <div className="interaction-group flex gap-4 mt-1">
            <div className="interaction flex items-center gap-2 text-[#5F5F5F] text-sm cursor-pointer transition-colors duration-200 hover:text-[#016853]">
              <svg fill="none" viewBox="0 0 16 16" className="w-4 h-4">
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  d="M10.7408 2C13.0889 2 14.6667 4.235 14.6667 6.32C14.6667 10.5425 8.11856 14 8.00004 14C7.88152 14 1.33337 10.5425 1.33337 6.32C1.33337 4.235 2.91115 2 5.2593 2C6.60745 2 7.48893 2.6825 8.00004 3.2825C8.51115 2.6825 9.39263 2 10.7408 2Z"
                />
              </svg>
            </div>
            <div className="interaction flex items-center gap-2 text-[#5F5F5F] text-sm cursor-pointer transition-colors duration-200 hover:text-[#016853]">
              <svg viewBox="0 0 17 16" fill="currentColor" className="w-4 h-4">
                <path d="M4.81673 0.0474412C4.46798 0.142323 4.15947 0.406639 4.01192 0.738727C3.95156 0.860718 3.94486 1.04371 3.93144 2.28395L3.91132 3.68686L2.52303 3.70719C1.1951 3.72752 1.12133 3.72752 0.967077 3.80207C0.712222 3.92406 0.517727 4.1206 0.3903 4.38492L0.269579 4.6289L0.256165 9.7661C0.249459 14.8965 0.249459 14.9033 0.323233 15.1541C0.3903 15.3709 0.43054 15.4319 0.618328 15.6285C0.812822 15.8182 0.873183 15.8657 1.0878 15.9267C1.33595 16.0012 1.34265 16.0012 6.41963 15.9944L11.5033 15.9809L11.7448 15.8589C12.0063 15.7301 12.2008 15.5336 12.3215 15.2761C12.3953 15.1202 12.3953 15.0456 12.4154 13.7105L12.4356 12.3076L13.8238 12.2873C15.1451 12.2669 15.2188 12.2669 15.3731 12.1924C15.6279 12.0704 15.8224 11.8738 15.9499 11.6095L16.0706 11.3655L16.084 6.23512C16.0907 1.1047 16.0907 1.09792 16.0169 0.847164C15.9499 0.63029 15.9096 0.569294 15.7218 0.372752C15.5341 0.182987 15.4603 0.135546 15.2591 0.0745504C15.0109 2.42375e-08 14.9908 0 9.99431 0C6.13795 0 4.93745 0.0135546 4.81673 0.0474412ZM14.8768 6.14024V11.0606H10.0077H5.13865V6.14024V1.21992H10.0077H14.8768V6.14024ZM3.92474 8.14633V11.3655L4.02534 11.5824C4.14606 11.84 4.33385 12.0433 4.58199 12.172L4.76307 12.2669L7.9823 12.2805L11.2015 12.2873V13.5275V14.7745H6.33245H1.46337V9.85421V4.93388H2.6907H3.91803V8.14633H3.92474Z" />
                <path d="M9.18965 2.50078C8.70677 2.67699 8.65312 3.34794 9.10246 3.61226C9.22319 3.68681 9.29025 3.68681 10.3834 3.70036L11.537 3.71392L9.60547 5.66578C8.27754 7.01447 7.66052 7.66509 7.62028 7.75319C7.54651 7.94296 7.55321 8.10561 7.64711 8.2886C7.79466 8.56647 8.11658 8.68168 8.41167 8.55969C8.49886 8.51903 9.14271 7.89551 10.4773 6.55361L12.4089 4.60174L12.4223 5.76744C12.4357 6.87214 12.4357 6.93992 12.5095 7.06191C12.5967 7.21101 12.771 7.33978 12.9387 7.37366C13.2271 7.42788 13.549 7.21778 13.6295 6.92636C13.6563 6.81792 13.663 6.19441 13.6563 4.83895L13.6429 2.90064L13.5624 2.76509C13.5155 2.69054 13.4216 2.59566 13.3478 2.54822L13.2137 2.46689L11.2687 2.46011C9.65912 2.45334 9.30367 2.46011 9.18965 2.50078Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
