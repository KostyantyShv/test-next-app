"use client";
import { useState } from "react";
import { activityLogs } from "../data/activityLogs";
// import { teamMembers } from "../data/teamMembers";
import { usePagination } from "../hooks/usePagination";
import { TeamMember } from "../types";
import { createClient } from "@/lib/supabase_utils/client";
import { ActivityLogDrawer } from "./drawers/ActivityLogDrawer";
import { AddMemberDrawer } from "./drawers/AddMemberDrawer";
import { AssignToListingDrawer } from "./drawers/AssignToListingDrawer";
import { DeleteConfirmationDrawer } from "./drawers/DeleteConfirmationDrawer";
import { EditMemberDrawer } from "./drawers/EditMemberDrawer";
import { OptionsDrawer } from "./drawers/OptionsDrawer";
import { TeamTypeDrawer } from "./drawers/TeamTypeDrawer";
import { Header } from "./Header";
import { MemberList } from "./MemberList";
import { Pagination } from "./Pagination";
import { SearchBar } from "./SearchBar";
import { ActionsDrawer } from "./drawers/ActionsDrawer";
import { FiltersDrawer } from "./drawers/FIltersDrawer";

const allListings = [
  {
    id: 1,
    name: "Harvard University",
    image: "https://i.ibb.co/fGKH7fDq/product2.png",
  },
  {
    id: 2,
    name: "Stanford University",
    image: "https://i.ibb.co/fGKH7fDq/product2.png",
  },
  {
    id: 3,
    name: "Massachusetts Institute of Technology",
    image: "https://i.ibb.co/63Y8x85/product3.jpg",
  },
];

interface TeamMembersMobileProps {
  initialMembers?: TeamMember[];
  ownerId: string;
}

const TeamMembersMobile: React.FC<TeamMembersMobileProps> = ({
  initialMembers,
  ownerId,
}) => {
  // State
  const [members, setMembers] = useState<TeamMember[]>(
    initialMembers && initialMembers.length > 0 ? initialMembers : []
  );
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<string>("name");
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false);
  const [currentTeamType, setCurrentTeamType] = useState<string>("team");
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [isTeamTypeDrawerOpen, setIsTeamTypeDrawerOpen] = useState(false);
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  const [isActionsDrawerOpen, setIsActionsDrawerOpen] = useState(false);
  const [isActivityLogDrawerOpen, setIsActivityLogDrawerOpen] = useState(false);
  const [isAddMemberDrawerOpen, setIsAddMemberDrawerOpen] = useState(false);
  const [isEditMemberDrawerOpen, setIsEditMemberDrawerOpen] = useState(false);
  const [isAssignToListingDrawerOpen, setIsAssignToListingDrawerOpen] =
    useState(false);
  const [isDeleteConfirmationDrawerOpen, setIsDeleteConfirmationDrawerOpen] =
    useState(false);
  const [isOptionsDrawerOpen, setIsOptionsDrawerOpen] = useState(false);
  const [hideRead, setHideRead] = useState<boolean>(false);
  const [activitySearchTerm, setActivitySearchTerm] = useState<string>("");
  const [isSavingMember, setIsSavingMember] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Filter and sort members
  const filterMembers = (): TeamMember[] => {
    let filtered = [...members];
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (member) =>
          `${member.firstName} ${member.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((member) => member.status === statusFilter);
    }
    if (currentTeamType === "collaborators") {
      filtered = filtered.filter(
        (member) => !member.isAdmin && member.status === "accepted"
      );
    }
    switch (sortFilter) {
      case "name":
        filtered.sort((a, b) =>
          `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          )
        );
        break;
      case "email":
        filtered.sort((a, b) => a.email.localeCompare(b.email));
        break;
      case "lastActive":
        filtered.sort(
          (a, b) =>
            new Date(b.lastActive).getTime() - new Date(a.lastActive).getTime()
        );
        break;
    }
    return filtered;
  };

  const filteredMembers = filterMembers();
  const {
    currentPage,
    displayedItems: displayedMembers,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    itemsPerPageValue,
    getPageNumbers,
  } = usePagination(filteredMembers, 10);
  const filterCount =
    (statusFilter !== "all" ? 1 : 0) + (sortFilter !== "name" ? 1 : 0);

  // Drawer handlers
  const openDrawer = (drawer: string) => {
    setActiveDrawer(drawer);
    switch (drawer) {
      case "teamType":
        setIsTeamTypeDrawerOpen(true);
        break;
      case "filters":
        setIsFiltersDrawerOpen(true);
        break;
      case "actions":
        setIsActionsDrawerOpen(true);
        break;
      case "activityLog":
        setIsActivityLogDrawerOpen(true);
        break;
      case "addMember":
        setIsAddMemberDrawerOpen(true);
        break;
      case "editMember":
        setIsEditMemberDrawerOpen(true);
        break;
      case "assignToListing":
        setIsAssignToListingDrawerOpen(true);
        break;
      case "deleteConfirmation":
        setIsDeleteConfirmationDrawerOpen(true);
        break;
      case "options":
        setIsOptionsDrawerOpen(true);
        break;
    }
  };

  const closeDrawer = () => {
    setActiveDrawer(null);
    setIsTeamTypeDrawerOpen(false);
    setIsFiltersDrawerOpen(false);
    setIsActionsDrawerOpen(false);
    setIsActivityLogDrawerOpen(false);
    setIsAddMemberDrawerOpen(false);
    setIsEditMemberDrawerOpen(false);
    setIsAssignToListingDrawerOpen(false);
    setIsDeleteConfirmationDrawerOpen(false);
    setIsOptionsDrawerOpen(false);
    setCurrentMemberId(null);
  };

  const handleActionClick = (memberId: number) => {
    setCurrentMemberId(memberId);
    openDrawer("actions");
  };

  const handleTeamTypeChange = (type: string) => {
    setCurrentTeamType(type);
    closeDrawer();
  };

  const handleApplyFilters = () => {
    const statusInput = document.querySelector(
      'input[name="filterStatus"]:checked'
    ) as HTMLInputElement;
    const sortInput = document.querySelector(
      'input[name="filterSort"]:checked'
    ) as HTMLInputElement;
    if (statusInput) setStatusFilter(statusInput.value);
    if (sortInput) setSortFilter(sortInput.value);
    closeDrawer();
  };

  const handleResetFilters = () => {
    setStatusFilter("all");
    setSortFilter("name");
    closeDrawer();
  };

  const renderActivityLogs = () => {
    let logs = [...activityLogs];
    if (currentMemberId) {
      logs = logs.filter((log) => log.userId === currentMemberId);
    }
    if (activitySearchTerm.trim()) {
      logs = logs.filter((log) =>
        [
          log.userName,
          log.content || "",
          log.action || "",
          log.field || "",
          log.listingName || "",
        ]
          .join(" ")
          .toLowerCase()
          .includes(activitySearchTerm.toLowerCase())
      );
    }
    if (hideRead) {
      logs = logs.filter((log) => !log.isRead);
    }
    return logs;
  };

  const activityLogsToDisplay = renderActivityLogs();

  const handleAddMember = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
    listingIds?: number[];
  }) => {
    try {
      const supabase = createClient();
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      const selectedListings = data.listingIds 
        ? allListings.filter((l) => data.listingIds!.includes(l.id))
        : [];

      const { data: inserted, error } = await supabase
        .from("team_members")
        .insert({
          email: data.email,
          team_owner_id: ownerId,
          role: data.isAdmin ? "admin" : "member",
          name: fullName || data.email.split("@")[0] || "Member",
          status: "pending",
          permissions: selectedListings,
        })
        .select("*")
        .single();

      if (error) {
        console.error("Failed to add member to database:", error.message);
        // Still add to local state even if DB save fails
      }

      const nextId =
        members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;

      const rawDate = inserted?.updated_at || inserted?.created_at;
      const formattedLastActive =
        rawDate && !isNaN(new Date(rawDate).getTime())
          ? new Date(rawDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "";

      const newMember: TeamMember = {
        id: nextId,
        firstName: data.firstName || data.email.split("@")[0] || "Member",
        lastName: data.lastName || "",
        email: data.email,
        avatar: "https://via.placeholder.com/80",
        status: "pending",
        lastActive: formattedLastActive,
        isAdmin: data.isAdmin,
        listings: selectedListings,
      };

      setMembers((prev) => [newMember, ...prev]);
      setIsAddMemberDrawerOpen(false);
    } catch (error) {
      console.error("Error adding member:", error);
      // Still add to local state even if there's an error
    const nextId =
      members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;

      const selectedListings = data.listingIds 
        ? allListings.filter((l) => data.listingIds!.includes(l.id))
        : [];

    const newMember: TeamMember = {
      id: nextId,
      firstName: data.firstName || data.email.split("@")[0] || "Member",
      lastName: data.lastName || "",
      email: data.email,
      avatar: "https://via.placeholder.com/80",
      status: "pending",
      lastActive: "",
      isAdmin: data.isAdmin,
        listings: selectedListings,
    };

    setMembers((prev) => [newMember, ...prev]);
    setIsAddMemberDrawerOpen(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#E1E7EE' }}
    >
      <Header
        currentTeamType={currentTeamType}
        filterCount={filterCount}
        onTeamTypeClick={() => openDrawer("teamType")}
        onSearchToggle={() => setIsSearchVisible(!isSearchVisible)}
        onAddMemberClick={() => openDrawer("addMember")}
        onFiltersClick={() => openDrawer("filters")}
        onOptionsClick={() => openDrawer("options")}
      />
      <SearchBar
        isVisible={isSearchVisible}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div 
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: '#E1E7EE' }}
      >
        <MemberList
          members={displayedMembers}
          onActionClick={handleActionClick}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPageValue={itemsPerPageValue}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          getPageNumbers={getPageNumbers}
        />
      </div>
      <TeamTypeDrawer
        isOpen={isTeamTypeDrawerOpen}
        currentTeamType={currentTeamType}
        onClose={closeDrawer}
        onTeamTypeChange={handleTeamTypeChange}
      />
      <FiltersDrawer
        isOpen={isFiltersDrawerOpen}
        statusFilter={statusFilter}
        sortFilter={sortFilter}
        onClose={closeDrawer}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />
      <ActionsDrawer
        isOpen={isActionsDrawerOpen}
        currentMemberId={currentMemberId}
        members={members}
        onClose={closeDrawer}
        onEditClick={() => {
          closeDrawer();
          openDrawer("editMember");
        }}
        onActivityLogClick={() => {
          closeDrawer();
          openDrawer("activityLog");
        }}
        onAssignToListingClick={() => {
          closeDrawer();
          openDrawer("assignToListing");
        }}
        onResendInvitationClick={() => {
          closeDrawer(); /* Placeholder */
        }}
        onDeleteClick={() => {
          closeDrawer();
          openDrawer("deleteConfirmation");
        }}
      />
      <ActivityLogDrawer
        isOpen={isActivityLogDrawerOpen}
        currentMemberId={currentMemberId}
        activitySearchTerm={activitySearchTerm}
        hideRead={hideRead}
        onClose={closeDrawer}
        onSearchChange={setActivitySearchTerm}
        onHideReadToggle={() => setHideRead(!hideRead)}
        activityLogsToDisplay={activityLogsToDisplay}
      />
      <AddMemberDrawer
        isOpen={isAddMemberDrawerOpen}
        onClose={closeDrawer}
        onSendInvitation={handleAddMember}
      />
      <EditMemberDrawer
        isOpen={isEditMemberDrawerOpen}
        member={currentMemberId ? members.find((m) => m.id === currentMemberId) || null : null}
        onClose={closeDrawer}
        availableListings={allListings}
        onSaveChanges={async (data) => {
          if (currentMemberId) {
            const existing = members.find((m) => m.id === currentMemberId);
            if (!existing) {
              closeDrawer();
              return;
            }

            try {
              const supabase = createClient();
              const fullName = `${data.firstName} ${data.lastName}`.trim();
              const selectedListings = data.listingIds 
                ? allListings.filter((l) => data.listingIds!.includes(l.id))
                : [];

              const { error } = await supabase
                .from("team_members")
                .update({
                  role: data.isAdmin ? "admin" : "member",
                  name: fullName || data.email.split("@")[0] || "Member",
                  permissions: selectedListings,
                })
                .eq("team_owner_id", ownerId)
                .eq("email", existing.email);

              if (error) {
                console.error("Failed to update member in database:", error.message);
              }
            } catch (error) {
              console.error("Error updating member:", error);
            }

            const selectedListings = data.listingIds 
              ? allListings.filter((l) => data.listingIds!.includes(l.id))
              : [];
            setMembers((prev) =>
              prev.map((member) =>
                member.id === currentMemberId
                  ? { 
                      ...member, 
                      firstName: data.firstName,
                      lastName: data.lastName,
                      email: data.email,
                      listings: selectedListings, 
                      isAdmin: data.isAdmin 
                    }
                  : member
              )
            );
          }
          closeDrawer();
        }}
      />
      <AssignToListingDrawer
        isOpen={isAssignToListingDrawerOpen}
        currentMemberId={currentMemberId}
        members={members}
        onClose={closeDrawer}
        availableListings={allListings}
        onSave={async (memberId, selectedListingIds) => {
          const existing = members.find((m) => m.id === memberId);
          if (!existing) {
            closeDrawer();
            return;
          }

          const selectedListings = allListings
            .filter((listing) => selectedListingIds.includes(listing.id))
            .map((listing) => ({
              id: listing.id,
              name: listing.name,
              image: listing.image,
            }));

          try {
            const supabase = createClient();
            const fullName = `${existing.firstName} ${existing.lastName}`.trim();

            const { error } = await supabase
              .from("team_members")
              .update({
                permissions: selectedListings,
              })
              .eq("team_owner_id", ownerId)
              .eq("email", existing.email);

            if (error) {
              setSaveError(error.message);
              return;
            }
          } catch (err) {
            setSaveError(err instanceof Error ? err.message : "Failed to update listings");
            return;
          }
          
          setMembers((prev) => {
            const updated = prev.map((member) => {
              if (member.id === memberId) {
                return {
                  ...member,
                  listings: [...selectedListings], // Створюємо новий масив
                };
              }
              return member;
            });
            return updated;
          });
          closeDrawer();
        }}
      />
      <DeleteConfirmationDrawer
        isOpen={isDeleteConfirmationDrawerOpen}
        onClose={closeDrawer}
        onDelete={async () => {
          if (currentMemberId) {
            const memberToDelete = members.find((m) => m.id === currentMemberId);
            if (!memberToDelete) return;

            try {
              setIsSavingMember(true);
              setSaveError(null);

              // Delete from database
              const supabase = createClient();
              const { error } = await supabase
                .from("team_members")
                .delete()
                .eq("team_owner_id", ownerId)
                .eq("email", memberToDelete.email);

              if (error) {
                setSaveError(error.message);
                return;
              }

              // Update local state
            setMembers((prev) => prev.filter((m) => m.id !== currentMemberId));
            closeDrawer();
            } catch (err) {
              setSaveError(err instanceof Error ? err.message : "Failed to delete member");
            } finally {
              setIsSavingMember(false);
            }
          }
        }}
      />
      <OptionsDrawer
        isOpen={isOptionsDrawerOpen}
        sortFilter={sortFilter}
        onClose={closeDrawer}
        onSortChange={(sort) => {
          setSortFilter(sort);
          closeDrawer();
        }}
      />
    </div>
  );
};

export default TeamMembersMobile;
