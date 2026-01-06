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
  const [emoji, setEmoji] = useState("👋");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
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
        setEmoji(announcement.emoji || "👋");
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
      setEmoji("👋");
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
      emoji: emoji,
      author: { name: authorName, role: authorRole, avatar },
      content,
      startDate,
      endDate,
      status: new Date(startDate) > new Date() ? "scheduled" : "live",
    });
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    const start = new Date(newStartDate);
    const end = new Date(endDate);
    
    // If end date is before or equal to new start date, adjust it
    if (end <= start) {
      // Set end date to 1 hour after start date
      const adjustedEnd = new Date(start);
      adjustedEnd.setHours(adjustedEnd.getHours() + 1);
      setEndDate(adjustedEnd.toISOString().slice(0, 16));
    }
    setStartDate(newStartDate);
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
    <div className="flex flex-col h-full max-h-[90vh] max-md:max-h-[90vh]">
      {/* Drawer Header */}
      <div className="sticky top-0 bg-white z-10 px-5 py-4 max-md:px-5 max-md:py-4 border-b border-gray-200 max-md:border-gray-200 flex justify-between items-center flex-shrink-0">
        <h2 className="text-lg max-md:text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>
          {editId ? "Edit Announcement" : "Create Announcement"}
        </h2>
        <button
          className="w-8 h-8 max-md:w-8 max-md:h-8 flex items-center justify-center border-none bg-transparent cursor-pointer rounded-full active:bg-gray-100 max-md:active:bg-gray-100 transition-colors"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ color: 'var(--subtle-text)' }}>
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      {/* Drawer Body */}
      <form id="announcementForm" onSubmit={handleSubmit} className="px-5 py-4 max-md:px-5 max-md:py-4 overflow-y-auto flex-grow">
        <div className="mb-[18px] max-md:mb-[18px]">
          <label className="block font-semibold text-sm max-md:text-sm mb-1.5 max-md:mb-1.5" style={{ color: 'var(--text-default)' }}>
            Title
          </label>
          <div className="flex items-center gap-2 max-md:gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Announcement Title"
              required
              className="flex-1 px-3 py-3 max-md:px-3 max-md:py-3 border rounded-lg text-sm max-md:text-sm focus:outline-none"
              style={{ 
                borderColor: 'var(--border-color)',
                color: 'var(--text-default)',
                backgroundColor: 'white'
              }}
              onFocus={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
              }}
              onBlur={(e) => {
                (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
              }}
            />
            <button
              type="button"
              className="w-9 h-9 max-md:w-9 max-md:h-9 flex items-center justify-center border rounded-full bg-white active:bg-gray-100 max-md:active:bg-gray-100 transition-colors flex-shrink-0"
              style={{ borderColor: 'var(--border-color)' }}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <span className="text-lg max-md:text-lg">{emoji}</span>
            </button>
            {showEmojiPicker && (
              <div className="fixed inset-0 z-[4000] max-md:z-[4000]" onClick={() => setShowEmojiPicker(false)}>
                <div className="absolute bottom-0 left-0 w-full max-h-[70%] bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.15)]" onClick={(e) => e.stopPropagation()}>
                  <div className="sticky top-0 bg-white px-5 py-4 border-b border-gray-200 flex items-center justify-between">
                    <button
                      className="w-8 h-8 flex items-center justify-center border-none bg-transparent cursor-pointer rounded-full active:bg-gray-100"
                      onClick={() => setShowEmojiPicker(false)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" style={{ color: 'var(--subtle-text)' }}>
                        <path d="M15 18l-6-6 6-6"></path>
                      </svg>
                    </button>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--bold-text)' }}>Choose Emoji</h3>
                    <div style={{ width: '32px' }}></div>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-6 gap-3">
                      {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '👋', '👍', '👏', '🙌', '🤝', '🔥', '⭐', '🎉', '🎊', '🎯', '🚀', '💡', '📣', '📢', '🔔', '🔊', '📝', '📌', '🔧', '🔨'].map((emojiOption) => (
                        <div
                          key={emojiOption}
                          className="text-2xl w-11 h-11 max-md:w-11 max-md:h-11 flex items-center justify-center rounded-lg cursor-pointer active:bg-gray-100 max-md:active:bg-gray-100 transition-colors"
                          onClick={() => {
                            setEmoji(emojiOption);
                            setShowEmojiPicker(false);
                          }}
                        >
                          {emojiOption}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mb-[18px] max-md:mb-[18px]">
          <label className="block font-semibold text-sm max-md:text-sm mb-1.5 max-md:mb-1.5" style={{ color: 'var(--text-default)' }}>
            Avatar
          </label>
          <div className="border rounded-lg overflow-hidden" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-4 max-md:gap-4 p-4 max-md:p-4">
              <div className="w-20 h-20 max-md:w-20 max-md:h-20 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#F7FAFC' }}>
                <img
                  src={avatar}
                  alt="Author avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="text-[13px] max-md:text-[13px] mb-2 max-md:mb-2" style={{ color: 'var(--text-default)' }}>
                  Recommended dimensions of <strong>400×400</strong>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 max-md:gap-2 px-4 py-1.5 max-md:px-4 max-md:py-1.5 border rounded-full text-sm max-md:text-sm active:bg-gray-100 max-md:active:bg-gray-100 transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-default)' }}
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
                  Choose Avatar
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
        <div className="mb-[18px] max-md:mb-[18px]">
          <label className="block font-semibold text-sm max-md:text-sm mb-1.5 max-md:mb-1.5" style={{ color: 'var(--text-default)' }}>
            Author Name
          </label>
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Enter author name"
            required
            className="w-full px-3 py-3 max-md:px-3 max-md:py-3 border rounded-lg text-sm max-md:text-sm focus:outline-none"
            style={{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-default)',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
            }}
          />
        </div>
        <div className="mb-[18px] max-md:mb-[18px]">
          <label className="block font-semibold text-sm max-md:text-sm mb-1.5 max-md:mb-1.5" style={{ color: 'var(--text-default)' }}>
            Author Role
          </label>
          <input
            type="text"
            value={authorRole}
            onChange={(e) => setAuthorRole(e.target.value)}
            placeholder="Enter author role"
            required
            className="w-full px-3 py-3 max-md:px-3 max-md:py-3 border rounded-lg text-sm max-md:text-sm focus:outline-none"
            style={{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-default)',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
            }}
          />
        </div>
        <div className="mb-[18px] max-md:mb-[18px]">
          <label className="block font-semibold text-sm max-md:text-sm mb-1.5 max-md:mb-1.5" style={{ color: 'var(--text-default)' }}>
            Announcement
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="Write your announcement here..."
            required
            className="w-full px-3 py-3 max-md:px-3 max-md:py-3 border rounded-lg text-sm max-md:text-sm focus:outline-none"
            style={{ 
              borderColor: 'var(--border-color)',
              color: 'var(--text-default)',
              backgroundColor: 'white'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--brand-teal)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
            }}
          />
        </div>
        <div className="mb-[18px] max-md:mb-[18px]">
          <label className="block font-semibold text-sm max-md:text-sm mb-1.5 max-md:mb-1.5" style={{ color: 'var(--text-default)' }}>
            Schedule
          </label>
          <div className="flex flex-col gap-4 max-md:flex-col max-md:gap-4">
            <div className="flex-1">
              <label className="block font-semibold text-sm max-md:text-sm mb-1.5 max-md:mb-1.5" style={{ color: 'var(--text-default)' }}>
                Start Date & Time
              </label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={handleStartDateChange}
                required
                step="900"
                className="w-full px-3 py-3 max-md:px-3 max-md:py-3 border rounded-lg text-sm max-md:text-sm cursor-pointer focus:outline-none"
                style={{
                  color: 'var(--text-default)',
                  backgroundColor: 'white',
                  borderColor: 'var(--border-color)',
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'var(--brand-teal)';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'var(--border-color)';
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block font-semibold text-sm max-md:text-sm mb-1.5 max-md:mb-1.5" style={{ color: 'var(--text-default)' }}>
                End Date & Time
              </label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={handleEndDateChange}
                required
                step="900"
                className="w-full px-3 py-3 max-md:px-3 max-md:py-3 border rounded-lg text-sm max-md:text-sm cursor-pointer focus:outline-none"
                style={{
                  color: 'var(--text-default)',
                  backgroundColor: 'white',
                  borderColor: 'var(--border-color)',
                }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'var(--brand-teal)';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = 'var(--border-color)';
                }}
              />
            </div>
          </div>
        </div>
      </form>
      
      {/* Drawer Footer */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 max-md:border-gray-200 px-5 py-4 max-md:px-5 max-md:py-4 flex flex-col gap-4 max-md:gap-4 flex-shrink-0">
        {editId && (
          <button
            className="flex items-center justify-center gap-2 max-md:gap-2 text-sm max-md:text-sm font-medium max-md:font-medium py-3 max-md:py-3 cursor-pointer border-none bg-transparent w-full"
            style={{ color: '#f93a37' }}
            onClick={onDelete}
          >
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path fill="#f93a37" d="M10.5555 4C10.099 4 9.70052 4.30906 9.58693 4.75114L9.29382 5.8919H14.715L14.4219 4.75114C14.3083 4.30906 13.9098 4 13.4533 4H10.5555ZM16.7799 5.8919L16.3589 4.25342C16.0182 2.92719 14.8226 2 13.4533 2H10.5555C9.18616 2 7.99062 2.92719 7.64985 4.25342L7.22886 5.8919H4C3.44772 5.8919 3 6.33961 3 6.8919C3 7.44418 3.44772 7.8919 4 7.8919H4.10069L5.31544 19.3172C5.47763 20.8427 6.76455 22 8.29863 22H15.7014C17.2354 22 18.5224 20.8427 18.6846 19.3172L19.8993 7.8919H20C20.5523 7.8919 21 7.44418 21 6.8919C21 6.33961 20.5523 5.8919 20 5.8919H16.7799ZM17.888 7.8919H6.11196L7.30423 19.1057C7.3583 19.6142 7.78727 20 8.29863 20H15.7014C16.2127 20 16.6417 19.6142 16.6958 19.1057L17.888 7.8919ZM10 10C10.5523 10 11 10.4477 11 11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11C9 10.4477 9.44772 10 10 10ZM14 10C14.5523 10 15 10.4477 15 11V16C15 16.5523 14.5523 17 14 17C13.4477 17 13 16.5523 13 16V11C13 10.4477 13.4477 10 14 10Z" clipRule="evenodd" fillRule="evenodd"></path>
            </svg>
            Delete
          </button>
        )}
        <div className="flex gap-2.5 max-md:gap-2.5 w-full">
          <button
            type="button"
            className="flex-1 max-md:flex-1 px-0 py-3 max-md:py-3 rounded-lg font-semibold text-base max-md:text-base active:opacity-90 border"
            style={{ 
              backgroundColor: '#F8F9FA',
              borderColor: 'var(--border-color)',
              color: 'var(--text-default)'
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            form="announcementForm"
            className="flex-1 max-md:flex-1 px-0 py-3 max-md:py-3 rounded-lg font-semibold text-base max-md:text-base active:opacity-90 text-white"
            style={{ backgroundColor: 'var(--brand-teal)', boxShadow: '0 2px 4px rgba(2, 197, 175, 0.2)' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
