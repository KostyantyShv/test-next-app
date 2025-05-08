"use client";

import { useState, useEffect, useRef } from "react";
import { Announcement } from "./types/announcement";

interface AnnouncementModalProps {
  onClose: () => void;
  onSubmit: (formData: Omit<Announcement, "id" | "pinned">) => void;
  onDelete: () => void;
  editId: number | null;
  announcements: Announcement[];
}

export default function AnnouncementModalContent({
  onSubmit,
  onClose,
  onDelete,
  editId,
  announcements,
}: AnnouncementModalProps) {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("");
  const [content, setContent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [avatar, setAvatar] = useState(
    "https://i.ibb.co/0yKzNSpq/AVATAR-Kostis-Kapelonis.png"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editId) {
      const announcement = announcements.find((a) => a.id === editId);
      if (announcement) {
        setTitle(announcement.title);
        setAuthorName(announcement.author.name);
        setAuthorRole(announcement.author.role);
        setContent(announcement.content);
        setStartDate(announcement.startDate);
        setEndDate(announcement.endDate);
        setAvatar(announcement.author.avatar);
      }
    } else {
      const now = new Date();
      const minutes = Math.ceil(now.getMinutes() / 15) * 15;
      now.setMinutes(minutes, 0, 0);
      const end = new Date(now);
      end.setDate(end.getDate() + 7);
      const formatDateTime = (date: Date) => date.toISOString().slice(0, 16);
      setStartDate(formatDateTime(now));
      setEndDate(formatDateTime(end));
    }
  }, [editId, announcements]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => e.target && setAvatar(e.target.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end <= start) {
      alert("End date must be after start date");
      return;
    }
    onSubmit({
      title,
      emoji: "👋", // Default emoji as in original
      author: { name: authorName, role: authorRole, avatar },
      content,
      startDate,
      endDate,
      status: new Date(startDate) > new Date() ? "scheduled" : "live",
    });
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    const start = new Date(startDate);
    const end = new Date(newEndDate);
    if (end <= start) {
      alert("End date must be after start date");
      setEndDate(startDate);
    } else {
      setEndDate(newEndDate);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center p-6 border-b border-[#E5E5E5]">
        <h2 className="text-2xl font-bold text-[#262B3D]">
          {editId ? "Edit Announcement" : "Create Announcement"}
        </h2>
        <button
          className="p-2 hover:bg-[#E1E7EE] rounded-full"
          onClick={onClose}
        >
          <svg fill="none" viewBox="0 0 12 12" width="12" height="12">
            <path
              fill="#646464"
              d="M7.46875 6L10.8438 2.65625C11.0312 2.46875 11.0312 2.125 10.8438 1.9375L10.0625 1.15625C9.875 0.96875 9.53125 0.96875 9.34375 1.15625L6 4.53125L2.625 1.15625C2.4375 0.96875 2.09375 0.96875 1.90625 1.15625L1.125 1.9375C0.9375 2.125 0.9375 2.46875 1.125 2.65625L4.5 6L1.125 9.375C0.9375 9.5625 0.9375 9.90625 1.125 10.0938L1.90625 10.875C2.09375 11.0625 2.4375 11.0625 2.625 10.875L6 7.5L9.34375 10.875C9.53125 11.0625 9.875 11.0625 10.0625 10.875L10.8438 10.0938C11.0312 9.90625 11.0312 9.5625 10.8438 9.375L7.46875 6Z"
            />
          </svg>
        </button>
      </div>
      <form id="announcementForm" onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label className="block font-semibold text-[#4A4A4A] text-sm mb-2">
            Title
          </label>
          <div className="flex items-start gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement Title"
              required
              className="flex-1 p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
            />
            <button type="button" className="text-xl">
              😀
            </button>
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-[#4A4A4A] text-sm mb-2">
            Avatar
          </label>
          <div className="border border-[#E5E5E5] rounded-lg overflow-hidden">
            <div className="flex items-center gap-6 p-4">
              <div className="w-[120px] h-[120px] bg-[#F7FAFC] rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={avatar}
                  alt="Author avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[#4A4A4A] mb-2">
                  Recommended dimensions of <strong>400×400</strong>
                </div>
                <button
                  type="button"
                  className="flex items-center gap-2 py-1.5 px-4 border border-[#E5E5E5] rounded-full text-sm text-[#4A4A4A] hover:bg-[#E1E7EE]"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg fill="none" viewBox="0 0 48 48" width="24" height="24">
                    <rect fill="#F0F9FF" rx="24" height="48" width="48" />
                    <path
                      fill="#283593"
                      d="M17.3307 13C16.8887 13 16.4648 13.1756 16.1522 13.4882C15.8397 13.8007 15.6641 14.2246 15.6641 14.6667V33.3333C15.6641 33.7754 15.8397 34.1993 16.1522 34.5118C16.4648 34.8244 16.8887 35 17.3307 35H30.6641C31.1061 35 31.53 34.8244 31.8426 34.5118C32.1551 34.1993 32.3307 33.7754 32.3307 33.3333V19.6667H27.9974C27.3786 19.6667 26.7851 19.4208 26.3475 18.9832C25.9099 18.5457 25.6641 17.9522 25.6641 17.3333V13H17.3307ZM27.6641 14.4142L30.9165 17.6667H27.9974C27.909 17.6667 27.8242 17.6315 27.7617 17.569C27.6992 17.5065 27.6641 17.4217 27.6641 17.3333V14.4142Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    />
                  </svg>
                  {avatar ===
                  "https://i.ibb.co/0yKzNSpq/AVATAR-Kostis-Kapelonis.png"
                    ? "Choose Avatar"
                    : "Replace Avatar"}
                </button>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-[#4A4A4A] text-sm mb-2">
            Author Name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter author name"
            required
            className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-[#4A4A4A] text-sm mb-2">
            Author Role
          </label>
          <input
            type="text"
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            placeholder="Enter author role"
            required
            className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-[#4A4A4A] text-sm mb-2">
            Announcement
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Write your announcement here..."
            required
            className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold text-[#4A4A4A] text-sm mb-2">
            Schedule
          </label>
          <div className="flex gap-4 max-md:flex-col">
            <div className="flex-1">
              <label className="block font-semibold text-[#4A4A4A] text-sm mb-2">
                Start Date & Time
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  step="900"
                  className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] bg-white cursor-pointer hover:border-[#02C5AF] hover:bg-[#F8F9FA] focus:outline-none focus:border-[#02C5AF] focus:shadow-[0_0_0_3px_rgba(2,197,175,0.1)]"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block font-semibold text-[#4A4A4A] text-sm mb-2">
                End Date & Time
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={handleEndDateChange}
                  required
                  step="900"
                  className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] bg-white cursor-pointer hover:border-[#02C5AF] hover:bg-[#F8F9FA] focus:outline-none focus:border-[#02C5AF] focus:shadow-[0_0_0_3px_rgba(2,197,175,0.1)]"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex md:justify-between max-md:flex-col-reverse items-center p-6 border-t border-[#E5E5E5]">
        <button
          className="flex max-md:w-full max-md:justify-center max-md:pt-4 items-center gap-2 text-[#f93a37] bg-none border-none cursor-pointer text-sm"
          onClick={onDelete}
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#f93a37"
              d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
          Delete
        </button>
        <div className="flex gap-3 max-md:w-full">
          <button
            type="button"
            className="bg-[#F8F9FA] max-md:w-full border border-[#E5E5E5] text-[#4A4A4A] px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="announcementForm"
            className="bg-[#02C5AF] text-white max-md:w-full px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
