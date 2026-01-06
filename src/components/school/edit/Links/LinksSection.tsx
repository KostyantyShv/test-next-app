"use client";

import React, { useState } from "react";
import { LinksSectionMobile } from "./mobile/LinksSectionMobile";
import { LinksSectionDesktop } from "./desktop/LinksSectionDesktop";
import { Link } from "./types/link";
import { LINKS } from "./mock/links";
import LinkModal from "./LinkModal";

const LinksSection = () => {
  const [links, setLinks] = useState<Link[]>(LINKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });
  const MAX_LINKS = 10;

  // Sort items to show pinned first, then by order
  const sortedLinks = [...links].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
    return a.order - b.order;
  });

  const openAddLinkModal = () => {
    setCurrentEditId(null);
    setIsModalOpen(true);
  };

  const openEditLinkModal = (id: number) => {
    setCurrentEditId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
  };

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => setToast({ message: "", show: false }), 3000);
  };

  const saveLink = (
    linkData: Omit<Link, "id" | "order" | "clicks" | "pinned">
  ) => {
    if (!linkData.title || !linkData.url) {
      showToast("Please fill in Title and URL");
      return;
    }

    try {
      const parsedUrl = new URL(linkData.url);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid protocol");
      }
    } catch {
      showToast("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    if (currentEditId) {
      setLinks((prev) =>
        prev.map((link) =>
          link.id === currentEditId ? { ...link, ...linkData } : link
        )
      );
      showToast("Link updated successfully");
    } else {
      if (links.length >= MAX_LINKS) {
        showToast(`Maximum ${MAX_LINKS} links reached`);
        return;
      }
      setLinks((prev) => [
        ...prev,
        {
          ...linkData,
          id: Date.now(),
          order: prev.length,
          clicks: 0,
          pinned: false,
        },
      ]);
      showToast("Link added successfully");
    }
    closeModal();
  };

  const deleteLink = (id: number) => {
    if (confirm("Are you sure you want to delete this link?")) {
      setLinks((prev) => prev.filter((link) => link.id !== id));
      showToast("Link deleted successfully");
    }
  };

  const togglePin = (id: number) => {
    setLinks((prev) =>
      prev.map((link) => ({
        ...link,
        pinned: link.id === id ? !link.pinned : false,
      }))
    );
    showToast(
      links.find((l) => l.id === id)?.pinned ? "Link unpinned" : "Link pinned"
    );
  };

  const updateColor = (id: number, color: string) => {
    setLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, color } : link))
    );
  };

  const handleDragStart = (id: number) => {
    setDraggedItemId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, targetId: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedItemId || draggedItemId === targetId) {
      setDraggedItemId(null);
      return;
    }

    // Find indices in the sorted links array (what user sees)
    const draggedIndex = sortedLinks.findIndex((link) => link.id === draggedItemId);
    const targetIndex = sortedLinks.findIndex((link) => link.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItemId(null);
      return;
    }

    // Reorder the sorted links
    const newSortedLinks = [...sortedLinks];
    const [removed] = newSortedLinks.splice(draggedIndex, 1);
    newSortedLinks.splice(targetIndex, 0, removed);

    // Update order values based on new positions
    const updatedLinks = links.map((link) => {
      const newIndex = newSortedLinks.findIndex((sortedLink) => sortedLink.id === link.id);
      if (newIndex !== -1) {
        return { ...link, order: newIndex };
      }
      return link;
    });

    setLinks(updatedLinks);
    setDraggedItemId(null);
  };

  return (
    <>
      <div className="max-md:block hidden w-full">
        <LinkModal
          isOpen={isModalOpen}
          link={links.find((l) => l.id === currentEditId)}
          onSave={saveLink}
          onClose={closeModal}
        />
        <LinksSectionMobile
          links={links}
          setLinks={setLinks}
          onAddLink={openAddLinkModal}
          onEditLink={openEditLinkModal}
          onDeleteLink={deleteLink}
          onTogglePin={togglePin}
          draggedItemId={draggedItemId}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </div>
      <div className="max-md:hidden block w-full">
        <LinkModal
          isOpen={isModalOpen}
          link={links.find((l) => l.id === currentEditId)}
          onSave={saveLink}
          onClose={closeModal}
        />
        <LinksSectionDesktop
          links={links}
          setLinks={setLinks}
          onAddLink={openAddLinkModal}
          onEditLink={openEditLinkModal}
          onDeleteLink={deleteLink}
          onTogglePin={togglePin}
          onUpdateColor={updateColor}
          draggedItemId={draggedItemId}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        />
      </div>

      <div
        className={`fixed bottom-20 left-1/2 min-w-[280px] max-w-[calc(100%-40px)] -translate-x-1/2 rounded-lg bg-[#EBFCF4] px-4 py-3 text-sm font-medium text-[#0B6333] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 z-[2000] ${
          toast.show
            ? "translate-y-0 opacity-100"
            : "translate-y-[120%] opacity-0"
        }`}
      >
        {toast.message}
      </div>
    </>
  );
};

export default LinksSection;
