"use client";

interface EditPaymentModalProps {
  onClose: () => void;
  onAddPayment: () => void;
}

export default function EditPaymentModal({
  onClose,
  onAddPayment,
}: EditPaymentModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] transition-opacity duration-300">
      <div className="bg-white rounded-lg w-[600px] max-w-[90%] max-h-[80vh] overflow-y-auto shadow-lg transform transition-transform duration-300">
        <div className="flex justify-between items-center p-5 border-b border-[#E5E7EB]">
          <h3 className="text-lg font-semibold text-[#464646]">
            Payment Methods
          </h3>
          <button
            className="bg-transparent border-none text-xl text-[#5F5F5F] cursor-pointer"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex justify-between items-center px-5 py-2">
          <div></div>
          <button
            className="text-[#346DC2] bg-transparent border-none text-sm font-medium cursor-pointer"
            onClick={onAddPayment}
          >
            Add
          </button>
        </div>
        <div className="p-5 pt-0">
          <ul className="p-0 m-0 list-none">
            <li className="py-4 px-5 border-b border-[#E5E7EB] flex items-center relative">
              <div className="text-lg text-[#5F5F5F] mr-5">▶</div>
              <div className="w-10 h-7 rounded bg-[#F1F5F9] flex items-center justify-center mr-4">
                <img
                  src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat-rounded/visa.svg"
                  alt="Visa"
                  className="max-w-[80%] max-h-[80%]"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-[#464646]">
                  Visa •••• XXXX
                  <span className="text-xs bg-[#F1F5F9] text-[#5F5F5F] py-0.5 px-2 rounded ml-2">
                    Default
                  </span>
                </div>
                <div className="text-sm text-[#5F5F5F]">Expires Jul 2021</div>
              </div>
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 hidden gap-2 group-hover:flex">
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                  </svg>
                </div>
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </div>
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </div>
              </div>
            </li>
            <li className="py-4 px-5 border-b border-[#E5E7EB] flex items-center relative group">
              <div className="text-lg text-[#5F5F5F] mr-5">▶</div>
              <div className="w-10 h-7 rounded bg-[#F1F5F9] flex items-center justify-center mr-4">
                <img
                  src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat-rounded/visa.svg"
                  alt="Visa"
                  className="max-w-[80%] max-h-[80%]"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-[#464646]">Visa •••• XXXX</div>
                <div className="text-sm text-[#5F5F5F]">Expires Jul 2021</div>
              </div>
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 hidden gap-2 group-hover:flex">
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                  </svg>
                </div>
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </div>
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </div>
              </div>
            </li>
            <li className="py-4 px-5 border-b border-[#E5E7EB] flex items-center relative group">
              <div className="text-lg text-[#5F5F5F] mr-5">▶</div>
              <div className="w-10 h-7 rounded bg-[#F1F5F9] flex items-center justify-center mr-4">
                <img
                  src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat-rounded/visa.svg"
                  alt="Visa"
                  className="max-w-[80%] max-h-[80%]"
                />
              </div>
              <div className="flex-1">
                <div className="font-medium text-[#464646]">Visa •••• XXXX</div>
                <div className="text-sm text-[#5F5F5F]">Expires Jul 2021</div>
              </div>
              <div className="absolute right-5 top-1/2 transform -translate-y-1/2 hidden gap-2 group-hover:flex">
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                  </svg>
                </div>
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </div>
                <div className="w-7 h-7 rounded bg-[#F1F5F9] flex items-center justify-center cursor-pointer hover:bg-[#E5E7EB]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                  </svg>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
