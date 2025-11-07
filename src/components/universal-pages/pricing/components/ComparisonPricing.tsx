"use client";

import React, { useEffect, useRef, useState } from "react";
import useWindowWidth from "@/hooks/useWindowWidth";

type View = "individual" | "owners";

type IconType = "check" | "cross" | "text" | "na";

const ComparisonPricing: React.FC = () => {
  const isMobile = useWindowWidth();
  const [view, setView] = useState<View>("individual");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const btnLeftRef = useRef<HTMLButtonElement | null>(null);
  const btnRightRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const bg = bgRef.current;
    const targetBtn = view === "individual" ? btnLeftRef.current : btnRightRef.current;
    if (!container || !bg || !targetBtn) return;
    const containerRect = container.getBoundingClientRect();
    const targetRect = targetBtn.getBoundingClientRect();
    bg.style.width = `${targetRect.width}px`;
    bg.style.transform = `translateX(${targetRect.left - containerRect.left}px)`;
  }, [view]);

  useEffect(() => {
    const id = setTimeout(() => {
      const container = containerRef.current;
      const bg = bgRef.current;
      const targetBtn = btnLeftRef.current;
      if (!container || !bg || !targetBtn) return;
      const containerRect = container.getBoundingClientRect();
      const targetRect = targetBtn.getBoundingClientRect();
      bg.style.width = `${targetRect.width}px`;
      bg.style.transform = `translateX(${targetRect.left - containerRect.left}px)`;
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="bg-[#F9FAFB] px-4 md:px-5 py-6">
      <div className="w-full max-w-[1440px] mx-auto max-md:max-w-[390px]">
        <h2 className="font-semibold text-2xl md:text-4xl text-center mb-8 md:mb-6">Detailed Feature Comparison</h2>

        {/* Toggle */}
        <div className="flex justify-center mb-6 md:mb-6">
          <div ref={containerRef} className="inline-flex bg-[#e0e7ff] rounded-full p-1 md:p-1.5 relative w-full max-w-[320px] md:max-w-none md:w-auto">
            <div
              ref={bgRef}
              className="absolute top-1 md:top-1.5 left-1 md:left-1.5 h-[calc(100%-8px)] md:h-[calc(100%-12px)] bg-white rounded-full shadow-md transition-[transform,width] duration-300 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]"
            />
            <button
              ref={btnLeftRef}
              className={`flex-1 md:flex-none px-4 md:px-7 py-3 text-sm md:text-base font-semibold rounded-full relative z-10 transition-colors ${
                view === "individual" ? "text-[#2563EB]" : "text-[#4B5563]"
              }`}
              onClick={() => setView("individual")}
            >
              Individual User
            </button>
            <button
              ref={btnRightRef}
              className={`flex-1 md:flex-none px-4 md:px-7 py-3 text-sm md:text-base font-semibold rounded-full relative z-10 transition-colors ${
                view === "owners" ? "text-[#2563EB]" : "text-[#4B5563]"
              }`}
              onClick={() => setView("owners")}
            >
              Listing Owners
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            {view === "individual" ? <IndividualTable /> : <OwnersTable />}
          </div>
        </div>
      </div>
    </div>
  );
};

const IndividualTable: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.07)] overflow-hidden min-w-[720px] md:min-w-0">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 flex bg-white/90 backdrop-blur-md">
        <div className="flex-[0_0_28%] min-w-[200px] md:min-w-[250px]" />
        <PlanHeader title="Explorer" subtitle="Free" color="explorer" buttonLabel="Current Plan" secondary />
        <PlanHeader title="Researcher" subtitle="$19 / month" color="researcher" buttonLabel="Choose Plan" />
        <PlanHeader title="Monitor Packs" subtitle="Add-on from $9/mo" color="monitor" buttonLabel="Purchase" />
        <PlanHeader title="Report Packs" subtitle="Add-on from $49/pack" color="report" buttonLabel="Purchase" />
      </div>

      {/* Body */}
      <div className="w-full">
        <SectionHeader>Core Features</SectionHeader>
        <Row name="Public Search" cells={[{type:"text", value:"Unlimited"},{type:"text", value:"Unlimited"},{type:"text", value:"N/A"},{type:"text", value:"N/A"}]} />
        <Row name="Ad-Free Experience" cells={[{type:"cross"},{type:"check"},{type:"text", value:"N/A"},{type:"text", value:"N/A"}]} />
        <Row name="Compare Listings" cells={[{type:"text", value:"Up to 3"},{type:"text", value:"Up to 10"},{type:"text", value:"N/A"},{type:"text", value:"N/A"}]} />
        <Row name="Saved Bookmarks & Collections" cells={[{type:"text", value:"Limited"},{type:"check"},{type:"text", value:"N/A"},{type:"text", value:"N/A"}]} />

        <SectionHeader>Data & Alerts</SectionHeader>
        <Row name="Export Data to CSV" cells={[{type:"cross"},{type:"check"},{type:"text", value:"N/A"},{type:"text", value:"N/A"}]} />
        <Row name="Real-time Listing Alerts" cells={[{type:"cross"},{type:"cross"},{type:"check"},{type:"cross"}]} />
        <Row name="Unlock Detailed Reports" cells={[{type:"cross"},{type:"cross"},{type:"cross"},{type:"check"}]} />
      </div>
    </div>
  );
};

const OwnersTable: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.07)] overflow-hidden min-w-[640px] md:min-w-0">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 flex bg-white/90 backdrop-blur-md">
        <div className="flex-[0_0_28%] min-w-[200px] md:min-w-[250px]" />
        <PlanHeader title="Basic Listing" subtitle="Free" color="basic" buttonLabel="Claim for Free" secondary />
        <PlanHeader title="Profile Management" subtitle="Usage-Based" color="profile" buttonLabel="Configure" />
        <PlanHeader title="Boosted Listings" subtitle="Usage-Based" color="boosted" buttonLabel="Launch Campaign" />
      </div>

      {/* Body */}
      <div className="w-full">
        <SectionHeader>Core Management</SectionHeader>
        <Row name="Claim & Verify Listing" cells={[{type:"check"},{type:"check"},{type:"text", value:"Required"}]} />
        <Row name="Respond to Reviews" cells={[{type:"check"},{type:"check"},{type:"text", value:"N/A"}]} />

        <SectionHeader>Branding & Promotion</SectionHeader>
        <Row name="Full Profile Editing" cells={[{type:"cross"},{type:"text", value:"All Tiers"},{type:"text", value:"N/A"}]} />
        <Row name={'"Claimed" & "Verified" Badges'} cells={[{type:"text", value:'"Claimed" Badge'},{type:"text", value:'Upgrades to "Verified"'},{type:"text", value:"N/A"}]} />
        <Row name="Rich Media Uploads" cells={[{type:"cross"},{type:"text", value:"Premium & Premium+"},{type:"text", value:"N/A"}]} />
        <Row name="Remove Competitor Ads" cells={[{type:"cross"},{type:"text", value:"Premium+ Only"},{type:"text", value:"N/A"}]} />
        <Row name="Priority Placement & Targeting" cells={[{type:"cross"},{type:"cross"},{type:"check"}]} />

        <SectionHeader>Analytics</SectionHeader>
        <Row name="Advanced Analytics Dashboard" cells={[{type:"cross"},{type:"text", value:"Premium & Premium+"},{type:"text", value:"Campaign Analytics"}]} />
      </div>
    </div>
  );
};

const SectionHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="px-4 md:px-6 py-3 md:py-4 font-medium text-[10px] md:text-xs uppercase tracking-wider text-[#4B5563] bg-[#F9FAFB] border-y border-[#E5E7EB]">
    {children}
  </div>
);

const Row: React.FC<{ name: string; cells: Array<{ type: IconType; value?: string }> }> = ({ name, cells }) => (
  <div className="flex border-t border-[#E5E7EB]">
    <div className="flex-[0_0_28%] min-w-[200px] md:min-w-[250px] px-4 md:px-6 py-4 md:py-5 font-medium text-sm md:text-base">{name}</div>
    {cells.map((cell, i) => (
      <div key={i} className="flex-1 px-3 md:px-4 py-4 md:py-5 text-center flex items-center justify-center border-l border-[#E5E7EB] text-[0.85rem] md:text-[0.95rem] text-[#4B5563]">
        {cell.type === "check" && <CheckIcon className="w-5 h-5 md:w-6 md:h-6 text-[#22C55E]" />}
        {cell.type === "cross" && <CrossIcon className="w-5 h-5 md:w-6 md:h-6 text-[#D1D5DB]" />}
        {cell.type === "text" && <span className="text-xs md:text-[0.95rem]">{cell.value}</span>}
        {cell.type === "na" && <span className="text-xs md:text-[0.95rem]">N/A</span>}
      </div>
    ))}
  </div>
);

const PlanHeader: React.FC<{ title: string; subtitle: string; color: "explorer"|"researcher"|"monitor"|"report"|"basic"|"profile"|"boosted"; buttonLabel: string; secondary?: boolean; }> = ({ title, subtitle, color, buttonLabel, secondary }) => (
  <div className="flex-1 px-3 md:px-4 py-4 md:py-6 text-center relative border-l border-[#E5E7EB]">
    <div className="absolute bottom-0 left-0 w-full h-[3px]" style={{ backgroundColor: underlineColors[color] }} />
    <h3 className="font-semibold text-base md:text-xl">{title}</h3>
    <p className="text-[#4B5563] my-2 min-h-[36px] md:min-h-[42px] text-xs md:text-base">{subtitle}</p>
    <a
      href="#"
      className={`inline-block w-full px-3 md:px-4 py-2 md:py-3 rounded-md text-xs md:text-base font-semibold transition-all ${
        secondary
          ? "bg-white text-[#2563EB] border-2 border-[#2563EB]"
          : "bg-[#2563EB] text-white"
      }`}
    >
      {buttonLabel}
    </a>
  </div>
);

const underlineColors = {
  explorer: "#3B82F6",
  researcher: "#22C55E",
  monitor: "#F59E0B",
  report: "#EF4444",
  basic: "#6B7280",
  profile: "#5D37E2",
  boosted: "#10B981",
};

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default ComparisonPricing;
