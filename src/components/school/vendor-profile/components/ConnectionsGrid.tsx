import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface Follower {
  name: string;
  image: string;
  followers: string;
  location: string;
  following: string;
  reviews: string;
}

const followersData: Follower[] = [
  {
    name: "Jake Conrad",
    image:
      "https://i.ibb.co/Hqy4WwQ/AVATAR-smallbusiness-withgoogle-com-free-google-training.jpg",
    followers: "322",
    location: "New York, USA",
    following: "45",
    reviews: "5",
  },
  {
    name: "Matt Riddle",
    image: "https://i.ibb.co/chkjCFZ/AVATAR-x-com-eladgil.jpg",
    followers: "24",
    location: "San Francisco, CA",
    following: "86",
    reviews: "8",
  },
  {
    name: "Fredric Nolan",
    image: "https://i.ibb.co/y0jHWWH/AVATAR-github-com-biowaffeln.png",
    followers: "3.2k",
    location: "London, UK",
    following: "95",
    reviews: "6",
  },
  {
    name: "Oliver Patel",
    image: "https://i.ibb.co/hMhYzYT/AVATAR-Ryan-Zhang.png",
    followers: "1.6k",
    location: "Toronto, Canada",
    following: "27",
    reviews: "4",
  },
  {
    name: "Jude Pierce",
    image: "https://i.ibb.co/446B0ZT/AVATAR-laurentfa.png",
    followers: "895",
    location: "Austin, TX",
    following: "755",
    reviews: "3",
  },
];

const ICONS = {
  location: (
    <svg
      className="w-4 h-4"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12,5.5c-2.1,0-3.9,1.7-3.9,3.8c0,2.1,1.7,3.8,3.9,3.8c2.1,0,3.9-1.7,3.9-3.8C15.9,7.2,14.1,5.5,12,5.5z M12,11.7c-1.4,0-2.5-1.1-2.5-2.5c0-1.4,1.1-2.5,2.5-2.5c1.4,0,2.5,1.1,2.5,2.5C14.5,10.6,13.4,11.7,12,11.7z"></path>
      <path d="M17,2.5l-0.1-0.1c-2.7-2-7.2-1.9-9.9,0.1c-2.9,2.1-4.3,5.7-3.6,9c0.2,0.9,0.5,1.8,1,2.8c0.5,0.9,1.1,1.8,1.9,2.9l4.8,5.3c0.2,0.3,0.5,0.4,0.9,0.4h0c0.3,0,0.7-0.2,0.9-0.5c0,0,0,0,0,0l4.6-5.2c0.9-1.1,1.5-1.9,2.1-3c0.5-1,0.8-1.9,1-2.8C21.3,8.2,19.9,4.7,17,2.5L17,2.5z M19.2,11.2c-0.2,0.8-0.5,1.6-0.9,2.4c-0.6,1-1.1,1.7-1.9,2.7L12,21.5l-4.6-5.1c-0.7-0.9-1.3-1.8-1.7-2.6c-0.4-0.9-0.7-1.7-0.9-2.4c-0.6-2.8,0.6-5.8,3-7.6c1.2-0.9,2.7-1.3,4.2-1.3c1.5,0,3,0.4,4.1,1.2l0.1,0.1C18.6,5.5,19.8,8.4,19.2,11.2z"></path>
    </svg>
  ),
  following: (
    <svg
      className="w-4 h-4"
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-10.3-78.67,12,12,0,1,1-6.16-23.19,64,64,0,0,1,57.64,110.8,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z"></path>
    </svg>
  ),
  reviews: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M12 4.875a.75.75 0 01.648.372l1.994 3.414 3.893.85a.75.75 0 01.395 1.238l-2.646 2.905.414 3.892a.75.75 0 01-1.042.768L12 16.744l-3.656 1.57a.75.75 0 01-1.042-.768l.414-3.892L5.07 10.75a.75.75 0 01.395-1.238l3.893-.85 1.994-3.414A.75.75 0 0112 4.875zm0 2.237l-1.512 2.59a.75.75 0 01-.488.354l-2.946.643 1.998 2.195a.75.75 0 01.191.584L8.93 16.43l2.775-1.192a.75.75 0 01.592 0l2.775 1.192-.314-2.952a.75.75 0 01.191-.584l1.998-2.195L14 10.056a.75.75 0 01-.488-.355L12 7.112z"
        clipRule="evenodd"
        fillRule="evenodd"
      ></path>
    </svg>
  ),
  followButton: (
    <svg
      className="w-4 h-4"
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path d="M2 21a8 8 0 0 1 13.292-6"></path>
      <circle r="5" cy="8" cx="10"></circle>
      <path d="M19 16v6"></path>
      <path d="M22 19h-6"></path>
    </svg>
  ),
  following_check: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6L9 17L4 12"></path>
    </svg>
  ),
};

const ConnectionsGrid: React.FC = () => {
  return (
    <div className={`${inter.className} text-[#4A4A4A]`}>
      <div className="mx-auto">
        <div className="bg-white">
          <nav className="flex gap-8 border-b border-gray-200 mb-8 pb-1 overflow-x-auto">
            <div className="flex items-center gap-2 py-3 text-[#016853] font-medium border-b-2 border-[#016853] whitespace-nowrap">
              <svg
                viewBox="0 0 256 256"
                fill="currentColor"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M125.18,156.94a64,64,0,1,0-82.36,0,100.23,100.23,0,0,0-39.49,32,12,12,0,0,0,19.35,14.2,76,76,0,0,1,122.64,0,12,12,0,0,0,19.36-14.2A100.33,100.33,0,0,0,125.18,156.94ZM44,108a40,40,0,1,1,40,40A40,40,0,0,1,44,108Zm206.1,97.67a12,12,0,0,1-16.78-2.57A76.31,76.31,0,0,0,172,172a12,12,0,0,1,0-24,40,40,0,1,0-10.3-78.67,12,12,0,1,1-6.16-23.19,64,64,0,0,1,57.64,110.8,100.23,100.23,0,0,1,39.49,32A12,12,0,0,1,250.1,205.67Z" />
              </svg>
              Connections
            </div>
          </nav>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-[#464646]">
              4 Followers
            </h2>
            <div className="text-sm text-[#6F767E]">
              View:{" "}
              <span className="cursor-pointer text-[#016853] font-medium">
                Followers
              </span>{" "}
              •{" "}
              <span className="cursor-pointer hover:underline">Following</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {followersData.map((follower, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={follower.image}
                    alt={follower.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-[#13C4CC] font-semibold text-base mb-1">
                      {follower.name}
                    </h3>
                    <p className="text-sm text-[#6F767E] font-medium">
                      {follower.followers} Followers
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 text-xs text-[#6F767E] mb-5">
                  <div className="flex items-center gap-1 relative group">
                    <span className="flex items-center gap-1 font-medium text-[#464646]">
                      <span className="w-4 h-4 flex items-center justify-center">
                        {ICONS.location}
                      </span>
                      {follower.location}
                    </span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Location
                    </div>
                  </div>

                  <div className="flex items-center gap-1 relative group">
                    <span className="flex items-center gap-1 font-medium text-[#464646]">
                      <span className="w-4 h-4 flex items-center justify-center">
                        {ICONS.following}
                      </span>
                      {follower.following}
                    </span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Following
                    </div>
                  </div>

                  <div className="flex items-center gap-1 relative group">
                    <span className="flex items-center gap-1 font-medium text-[#464646]">
                      <span className="w-4 h-4 flex items-center justify-center">
                        {ICONS.reviews}
                      </span>
                      {follower.reviews}
                    </span>
                    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Reviews
                    </div>
                  </div>
                </div>

                <button className="mt-auto bg-[#F5F5F7] hover:bg-[#E8E8EA] text-[#4A4A4A] rounded-lg px-4 py-2 text-sm font-medium flex justify-center items-center gap-2">
                  {ICONS.followButton}
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsGrid;
