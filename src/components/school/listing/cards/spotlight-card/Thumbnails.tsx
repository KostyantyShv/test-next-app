import { useEffect, useRef, useState } from "react";
import { Project } from "./project.type";

interface ThumbnailsProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export default function Thumbnails({
  projects,
  onSelectProject,
}: ThumbnailsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const handleScrollLeft = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: -171, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ left: 171, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const updateButtonVisibility = () => {
      setShowLeftButton(wrapper.scrollLeft > 0);
      setShowRightButton(
        wrapper.scrollLeft < wrapper.scrollWidth - wrapper.clientWidth
      );
    };

    wrapper.addEventListener("scroll", updateButtonVisibility);
    updateButtonVisibility(); // Initial check

    return () => wrapper.removeEventListener("scroll", updateButtonVisibility);
  }, []);

  return (
    <div className="relative">
      <button
        className="absolute top-1/2 -translate-y-1/2 left-0 w-9 h-9 bg-white border-none rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-10"
        onClick={handleScrollLeft}
        style={{ display: showLeftButton ? "flex" : "none" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path
            d="M14 18l-5-6 5-6"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
          />
        </svg>
      </button>
      <div
        ref={wrapperRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth px-9 scrollbar-hide"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`relative w-[155px] h-[90px] rounded-lg overflow-hidden cursor-pointer flex-shrink-0 ${
              index === activeIndex ? "border-2 border-[#0B6333]" : ""
            }`}
            onClick={() => {
              setActiveIndex(index);
              onSelectProject(project);
            }}
          >
            <img
              className="w-full h-full object-cover"
              src={project.coverImage}
              alt={project.title}
            />
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 -translate-y-1/2 right-0 w-9 h-9 bg-white border-none rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] z-10"
        onClick={handleScrollRight}
        style={{ display: showRightButton ? "flex" : "none" }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
          <path
            d="M9 6l5 6-5 6"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinejoin="round"
            strokeLinecap="round"
            stroke="currentColor"
          />
        </svg>
      </button>
    </div>
  );
}
