import { Project } from "./project.type";

interface FeaturedProjectProps {
  project: Project;
  openModal: () => void;
}

export default function FeaturedProject({
  project,
  openModal,
}: FeaturedProjectProps) {
  return (
    <div className="flex flex-col md:flex-row md:gap-6 mb-6 md:mb-8 w-full">
      <div
        onClick={openModal}
        className="relative cursor-pointer w-full h-[200px] md:w-[400px] md:h-[280px] rounded-lg overflow-hidden mb-4 md:mb-0"
      >
        <img
          className="w-full h-full object-cover"
          src={project.coverImage}
          alt="Project cover"
        />
        <div className="absolute bottom-3 right-3 bg-[rgba(255,255,255,0.9)] px-2 md:px-3 py-1 md:py-1.5 rounded-md flex items-center gap-1.5 text-[#5F5F5F] text-xs md:text-sm">
          <svg
            viewBox="0 0 16 12"
            fill="currentColor"
            className="w-3 md:w-4 h-2 md:h-3"
          >
            <path d="M14.5 0h-13A1.5 1.5 0 0 0 0 1.5v9A1.5 1.5 0 0 0 1.5 12h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 0m-.187 10.5H1.688a.19.19 0 0 1-.188-.187V1.688a.187.187 0 0 1 .188-.188h12.625a.19.19 0 0 1 .187.188v8.625a.19.19 0 0 1-.187.187M4 2.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5M3 9h10V6.5l-2.735-2.735a.375.375 0 0 0-.53 0L6 7.5 4.765 6.265a.375.375 0 0 0-.53 0L3 7.5z"></path>
          </svg>
          <span>{`${project.imageCount}+`}</span>
        </div>
      </div>
      <div className="flex-1">
        <div className="text-[#5F5F5F] text-xs md:text-sm mb-2 md:mb-3">{`From: ${project.date}`}</div>
        <h3
          onClick={openModal}
          className="text-[#464646] cursor-pointer hover:underline text-xl md:text-2xl font-semibold mb-2 md:mb-3 leading-tight md:leading-[1.3]"
        >
          {project.title}
        </h3>
        <p className="text-[#4A4A4A] text-sm md:text-[15px] leading-relaxed md:leading-[1.6] mb-3 md:mb-4 line-clamp-3">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4 md:mb-5">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-[#EBFCF4] text-[#016853] px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm"
            >
              {tag}
            </span>
          ))}
          <span className="bg-[#EBFCF4] text-[#016853] px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold">{`+${project.tagCount}`}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-0">
          <img
            className="w-9 md:w-10 h-9 md:h-10 rounded-full object-cover"
            src={project.authorAvatar}
            alt="Author avatar"
          />
          <span className="text-[#464646] text-sm md:text-[15px] font-medium">
            {project.authorName}
          </span>
        </div>
        <div className="flex gap-4 md:gap-6 mt-3 md:mt-4">
          <div className="flex flex-col">
            <span className="text-[#5F5F5F] text-xs md:text-sm mb-1">
              Project cost
            </span>
            <span className="text-[#1B1B1B] text-sm md:text-[15px] font-medium">
              {project.cost}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#5F5F5F] text-xs md:text-sm mb-1">
              Project duration
            </span>
            <span className="text-[#1B1B1B] text-sm md:text-[15px] font-medium">
              {project.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
