"use client";

import { useState, useEffect } from "react";
import { ActionsDrawer } from "./ActionsDrawer";
import { ActivityLogDrawer } from "./drawers/ActivitiLogDrawer";
import { AddMemberDrawer } from "./drawers/AddMemberDrawer";
import { AssignToListingDrawer } from "./drawers/AssignToListingDrawer";
import { DeleteConfirmationDrawer } from "./drawers/DeleteConfirmationDrawer";
import { EditMemberDrawer } from "./drawers/EditMemberDrawer";
import { FiltersDrawer } from "./drawers/FIltersDrawer";
import { OptionsDrawer } from "./drawers/OptionsDrawer";
import { TeamTypeDrawer } from "./drawers/TeamTypeDrawer";
import { Header } from "./Header";
import { MemberCards } from "./MemberCards";
import { SearchBar } from "./SearchBar";
import { ToastContainer } from "./ToastContainer";
import { Pagination } from "./Pagination";

export function TeamMembersDashboardMobile() {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);

  const openDrawer = (drawerId: string) => {
    setActiveDrawer(drawerId);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    setActiveDrawer(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handleOpenDrawer = (event: Event) => {
      const drawerId = (event as CustomEvent).detail;
      if (typeof drawerId === "string") {
        openDrawer(drawerId);
      }
    };
    document.addEventListener("openDrawer", handleOpenDrawer);
    return () => {
      document.removeEventListener("openDrawer", handleOpenDrawer);
    };
  }, []);

  return (
    <div className="relative flex h-[740px] flex-col overflow-hidden">
      <Header
        onTeamTypeClick={() => openDrawer("teamType")}
        onSearchToggle={() => setSearchVisible(!searchVisible)}
        onAddClick={() => openDrawer("addMember")}
        onFilterClick={() => openDrawer("filters")}
        onMoreOptionsClick={() => openDrawer("options")}
      />
      <SearchBar visible={searchVisible} />
      <div className="flex-1 overflow-y-auto bg-background">
        <MemberCards onActionClick={(id) => openDrawer(`actions-${id}`)} />
        <Pagination />
      </div>
      <TeamTypeDrawer
        isOpen={activeDrawer === "teamType"}
        onClose={closeDrawer}
      />
      <FiltersDrawer
        isOpen={activeDrawer === "filters"}
        onClose={closeDrawer}
      />
      <ActionsDrawer
        isOpen={activeDrawer?.startsWith("actions-")}
        memberId={
          activeDrawer?.startsWith("actions-")
            ? parseInt(activeDrawer.split("-")[1])
            : undefined
        }
        onClose={closeDrawer}
      />
      <ActivityLogDrawer
        isOpen={activeDrawer === "activityLog"}
        onClose={closeDrawer}
      />
      <AddMemberDrawer
        isOpen={activeDrawer === "addMember"}
        onClose={closeDrawer}
      />
      <EditMemberDrawer
        isOpen={activeDrawer === "editMember"}
        onClose={closeDrawer}
      />
      <AssignToListingDrawer
        isOpen={activeDrawer === "assignToListing"}
        onClose={closeDrawer}
      />
      <DeleteConfirmationDrawer
        isOpen={activeDrawer === "deleteConfirmation"}
        onClose={closeDrawer}
      />
      <OptionsDrawer
        isOpen={activeDrawer === "options"}
        onClose={closeDrawer}
      />
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          activeDrawer ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeDrawer}
      />
      <ToastContainer />
    </div>
  );
}
