"use client";
import { FC, useState } from "react";
import { PinIcon, EditIcon, DeleteIcon, DragHandleIcon } from "../Icons";
import { Link } from "../types/link";

interface LinksSectionMobileProps {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  onAddLink: () => void;
  onEditLink: (id: number) => void;
  onDeleteLink: (id: number) => void;
  onTogglePin: (id: number) => void;
  draggedItemId: number | null;
  onDragStart: (id: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: number) => void;
}

export const LinksSectionMobile: FC<LinksSectionMobileProps> = ({
  links,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onTogglePin,
  draggedItemId,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const MAX_LINKS = 10;
  const [isDragging, setIsDragging] = useState(false);

  const sortedLinks = [...links].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
    return a.order - b.order;
  });

  const handleDragStart = (e: React.DragEvent, linkId: number) => {
    setIsDragging(true);
    onDragStart(linkId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, linkId: number) => {
    onDrop(e, linkId);
    setIsDragging(false);
  };

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="px-6 pb-6">
        <h1 className="mb-2 text-2xl font-semibold text-[#1B1B1B]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
          Links in Bio
        </h1>
        <p className="text-sm leading-5 text-[#5F5F5F]">
          Add and manage your important links below.
        </p>
      </div>
      <div className="mb-4 flex flex-1 flex-col rounded-xl bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
        <div className="mb-4 text-xs font-medium text-[#5F5F5F]">
          {links.length}/{MAX_LINKS} Links
        </div>
        <div className="mb-4 flex flex-1 flex-col gap-3 overflow-y-auto">
          {sortedLinks.map((link) => (
            <div
              key={link.id}
              className={`link-item flex items-center rounded-lg border-l-4 p-3 transition-all ${
                link.pinned
                  ? "border-l-[#02C5AF] bg-[#F8F9FD]"
                  : "border-l-transparent bg-[#EDF2F7]"
              } ${draggedItemId === link.id ? "opacity-40" : "opacity-100"}`}
              style={{ backgroundColor: link.color }}
              draggable
              data-id={link.id}
              onDragStart={(e) => handleDragStart(e, link.id)}
              onDragEnd={handleDragEnd}
              onDragOver={onDragOver}
              onDrop={(e) => handleDrop(e, link.id)}
            >
              <div className="cursor-move mr-2 text-[#D1D5DB]">
                <DragHandleIcon />
              </div>
              <div className="mr-3 h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={link.icon}
                  alt={`${link.title} icon`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-1 truncate text-sm font-semibold text-[#262B3D]">
                  {link.title}
                </div>
                <div className="mb-1 truncate text-xs text-[#5F5F5F]">
                  {link.url}
                </div>
                {link.pinned && (
                  <div className="mt-1 inline-flex items-center gap-1 rounded bg-[#F3F4F6] px-1.5 py-0.5 text-xs font-medium text-[#5F5F5F]">
                    <PinIcon />
                    Pinned
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#5F5F5F] transition hover:bg-[#F3F4F6] hover:text-[#1B1B1B]"
                  onClick={() => onTogglePin(link.id)}
                  title={link.pinned ? "Unpin link" : "Pin link"}
                >
                  <PinIcon />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#5F5F5F] transition hover:bg-[#F3F4F6] hover:text-[#1B1B1B]"
                  onClick={() => onEditLink(link.id)}
                  title="Edit link"
                >
                  <EditIcon />
                </button>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E5E5] bg-white text-[#f93a37] transition hover:bg-[#F3F4F6]"
                  onClick={() => onDeleteLink(link.id)}
                  title="Delete link"
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1B1B1B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2D2D2D]"
          onClick={onAddLink}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="none"
            className="text-white"
          >
            <path
              d="M10 4V16M4 10H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Link
        </button>
      </div>
    </div>
  );
};
