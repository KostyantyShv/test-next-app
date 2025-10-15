import React from 'react';

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  itemCount: number;
  onPayment: () => void;
  disabled?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  discount,
  vat,
  total,
  itemCount,
  onPayment,
  disabled = false,
}) => {
  return (
    <>
      <div className="border-t border-[#E2E8F0] pt-4 md:pt-6 mt-4 md:mt-6">
        <div className="flex justify-between mb-2 md:mb-3 text-sm md:text-base">
          <span className="text-[#5F5F5F]">Subtotal</span>
          <span className="text-[#1B1B1B]">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 md:mb-3 text-sm md:text-base">
          <span className="text-[#5F5F5F]">Bundle Discount</span>
          <span className="text-[#089E68]">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 md:mb-3 text-sm md:text-base">
          <span className="text-[#5F5F5F]">VAT (20%)</span>
          <span className="text-[#1B1B1B]">${vat.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 md:pt-3 mt-2 md:mt-3 border-t border-[#E2E8F0] text-base md:text-xl font-semibold">
          <span className="text-[#5F5F5F]">Total</span>
          <span className="text-[#1B1B1B]">${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={onPayment}
        disabled={disabled}
        className="w-full bg-[#1D77BD] text-white py-3.5 md:py-4 rounded-lg text-base md:text-base font-semibold mt-4 md:mt-5 transition-colors hover:bg-[#1565A0] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {itemCount === 0 ? 'Cart Empty' : `Pay $${total.toFixed(2)}`}
      </button>
    </>
  );
};

