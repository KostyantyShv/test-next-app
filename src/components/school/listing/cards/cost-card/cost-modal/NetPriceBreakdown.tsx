import React from "react";
import { netPriceBreakdownData } from "../mock";

export const NetPriceBreakdown: React.FC = () => (
  <section className="mb-5 rounded-xl bg-white p-4 md:mb-6 md:p-8">
    <h3 className="mb-5 text-lg font-semibold text-[#016853] md:mb-6 md:text-xl">
      {netPriceBreakdownData.title}
    </h3>
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-12">
      <div>
        <table className="w-full border-spacing-0">
          <tbody>
            {netPriceBreakdownData.mainStats.map((stat) => (
              <tr key={stat.label} className="border-b border-black/8">
                <td className="py-3 text-[14px] font-medium text-[#4A4A4A] md:py-4 md:text-[15px]">
                  {stat.label}
                </td>
                <td className="py-3 text-right md:py-4">
                  {stat.href ? (
                    <a
                      href={stat.href}
                      className="inline-flex items-center gap-1 text-[14px] font-medium text-[#346DC2] hover:text-[#1D77BD] md:gap-2 md:text-[15px]"
                    >
                      {stat.value}
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  ) : (
                    <div className="text-[14px] font-semibold text-[#089E68] md:text-[15px]">
                      {stat.value}
                      {stat.national && (
                        <div className="mt-1 text-[12px] text-[#5F5F5F] md:text-[13px]">
                          National {stat.national}
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h4 className="mb-4 flex items-center gap-1 text-base font-semibold text-[#464646] md:mb-5 md:gap-2">
          {netPriceBreakdownData.incomeBreakdown.title}
          <svg
            className="text-[#5F5F5F]"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4m0-4h.01" />
          </svg>
        </h4>
        <table className="w-full border-spacing-0">
          <tbody>
            {netPriceBreakdownData.incomeBreakdown.prices.map((item, index) => (
              <tr
                key={item.range}
                className={index < 4 ? "border-b border-black/8" : ""}
              >
                <td className="py-3 text-[14px] font-medium text-[#4A4A4A] md:text-[15px]">
                  {item.range}
                </td>
                <td className="py-3 text-right text-[14px] font-semibold text-[#089E68] md:text-[15px]">
                  {item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-5 max-w-[90%] text-sm leading-6 text-[#4A4A4A] md:mt-6 md:text-[13px]">
          {netPriceBreakdownData.incomeBreakdown.note}
        </p>
      </div>
    </div>
  </section>
);
