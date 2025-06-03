"use client";
import ProfileHeader from "./components/ProfileHeader";
import NavTabs from "./components/NavTabs";
import SchoolsGrid from "./components/SchoolsGrid";
import ProfileSidebar from "./components/ProfileSidebar";
import { useSearchParams } from "next/navigation";
import { OffersGrid } from "./components/OffersGrid";
import { CollectionsGrid } from "./components/CollectionsGrid";
import { LikedGrid } from "./components/LikedGrid";

type TabType =
  | "listings"
  | "offers"
  | "collections"
  | "liked"
  | "reviews"
  | "connections"
  | "members";

export default function VendorProfile() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") as TabType;

  const renderTabContent = () => {
    switch (activeTab) {
      case "listings":
        return <SchoolsGrid />;
      case "offers":
        return <OffersGrid />;
      case "collections":
        return <CollectionsGrid />;
      case "liked":
        return <LikedGrid />;
      default:
        <div>no content yet</div>;
    }
  };
  return (
    <div className={`text-[#4A4A4A] leading-normal`}>
      <div className="w-full mx-auto px-5">
        <div className="w-full mx-auto grid grid-cols-[1fr_350px] gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <ProfileHeader />
            <NavTabs />
            {renderTabContent()}
          </div>
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
}
