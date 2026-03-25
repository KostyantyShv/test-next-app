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
    <div className="flex flex-1 flex-col overflow-hidden max-md:px-3">
      <div className="py-6">
        <h1 className="mb-2 text-2xl font-semibold text-[var(--bold-text)]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
          Links in Bio
        </h1>
        <p className="text-sm leading-5 text-[var(--subtle-text)]">
          Add and manage your important links below.
        </p>
      </div>
      <div
        className="mb-4 flex flex-1 flex-col rounded-xl p-4"
        style={{
          backgroundColor: "var(--surface-color)",
          boxShadow: "0 1px 3px var(--shadow-color)",
        }}
      >
        <div className="mb-4 text-xs font-medium text-[var(--subtle-text)]">
          {links.length}/{MAX_LINKS} Links
        </div>
        <div className="mb-4 flex flex-1 flex-col gap-3 overflow-y-auto">
          {sortedLinks.map((link) => (
            <div
              key={link.id}
              className={`link-item flex items-center rounded-lg border-l-4 p-3 transition-all ${
                link.pinned
                  ? "border-l-[var(--header-green)]"
                  : "border-l-transparent"
              } ${draggedItemId === link.id ? "opacity-40" : "opacity-100"}`}
              style={{ backgroundColor: link.color }}
              draggable
              data-id={link.id}
              onDragStart={(e) => handleDragStart(e, link.id)}
              onDragEnd={handleDragEnd}
              onDragOver={onDragOver}
              onDrop={(e) => handleDrop(e, link.id)}
            >
              <div className="cursor-move mr-2 text-[var(--subtle-text)] opacity-70">
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
                <div className="mb-1 truncate text-sm font-semibold text-[var(--bold-text)]">
                  {link.title}
                </div>
                <div className="mb-1 truncate text-xs text-[var(--subtle-text)]">
                  {link.url.length > 10 ? link.url.substring(0, 10) + '...' : link.url}
                </div>
                {link.pinned && (
                  <div className="mt-1 inline-flex items-center gap-1 rounded bg-[var(--apply-button-bg)] px-1.5 py-0.5 text-xs font-medium text-[var(--subtle-text)]">
                    <PinIcon />
                    Pinned
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface-secondary)] text-[var(--text-default)] transition hover:bg-[var(--hover-bg)]"
                  onClick={() => onTogglePin(link.id)}
                  title={link.pinned ? "Unpin link" : "Pin link"}
                >
                  <PinIcon />
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface-secondary)] text-[var(--text-default)] transition hover:bg-[var(--hover-bg)]"
                  onClick={() => onEditLink(link.id)}
                  title="Edit link"
                >
                  <EditIcon />
                </button>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--surface-secondary)] text-[var(--error-color)] transition hover:bg-[var(--hover-bg)]"
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
          type="button"
          className="flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          style={{ backgroundColor: "var(--btn-primary-bg)" }}
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
