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
    <div className="bg-[#E1E7EE] min-h-screen pb-8">
      <div className="w-full max-w-[1650px] mx-auto md:px-0">
        <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
          <div>
            <div className="bg-white px-4 pt-4 pb-0 md:px-8 md:pt-8 md:pb-8 shadow-[0_1px_3px_rgba(0,0,0,0.1)] overflow-hidden sm:rounded-none md:rounded-2xl">
              <ProfileHeader
                name="Lincoln University"
                avatar="https://i.ibb.co/XkdtT1Yj/product2.png"
                rating="4.9"
                reviews={575}
                followers={111}
                following={98}
                isFollowing={false}
              />
              <div className="-mx-4 px-4 md:mx-0 md:px-0">
                <NavTabs />
              </div>
              <div className="hidden lg:block">
                {renderTabContent()}
              </div>
            </div>
            <div className="lg:hidden px-0">
              {renderTabContent()}
            </div>
          </div>
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
}
