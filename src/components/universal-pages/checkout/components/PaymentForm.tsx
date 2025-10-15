import React from 'react';
import { PaymentFormData } from '../types';

interface PaymentFormProps {
  formData: PaymentFormData;
  onChange: (field: keyof PaymentFormData, value: string) => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ formData, onChange }) => {
  return (
    <>
      <div className="bg-[#F8F9FA] border border-[#E2E8F0] rounded-lg p-3 md:p-4 mb-4 md:mb-5 flex items-center gap-3">
        <div className="w-7 h-[18px] md:w-8 md:h-5 bg-[#1D77BD] rounded flex items-center justify-center text-white text-[9px] md:text-[10px] font-bold">
          VISA
        </div>
        <div className="flex-1">
          <div className="text-[13px] md:text-sm font-semibold text-[#1B1B1B]">Visa •••• 0912</div>
          <div className="text-[11px] md:text-xs text-[#5F5F5F]">Primary payment method</div>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4 md:mb-5">
          <label className="block text-[13px] md:text-sm font-semibold text-[#1B1B1B] mb-1.5 md:mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 md:px-3.5 py-3 md:py-3.5 border border-[#E2E8F0] rounded-lg text-sm md:text-base transition-all focus:outline-none focus:border-[#1D77BD] focus:ring-[3px] focus:ring-[#1D77BD]/10 bg-white"
          />
        </div>

        <div className="mb-4 md:mb-5">
          <label className="block text-[13px] md:text-sm font-semibold text-[#1B1B1B] mb-1.5 md:mb-2">
            Card Details
          </label>
          <input
            type="text"
            value={formData.cardNumber}
            onChange={(e) => onChange('cardNumber', e.target.value)}
            placeholder="Card Number"
            className="w-full px-3 md:px-3.5 py-3 md:py-3.5 border border-[#E2E8F0] rounded-lg text-sm md:text-base transition-all focus:outline-none focus:border-[#1D77BD] focus:ring-[3px] focus:ring-[#1D77BD]/10 bg-white mb-2 md:mb-3"
          />
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <input
              type="text"
              value={formData.expiryDate}
              onChange={(e) => onChange('expiryDate', e.target.value)}
              placeholder="MM/YY"
              className="px-3 md:px-3.5 py-3 md:py-3.5 border border-[#E2E8F0] rounded-lg text-sm md:text-base transition-all focus:outline-none focus:border-[#1D77BD] focus:ring-[3px] focus:ring-[#1D77BD]/10 bg-white"
            />
            <input
              type="text"
              value={formData.cvc}
              onChange={(e) => onChange('cvc', e.target.value)}
              placeholder="CVC"
              className="px-3 md:px-3.5 py-3 md:py-3.5 border border-[#E2E8F0] rounded-lg text-sm md:text-base transition-all focus:outline-none focus:border-[#1D77BD] focus:ring-[3px] focus:ring-[#1D77BD]/10 bg-white"
            />
          </div>
        </div>

        <div className="mb-4 md:mb-5">
          <label className="block text-[13px] md:text-sm font-semibold text-[#1B1B1B] mb-1.5 md:mb-2">
            Card Holder
          </label>
          <input
            type="text"
            value={formData.cardHolder}
            onChange={(e) => onChange('cardHolder', e.target.value)}
            placeholder="Name on card"
            className="w-full px-3 md:px-3.5 py-3 md:py-3.5 border border-[#E2E8F0] rounded-lg text-sm md:text-base transition-all focus:outline-none focus:border-[#1D77BD] focus:ring-[3px] focus:ring-[#1D77BD]/10 bg-white"
          />
        </div>

        <div className="mb-4 md:mb-5">
          <label className="block text-[13px] md:text-sm font-semibold text-[#1B1B1B] mb-1.5 md:mb-2">
            Billing Address
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => onChange('address', e.target.value)}
            placeholder="Street address"
            className="w-full px-3 md:px-3.5 py-3 md:py-3.5 border border-[#E2E8F0] rounded-lg text-sm md:text-base transition-all focus:outline-none focus:border-[#1D77BD] focus:ring-[3px] focus:ring-[#1D77BD]/10 bg-white mb-2 md:mb-3"
          />
          <div className="grid grid-cols-[1fr_80px] md:grid-cols-[1fr_100px] gap-2 md:gap-3">
            <input
              type="text"
              value={formData.cityState}
              onChange={(e) => onChange('cityState', e.target.value)}
              placeholder="City, State"
              className="px-3 md:px-3.5 py-3 md:py-3.5 border border-[#E2E8F0] rounded-lg text-sm md:text-base transition-all focus:outline-none focus:border-[#1D77BD] focus:ring-[3px] focus:ring-[#1D77BD]/10 bg-white"
            />
            <input
              type="text"
              value={formData.zip}
              onChange={(e) => onChange('zip', e.target.value)}
              placeholder="ZIP"
              className="px-3 md:px-3.5 py-3 md:py-3.5 border border-[#E2E8F0] rounded-lg text-sm md:text-base transition-all focus:outline-none focus:border-[#1D77BD] focus:ring-[3px] focus:ring-[#1D77BD]/10 bg-white"
            />
          </div>
        </div>
      </form>
    </>
  );
};

