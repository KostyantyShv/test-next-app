export default function RequirementsSection() {
  return (
    <div className="mb-6 pb-6 border-b border-black/10 last:border-b-0 last:mb-0 last:pb-0 px-5 md:mb-10 md:pb-8 md:px-0">
      <h2 className="text-[#016853] text-lg font-semibold mt-5 mb-4 md:text-2xl md:mt-0 md:mb-6">
        Admissions Requirements
      </h2>
      <h3 className="text-base font-semibold text-[#464646] mb-4 md:text-lg md:mb-6">
        What Really Matters When Applying
      </h3>
      <table className="w-full border-collapse mb-5 md:mb-8">
        <tbody>
          <tr className="border-b border-black/10">
            <td className="py-3 text-sm text-[#4A4A4A] md:py-4">
              High School GPA
            </td>
            <td className="py-3 text-[13px] text-[#089E68] text-right md:py-4 md:text-sm">
              Required
            </td>
          </tr>
          <tr className="border-b border-black/10">
            <td className="py-3 text-sm text-[#4A4A4A] md:py-4">
              High School Rank
            </td>
            <td className="py-3 text-[13px] text-[#089E68] text-right md:py-4 md:text-sm">
            Neither required nor recommended
            </td>
          </tr>
          <tr className="border-b border-black/10">
            <td className="py-3 text-sm text-[#4A4A4A] md:py-4">
              High School Transcript
            </td>
            <td className="py-3 text-[13px] text-[#089E68] text-right md:py-4 md:text-sm">
              Required
            </td>
          </tr>
          <tr className="border-b border-black/10">
            <td className="py-3 text-sm text-[#4A4A4A] md:py-4">
              College Prep Courses
            </td>
            <td className="py-3 text-[13px] text-[#089E68] text-right md:py-4 md:text-sm">
              Required
            </td>
          </tr>
          <tr className="border-b border-black/10">
            <td className="py-3 text-sm text-[#4A4A4A] md:py-4">SAT/ACT</td>
            <td className="py-3 text-[13px] text-[#089E68] text-right md:py-4 md:text-sm">
              Required
            </td>
          </tr>
          <tr>
            <td className="py-3 text-sm text-[#4A4A4A] md:py-4">
              Recommendations
            </td>
            <td className="py-3 text-[13px] text-[#089E68] text-right md:py-4 md:text-sm">
            Neither required nor recommended
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <div className="bg-[#F8FCFF] p-4 rounded-[10px] mb-4 md:p-6 md:mb-0">
          <div className="flex items-center gap-2 mb-3 md:gap-3 md:mb-4">
            <div className="relative w-5 h-5 before:content-[''] before:absolute before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8] before:h-5 before:w-[6px] before:left-4 before:top-1 md:w-6 md:h-6" />
            <div className="text-[12px] font-semibold text-[#1D77BD] uppercase tracking-wider pt-2 pl-1 md:text-xs md:pt-1">
              POLL
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3 md:gap-4 md:mb-4">
            <div className="w-[50px] h-[50px] rounded-full bg-[conic-gradient(#77d3fa_67%,#e8f4fc_0)] relative mb-3 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[30px] after:h-[30px] after:bg-white after:rounded-full md:w-[60px] md:h-[60px] md:after:w-10 md:after:h-10 md:mb-4" />
            <div className="text-[28px] font-bold text-[#1B1B1B] leading-none md:text-4xl">
              67%
            </div>
          </div>
          <div className="text-[13px] text-[#4A4A4A] leading-relaxed md:text-sm">
            of students say the admissions process made them feel like the
            school cared about them as an applicant.
          </div>
          <div className="text-[#5F5F5F] text-[12px] mt-2 md:text-xs md:mt-2">
            189 responses
          </div>
        </div>
        <div className="bg-[#F8FCFF] p-4 rounded-[10px] md:p-6">
          <div className="flex items-center gap-2 mb-3 md:gap-3 md:mb-4">
            <div className="relative w-5 h-5 before:content-[''] before:absolute before:bg-[#c5e4b8] before:shadow-[4px_4px_0_#f78f6a,-8px_4px_0_#9eddf8] before:h-5 before:w-[6px] before:left-4 before:top-1 md:w-6 md:h-6" />
            <div className="text-[12px] font-semibold text-[#1D77BD] uppercase tracking-wider pt-2 pl-1 md:text-xs md:pt-1">
              POLL
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3 md:gap-4 md:mb-4">
            <div className="w-[50px] h-[50px] rounded-full bg-[conic-gradient(#77d3fa_77%,#e8f4fc_0)] relative mb-3 after:content-[''] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-[30px] after:h-[30px] after:bg-white after:rounded-full md:w-[60px] md:h-[60px] md:after:w-10 md:after:h-10 md:mb-4" />
            <div className="text-[28px] font-bold text-[#1B1B1B] leading-none md:text-4xl">
              77%
            </div>
          </div>
          <div className="text-[13px] text-[#4A4A4A] leading-relaxed md:text-sm">
            of students feel the admissions process evaluated them individually
            as a real person, not just a set of numbers.
          </div>
          <div className="text-[#5F5F5F] text-[12px] mt-2 md:text-xs md:mt-2">
            189 responses
          </div>
        </div>
      </div>
    </div>
  );
}
