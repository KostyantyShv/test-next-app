"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface EmojiPickerComponentProps {
  selectedEmoji: string | null;
  onEmojiSelect: (emoji: string | null) => void;
}

const EmojiPickerComponent: React.FC<EmojiPickerComponentProps> = ({
  selectedEmoji,
  onEmojiSelect,
}) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | HTMLDivElement>(null);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(e.target as Node) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target as Node)
    ) {
      setIsPickerOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling to modal or other click handlers
    console.log("Emoji button clicked, toggling picker"); // Debug log
    setIsPickerOpen((prev) => !prev);
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setIsPickerOpen(false);
  };

  const handleRemoveEmoji = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the picker toggle
    onEmojiSelect(null);
  };

  return (
    <div className="relative flex flex-col items-center">
      <span className="text-sm font-semibold text-neutral mb-2 hidden">
        Emoji
      </span>
      <div>
        {!selectedEmoji ? (
          <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onClick={handleButtonClick}
            className="w-11 h-11 bg-inputBg border border-inputBorder rounded-full flex items-center justify-center text-neutralLight hover:bg-gray-100 hover:text-inputFocus transition-all duration-200"
          >
            <svg viewBox="0 0 448 512" width="16" height="16">
              <path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"
                fill="currentColor"
              />
            </svg>
          </button>
        ) : (
          <div
            ref={buttonRef as React.RefObject<HTMLDivElement>}
            onClick={handleButtonClick}
            className="w-11 h-11 bg-inputBg border border-inputBorder rounded-full flex items-center justify-center cursor-pointer text-lg relative"
          >
            <span>{selectedEmoji}</span>
            <button
              onClick={handleRemoveEmoji}
              className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-gray-100 border border-inputBorder rounded-full flex items-center justify-center text-neutralLight text-[10px] hover:bg-inputBorder hover:text-neutralDark transition-all duration-200"
            >
              <svg width="10" height="10" viewBox="0 0 20 20" fill="none">
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
        )}
        {isPickerOpen && (
          <div
            ref={pickerRef}
            className="absolute top-12 right-0 w-72 max-h-[350px] bg-white rounded-xl shadow-xl z-[110] overflow-hidden"
          >
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              width="100%"
              height="350px"
              previewConfig={{ showPreview: false }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPickerComponent;
