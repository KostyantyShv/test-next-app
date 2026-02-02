"use client";
import React, { useState } from "react";
import Header from "./Header";
import General from "./tabs/General";
import Reviews from "./tabs/Reviews";
import { ActiveType } from "./types/active-tab";
import CaseStudies from "./tabs/CaseStudies";
import CheckList from "./tabs/CheckList";
import Forms from "./tabs/Forms";
import Spotlight from "./tabs/Spotlight";
import Offers from "./tabs/Offers";

const EditPage = () => {
  const [activeTab, setActiveTab] = useState<ActiveType>("general");
  return (
    <div className="min-h-screen bg-[#E1E7EE] text-[#4A4A4A]">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="mx-auto w-[1150px] max-w-full px-8 pb-14 max-[1200px]:w-auto max-[1200px]:mx-6 max-[1200px]:px-0 max-md:mx-4 max-md:px-0">
        {activeTab === "general" && <General />}
        {activeTab === "reviews" && <Reviews />}
        {activeTab === "case-studies" && <CaseStudies />}
        {activeTab === "checklist" && <CheckList />}
        {activeTab === "forms" && <Forms />}
        {activeTab === "spotlight" && <Spotlight />}
        {activeTab === "offers" && <Offers />}
      </main>
    </div>
  );
};

export default EditPage;
