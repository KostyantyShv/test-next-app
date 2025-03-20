import { Suspense } from "react";
import Link from "next/link";
import Content from "@/components/school/listing/content/Content";
import ImagesGrid from "@/components/school/listing/images-grid/ImagesGrid";
import SchoolInfo from "@/components/school/listing/school-info/SchoolInfo";
import { SchoolInfoInterface } from "@/types/school-listings";
import { GradSchoolContent } from "@/components/school/listing/content/GradSchoolContent";

const collegeInfo: SchoolInfoInterface = {
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

const gradSchoolInfo: SchoolInfoInterface = {
  name: "Lincoln Graduate School",
  ranking: "#8 in Best Graduate Schools in Arizona",
  grade: "A",
  type: "Public, Graduate",
  grades: "Graduate",
  location: "FLAGSTAFF, AZ",
  reviews: {
    rating: 4.5,
    count: 87,
  },
};

const images = [
  "https://i.ibb.co/J8QjpbD/school1.webp",
  "https://i.ibb.co/fVRCnNZY/school2.webp",
  "https://i.ibb.co/fzzhd5tf/school4.webp",
];

type Props = {
  params: Promise<unknown>;
  searchParams: Promise<{
    tab?: string;
  }>;
};

export default async function SchoolDirectory({ searchParams }: Props) {
  const { tab } = await searchParams;
  const activeTab = tab === "gradSchool" ? "gradSchool" : "college";
  const schoolData = activeTab === "gradSchool" ? gradSchoolInfo : collegeInfo;

  const renderContent = () => {
    return activeTab === "gradSchool" ? <GradSchoolContent /> : <Content />;
  };

  return (
    <div className="md:max-w-[1080px]">
      <div className="bg-cardBackground md:rounded-cardBorderRadius md:overflow-hidden">
        <div className="relative">
          <ImagesGrid images={images} />
          <div className="flex absolute bottom-0 left-0 md:left-2 gap-2 max-md:p-2">
            <Link
              href="?tab=college"
              className={`px-3 py-1 font-bold text-sm ${
                activeTab === "college"
                  ? "bg-white text-black"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } max-md:rounded-md transition-colors`}
            >
              COLLEGE
            </Link>
            <Link
              href="?tab=gradSchool"
              className={`px-3 py-1 font-bold text-sm ${
                activeTab === "gradSchool"
                  ? "bg-white text-black"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } max-md:rounded-md transition-colors`}
            >
              GRAD SCHOOL
            </Link>
          </div>
        </div>
        <Suspense fallback={<div>Loading school information...</div>}>
          <SchoolInfo schoolInfo={schoolData} images={images} />
        </Suspense>
      </div>
      <Suspense fallback={<div>Loading content...</div>}>
        {renderContent()}
      </Suspense>
    </div>
  );
}
