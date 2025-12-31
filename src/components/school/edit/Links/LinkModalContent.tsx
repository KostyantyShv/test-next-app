"use client";
import { useState, useRef, useEffect } from "react";
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
  const modalRef = useRef<HTMLDivElement>(null);

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
    onSave({ title, url, icon: iconSrc, color: selectedColor });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <>
      <div className="p-5 border-b border-theme flex items-center justify-between">
        <h3 className="text-lg font-semibold text-dark">
          {link ? "Edit Link" : "Add New Link"}
        </h3>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-md border border-theme bg-surface text-subtle"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
      </div>
      <form className="p-6" onSubmit={handleSave}>
        <div className="mb-5">
          <label
            className="block text-sm font-medium text-dark mb-2"
            htmlFor="linkTitle"
          >
            Link Title
          </label>
          <input
            type="text"
            id="linkTitle"
            className="w-full p-2 border border-theme rounded-md text-sm text-default bg-surface focus:outline-none transition"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
            }}
            required
            placeholder="Enter link title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-sm font-medium text-dark mb-2"
            htmlFor="linkUrl"
          >
            URL
          </label>
          <input
            type="url"
            id="linkUrl"
            className="w-full p-2 border border-theme rounded-md text-sm text-default bg-surface focus:outline-none transition"
            style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
            }}
            required
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-dark mb-2">
            Background Color
          </label>
          <div className="flex flex-col gap-4">
            <div className="border-b border-theme pb-4">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(36px,1fr))] gap-2">
                {colorOptions.map((color) => (
                  <div
                    key={color}
                    className={`w-9 h-9 rounded-md cursor-pointer border-2 transition-transform ${
                      selectedColor === color
                        ? "scale-110 border-[#02C5AF]"
                        : "border-transparent"
                    } hover:scale-110`}
                    style={{ 
                      backgroundColor: color,
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Custom Color
              </label>
              <input
                type="color"
                className="w-full h-10 p-1 border border-theme rounded-md cursor-pointer"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mb-5">
          <label className="block text-sm font-medium text-dark mb-2">
            Link Icon
          </label>
          <div
            className="w-full h-[200px] rounded-lg border-2 border-dashed border-theme flex items-center justify-center cursor-pointer transition hover:border-[#02C5AF] hover:bg-[#F9FAFB]"
            onClick={() => iconInputRef.current?.click()}
          >
            <img
              src={iconSrc}
              alt="Icon preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <input
            type="file"
            ref={iconInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
        <div className="p-4 border-t border-theme flex justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-md border border-theme bg-surface text-default text-sm font-medium hover:opacity-90 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md text-white text-sm font-medium hover:opacity-90 transition"
            style={{ backgroundColor: 'var(--brand-teal)' }}
          >
            Save Link
          </button>
        </div>
      </form>
    </>
  );
};
