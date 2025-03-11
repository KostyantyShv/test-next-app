export default function AcceptanceRateSection() {
  return (
    <div className="mb-6 pb-6 border-b border-black/10 last:border-b-0 last:mb-0 last:pb-0 px-5 md:mb-10 md:pb-8 md:px-0">
      <h2 className="text-[#016853] text-lg font-semibold mt-5 mb-4 md:text-2xl md:mt-0 md:mb-6">
        What is the acceptance rate for Lincoln University?
      </h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_300px] md:gap-8">
        <div className="text-sm leading-relaxed text-[#4A4A4A] mb-5 md:text-[15px] md:mb-0">
          Lincoln University admissions is very selective with an acceptance
          rate of 23%. Students that get into Lincoln have an average SAT score
          between 1300-1490 or an average ACT score of 28-33. The regular
          admissions application deadline for Lincoln is January 15. Interested
          students can apply for early action, and the Lincoln early action
          deadline is November 1.
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          <a
            href="#"
            className="flex items-center p-3.5 bg-[#F8FCFF] rounded-[10px] no-underline transition-all duration-200 active:scale-[0.98] md:p-4 md:hover:-translate-y-[1px] md:hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mr-3 bg-[#016853] flex-shrink-0 md:w-10 md:h-10 md:mr-4">
              <img
                src="https://i.ibb.co/Qvxq27v5/favicon1.png"
                alt="Apply"
                className="w-[18px] h-[18px] object-contain md:w-5 md:h-5"
              />
            </div>
            <div className="flex-1 text-[#464646] font-semibold text-sm md:text-[15px]">
              How to Apply
            </div>
            <div className="text-[#5F5F5F] ml-3 flex-shrink-0 md:ml-4">
              <svg
                viewBox="0 0 16 16"
                className="w-4 h-4 md:w-5 md:h-5"
                fill="currentColor"
              >
                <path d="M8 3l5 5-5 5-1.4-1.4L9.2 8 6.6 5.4z" />
              </svg>
            </div>
          </a>
          <a
            href="#"
            className="flex items-center p-3.5 bg-[#F8FCFF] rounded-[10px] no-underline transition-all duration-200 active:scale-[0.98] md:p-4 md:hover:-translate-y-[1px] md:hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mr-3 bg-[#016853] flex-shrink-0 md:w-10 md:h-10 md:mr-4">
              <img
                src="https://i.ibb.co/hRQP0ccJ/favicon2.png"
                alt="Tuition"
                className="w-[18px] h-[18px] object-contain md:w-5 md:h-5"
              />
            </div>
            <div className="flex-1 text-[#464646] font-semibold text-sm md:text-[15px]">
              Explore Tuition & Cost Breakdown
            </div>
            <div className="text-[#5F5F5F] ml-3 flex-shrink-0 md:ml-4">
              <svg
                viewBox="0 0 16 16"
                className="w-4 h-4 md:w-5 md:h-5"
                fill="currentColor"
              >
                <path d="M8 3l5 5-5 5-1.4-1.4L9.2 8 6.6 5.4z" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
