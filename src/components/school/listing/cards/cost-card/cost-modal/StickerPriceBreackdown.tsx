import React from "react";
import { stickerPriceData } from "../mock";

export const StickerPriceBreakdown: React.FC = () => (
  <section className="rounded-xl bg-white p-4 md:p-8">
    <h3 className="mb-5 text-lg font-semibold text-[#016853] md:mb-6 md:text-xl">
      {stickerPriceData.title}
    </h3>
    <div className="mb-6 grid grid-cols-1 gap-4 md:mb-8 md:grid-cols-2 md:gap-12">
      <div className="flex flex-col gap-2 bg-[#F8FCFF] p-4 md:p-6">
        <div className="text-base font-medium text-[#4A4A4A] md:text-[14px]">
          In-State Tuition
        </div>
        <div className="text-[28px] font-bold tracking-tight text-[#464646] md:text-[36px]">
          {stickerPriceData.tuition.inState}
        </div>
        <div className="text-[14px] text-[#5F5F5F] md:text-base">/ year</div>
      </div>
      <div className="flex flex-col gap-2 bg-[#F8FCFF] p-4 md:p-6">
        <div className="text-base font-medium text-[#4A4A4A] md:text-[14px]">
          Out-of-State Tuition
        </div>
        <div className="text-[28px] font-bold tracking-tight text-[#464646] md:text-[36px]">
          {stickerPriceData.tuition.outOfState}
        </div>
        <div className="text-[14px] text-[#5F5F5F] md:text-base">/ year</div>
      </div>
    </div>
    <table className="w-full border-spacing-0">
      <tbody>
        {stickerPriceData.additionalCosts.map((cost, index) => (
          <tr
            key={cost.label}
            className={index < 2 ? "border-b border-black/8" : ""}
          >
            <td className="py-3 text-[14px] font-medium text-[#4A4A4A] md:py-4 md:text-[15px]">
              {cost.label}
            </td>
            <td className="py-3 text-right text-[14px] font-semibold text-[#089E68] md:py-4 md:text-[15px]">
              {cost.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mt-6 grid gap-3 md:mt-8 md:gap-4">
      {stickerPriceData.plans.map((plan) => (
        <div
          key={plan.name}
          className="flex items-center justify-between rounded-lg bg-[#f8fafc] p-3 md:p-4"
        >
          <div className="flex items-center gap-1 text-[14px] font-medium text-[#4A4A4A] md:gap-2 md:text-[15px]">
            {plan.name}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-[#5F5F5F]"
            >
              <path d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM12 20.61C7.25 20.61 3.39 16.75 3.39 12C3.39 7.25 7.25 3.39 12 3.39C16.75 3.39 20.61 7.25 20.61 12C20.61 16.75 16.75 20.61 12 20.61Z" />
              <path d="M11.65 14.61C10.99 14.61 10.6 15.12 10.6 15.61C10.6 16.1 10.97 16.67 11.65 16.67C12.33 16.67 12.66 16.13 12.66 15.61C12.66 15.12 12.31 14.61 11.65 14.61Z" />
              <path d="M11.97 7.32C9.92 7.32 8.74 8.74 8.72 9.21C8.72 9.48 8.82 9.65 8.91 9.74C9.05 9.88 9.25 9.96 9.49 9.96C9.77 9.96 9.98 9.76 10.19 9.54C10.52 9.2 10.98 8.75 11.99 8.75C12.7 8.75 13.75 9.1 13.75 9.85C13.75 10.29 13.04 10.72 12.27 11.12C10.98 11.79 10.84 12.69 10.84 13.04C10.84 13.49 11.2 13.9 11.6 13.9C11.97 13.9 12.37 13.6 12.37 13.14C12.37 12.97 12.69 12.49 13.42 12.15C13.93 11.91 15.28 11.28 15.28 9.8C15.28 8.94 14.59 7.32 11.96 7.32H11.97Z" />
            </svg>
          </div>
          <div
            className={`text-[14px] font-semibold md:text-[15px] ${
              plan.available ? "text-[#089E68]" : "text-[#dc2626]"
            }`}
          >
            {plan.available ? "Yes" : "No"}
          </div>
        </div>
      ))}
    </div>
  </section>
);
