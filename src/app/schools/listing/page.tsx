// import { Suspense } from "react";
// import Link from "next/link";
// import SchoolInfoDesktop from "@/components/school/listing/school-info/SchoolInfoDesktop";
// import ContentDesktop from "@/components/school/listing/content/ContentDesktop";
// import ImagesGrigDesktop from "@/components/school/listing/images-grid/ImagesGrigDesktop";

// const gradSchoolInfo: SchoolInfoInterface = {
//   name: "Lincoln Graduate School",
//   ranking: "#8 in Best Graduate Schools in Arizona",
//   grade: "A",
//   type: "Public, Graduate",
//   grades: "Graduate",
//   location: "FLAGSTAFF, AZ",
//   reviews: {
//     rating: 4.5,
//     count: 87,
//   },
// };

// const GradSchoolContent: React.FC = () => (
//   <div className="px-5 py-6">
//     <h2 className="text-2xl font-bold mb-4">Graduate School Information</h2>
//     <p className="mb-3">
//       Lincoln Graduate School offers advanced degree programs across various
//       disciplines. Our graduate programs are designed for professionals looking
//       to advance their careers and for researchers pursuing academic excellence.
//     </p>
//     <p className="mb-3">
//       With renowned faculty, research opportunities, and professional
//       development resources, Lincoln Graduate School prepares students for
//       leadership roles in their fields.
//     </p>
//   </div>
// );

// const images = [
//   "https://i.ibb.co/J8QjpbD/school1.webp",
//   "https://i.ibb.co/fVRCnNZY/school2.webp",
//   "https://i.ibb.co/fzzhd5tf/school4.webp",
// ];

// type Props = {
//   params: Promise<unknown>;
//   searchParams: Promise<{
//     tab?: string;
//   }>;
// };

// export default async function SchoolDirectory({ params, searchParams }: Props) {
//   const { tab } = await searchParams;
//   const activeTab = tab === "gradSchool" ? "gradSchool" : "college";

//   const renderSchoolInfo = () => {
//     switch (activeTab) {
//       case "college":
//         return <SchoolInfoDesktop schoolInfo={schoolInfo} />;
//       case "gradSchool":
//         return <SchoolInfoDesktop schoolInfo={gradSchoolInfo} />;
//       default:
//         return <SchoolInfoDesktop schoolInfo={schoolInfo} />;
//     }
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "college":
//         return <ContentDesktop />;
//       case "gradSchool":
//         return <GradSchoolContent />;
//       default:
//         return <ContentDesktop />;
//     }
//   };

//   return (
//     <main>
//       <div className="max-w-[1080px] mx-auto p-3 max-sm:p-5">
//         <div className="bg-cardBackground rounded-cardBorderRadius overflow-hidden">
//           <div className="relative">
//             <ImagesGrigDesktop images={images} />
//             <div className="flex">
//               <Link
//                 href="?tab=college"
//                 className={`absolute bottom-0 left-[10px] px-2 py-1 font-bold text-xs max-sm:text-sm ${
//                   activeTab === "college"
//                     ? "bg-white"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//               >
//                 COLLEGE
//               </Link>
//               <Link
//                 href="?tab=gradSchool"
//                 className={`absolute bottom-0 left-[97px] px-2 py-1 font-bold text-xs max-sm:text-sm ${
//                   activeTab === "gradSchool"
//                     ? "bg-white"
//                     : "bg-gray-100 text-gray-600"
//                 }`}
//               >
//                 GRAD SCHOOL
//               </Link>
//             </div>
//           </div>
//           <Suspense fallback={<div>Loading school information...</div>}>
//             {renderSchoolInfo()}
//           </Suspense>
//         </div>
//         <Suspense fallback={<div>Loading content...</div>}>
//           {renderContent()}
//         </Suspense>
//       </div>
//     </main>
//   );
// }

import ListingPage from "@/components/school/listing/listing-page/ListingPage";
import { SchoolInfoInterface } from "@/types/school-listings";

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
  return <ListingPage images={images} schoolInfo={schoolInfo} />;
};

export default SchoolDirectory;
