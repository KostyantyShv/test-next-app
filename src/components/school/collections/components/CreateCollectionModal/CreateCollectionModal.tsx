"use client";

import React, { useState, useEffect, useRef } from "react";
import EmojiPickerComponent from "../EmojiPicker/EmojiPickerComponent";
import PrivacyDropdown from "../PrivacyDropdown/PrivacyDropdown";

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  emoji: string | null;
  privacy: string;
}

const CreateCollectionModal: React.FC<CreateCollectionModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    emoji: null,
    privacy: "private",
  });
  const [isCreateEnabled, setIsCreateEnabled] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      titleInputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsCreateEnabled(formData.title.trim().length > 0);
  }, [formData.title]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && e.target === modalRef.current) {
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
      emoji: null,
      privacy: "private",
    });
    setIsCreateEnabled(false);
    onClose();
  };

  const handleSubmit = () => {
    if (formData.title.trim().length === 0) return;
    console.log("Collection Created:", formData);
    alert("Collection created successfully!");
    handleClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmojiSelect = (emoji: string | null) => {
    setFormData((prev) => ({ ...prev, emoji }));
  };

  const handlePrivacySelect = (privacy: string) => {
    setFormData((prev) => ({ ...prev, privacy }));
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] transition-all duration-300 overflow-y-auto"
      onClick={handleClickOutside}
    >
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-neutralDark">
            Create Collection
          </h3>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutralLight hover:bg-gray-100 hover:text-neutralDark transition-all duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="h-px bg-inputBorder -mx-6 mb-6 opacity-80"></div>

        <div className="mb-5">
          <div className="flex items-center mb-2">
            <div className="flex items-center flex-grow">
              <span className="text-sm font-semibold text-neutral">Title</span>
              <span className="text-xs text-neutralLight ml-auto pr-2">
                {formData.title.length}/140 Chars
              </span>
            </div>
            <span className="text-sm font-semibold text-neutral ml-4">
              Emoji
            </span>
          </div>
          <div className="flex items-end">
            <div className="flex-grow mr-4">
              <input
                ref={titleInputRef}
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full h-11 px-4 border border-inputBorder rounded-full text-sm text-neutral bg-inputBg focus:outline-none focus:border-inputFocus focus:ring-2 focus:ring-inputFocus focus:ring-opacity-10 transition-all duration-200"
                placeholder="Collection Name..."
                maxLength={140}
                required
              />
            </div>
            <EmojiPickerComponent
              selectedEmoji={formData.emoji}
              onEmojiSelect={handleEmojiSelect}
            />
          </div>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-neutral">
              Description{" "}
              <span className="font-normal text-neutralLight">(optional)</span>
            </span>
            <span className="text-xs text-neutralLight">
              {formData.description.length}/400 Chars
            </span>
          </div>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full min-h-[100px] p-4 border border-inputBorder rounded-xl text-sm text-neutral bg-inputBg resize-y focus:outline-none focus:border-inputFocus focus:ring-2 focus:ring-inputFocus focus:ring-opacity-10 transition-all duration-200"
            placeholder="A space for discussing latest tech insights..."
            maxLength={400}
          />
        </div>

        <div className="mb-5">
          <div className="flex justify-start mb-2">
            <span className="text-sm font-semibold text-neutral">Privacy</span>
          </div>
          <PrivacyDropdown
            selectedPrivacy={formData.privacy}
            onPrivacySelect={handlePrivacySelect}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-neutral bg-gray-100 hover:bg-gray-200 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isCreateEnabled}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primaryHover disabled:bg-primaryLight disabled:text-primaryDisabled disabled:cursor-not-allowed transition-all duration-200"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollectionModal;
