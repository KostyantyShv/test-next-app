"use client";

import Image from "next/image";
import { useState } from "react";
import { GalleryItem as GalleryItemType } from "./types/gallery-item";

interface Props {
  item: GalleryItemType;
  onPin: (id: number) => void;
  onEdit: (id: number) => void;
  index: number;
  onDragStart: (id: number) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, id: number) => void;
}

export default function GalleryItem({ 
  item, 
  onPin, 
  onEdit, 
  index,
  onDragStart,
  onDragOver,
  onDrop
}: Props) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    onDragStart(item.id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    onDrop(e, item.id);
    setIsDragging(false);
  };

  return (
    <li
      className={`flex items-center p-4 ${
        item.pinned ? "bg-[#EBFCF4] border border-[#D7F7E9]" : "bg-[#f8f9fa]"
      } rounded-lg transition-all ${isDragging ? "opacity-40" : "opacity-100"}`}
      draggable
      data-id={item.id}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={onDragOver}
      onDrop={handleDrop}
    >
      <div className="cursor-move text-[#DFDDDB] mr-4">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
        </svg>
      </div>

      <div className="w-[100px] h-[100px] relative mr-4 rounded overflow-hidden">
        <Image
          src={item.image}
          alt={item.altText}
          className="object-cover"
          width={100}
          height={100}
        />
      </div>

      <div className="flex-1">
        <div className="text-[#464646] font-semibold mb-1">
          <span className="max-md:hidden">{item.title}</span>
          <span className="hidden max-md:inline">
            {item.title.length > 4 ? item.title.substring(0, 4) + '...' : item.title}
          </span>
        </div>
        <div className="text-[#5F5F5F] text-sm max-md:truncate max-md:max-w-[7ch]">
          <span className="max-md:hidden">{item.altText}</span>
          <span className="hidden max-md:inline">
            {item.altText.length > 7 ? item.altText.substring(0, 7) + '...' : item.altText}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="w-9 h-9 rounded-full border border-[#DFDDDB] bg-white flex items-center justify-center hover:bg-[#f8f9fa] transition-all"
          onClick={() => onPin(item.id)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M7.5 12.5L3.75 16.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M12.084 3.33398L16.6673 7.91732"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>
        <button
          className="w-9 h-9 rounded-full border border-[#DFDDDB] bg-white flex items-center justify-center hover:bg-[#f8f9fa] transition-all"
          onClick={() => onEdit(item.id)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              fill="currentColor"
              d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </li>
  );
}
