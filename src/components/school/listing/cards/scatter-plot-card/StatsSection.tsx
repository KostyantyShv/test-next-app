export default function StatsSection() {
  return (
    <div className="bg-[#F8F9FA] rounded-lg p-4 md:p-5 w-full md:w-auto">
      <div className="w-full mx-auto">
        <h3 className="text-[#464646] text-[15px] md:text-base mb-3 md:mb-4 leading-[1.4] font-semibold">
          Adjust the filters to see how you rank.
        </h3>
        <div className="text-sm text-[#0B6333] font-medium mb-3 md:mb-4 text-center p-2.5 md:p-3 bg-[rgba(11,99,51,0.1)] rounded-md">
          You rank higher than 75% of accepted students shown.
        </div>
        <div className="flex justify-between mb-2 md:mb-3 text-sm text-[#5F5F5F] py-1">
          <span>Your SAT:</span>
          <span className="font-semibold text-[#089E68]">1554</span>
        </div>
        <div className="flex justify-between mb-2 md:mb-3 text-sm text-[#5F5F5F] py-1">
          <span>Your ACT:</span>
          <span className="font-semibold text-[#089E68]">33</span>
        </div>
        <div className="flex justify-between mb-2 md:mb-3 text-sm text-[#5F5F5F] py-1">
          <span>Your GPA:</span>
          <span className="font-semibold text-[#089E68]">4.0</span>
        </div>
      </div>
    </div>
  );
}
