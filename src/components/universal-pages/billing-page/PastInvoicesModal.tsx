"use client";

interface PastInvoicesModalProps {
  onClose: () => void;
  onViewInvoice: () => void;
}

export default function PastInvoicesModal({
  onClose,
  onViewInvoice,
}: PastInvoicesModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] transition-opacity duration-300">
      <div className="bg-white rounded-lg w-[600px] max-w-[90%] max-h-[80vh] overflow-y-auto shadow-lg transform transition-transform duration-300">
        <div className="flex justify-between items-center p-5 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-[#464646]">
            Purchase History
          </h3>
          <button
            className="bg-transparent border-none text-xl text-[#5F5F5F] cursor-pointer"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-5">
          <table className="w-full border-separate border-spacing-0 mt-5">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  Item
                </th>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  Amount
                </th>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  Status
                </th>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  Date
                </th>
                <th className="text-left py-3 px-4 bg-[#F9FAFB] border-b border-[#E5E7EB] text-[#5F5F5F] font-medium text-sm">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">Pro</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$89.00</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00C853]"></div>
                    <span>Completed</span>
                  </div>
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  July 9, 2023
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  <button
                    className="py-1 px-3 border border-[#E5E7EB] bg-transparent rounded text-[#346DC2] text-sm"
                    onClick={onViewInvoice}
                    data-invoice="1"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">Plus</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$56.00</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#FFB300]"></div>
                    <span>Pending</span>
                  </div>
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  April 18, 2023
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  <button
                    className="py-1 px-3 border border-[#E5E7EB] bg-transparent rounded text-[#346DC2] text-sm"
                    onClick={onViewInvoice}
                    data-invoice="2"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  Enterprise
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">$199.00</td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#E53935]"></div>
                    <span>Rejected</span>
                  </div>
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  April 14, 2023
                </td>
                <td className="py-4 px-4 border-b border-[#E5E7EB]">
                  <button
                    className="py-1 px-3 border border-[#E5E7EB] bg-transparent rounded text-[#346DC2] text-sm"
                    onClick={onViewInvoice}
                    data-invoice="3"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
