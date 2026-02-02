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
    <div className="links-section">
      <div className="section-header">
        <h2 className="section-title">Links</h2>
        <button
          className="btn btn-primary"
          onClick={onAddLink}
          type="button"
        >
          Add Link
        </button>
      </div>

      <table className="links-table">
        <thead>
          <tr>
            <th style={{ width: 40 }}></th>
            <th style={{ width: 60 }}>Icon</th>
            <th>Title</th>
            <th style={{ width: 100 }}>Color</th>
            <th style={{ width: 120 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedLinks.map((link) => (
            <tr
              key={link.id}
              className={`link-row ${link.pinned ? "pinned-link" : ""} ${
                draggedItemId === link.id ? "dragging" : ""
              }`}
              draggable
              data-id={link.id}
              onDragStart={(e) => handleDragStart(e, link.id)}
              onDragEnd={handleDragEnd}
              onDragOver={onDragOver}
              onDrop={(e) => handleDrop(e, link.id)}
            >
              <td>
                <div className="drag-handle">
                  <DragHandleIcon />
                </div>
              </td>
              <td>
                <div className="link-thumbnail">
                  <img
                    src={link.icon}
                    alt={`${link.title} icon`}
                  />
                </div>
              </td>
              <td>
                <div className="link-title">{link.title}</div>
                <div className="link-url">{link.url}</div>
                {link.pinned && (
                  <div className="pin-indicator">
                    <PinIcon />
                    Pinned
                  </div>
                )}
              </td>
              <td>
                <div className="color-cell">
                  <div className="color-dot" style={{ background: link.color }} />
                  <div className="color-picker-popup">
                    <input
                      type="color"
                      className="inline-color-picker"
                      value={link.color}
                      onChange={(e) => onUpdateColor(link.id, e.target.value)}
                      aria-label="Choose link color"
                    />
                  </div>
                </div>
              </td>
              <td>
                <div className="action-buttons">
                  <button
                    className="btn-icon"
                    onClick={() => onTogglePin(link.id)}
                    title={link.pinned ? "Unpin link" : "Pin link"}
                    type="button"
                  >
                    <PinIcon />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => onEditLink(link.id)}
                    title="Edit link"
                    type="button"
                  >
                    <EditIcon />
                  </button>
                  <button
                    className="btn-icon"
                    onClick={() => onDeleteLink(link.id)}
                    title="Delete link"
                    type="button"
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
