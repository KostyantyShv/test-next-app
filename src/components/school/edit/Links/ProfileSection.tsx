"use client";
import { useState, useRef } from "react";

export const ProfileSection = () => {
  const [bannerSrc, setBannerSrc] = useState("https://i.ibb.co/640kJN2/c1.jpg");
  const [avatarSrc, setAvatarSrc] = useState(
    "https://i.ibb.co/2gV13mw/AVATAR-Kostis-Kapelonis.png"
  );
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSrc: (src: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-[350px] w-full max-md:hidden block bg-white rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
      <h1 className="text-[#262B3D] text-2xl font-semibold mb-3" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>Profile</h1>
      <p className="text-[#5F5F5F] text-base leading-6 mb-6">
        Customize your profile appearance and manage your bio links.
      </p>
      <div className="mb-6">
        <div className="w-full h-[120px] rounded-xl overflow postpone bg-[#F7FAFC] relative">
          <img
            src={bannerSrc}
            alt="Banner preview"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            onClick={() => bannerInputRef.current?.click()}
          >
            <span className="text-white text-2xl">📷</span>
          </div>
        </div>
        <input
          type="file"
          ref={bannerInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, setBannerSrc)}
        />
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden mt-[-50px] mx-auto bg-white border-4 border-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] relative">
          <img
            src={avatarSrc}
            alt="Avatar preview"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
            onClick={() => avatarInputRef.current?.click()}
          >
            <span className="text-white text-2xl">📷</span>
          </div>
        </div>
        <input
          type="file"
          ref={avatarInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, setAvatarSrc)}
        />
      </div>
    </div>
  );
};
