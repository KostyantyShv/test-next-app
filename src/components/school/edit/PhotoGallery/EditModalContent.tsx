"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Image from "next/image";
import { GalleryItem } from "./types/gallery-item";

interface Props {
  item: GalleryItem | null | undefined;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    altText: string;
    pinned: boolean;
    imageFile?: File;
  }) => void;
  onDelete: () => void;
}

export default function EditModalContent({
  item,
  onClose,
  onSubmit,
  onDelete,
}: Props) {
  const [title, setTitle] = useState(item?.title || "");
  const [altText, setAltText] = useState(item?.altText || "");
  const [pinned, setPinned] = useState(item?.pinned || false);
  const [imagePreview, setImagePreview] = useState(
    item?.image || "https://i.ibb.co/qMzqMMcg/upload-image-placeholder.png"
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Update form when item changes
    if (item) {
      setTitle(item.title);
      setAltText(item.altText);
      setPinned(item.pinned);
      setImagePreview(item.image);
    }
  }, [item]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      altText,
      pinned,
      imageFile: imageFile || undefined,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#1B1B1B]">
          {item ? "Edit Photo Details" : "Add New Photo"}
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="photoTitle"
            className="block text-[#464646] font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="photoTitle"
            className="w-full p-3 border border-[#DFDDDB] rounded-md text-[#4A4A4A]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="photoAlt"
            className="block text-[#464646] font-medium mb-2"
          >
            Alt Text
          </label>
          <input
            type="text"
            id="photoAlt"
            className="w-full p-3 border border-[#DFDDDB] rounded-md text-[#4A4A4A]"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-[#464646] font-medium mb-2">
            Thumbnail or Video
          </label>
          <div className="border border-[#DFDDDB] rounded-md overflow-hidden">
            <div className="flex items-center gap-6 p-4">
              <div className="w-[120px] h-[80px] bg-[#F7FAFC] rounded overflow-hidden flex items-center justify-center">
                <Image
                  src={imagePreview}
                  alt="Image preview"
                  width={120}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[#4F4F4F] mb-2">
                  Recommended dimensions of <strong>1280×720</strong>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#E5E5E5] rounded-full text-sm text-[#4F4F4F] hover:bg-[#F2F2F2] transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg fill="none" viewBox="0 0 48 48" width="24" height="24">
                    <rect fill="#F0F9FF" rx="24" height="48" width="48"></rect>
                    <path
                      fill="#283593"
                      d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307ZM27.6641 14.4142L30.9165 17.6667H27.9974C27.909 17.6667 27.8242 17.6315 27.7617 17.569C27.6992 17.5065 27.6641 17.4217 27.6641 17.3333V14.4142Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                  {imageFile ? "Replace File" : "Choose File"}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="photoFile"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <label className="relative inline-block w-[50px] h-6">
            <input
              type="checkbox"
              className="opacity-0 w-0 h-0"
              checked={pinned}
              onChange={(e) => setPinned(e.target.checked)}
            />
            <span
              className={`absolute cursor-pointer inset-0 rounded-full transition-all ${
                pinned ? "bg-[#0B6333]" : "bg-[#DFDDDB]"
              }`}
            >
              <span
                className={`absolute h-5 w-5 bg-white rounded-full left-0.5 bottom-0.5 transition-all ${
                  pinned ? "transform translate-x-[26px]" : ""
                }`}
              ></span>
            </span>
          </label>
          <span>Pin this image</span>
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#DFDDDB]">
          {item && (
            <button
              type="button"
              className="flex items-center gap-2 text-[#f93a37] bg-transparent border-none cursor-pointer text-sm"
              onClick={onDelete}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#f93a37"
                  d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              Delete
            </button>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-[#f8f9fa] border border-[#DFDDDB] text-[#5F5F5F] rounded-md hover:opacity-90 text-sm font-medium"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#016853] border border-[#016853] text-white rounded-md hover:opacity-90 text-sm font-medium"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
