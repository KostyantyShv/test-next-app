import React from "react";
import { valueSectionData } from "../mock";

export const ValueSection: React.FC = () => (
  <section className="mb-5 rounded-xl bg-white p-4 md:mb-6 md:grid md:grid-cols-[2fr_1fr] md:gap-8 md:p-8">
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#00DF8B] text-2xl font-bold text-white md:h-12 md:w-12">
          A
        </div>
        <div className="flex-grow">
          <h3 className="mb-1 text-base font-semibold text-[#016853] md:text-[15px]">
            {valueSectionData.title}
          </h3>
          <p className="text-sm leading-6 text-[#4A4A4A] md:text-[13px]">
            {valueSectionData.description}
          </p>
        </div>
      </div>
      <div className="mt-2">
        <div className="mb-1 text-[14px] font-medium text-[#5F5F5F] md:mb-2 md:text-[15px]">
          Net Price
        </div>
        <div className="mb-1 text-[32px] font-bold tracking-tight text-[#464646] md:text-[36px]">
          {valueSectionData.netPrice}
        </div>
        <div className="text-base text-[#5F5F5F] md:text-[14px]">/ year</div>
        <div className="mt-1 text-[13px] text-[#5F5F5F] md:text-sm">
          National {valueSectionData.nationalAverage}
        </div>
      </div>
      <div className="my-4 h-px bg-black/8 md:my-6"></div>
      <p className="max-w-[90%] text-sm leading-6 text-[#4A4A4A] md:text-[13px]">
        {valueSectionData.priceNote}
      </p>
    </div>
    <div className="mt-5 flex flex-col gap-4 pt-2 md:mt-0">
      {valueSectionData.links.map((link) => (
        <a
          key={link.text}
          href={link.href}
          className="flex items-center justify-between gap-2 py-2 text-[14px] font-medium text-[#346DC2] transition-colors duration-200 hover:text-[#1D77BD] md:justify-start md:text-[15px]"
        >
          {link.text}
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
      ))}
    </div>
  </section>
);
