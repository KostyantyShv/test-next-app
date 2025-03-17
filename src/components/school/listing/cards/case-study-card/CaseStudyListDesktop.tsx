import { useState, useEffect } from "react";

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
  tags: string[];
}

interface CaseStudyListProps {
  onViewClick: (id: number) => void;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Digital Transformation Initiative",
    description:
      "Led a comprehensive digital transformation project for a leading consulting firm, focusing on modernizing their workforce solutions platform and implementing cutting-edge..",
    date: "Sep 20, 2024",
    image: "https://i.ibb.co/J8QjpbD/school1.webp",
    tags: ["Digital", "Enterprise"],
  },
  {
    id: 2,
    title: "EduLearn Platform Evolution",
    description:
      "Spearheaded the redesign and optimization of an educational technology platform, resulting in a 75% increase in organic traffic and significantly improved user engagement metrics across all key performance indicators.",
    date: "Aug 15, 2024",
    image: "https://i.ibb.co/fVRCnNZY/school2.webp",
    tags: ["EdTech"],
  },
];

export default function CaseStudyListDesktop({
  onViewClick,
}: CaseStudyListProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    updateCaseStudy(0);
  }, []);

  const updateCaseStudy = (index: number) => {
    setCurrentIndex(index);
  };

  const currentStudy = caseStudies[currentIndex];

  return (
    <>
      <h2 className="text-[#464646] text-2xl font-semibold mb-20 font-system">
        Case Studies
      </h2>
      <div className="bg-gradient-to-br from-[#016853] to-[#089E68] rounded-[20px] p-8 flex relative min-h-[280px] mb-6">
        <svg
          className="absolute bottom-[-30%] left-[-10%] w-[120%] h-[120%] pointer-events-none opacity-15 rotate-[15deg]"
          viewBox="0 0 800 600"
        >
          <defs>
            <linearGradient
              id="circleGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#244fe7", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#0a0e5c", stopOpacity: 0.1 }}
              />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="250"
            r="250"
            stroke="url(#circleGradient)"
            strokeWidth="180"
            fill="none"
          />
        </svg>

        <div className="w-[395px] h-[280px] rounded-[20px] relative border-4 border-white/20 shadow-lg -translate-y-[30%] z-10 overflow-hidden">
          <img
            src={currentStudy.image}
            alt="Case Study"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 pl-8 text-white mt-[-32px]">
          <h3 className="text-3xl font-semibold mb-4">{currentStudy.title}</h3>
          <p className="text-base leading-relaxed opacity-90 max-w-[600px]">
            {currentStudy.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-sm opacity-80">{currentStudy.date}</span>
            <div className="flex gap-3">
              {currentStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/20 px-4 py-1.5 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-[-20px]">
          <button
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-transform pointer-events-auto absolute -left-5 z-10 ${
              currentIndex === 0 ? "hidden" : ""
            }`}
            onClick={() => updateCaseStudy(currentIndex - 1)}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                d="M15 18L9 12L15 6"
                stroke="#1B1B1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md transition-transform pointer-events-auto absolute -right-5 z-10 ${
              currentIndex === caseStudies.length - 1 ? "hidden" : ""
            }`}
            onClick={() => updateCaseStudy(currentIndex + 1)}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                d="M9 18L15 12L9 6"
                stroke="#1B1B1B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-2 mb-6">
        {caseStudies.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
              i === currentIndex ? "bg-[#0B6333] scale-125" : "bg-[#DFDDDB]"
            }`}
            onClick={() => updateCaseStudy(i)}
          />
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-[#E0E0E0]">
        <div className="flex justify-end gap-6">
          <button
            className="flex items-center gap-2 text-[#4A4A4A] font-medium text-base hover:text-[#016853] transition-colors"
            onClick={() => onViewClick(currentStudy.id)}
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.38189 10C5.24313 12.9154 7.45153 14.25 10 14.25C12.5485 14.25 14.7569 12.9154 16.6181 10C14.7569 7.0846 12.5485 5.75 10 5.75C7.45153 5.75 5.24313 7.0846 3.38189 10ZM1.85688 9.61413C3.94664 6.13119 6.65833 4.25 10 4.25C13.3417 4.25 16.0534 6.13119 18.1431 9.61413C18.2856 9.85164 18.2856 10.1484 18.1431 10.3859C16.0534 13.8688 13.3417 15.75 10 15.75C6.65833 15.75 3.94664 13.8688 1.85688 10.3859C1.71437 10.1484 1.71437 9.85164 1.85688 9.61413ZM8.29116 8.29116C8.74437 7.83795 9.35906 7.58333 10 7.58333C10.6409 7.58333 11.2556 7.83795 11.7088 8.29116C12.1621 8.74437 12.4167 9.35906 12.4167 10C12.4167 10.6409 12.1621 11.2556 11.7088 11.7088C11.2556 12.1621 10.6409 12.4167 10 12.4167C9.35906 12.4167 8.74437 12.1621 8.29116 11.7088C7.83795 11.2556 7.58333 10.6409 7.58333 10C7.58333 9.35906 7.83795 8.74437 8.29116 8.29116Z"
                fill="currentColor"
              />
            </svg>
            View
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-[#4A4A4A] text-base font-medium transition-colors hover:text-[#016853]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M6 15a.75.75 0 01.75.75v.75c0 .414.336.75.75.75h9a.75.75 0 00.75-.75v-.75a.75.75 0 011.5 0v.75a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-.75A.75.75 0 016 15z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
              <path
                fill="currentColor"
                d="M8.47 10.72a.75.75 0 011.06 0L12 13.19l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
              <path
                fill="currentColor"
                d="M12 5.25a.75.75 0 01.75.75v7.875a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75z"
                clipRule="evenodd"
                fillRule="evenodd"
              />
            </svg>
            Download
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-[#4A4A4A] text-base font-medium transition-colors hover:text-[#016853]">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6c.6.8 1.6 1.4 2.8 1.4 1.9 0 3.4-1.6 3.4-3.5 0-2-1.5-3.5-3.4-3.5s-3.5 1.5-3.5 3.5c0 .3 0 .6.1.9L7.1 7.7l-.2.1c-.7-.7-1.6-1.2-2.7-1.2C2.3 6.6.7 8.1.7 10s1.5 3.5 3.5 3.5c1 0 1.9-.4 2.6-1.1l5.6 3c-.1.3-.1.5-.1.8 0 1.9 1.6 3.4 3.5 3.4s3.4-1.5 3.4-3.5-1.5-3.4-3.4-3.4c-1.2 0-2.2.6-2.9 1.5l-5.3-2.8-.2-.1c.1-.4.2-.8.2-1.2s-.1-.8-.2-1.1zm2.8-4.1c1.1 0 2.1 1 2.1 2.1.1 1-.9 2-2.1 2s-2.1-1-2.1-2.1 1-2 2.1-2M4.2 12.1c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1S6.3 9 6.3 10s-1 2.1-2.1 2.1m11.6 6.1c-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1-.9 2.1-2.1 2.1" />
            </svg>
            Share
          </button>
        </div>
      </div>
    </>
  );
}
