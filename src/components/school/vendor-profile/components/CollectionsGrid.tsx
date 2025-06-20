import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface Collection {
  name: string;
  items: number;
  vendors: number;
  date: string;
}

export const CollectionsGrid: React.FC = () => {
  const mainImages = [
    "https://i.ibb.co/67bNbd9X/cover1.webp",
    "https://i.ibb.co/QjxjsjdZ/butterfly.webp",
    "https://i.ibb.co/kgwFwhKr/commuting-desktop.webp",
    "https://i.ibb.co/BHcDXgQt/product5.webp",
  ];

  const thumbnailImages = [
    "https://i.ibb.co/QjxjsjdZ/butterfly.webp",
    "https://i.ibb.co/QjxjsjdZ/butterfly.webp",
    "https://i.ibb.co/QjxjsjdZ/butterfly.webp",
    "https://i.ibb.co/J8QjpbD/school1.webp",
    "https://i.ibb.co/fVRCnNZ/school2.webp",
    "https://i.ibb.co/fzzhd5t/school4.webp",
    "https://i.ibb.co/B5pFBbB/school5.webp",
    "https://i.ibb.co/67bNbd9X/cover1.webp",
    "https://i.ibb.co/QjxjsjdZ/butterfly.webp",
  ];

  const collectionsData: Collection[] = [
    {
      name: "Collection 1",
      items: 49,
      vendors: 4,
      date: "Sept 28, 2024",
    },
    {
      name: "Collection 2",
      items: 106,
      vendors: 9,
      date: "Oct 15, 2024",
    },
    {
      name: "Collection 3",
      items: 320,
      vendors: 18,
      date: "Oct 3, 2024",
    },
    {
      name: "Art & Design",
      items: 72,
      vendors: 6,
      date: "Sept 19, 2024",
    },
    {
      name: "Nature & Wildlife",
      items: 154,
      vendors: 12,
      date: "Oct 10, 2024",
    },
    {
      name: "Digital Innovation",
      items: 87,
      vendors: 7,
      date: "Oct 18, 2024",
    },
  ];

  const CollectionCard: React.FC<{ collection: Collection; index: number }> = ({
    collection,
    index,
  }) => {
    const mainImageUrl = mainImages[index % mainImages.length];

    // Get 3 unique thumbnails for each collection
    const thumbnails: string[] = [];
    for (let i = 0; i < 3; i++) {
      const thumbIndex = (index * 3 + i) % thumbnailImages.length;
      thumbnails.push(thumbnailImages[thumbIndex]);
    }

    return (
      <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 ease-in-out relative pb-4 border border-transparent hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:border-gray-200 group">
        <div className="relative w-full h-[220px] overflow-hidden rounded-t-xl">
          <img
            src={mainImageUrl}
            alt={collection.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 my-0.5 px-0 w-full">
          {thumbnails.map((thumb, thumbIndex) => (
            <div
              key={thumbIndex}
              className="w-full h-[70px] rounded-b-lg overflow-hidden"
            >
              <img
                src={thumb}
                alt="Thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="px-4 pt-2">
          <h3 className="text-lg font-semibold text-[#464646] mb-2 leading-[1.4]">
            {collection.name}
          </h3>
          <div className="text-sm text-[#5F5F5F] flex items-center">
            <span>{collection.items} Items</span>
            <span className="mx-1.5 inline-block w-[3px] h-[3px] bg-[#5F5F5F] rounded-full align-middle"></span>
            <span>{collection.vendors} Vendors</span>
            <span className="mx-1.5 inline-block w-[3px] h-[3px] bg-[#5F5F5F] rounded-full align-middle"></span>
            <span className="relative group/tooltip">
              {collection.date}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap opacity-0 invisible transition-all duration-200 ease-in-out z-10 mb-2 group-hover/tooltip:opacity-100 group-hover/tooltip:visible">
                Updated {collection.date}
                <div className="absolute top-full left-1/2 -ml-1.5 border-[5px] border-solid border-black/80 border-b-transparent border-l-transparent border-r-transparent"></div>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const MobileCollectionCard: React.FC<{ collection: Collection; index: number }> = ({
    collection,
    index,
  }) => {
    const mainImageUrl = mainImages[index % mainImages.length];

    // Get 3 unique thumbnails for each collection
    const thumbnails: string[] = [];
    for (let i = 0; i < 3; i++) {
      const thumbIndex = (index * 3 + i) % thumbnailImages.length;
      thumbnails.push(thumbnailImages[thumbIndex]);
    }

    return (
      <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 ease-in-out relative border border-transparent shadow-[0_1px_3px_rgba(0,0,0,0.1)] active:shadow-[0_4px_12px_rgba(0,0,0,0.12)] active:-translate-y-0.5 active:border-[#E5E7EB]">
        <div className="relative w-full h-[160px] overflow-hidden rounded-t-xl">
          <img
            src={mainImageUrl}
            alt={collection.name}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out active:scale-105"
          />
        </div>

        <div className="grid grid-cols-3 gap-2 mt-0.5 mb-3 w-full">
          {thumbnails.map((thumb, thumbIndex) => (
            <div
              key={thumbIndex}
              className={`w-full h-[60px] overflow-hidden ${
                thumbIndex === 0 ? "rounded-br-lg" : 
                thumbIndex === 1 ? "rounded-b-lg" : 
                "rounded-bl-lg"
              }`}
            >
              <img
                src={thumb}
                alt="Thumbnail"
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out active:scale-110"
              />
            </div>
          ))}
        </div>

        <div className="px-3 pb-3">
          <h3 className="text-base font-semibold text-[#464646] mb-1.5 leading-[1.4]">
            {collection.name}
          </h3>
          <div className="text-xs text-[#5F5F5F] flex items-center flex-wrap">
            <span>{collection.items} Items</span>
            <span className="mx-1.5 inline-block w-[3px] h-[3px] bg-[#5F5F5F] rounded-full align-middle"></span>
            <span>{collection.vendors} Vendors</span>
            <span className="mx-1.5 inline-block w-[3px] h-[3px] bg-[#5F5F5F] rounded-full align-middle"></span>
            <span className="relative active:block">
              {collection.date}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap opacity-0 invisible transition-all duration-200 ease-in-out z-10 mb-2 active:opacity-100 active:visible">
                Updated {collection.date}
                <div className="absolute top-full left-1/2 -ml-1.5 border-[5px] border-solid border-black/80 border-b-transparent border-l-transparent border-r-transparent"></div>
              </div>
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${inter.className}text-[#4A4A4A]`}>
      <div className="">
        <div className="mx-auto">
          {/* Mobile Header */}
          <div className="lg:hidden mb-5">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="20" width="20" fill="currentColor" className="text-[#016853]">
                <path d="M16 9a7 7 0 1 1 0 14 7 7 0 1 1 0-14zm4-7a2 2 0 0 1 2 2v4h-1.5V3.5h-17v17H8V22H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16zm-3 10h-2v3h-3v2h3v3h2v-3h3v-2h-3v-3z" fillRule="nonzero"></path>
              </svg>
              <h1 className="text-lg font-semibold text-[#016853]">Collections</h1>
            </div>
          </div>

          <div className="bg-white">
            {/* Mobile Layout */}
            <div className="lg:hidden flex flex-col gap-5 w-full">
              {collectionsData.map((collection, index) => (
                <MobileCollectionCard
                  key={index}
                  collection={collection}
                  index={index}
                />
              ))}
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid grid-cols-3 gap-8 w-full">
              {collectionsData.map((collection, index) => (
                <CollectionCard
                  key={index}
                  collection={collection}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
