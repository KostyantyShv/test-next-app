"use client";
import { ProfileHeader } from "./components/ProfileHeader";
import NavTabs from "./components/NavTabs";
import SchoolsGrid from "./components/SchoolsGrid";
import ProfileSidebar from "./components/ProfileSidebar";
import { useSearchParams } from "next/navigation";
import { OffersGrid } from "./components/OffersGrid";
import { CollectionsGrid } from "./components/CollectionsGrid";
import { LikedGrid } from "./components/LikedGrid";
import ReviewsGrid from "./components/ReviewsGrid";
import ConnectionsGrid from "./components/ConnectionsGrid";
import MembersGrid from "./components/MembersGrid";

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
      case "reviews":
        return <ReviewsGrid />;
      case "connections":
        return <ConnectionsGrid />;
      case "members":
        return <MembersGrid />;
      default:
        return <div>no content yet</div>;
    }
  };
  return (
    <div className="text-[#4A4A4A] leading-normal w-full max-w-full overflow-x-hidden">
      <div className="w-full max-w-full mx-auto px-4 sm:px-5">
        <div className="w-full max-w-full mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
            <ProfileHeader
              name="Lincoln University"
              avatar="https://i.ibb.co/XkdtT1Yj/product2.png"
              rating="4.9"
              reviews={575}
              followers={111}
              following={98}
              isFollowing={false}
            />
            <NavTabs />
            {renderTabContent()}
          </div>
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
}
