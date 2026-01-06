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
    <div className="border-b border-[#eee] pb-6 mb-6">
      <h3 className="text-lg font-semibold text-[#262B47] mb-4">
        Project Tags
      </h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-[#EBFCF4] text-[#016853] px-3 py-1.5 rounded-full text-sm"
          >
            {tag}
            <span
              className="cursor-pointer font-bold"
              onClick={() => removeTag(index)}
            >
              ×
            </span>
          </div>
        ))}
      </div>
      <div className="flex md:items-center gap-4 max-md:flex-col max-md:w-full">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          className="px-3 py-1.5 border max-md:w-full border-theme rounded-full text-sm text-default bg-surface focus:outline-none w-[200px]"
          style={{ 
            borderColor: 'var(--border-color)',
            color: 'var(--text-default)',
            backgroundColor: 'var(--surface-color)'
          }}
          onFocus={(e) => {
            (e.target as HTMLInputElement).style.borderColor = 'var(--brand-teal)';
          }}
          onBlur={(e) => {
            (e.target as HTMLInputElement).style.borderColor = 'var(--border-color)';
          }}
          placeholder="Enter tag"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 bg-[#f5f5f5] border border-[#ddd] rounded text-sm hover:bg-[#eee] transition-colors"
        >
          Add Tag
        </button>
      </div>
    </div>
  );
}
