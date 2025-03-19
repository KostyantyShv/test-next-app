import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface GalleryDrawerProps {
  images: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeImageIndex: number;
  setActiveImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const PhotoGalleryMobile: React.FC<GalleryDrawerProps> = ({
  images,
  isOpen,
  setIsOpen,
  activeImageIndex,
  setActiveImageIndex,
}) => {
  const updateGalleryImage = (index: number) => {
    setActiveImageIndex(index);
  };

  return (
    <>
      <MobileDrawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-4 flex justify-center items-center relative border-b border-[#f0f0f0]">
          <h3 className="text-lg font-semibold text-[#464646]">
            Lincoln Academy
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#5F5F5F] p-1.5"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex flex-col relative">
          <div className="absolute top-0 right-4 text-[#4A4A4A] text-xs bg-white/80 py-1 px-2 rounded">
            <span>{activeImageIndex + 1}</span> of <span>{images.length}</span>
          </div>
          <div className="flex-1 flex justify-center items-center p-4 bg-[#f7f7f7]">
            <img
              src={images[activeImageIndex]}
              alt="School Photo"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <button
            onClick={() =>
              setActiveImageIndex(
                (prev) => (prev - 1 + images.length) % images.length
              )
            }
            className="absolute top-1/2 -translate-y-1/2 left-4 z-10 opacity-85 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:opacity-100"
          >
            <svg
              className="w-6 h-6 fill-[#1B1B1B] rotate-180"
              viewBox="0 0 49 48"
            >
              <path d="M20.6725 16.5389C19.7525 17.4589 20.1925 18.5989 20.8925 19.3189L25.5525 23.9789L20.8925 28.6389C20.1925 29.3389 19.7525 30.4789 20.6725 31.4189C21.6325 32.3789 22.7325 31.8989 23.4525 31.1989L30.6525 23.9989L30.6325 23.9789L30.6525 23.9589L23.4525 16.7589C22.7325 16.0589 21.6325 15.5789 20.6725 16.5389Z" />
            </svg>
          </button>
          <button
            onClick={() =>
              setActiveImageIndex((prev) => (prev + 1) % images.length)
            }
            className="absolute top-1/2 -translate-y-1/2 right-4 z-10 opacity-85 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:opacity-100"
          >
            <svg className="w-6 h-6 fill-[#1B1B1B]" viewBox="0 0 49 48">
              <path d="M20.6725 16.5389C19.7525 17.4589 20.1925 18.5989 20.8925 19.3189L25.5525 23.9789L20.8925 28.6389C20.1925 29.3389 19.7525 30.4789 20.6725 31.4189C21.6325 32.3789 22.7325 31.8989 23.4525 31.1989L30.6525 23.9989L30.6325 23.9789L30.6525 23.9589L23.4525 16.7589C22.7325 16.0589 21.6325 15.5789 20.6725 16.5389Z" />
            </svg>
          </button>
          <div className="flex gap-3 p-4 overflow-x-auto bg-white scrollbar-hide">
            {images.map((src, index) => (
              <div
                key={index}
                onClick={() => updateGalleryImage(index)}
                className={`w-[50px] h-[50px] cursor-pointer rounded-full overflow-hidden border-2 ${
                  activeImageIndex === index
                    ? "border-[#089E68]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </MobileDrawer>
    </>
  );
};

export default PhotoGalleryMobile;
