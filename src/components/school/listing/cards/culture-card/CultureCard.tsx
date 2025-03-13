// components/CultureSafety.tsx
import { useState } from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { truncateText } from "@/utils/truncateText";

const CultureSafety: React.FC<{ id: string }> = ({ id }) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <CardWrapper id={id}>
      <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
        Culture & Safety
      </h2>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
        {/* Left Column - Pie Charts */}
        <div>
          {/* Safety Assessment */}
          <div className="bg-white rounded-cardBorderRadius p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)] mb-6">
            <div className="flex items-center mb-6">
              <div className="relative h-4 w-4 mr-3">
                <div className="absolute bg-[#c5e4b8] shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,0_0_0_transparent,-4px_2px_0_#6bbef2] h-[10px] w-[3px] left-2 top-[2px]" />
              </div>
              <div className="text-[#346DC2] text-[13px] font-semibold uppercase tracking-[0.05em]">
                SAFETY ASSESSMENT
              </div>
            </div>

            <div className="flex items-center justify-between relative">
              <div className="relative w-[140px] h-[140px]">
                <div
                  className="w-[140px] h-[140px] rounded-full"
                  style={{
                    background: "conic-gradient(#77d3fa 94%, #e8f4fc 0)",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full" />
                </div>
              </div>
              <div className="absolute top-0 right-0 text-[#333] text-5xl font-bold leading-none">
                94
                <span className="text-2xl font-semibold text-[#666] ml-1">
                  %
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                <div className="w-3 h-3 rounded bg-[#77d3fa]" />
                <span>Feel Safe</span>
                <span className="text-[#089E68] font-medium ml-auto">94%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                <div className="w-3 h-3 rounded bg-[#e8f4fc]" />
                <span>Don`t Feel Safe</span>
                <span className="text-[#089E68] font-medium ml-auto">6%</span>
              </div>
            </div>
            <div className="text-[#5F5F5F] text-[13px] mt-2 font-medium">
              18 responses
            </div>
          </div>

          {/* Happiness Index */}
          <div className="bg-white rounded-cardBorderRadius p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)]">
            <div className="flex items-center mb-6">
              <div className="relative h-4 w-4 mr-3">
                <div className="absolute bg-[#c5e4b8] shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,0_0_0_transparent,-4px_2px_0_#6bbef2] h-[10px] w-[3px] left-2 top-[2px]" />
              </div>
              <div className="text-[#346DC2] text-[13px] font-semibold uppercase tracking-[0.05em]">
                HAPPINESS INDEX
              </div>
            </div>

            <div className="flex items-center justify-between relative">
              <div className="relative w-[140px] h-[140px]">
                <div
                  className="w-[140px] h-[140px] rounded-full"
                  style={{
                    background: "conic-gradient(#77d3fa 72%, #e8f4fc 0)",
                  }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full" />
                </div>
              </div>
              <div className="absolute top-0 right-0 text-[#333] text-5xl font-bold leading-none">
                72
                <span className="text-2xl font-semibold text-[#666] ml-1">
                  %
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                <div className="w-3 h-3 rounded bg-[#77d3fa]" />
                <span>Feel Happy</span>
                <span className="text-[#089E68] font-medium ml-auto">72%</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#4A4A4A]">
                <div className="w-3 h-3 rounded bg-[#e8f4fc]" />
                <span>Don`t Feel Happy</span>
                <span className="text-[#089E68] font-medium ml-auto">28%</span>
              </div>
            </div>
            <div className="text-[#5F5F5F] text-[13px] mt-2 font-medium">
              18 responses
            </div>
          </div>
        </div>

        {/* Right Column - Bar Chart */}
        <div className="p-6 rounded-cardBorderRadius shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.06)]">
          <div className="relative">
            <div className="relative h-4 w-4 mb-5">
              <div className="absolute bg-[#c5e4b8] shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,0_0_0_transparent,-4px_2px_0_#6bbef2] h-[10px] w-[3px] left-2 top-[2px]" />
            </div>
            <h3 className="text-[#4A4A4A] text-[15px] font-medium mb-5 tracking-[-0.01em] leading-[1.4]">
              What are your favorite school events or traditions?
            </h3>

            <div className="mt-6">
              {/* Poll Items */}
              {[
                { text: "Project Week", percent: 23 },
                {
                  text: "Senior Pranks are Great! ANd Basketball",
                  percent: 17,
                },
                {
                  text: "Attending sporting events and school dances",
                  percent: 13,
                },
                { text: "Spirit Week", percent: 13, hidden: true },
                {
                  text: "Playing on our volleyball team",
                  percent: 9,
                  hidden: true,
                },
                {
                  text: "100th day of school celebration",
                  percent: 6,
                  hidden: true,
                },
                {
                  text: "Running on the cross country team",
                  percent: 6,
                  hidden: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`${item.hidden && !showMore ? "hidden" : ""} mb-4`}
                >
                  <div className="h-9 bg-[#EBFCF4] rounded-[6px] relative overflow-hidden hover:bg-[#e5f7ef] transition-all duration-300">
                    <div
                      className="h-full bg-[#D7F7E9] transition-all duration-[0.8s] ease-in-out"
                      style={{ width: `${item.percent}%` }}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] text-sm z-[1] font-medium tracking-[-0.01em]">
                      {truncateText(item.text, 27)}
                    </span>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#089E68] font-semibold text-sm z-[1]">
                      {item.percent}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="text-[#346DC2] bg-transparent border-none text-sm py-2 flex items-center font-normal mt-2 hover:underline"
              onClick={handleToggle}
            >
              {showMore ? "View Less" : "View More"}
            </button>
            <div className="text-[#5F5F5F] text-[13px] mt-3 font-medium">
              Based on 47 responses
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default CultureSafety;
