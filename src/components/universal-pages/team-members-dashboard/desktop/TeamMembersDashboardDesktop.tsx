"use client";
import React, { useState } from "react";
import Modal from "./modals/Modal";
import AddMemberModal from "./modals/AddMemberModal";
import EditMemberModal from "./modals/EditMemberModal";
import DeleteConfirmationModal from "./modals/DeleteConfirmationModal";
import ActivityLogModal from "./modals/ActivityLogModal";
import { teamMembers } from "../data/teamMembers";
import { TeamMember } from "../types";
import { Checkbox } from "../Checkbox";
import { FilterDropdown } from "./FilterDropdown";
import { ItemsPerPageDropdown } from "../ItemsPerPageDropdown";
import { MemberRow } from "./MemberRow";
import { Pagination } from "./Pagination";
import {
  bulkActionOptions,
  sortOptions,
  statusOptions,
} from "../data/filter-options";
import { usePagination } from "../hooks/usePagination";

// Main component
const TeamMembersDashboardDesktop: React.FC = () => {
  // State
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<string>("name");
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [selectedMemberIds, setSelectedMemberIds] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Filters and sorting
  const filterMembers = () => {
    let filtered = [...members];
    if (statusFilter !== "all") {
      filtered = filtered.filter((member) => member.status === statusFilter);
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

  // Pagination
  const {
    currentPage,
    startIndex,
    endIndex,
    displayedItems: displayedMembers,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    itemsPerPageValue,
    getPageNumbers,
  } = usePagination(filteredMembers, 10);

  // Event handlers
  const toggleDropdown = (memberId: number) => {
    setIsDropdownOpen((prev) => (prev === memberId ? null : memberId));
  };

  const handleDelete = (memberId: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
    setSelectedMemberIds((prev) => prev.filter((id) => id !== memberId));
    closeModal();
  };

  const handleBulkAction = (action: string) => {
    if (action === "delete" && selectedMemberIds.length > 0) {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedMemberIds.length} member(s)?`
        )
      ) {
        setMembers((prev) =>
          prev.filter((member) => !selectedMemberIds.includes(member.id))
        );
        setSelectedMemberIds([]);
      }
    }
  };

  const handleMemberSelection = (memberId: number, isSelected: boolean) => {
    if (isSelected) {
      setSelectedMemberIds((prev) => [...prev, memberId]);
    } else {
      setSelectedMemberIds((prev) => prev.filter((id) => id !== memberId));
    }
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedMemberIds(displayedMembers.map((member) => member.id));
    } else {
      setSelectedMemberIds([]);
    }
  };

  // Modal handlers
  const openModal = (type: string, memberId?: number) => {
    if (memberId) setSelectedMemberId(memberId);
    if (type === "add") setIsAddModalOpen(true);
    if (type === "edit") setIsEditModalOpen(true);
    if (type === "delete") setIsDeleteModalOpen(true);
    if (type === "activity") setIsActivityModalOpen(true);
  };

  const closeModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsActivityModalOpen(false);
    setSelectedMemberId(null);
  };

  return (
    <div className="max-w-[1055px] mx-auto bg-white rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.1)] p-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b-2 border-gray-200">
        <div className="top-nav-tab py-3 px-4 text-base font-medium text-[#0B6333] border-b-2 border-[#0B6333] cursor-pointer">
          Team
        </div>
      </div>

      {/* Header */}
      <div className="header flex justify-between items-center mb-6 px-2">
        <h1 className="text-2xl font-semibold text-[#464646]">Team Members</h1>
        <button
          onClick={() => openModal("add")}
          className="bg-[#1B1B1B] text-white py-2.5 px-5 rounded-lg font-medium text-sm hover:bg-[#016853] transition-colors"
        >
          Add Member
        </button>
      </div>

      {/* Filters */}
      <div className="filters flex justify-between px-2 mb-6">
        <div className="flex gap-4">
          <FilterDropdown
            value={statusFilter}
            options={statusOptions}
            onChange={setStatusFilter}
          />

          <FilterDropdown
            value={sortFilter}
            options={sortOptions}
            onChange={setSortFilter}
          />
        </div>

        <FilterDropdown
          value=""
          options={bulkActionOptions}
          onChange={handleBulkAction}
        />
      </div>

      {/* Table */}
      <table className="members-table w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="w-10 p-3 text-left text-xs font-medium text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              <Checkbox
                checked={
                  selectedMemberIds.length === displayedMembers.length &&
                  displayedMembers.length > 0
                }
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </th>
            <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              NAME
            </th>
            <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              STATUS
            </th>
            <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              LAST ACTIVE
            </th>
            <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              ACTIVITY LOG
            </th>
            <th className="p-3 text-left text-xs font-medium text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {displayedMembers.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              isSelected={selectedMemberIds.includes(member.id)}
              onToggleSelect={handleMemberSelection}
              onManageClick={toggleDropdown}
              isDropdownOpen={isDropdownOpen}
              openModal={openModal}
            />
          ))}
        </tbody>
      </table>

      {/* Footer with pagination */}
      <div className="footer flex justify-between items-center p-4 mt-6">
        <div className="footer-left flex items-center gap-6">
          <div className="footer-text text-sm text-gray-500">
            Showing{" "}
            <strong>
              {startIndex + 1}-{Math.min(endIndex, filteredMembers.length)}
            </strong>{" "}
            of <strong>{filteredMembers.length}</strong> users
          </div>

          <ItemsPerPageDropdown
            value={itemsPerPageValue}
            onChange={handleItemsPerPageChange}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          getPageNumbers={getPageNumbers}
        />
      </div>

      {/* Modals */}
      <Modal
        isOpen={
          isAddModalOpen ||
          isEditModalOpen ||
          isDeleteModalOpen ||
          isActivityModalOpen
        }
        onClose={closeModal}
      >
        {isAddModalOpen && <AddMemberModal onClose={closeModal} />}
        {isEditModalOpen && selectedMemberId && (
          <EditMemberModal memberId={selectedMemberId} onClose={closeModal} />
        )}
        {isDeleteModalOpen && selectedMemberId && (
          <DeleteConfirmationModal
            memberId={selectedMemberId}
            onClose={closeModal}
            onDelete={handleDelete}
          />
        )}
        {isActivityModalOpen && selectedMemberId && (
          <ActivityLogModal memberId={selectedMemberId} onClose={closeModal} />
        )}
      </Modal>
    </div>
  );
};

export default TeamMembersDashboardDesktop;
