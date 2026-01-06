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
      order: 0,
    },
    {
      id: 2,
      title: "Musée de l'Orangerie",
      altText: "Art museum",
      image: "https://i.ibb.co/3nbtmZ0/photo2.webp",
      pinned: false,
      order: 1,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);

  // Sort items to show pinned first, then by order
  const sortedItems = [...galleryItems].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return a.pinned ? -1 : 1;
    }
    return a.order - b.order;
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
    formData: Omit<GalleryItemType, "id" | "image" | "order"> & { imageFile?: File }
  ) => {
    if (currentEditId) {
      // Update existing item
      setGalleryItems(
        galleryItems.map((item) => {
          if (item.id === currentEditId) {
            let imageUrl = item.image;
            // If new image file is provided, create preview URL
            if (formData.imageFile) {
              imageUrl = URL.createObjectURL(formData.imageFile);
            }
            return {
              ...item,
              title: formData.title,
              altText: formData.altText,
              pinned: formData.pinned,
              image: imageUrl,
            };
          }
          return item;
        })
      );
    } else {
      // Add new item
      let imageUrl = "https://i.ibb.co/qMzqMMcg/upload-image-placeholder.png";
      // If image file is provided, create preview URL
      if (formData.imageFile) {
        imageUrl = URL.createObjectURL(formData.imageFile);
      }
      const newItem: GalleryItemType = {
        id: Date.now(),
        title: formData.title,
        altText: formData.altText,
        pinned: formData.pinned,
        image: imageUrl,
        order: galleryItems.length,
      };
      setGalleryItems([...galleryItems, newItem]);
    }

    setIsModalOpen(false);
    setCurrentEditId(null);
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

    // Find indices in the sorted items array (what user sees)
    const draggedIndex = sortedItems.findIndex((item) => item.id === draggedItemId);
    const targetIndex = sortedItems.findIndex((item) => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItemId(null);
      return;
    }

    // Reorder the sorted items
    const newSortedItems = [...sortedItems];
    const [removed] = newSortedItems.splice(draggedIndex, 1);
    newSortedItems.splice(targetIndex, 0, removed);

    // Update order values based on new positions
    const updatedItems = galleryItems.map((item) => {
      const newIndex = newSortedItems.findIndex((sortedItem) => sortedItem.id === item.id);
      if (newIndex !== -1) {
        return { ...item, order: newIndex };
      }
      return item;
    });

    setGalleryItems(updatedItems);
    setDraggedItemId(null);
  };

  const getCurrentItem = () => {
    return currentEditId
      ? galleryItems.find((item) => item.id === currentEditId)
      : null;
  };

  return (
    <div className="w-full mx-auto flex gap-6 my-6 max-md:my-0 max-md:flex-col max-md:px-4">
      {/* Desktop Header */}
      <div className="max-w-[350px] max-md:hidden pr-6">
        <h1 className="text-2xl text-[#1a1a19] font-semibold mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
          Photo Gallery
        </h1>
        <p className="text-[#5F5F5F] text-base w-[350px]">
          Create and organize your image gallery. Drag to reorder, pin important
          images, and customize details for each photo.
        </p>
      </div>
      
      {/* Mobile Header */}
      <div className="hidden max-md:block pt-[18px] pb-4">
        <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: 'var(--bold-text)' }}>
          Photo Gallery
        </h1>
        <p className="text-sm leading-6" style={{ color: 'var(--subtle-text)' }}>
          Create and organize your image gallery. Drag to reorder, pin important
          images, and customize details for each photo.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white max-md:bg-white rounded-lg p-6 max-md:p-4 shadow-sm max-md:shadow-none">
        <ul className="space-y-3">
          {sortedItems.map((item, index) => (
            <GalleryItem
              key={item.id}
              item={item}
              onPin={togglePin}
              onEdit={editPhoto}
              index={index}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </ul>

        <button
          className="mt-4 max-md:mt-4 inline-flex max-md:w-full max-md:justify-center items-center gap-2 px-5 py-3 max-md:py-3 max-md:px-5 bg-[#016853] text-white rounded-md font-medium hover:bg-[#015744] max-md:active:bg-[#015744] transition-colors"
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
