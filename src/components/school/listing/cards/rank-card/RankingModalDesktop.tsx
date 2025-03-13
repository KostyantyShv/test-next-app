// components/Popup.tsx
import { DesktopModal } from "@/components/ui/DesktopModal/DesktopModal";
import React from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RankCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const RankCard: React.FC<RankCardProps> = ({ icon, title, value }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <div className="bg-gradient-to-b from-[rgba(1,104,83,0.05)] to-[rgba(1,104,83,0.02)] p-6 flex justify-center items-center h-[100px]">
        {icon}
      </div>
      <div className="p-5">
        <a
          href="#"
          className="text-[#346DC2] text-base font-semibold leading-[1.4] mb-3 block no-underline hover:text-[#1D77BD]"
        >
          {title}
        </a>
        <div className="text-[#5F5F5F] text-[15px]">
          <strong className="text-[#016853] font-bold">
            {value.split(" ")[0]}
          </strong>{" "}
          {value.split(" ").slice(1).join(" ")}
        </div>
      </div>
    </div>
  );
};

const RankingModalDesktop: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <DesktopModal isOpen={isOpen} onClose={onClose}>
      <div className="sticky top-0 bg-white z-[2]">
        <div className="h-[11px] bg-gradient-to-r from-[#016853] to-[#089E68]" />
        <div className="p-8 border-b border-black/8 relative">
          <h1 className="text-[#016853] text-[28px] font-bold mb-2 flex items-center gap-3">
            <svg
              viewBox="0 0 33 36"
              fill="none"
              height="36"
              width="33"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 12.847v10.306c0 2.772 1.464 5.318 3.878 6.734l8.662 5.05a7.91 7.91 0 0 0 7.92 0l8.662-5.05A7.81 7.81 0 0 0 33 23.153V12.847c0-2.772-1.464-5.317-3.878-6.734l-8.662-5.05a7.91 7.91 0 0 0-7.92 0l-8.662 5.05A7.81 7.81 0 0 0 0 12.847"
                fill="#089E68"
              ></path>
              <g transform="translate(7 8)">
                <g
                  clipPath="url(#TopProductSmall_svg__a)"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  stroke="#fff"
                >
                  <path d="M7.125 16.625h4.75M9.5 12.294v4.33M4.75 9.5h-.754c-.64 0-1.254-.286-1.706-.795a2.9 2.9 0 0 1-.707-1.92V5.43c0-.18.064-.353.177-.48a.57.57 0 0 1 .426-.199H4.6M14.25 9.5h.754c.64 0 1.254-.286 1.706-.795.453-.509.707-1.2.707-1.92V5.43a.72.72 0 0 0-.177-.48.57.57 0 0 0-.426-.199H14.4"></path>
                  <path
                    d="M4.75 3.167h9.5v4.408c0 2.773-2.095 5.07-4.714 5.092a4.5 4.5 0 0 1-1.829-.372 4.7 4.7 0 0 1-1.553-1.088 5.1 5.1 0 0 1-1.039-1.636 5.3 5.3 0 0 1-.365-1.933z"
                    fill="#fff"
                  ></path>
                </g>
              </g>
            </svg>
            Lincoln Academy Rankings
          </h1>
          <p className="text-[#5F5F5F] text-base leading-6 m-0">
            Niche rankings are based on rigorous analysis of key statistics and
            millions of reviews.
          </p>
          <button
            className="absolute top-6 right-6 bg-none border-none text-[#5F5F5F] cursor-pointer p-2 rounded-full flex items-center justify-center transition-all duration-200 ease-in-out hover:bg-black/5 hover:text-[#464646]"
            onClick={onClose}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6l12 12m-12 0L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)]">
        <h2 className="text-[#464646] text-2xl font-semibold mb-6">National</h2>
        <div className="grid grid-cols-3 gap-6 mb-10">
          <RankCard
            icon={
              <svg viewBox="0 0 512 512" className="h-16 text-[#016853]">
                <path
                  d="M89.6 422.4c7.9 7.9 31.4 16.9 80.4 .6c13.2-4.4 27.2-10.4 41.6-17.9c-18.9-14.4-37.7-30.8-55.8-48.9s-34.5-36.9-48.9-55.8c-7.5 14.4-13.5 28.4-17.9 41.6c-16.3 49-7.3 72.5 .6 80.4zM76.8 256C27.6 173.9 16.5 94.9 55.7 55.7S173.9 27.6 256 76.8c82.1-49.2 161.1-60.3 200.3-21.1s28.1 118.2-21.1 200.3c49.2 82.1 60.3 161.1 21.1 200.3s-118.2 28.1-200.3-21.1c-82.1 49.2-161.1 60.3-200.3 21.1S27.6 338.1 76.8 256zM107 211.6c14.4-18.9 30.8-37.7 48.9-55.8s36.9-34.5 55.8-48.9c-14.4-7.5-28.4-13.5-41.6-17.9c-49-16.3-72.5-7.3-80.4 .6s-16.9 31.4-.6 80.4c4.4 13.2 10.4 27.2 17.9 41.6zM256 134c-22.1 15.5-44.5 34.1-66.2 55.8s-40.3 44.1-55.8 66.2c15.5 22.1 34.1 44.5 55.8 66.2s44.1 40.3 66.2 55.8c22.1-15.5 44.5-34.1 66.2-55.8s40.3-44.1 55.8-66.2c-15.5-22.1-34.1-44.5-55.8-66.2s-44.1-40.3-66.2-55.8zm149 77.7c7.5-14.4 13.5-28.4 17.9-41.6c16.3-49 7.3-72.5-.6-80.4s-31.4-16.9-80.4-.6c-13.2 4.4-27.2 10.4-41.6 17.9c18.9 14.4 37.7 30.8 55.8 48.9s34.5 36.9 48.9 55.8zm0 88.7c-14.4 18.9-30.8 37.7-48.9 55.8s-36.9 34.5-55.8 48.9c14.4 7.5 28.4 13.5 41.6 17.9c49 16.3 72.5 7.3 80.4-.6s16.9-31.4 .6-80.4c-4.4-13.2-10.4-27.2-17.9-41.6zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                  fill="currentColor"
                ></path>
              </svg>
            }
            title="Best Colleges for Physics in America"
            value="#1 of 915"
          />
          <RankCard
            icon={
              <img
                src="https://i.ibb.co/r2DXdXDg/rank1-removebg-preview.png"
                alt="College icon"
                className="h-16 object-contain"
              />
            }
            title="Colleges with the Best Academics in America"
            value="#1 of 1,519"
          />
          <RankCard
            icon={
              <svg viewBox="0 0 512 512" className="h-16 text-[#016853]">
                <path
                  d="M89.6 422.4c7.9 7.9 31.4 16.9 80.4 .6c13.2-4.4 27.2-10.4 41.6-17.9c-18.9-14.4-37.7-30.8-55.8-48.9s-34.5-36.9-48.9-55.8c-7.5 14.4-13.5 28.4-17.9 41.6c-16.3 49-7.3 72.5 .6 80.4zM76.8 256C27.6 173.9 16.5 94.9 55.7 55.7S173.9 27.6 256 76.8c82.1-49.2 161.1-60.3 200.3-21.1s28.1 118.2-21.1 200.3c49.2 82.1 60.3 161.1 21.1 200.3s-118.2 28.1-200.3-21.1c-82.1 49.2-161.1 60.3-200.3 21.1S27.6 338.1 76.8 256zM107 211.6c14.4-18.9 30.8-37.7 48.9-55.8s36.9-34.5 55.8-48.9c-14.4-7.5-28.4-13.5-41.6-17.9c-49-16.3-72.5-7.3-80.4 .6s-16.9 31.4-.6 80.4c4.4 13.2 10.4 27.2 17.9 41.6zM256 134c-22.1 15.5-44.5 34.1-66.2 55.8s-40.3 44.1-55.8 66.2c15.5 22.1 34.1 44.5 55.8 66.2s44.1 40.3 66.2 55.8c22.1-15.5 44.5-34.1 66.2-55.8s40.3-44.1 55.8-66.2c-15.5-22.1-34.1-44.5-55.8-66.2s-44.1-40.3-66.2-55.8zm149 77.7c7.5-14.4 13.5-28.4 17.9-41.6c16.3-49 7.3-72.5-.6-80.4s-31.4-16.9-80.4-.6c-13.2 4.4-27.2 10.4-41.6 17.9c18.9 14.4 37.7 30.8 55.8 48.9s34.5 36.9 48.9 55.8zm0 88.7c-14.4 18.9-30.8 37.7-48.9 55.8s-36.9 34.5-55.8 48.9c14.4 7.5 28.4 13.5 41.6 17.9c49 16.3 72.5 7.3 80.4-.6s16.9-31.4 .6-80.4c-4.4-13.2-10.4-27.2-17.9-41.6zM224 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"
                  fill="currentColor"
                ></path>
              </svg>
            }
            title="Best Private Colleges in America"
            value="#2 of 945"
          />
        </div>

        <h2 className="text-[#464646] text-2xl font-semibold mb-6">
          Massachusetts
        </h2>
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Add Massachusetts rankings here */}
        </div>

        <h2 className="text-[#464646] text-2xl font-semibold mb-6">
          Boston Area
        </h2>
        <div className="grid grid-cols-3 gap-6 mb-10">
          {/* Add Boston Area rankings here */}
        </div>
      </div>
    </DesktopModal>
  );
};

export default RankingModalDesktop;
