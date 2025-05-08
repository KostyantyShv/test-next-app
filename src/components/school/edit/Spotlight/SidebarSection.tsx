"use client";

import { useState } from "react";
import { SidebarLink, SocialButton } from "./types";
import { RefObject } from "react";

interface SidebarSectionProps {
  banner: string;
  title: string;
  description: string;
  links: SidebarLink[];
  socialButtons: SocialButton[];
  setBanner: (banner: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setLinks: (links: SidebarLink[]) => void;
  setSocialButtons: (socialButtons: SocialButton[]) => void;
  inputRef: RefObject<HTMLInputElement | null>;
  onBannerUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SidebarSection({
  banner,
  title,
  description,
  links,
  socialButtons,
  setBanner,
  setTitle,
  setDescription,
  setLinks,
  setSocialButtons,
  inputRef,
  onBannerUpload,
}: SidebarSectionProps) {
  const [newLinkText, setNewLinkText] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newSocialType, setNewSocialType] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");

  const addLink = () => {
    if (newLinkText.trim() && newLinkUrl.trim()) {
      setLinks([
        ...links,
        { text: newLinkText.trim(), url: newLinkUrl.trim() },
      ]);
      setNewLinkText("");
      setNewLinkUrl("");
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const addSocialButton = () => {
    if (newSocialType.trim() && newSocialUrl.trim()) {
      setSocialButtons([
        ...socialButtons,
        { type: newSocialType.trim(), url: newSocialUrl.trim() },
      ]);
      setNewSocialType("");
      setNewSocialUrl("");
    }
  };

  const removeSocialButton = (index: number) => {
    setSocialButtons(socialButtons.filter((_, i) => i !== index));
  };

  return (
    <div className="pb-6">
      <h3 className="text-lg font-semibold text-[#262B47] mb-4">
        Sidebar Details
      </h3>
      <div className="bg-[#F8F9FD] rounded-lg p-4 mb-6">
        <div className="mb-4">
          <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
            Sidebar Banner
          </label>
          <div className="relative w-full h-[150px] rounded-lg overflow-hidden">
            <img
              src={banner}
              alt="Sidebar Banner"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11 14.9861C11 15.5384 11.4477 15.9861 12 15.9861C12.5523 15.9861 13 15.5384 13 14.9861V7.82831L16.2428 11.0711C16.6333 11.4616 17.2665 11.4616 17.657 11.0711C18.0475 10.6806 18.0475 10.0474 17.657 9.65692L12.7071 4.70701C12.3166 4.31649 11.6834 4.31649 11.2929 4.70701L6.34315 9.65692C5.95262 10.0474 5.95262 10.6806 6.34315 11.0711C6.73367 11.4616 7.36684 11.4616 7.75736 11.0711L11 7.82831V14.9861Z"
                />
              </svg>
            </div>
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              accept="image/*"
              onChange={onBannerUpload}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
            Sidebar Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
            placeholder="e.g., EduTech Solutions"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
            Sidebar Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF] min-h-[100px]"
            placeholder="e.g., Leading provider of innovative educational technology solutions..."
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
            Sidebar Links
          </label>
          <div className="flex flex-col gap-3 mb-3">
            {links.map((link, index) => (
              <div
                key={index}
                className="flex max-md:flex-col max-md:w-full items-center gap-4 p-3 border border-[#E5E5E5] rounded-lg relative"
              >
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#f8f9fa] border border-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#e9ecef] hover:text-[#333]"
                >
                  ×
                </button>
                <div className="flex-1 max-md:w-full">
                  <label className="max-md:block hidden font-semibold text-[#4A4A4A] mb-2 text-sm">
                    Link Text
                  </label>
                  <input
                    type="text"
                    value={link.text}
                    onChange={(e) => {
                      const newLinks = [...links];
                      newLinks[index].text = e.target.value;
                      setLinks(newLinks);
                    }}
                    className="w-full p-2 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                    placeholder="Link Text"
                  />
                </div>
                <div className="flex-1 max-md:w-full">
                  <label className="max-md:block hidden font-semibold text-[#4A4A4A] mb-2 text-sm">
                    URL
                  </label>
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...links];
                      newLinks[index].url = e.target.value;
                      setLinks(newLinks);
                    }}
                    className="w-full p-2 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                    placeholder="Link URL"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex md:items-center max-md:items-start max-md:flex-col max-md:flex max-md:w-full gap-4">
            <input
              type="text"
              value={newLinkText}
              onChange={(e) => setNewLinkText(e.target.value)}
              className="flex-1 p-2 border border-[#E5E5E5] rounded-lg text-sm max-md:w-full text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
              placeholder="Enter link text"
            />
            <input
              type="url"
              value={newLinkUrl}
              onChange={(e) => setNewLinkUrl(e.target.value)}
              className="flex-1 p-2 border border-[#E5E5E5] rounded-lg text-sm max-md:w-full text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
              placeholder="Enter link URL"
            />
            <button
              type="button"
              onClick={addLink}
              className="px-4 py-2 bg-[#f5f5f5] border border-[#ddd] rounded text-sm hover:bg-[#eee] transition-colors"
            >
              Add Link
            </button>
          </div>
        </div>
        <div>
          <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
            Social Buttons
          </label>
          <div className="flex flex-col gap-3 mb-3">
            {socialButtons.map((button, index) => (
              <div
                key={index}
                className="flex items-center max-md:flex-col max-md:w-full gap-4 p-3 border border-[#E5E5E5] rounded-lg relative"
              >
                <button
                  type="button"
                  onClick={() => removeSocialButton(index)}
                  className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#f8f9fa] border border-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#e9ecef] hover:text-[#333]"
                >
                  ×
                </button>
                <div className="flex-1 max-md:w-full">
                  <input
                    type="text"
                    value={button.type}
                    onChange={(e) => {
                      const newButtons = [...socialButtons];
                      newButtons[index].type = e.target.value;
                      setSocialButtons(newButtons);
                    }}
                    className="w-full p-2 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                    placeholder="Social Platform (e.g., twitter)"
                  />
                </div>
                <div className="flex-1 max-md:w-full">
                  <input
                    type="url"
                    value={button.url}
                    onChange={(e) => {
                      const newButtons = [...socialButtons];
                      newButtons[index].url = e.target.value;
                      setSocialButtons(newButtons);
                    }}
                    className="w-full p-2 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                    placeholder="Social URL"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center max-md:w-full max-md:flex-col gap-4">
            <input
              type="text"
              value={newSocialType}
              onChange={(e) => setNewSocialType(e.target.value)}
              className="flex-1 p-2 border border-[#E5E5E5] max-md:w-full rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
              placeholder="Enter social platform"
            />
            <input
              type="url"
              value={newSocialUrl}
              onChange={(e) => setNewSocialUrl(e.target.value)}
              className="flex-1 p-2 border border-[#E5E5E5] max-md:w-full rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
              placeholder="Enter social URL"
            />
            <button
              type="button"
              onClick={addSocialButton}
              className="px-4 py-2 bg-[#f5f5f5] border max-md:w-full border-[#ddd] rounded text-sm hover:bg-[#eee] transition-colors"
            >
              Add Social Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
