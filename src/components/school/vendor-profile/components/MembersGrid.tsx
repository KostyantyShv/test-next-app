import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export type Member = {
  name: string;
  avatar: string;
  joined: string;
  location: string;
  isPro: boolean;
  hasListings: boolean;
  listings: string[];
};

type MembersGridProps = {
  members?: Member[];
};

const membersData = [
    {
        name: "Nixtio Branding",
        avatar: "https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg",
        joined: "Dec 15, 2024",
        location: "Miami, FL, United States",
        isPro: true,
        hasListings: true,
        listings: [
            "https://i.ibb.co/LJwrLdW/coaching-image.webp",
            "https://i.ibb.co/Csdq4rd/newsletter-image.png",
            "https://i.ibb.co/jJ4GHXP/img1.jpg"
        ]
    },
    {
        name: "Bogdan Nikitin",
        avatar: "https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg",
        joined: "Nov 30, 2024",
        location: "Miami, FL, United States",
        isPro: true,
        hasListings: true,
        listings: [
            "https://i.ibb.co/Csdq4rd/newsletter-image.png",
            "https://i.ibb.co/jJ4GHXP/img1.jpg",
            "https://i.ibb.co/LJwrLdW/coaching-image.webp"
        ]
    },
    {
        name: "Anatoly",
        avatar: "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png",
        joined: "Jan 5, 2025",
        location: "Miami, FL, United States",
        isPro: false,
        hasListings: false
    }
];

const avatarImages = [
    'https://i.ibb.co/87nXCrv/AVATAR-Citra-Gunasiwi-for-Paperpillar.jpg',
    'https://i.ibb.co/mFj8fCs/AVATAR-couponcodefinder.jpg',
    'https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png'
];

const productImages = [
    'https://i.ibb.co/LJwrLdW/coaching-image.webp',
    'https://i.ibb.co/Csdq4rd/newsletter-image.png',
    'https://i.ibb.co/jJ4GHXP/img1.jpg'
];

export const MembersGrid: React.FC<MembersGridProps> = ({ members }) => {
  return (
    <div className={`${inter.className} text-[#4A4A4A]`}>
            <div className="mx-auto">
                <div className="bg-white">
          <nav className="flex gap-8 border-b border-gray-200 mb-8 pb-1 overflow-x-auto">
            <div className="flex items-center gap-2 py-3 text-[#016853] font-medium border-b-2 border-[#016853] whitespace-nowrap">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 32 32">
                            <path fill="currentColor" d="M16.4847 5.82368C14.8958 5.82368 13.6733 7.05276 13.6733 8.48961C13.6733 9.92647 14.8958 11.1555 16.4847 11.1555C18.0736 11.1555 19.2961 9.92647 19.2961 8.48961C19.2961 7.05276 18.0736 5.82368 16.4847 5.82368ZM11.7324 8.48961C11.7324 5.90979 13.8963 3.88281 16.4847 3.88281C19.0731 3.88281 21.2369 5.90979 21.2369 8.48961C21.2369 11.0694 19.0731 13.0964 16.4847 13.0964C13.8963 13.0964 11.7324 11.0694 11.7324 8.48961ZM7.66046 10.6722C6.76779 10.6722 6.10968 11.3586 6.10968 12.126C6.10968 12.8934 6.76779 13.5798 7.66046 13.5798C8.55312 13.5798 9.21123 12.8934 9.21123 12.126C9.21123 11.3586 8.55312 10.6722 7.66046 10.6722ZM4.16881 12.126C4.16881 10.2156 5.76834 8.7313 7.66046 8.7313C9.55257 8.7313 11.1521 10.2156 11.1521 12.126C11.1521 14.0363 9.55257 15.5207 7.66046 15.5207C5.76834 15.5207 4.16881 14.0363 4.16881 12.126ZM25.3089 10.6722C24.4163 10.6722 23.7582 11.3586 23.7582 12.126C23.7582 12.8934 24.4163 13.5798 25.3089 13.5798C26.2016 13.5798 26.8597 12.8934 26.8597 12.126C26.8597 11.3586 26.2016 10.6722 25.3089 10.6722ZM21.8173 12.126C21.8173 10.2156 23.4168 8.7313 25.3089 8.7313C27.201 8.7313 28.8006 10.2156 28.8006 12.126C28.8006 14.0363 27.201 15.5207 25.3089 15.5207C23.4168 15.5207 21.8173 14.0363 21.8173 12.126ZM16.4847 16.7328C14.2186 16.7328 12.3039 18.078 11.5266 19.9449C11.2851 20.5254 11.1521 21.1585 11.1521 21.8229V23.2768H21.8173V21.8229C21.8173 21.1585 21.6843 20.5254 21.4428 19.9449C20.6655 18.078 18.7508 16.7328 16.4847 16.7328ZM23.4576 19.8169C23.6532 20.4531 23.7582 21.1267 23.7582 21.8229V23.2768H28.1203V21.8229C28.1203 20.3861 26.8978 19.157 25.3089 19.157C24.5952 19.157 23.9494 19.4081 23.4576 19.8169ZM22.6105 18.0304C21.3124 16.0742 19.0455 14.7919 16.4847 14.7919C13.9239 14.7919 11.657 16.0742 10.3589 18.0304C9.59018 17.5156 8.65918 17.2161 7.66046 17.2161C5.0721 17.2161 2.9082 19.2431 2.9082 21.8229V24.2472C2.9082 24.7831 3.34268 25.2176 3.87864 25.2176H29.0908C29.6267 25.2176 30.0612 24.7831 30.0612 24.2472V21.8229C30.0612 19.2431 27.8973 17.2161 25.3089 17.2161C24.3102 17.2161 23.3792 17.5156 22.6105 18.0304ZM9.5118 19.8169C9.01995 19.4081 8.37421 19.157 7.66046 19.157C6.07155 19.157 4.84907 20.3861 4.84907 21.8229V23.2768H9.21123V21.8229C9.21123 21.1267 9.31625 20.4531 9.5118 19.8169Z" clipRule="evenodd" fillRule="evenodd"></path>
                        </svg>
              Members
            </div>
          </nav>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {membersData.map((member, idx) => (
        <div
          key={idx}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
        >
          <div className="flex p-6 relative">
            <div className="relative">
            <img src={avatarImages[idx]} alt="avatar" className="w-10 h-10 rounded-full object-cover" />

              {member.isPro && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-white text-[8px] font-bold uppercase rounded px-1.5 py-0.5 flex items-center gap-1">
                  <svg
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[10px] h-[10px]"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3 0C1.34315 0 0 1.34315 0 3V9C0 10.6569 1.34315 12 3 12H13C14.6569 12 16 10.6569 16 9V3C16 1.34315 14.6569 0 13 0H3ZM10.9285 5.864C10.9285 6.644 11.2825 7.238 11.9725 7.238C12.6685 7.238 13.0105 6.644 13.0105 5.864C13.0105 5.084 12.6685 4.48 11.9725 4.48C11.2825 4.48 10.9285 5.08 10.9285 5.864ZM14.0905 5.864C14.0905 7.148 13.2685 8.102 11.9665 8.102C10.6705 8.102 9.84851 7.148 9.84851 5.864C9.84851 4.58 10.6705 3.626 11.9665 3.626C13.2685 3.626 14.0905 4.58 14.0905 5.864ZM2.08301 8H3.16301V6.566H4.16501C5.04701 6.566 5.61701 5.984 5.61701 5.162C5.61701 4.73 5.46101 4.364 5.18501 4.106C4.92101 3.854 4.53701 3.71 4.01501 3.71H2.08301V8ZM3.16301 5.726V4.604H3.94901C4.32701 4.604 4.54901 4.814 4.54901 5.156C4.54901 5.474 4.33301 5.726 3.94901 5.726H3.16301ZM5.9977 8H7.0597V6.392H7.7017C8.1577 6.392 8.3617 6.608 8.4157 7.004C8.43883 7.15331 8.45165 7.3122 8.46344 7.45845C8.4853 7.72949 8.50366 7.95713 8.5777 8H9.6097V7.946C9.5173 7.91273 9.50459 7.69505 9.48741 7.39994C9.4767 7.21661 9.46426 7.00358 9.4297 6.78702C9.3697 6.36102 9.1777 6.12702 8.8057 6.00102V5.98302C9.3037 5.80902 9.5497 5.44302 9.5497 4.94502C9.5497 4.14702 8.9017 3.70902 8.0497 3.70902H5.9977V8ZM7.0597 5.606V4.55H7.8817C8.2897 4.55 8.4937 4.772 8.4937 5.084C8.4937 5.408 8.2777 5.606 7.8817 5.606H7.0597Z"
                      fill="currentColor"
                    />
                  </svg>
                  Pro
                </span>
              )}
            </div>
            <div className="pl-4 flex-1">
              <div className="text-sm font-semibold text-gray-800 mb-1 flex items-center gap-2">
                {member.name}
              </div>
              <div className="text-sm text-gray-500">{member.joined}</div>
              <div className="text-sm text-gray-500">{member.location}</div>
            </div>
            <button className="absolute top-6 right-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg px-4 py-1.5 text-sm font-medium flex items-center gap-2">
              Follow
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1 px-4 pb-2 h-[88px]">
            {member.hasListings && member.listings?.length ? (
              member.listings.slice(0, 3).map((src, i) => (
                <img
                  key={i}
                  src={productImages[i]}
                  alt="Listing"
                  width={100}
                  height={80}
                  className="w-full h-[80px] object-cover rounded-md"
                />
              ))
            ) : (
              <div className="col-span-3 bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-medium rounded-xl">
                No listings available
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    </div>
    </div>
    </div>
  );
};

export default MembersGrid;
