"use client";

import { useState } from "react";
import GalleryItem from "./GalleryItem";
import { GalleryItem as GalleryItemType } from "./types/gallery-item";
import EditModal from "./EditModal";

export default function PhotoGallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItemType[]>([
    {
      id: 1,
      title: "Palace of Versailles",
      altText: "Royal residence",
      image: "https://i.ibb.co/rG61q84s/photo1.webp",
      pinned: true,
    },
    {
      id: 2,
      title: "Musée de l'Orangerie",
      altText: "Art museum",
      image: "https://i.ibb.co/3nbtmZ0/photo2.webp",
      pinned: false,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  // Sort items to show pinned first
  const sortedItems = [...galleryItems].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  const togglePin = (id: number) => {
    const updatedItems = galleryItems.map((item) => {
      // Unpin all other items first
      if (item.id !== id) {
        return { ...item, pinned: false };
      }
      // Toggle the selected item
      return { ...item, pinned: !item.pinned };
    });

    setGalleryItems(updatedItems);
  };

  const editPhoto = (id: number) => {
    setCurrentEditId(id);
    setIsModalOpen(true);
  };

  const deletePhoto = () => {
    if (currentEditId) {
      setGalleryItems(galleryItems.filter((item) => item.id !== currentEditId));
      setIsModalOpen(false);
      setCurrentEditId(null);
    }
  };

  const handleFormSubmit = (
    formData: Omit<GalleryItemType, "id" | "image"> & { imageFile?: File }
  ) => {
    if (currentEditId) {
      // Update existing item
      setGalleryItems(
        galleryItems.map((item) => {
          if (item.id === currentEditId) {
            return {
              ...item,
              title: formData.title,
              altText: formData.altText,
              pinned: formData.pinned,
              // If we had image upload functionality, we'd handle the new image here
            };
          }
          return item;
        })
      );
    } else {
      // Add new item
      const newItem: GalleryItemType = {
        id: Date.now(),
        title: formData.title,
        altText: formData.altText,
        pinned: formData.pinned,
        image: "https://i.ibb.co/qMzqMMcg/upload-image-placeholder.png",
      };
      setGalleryItems([...galleryItems, newItem]);
    }

    setIsModalOpen(false);
    setCurrentEditId(null);
  };

  const getCurrentItem = () => {
    return currentEditId
      ? galleryItems.find((item) => item.id === currentEditId)
      : null;
  };

  return (
    <div className="w-full mx-auto flex gap-6 my-6 max-md:flex-col">
      <div className="max-w-[350px] px-6">
        <h1 className="text-2xl text-[#1a1a19] font-semibold mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
          Photo Gallery
        </h1>
        <p className="text-[#5F5F5F] text-base">
          Create and organize your image gallery. Drag to reorder, pin important
          images, and customize details for each photo.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-lg p-6 shadow-sm">
        <ul className="space-y-3">
          {sortedItems.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              onPin={togglePin}
              onEdit={editPhoto}
              index={index}
            />
          ))}
        </ul>

        <button
          className="mt-4 inline-flex items-center gap-2 px-5 py-3 bg-[#016853] text-white rounded-md font-medium hover:bg-[#015744] transition-colors"
          onClick={() => {
            setCurrentEditId(null);
            setIsModalOpen(true);
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 4V16M4 10H16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          Add Photo
        </button>

        <EditModal
          isOpen={isModalOpen}
          item={getCurrentItem()}
          onClose={() => {
            setIsModalOpen(false);
            setCurrentEditId(null);
          }}
          onSubmit={handleFormSubmit}
          onDelete={deletePhoto}
        />
      </div>
    </div>
  );
}
