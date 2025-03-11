export default function AdmissionsStatsSection() {
  return (
    <div className="mb-6 pb-6 border-b border-black/10 last:border-b-0 last:mb-0 last:pb-0 px-5 md:mb-10 md:pb-8 md:px-0">
      <h2 className="text-[#016853] text-lg font-semibold mt-5 mb-4 md:text-2xl md:mt-0 md:mb-6">
        Admissions Statistics
      </h2>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <div className="bg-[#F8FCFF] p-4 rounded-[10px] mb-4 md:p-6 md:mb-0">
          <div className="text-[28px] font-bold text-[#1B1B1B] mb-2 md:text-4xl md:mb-4">
            23%
          </div>
          <div className="text-[#4A4A4A] text-sm mb-4 md:text-base md:mb-6">
            Acceptance Rate
          </div>
          <div className="text-[28px] font-bold text-[#1B1B1B] mb-2 mt-4 md:text-4xl md:mb-4 md:mt-8">
            1300-1490
          </div>
          <div className="text-[#4A4A4A] text-sm mb-4 md:text-base md:mb-6">
            SAT Range
          </div>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  SAT Reading
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  650-730
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  SAT Math
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  650-760
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Students Submitting SAT
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  81%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-[#F8FCFF] p-4 rounded-[10px] md:p-6">
          <div className="text-[28px] font-bold text-[#1B1B1B] mb-2 md:text-4xl md:mb-4">
            28-33
          </div>
          <div className="text-[#4A4A4A] text-sm mb-4 md:text-base md:mb-6">
            ACT Range
          </div>
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  ACT English
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  27-35
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  ACT Math
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  26-32
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  ACT Writing
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  8-9
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Students Submitting ACT
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  41%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
