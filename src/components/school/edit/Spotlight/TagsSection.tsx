"use client";

import { useState } from "react";

interface TagsSectionProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

export default function TagsSection({ tags, setTags }: TagsSectionProps) {
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim()) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="border-b border-[#eee] max-md:border-[#eee] pb-6 max-md:pb-5 mb-6 max-md:mb-5">
      <h3 className="text-lg max-md:text-base font-semibold text-[#262B3D] max-md:text-[#262B3D] mb-4 max-md:mb-4">
        Project Tags
      </h3>
      <div className="flex flex-wrap gap-2 max-md:gap-2 mb-4 max-md:mb-4">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 max-md:gap-2 bg-[#EBFCF4] max-md:bg-[#EBFCF4] text-[#016853] max-md:text-[#016853] px-3 max-md:px-[12px] py-1.5 max-md:py-1.5 rounded-full max-md:rounded-[100px] text-sm max-md:text-[13px]"
          >
            {tag}
            <span
              className="cursor-pointer font-bold max-md:font-bold"
              onClick={() => removeTag(index)}
            >
              ×
            </span>
          </div>
        ))}
      </div>
      <div className="flex md:items-center gap-4 max-md:flex-col max-md:w-full max-md:gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-3 max-md:px-3 py-1.5 max-md:py-1.5 border max-md:w-full border-[#E5E5E5] max-md:border-[#E5E5E5] rounded-full max-md:rounded-[100px] text-sm max-md:text-sm text-[#4A4A4A] max-md:text-[#4A4A4A] bg-white max-md:bg-white focus:outline-none w-[200px] max-md:w-full"
          onFocus={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.borderColor = '#02C5AF';
          }}
          onBlur={(e) => {
            const target = e.target as HTMLInputElement;
            target.style.borderColor = '#E5E5E5';
          }}
          placeholder="Enter tag"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 max-md:px-4 py-2 max-md:py-2 bg-[#f5f5f5] max-md:bg-[#f5f5f5] border border-[#ddd] max-md:border-[#ddd] rounded max-md:rounded text-sm max-md:text-sm hover:bg-[#eee] max-md:hover:bg-[#eee] transition-colors max-md:w-full"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
}
