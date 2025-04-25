"use client";

import { useState } from "react";

interface AddPaymentModalContentProps {
  onClose: () => void;
}

export default function AddPaymentModalContent({
  onClose,
}: AddPaymentModalContentProps) {
  const [isDefaultPayment, setIsDefaultPayment] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center p-5 border-b border-[#E5E7EB]">
        <h3 className="text-lg font-semibold text-[#464646]">
          Add New Payment Method
        </h3>
        <button
          className="bg-transparent border-none text-xl text-[#5F5F5F] cursor-pointer"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="First Name"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Last Name"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="select-country"
            className="block text-sm font-medium text-[#4A4A4A] mb-2"
          >
            Select Country
          </label>
          <select
            id="select-country"
            name="select-country"
            defaultValue="Select Country"
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23464646%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:10px_auto] bg-[position:right_12px_top_50%] pr-8"
          >
            <option value="">Select Country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="AU">Australia</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div className="mb-5">
          <label
            htmlFor="address-line"
            className="block text-sm font-medium text-[#4A4A4A] mb-2"
          >
            Address
          </label>
          <input
            type="text"
            id="address-line"
            name="address-line"
            placeholder="Street Address"
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label
              htmlFor="city-field"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city-field"
              name="city-field"
              placeholder="City"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="state-field"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              State
            </label>
            <input
              type="text"
              id="state-field"
              name="state-field"
              placeholder="State"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="postal-code"
            className="block text-sm font-medium text-[#4A4A4A] mb-2"
          >
            Postal or ZIP Code
          </label>
          <input
            type="text"
            id="postal-code"
            name="postal-code"
            placeholder="Postal or ZIP Code"
            className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="new-card-number"
            className="block text-sm font-medium text-[#4A4A4A] mb-2"
          >
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              id="new-card-number"
              name="new-card-number"
              placeholder="1234 1234 1234 1234"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
              <img
                src="https://cdn.jsdelivr.net/gh/npjg/visa-mastercard-svg-logos@master/visa.svg"
                alt="Visa"
                className="w-6 h-4 object-contain"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/npjg/visa-mastercard-svg-logos@master/mastercard.svg"
                alt="Mastercard"
                className="w-6 h-4 object-contain"
              />
              <img
                src="https://cdn.jsdelivr.net/gh/npjg/visa-mastercard-svg-logos@master/amex.svg"
                alt="American Express"
                className="w-6 h-4 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label
              htmlFor="new-expiry"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              Expiration Date
            </label>
            <input
              type="text"
              id="new-expiry"
              name="new-expiry"
              placeholder="MM / YY"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
          </div>
          <div>
            <label
              htmlFor="new-cvc"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              Security Code
            </label>
            <div className="relative">
              <input
                type="text"
                id="new-cvc"
                name="new-cvc"
                placeholder="CVC"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#5F5F5F]">
                👁️
              </span>
            </div>
          </div>
        </div>

        <div className="py-4 px-4 mt-5 bg-[#F9FAFB] rounded-lg flex justify-between items-center">
          <div>
            <div className="font-medium text-[#464646]">Set as Default</div>
            <div className="text-sm text-[#5F5F5F] mt-1">
              We will use this payment method for all future payments.
            </div>
          </div>
          <label className="relative inline-block w-10 h-6">
            <input
              type="checkbox"
              className="opacity-0 w-0 h-0"
              checked={isDefaultPayment}
              onChange={() => setIsDefaultPayment(!isDefaultPayment)}
            />
            <span
              className={`absolute cursor-pointer inset-0 rounded-full transition-colors duration-300 ${
                isDefaultPayment ? "bg-[#1D77BD]" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute w-[18px] h-[18px] left-1 bottom-1 bg-white rounded-full transition-transform duration-300 ${
                  isDefaultPayment ? "transform translate-x-4" : ""
                }`}
              ></span>
            </span>
          </label>
        </div>
      </div>
      <div className="p-4 border-t border-[#E5E7EB] flex justify-end gap-2">
        <button className="bg-[#1D77BD] text-white border-none rounded px-4 py-2 text-sm font-medium">
          Save
        </button>
      </div>
    </>
  );
}
