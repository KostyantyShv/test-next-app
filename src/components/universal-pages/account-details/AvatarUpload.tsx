import React, { useRef, useState } from "react";

interface AvatarUploadProps {
  defaultSrc: string;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ defaultSrc }) => {
  const [avatarSrc, setAvatarSrc] = useState(defaultSrc);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatarSrc(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <div className="w-20 h-20 rounded-full overflow-hidden border border-border-color bg-gray-100 flex-shrink-0">
        <img
          src={avatarSrc}
          alt="Avatar Preview"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <p className="text-xs text-text-muted mb-1">
          Recommended dimensions of 100x100
        </p>
        <button
          type="button"
          onClick={handleUploadClick}
          className="text-primary font-semibold text-sm hover:underline bg-none border-none cursor-pointer"
        >
          Upload Avatar
        </button>
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
