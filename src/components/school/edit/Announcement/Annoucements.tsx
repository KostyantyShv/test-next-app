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
    // Validate dates (keep "End date must be after start date" behavior)
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    if (end <= start) {
      alert("End date must be after start date");
      return;
    }

    // Ensure status is calculated based on current date and start date
    const now = new Date();
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
      <div className="school-edit-announcements">
        <div className="announcements-container">
          <div className="announcements-left">
            <h1 className="section-title">Announcements</h1>
            <p className="section-description">
              Share important updates and news with your community. Schedule announcements and manage their visibility.
            </p>
          </div>

          <div className="announcements-right">
            <div className="announcements-count">
              {announcements.length}/{MAX_ANNOUNCEMENTS}
            </div>

            <div className="announcement-list" id="announcementList">
              {announcements
                .slice()
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

            <button className="btn btn-primary" type="button" onClick={() => openModal()}>
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
