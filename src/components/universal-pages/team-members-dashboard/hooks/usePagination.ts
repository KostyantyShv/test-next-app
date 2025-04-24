import { useState } from "react";
import { TeamMember } from "../types";

export const usePagination = (items: TeamMember[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPageValue, setItemsPerPageValue] = useState(itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPageValue;
  const endIndex = startIndex + itemsPerPageValue;
  const displayedItems = items.slice(startIndex, endIndex);
  const totalPages = Math.ceil(items.length / itemsPerPageValue);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPageValue(value);
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }
    return pages;
  };

  return {
    currentPage,
    startIndex,
    endIndex,
    displayedItems,
    totalPages,
    handlePageChange,
    handleItemsPerPageChange,
    itemsPerPageValue,
    getPageNumbers,
  };
};
