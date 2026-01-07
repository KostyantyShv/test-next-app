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
import { useEffect } from "react";

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
  const tabParam = searchParams.get("tab");
  const activeTab = (tabParam || "listings") as TabType;

  useEffect(() => {
    if (!tabParam) {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", "listings");
      window.history.replaceState({}, "", url.toString());
    }
  }, [tabParam]);

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
    <div className="bg-[#E1E7EE] min-h-screen py-10">
      <div className="w-full max-w-[1650px] mx-auto px-5">
        <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
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
