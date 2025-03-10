"use client";

import { SchoolInfoInterface } from "@/types/school-listings";
import dynamic from "next/dynamic";
const ImagesGrid = dynamic(
  () => import("@/components/school/listing/images-grid/ImagesGrid"),
  { ssr: false }
);
const Content = dynamic(
  () => import("@/components/school/listing/content/Content"),
  { ssr: false }
);

const SchoolInfo = dynamic(
  () => import("@/components/school/listing/school-info/SchoolInfo"),
  { ssr: false }
);

interface Props {
  images: string[];
  schoolInfo: SchoolInfoInterface;
}

const ListingPage: React.FC<Props> = ({ schoolInfo, images }) => {
  return (
    <div className="md:max-w-[1080px] md:mx-auto md:p-3">
      <div className="bg-cardBackground md:rounded-cardBorderRadius md:overflow-hidden">
        <ImagesGrid images={images} variant="mobile" />
        <SchoolInfo variant="mobile" schoolInfo={schoolInfo} images={images} />
      </div>
      <Content variant="mobile" />
    </div>
  );
};

export default ListingPage;
