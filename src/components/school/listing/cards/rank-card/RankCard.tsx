"use client";
import { JSX, useState } from "react";

interface RankingItemProps {
  rank: string;
  title: string;
  total: string;
}

interface RankingData {
  rank: string;
  title: string;
  total: string;
}

export default function RankCard({ id }: { id: string }) {
  const [showAllRankings, setShowAllRankings] = useState<boolean>(false);

  const toggleRankings = (): void => {
    setShowAllRankings(!showAllRankings);
  };

  const topRankings: RankingData[] = [
    {
      rank: "#1",
      title: "Colleges with the Best Professors in America",
      total: "of 1,503",
    },
    {
      rank: "#1",
      title: "Best Colleges for History in America",
      total: "of 926",
    },
    {
      rank: "#1",
      title: "Best Colleges that Accept the Common App in America",
      total: "of 818",
    },
  ];

  const additionalRankings: RankingData[] = [
    {
      rank: "#2",
      title: "Best College Campus in America",
      total: "of 1,419",
    },
    {
      rank: "#3",
      title: "Best College Athletics in America",
      total: "of 1,422",
    },
    {
      rank: "#4",
      title: "Best College Food in America",
      total: "of 1,387",
    },
  ];

  return (
    <div className="m-0 my-cardMargin font-sans flex justify-center" id={id}>
      <div className="max-w-fit bg-cardBackground rounded-cardBorderRadius shadow-cardShadow overflow-hidden">
        <div className="h-[6px] bg-gradient-to-r from-[#016853] to-[#089E68] mb-7"></div>
        <div className="px-cardPadding pb-cardPadding">
          <div className="mb-8 flex items-center gap-6">
            <div className="flex-shrink-0 filter drop-shadow-[0_2px_4px_rgba(3,239,98,0.2)]">
              <svg
                viewBox="0 0 33 36"
                fill="none"
                height="64"
                width="64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 12.847v10.306c0 2.772 1.464 5.318 3.878 6.734l8.662 5.05a7.91 7.91 0 0 0 7.92 0l8.662-5.05A7.81 7.81 0 0 0 33 23.153V12.847c0-2.772-1.464-5.317-3.878-6.734l-8.662-5.05a7.91 7.91 0 0 0-7.92 0l-8.662 5.05A7.81 7.81 0 0 0 0 12.847"
                  fill="#089E68"
                />
                <g transform="translate(7 8)">
                  <g
                    clipPath="url(#TopProductSmall_svg__a)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    stroke="#fff"
                  >
                    <path d="M7.125 16.625h4.75M9.5 12.294v4.33M4.75 9.5h-.754c-.64 0-1.254-.286-1.706-.795a2.9 2.9 0 0 1-.707-1.92V5.43c0-.18.064-.353.177-.48a.57.57 0 0 1 .426-.199H4.6M14.25 9.5h.754c.64 0 1.254-.286 1.706-.795.453-.509.707-1.2.707-1.92V5.43a.72.72 0 0 0-.177-.48.57.57 0 0 0-.426-.199H14.4" />
                    <path
                      d="M4.75 3.167h9.5v4.408c0 2.773-2.095 5.07-4.714 5.092a4.5 4.5 0 0 1-1.829-.372 4.7 4.7 0 0 1-1.553-1.088 5.1 5.1 0 0 1-1.039-1.636 5.3 5.3 0 0 1-.365-1.933z"
                      fill="#fff"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div className="flex-grow">
              <h1 className="text-[#016853] text-[28px] font-bold m-0 mb-3 tracking-tight">
                Yale University Rankings
              </h1>
              <p className="text-[#5F5F5F] text-base leading-relaxed m-0">
                Niche rankings are based on rigorous analysis of key statistics
                from the U.S. Department of Education and millions of reviews.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-7 mb-9">
            {topRankings.map((item, index) => (
              <RankingItem
                key={index}
                rank={item.rank}
                title={item.title}
                total={item.total}
              />
            ))}
          </div>

          <div
            className={`grid grid-cols-3 gap-7 mt-7 ${
              showAllRankings
                ? "block opacity-100 transform translate-y-0 transition-all duration-300 ease-in"
                : "hidden opacity-0 transform -translate-y-3"
            }`}
          >
            {additionalRankings.map((item, index) => (
              <RankingItem
                key={index}
                rank={item.rank}
                title={item.title}
                total={item.total}
              />
            ))}
          </div>

          <div className="border-t border-[rgba(0,0,0,0.08)] pt-6 flex justify-end items-center">
            <button
              onClick={toggleRankings}
              className="text-[#346DC2] no-underline text-base font-medium flex items-center gap-2 py-2 px-4 rounded-lg transition-all duration-200 ease-in-out bg-[rgba(52,109,194,0.05)] hover:text-[#1D77BD] hover:bg-[rgba(52,109,194,0.1)]"
            >
              {showAllRankings
                ? "Show Less"
                : "See All Yale University Rankings"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className={`w-5 h-5 transition-transform duration-200 ${
                  showAllRankings ? "rotate-180" : ""
                }`}
              >
                <path
                  fill="currentColor"
                  d="M5.29289 9.29289C5.68342 8.90237 6.31658 8.90237 6.70711 9.29289L12 14.5858L17.2929 9.29289C17.6834 8.90237 18.3166 8.90237 18.7071 9.29289C19.0976 9.68342 19.0976 10.3166 18.7071 10.7071L12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071L5.29289 10.7071C4.90237 10.3166 4.90237 9.68342 5.29289 9.29289Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RankingItem({ rank, title, total }: RankingItemProps): JSX.Element {
  return (
    <div className="relative bg-gradient-to-b from-[rgba(1,104,83,0.03)] to-transparent rounded-xl py-6 px-6 transition-all duration-200 ease-in-out hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex flex-col items-start gap-4 group">
      <div className="w-full flex justify-center mb-1">
        <div className="w-12 h-12 bg-[#EBFCF4] border-2 border-[#089E68] rounded-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-105">
          <div className="absolute inset-[-2px] rounded-full bg-gradient-to-br from-[rgba(8,158,104,0.2)] to-transparent z-0"></div>
          <span className="text-[#016853] text-2xl font-bold relative z-1">
            {rank}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-[#346DC2] text-base font-semibold leading-relaxed m-0 group-hover:text-[#1D77BD]">
          {title}
        </h2>
        <div className="flex items-baseline gap-1">
          <span className="text-[#464646] text-xl font-bold">{rank}</span>
          <span className="text-[#5F5F5F] text-base">{total}</span>
        </div>
      </div>
    </div>
  );
}
