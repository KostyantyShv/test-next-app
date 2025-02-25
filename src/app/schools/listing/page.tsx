import React from "react";
import Header from "@/components/school/listing/header/Header";
import ImagesGrig from "@/components/school/listing/images-grid/ImagesGrig";
import SchoolInfo from "@/components/school/listing/school-info/SchoolInfo";
import Content from "@/components/school/listing/content/Content";

export interface SchoolInfoInterface {
  name: string;
  ranking: string;
  grade: string;
  type: string;
  grades: string;
  location: string;
  reviews: {
    rating: number;
    count: number;
  };
}

const schoolInfo: SchoolInfoInterface = {
  name: "Lincoln Academy",
  ranking: "#4 in Best Public Elementary Schools in Arizona",
  grade: "A+",
  type: "Public, Charter",
  grades: "K-12",
  location: "FLAGSTAFF, AZ",
  reviews: {
    rating: 4,
    count: 73,
  },
};

const images = [
  "https://i.ibb.co/J8QjpbD/school1.webp",
  "https://i.ibb.co/fVRCnNZY/school2.webp",
  "https://i.ibb.co/fzzhd5tf/school4.webp",
];

const SchoolDirectory: React.FC = () => {
  return (
    <main>
      <Header />
      <div className="max-w-7xl mx-auto p-3 sm:p-5">
        <div className="bg-white rounded-lg overflow-hidden">
          <ImagesGrig images={images} />
          <SchoolInfo schoolInfo={schoolInfo} />
        </div>
        <Content />
      </div>
    </main>
  );
};

export default SchoolDirectory;
