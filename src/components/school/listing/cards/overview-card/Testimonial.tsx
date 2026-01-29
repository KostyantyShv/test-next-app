// components/Testimonial.tsx
import Image from "next/image";

const Testimonial: React.FC = () => (
  <div className="bg-[#F8F9FA] rounded-xl p-5 my-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] md:shadow-none md:p-6 md:my-8 md:mx-0">
    <div className="md:flex md:items-start md:gap-5">
      <Image
        src="https://i.ibb.co/WndL8R6/AVATAR-laurentfa.png"
        alt="Steven O."
        width={48}
        height={48}
        className="hidden md:block rounded-full object-cover w-12 h-12"
      />
      <div className="flex-1">
        <div className="flex md:flex-row gap-3 flex-col">
          <div>
            <div className="italic text-[#4A4A4A] leading-6 text-sm mb-4 md:text-[15px] md:leading-[1.6] md:mb-3">
              It`s highly addictive to get core insights on personally relevant
              topics without repetition or triviality. Added to that the apps
              ability to suggest kindred interests opens up a foundation of
              knowledge.
            </div>
            <div className="w-full items-center gap-3 flex flex-row mb-4 md:mb-0 md:w-12 md:h-12">
              <Image
                src="https://i.ibb.co/WndL8R6/AVATAR-laurentfa.png"
                alt="Steven O."
                width={48}
                height={48}
                className="rounded-full object-cover md:hidden block"
              />
              <div className="flex flex-col">
                <div className="font-semibold text-nowrap text-[#464646] text-sm md:text-[14px] md:font-semibold">
                  Steven O.
                </div>
                <div className="text-[#5F5F5F] text-xs md:hidden">Student</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="md:hidden">
      <div className="h-px bg-[#E1E7EE] my-4"></div>
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex gap-1.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
                index === 0 ? "bg-[#0B6333]" : "bg-[#DDD]"
              }`}
            ></div>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="w-7 h-7 border border-[#0B6333] rounded-full flex items-center justify-center text-[#0B6333] hover:bg-[#0B6333] hover:text-white transition-all duration-200">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current"
            >
              <path
                d="M15 18L9 12L15 6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="w-7 h-7 border border-[#0B6333] rounded-full flex items-center justify-center text-[#0B6333] hover:bg-[#0B6333] hover:text-white transition-all duration-200">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current"
            >
              <path
                d="M9 18L15 12L9 6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Testimonial;
