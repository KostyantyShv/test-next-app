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
    <div className="mb-14 w-[1080px] mx-auto">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "general" && <General />}
      {activeTab === "reviews" && <Reviews />}
      {activeTab === "case-studies" && <CaseStudies />}
      {activeTab === "checklist" && <CheckList />}
      {activeTab === "forms" && <Forms />}
      {activeTab === "spotlight" && <Spotlight />}
      {activeTab === "offers" && <Offers />}
    </div>
  );
};

export default EditPage;
