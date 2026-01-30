import React, { useRef, useState } from "react";
import Image from "next/image";
import { School } from "./types";
import { SchoolCardIcons } from './SchoolCardIcons';
import { MobileOptionsDrawer } from './MobileOptionsDrawer';
import { SchoolCardContextMenu } from './SchoolCardContextMenu';
import { useSchoolsExplore } from "@/store/use-schools-explore";
import { Portal } from "@/components/ui/Portal";

interface SchoolCardProps {
  school: School;
  layout: string;
}

const getGradeClass = (grade: string): string => {
  switch (grade) {
    case "A+":
      return "bg-[#00DF8B]";
    case "A":
      return "bg-[#1ad598]";
    case "B+":
      return "bg-[#4CAF50]";
    case "B":
      return "bg-[#8BC34A]";
    case "C+":
      return "bg-[#FFC107]";
    default:
      return "bg-[#FFC107]";
  }
};

const SchoolCard: React.FC<SchoolCardProps> = ({ school, layout }) => {
  const { establishment } = useSchoolsExplore((state) => state);
  const [isLiked, setIsLiked] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const isListLayout = layout === "list";
  const isGridLayout = layout === "grid";
  const isHybridLayout = layout === "hybrid";
  const isClassicLayout = layout === "classic";
  const showHoverOverlay = layout === "grid" || layout === "classic";

  // Grid Layout (6.5) — match provided HTML structure/styles 1:1
  if (isGridLayout) {
    type MobileStat = { icon: React.ReactNode; value: string; boldPrefix?: string };

    const truncateName = (name: string) => {
      if (!name) return "";
      if (name.length > 30) {
        const truncated = name.substring(0, 28);
        const lastSpace = truncated.lastIndexOf(" ");
        return `${truncated.substring(0, lastSpace > 0 ? lastSpace : truncated.length)}..`;
      }
      return name;
    };

    const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount = typeof school.reviews === "number"
      ? school.reviews
      : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    const secondStat = (() => {
      if (establishment === "Colleges" || establishment === "Graduates") {
        return { icon: <SchoolCardIcons.Duration />, value: school.duration || school.ratio };
      }
      // K-12 / District (matches current data model)
      return { icon: <SchoolCardIcons.Ratio />, value: school.ratio };
    })();

    const footerStat = (() => {
      if (establishment === "Colleges") {
        return { icon: <SchoolCardIcons.SAT />, label: `SAT: ${school.sat || "N/A"}` };
      }
      return { icon: <SchoolCardIcons.Students />, label: `Students: ${school.students}` };
    })();

    const hoverStat2 = (() => {
      if (establishment === "Colleges") {
        return { icon: <SchoolCardIcons.Acceptance />, label: `Accpt: ${school.acceptanceRate || "—"}` };
      }
      return { icon: <SchoolCardIcons.Grades />, label: school.grades };
    })();

    const hoverTuition = (() => {
      // In provided HTML: K-12/College use "/yr"
      const needsPerYear = establishment === "K-12" || establishment === "Colleges";
      if (!needsPerYear) return school.price;
      return school.price?.includes("/") ? school.price : `${school.price}/yr`;
    })();

    const mobileStats: MobileStat[] = (() => {
      // Mobile HTML (7): 4 stats in 2 columns
      const base: MobileStat[] = [
        { icon: <SchoolCardIcons.Location />, value: school.location },
      ];

      if (establishment === "Colleges") {
        return [
          ...base,
          { icon: <SchoolCardIcons.Duration />, value: school.duration || "N/A" },
          { icon: <SchoolCardIcons.SAT />, value: school.sat || "N/A" },
          { icon: <SchoolCardIcons.Star className="w-[14px] h-[14px] text-[#565656]" />, value: `${ratingNum} (${reviewsCount})`, boldPrefix: ratingNum },
        ];
      }

      // K-12 / District / Graduates
      return [
        ...base,
        { icon: <SchoolCardIcons.Ratio />, value: school.ratio },
        { icon: <SchoolCardIcons.Students />, value: school.students },
        { icon: <SchoolCardIcons.Star className="w-[14px] h-[14px] text-[#565656]" />, value: `${ratingNum} (${reviewsCount})`, boldPrefix: ratingNum },
      ];
    })();

    return (
      <div
        className="school-card group bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-in-out border border-[#E5E7EB] relative flex flex-col hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
      >
        {/* Specialty badge (full-width, top) */}
        {school.specialty && (
          <div
            className={`specialty-badge hidden md:flex absolute top-0 left-0 right-0 px-3 py-2 text-xs font-medium items-center gap-1.5 rounded-t-xl z-[5] ${
              school.specialty === "hot"
                ? "bg-[rgba(255,77,77,0.1)] text-[#FF4D4D]"
                : school.specialty === "instant-book"
                ? "bg-[rgba(29,119,189,0.1)] text-[#1D77BD]"
                : "bg-[rgba(255,153,0,0.1)] text-[#FF9900]"
            }`}
          >
            {school.specialty === "hot" ? <SchoolCardIcons.Hot /> : null}
            {school.specialty === "instant-book" ? <SchoolCardIcons.InstantBook /> : null}
            {school.specialty === "sponsored" ? <SchoolCardIcons.Sponsored /> : null}
            {school.specialtyLabel ||
              (school.specialty === "hot"
                ? "High demand"
                : school.specialty === "instant-book"
                ? "Instant book"
                : "Sponsored")}
          </div>
        )}

        {/* Desktop (md+) — HTML 6.5 layout */}
        <div className="hidden md:block">
          <div className="card-header pt-10 pb-3 px-4 pr-[26px] flex gap-4 items-start mt-0">
            <Image
              src={school.avatar || school.image}
              alt={school.name}
              width={72}
              height={48}
              className="school-thumbnail w-[72px] h-12 rounded-lg object-cover shrink-0"
            />
            <div className="school-info flex-1 flex flex-col w-full max-w-[calc(100%-10px)] overflow-hidden">
              <div className="school-name text-base font-semibold text-[#464646] mb-1 leading-[1.3] cursor-pointer hover:text-[#016853] hover:underline hover:decoration-[#016853] transition-colors line-clamp-2 min-h-[2.6em] overflow-hidden">
                <span>{truncateName(school.name)}</span>
                {school.name?.trim().split(/\s+/).filter(Boolean).length < 3 ? (
                  <span className="opacity-0 select-none" aria-hidden="true">
                    {" "}placeholder placeholder placeholder
                  </span>
                ) : null}
              </div>
              {school.ranking ? (
                <div className="ranking-text text-[#089E68] text-xs font-medium leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  {school.ranking}
                </div>
              ) : null}

              <div className="school-type-badge flex items-center gap-1.5 px-2 py-1 rounded-2xl text-xs font-medium bg-[#E5E7EB] text-[#464646] mt-2 w-fit">
                <SchoolCardIcons.TotalSchools />
                {school.schoolType}
              </div>
            </div>
          </div>

          <div className="school-content p-4 flex-grow">
            <div className="school-stats flex flex-wrap gap-3 mb-4">
              <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] tracking-[0.01em] font-[450]">
                <SchoolCardIcons.Location />
                <span className="text-[#464646]">{school.location}</span>
              </div>
              <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] tracking-[0.01em] font-[450]">
                {secondStat.icon}
                <span className="text-[#464646]">{secondStat.value}</span>
              </div>
              <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] tracking-[0.01em] font-[450]">
                <SchoolCardIcons.Star className="w-4 h-4 text-[#565656]" />
                <span className="text-[#464646]">
                  <span className="stat-bold font-semibold">{ratingNum}</span> ({reviewsCount})
                </span>
              </div>
            </div>
          </div>

          <div className="school-footer py-3 px-4 border-t border-[rgba(1,104,83,0.1)] flex items-center justify-between h-[54px] relative z-20 bg-white overflow-hidden">
            <div className="footer-left flex items-center gap-3 min-w-0">
              <div
                className={`grade-circle w-8 h-8 ${getGradeClass(
                  school.grade
                )} rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0`}
              >
                {school.grade}
              </div>
              <div className="footer-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] min-w-0 overflow-hidden whitespace-nowrap">
                <span className="text-[#089E68]">{footerStat.icon}</span>
                <span className="text-[#5F5F5F] truncate">{footerStat.label}</span>
              </div>
            </div>

            <div className="footer-actions flex gap-2 shrink-0">
              <div
                className={`like-indicator w-7 h-7 flex items-center justify-center cursor-pointer ${
                  isLiked ? "text-[#298541]" : "text-[#5F5F5F]"
                }`}
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked((v) => !v);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsLiked((v) => !v);
                  }
                }}
                aria-pressed={isLiked}
              >
                <SchoolCardIcons.Heart filled={isLiked} />
              </div>
              <SchoolCardContextMenu
                schoolName={school.name}
                buttonClassName="options-button w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all hover:text-[#346DC2] hover:bg-[#e8e8e8] pointer-events-auto"
              />
            </div>
          </div>
        </div>

        {/* Mobile (<md) — HTML Mobile (10) layout 1:1 */}
        <div className="md:hidden">
          <div className="image-container relative w-full h-[140px] overflow-hidden">
            <button
              type="button"
              className="options-button absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer text-[#4A4A4A] transition-all z-[2] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#f5f5f5]"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDrawerOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsDrawerOpen(true);
                }
              }}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>

            {school.specialty && (
              <div
                className={`specialty-label absolute top-2 left-0 h-7 bg-white rounded-r-[14px] flex items-center px-[10px] z-[2] text-[11px] font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${
                  school.specialty === "hot"
                    ? "text-[#FF4D4D]"
                    : school.specialty === "instant-book"
                      ? "text-[#1D77BD]"
                      : "text-[#FF9900]"
                }`}
              >
                <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] mr-1 flex items-center">
                  {school.specialty === "hot" ? <SchoolCardIcons.Hot /> : null}
                  {school.specialty === "instant-book" ? <SchoolCardIcons.InstantBook /> : null}
                  {school.specialty === "sponsored" ? <SchoolCardIcons.Sponsored /> : null}
                </span>
                {school.specialtyLabel ||
                  (school.specialty === "hot"
                    ? "High demand"
                    : school.specialty === "instant-book"
                      ? "Instant book"
                      : "Sponsored")}
              </div>
            )}

            <Image
              src={school.image}
              alt={school.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="school-image object-cover"
            />

            <div className="school-type-label absolute bottom-0 left-2.5 bg-white px-2 pt-1 text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-md h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
              {school.schoolType}
            </div>
          </div>

          <div className="school-content p-3">
            {school.ranking ? (
              <div className="ranking-text text-[#089E68] text-[13px] whitespace-nowrap overflow-hidden text-ellipsis font-medium max-w-full">
                {school.ranking}
              </div>
            ) : null}

            <h3 className="school-name text-[16px] font-semibold text-[#464646] leading-[1.4] mt-1 mb-1.5 line-clamp-3">
              {school.name}
            </h3>

            <div className="school-stats flex flex-wrap gap-2 mb-3">
              <div className="stat flex items-center gap-[6px] text-[13px] text-[#5F5F5F] tracking-[0.01em] font-[450]">
                <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656]">
                  <SchoolCardIcons.Location />
                </span>
                <span>{school.location}</span>
              </div>

              <div className="stat flex items-center gap-[6px] text-[13px] text-[#5F5F5F] tracking-[0.01em] font-[450]">
                <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656]">
                  {secondStat.icon}
                </span>
                <span>{secondStat.value}</span>
              </div>

              <div className="stat flex items-center gap-[6px] text-[13px] text-[#5F5F5F] tracking-[0.01em] font-[450]">
                <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656]">
                  <SchoolCardIcons.Star />
                </span>
                <span>
                  <strong className="font-semibold text-[#444444]">{ratingNum}</strong>{" "}
                  ({reviewsCount})
                </span>
              </div>
            </div>

            <div className="school-footer flex items-center justify-between px-3 py-[10px] border-t border-[#E5E7EB] bg-[#F4F6FA] rounded-b-xl">
              <div className={`grade-circle w-7 h-7 ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-xs font-semibold`}>
                {school.grade}
              </div>

              <div className="flex items-center">
                <div className="students-score flex items-center gap-[6px] text-[12px] text-[#5F5F5F]">
                  <span className="[&>svg]:w-4 [&>svg]:h-4 text-[#089E68]">
                    {footerStat.icon}
                  </span>
                  <span>{footerStat.label}</span>
                </div>

                <button
                  type="button"
                  className="info-button w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] ml-2 transition-all hover:text-[#346DC2]"
                  onClick={(e) => { e.stopPropagation(); setIsInfoOpen(true); }}
                  aria-label="More info"
                >
                  <svg fill="none" viewBox="0 0 20 20" width="18" height="18">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 6V10" />
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 13.1094H10.0067" />
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Info Drawer (HTML 7 behavior) */}
          {isInfoOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-[100]"
                onClick={() => setIsInfoOpen(false)}
              />
              <div className="fixed bottom-0 left-2 right-2 z-[101] bg-white rounded-t-[20px] shadow-[0_-2px_10px_rgba(0,0,0,0.15)] max-h-[90vh] overflow-hidden flex flex-col">
                <div className="sticky top-0 bg-white px-5 py-4 border-b border-[#e5e7eb] flex justify-between items-start">
                  <div className="text-[18px] font-semibold text-[#1B1B1B] flex items-start gap-3">
                    <Image src={school.avatar || school.image} alt={school.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
                    <span className="leading-[1.3]">{school.name}</span>
                  </div>
                  <button
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#5F5F5F] hover:bg-[#F5F5F7] hover:text-[#464646]"
                    onClick={() => setIsInfoOpen(false)}
                    type="button"
                  >
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div className="p-4 overflow-y-auto flex-grow bg-white">
                  <div className="flex flex-wrap gap-x-4 gap-y-3 mb-4">
                    <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]"><SchoolCardIcons.Tuition /></span>
                      <span>{hoverTuition}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{hoverStat2.icon}</span>
                      <span>{hoverStat2.label}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-[1.6] text-[#4A4A4A] mb-4">{school.description}</p>
                  <div className="text-[13px] font-semibold text-[#346DC2] mb-4 cursor-pointer hover:underline">
                    Read {reviewsCount} reviews
                  </div>
                </div>
                <div className="p-4 border-t border-[#e5e7eb] flex justify-center gap-3 bg-white sticky bottom-0">
                  <button className="flex-1 py-3 rounded-lg text-sm font-medium bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]" type="button">
                    More Info
                  </button>
                  <button
                    className={`flex-1 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 ${
                      isLiked ? "bg-[#298541] text-white" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                    }`}
                    onClick={() => setIsLiked((v) => !v)}
                    type="button"
                  >
                    <SchoolCardIcons.Heart />
                    {isLiked ? "Liked" : "Like"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Hover overlay (desktop only) */}
        {showHoverOverlay && (
          <div className="hover-overlay hidden md:flex absolute inset-0 bg-[rgba(255,255,255,0.98)] pt-6 pr-6 pb-3 pl-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 flex-col z-10 rounded-t-xl">
            <div className="hover-header flex gap-3 mb-3">
              <Image
                src={school.avatar || school.image}
                alt={school.name}
                width={40}
                height={40}
                className="school-avatar w-10 h-10 rounded-lg object-cover"
              />
              <div className="hover-school-name text-base font-semibold text-[#464646] mr-2 flex-1 cursor-pointer transition-all hover:text-[#346DC2] hover:underline hover:decoration-[#346DC2]">
                {school.name}
              </div>
            </div>

            <div className="hover-stats flex gap-3 mb-4">
              <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                <span className="text-[#089E68]">
                  <SchoolCardIcons.Tuition />
                </span>
                <span>{hoverTuition}</span>
              </div>
              <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                <span className="text-[#089E68]">{hoverStat2.icon}</span>
                <span>{hoverStat2.label}</span>
              </div>
            </div>

            <p className="description text-sm leading-[1.6] text-[#4A4A4A] overflow-hidden mb-3 line-clamp-5">
              {school.description}
            </p>

            <div className="review-count text-[13px] font-semibold text-[#346DC2] mb-4 cursor-pointer hover:underline">
              Read {reviewsCount} reviews
            </div>

            <div className="hover-buttons flex flex-row gap-2 mt-auto">
              <button
                className="hover-button w-full py-3 px-3 rounded-lg text-sm font-medium cursor-pointer bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                More Info
              </button>
            </div>
          </div>
        )}

        {/* Mobile Options Drawer */}
        <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
      </div>
    );
  }

  // Note: Grid layout uses an early return above (HTML 6.5 exact layout).

  // Hybrid Layout (8) — match provided HTML structure/styles
  if (isHybridLayout) {
    const category = (() => {
      if (establishment === "K-12") return "k12";
      if (establishment === "Colleges") return "college";
      if (establishment === "Graduates") return "graduate";
      if (establishment === "District") return "district";
      if ((school as any).totalSchools) return "district";
      if (school.sat || school.acceptanceRate) return "college";
      if ((school as any).medianSalary) return "graduate";
      return "k12";
    })();

    const stats = (() => {
      if (category === "k12") {
        return [
          { tooltip: "Location", icon: <SchoolCardIcons.Location />, value: school.location },
          { tooltip: "Student-Teacher Ratio", icon: <SchoolCardIcons.Ratio />, value: school.ratio || (school as any).studentTeacherRatio },
          { tooltip: "Students", icon: <SchoolCardIcons.Students />, value: school.students },
          { tooltip: "Tuition", icon: <SchoolCardIcons.Tuition />, value: school.price },
          { tooltip: "Grades", icon: <SchoolCardIcons.Grades />, value: school.grades ? `Grades ${school.grades}` : "" },
        ];
      }
      if (category === "college") {
        return [
          { tooltip: "Location", icon: <SchoolCardIcons.Location />, value: school.location },
          { tooltip: "Duration", icon: <SchoolCardIcons.Duration />, value: school.duration },
          { tooltip: "Tuition", icon: <SchoolCardIcons.Tuition />, value: school.price },
          { tooltip: "SAT Score", icon: <SchoolCardIcons.SAT />, value: school.sat ? `SAT: ${school.sat}` : "" },
          { tooltip: "Acceptance Rate", icon: <SchoolCardIcons.Acceptance />, value: school.acceptanceRate ? `Accpt: ${school.acceptanceRate}` : "" },
        ];
      }
      if (category === "district") {
        return [
          { tooltip: "Location", icon: <SchoolCardIcons.Location />, value: school.location },
          { tooltip: "Total Schools", icon: <SchoolCardIcons.TotalSchools />, value: (school as any).totalSchools },
          { tooltip: "Students", icon: <SchoolCardIcons.Students />, value: school.students },
          { tooltip: "Student-Teacher Ratio", icon: <SchoolCardIcons.Ratio />, value: school.ratio || (school as any).studentTeacherRatio },
          { tooltip: "Grades", icon: <SchoolCardIcons.Grades />, value: school.grades ? `Grades ${school.grades}` : "" },
        ];
      }
      // graduate
      return [
        { tooltip: "Location", icon: <SchoolCardIcons.Location />, value: school.location },
        { tooltip: "Duration", icon: <SchoolCardIcons.Duration />, value: school.duration },
        { tooltip: "Students", icon: <SchoolCardIcons.Students />, value: school.students },
        { tooltip: "Tuition", icon: <SchoolCardIcons.Tuition />, value: school.price },
        { tooltip: "Median Salary", icon: <SchoolCardIcons.MedianSalary />, value: (school as any).medianSalary ? `~${(school as any).medianSalary}` : "" },
      ];
    })().filter((s) => Boolean(s.value));

    const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount = typeof school.reviews === "number"
      ? school.reviews
      : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    const specialtyFooter = (() => {
      if (!school.specialty) return null;
      const cls = school.specialty === "hot"
        ? "bg-[#FFEBEB] text-[#FF4D4D]"
        : school.specialty === "instant-book"
          ? "bg-[#E6F1FA] text-[#1D77BD]"
          : "bg-[#FFF4E5] text-[#FF9900]";
      const label = school.specialty === "hot" ? "Hot" : school.specialty === "instant-book" ? "Book" : "Ad";
      return (
        <div className={`specialty-footer w-full text-[11px] font-semibold text-center py-1 rounded-b-lg flex items-center justify-center gap-1 ${cls}`}>
          {school.specialty === "hot" ? <SchoolCardIcons.Hot /> : null}
          {school.specialty === "instant-book" ? <SchoolCardIcons.InstantBook /> : null}
          {school.specialty === "sponsored" ? <SchoolCardIcons.Sponsored /> : null}
          {label}
        </div>
      );
    })();

    return (
      <div className="school-card flex flex-col max-[768px]:flex-col min-[577px]:flex-row p-5 border border-[rgba(0,0,0,0.08)] rounded-xl transition-all duration-200 ease-in-out relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:border-[rgba(1,104,83,0.2)]">
        <div
          className={`image-container relative w-full shrink-0 flex flex-col ${
            school.specialty ? "has-specialty" : ""
          } max-[768px]:mb-4 min-[577px]:w-[60px] min-[577px]:h-[60px] min-[577px]:mr-4 min-[577px]:mb-0 md:mr-5`}
        >
          <Image
            src={school.image}
            alt={school.name}
            width={640}
            height={360}
            className={`school-image w-full h-[160px] object-cover max-[768px]:h-[160px] min-[577px]:w-[60px] min-[577px]:h-[60px] ${
              school.specialty ? "rounded-t-lg rounded-b-none" : "rounded-lg"
            }`}
          />
          {school.specialty ? specialtyFooter : null}
        </div>

        <div className="school-type-label absolute bg-[rgba(1,104,83,0.1)] text-[#016853] px-2 py-1 rounded-md text-[10px] font-semibold tracking-[0.02em] uppercase z-[2] top-3 left-3 min-[577px]:top-0 min-[577px]:left-[89px] md:top-5 md:left-[98px]">
          {school.schoolType}
        </div>

        <div className="school-content flex-1 flex flex-col pt-5">
          {school.ranking ? (
            <div className="ranking-text text-[#089E68] text-[13px] mb-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis mt-2 max-w-[calc(100%-20px)]">
              {school.ranking}
            </div>
          ) : null}

          <div className="school-header flex items-start justify-between mb-1">
            <div className="school-name-container flex items-start gap-1.5 max-w-[calc(100%-40px)]">
              <div className="school-name text-base font-semibold text-[#464646] leading-[1.4] max-h-[2.8em] overflow-hidden line-clamp-2 cursor-pointer hover:text-[#016853] transition-colors">
                {school.name}
              </div>
              {school.verified ? (
                <span className="verified-badge inline-flex items-center justify-center ml-1 shrink-0 mt-1">
                  <SchoolCardIcons.Verified />
                </span>
              ) : null}
            </div>

            <div className="actions flex items-center">
              {/* Mobile: Drawer. Desktop: Context menu */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="more-options w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-colors mt-[-3px] hover:bg-[#F5F5F7] hover:text-[#464646]"
                  onClick={() => setIsDrawerOpen(true)}
                >
                  <SchoolCardIcons.MoreOptions />
                </button>
              </div>
              <div className="hidden md:block">
                <SchoolCardContextMenu
                  schoolName={school.name}
                  buttonClassName="more-options w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-colors mt-[-3px] hover:bg-[#F5F5F7] hover:text-[#464646] pointer-events-auto"
                />
              </div>
            </div>
          </div>

          <div className="school-stats flex flex-wrap gap-4 mb-3">
            {stats.map((s, idx) => (
              <div key={idx} className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] relative" data-tooltip={s.tooltip}>
                <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656]">
                  {s.icon}
                </span>
                <span className="text-[#464646] font-medium">
                  {/* optional prefixes (hidden below ~1150px like the HTML) */}
                  {s.tooltip === "Students" ? (
                    <>
                      <span className="stat-prefix max-[1149px]:hidden">Students: </span>
                      {s.value}
                    </>
                  ) : s.tooltip === "Student-Teacher Ratio" ? (
                    <>
                      <span className="stat-prefix max-[1149px]:hidden">Ratio: </span>
                      {s.value}
                    </>
                  ) : s.tooltip === "Total Schools" ? (
                    <>
                      <span className="stat-prefix max-[1149px]:hidden">Schools: </span>
                      {s.value}
                    </>
                  ) : (
                    s.value
                  )}
                </span>
              </div>
            ))}
          </div>

          <div className="school-description bg-[#F8F9FB] rounded-lg mb-3 p-3 text-[13px] leading-[1.4] text-[#5F5F5F] relative overflow-hidden border border-[#EAEDF2]">
            <div className={`description-text ${isDescriptionExpanded ? "line-clamp-4" : "line-clamp-2"} overflow-hidden`}>
              <span className="reviewer-type font-semibold text-[#464646] text-sm mr-0.5 inline">
                {(school as any).reviewerType ? `${(school as any).reviewerType}: ` : ""}
              </span>
              {school.description}
              <a href="#" className="review-link text-xs font-medium ml-1 text-[#346DC2] no-underline hover:underline whitespace-nowrap">
                Read {reviewsCount} reviews
              </a>
            </div>
            <button
              type="button"
              className="view-more-description text-[#346DC2] text-xs font-medium mt-1 cursor-pointer hover:underline"
              onClick={() => setIsDescriptionExpanded((v) => !v)}
            >
              {isDescriptionExpanded ? "View Less" : "View More"}
            </button>
          </div>

          <div className="school-footer flex items-center justify-between mt-auto pt-4 border-t border-[rgba(0,0,0,0.06)] max-[768px]:flex-col max-[768px]:items-start max-[768px]:gap-4">
            <div className="metrics flex items-center gap-4">
              <div className="grade flex items-center gap-2 relative">
                <div className={`grade-circle w-7 h-7 ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-[13px] font-semibold`}>
                  {school.grade}
                </div>
              </div>
              <div className="reviews flex items-center gap-2 text-[13px] text-[#5F5F5F]">
                <div className="star-rating flex items-center gap-1">
                  <SchoolCardIcons.Star className="w-[14px] h-[14px] text-[#00DF8B]" />
                  <span className="rating-value font-medium text-[#464646]">{ratingNum}</span>
                  <span className="review-count clickable-rating cursor-pointer hover:text-[#346DC2] hover:underline">({reviewsCount})</span>
                </div>
              </div>
            </div>

            <div className="footer-buttons flex items-center gap-2 max-[768px]:w-full">
              <button
                type="button"
                className="btn btn-more-info flex items-center justify-center px-3 py-2 rounded-md text-[13px] font-medium cursor-pointer bg-[#F5F5F7] text-[#464646] border border-[rgba(0,0,0,0.08)] hover:bg-[#EAEDF2] transition-colors max-[768px]:flex-1"
              >
                More Info
              </button>
              <button
                type="button"
                className={`btn btn-like flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium cursor-pointer border border-[rgba(1,104,83,0.2)] transition-colors max-[768px]:flex-1 ${
                  isLiked ? "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                }`}
                onClick={() => setIsLiked((v) => !v)}
              >
                <SchoolCardIcons.Heart filled={isLiked} />
                {isLiked ? "Liked" : "Like"}
              </button>
            </div>
          </div>
        </div>

        <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
      </div>
    );
  }

  // List Layout (Desktop + responsive) — match provided HTML structure/styles 1:1
  if (isListLayout) {
    const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount = typeof school.reviews === "number"
      ? school.reviews
      : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    const tuitionPerYear = (() => {
      // In provided HTML mobile drawer: K-12 + Colleges show "/yr"
      if (!school.price) return "";
      if (school.price.includes("/")) return school.price;
      if (establishment === "K-12" || establishment === "Colleges") return `${school.price}/yr`;
      return school.price;
    })();

    const renderDrawerDescription = () => {
      // If description has "X: text" → bold the prefix like in provided HTML
      const text = school.description || "";
      const idx = text.indexOf(":");
      if (idx > 0 && idx < 30) {
        const prefix = text.slice(0, idx);
        const rest = text.slice(idx + 1);
        return (
          <p className="text-sm leading-[1.6] text-[#4A4A4A] mb-4">
            <strong className="font-semibold text-[#464646]">{prefix}:</strong>
            {rest}
          </p>
        );
      }
      return <p className="text-sm leading-[1.6] text-[#4A4A4A] mb-4">{text}</p>;
    };

    const Stat = ({
      icon,
      value,
      tooltip,
      valueBoldPrefix,
    }: {
      icon: React.ReactNode;
      value: string;
      tooltip: string;
      valueBoldPrefix?: string;
    }) => (
      <div className="relative group flex items-center gap-2 text-sm text-[#5F5F5F] leading-none">
        <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656] flex-shrink-0">
          {icon}
        </span>
        <span className="text-[#464646] font-medium leading-none min-w-0 truncate">
          {valueBoldPrefix ? (
            <>
              <span className="font-semibold">{valueBoldPrefix}</span>{" "}
              {value.replace(String(valueBoldPrefix), "").trim()}
            </>
          ) : (
            value
          )}
        </span>

        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white text-center rounded px-2 py-1 text-xs font-medium whitespace-nowrap z-10">
          {tooltip}
          <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-black/80" />
        </span>
      </div>
    );

    const primaryStats = (() => {
      const base = [
        <Stat key="loc" icon={<SchoolCardIcons.Location />} value={school.location} tooltip="Location" />,
        <Stat
          key="rating"
          icon={<SchoolCardIcons.Star className="w-4 h-4 text-[#565656]" />}
          value={`${ratingNum} (${reviewsCount})`}
          tooltip="Rating & Reviews"
          valueBoldPrefix={ratingNum}
        />,
      ];

      if (establishment === "Colleges") {
        return [
          ...base,
          school.duration ? (
            <Stat key="duration" icon={<SchoolCardIcons.Duration />} value={school.duration} tooltip="Duration" />
          ) : null,
          school.sat ? (
            <Stat key="sat" icon={<SchoolCardIcons.SAT />} value={school.sat} tooltip="SAT Range" />
          ) : null,
          school.price ? (
            <Stat key="tuition" icon={<SchoolCardIcons.Tuition />} value={school.price} tooltip="Tuition per Year" />
          ) : null,
        ].filter(Boolean);
      }

      // K-12 / District / Graduates (data model supports these fields)
      return [
        ...base,
        school.ratio ? (
          <Stat key="ratio" icon={<SchoolCardIcons.Ratio />} value={school.ratio} tooltip="Student to Teacher Ratio" />
        ) : null,
        school.students ? (
          <Stat key="students" icon={<SchoolCardIcons.Students />} value={school.students} tooltip="Students" />
        ) : null,
        school.price ? (
          <Stat key="tuition" icon={<SchoolCardIcons.Tuition />} value={school.price} tooltip="Tuition per Year" />
        ) : null,
      ].filter(Boolean);
    })();

    return (
      <>
        {/* Desktop (md+) list card — previous desktop 1:1 */}
        <div className="hidden md:flex school-card bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-in-out border border-[#E5E7EB] relative min-h-[280px] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          {/* Content Section */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="flex-1">
              {school.ranking ? (
                <div className="text-[#089E68] text-[13px] mb-2 font-medium">
                  {school.ranking}
                </div>
              ) : null}

              <div className="flex items-start gap-3 mb-3">
                <h3 className="text-[20px] font-semibold text-[#464646] leading-[1.4] cursor-pointer hover:text-[#346DC2] transition-colors">
                  {school.name}
                </h3>
                <div className="w-6 h-6 bg-[rgba(29,119,189,0.1)] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5">
                  <SchoolCardIcons.Verified />
                </div>
              </div>

              <div className="flex gap-6 mb-4 flex-wrap">
                {primaryStats}
              </div>

              <p className="text-sm leading-[1.6] text-[#4A4A4A] mb-4 line-clamp-3">
                {school.description}
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#f0f0f0] mt-4">
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="relative group">
                    <div
                      className={`w-8 h-8 ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer`}
                    >
                      {school.grade}
                    </div>
                    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap z-10">
                      {school.grade} Overall Grade
                    </div>
                    <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[34px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-black/80 z-10" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="h-9 px-4 rounded-lg text-sm font-medium bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors"
                  >
                    More Info
                  </button>
                  <button
                    type="button"
                    className={`h-9 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${isLiked
                      ? "bg-[#E6F7F0] text-[#016853] hover:bg-[#D1F0E4]"
                      : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsLiked((v) => !v);
                    }}
                  >
                    <SchoolCardIcons.Heart />
                    <span>{isLiked ? "Liked" : "Like"}</span>
                  </button>
                </div>

                <SchoolCardContextMenu
                  schoolName={school.name}
                  buttonClassName="w-9 h-9 bg-[#F5F5F7] rounded-[12px] flex items-center justify-center cursor-pointer text-[#5F5F5F] hover:bg-[#E8E8EA] transition-colors pointer-events-auto"
                />
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-[280px] relative flex flex-col">
            {school.specialty ? (
              <div
                className={`absolute top-6 right-0 h-8 bg-white rounded-l-xl flex items-center px-2.5 text-xs font-medium shadow-[-1px_2px_2px_rgba(0,0,0,0.1)] z-[2] ${school.specialty === "hot"
                  ? "text-[#FF4D4D]"
                  : school.specialty === "instant-book"
                    ? "text-[#1D77BD]"
                    : "text-[#FF9900]"
                  }`}
              >
                {school.specialty === "hot" ? (
                  <>
                    <SchoolCardIcons.Hot /> High demand
                  </>
                ) : school.specialty === "instant-book" ? (
                  <>
                    <SchoolCardIcons.InstantBook /> Instant book
                  </>
                ) : (
                  <>
                    <SchoolCardIcons.Sponsored /> Sponsored
                  </>
                )}
              </div>
            ) : null}

            <div className="relative w-full h-full min-h-[280px]">
              <Image
                src={school.image}
                alt={school.name}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white py-3 px-4 text-[13px] font-medium text-center">
              {school.schoolType}
            </div>
          </div>
        </div>

        {/* Mobile (<md) list card — match provided HTML structure/styles 1:1 */}
        <div className="md:hidden">
          <div className="school-card bg-white rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#E5E7EB] relative">
            <div className="card-main flex relative">
              {/* Image Section */}
              <div className="image-wrapper relative w-[120px] min-h-[143px] self-stretch flex-shrink-0 flex flex-col">
                <div className="relative w-[120px] h-[120px] flex-shrink-0">
                  <Image
                    src={school.image}
                    alt={school.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </div>

                <div className="school-type-footer mt-auto w-full bg-[#F5F5F7] text-[#464646] text-[11px] font-medium text-center py-[5px]">
                  {school.schoolType}
                </div>

                {/* Options button */}
                <button
                  type="button"
                  className="options-button absolute top-2 left-2 w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-[5] border-none"
                  onPointerDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsDrawerOpen(true);
                  }}
                  aria-label="More options"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-[#666]">
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>

                {/* Specialty label */}
                {school.specialty ? (
                  <div
                    className={`specialty-label absolute left-0 bottom-[36px] h-6 bg-white rounded-r-[12px] flex items-center px-2.5 text-[11px] font-medium shadow-[1px_2px_4px_rgba(0,0,0,0.1)] z-[2] ${
                      school.specialty === "hot"
                        ? "text-[#FF4D4D]"
                        : school.specialty === "instant-book"
                          ? "text-[#1D77BD]"
                          : "text-[#FF9900]"
                    }`}
                  >
                    <span className="specialty-icon inline-flex mr-1 [&>svg]:w-3 [&>svg]:h-3">
                      {school.specialty === "hot" ? <SchoolCardIcons.Hot /> : null}
                      {school.specialty === "instant-book" ? <SchoolCardIcons.InstantBook /> : null}
                      {school.specialty === "sponsored" ? <SchoolCardIcons.Sponsored /> : null}
                    </span>
                    {school.specialty === "hot"
                      ? "High demand"
                      : school.specialty === "instant-book"
                        ? "Instant book"
                        : "Sponsored"}
                  </div>
                ) : null}
              </div>

              {/* Content Section */}
              <div className="school-content flex-1 p-3 flex flex-col min-w-0 overflow-hidden">
                {school.ranking ? (
                  <div className="ranking-text text-[#089E68] text-xs mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    {school.ranking}
                  </div>
                ) : null}

                <div className="school-name text-[16px] font-semibold text-[#464646] mb-1 leading-[1.3] line-clamp-3">
                  {school.name}
                </div>

                <div className="school-location text-[#5F5F5F] text-[13px] mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                  {school.location}
                </div>

                <div className="stats-row flex gap-3 mt-1 items-center w-full overflow-hidden whitespace-nowrap">
                  <div className="stat flex items-center gap-1.5 text-[12px] text-[#5F5F5F] flex-shrink-0 min-w-0">
                    <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-[#565656] flex-shrink-0">
                      {establishment === "Colleges" || establishment === "Graduates" ? (
                        <SchoolCardIcons.Duration />
                      ) : (
                        <SchoolCardIcons.Ratio />
                      )}
                    </span>
                    <span className="stat-text text-[#464646] font-medium truncate">
                      {establishment === "Colleges" || establishment === "Graduates"
                        ? school.duration || "—"
                        : school.ratio || "—"}
                    </span>
                  </div>

                  <div className="stat flex items-center gap-1.5 text-[12px] text-[#5F5F5F] flex-shrink-0 min-w-0">
                    <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-[#565656] flex-shrink-0">
                      <SchoolCardIcons.Star />
                    </span>
                    <span className="stat-text text-[#464646] font-medium truncate">
                      <strong className="font-semibold">{ratingNum}</strong>{" "}
                      ({reviewsCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="card-footer flex items-center justify-between px-3 py-[10px] border-t border-[#E5E7EB] bg-[#FAFAFA] min-w-0">
              <div className={`grade-circle w-8 h-8 ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-[14px] font-semibold`}>
                {school.grade}
              </div>

              <div className="footer-actions flex items-center gap-4 min-w-0">
                <div className="students-display flex items-center gap-1 text-[12px] text-[#565656] min-w-0">
                  <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#00DF8B]">
                    {establishment === "Colleges" ? <SchoolCardIcons.SAT /> : <SchoolCardIcons.Students />}
                  </span>
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis min-w-0">
                    {establishment === "Colleges"
                      ? `SAT: ${school.sat || "—"}`
                      : `Students: ${school.students || "—"}`}
                  </span>
                </div>

                <button
                  type="button"
                  className="info-button flex items-center justify-center text-[#565656]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsInfoOpen(true);
                  }}
                  aria-label="More info"
                >
                  <svg fill="none" viewBox="0 0 20 20" width="18" height="18">
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 6V10" />
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 13.1094H10.0067" />
                    <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.6" stroke="currentColor" d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Info Drawer (mobile) */}
          <Portal containerId="mobile-modal-root">
            <>
              <div
                className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ease-in-out ${isInfoOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
                onClick={() => setIsInfoOpen(false)}
              />
              <div
                className={`fixed bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-[16px] shadow-[0_-2px_10px_rgba(0,0,0,0.15)] max-h-[80vh] overflow-hidden flex flex-col transition-transform duration-300 ease-in-out ${isInfoOpen ? "translate-y-0" : "translate-y-full"}`}
                aria-hidden={!isInfoOpen}
              >
            <div className="p-4 border-b border-black/10 flex items-center relative">
              <div className="flex gap-3 items-center flex-1">
                <Image
                  src={school.image}
                  alt={school.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                />
                <div className="text-base font-semibold text-[#464646] leading-[1.3] mr-[60px]">
                  {school.name}
                </div>
              </div>

              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#5F5F5F] absolute right-[52px] top-3 hover:bg-[#f5f5f7] transition-colors"
                onClick={() => {
                  setIsInfoOpen(false);
                  setIsDrawerOpen(true);
                }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#5F5F5F] absolute right-4 top-3 hover:bg-[#f5f5f7] transition-colors"
                onClick={() => setIsInfoOpen(false)}
              >
                <svg viewBox="0 0 20 20" fill="none" width="20" height="20">
                  <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[calc(80vh-140px)]">
              <div className="flex flex-wrap gap-x-4 gap-y-3 mb-4">
                {establishment === "K-12" ? (
                  <>
                    {school.ratio ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Ratio className="text-[#089E68]" />
                        <span>{school.ratio}</span>
                      </div>
                    ) : null}
                    {tuitionPerYear ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Tuition className="text-[#089E68]" />
                        <span>{tuitionPerYear}</span>
                      </div>
                    ) : null}
                    {school.grades ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Grades className="text-[#089E68]" />
                        <span>Grades: {school.grades}</span>
                      </div>
                    ) : null}
                  </>
                ) : establishment === "Colleges" ? (
                  <>
                    {school.duration ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Duration className="text-[#089E68]" />
                        <span>{school.duration}</span>
                      </div>
                    ) : null}
                    {tuitionPerYear ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Tuition className="text-[#089E68]" />
                        <span>{tuitionPerYear}</span>
                      </div>
                    ) : null}
                    {school.acceptanceRate ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Acceptance className="text-[#089E68]" />
                        <span>Acceptance: {school.acceptanceRate}</span>
                      </div>
                    ) : null}
                  </>
                ) : establishment === "District" ? (
                  <>
                    {school.ratio ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Ratio className="text-[#089E68]" />
                        <span>{school.ratio}</span>
                      </div>
                    ) : null}
                    {school.grades ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Grades className="text-[#089E68]" />
                        <span>Grades: {school.grades}</span>
                      </div>
                    ) : null}
                    {school.students ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Students className="text-[#089E68]" />
                        <span>{school.students}</span>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <>
                    {school.duration ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Duration className="text-[#089E68]" />
                        <span>{school.duration}</span>
                      </div>
                    ) : null}
                    {school.price ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Tuition className="text-[#089E68]" />
                        <span>{school.price}</span>
                      </div>
                    ) : null}
                    {school.students ? (
                      <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <SchoolCardIcons.Students className="text-[#089E68]" />
                        <span>{school.students}</span>
                      </div>
                    ) : null}
                  </>
                )}
              </div>

              {renderDrawerDescription()}

              <div className="text-[13px] font-medium text-[#346DC2] mb-4 cursor-pointer">
                Read {reviewsCount} reviews
              </div>
            </div>

            <div className="p-4 border-t border-black/10">
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  className="flex-1 py-3 rounded-lg text-sm font-medium bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors"
                >
                  More Info
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${isLiked
                    ? "bg-[#298541] text-white"
                    : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                    }`}
                  onClick={() => setIsLiked((v) => !v)}
                >
                  <SchoolCardIcons.Heart />
                  {isLiked ? "Liked" : "Like"}
                </button>
              </div>
            </div>
          </div>
            </>
          </Portal>

          {/* Mobile Options Drawer */}
          <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
        </div>
      </>
    );
  }

  return (
    <div
      className={`school-card group bg-white rounded-xl overflow-hidden shadow-sm md:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out border ${isGridLayout ? "border-[#E5E7EB] h-[340px] cursor-pointer" : "border-[rgba(0,0,0,0.08)]"
        } ${isListLayout
          ? "flex min-w-0"
          : isHybridLayout
            ? "flex p-4 border-[1px] border-[rgba(0,0,0,0.08)] active:scale-[0.98] active:border-[rgba(1,104,83,0.2)]"
            : isClassicLayout
              ? "flex flex-col relative justify-between"
              : "flex flex-col justify-between"
        } relative hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] ${isHybridLayout ? "hover:border-[rgba(1,104,83,0.2)]" : isClassicLayout ? "hover:border-[rgba(1,104,83,0.2)]" : ""
        }`}
    >
      {/* Grid Layout is handled above */}

      {/* Image Section - Not for Hybrid Mobile or Classic */}
      {!isClassicLayout && !isHybridLayout && (
        <div
          className={`image-container relative ${isListLayout
            ? "w-[200px] flex-shrink-0 flex flex-col pr-4 pt-6"
            : isGridLayout
              ? "w-full h-[140px] overflow-hidden md:hidden"
              : "w-full h-32 md:h-40 overflow-hidden"
            }`}
        >

          {/* List Layout - Options Button */}
          {isListLayout && (
            <div className="absolute top-[36px] right-6 z-[2]">
              {/* Desktop: Context Menu */}
              <div className="hidden md:block">
                <SchoolCardContextMenu schoolName={school.name} />
              </div>

              {/* Mobile: Drawer Button */}
              <div
                className="md:hidden w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-all z-[2] shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:bg-[#F5F5F7] pointer-events-auto"
                onClick={() => setIsDrawerOpen(true)}
              >
                <SchoolCardIcons.MoreOptions />
              </div>
            </div>
          )}


          {/* List Layout - Specialty Label */}
          {isListLayout && school.specialty && (
            <div
              className={`specialty-label absolute top-9 left-3 h-8 bg-white rounded-r-xl flex items-center px-2.5 text-xs font-medium shadow-[1px_2px_2px_rgba(0,0,0,0.1)] z-[2] ${school.specialty === "hot"
                ? "text-[#FF4D4D]"
                : school.specialty === "instant-book"
                  ? "text-[#1D77BD]"
                  : "text-[#FF9900]"
                }`}
            >
              {school.specialty === "hot" ? (
                <>
                  <SchoolCardIcons.Hot />
                  High demand
                </>
              ) : school.specialty === "instant-book" ? (
                <>
                  <SchoolCardIcons.InstantBook />
                  Instant book
                </>
              ) : (
                <>
                  <SchoolCardIcons.Sponsored />
                  Sponsored
                </>
              )}
            </div>
          )}

          <Image
            height={720}
            width={720}
            src={school.image}
            alt={school.name}
            className={`school-image ${isListLayout
              ? "h-[9.25rem] w-full object-cover rounded-lg ml-3"
              : isGridLayout
                ? "absolute top-0 left-0 w-full h-full object-cover"
                : "absolute top-0 left-0 w-full h-full object-cover"
              }`}
          />

          {/* List Layout - Image Buttons */}
          {isListLayout && (
            <div className="image-buttons flex gap-2 py-3 ml-3">
              <div className="school-type-full w-full px-4 py-2 text-center bg-[#F5F5F7] text-[#464646] text-[13px] font-medium rounded-lg">
                {school.schoolType}
              </div>
            </div>
          )}

          {/* Grid Layout - Options Button (top right) - Mobile */}
          {isGridLayout && (
            <div
              className="md:hidden options-button absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center cursor-pointer text-[#4A4A4A] transition-all z-[2] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#f5f5f5] pointer-events-auto"
              onClick={() => setIsDrawerOpen(true)}
            >
              <SchoolCardIcons.MoreOptions />
            </div>
          )}

          {/* Grid Layout - Context Menu Button (top right) - Desktop */}
          {isGridLayout && (
            <div className="hidden md:block absolute top-3 right-3 z-[2]">
              <SchoolCardContextMenu schoolName={school.name} />
            </div>
          )}

          {/* Grid Layout - School Type Label (bottom left) */}
          {isGridLayout && (
            <div className="school-type-label absolute bottom-0 left-2.5 bg-white px-2 pt-1 text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-md h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
              {school.schoolType}
            </div>
          )}

        </div>
      )}

      {/* Classic Layout - Specialty Badge (at top of card) */}
      {isClassicLayout && (
        <>
          {school.specialty ? (
            <div
              className={`specialty-badge absolute top-0 left-0 right-0 py-2 px-3 text-[13px] font-medium flex items-center justify-center gap-1.5 rounded-t-xl z-[2] ${school.specialty === "hot"
                ? "bg-[rgba(255,77,77,0.1)] text-[#FF4D4D]"
                : school.specialty === "instant-book"
                  ? "bg-[rgba(29,119,189,0.1)] text-[#1D77BD]"
                  : "bg-[rgba(255,153,0,0.1)] text-[#FF9900]"
                }`}
            >
              {school.specialty === "hot" ? (
                <>
                  <SchoolCardIcons.Hot />
                  High demand
                </>
              ) : school.specialty === "instant-book" ? (
                <>
                  <SchoolCardIcons.InstantBook />
                  Instant book
                </>
              ) : (
                <>
                  <SchoolCardIcons.Sponsored />
                  Sponsored
                </>
              )}
            </div>
          ) : (
            <div className="empty-badge absolute top-0 left-0 right-0 h-8 bg-[#F5F5F7] rounded-t-xl z-[1]"></div>
          )}
        </>
      )}

      {/* Classic Layout - Card Header */}
      {isClassicLayout && (
        <div className="card-header flex px-4 pt-10 pb-3 items-start gap-3">
          <div className={`grade-circle w-8 h-8 ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
            {school.grade}
          </div>
          <div className="school-info flex-1 min-w-0 w-[calc(100%-44px)] overflow-hidden">
            <div className="school-name text-base font-semibold text-[#464646] mb-1 leading-[1.3] line-clamp-2 overflow-hidden">
              {school.name}
            </div>
            {school.ranking && (
              <div className="ranking-text text-[#089E68] text-xs font-medium leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis max-w-full min-w-0 pr-2.5">
                {school.ranking}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Classic Layout - Image Container */}
      {isClassicLayout && (
        <div className="image-container relative w-full px-4 pt-0 mb-4">
          <Image
            height={720}
            width={720}
            src={school.image}
            alt={school.name}
            className="school-image w-full h-[160px] md:h-[140px] object-cover rounded-lg"
          />
          {/* Classic Layout - School Type Label */}
          <div className="school-type-label absolute bottom-1 left-6 bg-white px-2 pt-1 text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-md h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
            {school.schoolType}
          </div>
        </div>
      )}

      {/* Grid Layout Desktop is handled above */}

      {/* Content Section */}
      <div
        className={`school-content ${isListLayout
          ? "flex-1 min-w-0 p-6 flex flex-col overflow-hidden"
          : isHybridLayout
            ? "p-4 md:p-4 flex flex-col min-w-0 overflow-hidden"
            : isGridLayout
              ? "p-4 flex-1 flex flex-col min-w-0 overflow-hidden md:hidden"
              : isClassicLayout
                ? "px-0 flex flex-col min-w-0 overflow-hidden"
                : "p-3 md:p-4 flex flex-col justify-between min-w-0 overflow-hidden"
          }`}
      >
        {/* Hybrid Layout - Mobile Version */}
        {isHybridLayout && (
          <div className="md:hidden">
            <div className="school-header flex mb-3 relative">
              <div className="school-type-label absolute top-0 left-[75px] bg-[rgba(1,104,83,0.1)] text-[#016853] px-2 py-1 rounded-md text-[10px] font-semibold tracking-[0.02em] uppercase z-[2]">
                {school.schoolType}
              </div>
              <div className={`image-container relative w-[60px] mr-4 flex-shrink-0 flex flex-col ${school.specialty ? 'has-specialty' : ''}`}>
                <Image
                  height={60}
                  width={60}
                  src={school.image}
                  alt={school.name}
                  className={`school-image w-[60px] h-[60px] object-cover rounded-lg ${school.specialty ? 'rounded-b-none' : ''}`}
                />
                {school.specialty && (
                  <div
                    className={`specialty-footer w-full text-[10px] font-semibold text-center py-0.5 rounded-b-lg flex items-center justify-center gap-1 ${school.specialty === "hot"
                      ? "bg-[#FFEBEB] text-[#FF4D4D]"
                      : school.specialty === "instant-book"
                        ? "bg-[#E6F1FA] text-[#1D77BD]"
                        : "bg-[#FFF4E5] text-[#FF9900]"
                      }`}
                  >
                    {school.specialty === "hot" ? (
                      <SchoolCardIcons.Hot />
                    ) : school.specialty === "instant-book" ? (
                      <SchoolCardIcons.InstantBook />
                    ) : (
                      <SchoolCardIcons.Sponsored />
                    )}
                    {school.specialty === "hot" ? "Hot" : school.specialty === "instant-book" ? "Book" : "Ad"}
                  </div>
                )}
              </div>

              {/* School Title Container */}
              <div className="school-title-container flex-1 min-w-0 flex flex-col">
                {school.ranking && (
                  <div className="ranking-text text-[#089E68] text-[13px] mb-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-full min-w-0">
                    {school.ranking}
                  </div>
                )}
                <h3 className="school-name text-[15px] font-semibold text-[#464646] leading-[1.3] overflow-hidden line-clamp-3 pr-4 min-w-0">
                  {school.name}
                  {school.verified && (
                    <span className="verified-badge-title inline-flex items-center ml-1 flex-shrink-0 align-middle relative -top-[1px]">
                      <SchoolCardIcons.Verified />
                    </span>
                  )}
                </h3>
              </div>

              {/* More Options */}
              <div
                className="more-options absolute top-[-4px] right-0 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer z-[3] text-[#464646] active:bg-[#F5F5F7] pointer-events-auto"
                onClick={() => setIsDrawerOpen(true)}
              >
                <SchoolCardIcons.MoreOptions />
              </div>
            </div>
            {/* School Stats */}
            <div className="school-stats flex flex-wrap gap-x-4 gap-y-2 mb-3 min-w-0">

              <div className="stat flex items-center gap-1.5 text-xs text-[#5F5F5F] min-w-0 max-w-full overflow-hidden">
                <SchoolCardIcons.Location />
                <span className="text-[#464646] font-medium truncate">{school.location}</span>
              </div>

              <div className="stat flex items-center gap-1.5 text-xs text-[#5F5F5F] min-w-0 max-w-full overflow-hidden">
                <SchoolCardIcons.Ratio />
                <span className="text-[#464646] font-medium truncate"><span className="stat-prefix hidden">Ratio: </span>{school.ratio}</span>
              </div>

              <div className="stat flex items-center gap-1.5 text-xs text-[#5F5F5F] min-w-0 max-w-full overflow-hidden">
                <SchoolCardIcons.Students />
                <span className="text-[#464646] font-medium truncate"><span className="stat-prefix hidden">Students: </span>{school.students || '1,756'}</span>
              </div>

              <div className="stat flex items-center gap-1.5 text-xs text-[#5F5F5F] min-w-0 max-w-full overflow-hidden">
                <SchoolCardIcons.Tuition />
                <span className="text-[#464646] font-medium truncate">{school.price}</span>
              </div>

            </div>

            {/* School Description */}
            <div className="school-description bg-[#F8F9FB] rounded-lg mb-3 p-3 text-[13px] leading-[1.4] text-[#5F5F5F] relative overflow-hidden border border-[#EAEDF2] min-w-0">
              <div className={`description-text ${isDescriptionExpanded ? 'expanded' : 'line-clamp-2'} overflow-hidden transition-all duration-300 relative`}>
                <span className="truncated-text">{school.description}</span>
                <a href="#" className="review-link text-xs font-medium ml-1 text-[#346DC2] no-underline hover:underline whitespace-nowrap">
                  Read {school.reviews} reviews
                </a>
              </div>
              <div
                className="view-more-description text-[#346DC2] font-medium cursor-pointer inline-block mt-1 text-xs"
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              >
                {isDescriptionExpanded ? 'View Less' : 'View More'}
              </div>
            </div>

            {/* School Footer */}
            <div className="school-footer flex items-center justify-between pt-3 border-t border-[rgba(0,0,0,0.06)]">
              <div className="metrics flex items-center gap-3">
                <div className="grade flex items-center gap-2">
                  <div className={`grade-circle w-7 h-7 ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-[13px] font-semibold`}>
                    {school.grade}
                  </div>
                </div>
                <div className="reviews flex items-center gap-2 text-xs text-[#5F5F5F]">
                  <div className="star-rating flex items-center gap-0.5">
                    <SchoolCardIcons.Star />
                    <span className="rating-value font-medium text-[#464646]">{school.rating}</span>
                    <span className="review-count text-[#5F5F5F] cursor-pointer hover:text-[#346DC2] hover:underline">({school.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="btn-like flex items-center gap-1.5 bg-[#EBFCF4] text-[#016853] border border-[rgba(1,104,83,0.2)] rounded-md px-3 py-1.5 text-xs font-medium cursor-pointer hover:bg-[#D7F7E9] transition-colors">
                <SchoolCardIcons.Heart />
                Like
              </div>
            </div>
          </div>
        )}

        {/* Hybrid Layout - Desktop Version */}
        {isHybridLayout && (
          <div className="hidden md:flex md:flex-col relative pt-5 h-full">

            <div className="flex mb-3 min-w-0">
              {/* Image Container */}
              <div className="relative w-[60px] mr-4 flex-shrink-0 flex flex-col">
                <img
                  src={school.image || '/placeholder.jpg'}
                  alt={school.name}
                  className={`w-[60px] h-[60px] object-cover ${school.specialty ? 'rounded-t-lg' : 'rounded-lg'}`}
                />
                {school.specialty && (
                  <div
                    className={`specialty-footer w-full text-[10px] font-bold uppercase tracking-tight text-center py-1 rounded-b-lg flex items-center justify-center gap-1 ${school.specialty === "hot"
                      ? "bg-[#FFEBEB] text-[#FF4D4D]"
                      : school.specialty === "instant-book"
                        ? "bg-[#E6F1FA] text-[#1D77BD]"
                        : "bg-[#FFF4E5] text-[#FF9900]"
                      }`}
                  >
                    {school.specialty === "hot" && <SchoolCardIcons.Hot />}
                    {school.specialty === "instant-book" && <SchoolCardIcons.InstantBook />}
                    {school.specialty === "hot" ? "Hot" : school.specialty === "instant-book" ? "Book" : "Ad"}
                  </div>
                )}
              </div>

              {/* Content Container */}
              <div className="flex-1 min-w-0 flex flex-col">

                {/* 1. Label positioned relatively inside flow */}
                <div className="w-fit bg-[rgba(1,104,83,0.1)] text-[#016853] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide mb-1.5">
                  {school.schoolType}
                </div>

                {/* 2. Ranking */}
                {school.ranking && (
                  <div className="ranking-text text-[#089E68] text-[13px] mb-1 font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full">
                    {school.ranking}
                  </div>
                )}

                {/* 3. Header Name & Verified */}
                <div className="school-header flex items-start justify-between mb-1">
                  <div className="school-name-container flex items-start gap-1 max-w-[calc(100%-30px)]">
                    <h3 className="school-name text-[16px] font-bold text-[#464646] leading-[1.3] cursor-pointer hover:text-[#016853] transition-colors line-clamp-2">
                      {school.name}
                    </h3>
                    {school.verified && (
                      <span className="verified-badge inline-flex items-center flex-shrink-0 mt-0.5 text-[#1D77BD]">
                        <SchoolCardIcons.Verified className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  <div className="actions hidden md:flex items-center -mt-1">
                    <SchoolCardContextMenu schoolName={school.name} />
                  </div>
                </div>

                {/* 4. Stats Rows */}
                <div className="school-stats flex flex-col gap-1.5 mb-3">

                  {/* Row 1: Location | Ratio/Duration | Students | Price */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#5F5F5F] leading-none">
                    {/* Location */}
                    <div className="stat flex items-center gap-1.5">
                      <SchoolCardIcons.Location />
                      <span className="text-[#464646] font-medium">{school.location}</span>
                    </div>

                    {/* Ratio or Duration */}
                    {(school.ratio || school.duration) && (
                      <div className="stat flex items-center gap-1.5">
                        {school.ratio ? <SchoolCardIcons.Ratio /> : <SchoolCardIcons.Duration />}
                        <span className="text-[#464646] font-medium">{school.ratio || school.duration}</span>
                      </div>
                    )}

                    {/* Students */}
                    {school.students && (
                      <div className="stat flex items-center gap-1.5">
                        <SchoolCardIcons.Students />
                        <span className="text-[#464646] font-medium">{school.students}</span>
                      </div>
                    )}

                    {/* Price / Tuition (Show for both K12 and College if exists) */}
                    {school.price && (
                      <div className="stat flex items-center gap-1.5">
                        <SchoolCardIcons.Tuition />
                        <span className="text-[#464646] font-medium">{school.price}</span>
                      </div>
                    )}
                  </div>

                  {/* Row 2: Grades OR SAT/Acceptance */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-[#5F5F5F] leading-none">
                    {school.grades && (
                      <div className="stat flex items-center gap-1.5">
                        <SchoolCardIcons.Grades />
                        <span className="text-[#464646] font-medium">Grades {school.grades}</span>
                      </div>
                    )}

                    {school.sat && (
                      <div className="stat flex items-center gap-1.5">
                        <SchoolCardIcons.SAT />
                        <span className="text-[#464646] font-medium">SAT: {school.sat}</span>
                      </div>
                    )}

                    {school.acceptanceRate && (
                      <div className="stat flex items-center gap-1.5">
                        <SchoolCardIcons.Acceptance />
                        <span className="text-[#464646] font-medium">Accpt: {school.acceptanceRate}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Description Box with Bold Logic */}
            <div className="school-description bg-[#F8F9FB] rounded-lg mb-3 p-3 text-[13px] leading-[1.5] text-[#5F5F5F] relative border border-[#EAEDF2]">
              <div className={`description-text ${isDescriptionExpanded ? '' : 'line-clamp-2'} overflow-hidden`}>
                {(() => {
                  // Check if description has a colon (e.g. "Parent: text") to bold the prefix
                  const parts = school.description ? school.description.split(':') : [];
                  if (parts.length > 1) {
                    return (
                      <span>
                        <span className="font-bold text-[#464646]">{parts[0]}:</span>
                        {parts.slice(1).join(':')}
                      </span>
                    );
                  }
                  return school.description;
                })()}

                {/* Inline Link */}
                <a href="#" className="review-link text-xs font-semibold ml-1 text-[#346DC2] hover:underline whitespace-nowrap">
                  View More
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="school-footer flex items-center justify-between pt-3 border-t border-[rgba(0,0,0,0.06)] mt-auto">
              <div className="metrics flex items-center gap-3">
                <div className={`grade-circle w-[26px] h-[26px] ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-[12px] font-bold`}>
                  {school.grade}
                </div>
                <div className="flex items-center gap-1 text-[13px]">
                  <SchoolCardIcons.Star className="w-3.5 h-3.5 text-[#00DF8B]" />
                  <span className="font-bold text-[#464646]">{school.rating}</span>
                  <span className="text-[#9CA3AF]">({school.reviews})</span>
                </div>
              </div>

              <div className="footer-buttons flex items-center gap-2">
                <button className="flex items-center justify-center px-3 py-1.5 rounded-md text-[13px] font-medium bg-white text-[#464646] border border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                  More Info
                </button>
                <button className="flex items-center gap-1.5 bg-[#EBFCF4] text-[#016853] border border-[rgba(1,104,83,0.2)] rounded-md px-3 py-1.5 text-[13px] font-medium hover:bg-[#D7F7E9] transition-colors">
                  <SchoolCardIcons.Heart />
                  Like
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Classic Layout - Stats Section */}
        {isClassicLayout && (() => {
          // Determine stats based on establishment type
          const getSecondStat = () => {
            if (establishment === "K-12") {
              return { label: "Ratio", value: school.ratio, icon: "ratio" };
            } else if (establishment === "Colleges" || establishment === "Graduates") {
              return { label: "Duration", value: school.duration || school.ratio, icon: "duration" };
            } else if (establishment === "District") {
              return { label: "Ratio", value: school.ratio, icon: "ratio" };
            }
            return { label: "Ratio", value: school.ratio, icon: "ratio" };
          };

          const getFourthStat = () => {
            if (establishment === "K-12") {
              return { label: "Students", value: school.students, icon: "students" };
            } else if (establishment === "Colleges") {
              return { label: "Acceptance", value: school.acceptanceRate, icon: "acceptance" };
            } else if (establishment === "Graduates") {
              return { label: "Students", value: school.students, icon: "students" };
            } else if (establishment === "District") {
              return { label: "Students", value: school.students, icon: "students" };
            }
            return { label: "Students", value: school.students, icon: "students" };
          };

          const secondStat = getSecondStat();
          const fourthStat = getFourthStat();

          const ratioIcon = <SchoolCardIcons.Ratio />;

          const durationIcon = <SchoolCardIcons.Duration />;

          const priceIcon = <SchoolCardIcons.Tuition />;

          const studentsIcon = <SchoolCardIcons.Students />;

          const acceptanceIcon = <SchoolCardIcons.Acceptance />;

          return (
            <div className="stats-section grid grid-cols-2 gap-2.5 mb-4 px-4">
              {/* Location - Always first */}
              <div className="stat flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                  <SchoolCardIcons.Location />
                </div>
                <div className="stat-content flex flex-col gap-1">
                  <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">Location</div>
                  <div className="stat-value text-[10px] text-[#464646] font-medium leading-[1.3]">{school.location}</div>
                </div>
              </div>

              {/* Second stat */}
              <div className="stat flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                  {secondStat.icon === "ratio" ? ratioIcon : durationIcon}
                </div>
                <div className="stat-content flex flex-col">
                  <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">{secondStat.label}</div>
                  <div className="stat-value text-[10px] text-[#464646] font-medium leading-[1.3]">{secondStat.value}</div>
                </div>
              </div>

              {/* Tuition - Third stat (not for District) */}
              {establishment !== "District" && (
                <div className="stat flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                  <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                    {priceIcon}
                  </div>
                  <div className="stat-content flex flex-col">
                    <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">Tuition</div>
                    <div className="stat-value text-[10px] text-[#464646] font-medium leading-[1.3]">{school.price}</div>
                  </div>
                </div>
              )}

              {/* Fourth stat */}
              {establishment === "Colleges" ? (
                <div className="stat flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                  <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                    {acceptanceIcon}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">{fourthStat.label}</div>
                    <div className="stat-value text-[10px] text-[#464646] font-medium leading-[1.3]">{fourthStat.value}</div>
                  </div>
                </div>
              ) : (
                <div className="stat flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                  <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                    {studentsIcon}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">{fourthStat.label}</div>
                    <div className="stat-value text-[10px] text-[#464646] font-medium leading-[1.3]">{fourthStat.value}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* Other Layouts - School Stats */}
        {!isHybridLayout && !isClassicLayout && (
          <>
            {isGridLayout ? (
              <>
                {school.ranking && (
                  <div className="ranking-text text-[#089E68] text-[13px] mb-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    {school.ranking}
                  </div>
                )}
                <h3 className="school-name text-base font-semibold text-[#464646] mb-2 leading-[1.4] line-clamp-3">
                  {school.name}
                </h3>
              </>
            ) : isListLayout ? (
              <>
                <div className="ranking-text text-[#089E68] text-[13px] mb-2 font-medium">
                  {school.ranking}
                </div>
                <div className="name-section flex items-center gap-2 mb-3">
                  <h3 className="school-name text-xl font-semibold text-[#464646] leading-[1.4] cursor-pointer hover:text-[#346DC2] transition-colors">
                    {school.name}
                  </h3>
                  <div className="verified-badge w-6 h-6 bg-[rgba(29,119,189,0.1)] rounded-md flex items-center justify-center -mt-1.5">
                    <SchoolCardIcons.Verified />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="ranking-text text-[#089E68] text-[11px] md:text-[13px] mb-1 md:mb-2 font-medium">
                  {school.ranking}
                </div>
                <h3 className="school-name font-semibold text-[#464646] mb-1 md:mb-2 leading-[1.4] text-sm md:text-base">
                  {school.name}
                </h3>
              </>
            )}

            <div
              className={`school-stats ${isListLayout
                ? "flex flex-wrap gap-3 md:gap-6 mb-4 min-w-0"
                : isGridLayout
                  ? "flex flex-wrap gap-3 mb-4"
                  : "flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4"
                }`}
            >
              {/* Grid Layout Mobile Stats */}
              {isGridLayout ? (
                <>
                  <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450] tracking-[0.01em] md:gap-2">
                    <SchoolCardIcons.Location />
                    <span className="text-[#464646]">{school.location}</span>
                  </div>
                  {establishment === "K-12" || establishment === "District" ? (
                    <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450] tracking-[0.01em] md:gap-2">
                      <SchoolCardIcons.Ratio />
                      <span className="text-[#464646]">{school.ratio}</span>
                    </div>
                  ) : (establishment === "Colleges" || establishment === "Graduates") ? (
                    <div className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450] tracking-[0.01em] md:gap-2">
                      <SchoolCardIcons.Grades />
                      <span className="text-[#464646]">{school.duration || school.ratio}</span>
                    </div>
                  ) : null}
                  <div className="stat rating-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] font-[450] tracking-[0.01em] md:gap-2">
                    <SchoolCardIcons.Grades />
                    <span className="text-[#464646]">
                      <strong className="font-semibold text-[#444444]">{school.rating.split(' ')[0]}</strong> {school.rating.split(' ').slice(1).join(' ')}
                    </span>
                  </div>
                </>
              ) : isListLayout ? (
                <>
                  <div className={`stat flex items-center gap-2 text-[14px] text-[#5F5F5F] min-w-0 overflow-hidden`}>
                    <SchoolCardIcons.Location />
                    <span className="text-[#464646] font-medium truncate">{school.location}</span>
                  </div>
                  <div className="stat-group flex flex-wrap gap-3 md:gap-6 min-w-0">
                    <div className="stat flex items-center gap-2 text-[14px] text-[#5F5F5F]">
                      <SchoolCardIcons.Duration />
                      <span className="text-[#464646] font-medium">{school.ratio}</span>
                    </div>
                    <div className="stat flex items-center gap-2 text-[14px] text-[#5F5F5F]">
                      <SchoolCardIcons.Grades />
                      <span className="text-[#464646] font-medium">{school.rating}</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="stat flex items-center gap-1 md:gap-1.5 text-[11px] md:text-[13px] text-[#5F5F5F] font-[450]">
                    <SchoolCardIcons.Location />
                    <span className="text-[#464646]">{school.location}</span>
                  </div>
                  <div className="stat flex items-center gap-1 md:gap-1.5 text-[11px] md:text-[13px] text-[#5F5F5F] font-[450]">
                    <SchoolCardIcons.Duration />
                    <span className="text-[#464646]">{school.ratio}</span>
                  </div>
                  <div className="stat flex items-center gap-1 md:gap-1.5 text-[11px] md:text-[13px] text-[#5F5F5F] font-[450]">
                    <SchoolCardIcons.Grades />
                    <span className="text-[#464646]"><strong className="font-semibold text-[#444444]">{school.rating.split(' ')[0]}</strong> {school.rating.split(' ').slice(1).join(' ')}</span>
                  </div>
                </>
              )}
            </div>
          </>

        )}

        {/* List Layout - Description */}
        {isListLayout && (
          <p className="description text-sm leading-relaxed text-[#4A4A4A] mb-4 line-clamp-2">
            {school.description}
          </p>
        )}

        {/* List Layout - Footer Section */}
        {isListLayout && (
          <div className="footer-section mt-auto flex flex-wrap items-center justify-between gap-3 min-w-0">
            <div className="metrics flex flex-wrap items-center gap-3 md:gap-6 min-w-0">
              <div className="grade flex items-center gap-2">
                <div className={`grade-circle w-8 h-8 ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer relative group`}>
                  {school.grade}
                  {/* <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {school.grade} Overall Grade
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 border-4 border-transparent border-t-black/80"></div>
                  </div> */}
                </div>
                {/* <span className="grade-label font-semibold text-[#016853]">{school.grade}</span> */}
              </div>
              <div className="students-count flex items-center gap-2 text-sm text-[#5F5F5F] min-w-0 overflow-hidden">
                <SchoolCardIcons.Tuition />
                <span className="text-[#464646] font-medium truncate">Students: {school.students?.toLocaleString() || '1,756'}</span>
              </div>
              {school.price && (
                <div className="tuition flex items-center gap-2 text-sm text-[#5F5F5F] min-w-0 overflow-hidden">
                  <SchoolCardIcons.Tuition />
                  <span className="text-[#464646] font-medium truncate">{school.price}</span>
                </div>
              )}
              {school.grades && (
                <div className="grade-range flex items-center gap-2 text-sm text-[#5F5F5F] min-w-0 overflow-hidden">
                  <SchoolCardIcons.Ratio />
                  <span className="text-[#464646] font-medium truncate">{school.grades}</span>
                </div>
              )}
            </div>
            <div className="actions flex gap-2 flex-shrink-0">
              <div className="action-button info-button px-4 py-2 rounded-lg text-sm font-medium cursor-pointer bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors h-9 flex items-center">
                More Info
              </div>
              <div className="action-button apply-button px-4 py-2 rounded-lg text-sm font-medium cursor-pointer bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9] transition-colors h-9 flex items-center gap-2">
                <SchoolCardIcons.Heart />
                <span>Like</span>
              </div>
            </div>
          </div>
        )}



        {/* Grid Layout - Footer */}
        {isGridLayout && (
          <div className="h-[54px] border-t border-[rgba(1,104,83,0.1)] p-3 px-4 flex items-center justify-between bg-white z-[20] relative">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0">
                {school.grade}
              </div>
              <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                <SchoolCardIcons.Students />
                <span>Students: <span className="text-[#464646]">{school.students}</span></span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#f5f5f7] transition-colors ${isLiked ? 'text-[#298541]' : 'text-[#5F5F5F]'}`}
              >
                <SchoolCardIcons.Heart />
              </button>
              <div className="hidden md:flex w-7 h-7 rounded-full items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] hover:text-[#346DC2] hover:bg-[#e8e8e8] transition-all">
                <SchoolCardContextMenu schoolName={school.name} />
              </div>
            </div>
          </div>
        )}

        {/* Classic Layout - Footer */}
        {isClassicLayout && (
          <div className="school-footer px-4 py-3 border-t border-[rgba(0,0,0,0.06)] mt-auto flex justify-between items-center">
            {/* Mobile Footer */}
            <div className="md:hidden footer-left flex items-center gap-3">
              <div className="rating-text flex items-center gap-1 text-[12px] text-[#5F5F5F]">
                <SchoolCardIcons.Star />
                <span>
                  <span className="font-semibold text-[#464646]">{school.rating.split(' ')[0]}</span> {school.rating.split(' ').slice(1).join(' ')}
                </span>
              </div>
              <div className="like-indicator w-6 h-6 flex items-center justify-center text-[#5F5F5F] cursor-pointer">
                <SchoolCardIcons.Heart />
              </div>
            </div>
            <div className="md:hidden footer-right flex items-center gap-2">
              <div
                className="options-button w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#5F5F5F] cursor-pointer hover:text-[#346DC2] hover:bg-[#e8e8e8] transition-all pointer-events-auto"
                onClick={() => setIsDrawerOpen(true)}
              >
                <SchoolCardIcons.MoreOptions />
              </div>
              <div className="info-button w-8 h-8 rounded-full bg-[#f5f5f7] flex items-center justify-center text-[#5F5F5F] cursor-pointer hover:text-[#346DC2] hover:bg-[#e8e8e8] transition-all">
                <SchoolCardIcons.Heart />
              </div>
            </div>

            {/* Desktop Footer */}
            <div className="hidden md:flex footer-left items-center gap-2">
              <div className="like-indicator w-7 h-7 flex items-center justify-center text-[#5F5F5F] cursor-pointer">
                <SchoolCardIcons.Heart />
              </div>
            </div>
            <div className="hidden md:flex footer-actions items-center gap-2">
              <SchoolCardContextMenu schoolName={school.name} />
            </div>
          </div>
        )}

        {/* Hover Overlay for Grid Layout - Desktop Only */}
        {isGridLayout && (
          <div className="hidden md:flex absolute inset-0 bg-[rgba(255,255,255,0.98)] z-10 pt-6 pr-6 pb-3 pl-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 rounded-t-xl flex-col">

            {/* Hover Header */}
            <div className="flex gap-3 mb-3">
              <Image
                src={school.image}
                alt={school.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="font-semibold text-base text-[#464646] mr-2 flex-1 cursor-pointer hover:text-[#346DC2] hover:underline transition-all">
                {school.name}
              </div>
            </div>

            {/* Hover Stats */}
            <div className="flex gap-3 mb-4 text-[13px] text-[#5F5F5F]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#089E68]">$</span>
                <span>{school.price || "$53,790/yr"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#089E68]">A</span>
                <span>{school.grades || "9-12"}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-[#4A4A4A] line-clamp-5 mb-3">
              {school.description || "Excellent academic institution with outstanding faculty and facilities."}
            </p>

            {/* Review Link */}
            <div className="text-[13px] font-semibold text-[#346DC2] hover:underline cursor-pointer mb-auto">
              Read {school.reviews} reviews
            </div>

            {/* Hover Buttons */}
            <div className="flex gap-2 mt-auto">
              <button className="flex-1 py-3 rounded-lg bg-[#F5F5F7] text-[#464646] text-sm font-medium hover:bg-[#E8E8EA] transition-colors">
                More Info
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex-1 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors ${isLiked
                  ? 'bg-[#298541] text-white hover:bg-[#237036]'
                  : 'bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]'
                  }`}
              >
                <SchoolCardIcons.Heart />
                {isLiked ? 'Liked' : 'Like'}
              </button>
            </div>
          </div>
        )}

        {/* Hover Overlay for Classic Layout */}
        {isClassicLayout && (
          <div className="hover-overlay absolute top-0 left-0 w-full h-[calc(100%-60px)] bg-[rgba(255,255,255,0.98)] p-6 pr-8 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out flex flex-col z-10 rounded-t-[12px]" style={{ pointerEvents: 'auto' }}>
            <div className="hover-header flex gap-3 mb-3 min-w-0">
              <Image
                src={school.avatar}
                alt={school.name}
                width={40}
                height={40}
                className="school-avatar w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="hover-school-name text-base font-semibold text-[#464646] line-clamp-2 leading-[1.3] flex-1 min-w-0">
                {school.name}
              </div>
            </div>
            <div className="hover-stats flex gap-3 mb-4">
              <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                <SchoolCardIcons.Tuition />
                <span className="text-[#464646]">{school.price}</span>
              </div>
              <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                <div className="stat-icon flex-shrink-0">
                  <SchoolCardIcons.Ratio />
                </div>
                <span className="text-[#464646]">Grades {school.grades}</span>
              </div>
            </div>
            <div className="school-description text-sm leading-[1.6] text-[#4A4A4A] line-clamp-5 mb-3">
              {school.description}
            </div>
            <div className="review-count text-[13px] font-semibold text-[#346DC2] mb-4 cursor-pointer hover:underline transition-colors">
              Read {school.reviews} reviews
            </div>
            <div className="hover-buttons flex flex-col gap-2 mt-auto">
              <div className="hover-button button-info w-full py-3 px-3 rounded-lg text-sm font-medium cursor-pointer bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors flex items-center justify-center gap-2">
                More Info
              </div>
              <div className="hover-button button-like w-full py-3 px-3 rounded-lg text-sm font-medium cursor-pointer bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9] transition-colors flex items-center justify-center gap-2">
                <SchoolCardIcons.Heart />
                Like
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Options Drawer */}
      <MobileOptionsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        schoolName={school.name}
      />
    </div>
  );
};

export default SchoolCard;

