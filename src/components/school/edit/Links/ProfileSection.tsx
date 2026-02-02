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
    <div className="profile-section max-md:hidden block">
      <h1 className="section-title">Profile</h1>
      <p className="section-description">
        Customize your profile appearance and manage your bio links.
      </p>

      <div className="profile-upload">
        <div className="banner-preview" id="bannerPreview">
          <img src={bannerSrc} alt="Banner preview" />
          <div
            className="upload-overlay"
            onClick={() => bannerInputRef.current?.click()}
          >
            <span className="upload-icon">📷</span>
          </div>
        </div>
        <input
          type="file"
          ref={bannerInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, setBannerSrc)}
        />

        <div className="avatar-preview" id="avatarPreview">
          <img src={avatarSrc} alt="Avatar preview" />
          <div
            className="upload-overlay"
            onClick={() => avatarInputRef.current?.click()}
          >
            <span className="upload-icon">📷</span>
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
