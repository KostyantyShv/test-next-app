import React from "react";

interface SectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, description, children }) => {
  return (
    <div className="flex gap-7 mb-10 max-lg:flex-col max-lg:gap-5">
      <div className="flex-[0_0_30%] pt-1 max-lg:flex-auto max-lg:pt-0">
        <h2 className="text-xl font-semibold text-text-color mb-3">{title}</h2>
        <p className="text-sm text-text-muted leading-relaxed">{description}</p>
      </div>
      <div className="flex-1 min-w-0 max-md:bg-white">{children}</div>
    </div>
  );
};

export default Section;
