"use client";

import { useState, useEffect } from "react";
import { Announcement } from "./types/announcement";
import AnnouncementItem from "./AnnouncementItem";
import AnnouncementsModal from "./AnnouncementsModal";

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Welcome to Our Platform",
    emoji: "👋",
    author: {
      name: "Mufti Hidayat",
      role: "Project Manager",
      avatar: "https://i.ibb.co/0yKzNSpq/AVATAR-Kostis-Kapelonis.png",
    },
    content: "We're excited to announce our new platform features...",
    status: "live",
    pinned: true,
    startDate: "2024-02-09T09:00",
    endDate: "2024-02-16T09:00",
  },
  {
    id: 2,
    title: "Upcoming Platform Maintenance",
    emoji: "🔧",
    author: {
      name: "John Doe",
      role: "System Administrator",
      avatar: "https://i.ibb.co/sd81XRDd/AVATAR-midtone-ux-instrgram.jpg",
    },
    content:
      "We will be performing essential maintenance to improve system performance...",
    status: "scheduled",
    pinned: false,
    startDate: "2024-03-16T21:15",
    endDate: "2024-03-17T21:15",
  },
];

const MAX_ANNOUNCEMENTS = 5;

export default function Announcements() {
  const [announcements, setAnnouncements] =
    useState<Announcement[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<number | null>(null);

  const openModal = (isEdit = false, id?: number) => {
    setIsModalOpen(true);
    if (isEdit && id) {
      setCurrentEditId(id);
    } else {
      setCurrentEditId(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEditId(null);
  };

  const togglePin = (id: number) => {
    setAnnouncements((prev) => {
      const updated = prev.map((a) => ({
        ...a,
        pinned: a.id === id ? !a.pinned : false,
      }));
      // Sort: pinned items first, then by id
      return updated.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return a.id - b.id;
      });
    });
  };

  const editAnnouncement = (id: number) => {
    openModal(true, id);
  };

  const deleteAnnouncement = () => {
    if (currentEditId) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== currentEditId));
      closeModal();
    }
  };

  const handleSubmit = (formData: Omit<Announcement, "id" | "pinned">) => {
    // Ensure status is calculated based on current date and start date
    const now = new Date();
    const start = new Date(formData.startDate);
    const calculatedStatus: "live" | "scheduled" | "paused" = 
      start > now ? "scheduled" : "live";
    
    const formDataWithStatus = {
      ...formData,
      status: calculatedStatus,
    };

    if (currentEditId) {
      // Update existing announcement
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === currentEditId
            ? { ...formDataWithStatus, id: currentEditId, pinned: a.pinned }
            : a
        )
      );
    } else {
      // Add new announcement
      if (announcements.length >= MAX_ANNOUNCEMENTS) {
        alert(
          "Maximum number of announcements reached. Please delete an existing announcement first."
        );
        return;
      }
      const newAnnouncement: Announcement = {
        id: Date.now(),
        ...formDataWithStatus,
        pinned: false,
      };
      setAnnouncements((prev) => [...prev, newAnnouncement]);
    }
    closeModal();
  };

  useEffect(() => {
    const updateStatus = () => {
      let needsUpdate = false;
      const updated = announcements.map((a) => {
        const newStatus = getAnnouncementStatus(a.startDate);
        if (newStatus !== a.status) {
          needsUpdate = true;
          return { ...a, status: newStatus };
        }
        return a;
      });
      if (needsUpdate) {
        setAnnouncements(updated);
      }
    };

    const interval = setInterval(updateStatus, 60000);
    return () => clearInterval(interval);
  }, [announcements]);

  const getAnnouncementStatus = (
    startDate: string
  ): "live" | "scheduled" | "paused" => {
    const now = new Date();
    const start = new Date(startDate);
    return start > now ? "scheduled" : "live";
  };

  return (
    <>
      <div className="flex max-md:flex-col gap-6">
        {/* Desktop Header */}
        <div className="max-w-[350px] max-md:hidden">
          <h1 className="text-[#1a1a19] text-2xl font-semibold mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            Announcements
          </h1>
          <p className="text-[#5F5F5F] text-base leading-6 w-[350px]">
            Share important updates and news with your community. Schedule
            announcements and manage their visibility.
          </p>
        </div>
        
        {/* Mobile Header */}
        <div className="hidden max-md:block px-4 pt-[18px] pb-4">
          <h1 className="text-2xl font-semibold mb-2" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', color: 'var(--bold-text)' }}>
            Announcements
          </h1>
          <p className="text-sm leading-6" style={{ color: 'var(--subtle-text)' }}>
            Share important updates and news with your community. Schedule
            announcements and manage their visibility.
          </p>
        </div>
        
        <div className="w-full bg-white rounded-lg p-6 max-md:p-0 max-md:bg-transparent max-md:rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.1)] max-md:shadow-none relative">
          {/* Desktop Count Badge */}
          <div className="absolute top-6 right-6 max-md:hidden text-sm font-semibold text-[var(--text-color)] py-1 px-3 bg-[#F8F9FA] rounded-2xl">
            {announcements.length}/{MAX_ANNOUNCEMENTS}
          </div>
          
          {/* Mobile Content */}
          <div className="max-md:px-4 max-md:pb-4">
            {/* Mobile Count */}
            <div className="hidden max-md:block text-right text-sm font-semibold mb-4" style={{ color: 'var(--text-default)' }}>
              {announcements.length}/{MAX_ANNOUNCEMENTS}
            </div>
            
            <div className="mt-6 max-md:mt-0 pt-2.5 max-md:pt-0 flex flex-col gap-3 max-md:gap-3 mb-4 max-md:mb-4">
              {announcements
                .sort((a, b) => {
                  // Sort: pinned items first, then by id
                  if (a.pinned && !b.pinned) return -1;
                  if (!a.pinned && b.pinned) return 1;
                  return a.id - b.id;
                })
                .map((announcement) => (
                  <AnnouncementItem
                    key={announcement.id}
                    announcement={announcement}
                    onTogglePin={togglePin}
                    onEdit={editAnnouncement}
                  />
                ))}
            </div>
            
            <button
              className="bg-[#02C5AF] max-md:w-full text-white px-6 py-3 max-md:py-3 max-md:px-0 rounded-lg font-semibold text-sm max-md:text-base hover:opacity-90 max-md:shadow-[0_2px_4px_rgba(2,197,175,0.2)]"
              onClick={() => openModal()}
            >
              Add Announcement
            </button>
          </div>
        </div>
      </div>

      <AnnouncementsModal
        isModalOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onDelete={deleteAnnouncement}
        editId={currentEditId}
        announcements={announcements}
      />
    </>
  );
}
