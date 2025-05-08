import { CaseStudy } from "./types/caseStudy";

interface GallerySectionProps {
  formData: Omit<CaseStudy, "id" | "pinned">;
  setFormData: React.Dispatch<
    React.SetStateAction<Omit<CaseStudy, "id" | "pinned">>
  >;
}

export default function GallerySection({
  formData,
  setFormData,
}: GallerySectionProps) {
  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = () =>
          setFormData((prev) => ({
            ...prev,
            gallery: [...prev.gallery, reader.result as string],
          }));
        reader.readAsDataURL(file);
      });
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-[#f8f9fa] p-5 rounded-lg">
      <label className="block text-sm font-semibold text-[#4A4A4A] mb-2">
        Gallery Images
      </label>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {formData.gallery.map((image, index) => (
          <div
            key={index}
            className="relative pt-[75%] rounded-lg overflow-hidden border border-[#E5E5E5]"
          >
            <img
              src={image}
              alt="Gallery Image"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[rgba(255,255,255,0.8)] flex items-center justify-center cursor-ponter text-[#f93a37] text-sm"
            >
              ×
            </div>
          </div>
        ))}
        <div
          onClick={() => document.getElementById("galleryImageInput")?.click()}
          className="relative pt-[75%] rounded-lg border border-dashed border-[#E5E5E5] bg-[#f5f5f5] cursor-pointer hover:bg-[#eee] transition-colors"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#4A4A4A]">
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772  personally 4"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
            <span>Add Image</span>
          </div>
        </div>
      </div>
      <input
        id="galleryImageInput"
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleAddImages}
      />
    </div>
  );
}
