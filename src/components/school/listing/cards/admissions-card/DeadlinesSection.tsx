export default function DeadlinesSection() {
  return (
    <div className="mb-6 pb-6 border-b border-black/10 last:border-b-0 last:mb-0 last:pb-0 px-5 md:mb-10 md:pb-8 md:px-0">
      <h2 className="text-[#016853] text-lg font-semibold mt-5 mb-4 md:text-2xl md:mt-0 md:mb-6">
        Admissions Deadlines
      </h2>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-8">
        <div className="bg-[#F8FCFF] p-4 rounded-[10px] md:p-6">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Application Deadline
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  January 15
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Early Decision Deadline
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  —
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Early Action Deadline
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  November 1
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Offers Early Decision
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  —
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Offers Early Action
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  Yes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-[#F8FCFF] p-4 rounded-[10px] md:p-6">
          <table className="w-full border-collapse">
            <tbody>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Application Fee
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  $50
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Application Website
                </td>
                <td className="py-2.5 text-sm text-[#346DC2] font-medium text-right md:py-3">
                  admissions.lincoln.edu
                </td>
              </tr>
              <tr className="border-b border-black/10">
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Accepts Common App
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  —
                </td>
              </tr>
              <tr>
                <td className="py-2.5 text-sm text-[#4A4A4A] md:py-3">
                  Accepts Coalition App
                </td>
                <td className="py-2.5 text-sm text-[#089E68] font-medium text-right md:py-3">
                  Yes
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
