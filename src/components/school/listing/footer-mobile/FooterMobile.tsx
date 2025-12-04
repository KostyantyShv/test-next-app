interface FooterProps {
  isFooterVisible: boolean;
  images: string[];
}

const Footer: React.FC<FooterProps> = ({ isFooterVisible, images }) => {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-[20]">
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_8px_rgba(0,0,0,0.1)] p-3 sm:p-2.5 flex justify-between items-center transition-transform duration-300 ease-in-out transform ${
          isFooterVisible ? "translate-y-[-73px]" : "translate-y-0"
        }`}
      >
        {/* School Info */}
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-black/10 flex-shrink-0">
            <img
              src={images[0]}
              alt="Lincoln Academy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center min-w-0">
              <span className="font-semibold text-xs sm:text-sm text-[#464646] truncate">
                Lincoln Academy
              </span>
              <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-[#1D77BD] ml-1 flex-shrink-0" viewBox="0 0 30 30">
                <path d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z" />
                <path
                  stroke="white"
                  fill="white"
                  d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                />
              </svg>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2.5 mt-0.5 sm:mt-1 flex-wrap">
              <span className="bg-[#00DF8B] text-[#016853] py-0.5 px-1 sm:px-1.5 rounded text-[9px] sm:text-[10px] font-semibold">
                #1 in Arts
              </span>
              <div className="flex items-center gap-0.5 text-[10px] sm:text-xs">
                <span className="font-semibold text-[#089E68]">4.8</span>
                <span className="text-[#089E68]">★</span>
                <span className="text-[#5F5F5F] text-[10px] sm:text-[11px]">(73)</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 sm:gap-3 flex-shrink-0">
          <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A4A4A]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10 transition-colors">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-[#4A4A4A]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM12 7C12.4142 7 12.75 7.33579 12.75 7.75V11.25H16.25C16.6642 11.25 17 11.5858 17 12C17 12.4142 16.6642 12.75 16.25 12.75H12.75V16.25C12.75 16.6642 12.4142 17 12 17C11.5858 17 11.25 16.6642 11.25 16.25V12.75H7.75C7.33579 12.75 7 12.4142 7 12C7 11.5858 7.33579 11.25 7.75 11.25H11.25V7.75C11.25 7.33579 11.5858 7 12 7Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
