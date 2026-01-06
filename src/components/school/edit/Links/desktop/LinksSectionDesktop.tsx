"use client";
import { FC, useState } from "react";
import { DragHandleIcon, PinIcon, EditIcon, DeleteIcon } from "../Icons";
import { Link } from "../types/link";

interface LinksSectionDesktopProps {
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  onAddLink: () => void;
  onEditLink: (id: number) => void;
  onDeleteLink: (id: number) => void;
  onTogglePin: (id: number) => void;
  onUpdateColor: (id: number, color: string) => void;
  draggedItemId: number | null;
  onDragStart: (id: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: number) => void;
}

export const LinksSectionDesktop: FC<LinksSectionDesktopProps> = ({
  links,
  setLinks,
  onAddLink,
  onEditLink,
  onDeleteLink,
  onTogglePin,
  onUpdateColor,
  draggedItemId,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
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
    <div className="w-full flex-1 bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#262B3D] text-2xl font-semibold" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>Links</h2>
        <button
          className="bg-[#02C5AF] text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition"
          onClick={onAddLink}
        >
          Add Link
        </button>
      </div>
      <table className="w-full border-separate border-spacing-0 mt-6">
        <thead>
          <tr>
            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B7280] bg-[#F9FAFB] border-b border-[#E5E5E5]" style={{ width: '40px' }}></th>
            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B7280] bg-[#F9FAFB] border-b border-[#E5E5E5]" style={{ width: '60px' }}>
              Icon
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B7280] bg-[#F9FAFB] border-b border-[#E5E5E5]">
              Title
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B7280] bg-[#F9FAFB] border-b border-[#E5E5E5]" style={{ width: '100px' }}>
              Color
            </th>
            <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B7280] bg-[#F9FAFB] border-b border-[#E5E5E5]" style={{ width: '120px' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedLinks.map((link) => (
            <tr
              key={link.id}
              className={`link-row hover:bg-[#F9FAFB] transition-all duration-200 ${
                link.pinned ? "bg-[#F8F9FD] border border-[#E0E0E0]" : ""
              } ${draggedItemId === link.id ? "opacity-40" : "opacity-100"}`}
              draggable
              data-id={link.id}
              onDragStart={(e) => handleDragStart(e, link.id)}
              onDragEnd={handleDragEnd}
              onDragOver={onDragOver}
              onDrop={(e) => handleDrop(e, link.id)}
            >
              <td className="px-4 py-4 border-b border-[#E5E5E5]">
                <div className="cursor-move text-[#D1D5DB] hover:text-[#9CA3AF] transition-colors">
                  <DragHandleIcon />
                </div>
              </td>
              <td className="px-4 py-4 border-b border-[#E5E5E5]">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <img
                    src={link.icon}
                    alt={`${link.title} icon`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="px-4 py-4 border-b border-[#E5E5E5]">
                <div className="font-medium text-[#262B3D] text-sm">
                  {link.title}
                </div>
                <div className="text-[#6B7280] text-sm">{link.url}</div>
                {link.pinned && (
                  <div className="inline-flex items-center gap-1 text-xs font-medium text-[#6B7280] bg-[#F3F4F6] rounded px-3 py-1 mt-2">
                    <PinIcon />
                    Pinned
                  </div>
                )}
              </td>
              <td className="px-4 py-4 border-b border-[#E5E5E5]">
                <div className="relative color-cell group">
                  <div
                    className="w-6 h-6 rounded-md"
                    style={{ backgroundColor: link.color }}
                  ></div>
                  <div className="absolute top-full left-0 bg-white p-2 rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 mt-1">
                    <input
                      type="color"
                      className="w-[100px] h-8 p-0.5 border border-[#E5E5E5] rounded cursor-pointer"
                      value={link.color}
                      onChange={(e) => onUpdateColor(link.id, e.target.value)}
                    />
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 border-b border-[#E5E5E5]">
                <div className="flex gap-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E5E5] bg-white text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#262B3D] transition"
                    onClick={() => onTogglePin(link.id)}
                    title={link.pinned ? "Unpin link" : "Pin link"}
                  >
                    <PinIcon />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E5E5] bg-white text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#262B3D] transition"
                    onClick={() => onEditLink(link.id)}
                    title="Edit link"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E5E5] bg-white text-[#f93a37] hover:bg-[#F9FAFB] transition"
                    onClick={() => onDeleteLink(link.id)}
                    title="Delete link"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
