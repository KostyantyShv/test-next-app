import { useState, useMemo, useEffect } from "react";
import { TeamMember } from "../../types";
import { teamMembers } from "../../data/teamMembers";
import { sortOptions, statusOptions } from "../../data/filter-options";

export function useTeam() {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortFilter, setSortFilter] = useState<string>("name");
  const [teamType, setTeamType] = useState<"team" | "collaborators">("team");
  const [currentMemberId, setCurrentMemberId] = useState<number | null>(null);

  const filteredMembers = useMemo(() => {
    let result = [...members];
    if (searchTerm.trim()) {
      result = result.filter(
        (member) =>
          `${member.firstName} ${member.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((member) => member.status === statusFilter);
    }
    if (teamType === "collaborators") {
      result = result.filter(
        (member) => !member.isAdmin && member.status === "accepted"
      );
    }
    result.sort((a, b) => {
      switch (sortFilter) {
        case "name":
          return `${a.firstName} ${a.lastName}`.localeCompare(
            `${b.firstName} ${b.lastName}`
          );
        case "email":
          return a.email.localeCompare(b.email);
        case "lastActive":
          try {
            const dateA = new Date(a.lastActive);
            const dateB = new Date(b.lastActive);
            return dateB.getTime() - dateA.getTime();
          } catch {
            return 0;
          }
        default:
          return 0;
      }
    });
    return result;
  }, [members, searchTerm, statusFilter, sortFilter, teamType]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredMembers.length);
  const displayedMembers = filteredMembers.slice(startIndex, endIndex);

  const filterCount = useMemo(() => {
    let count = 0;
    if (statusFilter !== "all") count++;
    if (sortFilter !== "name") count++;
    return count;
  }, [statusFilter, sortFilter]);

  const getPageNumbers = () => {
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    const pages = [];
    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }
    return pages;
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (currentPage < 1) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  return {
    members,
    setMembers,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortFilter,
    setSortFilter,
    teamType,
    setTeamType,
    currentMemberId,
    setCurrentMemberId,
    filteredMembers,
    displayedMembers,
    totalPages,
    filterCount,
    getPageNumbers,
    statusOptions,
    sortOptions,
  };
}
