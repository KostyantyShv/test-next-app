"use client";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "./Icons";
import { Link } from "./types/link";

interface LinkModalProps {
  link?: Link;
  onSave: (data: Omit<Link, "id" | "order" | "clicks" | "pinned">) => void;
  onClose: () => void;
}

export const LinkModalContent = ({ link, onSave, onClose }: LinkModalProps) => {
  const [title, setTitle] = useState(link?.title || "");
  const [url, setUrl] = useState(link?.url || "");
  const [iconSrc, setIconSrc] = useState(
    link?.icon || "/api/placeholder/96/96"
  );
  const [selectedColor, setSelectedColor] = useState(link?.color || "#EDF2F7");
  const iconInputRef = useRef<HTMLInputElement>(null);

  const colorOptions = [
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setIconSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url) {
      alert("Please fill in all required fields");
      return;
    }
    // Validate URL
    try {
      const parsedUrl = new URL(url);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        alert("Please enter a valid URL (must start with http:// or https://)");
        return;
      }
    } catch {
      alert("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    onSave({ title, url, icon: iconSrc, color: selectedColor });
  };

  // Reset form when link changes (for add vs edit)
  useEffect(() => {
    if (link) {
      setTitle(link.title);
      setUrl(link.url);
      setIconSrc(link.icon);
      setSelectedColor(link.color);
    } else {
      // Reset to default values for new link
      setTitle("");
      setUrl("");
      setIconSrc("/api/placeholder/96/96");
      setSelectedColor("#EDF2F7");
    }
  }, [link]);

  return (
    <>
      <div className="modal-header">
        <h3 className="modal-title" id="modalTitle">
          {link ? "Edit Link" : "Add New Link"}
        </h3>
        <button
          className="btn-icon"
          type="button"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      </div>

      <form id="linkForm" className="modal-body" onSubmit={handleSave}>
        <div className="form-group">
          <label className="form-label" htmlFor="linkTitle">
            Link Title
          </label>
          <input
            type="text"
            id="linkTitle"
            className="form-control"
            required
            placeholder="Enter link title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="linkUrl">
            URL
          </label>
          <input
            type="url"
            id="linkUrl"
            className="form-control"
            required
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Background Color</label>
          <div className="color-selector">
            <div className="color-presets">
              <div className="color-options">
                {colorOptions.map((color) => (
                  <div
                    key={color}
                    className={`color-option ${
                      selectedColor === color ? "active" : ""
                    }`}
                    style={{ background: color }}
                    data-color={color}
                    onClick={() => setSelectedColor(color)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Select color ${color}`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedColor(color);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="custom-color">
              <label className="form-label">Custom Color</label>
              <input
                type="color"
                className="color-picker-input"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Link Icon</label>
          <div
            className="upload-preview"
            id="iconPreview"
            onClick={() => iconInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload icon"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                iconInputRef.current?.click();
              }
            }}
          >
            <img src={iconSrc} alt="Icon preview" />
          </div>
          <input
            type="file"
            ref={iconInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
      </form>

      <div className="modal-footer">
        <button className="btn btn-secondary" type="button" onClick={onClose}>
          Cancel
        </button>
        <button className="btn btn-primary" type="submit" form="linkForm">
          Save Link
        </button>
      </div>
    </>
  );
};
