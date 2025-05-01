"use client";

import { useState, useEffect } from "react";
import { Announcement } from "./types/announcement";
import AnnouncementItem from "./AnnouncementItem";
import AnnouncementModal from "./AnnpuncementModal";

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
    setAnnouncements((prev) =>
      prev.map((a) => ({
        ...a,
        pinned: a.id === id ? !a.pinned : false,
      }))
    );
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
    if (currentEditId) {
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === currentEditId
            ? { ...formData, id: currentEditId, pinned: a.pinned }
            : a
        )
      );
    } else {
      if (announcements.length >= MAX_ANNOUNCEMENTS) {
        alert("Maximum number of announcements reached.");
        return;
      }
      setAnnouncements((prev) => [
        ...prev,
        { ...formData, id: Date.now(), pinned: false },
      ]);
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
    <div className="max-w-[1150px] mx-auto flex gap-6">
      <div className="w-[350px]">
        <h1 className="text-[#1a1a19] text-2xl font-semibold mb-3">
          Announcements
        </h1>
        <p className="text-[#5F5F5F] text-base leading-6">
          Share important updates and news with your community. Schedule
          announcements and manage their visibility.
        </p>
      </div>
      <div className="w-[775px] bg-white rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)] relative">
        <div className="absolute top-6 right-6 text-sm font-semibold text-[var(--text-color)] py-1 px-3 bg-[#F8F9FA] rounded-2xl">
          {announcements.length}/{MAX_ANNOUNCEMENTS}
        </div>
        <div className="mt-6 pt-2.5">
          {announcements.map((announcement) => (
            <AnnouncementItem
              key={announcement.id}
              announcement={announcement}
              onTogglePin={togglePin}
              onEdit={editAnnouncement}
            />
          ))}
        </div>
        <button
          className="bg-[#02C5AF] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90"
          onClick={() => openModal()}
        >
          Add Announcement
        </button>
      </div>
      {isModalOpen && (
        <AnnouncementModal
          onClose={closeModal}
          onSubmit={handleSubmit}
          onDelete={deleteAnnouncement}
          editId={currentEditId}
          announcements={announcements}
        />
      )}
    </div>
  );
}
