"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useMemo, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { LinksSectionDesktop } from "./desktop/LinksSectionDesktop";
import { Link } from "./types/link";
import { LINKS } from "./mock/links";
import LinkModal from "./LinkModal";

const MAX_LINKS = 10;
const DEFAULT_ICON = "https://i.ibb.co/Qvxq27v5/favicon1.png";
const PRESET_COLORS = [
  "#EDF2F7",
  "#FED7D7",
  "#FEEBC8",
  "#C6F6D5",
  "#BEE3F8",
  "#E9D8FD",
  "#FED7E2",
  "#FBB6CE",
  "#B2F5EA",
  "#90CDF4",
  "#D6BCFA",
  "#F687B3",
];

const LinksSection = () => {
  const isMobile = useIsMobile();

  const [links, setLinks] = useState<Link[]>(LINKS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileTitle, setMobileTitle] = useState("");
  const [mobileUrl, setMobileUrl] = useState("");
  const [mobileIcon, setMobileIcon] = useState(DEFAULT_ICON);
  const [mobileColor, setMobileColor] = useState(PRESET_COLORS[0]);

  const iconInputRef = useRef<HTMLInputElement>(null);

  const sortedLinks = useMemo(() => {
    return [...links].sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      return a.order - b.order;
    });
  }, [links]);

  const openAddLinkModal = () => {
    if (isMobile) {
      setCurrentEditId(null);
      setMobileTitle("");
      setMobileUrl("");
      setMobileIcon(DEFAULT_ICON);
      setMobileColor(PRESET_COLORS[0]);
      setMobileDrawerOpen(true);
      return;
    }

    setCurrentEditId(null);
    setIsModalOpen(true);
  };

  const openEditLinkModal = (id: number) => {
    if (isMobile) {
      const link = links.find((item) => item.id === id);
      if (!link) return;
      setCurrentEditId(id);
      setMobileTitle(link.title);
      setMobileUrl(link.url);
      setMobileIcon(link.icon || DEFAULT_ICON);
      setMobileColor(link.color || PRESET_COLORS[0]);
      setMobileDrawerOpen(true);
      return;
    }

    setCurrentEditId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
  };

  const closeMobileDrawer = () => {
    setMobileDrawerOpen(false);
    setCurrentEditId(null);
    setMobileTitle("");
    setMobileUrl("");
    setMobileIcon(DEFAULT_ICON);
    setMobileColor(PRESET_COLORS[0]);
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
      if (!parsedUrl.protocol.startsWith("http")) {
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

  const saveMobileLink = () => {
    const title = mobileTitle.trim();
    const url = mobileUrl.trim();
    const icon = mobileIcon || DEFAULT_ICON;
    const color = mobileColor;

    if (!title || !url) {
      showToast("Please fill in Title and URL");
      return;
    }

    try {
      const parsedUrl = new URL(url);
      if (!parsedUrl.protocol.startsWith("http")) {
        throw new Error("Invalid protocol");
      }
    } catch {
      showToast("Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    if (currentEditId) {
      setLinks((prev) =>
        prev.map((link) =>
          link.id === currentEditId ? { ...link, title, url, icon, color } : link
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
          id: Date.now(),
          title,
          url,
          icon,
          color,
          clicks: 0,
          pinned: false,
          order: prev.length,
        },
      ]);
      showToast("Link added successfully");
    }

    closeMobileDrawer();
  };

  const deleteLink = (id: number) => {
    if (confirm("Are you sure you want to delete this link?")) {
      setLinks((prev) => prev.filter((link) => link.id !== id));
      showToast("Link deleted successfully");
    }
  };

  const togglePin = (id: number) => {
    const target = links.find((item) => item.id === id);
    const willBePinned = !target?.pinned;

    setLinks((prev) =>
      prev.map((link) => ({
        ...link,
        pinned: link.id === id ? !link.pinned : false,
      }))
    );

    showToast(willBePinned ? "Link pinned" : "Link unpinned");
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

    const draggedIndex = sortedLinks.findIndex((link) => link.id === draggedItemId);
    const targetIndex = sortedLinks.findIndex((link) => link.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItemId(null);
      return;
    }

    const newSortedLinks = [...sortedLinks];
    const [removed] = newSortedLinks.splice(draggedIndex, 1);
    newSortedLinks.splice(targetIndex, 0, removed);

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

  const onMobileIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select an image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        setMobileIcon(result);
      }
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <>
      {!isMobile && (
        <LinkModal
          isOpen={isModalOpen}
          link={links.find((l) => l.id === currentEditId)}
          onSave={saveLink}
          onClose={closeModal}
        />
      )}

      <div className="max-md:hidden block w-full h-full">
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

      <div className="hidden max-md:block w-full">
        <div className="px-4 pt-4">
          <h1 className="mb-2 text-2xl font-semibold text-[#1B1B1B]">Links in Bio</h1>
          <p className="text-sm leading-[1.5] text-[#5F5F5F]">Add and manage your important links below.</p>
        </div>

        <div className="mx-4 mb-4 mt-4 flex min-h-0 flex-1 flex-col rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <div className="mb-4 text-xs font-medium text-[#5F5F5F]">{links.length}/{MAX_LINKS} Links</div>

          <div className="mb-4 flex flex-1 flex-col gap-3 overflow-y-auto">
            {sortedLinks.map((link) => (
              <div
                key={link.id}
                className="relative flex items-center rounded-lg border-l-[3px] p-3"
                style={{
                  backgroundColor: link.color || PRESET_COLORS[0],
                  borderLeftColor: link.pinned ? "#02C5AF" : "transparent",
                }}
              >
                <div className="mr-3 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-[#E5E7EB]">
                  <img
                    src={link.icon || DEFAULT_ICON}
                    alt={`${link.title} icon`}
                    className="h-full w-full object-cover"
                    onError={(ev) => {
                      (ev.target as HTMLImageElement).src = DEFAULT_ICON;
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 truncate text-sm font-semibold text-[#262B3D]">{link.title}</div>
                  <div className="mb-1 truncate text-xs text-[#5F5F5F]">{link.url}</div>
                  {link.pinned && (
                    <div className="mt-1 inline-flex items-center gap-1 rounded bg-[#F3F4F6] px-1.5 py-0.5 text-[10px] font-medium text-[#5F5F5F]">
                      <svg viewBox="0 0 20 20" fill="none" className="h-[10px] w-[10px]">
                        <path d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M7.5 12.5L3.75 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M12.084 3.33398L16.6673 7.91732" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                      Pinned
                    </div>
                  )}
                </div>

                <div className="ml-2 flex gap-2">
                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#5F5F5F]"
                    onClick={() => togglePin(link.id)}
                    title={link.pinned ? "Unpin link" : "Pin link"}
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                      <path d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M7.5 12.5L3.75 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      <path d="M12.084 3.33398L16.6673 7.91732" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#5F5F5F]"
                    onClick={() => openEditLinkModal(link.id)}
                    title="Edit link"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path fill="currentColor" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#f93a37]"
                    onClick={() => deleteLink(link.id)}
                    title="Delete link"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                      <path fill="currentColor" d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z" clipRule="evenodd" fillRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1B1B1B] px-4 py-2.5 text-sm font-medium text-white" onClick={openAddLinkModal}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Add Link
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[1000] bg-black/50 transition-all duration-300 md:hidden ${
          mobileDrawerOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={closeMobileDrawer}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 z-[1001] mx-auto flex max-h-[90%] w-full max-w-[358px] translate-y-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 md:hidden ${
          mobileDrawerOpen ? "translate-y-0" : ""
        }`}
      >
        <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-[#E5E5E5] bg-white px-5 py-4">
          <h3 className="text-[18px] font-semibold text-[#1B1B1B]">{currentEditId ? "Edit Link" : "Add New Link"}</h3>
          <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent text-[#5F5F5F]" onClick={closeMobileDrawer}>
            <svg fill="none" viewBox="0 0 12 12" width="12" height="12">
              <path fill="currentColor" d="M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z"></path>
            </svg>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-5 py-4">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#1B1B1B]">Link Title</label>
            <input
              type="text"
              className="w-full rounded-lg border border-[#E5E5E5] px-3 py-3 text-sm text-[#4A4A4A]"
              placeholder="Enter link title"
              value={mobileTitle}
              onChange={(e) => setMobileTitle(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#1B1B1B]">URL</label>
            <input
              type="url"
              className="w-full rounded-lg border border-[#E5E5E5] px-3 py-3 text-sm text-[#4A4A4A]"
              placeholder="https://example.com"
              value={mobileUrl}
              onChange={(e) => setMobileUrl(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#1B1B1B]">Link Icon</label>
            <div
              className="flex h-[72px] w-[72px] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#E5E5E5] bg-[#F3F4F6]"
              onClick={() => iconInputRef.current?.click()}
            >
              <img src={mobileIcon || DEFAULT_ICON} alt="Icon preview" className="h-full w-full object-cover" />
            </div>
            <input ref={iconInputRef} type="file" accept="image/*" className="hidden" onChange={onMobileIconChange} />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-[#1B1B1B]">Background Color</label>
            <div className="mt-2 grid grid-cols-6 gap-3">
              {PRESET_COLORS.map((color) => {
                const active = color.toUpperCase() === mobileColor.toUpperCase();
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setMobileColor(color)}
                    className={`relative h-9 w-9 rounded-lg border-2 ${active ? "border-[#1D77BD]" : "border-transparent"}`}
                    style={{ backgroundColor: color }}
                  >
                    {active && <span className="absolute inset-0 flex items-center justify-center text-base font-bold text-[#1D77BD]">✔</span>}
                  </button>
                );
              })}
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-[#1B1B1B]">Custom Color</label>
              <input
                type="color"
                className="h-10 w-full cursor-pointer rounded-lg border border-[#E5E5E5] p-1"
                value={mobileColor}
                onChange={(e) => setMobileColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 border-t border-[#E5E5E5] bg-white px-5 py-4">
          <button type="button" className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#E5E5E5] bg-[#F3F4F6] px-4 py-[10px] text-sm font-medium text-[#4A4A4A]" onClick={closeMobileDrawer}>
            Cancel
          </button>
          <button type="button" className="inline-flex flex-1 items-center justify-center rounded-lg bg-[#1B1B1B] px-4 py-[10px] text-sm font-medium text-white" onClick={saveMobileLink}>
            Save Link
          </button>
        </div>
      </div>

      <div
        className={`fixed bottom-20 left-1/2 min-w-[280px] max-w-[calc(100%-40px)] -translate-x-1/2 rounded-lg bg-[#EBFCF4] px-4 py-3 text-sm font-medium text-[#0B6333] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 z-[2000] ${
          toast.show ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
        }`}
      >
        {toast.message}
      </div>
    </>
  );
};

export default LinksSection;
