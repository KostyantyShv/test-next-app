"use client";

import { useState } from "react";
import ContentBadge from "./ContentBadge";

interface BillingInformationProps {
  openPastInvoices: () => void;
  openEditPayment: () => void;
}

export default function BillingInformation({
  openPastInvoices,
  openEditPayment,
}: BillingInformationProps) {
  const [activeBadges, setActiveBadges] = useState<string[]>([
    "Analytics",
    "Reporting",
  ]);

  const handleRemoveBadge = (name: string) => {
    setActiveBadges(activeBadges.filter((badge) => badge !== name));
  };

  const handleAddBadge = (name: string) => {
    setActiveBadges([...activeBadges, name]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 mb-24">
      {/* Left Column: Title and Description */}
      <div className="flex-none lg:w-[30%] pt-0 lg:pt-1">
        <h2 className="text-lg font-semibold text-[#464646] mb-3">
          Billing Information
        </h2>
        <p className="text-sm text-[#5F5F5F] leading-relaxed">
          Enter your billing information
        </p>
      </div>

      {/* Right Column: Content Card with Form Fields */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-lg p-8 shadow-sm border border-[#E5E7EB]">
          <div className="mb-5">
            <label
              htmlFor="full-name"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Full name on card"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              Country or Region
            </label>
            <select
              id="country"
              name="country"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23464646%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:10px_auto] bg-[position:right_12px_top_50%] pr-8"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="UK">United Kingdom</option>
              <option value="AU">Australia</option>
              <option value="DE">Germany</option>
              <option value="FR">France</option>
              <option value="JP">Japan</option>
              <option value="CN">China</option>
              <option value="IN">India</option>
              <option value="BR">Brazil</option>
            </select>
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Street Address"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-[#4A4A4A] mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="City"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium text-[#4A4A4A] mb-2"
              >
                State
              </label>
              <select
                id="state"
                name="state"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23464646%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:10px_auto] bg-[position:right_12px_top_50%] pr-8"
              >
                <option value="">(None Specified)</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                {/* Add more states as needed */}
              </select>
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="zip"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              Zip
            </label>
            <input
              type="text"
              id="zip"
              name="zip"
              placeholder="Zip Code"
              className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="card-number"
              className="block text-sm font-medium text-[#4A4A4A] mb-2"
            >
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-number"
                name="card-number"
                placeholder="1234 1234 1234 1234"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                <img
                  src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat-rounded/visa.svg"
                  alt="Visa"
                  className="w-6 h-4 object-contain"
                />
                <img
                  src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat-rounded/mastercard.svg"
                  alt="Mastercard"
                  className="w-6 h-4 object-contain"
                />
                <img
                  src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat-rounded/amex.svg"
                  alt="American Express"
                  className="w-6 h-4 object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                htmlFor="expiry"
                className="block text-sm font-medium text-[#4A4A4A] mb-2"
              >
                Expiration Date
              </label>
              <input
                type="text"
                id="expiry"
                name="expiry"
                placeholder="MM / YY"
                className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
              />
            </div>
            <div>
              <label
                htmlFor="cvc"
                className="block text-sm font-medium text-[#4A4A4A] mb-2"
              >
                Security Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="CVC"
                  className="w-full px-3 py-2 border border-[#E5E7EB] rounded text-sm text-[#4A4A4A] bg-white"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#5F5F5F]">
                  👁️
                </span>
              </div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="border-t border-[#E5E7EB] pt-8 mt-8">
            <div className="flex justify-between md:items-center mb-5 max-md:flex-col">
              <div className="flex max-md:flex-row">
                <span className="text-base font-semibold text-[#464646]">
                  Professional (monthly)
                </span>
                <span className="inline-flex items-center px-2 py-1 ml-2 bg-white border border-[#E5E7EB] rounded-full text-xs font-medium text-[#464646]">
                  Annual
                </span>
              </div>
              <div className="text-sm text-[#4A4A4A]">$89.00 / month</div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <div>{activeBadges.length}/5 Addons Selected</div>
                <button className="text-[#346DC2] text-sm font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none">
                  All Plans &rarr;
                </button>
              </div>
            </div>

            <div className="flex gap-2 mb-5">
              <ContentBadge
                name="Analytics"
                isActive={activeBadges.includes("Analytics")}
                onRemove={() => handleRemoveBadge("Analytics")}
                onAdd={() => handleAddBadge("Analytics")}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                  </svg>
                }
              />
              <ContentBadge
                name="Reporting"
                isActive={activeBadges.includes("Reporting")}
                onRemove={() => handleRemoveBadge("Reporting")}
                onAdd={() => handleAddBadge("Reporting")}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                }
              />
              <ContentBadge
                name="Security"
                isActive={activeBadges.includes("Security")}
                onRemove={() => handleRemoveBadge("Security")}
                onAdd={() => handleAddBadge("Security")}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                }
              />
              <ContentBadge
                name="Storage"
                isActive={activeBadges.includes("Storage")}
                onRemove={() => handleRemoveBadge("Storage")}
                onAdd={() => handleAddBadge("Storage")}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                  </svg>
                }
              />
              <ContentBadge
                name="Scheduling"
                isActive={activeBadges.includes("Scheduling")}
                onRemove={() => handleRemoveBadge("Scheduling")}
                onAdd={() => handleAddBadge("Scheduling")}
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                }
              />
            </div>

            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <div className="text-sm">Seats</div>
                <div className="text-sm font-medium text-[#464646]">
                  5 of 10
                </div>
              </div>
              <div className="h-2 bg-[#EEEEEE] rounded-md overflow-hidden">
                <div className="h-full bg-[#1D77BD] rounded-md w-1/2"></div>
              </div>

              <div className="flex md:justify-between max-md:flex-col mt-5 gap-2">
                <button className="bg-white text-[#4A4A4A] border border-[#E5E7EB] rounded px-4 py-2 text-sm font-medium">
                  Manage seats
                </button>
                <button className="bg-white text-[#4A4A4A] border border-[#E5E7EB] rounded px-4 py-2 text-sm font-medium">
                  Manage members
                </button>
              </div>
            </div>

            <div className="border-t border-[#E5E7EB] py-5 flex md:justify-between max-md:flex-col md:items-center max-md:gap-2">
              <div className="text-[#4A4A4A]">Next billing date</div>
              <div className="flex md:items-center max-md:flex-col gap-2">
                <span>December 13, 2023</span>
                <span>50 day left in current billing cycle</span>
                <button
                  onClick={openPastInvoices}
                  className="text-[#346DC2] text-sm font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none"
                >
                  Past Invoices &rarr;
                </button>
              </div>
            </div>

            <div className="border-t border-[#E5E7EB] py-5 flex md:justify-between md:items-center max-md:flex-col max-md:gap-2">
              <div className="text-[#4A4A4A]">Payment method</div>
              <div className="flex md:items-center max-md:flex-col gap-2">
                <span>Card ending in ***4692</span>
                <button
                  onClick={openEditPayment}
                  className="text-[#346DC2] text-sm font-medium flex items-center gap-1 cursor-pointer bg-transparent border-none"
                >
                  Edit payment method &rarr;
                </button>
              </div>
            </div>

            <div className="border-t border-[#E5E7EB] pt-5 flex md:justify-between md:items-center max-md:flex-col max-md:gap-2">
              <div className="text-[#4A4A4A]">
                Your free trial ends on Mon, December 5th 2023
              </div>
              <div className="flex items-center gap-2">
                <button className="bg-white max-md:w-full text-[#4A4A4A] border border-[#E5E7EB] rounded px-4 py-2 text-sm font-medium">
                  Cancel Trial
                </button>
                <button className="bg-[#1D77BD] max-md:w-full text-white border-none rounded px-4 py-2 text-sm font-medium">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
