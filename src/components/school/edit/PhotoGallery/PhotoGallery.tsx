"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useIsMobile } from "@/hooks/useIsMobile";
import GalleryItem from "./GalleryItem";
import { GalleryItem as GalleryItemType } from "./types/gallery-item";
import EditModal from "./EditModal";

interface GalleryFormState {
  title: string;
  altText: string;
  pinned: boolean;
  imageFile?: File;
  imagePreview: string;
}

const DEFAULT_PREVIEW = "https://i.ibb.co/qMzqMMcg/upload-image-placeholder.png";

const initialMobileForm: GalleryFormState = {
  title: "",
  altText: "",
  pinned: false,
  imagePreview: DEFAULT_PREVIEW,
};

export default function PhotoGallery() {
  const isMobile = useIsMobile();

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
  const [touchDraggedItemId, setTouchDraggedItemId] = useState<number | null>(null);
  const [mobileForm, setMobileForm] = useState<GalleryFormState>(initialMobileForm);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const sortedItems = useMemo(() => {
    return [...galleryItems].sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      return a.order - b.order;
    });
  }, [galleryItems]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showFeedbackToast = (message: string) => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToastMessage(message);
    setShowToast(true);
    toastTimerRef.current = setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const getCurrentItem = () => {
    return currentEditId
      ? galleryItems.find((item) => item.id === currentEditId)
      : null;
  };

  const togglePin = (id: number) => {
    const updatedItems = galleryItems.map((item) => {
      if (item.id !== id) {
        return { ...item, pinned: false };
      }
      return { ...item, pinned: !item.pinned };
    });

    setGalleryItems(updatedItems);
    showFeedbackToast("Photo pin status updated");
  };

  const editPhoto = (id: number) => {
    setCurrentEditId(id);

    if (isMobile) {
      const item = galleryItems.find((entry) => entry.id === id);
      if (!item) return;

      setMobileForm({
        title: item.title,
        altText: item.altText,
        pinned: item.pinned,
        imagePreview: item.image,
      });
    }

    setIsModalOpen(true);
  };

  const deletePhoto = () => {
    if (!currentEditId) return;

    setGalleryItems(galleryItems.filter((item) => item.id !== currentEditId));
    setIsModalOpen(false);
    setCurrentEditId(null);

    if (isMobile) {
      setMobileForm(initialMobileForm);
      showFeedbackToast("Photo deleted successfully");
    }
  };

  const handleFormSubmit = (
    formData: Omit<GalleryItemType, "id" | "image" | "order"> & { imageFile?: File }
  ) => {
    if (currentEditId) {
      setGalleryItems(
        galleryItems.map((item) => {
          if (item.id === currentEditId) {
            let imageUrl = item.image;
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
          return formData.pinned ? { ...item, pinned: false } : item;
        })
      );
    } else {
      let imageUrl = DEFAULT_PREVIEW;
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

      const baseItems = formData.pinned
        ? galleryItems.map((item) => ({ ...item, pinned: false }))
        : galleryItems;

      setGalleryItems([...baseItems, newItem]);
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

    reorderItems(draggedItemId, targetId, true);
    setDraggedItemId(null);
  };

  const reorderItems = (
    sourceId: number | null,
    targetId: number,
    showToastOnMobile = false
  ) => {
    if (!sourceId || sourceId === targetId) return;

    const draggedIndex = sortedItems.findIndex((item) => item.id === sourceId);
    const targetIndex = sortedItems.findIndex((item) => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }

    const newSortedItems = [...sortedItems];
    const [removed] = newSortedItems.splice(draggedIndex, 1);
    newSortedItems.splice(targetIndex, 0, removed);

    const updatedItems = galleryItems.map((item) => {
      const newIndex = newSortedItems.findIndex((sortedItem) => sortedItem.id === item.id);
      if (newIndex !== -1) {
        return { ...item, order: newIndex };
      }
      return item;
    });

    setGalleryItems(updatedItems);
    if (isMobile && showToastOnMobile) {
      showFeedbackToast("Gallery order updated");
    }
  };

  const openMobileCreateDrawer = () => {
    setCurrentEditId(null);
    setMobileForm(initialMobileForm);
    setIsModalOpen(true);
  };

  const closeMobileDrawer = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
    setMobileForm(initialMobileForm);
  };

  const handleMobileFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const result = loadEvent.target?.result;
      if (typeof result !== "string") return;

      setMobileForm((prev) => ({
        ...prev,
        imageFile: file,
        imagePreview: result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleMobileSave = () => {
    if (!mobileForm.title.trim() || !mobileForm.altText.trim()) {
      showFeedbackToast("Please fill in all required fields");
      return;
    }

    handleFormSubmit({
      title: mobileForm.title.trim(),
      altText: mobileForm.altText.trim(),
      pinned: mobileForm.pinned,
      imageFile: mobileForm.imageFile,
    });

    setMobileForm(initialMobileForm);
    showFeedbackToast(currentEditId ? "Photo updated successfully" : "Photo added successfully");
  };

  if (isMobile) {
    return (
      <>
        <div
          style={{
            backgroundColor: "#E1E7EE",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          <div className="flex flex-col p-4">
            <div className="mb-4">
              <h1 className="mb-2 text-2xl font-semibold text-[#1B1B1B]">Photo Gallery</h1>
              <p className="text-sm leading-[1.5] text-[#5F5F5F]">
                Create and organize your image gallery. Drag to reorder, pin important images,
                and customize details for each photo.
              </p>
            </div>

            <div
              className="flex flex-1 flex-col rounded-lg bg-white p-4"
              style={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
            >
              <ul className="mb-4 list-none">
                {sortedItems.map((item) => (
                  <li
                    key={item.id}
                    className={`mb-3 flex items-center rounded-lg p-3 transition-all ${
                      item.pinned
                        ? "border border-[#D7F7E9] bg-[#EBFCF4]"
                        : "bg-[#F8F9FA]"
                    } ${touchDraggedItemId === item.id ? "opacity-50" : "opacity-100"}`}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, item.id)}
                    onTouchMove={() => reorderItems(touchDraggedItemId, item.id)}
                    onTouchEnd={() => setTouchDraggedItemId(null)}
                  >
                    <div
                      className="mr-3 cursor-grab text-[#DFDDDB]"
                      onTouchStart={() => setTouchDraggedItemId(item.id)}
                    >
                      <svg viewBox="0 0 24 24" className="h-5 w-5">
                        <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2m-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"></path>
                      </svg>
                    </div>

                    <Image
                      src={item.image}
                      alt={item.altText}
                      width={70}
                      height={70}
                      className="mr-3 h-[70px] w-[70px] rounded object-cover"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 truncate text-sm font-semibold text-[#464646]">{item.title}</div>
                      <div className="truncate text-xs text-[#5F5F5F]">{item.altText}</div>
                    </div>

                    <div className="ml-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => togglePin(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DFDDDB] bg-white"
                        aria-label="Pin photo"
                      >
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-[#5F5F5F]">
                          <path d="M12.5007 3.75L9.16732 7.08333L5.83398 8.33333L4.58398 9.58333L10.4173 15.4167L11.6673 14.1667L12.9173 10.8333L16.2507 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M7.5 12.5L3.75 16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                          <path d="M12.084 3.33398L16.6673 7.91732" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => editPhoto(item.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DFDDDB] bg-white"
                        aria-label="Edit photo"
                      >
                        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-[#5F5F5F]">
                          <path fill="currentColor" d="M13.2929 4.29291C15.0641 2.52167 17.9359 2.52167 19.7071 4.2929C21.4784 6.06414 21.4784 8.93588 19.7071 10.7071L18.7073 11.7069L11.6135 18.8007C10.8766 19.5376 9.92793 20.0258 8.89999 20.1971L4.16441 20.9864C3.84585 21.0395 3.52127 20.9355 3.29291 20.7071C3.06454 20.4788 2.96053 20.1542 3.01362 19.8356L3.80288 15.1C3.9742 14.0721 4.46243 13.1234 5.19932 12.3865L13.2929 4.29291ZM13 7.41422L6.61353 13.8007C6.1714 14.2428 5.87846 14.8121 5.77567 15.4288L5.21656 18.7835L8.57119 18.2244C9.18795 18.1216 9.75719 17.8286 10.1993 17.3865L16.5858 11L13 7.41422ZM18 9.5858L14.4142 6.00001L14.7071 5.70712C15.6973 4.71693 17.3027 4.71693 18.2929 5.70712C19.2831 6.69731 19.2831 8.30272 18.2929 9.29291L18 9.5858Z" clipRule="evenodd" fillRule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={openMobileCreateDrawer}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border-none bg-[#016853] px-4 py-3 text-sm font-medium text-white"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Add Photo
              </button>
            </div>
          </div>
        </div>

        <div
          className={`fixed inset-0 z-[1000] bg-black/50 transition-all duration-300 ${
            isModalOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={closeMobileDrawer}
        />

        <div
          className={`fixed bottom-0 left-0 right-0 z-[1001] mx-auto flex max-h-[90%] w-full max-w-[358px] translate-y-full flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
            isModalOpen ? "translate-y-0" : ""
          }`}
        >
          <div className="sticky top-0 z-[1] flex items-center justify-between border-b border-[#E5E7EB] bg-white px-5 py-4">
            <h2 className="text-lg font-semibold text-[#464646]">Edit Photo Details</h2>
            <button
              type="button"
              onClick={closeMobileDrawer}
              className="flex h-8 w-8 items-center justify-center rounded-full border-none bg-transparent text-[#6B7280]"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto px-5 py-4">
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-[#464646]">Title</label>
              <input
                type="text"
                className="w-full rounded-lg border border-[#D1D5DB] px-3 py-3 text-sm text-[#4A4A4A] focus:border-[#016853] focus:outline-none"
                value={mobileForm.title}
                onChange={(event) =>
                  setMobileForm((prev) => ({ ...prev, title: event.target.value }))
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-[#464646]">Alt Text</label>
              <input
                type="text"
                className="w-full rounded-lg border border-[#D1D5DB] px-3 py-3 text-sm text-[#4A4A4A] focus:border-[#016853] focus:outline-none"
                value={mobileForm.altText}
                onChange={(event) =>
                  setMobileForm((prev) => ({ ...prev, altText: event.target.value }))
                }
                required
              />
            </div>

            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-[#464646]">Thumbnail or Video</label>
              <div className="overflow-hidden rounded-lg border border-[#D1D5DB]">
                <div className="flex items-center gap-4 p-3">
                  <div className="flex h-[60px] w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-[#F7FAFC]">
                    <Image
                      src={mobileForm.imagePreview}
                      alt="Image preview"
                      width={80}
                      height={60}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-2 text-xs text-[#4F4F4F]">
                      Recommended dimensions of <strong>1280x720</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E5E5] bg-transparent px-3 py-1.5 text-xs text-[#4F4F4F]"
                    >
                      <svg fill="none" viewBox="0 0 48 48" width="16" height="16">
                        <rect fill="#F0F9FF" rx="24" height="48" width="48"></rect>
                        <path fill="#283593" d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307ZM27.6641 14.4142L30.9165 17.6667H27.9974C27.909 17.6667 27.8242 17.6315 27.7617 17.569C27.6992 17.5065 27.6641 17.4217 27.6641 17.3333V14.4142Z" clipRule="evenodd" fillRule="evenodd"></path>
                      </svg>
                      {mobileForm.imageFile ? "Replace File" : "Choose File"}
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      className="hidden"
                      onChange={handleMobileFileUpload}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <label className="relative inline-block h-6 w-[50px]">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={mobileForm.pinned}
                  onChange={(event) =>
                    setMobileForm((prev) => ({ ...prev, pinned: event.target.checked }))
                  }
                />
                <span className="absolute inset-0 rounded-full bg-[#DFDDDB] transition-all peer-checked:bg-[#0B6333]"></span>
                <span className="absolute bottom-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-all peer-checked:translate-x-[26px]"></span>
              </label>
              <span className="text-sm text-[#4A4A4A]">Pin this image</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#E5E7EB] bg-white px-5 py-4">
            {currentEditId ? (
              <button
                type="button"
                onClick={deletePhoto}
                className="flex items-center gap-2 border-none bg-transparent text-sm text-[#f93a37]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="h-4 w-4">
                  <path fill="#f93a37" d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={closeMobileDrawer}
                className="rounded-md border border-[#D1D5DB] bg-[#F3F4F6] px-4 py-2 text-sm font-medium text-[#4B5563]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleMobileSave}
                className="rounded-md border border-[#016853] bg-[#016853] px-4 py-2 text-sm font-medium text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>

        <div
          className={`pointer-events-none fixed bottom-20 left-1/2 z-[2000] w-[280px] max-w-[calc(100%-40px)] -translate-x-1/2 rounded-lg bg-[#EBFCF4] px-4 py-3 text-center text-sm text-[#0B6333] shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ${
            showToast ? "translate-y-0 opacity-100" : "translate-y-[120%] opacity-0"
          }`}
        >
          {toastMessage}
        </div>
      </>
    );
  }

  return (
    <div className="w-full mx-auto flex gap-6 my-6 max-md:my-0 max-md:flex-col max-md:px-4">
      <div className="max-w-[350px] max-md:hidden pr-6">
        <h1
          className="text-2xl text-[#1a1a19] font-semibold mb-3"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          }}
        >
          Photo Gallery
        </h1>
        <p className="text-[#5F5F5F] text-base w-[350px]">
          Create and organize your image gallery. Drag to reorder, pin important images,
          and customize details for each photo.
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
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
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
            <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
