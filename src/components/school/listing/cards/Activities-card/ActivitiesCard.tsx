import React from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";

const Activities: React.FC<{ id: string }> = ({ id }) => {
  return (
    <CardWrapper id={id}>
      <h2 className="text-[#016853] text-2xl font-semibold mb-8 tracking-[-0.02em]">
        Clubs & Activities
      </h2>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="border-r border-[#0000001A] pr-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-[#FFB020] rounded-full flex items-center justify-center text-white text-xl font-semibold">
                C-
              </div>
              <h3 className="text-[#4A4A4A] text-base font-semibold">
                Clubs & Activities
              </h3>
            </div>
            <p className="text-[#5F5F5F] text-sm leading-[1.5] mb-6">
              Based on student and parent reviews of clubs and activities.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-[1fr_auto] gap-4 py-3 border-b border-[#0000001A] items-start">
              <span className="text-[#4A4A4A] text-[15px] font-medium">
                Girls Athletic Participation
              </span>
              <span className="text-[#089E68] text-[15px] font-semibold">
                Low
              </span>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-4 py-3 border-b border-[#0000001A] items-start">
              <span className="text-[#4A4A4A] text-[15px] font-medium">
                Boys Athletic Participation
              </span>
              <span className="text-[#089E68] text-[15px] font-semibold">
                Average
              </span>
            </div>
            <div className="grid grid-cols-[1fr_auto] gap-4 py-3 border-b border-[#0000001A] items-start">
              <span className="text-[#4A4A4A] text-[15px] font-medium">
                Expenses Per Student
              </span>
              <div className="text-right">
                <span className="text-[#089E68] text-[15px] font-semibold">
                  —
                </span>
                <div className="text-[#5F5F5F] text-[13px] mt-1">
                  Natl. $12,239
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Polls Section */}
        <div className="bg-[#F8FCFF] rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="relative h-4 w-4">
              <div className="absolute top-[2px] left-2 w-[3px] h-[10px] bg-[#c5e4b8] shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8,-4px_2px_0_#6bbef2]" />
            </div>
            <div className="text-[#1D77BD] text-base font-semibold uppercase tracking-[0.05em]">
              POLLS
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[#333] text-[32px] font-bold mb-2">70%</div>
              <div className="text-[#4A4A4A] text-sm leading-[1.5] mb-1">
                of students and parents agree that there are plenty of clubs and
                organizations for students to get involved in.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">20 responses</div>
            </div>

            <div>
              <div className="text-[#333] text-[32px] font-bold mb-2">30%</div>
              <div className="text-[#4A4A4A] text-sm leading-[1.5] mb-1">
                of students and parents agree that clubs and organizations get
                the funding they need.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">20 responses</div>
            </div>

            <div>
              <div className="text-[#333] text-[32px] font-bold mb-2">65%</div>
              <div className="text-[#4A4A4A] text-sm leading-[1.5] mb-1">
                of students and parents agree that lots of students participate
                in clubs and organizations.
              </div>
              <div className="text-[#5F5F5F] text-[13px]">20 responses</div>
            </div>
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};

export default Activities;
