"use client";

import React, { useRef, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase_utils/client";

interface AvatarUploadProps {
  defaultSrc?: string;
  onUploadComplete?: (url: string) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ defaultSrc, onUploadComplete }) => {
  const [avatarSrc, setAvatarSrc] = useState(defaultSrc || "");
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const supabase = createClient();

  // Завантажити поточний аватар з профілю
  useEffect(() => {
    const loadAvatar = async () => {
      if (defaultSrc) {
        setAvatarSrc(defaultSrc);
        return;
      }

      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();

        if (profile?.avatar_url) {
          setAvatarSrc(profile.avatar_url);
          setCurrentAvatarUrl(profile.avatar_url);
        }
      } catch (error) {
        console.error("Error loading avatar:", error);
      }
    };

    loadAvatar();
  }, [defaultSrc]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteAvatar = async () => {
    if (!currentAvatarUrl || !confirm("Are you sure you want to delete your avatar?")) {
      return;
    }

    try {
      setDeleting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please log in to delete avatar");
        return;
      }

      // Видалити файл з Storage
      try {
        const urlParts = currentAvatarUrl.split('/avatars/');
        if (urlParts.length > 1) {
          // Видалити query параметри якщо є
          const fileName = urlParts[1].split('?')[0];
          // Передаємо повний шлях, як він був завантажений
          const filePath = `avatars/${fileName}`;
          const { error: deleteError } = await supabase.storage
            .from("avatars")
            .remove([filePath]);
          
          if (deleteError) {
            console.warn("Could not delete avatar file:", deleteError);
            // Продовжуємо, навіть якщо видалення файлу не вдалося
          }
        }
      } catch (deleteError) {
        console.warn("Error deleting avatar file:", deleteError);
      }

      // Оновити профіль (встановити avatar_url в null)
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: null })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setAvatarSrc("");
      setCurrentAvatarUrl(null);
      
      // Сповістити інші компоненти про оновлення профілю
      window.dispatchEvent(new Event('profileUpdated'));
      alert("Avatar deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting avatar:", error);
      alert(`Failed to delete avatar: ${error.message}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    // Показати preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarSrc(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);

    // Завантажити в Supabase Storage
    try {
      setUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("Please log in to upload avatar");
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Завантажити файл
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Видалити старий файл з Storage (якщо він є)
      if (currentAvatarUrl) {
        try {
          // Витягнути шлях файлу з URL
          const urlParts = currentAvatarUrl.split('/avatars/');
          if (urlParts.length > 1) {
            // Видалити query параметри якщо є
            const oldFileName = urlParts[1].split('?')[0];
            // Передаємо повний шлях, як він був завантажений
            const oldFilePath = `avatars/${oldFileName}`;
            await supabase.storage
              .from("avatars")
              .remove([oldFilePath]);
          }
        } catch (deleteError) {
          console.warn("Could not delete old avatar file:", deleteError);
          // Не блокуємо завантаження, якщо видалення старого файлу не вдалося
        }
      }

      // Отримати публічний URL
      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Оновити профіль
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setAvatarSrc(publicUrl);
      setCurrentAvatarUrl(publicUrl);
      onUploadComplete?.(publicUrl);
      
      // Сповістити інші компоненти про оновлення профілю
      window.dispatchEvent(new Event('profileUpdated'));
      alert("Avatar uploaded successfully!");
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      alert(`Failed to upload avatar: ${error.message}`);
      // Повернути до попереднього стану
      if (defaultSrc) {
        setAvatarSrc(defaultSrc);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 rounded-full overflow-hidden border border-border-color bg-gray-100 flex-shrink-0">
        {avatarSrc && avatarSrc.trim() !== "" ? (
          <img
            src={avatarSrc}
            alt="Avatar Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No Avatar
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-text-muted mb-1">
          Recommended dimensions of 100x100
        </p>
        <div className="flex gap-3 items-center">
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={uploading || deleting}
            className="text-primary font-semibold text-sm hover:underline bg-none border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? "Uploading..." : "Upload Avatar"}
          </button>
          {avatarSrc && avatarSrc.trim() !== "" && (
            <button
              type="button"
              onClick={handleDeleteAvatar}
              disabled={deleting || uploading}
              className="text-red-600 font-semibold text-sm hover:underline bg-none border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting..." : "Delete Avatar"}
            </button>
          )}
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AvatarUpload;
