import { RefObject } from "react";

interface ImageGallerySectionProps {
  images: string[];
  setImages: (images: string[]) => void;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function ImageGallerySection({
  images,
  setImages,
  inputRef,
}: ImageGallerySectionProps) {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target?.result) {
            newImages.push(ev.target.result as string);
            if (newImages.length === files.length) {
              setImages([...images, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
      e.target.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="border-b border-[#eee] pb-6 mb-6">
      <h3 className="text-lg font-semibold text-[#262B47] mb-4">
        Image Gallery
      </h3>
      <div className="grid grid-cols-4 gap-3 mb-3">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative pt-[75%] rounded-lg overflow-hidden border border-[#E5E5E5]"
          >
            <img
              src={src}
              alt="Project image"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#f8f9fa] border border-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#e9ecef] hover:text-[#333]"
            >
              ×
            </button>
          </div>
        ))}
        <div
          className="pt-[75%] bg-[#f8f9fa] border border-dashed border-[#E5E5E5] rounded-lg flex items-center justify-center cursor-pointer relative"
          onClick={() => inputRef.current?.click()}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
            <span>Add Image</span>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
      />
    </div>
  );
}
