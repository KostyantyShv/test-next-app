"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import ContentArea from "./ContentArea";

const MainContainer: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [layout, setLayout] = useState("classic");

  useEffect(() => {
    console.log("Current layout:", layout);
  }, [layout]);

  return (
    <div className="w-full mx-auto bg-white rounded-xl border border-[rgba(0,0,0,0.1)] shadow-[0_2px_12px_rgba(0,0,0,0.05)] overflow-hidden">
      <Header
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
        isMapActive={isMapActive}
        setIsMapActive={setIsMapActive}
        layout={layout}
        setLayout={setLayout}
      />
      <ContentArea isMapActive={isMapActive} layout={layout} />
    </div>
  );
};

export default MainContainer;
