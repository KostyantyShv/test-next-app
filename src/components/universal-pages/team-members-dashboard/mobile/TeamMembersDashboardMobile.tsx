"use client";
import { useState } from "react";
import { activityLogs } from "../data/activityLogs";
// import { teamMembers } from "../data/teamMembers";
import { usePagination } from "../hooks/usePagination";
import { TeamMember } from "../types";
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
// import { FiltersDrawer } from "./drawers/FiltersDrawer";

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

  const handleAddMember = (data: {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
  }) => {
    const nextId =
      members.length > 0 ? Math.max(...members.map((m) => m.id)) + 1 : 1;

    const newMember: TeamMember = {
      id: nextId,
      firstName: data.firstName || data.email.split("@")[0] || "Member",
      lastName: data.lastName || "",
      email: data.email,
      avatar: "https://via.placeholder.com/80",
      status: "pending",
      lastActive: "",
      isAdmin: data.isAdmin,
      listings: [],
    };

    setMembers((prev) => [newMember, ...prev]);
    setIsAddMemberDrawerOpen(false);
  };

  return (
    <div 
      className="h-[740px] overflow-hidden flex flex-col"
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
      {/* <FiltersDrawer
        isOpen={isFiltersDrawerOpen}
        statusFilter={statusFilter}
        sortFilter={sortFilter}
        onClose={closeDrawer}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      /> */}
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
        onClose={closeDrawer}
        onSaveChanges={() => {
          closeDrawer(); /* Placeholder */
        }}
      />
      <AssignToListingDrawer
        isOpen={isAssignToListingDrawerOpen}
        onClose={closeDrawer}
        onSave={() => {
          closeDrawer(); /* Placeholder */
        }}
      />
      <DeleteConfirmationDrawer
        isOpen={isDeleteConfirmationDrawerOpen}
        onClose={closeDrawer}
        onDelete={() => {
          if (currentMemberId) {
            setMembers((prev) => prev.filter((m) => m.id !== currentMemberId));
            closeDrawer();
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
