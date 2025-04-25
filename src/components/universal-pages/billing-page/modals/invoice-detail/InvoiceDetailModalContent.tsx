"use client";

interface InvoiceDetailModalContentProps {
  onClose: () => void;
}

export default function InvoiceDetailModalContent({
  onClose,
}: InvoiceDetailModalContentProps) {
  return (
    <>
      <div className="flex justify-between items-center p-5 border-b border-[#E5E7EB]">
        <h3 className="text-lg font-semibold text-[#464646]">
          Invoice Details
        </h3>
        <button
          className="bg-transparent border-none text-xl text-[#5F5F5F] cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-2">
            <img
              src="https://i.ibb.co/0RY9BPHm/SEMI-LOGO-TRANS.png"
              alt="TASK X"
              className="w-10 h-10 object-contain"
            />
            <div>
              <div className="text-lg font-semibold text-[#464646]">
                Figma Inc.
              </div>
            </div>
          </div>
          <div className="text-[#5F5F5F]">Los Angeles, California</div>
        </div>

        <hr className="border-t border-[#E5E7EB] my-4" />

        <div className="my-8">
          <div className="mb-4">
            <div className="text-[#5F5F5F]">
              Invoice from Google Design Inc.
            </div>
            <div className="text-[#5F5F5F]">ID: #0045</div>
          </div>

          <div className="flex justify-between mb-8 md:flex-row flex-col gap-5 md:gap-0">
            <div>
              <div className="text-[#5F5F5F] mb-1">Issue Date:</div>
              <div className="font-medium text-[#464646]">01 Mar, 2025</div>
            </div>
            <div>
              <div className="text-[#5F5F5F] mb-1">Due Date:</div>
              <div className="font-medium text-[#464646]">31 Mar, 2025</div>
            </div>
          </div>

          <div className="flex justify-between mb-8 md:flex-row flex-col gap-5 md:gap-0">
            <div className="flex-1">
              <div className="text-[#5F5F5F] mb-1">Bill from:</div>
              <div className="text-[#464646]">
                <p>Google Design Inc</p>
                <p>16/345 Palatial Avenue, South Mascot,</p>
                <p>2026</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="text-[#5F5F5F] mb-1">Bill to:</div>
              <div className="text-[#464646]">
                <p>Figma Inc.</p>
                <p>760 Market Street, Floor 10,</p>
                <p>United States</p>
              </div>
            </div>
          </div>

          <table className="w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  Item
                </th>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  QTY
                </th>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  Rate
                </th>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  UI/UX review of all web products on the platform
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">3</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$1,000</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$3,000</td>
              </tr>
              <tr>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  Logo Design
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">1</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$2,000</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$2,000</td>
              </tr>
              <tr>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  Review of Business Strategy
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">1</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$5,000</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$5,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
