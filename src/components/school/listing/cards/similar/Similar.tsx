import React, { useState } from "react";
import SchoolsGrid from "./SchoolsGrig";
import ViewMoreButton from "./ViewMoreButtom";

const initialSchools = [
  {
    imageSrc: "https://i.ibb.co/J8QjpbD/school1.webp",
    alt: "Evergreen Academy",
    name: "Evergreen Academy",
    location: "Boston, MA",
    reviews: 873,
  },
  {
    imageSrc: "https://i.ibb.co/fVRCnNZY/school2.webp",
    alt: "Riverside Prep",
    name: "Riverside Prep",
    location: "New York, NY",
    reviews: 477,
  },
  {
    imageSrc: "https://i.ibb.co/fzzhd5tf/school4.webp",
    alt: "Summit College",
    name: "Summit College",
    location: "Chicago, IL",
    reviews: 1307,
  },
  {
    imageSrc: "https://i.ibb.co/J8QjpbD/school1.webp",
    alt: "Valley Institute",
    name: "Valley Institute",
    location: "Providence, RI",
    reviews: 1100,
  },
];

const hiddenSchools = [
  {
    imageSrc: "https://i.ibb.co/fVRCnNZY/school2.webp",
    alt: "Oakridge Academy",
    name: "Oakridge Academy",
    location: "Los Angeles, CA",
    reviews: 923,
  },
  {
    imageSrc: "https://i.ibb.co/fzzhd5tf/school4.webp",
    alt: "Highland University",
    name: "Highland University",
    location: "Austin, TX",
    reviews: 756,
  },
];

const Similar: React.FC<{ id: string }> = ({ id }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id={id} className="flex justify-center my-cardMargin">
      <div className="w-[875px] bg-cardBackground p-cardPadding rounded-cardBorderRadius shadow-cardShadow">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#333] tracking-tight">
            Colleges like Lincoln Academy
          </h2>
        </div>
        <SchoolsGrid schools={initialSchools} />
        <div className={`${expanded ? "block" : "hidden"}`}>
          <SchoolsGrid schools={hiddenSchools} />
        </div>
        <ViewMoreButton
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        />
      </div>
    </div>
  );
};

export default Similar;
