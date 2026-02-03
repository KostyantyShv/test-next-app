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
  const isMagazineLayout = layout === "magazine";
  const isCardLayout = layout === "card";
  const isGridLayout = layout === "grid";
  const isHybridLayout = layout === "hybrid";
  const isClassicLayout = layout === "classic";
  // Hover overlay is part of the HTML specs for these desktop cards.
  const showHoverOverlay = layout === "grid" || layout === "classic" || layout === "card";

  // Grid Layout (6) — match provided HTML structure/styles 1:1
  if (isGridLayout) {
    const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount = typeof school.reviews === "number"
      ? school.reviews
      : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    const ratingCountText = reviewsCount ? `(${reviewsCount})` : (school.rating || "").match(/\([^)]+\)/)?.[0] || "";

    const specialty = (() => {
      if (!school.specialty) return null;
      if (school.specialty === "hot") return { className: "text-[#FF4D4D]", icon: <SchoolCardIcons.Hot />, label: "High demand" };
      if (school.specialty === "instant-book")
        return { className: "text-[#1D77BD]", icon: <SchoolCardIcons.InstantBook />, label: "Instant book" };
      return { className: "text-[#FF9900]", icon: <SchoolCardIcons.Sponsored />, label: "Sponsored" };
    })();

    const secondStat = (() => {
      if (establishment === "Colleges" || establishment === "Graduates") {
        return { icon: <SchoolCardIcons.Duration />, value: school.duration || "—" };
      }
      if (establishment === "District") {
        return { icon: <SchoolCardIcons.TotalSchools />, value: String((school as any).totalSchools || "—") };
      }
      return { icon: <SchoolCardIcons.Ratio />, value: school.ratio || "—" };
    })();

    const footerStat = (() => {
      if (establishment === "Colleges") {
        return { icon: <SchoolCardIcons.SAT />, text: `SAT: ${school.sat || "—"}` };
      }
      return { icon: <SchoolCardIcons.Students />, text: `Students: ${school.students || "—"}` };
    })();

    const hoverStat1 = (() => {
      if (establishment === "District") {
        return { icon: <SchoolCardIcons.Ratio />, text: school.ratio || "—" };
      }
      const perYear = establishment === "K-12" || establishment === "Colleges";
      const price = school.price || "—";
      return { icon: <SchoolCardIcons.Tuition />, text: perYear && !price.includes("/") ? `${price}/yr` : price };
    })();

    const hoverStat2 = (() => {
      if (establishment === "Colleges") {
        return { icon: <SchoolCardIcons.Acceptance />, text: `Acceptance: ${school.acceptanceRate || (school as any).acceptance || "—"}` };
      }
      if (establishment === "Graduates") {
        return { icon: <SchoolCardIcons.MedianSalary />, text: `~${(school as any).medianSalary || "—"}` };
      }
      return { icon: <SchoolCardIcons.Grades />, text: `Grades: ${school.grades || "—"}` };
    })();

    const showReview = Boolean((school as any).review) && Math.random() > 0.5;

    return (
      <div className="school-card group relative flex flex-col bg-[var(--surface-secondary)] rounded-[12px] overflow-hidden shadow-[0_2px_8px_var(--shadow-color)] border border-[var(--border-color)] transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_20px_var(--shadow-color)]">
        {/* Image */}
        <div className="image-container relative w-full h-[160px] overflow-hidden">
          <Image src={school.image} alt={school.name} fill sizes="(max-width: 1055px) 33vw, 250px" className="school-image object-cover" />

          <button
            type="button"
            className={`like-button absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-[2] ${
              isLiked
                ? "bg-[var(--apply-button-bg)] text-[var(--header-green)] hover:bg-[var(--apply-button-hover)]"
                : "bg-[var(--surface-color)] text-[var(--text-default)] hover:bg-[var(--hover-bg)] hover:text-[var(--header-green)]"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked((v) => !v);
            }}
            aria-label="Like"
          >
            <SchoolCardIcons.Heart filled={isLiked} />
          </button>

          {specialty ? (
            <div className={`specialty-label absolute top-3 left-0 h-8 bg-[var(--surface-color)] rounded-r-[16px] flex items-center px-3 text-[12px] font-medium shadow-[0_2px_2px_var(--shadow-color)] z-[2] ${specialty.className}`}>
              <span className="[&>svg]:w-4 [&>svg]:h-4 mr-1">{specialty.icon}</span>
              {specialty.label}
            </div>
          ) : null}

          <div className="school-type-label absolute bottom-0 left-[10px] bg-[var(--surface-color)] px-2 pt-1 text-[11px] font-semibold text-[var(--bold-text)] tracking-[0.02em] rounded-t-[4px] h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_var(--shadow-color)] border border-[var(--border-color)] border-b-0">
            {school.schoolType}
          </div>
        </div>

        {/* Content */}
        <div className="school-content p-4 flex-1">
          {school.ranking ? (
            <div className="ranking-text text-[var(--active-green)] text-[13px] mb-2 whitespace-nowrap overflow-hidden text-ellipsis font-medium">
              {school.ranking}
            </div>
          ) : null}

          <div className="school-name text-[16px] font-semibold text-[var(--bold-text)] mb-2 leading-[1.4]">
            {school.name}
          </div>

          <div className="school-stats flex flex-wrap gap-3 mb-4">
            <div className="stat flex items-center gap-[6px] text-[13px] text-[var(--subtle-text)] tracking-[0.01em] font-[450]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[var(--subtle-text)]">
                <SchoolCardIcons.Location />
              </span>
              <span className="text-[var(--text-default)]">{school.location}</span>
            </div>

            <div className="stat flex items-center gap-[6px] text-[13px] text-[var(--subtle-text)] tracking-[0.01em] font-[450]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[var(--subtle-text)]">{secondStat.icon}</span>
              <span className="text-[var(--text-default)]">{secondStat.value}</span>
            </div>

            <div className="stat flex items-center gap-[6px] text-[13px] text-[var(--subtle-text)] tracking-[0.01em] font-[450]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[var(--subtle-text)]">
                <SchoolCardIcons.Star className="w-4 h-4 text-[var(--subtle-text)]" />
              </span>
              <span className="text-[var(--text-default)]">
                <strong className="font-semibold text-[var(--bold-text)]">{ratingNum}</strong> {ratingCountText}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="school-footer p-4 border-t border-[var(--border-color)] flex items-center justify-between">
          <div className="grade flex items-center gap-2 font-semibold text-[var(--header-green)]">
            <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-[14px] font-semibold">
              {school.grade}
            </div>
          </div>

          <div className="students-score flex items-center gap-[6px] text-[13px] text-[var(--subtle-text)]">
            <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[var(--success-green)]">{footerStat.icon}</span>
            <span className="whitespace-nowrap">{footerStat.text}</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="hover-overlay pointer-events-none absolute inset-0 bg-[var(--surface-color)] p-6 opacity-0 invisible transition-[opacity,visibility] duration-300 ease-in-out flex flex-col z-[10] group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto border border-[var(--border-color)] rounded-[12px]">
          <div className="hover-header flex justify-between gap-3 mb-4">
            <div className="hover-school-main flex gap-3">
              <Image src={school.avatar || school.image} alt={school.name} width={40} height={40} className="school-avatar w-10 h-10 rounded-lg object-cover" />
              <div className="hover-school-name text-[16px] font-semibold text-[var(--bold-text)] hover:text-[var(--link-text)] transition-colors cursor-pointer">
                {school.name}
              </div>
            </div>

            <div className="more-options relative w-8 h-8 flex items-center justify-center cursor-pointer -translate-y-1">
              <span className="absolute inset-0 m-auto w-7 h-7 rounded-full bg-transparent transition-colors duration-200 hover:bg-[var(--hover-bg)]" />
              <div className="relative z-[1] w-8 h-8 flex items-center justify-center">
                <SchoolCardContextMenu
                  schoolName={school.name}
                  buttonClassName="w-8 h-8 bg-transparent border-none flex items-center justify-center text-[var(--subtle-text)] pointer-events-auto"
                />
              </div>
            </div>
          </div>

          <div className="hover-stats flex gap-3 mb-4">
            <div className="hover-stat flex items-center gap-[6px] text-[13px] text-[var(--subtle-text)]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[var(--success-green)]">{hoverStat1.icon}</span>
              <span className="text-[var(--text-default)]">{hoverStat1.text}</span>
            </div>
            <div className="hover-stat flex items-center gap-[6px] text-[13px] text-[var(--subtle-text)]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[var(--success-green)]">{hoverStat2.icon}</span>
              <span className="text-[var(--text-default)]">{hoverStat2.text}</span>
            </div>
          </div>

          <div className="school-description text-[14px] leading-[1.6] text-[var(--text-default)] line-clamp-3 mb-3">
            {showReview ? (
              <>
                <span className="reviewer-type font-semibold text-[var(--bold-text)] mr-1">
                  {(school as any).reviewerType || "Parent"}:
                </span>
                {(school as any).review}
              </>
            ) : (
              school.description
            )}
          </div>

          <div className="review-count text-[13px] font-semibold text-[var(--link-text)] mb-4 cursor-pointer hover:text-[var(--verification-blue)] hover:underline">
            Read {school.reviews} reviews
          </div>

          <div className="hover-buttons flex gap-3 mt-auto">
            <button type="button" className="hover-button button-info flex-1 py-3 rounded-lg text-[14px] font-medium bg-[var(--surface-secondary)] text-[var(--text-default)] hover:bg-[var(--hover-bg)] transition-colors border border-[var(--border-color)]">
              More Info
            </button>
            <button
              type="button"
              className="hover-button button-like flex-1 py-3 rounded-lg text-[14px] font-medium bg-[var(--success-green)] text-white hover:bg-[var(--active-green)] transition-colors flex items-center justify-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked((v) => !v);
              }}
            >
              <span className="[&>svg]:w-4 [&>svg]:h-4">
                <SchoolCardIcons.Heart filled={false} />
              </span>
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Card Layout (6.5) — keep previous implementation
  if (isCardLayout) {
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
                } [&>svg]:w-4 [&>svg]:h-4`}
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
          <div className="image-container relative w-full overflow-hidden" style={{ height: 140 }}>
            <button
              type="button"
              className="options-button absolute bg-white rounded-full flex items-center justify-center cursor-pointer text-[#4A4A4A] transition-all z-[2] border-none p-0 hover:bg-[#f5f5f5]"
              style={{ top: 8, right: 8, width: 28, height: 28, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
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
                className={`specialty-label absolute bg-white flex items-center z-[2] font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${
                  school.specialty === "hot"
                    ? "text-[#FF4D4D]"
                    : school.specialty === "instant-book"
                      ? "text-[#1D77BD]"
                      : "text-[#FF9900]"
                }`}
                style={{ top: 8, left: 0, height: 28, borderRadius: '0 14px 14px 0', padding: '0 10px', fontSize: 11 }}
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

            <div
              className="school-type-label absolute bottom-0 bg-white text-[#464646] flex items-center z-[2] uppercase font-semibold tracking-[0.02em]"
              style={{ left: 10, padding: '4px 8px 0 8px', fontSize: 11, height: 24, borderRadius: '4px 4px 0 0', boxShadow: '0 -1px 4px rgba(0,0,0,0.1)' }}
            >
              {school.schoolType}
            </div>
          </div>

          <div className="school-content" style={{ padding: 12 }}>
            {school.ranking ? (
              <div className="ranking-text text-[#089E68] text-[13px] whitespace-nowrap overflow-hidden text-ellipsis font-medium max-w-full">
                {school.ranking}
              </div>
            ) : null}

            <h3 className="school-name text-[#464646] leading-[1.4] line-clamp-3" style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
              {school.name}
            </h3>

            <div className="school-stats flex flex-wrap text-[#5F5F5F] tracking-[0.01em] font-[450]" style={{ gap: 8, marginBottom: 12, fontSize: 13 }}>
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

            <div
              className="school-footer flex items-center justify-between border-t border-[#E5E7EB] bg-[#F4F6FA]"
              style={{ padding: '10px 12px', margin: '0 -12px -12px -12px', borderRadius: '0 0 12px 12px' }}
            >
              <div className={`grade-circle rounded-full flex items-center justify-center text-white font-semibold ${getGradeClass(school.grade)}`} style={{ width: 28, height: 28, fontSize: 12 }}>
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
                  className="info-button rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-all hover:text-[#346DC2] border-none bg-transparent"
                  style={{ width: 28, height: 28, marginLeft: 8 }}
                  onClick={(e) => { e.stopPropagation(); setIsInfoOpen(true); }}
                  aria-label="More info"
                >
                  <svg fill="none" viewBox="0 0 20 20" width={18} height={18}>
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
              <div
                className="fixed bottom-0 left-0 right-0 z-[101] bg-white overflow-hidden flex flex-col"
                style={{ maxHeight: '80%', borderRadius: '16px 16px 0 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.15)' }}
              >
                <div className="sticky top-0 bg-white border-b flex items-center relative z-10" style={{ padding: 16, borderColor: 'rgba(0,0,0,0.1)' }}>
                  <div className="flex gap-3 items-center flex-1 min-w-0">
                    <Image src={school.avatar || school.image} alt={school.name} width={40} height={40} className="rounded-lg object-cover shrink-0" style={{ borderRadius: 8 }} />
                    <span className="hover-school-name text-[#464646] leading-[1.3] font-semibold truncate" style={{ fontSize: 16, marginRight: 60 }}>{school.name}</span>
                  </div>
                  <button
                    type="button"
                    className="more-options absolute flex items-center justify-center cursor-pointer text-[#5F5F5F] rounded-full w-8 h-8 border-none bg-transparent hover:bg-[#f5f5f7]"
                    style={{ right: 44, top: 12 }}
                    aria-label="More options"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" width={16} height={16}>
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                  <button
                    className="drawer-close absolute flex items-center justify-center border-none bg-transparent cursor-pointer text-[#5F5F5F] rounded-full w-8 h-8"
                    style={{ right: 16, top: 12 }}
                    onClick={() => setIsInfoOpen(false)}
                    type="button"
                    aria-label="Close"
                  >
                    <svg viewBox="0 0 20 20" fill="none" width={20} height={20}>
                      <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <div className="drawer-body overflow-y-auto flex-grow bg-white" style={{ padding: 16, maxHeight: 'calc(100% - 120px)' }}>
                  <div className="hover-stats flex flex-wrap mb-4" style={{ gap: '12px 16px' }}>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]"><SchoolCardIcons.Tuition /></span>
                      <span>{hoverTuition}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{hoverStat2.icon}</span>
                      <span>{hoverStat2.label}</span>
                    </div>
                  </div>
                  <p className="school-description text-[#4A4A4A] mb-4" style={{ fontSize: 14, lineHeight: 1.6 }}>
                    <strong className="text-[#464646]">{(school as any).reviewerType || 'Parent'}:</strong> {school.description}
                  </p>
                  <div className="review-count text-[#346DC2] font-medium cursor-pointer hover:underline mb-4" style={{ fontSize: 13 }}>
                    Read {reviewsCount} reviews
                  </div>
                </div>
                <div className="drawer-footer border-t bg-white sticky bottom-0" style={{ padding: 16, borderColor: 'rgba(0,0,0,0.1)' }}>
                  <div className="hover-buttons flex gap-3 w-full">
                    <button className="button-info flex-1 py-3 rounded-lg font-medium text-center cursor-pointer transition-colors border-none bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]" style={{ fontSize: 14 }} type="button">
                      More Info
                    </button>
                    <button
                      className={`button-like flex-1 py-3 rounded-lg font-medium text-center cursor-pointer transition-colors border-none flex items-center justify-center gap-2 ${
                        isLiked ? 'bg-[#298541] text-white' : 'bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]'
                      }`}
                      style={{ fontSize: 14 }}
                      onClick={() => setIsLiked((v) => !v)}
                      type="button"
                    >
                      <SchoolCardIcons.Heart filled={isLiked} className="w-4 h-4" />
                      {isLiked ? 'Liked' : 'Like'}
                    </button>
                  </div>
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
                <span className="text-[#089E68] [&>svg]:w-4 [&>svg]:h-4">
                  <SchoolCardIcons.Tuition />
                </span>
                <span>{hoverTuition}</span>
              </div>
              <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                <span className="text-[#089E68] [&>svg]:w-4 [&>svg]:h-4">{hoverStat2.icon}</span>
                <span>{hoverStat2.label}</span>
              </div>
            </div>

            <p className="description text-sm leading-[1.6] text-[#4A4A4A] overflow-hidden mb-3 line-clamp-5">
              {Boolean((school as any).review) && school.name.length % 2 === 0 ? (
                <>
                  <span className="reviewer-type font-semibold mr-1">
                    {(school as any).reviewerType || "Parent"}:
                  </span>
                  {(school as any).review}
                </>
              ) : (
                school.description
              )}
            </p>

            <div className="review-count text-[13px] font-semibold text-[#346DC2] mb-4 cursor-pointer hover:underline">
              Read {reviewsCount} reviews
            </div>

            <div className="hover-buttons flex flex-row gap-2 mt-auto">
              <button
                className="hover-button flex-1 py-3 px-3 rounded-lg text-sm font-medium cursor-pointer bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors flex items-center justify-center gap-2"
                type="button"
              >
                More Info
              </button>
              <button
                type="button"
                className={`hover-button flex-1 py-3 px-3 rounded-lg text-sm font-medium cursor-pointer transition-colors flex items-center justify-center gap-2 ${
                  isLiked
                    ? "bg-[#298541] text-white"
                    : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked((v) => !v);
                }}
              >
                <span className="[&>svg]:w-4 [&>svg]:h-4">
                  <SchoolCardIcons.Heart filled={isLiked} />
                </span>
                {isLiked ? "Liked" : "Like"}
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
      <div className="school-card flex flex-col max-[768px]:flex-col min-[577px]:flex-row p-5 border border-[rgba(0,0,0,0.08)] rounded-xl transition-all duration-200 ease-in-out relative overflow-visible hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:border-[rgba(1,104,83,0.2)]">
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
              {school.verified !== false ? (
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
                  // Make dots horizontal (match HTML ellipsis)
                  buttonClassName="more-options w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-colors mt-[-3px] hover:bg-[#F5F5F7] hover:text-[#464646] pointer-events-auto [&_svg]:rotate-90 [&_svg]:w-[18px] [&_svg]:h-[18px]"
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

  // Magazine Layout (Desktop + responsive) — match provided HTML "Magazine Style (10)" 1:1
  if (isMagazineLayout) {
    const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount =
      typeof school.reviews === "number" ? school.reviews : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    const specialtyMeta = (() => {
      if (!school.specialty) return null;
      if (school.specialty === "hot") return { className: "hot text-[#FF4D4D]", icon: <SchoolCardIcons.Hot />, label: "High demand" };
      if (school.specialty === "instant-book")
        return { className: "instant-book text-[#1D77BD]", icon: <SchoolCardIcons.InstantBook />, label: "Instant book" };
      return { className: "sponsored text-[#FF9900]", icon: <SchoolCardIcons.Sponsored />, label: "Sponsored" };
    })();

    const formatNumber = (value?: string) => {
      if (!value) return "—";
      const num = Number(String(value).replace(/[^\d]/g, ""));
      return Number.isFinite(num) ? num.toLocaleString() : value;
    };

    const medianSalaryRaw = (school as any).medianSalary as string | undefined;
    const medianSalaryText = medianSalaryRaw ? (medianSalaryRaw.includes("$") ? medianSalaryRaw : `$${medianSalaryRaw}`) : "—";

    const primaryStats: Array<{ icon: React.ReactNode; text: string; tooltip: string }> = (() => {
      const base: Array<{ icon: React.ReactNode; text: string; tooltip: string }> = [
        { icon: <SchoolCardIcons.Location />, text: school.location, tooltip: "Location" },
        {
          icon: <SchoolCardIcons.Star className="w-4 h-4 text-[#565656]" />,
          text: `${ratingNum} (${reviewsCount})`,
          tooltip: "Rating & Reviews",
        },
      ];

      if (establishment === "K-12") {
        return [
          ...base,
          { icon: <SchoolCardIcons.Ratio />, text: school.ratio, tooltip: "Student to Teacher Ratio" },
          { icon: <SchoolCardIcons.Students />, text: formatNumber(school.students), tooltip: "Students" },
          { icon: <SchoolCardIcons.Tuition />, text: school.price, tooltip: "Tuition per Year" },
        ];
      }

      if (establishment === "Colleges") {
        return [
          ...base,
          { icon: <SchoolCardIcons.Duration />, text: school.duration || "—", tooltip: "Duration" },
          { icon: <SchoolCardIcons.SAT />, text: school.sat || "—", tooltip: "SAT Range" },
          { icon: <SchoolCardIcons.Tuition />, text: school.price, tooltip: "Tuition per Year" },
        ];
      }

      if (establishment === "Graduates") {
        return [
          ...base,
          { icon: <SchoolCardIcons.Duration />, text: school.duration || "—", tooltip: "Duration" },
          { icon: <SchoolCardIcons.Students />, text: formatNumber(school.students), tooltip: "Students" },
          { icon: <SchoolCardIcons.MedianSalary />, text: medianSalaryText, tooltip: "Median Salary" },
        ];
      }

      // District
      const totalSchools = (school as any).totalSchools as string | undefined;
      return [
        ...base,
        { icon: <SchoolCardIcons.TotalSchools />, text: totalSchools ? `${totalSchools} Schools` : "—", tooltip: "Total Schools" },
        { icon: <SchoolCardIcons.Students />, text: formatNumber(school.students), tooltip: "Students" },
        { icon: <SchoolCardIcons.Ratio />, text: school.ratio, tooltip: "Student to Teacher Ratio" },
      ];
    })();

    return (
      <div className="school-card bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-in-out border border-[#E5E7EB] flex relative min-h-[280px] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] max-[1024px]:flex-col max-[1024px]:min-h-0">
        {/* Content Section */}
        <div className="content-section flex-1 p-6 flex flex-col justify-between">
          <div className="content-main flex-1">
            {school.ranking ? <div className="ranking-text text-[#089E68] text-[13px] mb-2 font-medium">{school.ranking}</div> : null}

            <div className="name-section flex items-start gap-3 mb-3">
              <h3 className="school-name text-[20px] font-semibold text-[#464646] leading-[1.4] cursor-pointer hover:text-[#346DC2] transition-colors">
                {school.name}
              </h3>
              <div className="verified-badge w-6 h-6 bg-[rgba(29,119,189,0.1)] rounded-md flex items-center justify-center flex-shrink-0">
                <SchoolCardIcons.Verified />
              </div>
            </div>

            <div className="primary-stats flex gap-6 mb-4 flex-wrap max-[1024px]:flex-col max-[1024px]:gap-3 max-[1024px]:items-start">
              {primaryStats.map((s, idx) => (
                <div key={idx} className="stat relative group flex items-center gap-2 text-sm text-[#5F5F5F] leading-none">
                  <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656] flex-shrink-0 block">{s.icon}</span>
                  <span className="text-[#464646] font-medium leading-none">{s.text}</span>
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[125%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 bg-black/80 text-white text-center rounded px-2 py-1 text-xs font-medium whitespace-nowrap z-10">
                    {s.tooltip}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-black/80" />
                  </span>
                </div>
              ))}
            </div>

            <p className="description text-sm leading-[1.6] text-[#4A4A4A] mb-4 line-clamp-3">{school.description}</p>
          </div>

          <div className="card-footer flex items-center justify-between pt-4 border-t border-[#f0f0f0] mt-4 max-[1024px]:flex-col max-[1024px]:gap-4 max-[1024px]:items-start">
            <div className="secondary-stats flex items-center gap-6 flex-wrap max-[1024px]:flex-col max-[1024px]:gap-3 max-[1024px]:items-start">
              <div className="grade flex items-center gap-2 relative group">
                <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
                  {school.grade}
                </div>
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap z-10">
                  {school.grade} Overall Grade
                </div>
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[34px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-black/80 z-10" />
              </div>
            </div>

            <div className="footer-options flex items-center gap-2 max-[1024px]:w-full max-[1024px]:justify-between">
              <div className="footer-actions flex gap-2 max-[1024px]:w-full">
                <button type="button" className="action-button info-button h-9 px-4 rounded-lg text-sm font-medium bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors max-[1024px]:flex-1">
                  More Info
                </button>
                <button
                  type="button"
                  className={`action-button apply-button h-9 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 max-[1024px]:flex-1 ${
                    isLiked ? "liked bg-[#E6F7F0] text-[#016853] hover:bg-[#D1F0E4]" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                  }`}
                  onClick={() => setIsLiked((v) => !v)}
                >
                  <SchoolCardIcons.Heart filled={isLiked} />
                  <span>{isLiked ? "Liked" : "Like"}</span>
                </button>
              </div>

              <div className="footer-icon-button w-9 h-9 bg-[#F5F5F7] rounded-[12px] flex items-center justify-center cursor-pointer text-[#5F5F5F] hover:bg-[#E8E8EA] transition-colors flex-shrink-0">
                <SchoolCardContextMenu
                  schoolName={school.name}
                  buttonClassName="w-9 h-9 bg-transparent border-none flex items-center justify-center text-[#5F5F5F]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="image-section w-[280px] relative flex flex-col max-[1024px]:w-full max-[1024px]:h-[200px]">
          {specialtyMeta ? (
            <div
              className={`specialty-label absolute top-6 right-0 h-8 bg-white rounded-l-xl flex items-center px-2.5 cursor-pointer transition-all z-[2] text-xs font-medium shadow-[-1px_2px_2px_rgba(0,0,0,0.1)] ${specialtyMeta.className} max-[1024px]:right-3 max-[1024px]:top-3 max-[1024px]:rounded-xl max-[1024px]:shadow-[0_2px_4px_rgba(0,0,0,0.1)]`}
            >
              <span className="[&>svg]:w-4 [&>svg]:h-4 mr-1">{specialtyMeta.icon}</span>
              {specialtyMeta.label}
            </div>
          ) : null}

          <div className="relative flex-1 min-h-[280px] max-[1024px]:min-h-0">
            <Image src={school.image} alt={school.name} fill sizes="(max-width: 1024px) 100vw, 280px" className="object-cover" />
          </div>

          <div className="school-type-badge absolute bottom-0 left-0 right-0 bg-black/80 text-white py-3 px-4 text-[13px] font-medium text-center">
            {school.schoolType}
          </div>
        </div>
      </div>
    );
  }

  // List Layout (Desktop + responsive) — match provided HTML structure/styles 1:1
  if (isListLayout) {
    const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount =
      typeof school.reviews === "number" ? school.reviews : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    const tuitionText = (() => {
      const price = school.price || "—";
      const perYear = establishment === "K-12" || establishment === "Colleges";
      if (!perYear) return price;
      return price.includes("/") ? price : `${price}/yr`;
    })();

    const specialty = (() => {
      if (!school.specialty) return null;
      if (school.specialty === "hot") return { className: "text-[#FF4D4D]", icon: <SchoolCardIcons.Hot />, label: "High demand" };
      if (school.specialty === "instant-book")
        return { className: "text-[#1D77BD]", icon: <SchoolCardIcons.InstantBook />, label: "Instant book" };
      return { className: "text-[#FF9900]", icon: <SchoolCardIcons.Sponsored />, label: "Sponsored" };
    })();

    const StatWithTooltip = ({
      icon,
      text,
      tooltip,
    }: {
      icon: React.ReactNode;
      text: string;
      tooltip?: string;
    }) => (
      <div className={`stat flex items-center gap-2 text-sm text-[#5F5F5F] ${tooltip ? "relative group" : ""}`}>
        <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656] flex-shrink-0">{icon}</span>
        <span className="text-[#464646] font-medium">{text}</span>
        {tooltip ? (
          <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[125%] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-300 bg-black/80 text-white text-center rounded px-2 py-1 text-xs font-medium whitespace-nowrap z-10">
            {tooltip}
            <span className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-black/80" />
          </span>
        ) : null}
      </div>
    );

    const secondStat = (() => {
      if (establishment === "K-12") {
        return <StatWithTooltip icon={<SchoolCardIcons.Ratio />} text={school.ratio || "—"} tooltip="Student to Teacher Ratio" />;
      }
      if (establishment === "Colleges") {
        return <StatWithTooltip icon={<SchoolCardIcons.Duration />} text={school.duration || "—"} tooltip="Duration" />;
      }
      if (establishment === "Graduates") {
        return <StatWithTooltip icon={<SchoolCardIcons.Duration />} text={school.duration || "—"} tooltip="Duration" />;
      }
      // District
      return (
        <StatWithTooltip
          icon={<SchoolCardIcons.TotalSchools />}
          text={String((school as any).totalSchools || "—")}
          tooltip="Total Schools"
        />
      );
    })();

    const metrics = (() => {
      if (establishment === "K-12") {
        return (
          <>
            <div className="students-count flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.Students />
              </span>
              <span className="text-[#464646] font-medium">Students: {(school.students as any)?.toLocaleString?.() || school.students || "—"}</span>
            </div>
            <div className="tuition flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.Tuition />
              </span>
              <span className="text-[#464646] font-medium">{tuitionText}</span>
            </div>
            <div className="grade-range flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.Grades />
              </span>
              <span className="text-[#464646] font-medium">Grades: {school.grades || "—"}</span>
            </div>
          </>
        );
      }

      if (establishment === "Colleges") {
        return (
          <>
            <div className="sat-score flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.SAT />
              </span>
              <span className="text-[#464646] font-medium">SAT: {school.sat || "—"}</span>
            </div>
            <div className="tuition flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.Tuition />
              </span>
              <span className="text-[#464646] font-medium">{tuitionText}</span>
            </div>
            <div className="acceptance flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.Acceptance />
              </span>
              <span className="text-[#464646] font-medium">Acceptance: {(school as any).acceptance || school.acceptanceRate || "—"}</span>
            </div>
          </>
        );
      }

      if (establishment === "Graduates") {
        return (
          <>
            <div className="students-count flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.Students />
              </span>
              <span className="text-[#464646] font-medium">Students: {(school.students as any)?.toLocaleString?.() || school.students || "—"}</span>
            </div>
            <div className="tuition flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.Tuition />
              </span>
              <span className="text-[#464646] font-medium">{school.price || "—"}</span>
            </div>
            <div className="median-salary flex items-center gap-2 text-sm text-[#5F5F5F]">
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.MedianSalary />
              </span>
              <span className="text-[#464646] font-medium">~{(school as any).medianSalary || "—"}</span>
            </div>
          </>
        );
      }

      // District
      return (
        <>
          <div className="students-count flex items-center gap-2 text-sm text-[#5F5F5F]">
            <span className="[&>svg]:text-[#089E68]">
              <SchoolCardIcons.Students />
            </span>
            <span className="text-[#464646] font-medium">Students: {(school.students as any)?.toLocaleString?.() || school.students || "—"}</span>
          </div>
          <StatWithTooltip
            icon={
              <span className="[&>svg]:text-[#089E68]">
                <SchoolCardIcons.Ratio />
              </span>
            }
            text={school.ratio || "—"}
            tooltip="Student to Teacher Ratio"
          />
          <div className="grade-range flex items-center gap-2 text-sm text-[#5F5F5F]">
            <span className="[&>svg]:text-[#089E68]">
              <SchoolCardIcons.Grades />
            </span>
            <span className="text-[#464646] font-medium">Grades: {school.grades || "—"}</span>
          </div>
        </>
      );
    })();

    return (
      <div className="school-card bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-in-out border border-[#E5E7EB] flex relative hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] max-[1024px]:flex-col">
        {/* Image section (left) */}
        <div className="image-section w-[280px] flex flex-col pr-6 pt-6 relative max-[1024px]:w-full max-[1024px]:px-6">
          {/* Specialty */}
          {specialty ? (
            <div className={`specialty-label absolute top-9 left-3 h-8 bg-white rounded-r-xl flex items-center px-2.5 text-xs font-medium shadow-[1px_2px_2px_rgba(0,0,0,0.1)] z-[2] ${specialty.className}`}>
              <span className="[&>svg]:w-4 [&>svg]:h-4 mr-1">{specialty.icon}</span>
              {specialty.label}
            </div>
          ) : null}

          {/* Options */}
          <div className="options-button absolute top-9 right-6 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-all z-[2] shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:bg-[#F5F5F7]">
            <SchoolCardContextMenu
              schoolName={school.name}
              buttonClassName="w-8 h-8 bg-transparent border-none flex items-center justify-center text-[#5F5F5F]"
            />
          </div>

          <Image
            src={school.image}
            alt={school.name}
            width={280}
            height={148}
            className="school-image h-[148px] w-full object-cover rounded-lg ml-3 max-[1024px]:ml-0 max-[1024px]:h-[200px]"
          />

          <div className="image-buttons flex gap-2 py-3 ml-3 w-full max-[1024px]:ml-0 max-[1024px]:w-full">
            <div className="school-type-full w-full px-4 py-2 text-center bg-[#F5F5F7] text-[#464646] text-[13px] font-medium rounded-lg">
              {school.schoolType}
            </div>
          </div>
        </div>

        {/* Content section */}
        <div className="content-section flex-1 p-6 flex flex-col">
          {school.ranking ? <div className="ranking-text text-[#089E68] text-[13px] mb-2 font-medium">{school.ranking}</div> : null}

          <div className="name-section flex items-center gap-2 relative">
            <h3 className="school-name text-[20px] font-semibold text-[#464646] mb-3 leading-[1.4] cursor-pointer hover:text-[#346DC2] transition-colors">
              {school.name}
            </h3>
            <div className="verified-badge w-6 h-6 bg-[rgba(29,119,189,0.1)] rounded-md flex items-center justify-center -mt-1.5">
              <SchoolCardIcons.Verified />
            </div>
          </div>

          <div className="stats-section flex gap-6 mb-4 max-[1024px]:flex-col max-[1024px]:gap-3">
            <div className="stat-group flex gap-6">
              <StatWithTooltip icon={<SchoolCardIcons.Location />} text={school.location} tooltip="Location" />
              {secondStat}
            </div>
            <div className="stat-group flex gap-6">
              <StatWithTooltip
                icon={<SchoolCardIcons.Star />}
                text={`${ratingNum} (${reviewsCount})`}
                tooltip="Rating"
              />
            </div>
          </div>

          <p className="description text-sm leading-[1.6] text-[#4A4A4A] mb-4 line-clamp-2">{school.description}</p>

          <div className="footer-section mt-auto flex items-center justify-between max-[1024px]:flex-col max-[1024px]:gap-4 max-[1024px]:items-start">
            <div className="metrics flex items-center gap-6 flex-wrap max-[1024px]:flex-col max-[1024px]:items-start">
              <div className="grade flex items-center gap-2 relative group">
                <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-sm font-semibold cursor-pointer">
                  {school.grade}
                </div>
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/80 text-white px-2.5 py-1.5 rounded text-xs whitespace-nowrap z-10">
                  {school.grade} Overall Grade
                </div>
                <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-[34px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-black/80 z-10" />
              </div>
              {metrics}
            </div>

            <div className="actions flex gap-2">
              <button type="button" className="action-button info-button h-9 px-4 rounded-lg text-sm font-medium bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors">
                More Info
              </button>
              <button
                type="button"
                className={`action-button apply-button h-9 px-4 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  isLiked ? "bg-[#E6F7F0] text-[#016853] hover:bg-[#D1F0E4]" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                }`}
                onClick={() => setIsLiked((v) => !v)}
              >
                <SchoolCardIcons.Heart filled={isLiked} />
                <span>{isLiked ? "Liked" : "Like"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Classic Layout (Desktop) — match provided HTML 1:1
  if (isClassicLayout) {
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
    const reviewsCount =
      typeof school.reviews === "number"
        ? school.reviews
        : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    const specialty = (() => {
      if (!school.specialty) return null;
      if (school.specialty === "hot")
        return {
          className: "hot bg-[rgba(255,77,77,0.1)] text-[#FF4D4D]",
          icon: <SchoolCardIcons.Hot />,
          label: "High demand",
        };
      if (school.specialty === "instant-book")
        return {
          className: "instant-book bg-[rgba(29,119,189,0.1)] text-[#1D77BD]",
          icon: <SchoolCardIcons.InstantBook />,
          label: "Instant book",
        };
      return {
        className: "sponsored bg-[rgba(255,153,0,0.1)] text-[#FF9900]",
        icon: <SchoolCardIcons.Sponsored />,
        label: "Sponsored",
      };
    })();

    const stats = (() => {
      if (establishment === "K-12") {
        return [
          { label: "Location", value: school.location || "—", icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
          { label: "Ratio", value: school.ratio || "—", icon: <SchoolCardIcons.Ratio className="text-[#089E68]" /> },
          {
            label: "Students",
            value: (school.students as any)?.toLocaleString?.() || (school.students as any) || "—",
            icon: <SchoolCardIcons.Students className="text-[#089E68]" />,
          },
          {
            label: "Rating",
            valueNode: (
              <>
                <strong className="font-bold">{ratingNum}</strong>{" "}
                <span className="font-normal">({reviewsCount || "—"})</span>
              </>
            ),
            icon: <SchoolCardIcons.StarOutline className="w-4 h-4 text-[#089E68]" />,
          },
        ];
      }

      if (establishment === "Colleges") {
        return [
          { label: "Location", value: school.location || "—", icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
          { label: "Duration", value: school.duration || "—", icon: <SchoolCardIcons.Duration className="text-[#089E68]" /> },
          { label: "Tuition", value: school.price || "—", icon: <SchoolCardIcons.Tuition className="text-[#089E68]" /> },
          {
            label: "Acceptance",
            value: (school as any).acceptance || school.acceptanceRate || "—",
            icon: <SchoolCardIcons.Acceptance className="text-[#089E68]" />,
          },
        ];
      }

      if (establishment === "Graduates") {
        return [
          { label: "Location", value: school.location || "—", icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
          { label: "Duration", value: school.duration || "—", icon: <SchoolCardIcons.Duration className="text-[#089E68]" /> },
          { label: "Tuition", value: school.price || "—", icon: <SchoolCardIcons.Tuition className="text-[#089E68]" /> },
          {
            label: "Students",
            value: (school.students as any)?.toLocaleString?.() || (school.students as any) || "—",
            icon: <SchoolCardIcons.Students className="text-[#089E68]" />,
          },
        ];
      }

      // District
      return [
        { label: "Location", value: school.location || "—", icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
        { label: "Schools", value: String((school as any).totalSchools || "—"), icon: <SchoolCardIcons.TotalSchools className="text-[#089E68]" /> },
        {
          label: "Students",
          value: (school.students as any)?.toLocaleString?.() || (school.students as any) || "—",
          icon: <SchoolCardIcons.Students className="text-[#089E68]" />,
        },
        {
          label: "Rating",
          valueNode: (
            <>
              <strong className="font-bold">{ratingNum}</strong>{" "}
              <span className="font-normal">({reviewsCount || "—"})</span>
            </>
          ),
          icon: <SchoolCardIcons.StarOutline className="w-4 h-4 text-[#089E68]" />,
        },
      ];
    })();

    const hoverStats = (() => {
      if (establishment === "K-12") {
        return [
          { icon: <SchoolCardIcons.Tuition />, text: school.price || "—" },
          { icon: <SchoolCardIcons.Grades />, text: school.grades || "—" },
        ];
      }
      if (establishment === "Colleges") {
        return [{ icon: <SchoolCardIcons.SAT />, text: `SAT: ${school.sat || "—"}` }];
      }
      if (establishment === "Graduates") {
        return [{ icon: <SchoolCardIcons.MedianSalary />, text: `Median: ${(school as any).medianSalary || "—"}` }];
      }
      return [
        { icon: <SchoolCardIcons.Ratio />, text: school.ratio || "—" },
        { icon: <SchoolCardIcons.Grades />, text: school.grades || "—" },
      ];
    })();

    const reviewerType = (school as any).reviewerType || "Parent";

    return (
      <div className="school-card classic-card group relative flex flex-col bg-white rounded-[12px] overflow-visible border border-[rgba(0,0,0,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-[rgba(1,104,83,0.2)]">
        {/* Specialty badge / placeholder */}
        {specialty ? (
          <div className={`specialty-badge absolute top-0 left-0 right-0 px-3 py-2 text-[13px] font-medium flex items-center justify-center gap-1.5 leading-none rounded-t-[12px] z-[2] ${specialty.className}`}>
            <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{specialty.icon}</span>
            {specialty.label}
          </div>
        ) : (
          <div className="empty-badge absolute top-0 left-0 right-0 h-8 bg-[#F5F5F7] rounded-t-[12px] z-[1]" />
        )}

        {/* Header */}
        <div className="card-header flex px-4 pt-10 pb-3 items-start gap-3 h-[108px]">
          <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
            {school.grade}
          </div>
          <div className="school-info flex-1 min-w-0 overflow-hidden">
            <div className="school-name text-[16px] font-semibold text-[#464646] mb-1 leading-[1.3] line-clamp-2 overflow-hidden">
              {truncateName(school.name)}
            </div>
            {school.ranking ? (
              <div className="ranking-text text-[#089E68] text-xs font-medium leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-16px)] pr-2.5">
                {school.ranking}
              </div>
            ) : null}
          </div>
        </div>

        {/* Image */}
        <div className="image-container relative w-full p-3 pb-0">
          <Image
            src={school.image}
            alt={school.name}
            width={720}
            height={720}
            className="school-image w-full h-[140px] object-cover rounded-lg"
          />
          <div className="school-type-label absolute bottom-1 left-[18px] bg-white px-2 pt-1 text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-[4px] h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
            {school.schoolType}
          </div>
        </div>

        {/* Content */}
        <div className="school-content p-4 flex flex-col h-[160px]">
          {/* Make left column (Location/Students) slightly wider */}
          <div className="stats-section grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-2.5 mb-4">
            {stats.map((s: any) => (
              <div key={s.label} className="stat flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg" data-tooltip={s.label}>
                <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                  {s.icon}
                </div>
                <div className="stat-content flex flex-col gap-1">
                  <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">{s.label}</div>
                  <div className="stat-value text-[12px] text-[#464646] font-semibold leading-[1.3]">
                    {s.valueNode ?? s.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="school-footer mt-2 h-[52px] px-4 py-2 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between relative z-20">
          <div className="footer-left flex items-center gap-2 flex-1">
            <button
              type="button"
              className={`like-indicator w-7 h-7 flex items-center justify-center cursor-pointer ${
                isLiked ? "text-[#298541]" : "text-[#5F5F5F]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked((v) => !v);
              }}
              aria-pressed={isLiked}
              aria-label="Like"
            >
              <span className="[&>svg]:w-[18px] [&>svg]:h-[18px]">
                <SchoolCardIcons.Heart filled={isLiked} />
              </span>
            </button>
          </div>

          <div className="footer-actions flex items-center gap-2 ml-auto">
            <SchoolCardContextMenu
              schoolName={school.name}
              preferredPlacement="top"
              buttonClassName="options-button relative z-30 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all hover:text-[#346DC2] hover:bg-[#e8e8e8] pointer-events-auto [&_svg]:w-[14px] [&_svg]:h-[14px]"
            />
          </div>
        </div>

        {/* Hover overlay
            Note: keep overlay visible on hover but do NOT steal hover from underlying stats/tooltips. */}
        <div className="hover-overlay pointer-events-none absolute top-0 left-0 w-full h-[calc(100%-60px)] bg-[rgba(255,255,255,0.98)] p-6 opacity-0 invisible transition-opacity duration-300 ease-in-out flex flex-col z-10 rounded-t-[12px] group-hover:opacity-100 group-hover:visible">
          <div className="hover-header flex gap-3 mb-3">
            <Image
              src={school.avatar || school.image}
              alt={school.name}
              width={40}
              height={40}
              className="school-avatar w-10 h-10 rounded-lg object-cover"
            />
            <div className="hover-school-name text-[16px] font-semibold text-[#464646] line-clamp-2 leading-[1.3]">
              {school.name}
            </div>
          </div>

          <div className="hover-stats flex gap-3 mb-4">
            {hoverStats.map((s, idx) => (
              <div key={idx} className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{s.icon}</span>
                <span className="text-[#464646]">{s.text}</span>
              </div>
            ))}
          </div>

          <div className="school-description text-[14px] leading-[1.6] text-[#4A4A4A] line-clamp-5 mb-3">
            <strong className="font-semibold text-[#464646] mr-1">{reviewerType}:</strong>
            {school.description}
          </div>

          <div className="review-count pointer-events-auto text-[13px] font-semibold text-[#346DC2] mb-4 cursor-pointer">
            Read {reviewsCount || school.reviews || "—"} reviews
          </div>

          <div className="hover-buttons pointer-events-auto flex flex-col gap-2 mt-auto">
            <button type="button" className="hover-button button-info w-full py-3 rounded-lg text-[14px] font-medium bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors flex items-center justify-center">
              More Info
            </button>
            <button
              type="button"
              className={`hover-button button-like w-full py-3 rounded-lg text-[14px] font-medium transition-colors flex items-center justify-center gap-2 ${
                isLiked ? "bg-[#298541] text-white" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked((v) => !v);
              }}
              aria-pressed={isLiked}
            >
              <span className="[&>svg]:w-4 [&>svg]:h-4">
                <SchoolCardIcons.Heart filled={isLiked} />
              </span>
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`school-card group bg-white rounded-xl overflow-hidden shadow-sm md:shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 ease-in-out border ${isGridLayout ? "border-[#E5E7EB] h-[340px] cursor-pointer" : "border-[rgba(0,0,0,0.08)]"
        } ${isListLayout
          ? "flex min-w-0"
          : isHybridLayout
            ? "flex p-5 border-[1px] border-[rgba(0,0,0,0.08)] active:scale-[0.98] active:border-[rgba(1,104,83,0.2)]"
            : isClassicLayout
              ? "flex flex-col relative justify-between"
              : "flex flex-col justify-between"
        } relative hover:-translate-y-1 ${isClassicLayout ? "shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]" : "hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"} ${isHybridLayout ? "hover:border-[rgba(1,104,83,0.2)]" : isClassicLayout ? "hover:border-[rgba(1,104,83,0.2)]" : ""
        }`}
    >
      {/* Grid Layout is handled above */}

      {/* Image Section - Not for Hybrid Mobile or Classic */}
      {!isClassicLayout && !isHybridLayout && (
        <div
          className={`image-container relative ${isListLayout
            ? "w-[280px] flex-shrink-0 flex flex-col pr-6 pt-6"
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
                <SchoolCardContextMenu
                  schoolName={school.name}
                  // Match Classic layout styling 1:1
                  buttonClassName="options-button w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all hover:text-[#346DC2] hover:bg-[#e8e8e8] pointer-events-auto [&_svg]:w-[14px] [&_svg]:h-[14px]"
                />
              </div>

              {/* Mobile: Drawer Button */}
              <div
                className="md:hidden w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all z-[2] hover:bg-[#e8e8e8] hover:text-[#346DC2] pointer-events-auto [&_svg]:w-[14px] [&_svg]:h-[14px]"
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
            <div className="image-buttons flex gap-2 py-3 ml-3 w-full max-[1024px]:ml-0 max-[1024px]:w-full">
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
        <div className="card-header flex px-4 pt-10 pb-3 items-start gap-3 h-[108px]">
          <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
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
        <div className="image-container relative w-full p-3 pb-0">
          <Image
            height={720}
            width={720}
            src={school.image}
            alt={school.name}
            className="school-image w-full h-[140px] object-cover rounded-lg"
          />
          {/* Classic Layout - School Type Label */}
          <div className="school-type-label absolute bottom-1 left-[18px] bg-white px-2 pt-1 text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-md h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
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
                ? "p-4 flex flex-col min-w-0 overflow-hidden h-[160px]"
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
                  {school.verified !== false && (
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

        {/* Hybrid Layout - Desktop Version (pixel-match) */}
        {isHybridLayout && (
          <div className="hidden md:flex md:flex-col relative h-full">
            {/* Absolute label (matches HTML positioning) */}
            <div className="school-type-label absolute top-5 left-[98px] bg-[rgba(1,104,83,0.1)] text-[#016853] px-2 py-1 rounded-md text-[10px] font-semibold tracking-[0.02em] uppercase z-[2]">
              {school.schoolType}
            </div>

            <div className="flex min-w-0">
              {/* Image Container */}
              <div className={`image-container relative w-[60px] mr-5 flex-shrink-0 flex flex-col ${school.specialty ? "has-specialty" : ""}`}>
                <img
                  src={school.image || "/placeholder.jpg"}
                  alt={school.name}
                  className={`school-image w-[60px] h-[60px] object-cover ${school.specialty ? "rounded-t-lg" : "rounded-lg"}`}
                />
                {school.specialty && (
                  <div
                    className={`specialty-footer w-full text-[11px] font-semibold text-center py-1 rounded-b-lg flex items-center justify-center gap-1 ${school.specialty === "hot"
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

              {/* Content Container */}
              <div className="school-content flex-1 min-w-0 flex flex-col pt-5">
                {school.ranking && (
                  <div className="ranking-text text-[#089E68] text-[13px] mb-2 mt-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-20px)]">
                    {school.ranking}
                  </div>
                )}

                <div className="school-header flex items-start justify-between mb-1">
                  <div className="school-name-container flex items-start gap-1.5 max-w-[calc(100%-40px)]">
                    <h3 className="school-name text-[16px] font-semibold text-[#464646] leading-[1.4] cursor-pointer hover:text-[#016853] transition-colors line-clamp-2">
                      {school.name}
                    </h3>
                    {school.verified !== false && (
                      <span className="verified-badge inline-flex items-center justify-center ml-1 flex-shrink-0 mt-1 text-[#1D77BD]">
                        <SchoolCardIcons.Verified className="w-4 h-4" />
                      </span>
                    )}
                  </div>

                  <div className="actions flex items-center">
                    <SchoolCardContextMenu
                      schoolName={school.name}
                      // Rotate the default vertical dots to horizontal (match HTML ellipsis)
                      buttonClassName="more-options w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-colors hover:bg-[#F5F5F7] hover:text-[#464646] -mt-[3px] [&_svg]:rotate-90 [&_svg]:w-[18px] [&_svg]:h-[18px]"
                    />
                  </div>
                </div>

                {/* Stats (match HTML: one wrap container, tooltips handled elsewhere) */}
                <div className="school-stats flex flex-wrap gap-4 mb-3 text-[13px] text-[#5F5F5F]">
                  <div className="stat flex items-center gap-1.5" data-tooltip="Location">
                    <SchoolCardIcons.Location />
                    <span className="text-[#464646] font-medium">{school.location}</span>
                  </div>

                  {(school.ratio || school.duration) && (
                    <div className="stat flex items-center gap-1.5" data-tooltip={school.ratio ? "Student-Teacher Ratio" : "Duration"}>
                      {school.ratio ? <SchoolCardIcons.Ratio /> : <SchoolCardIcons.Duration />}
                      <span className="text-[#464646] font-medium">
                        {school.ratio ? <span className="stat-prefix">Ratio: </span> : null}
                        {school.ratio || school.duration}
                      </span>
                    </div>
                  )}

                  {school.students && (
                    <div className="stat flex items-center gap-1.5" data-tooltip="Students">
                      <SchoolCardIcons.Students />
                      <span className="text-[#464646] font-medium">
                        <span className="stat-prefix">Students: </span>
                        {school.students}
                      </span>
                    </div>
                  )}

                  {school.price && (
                    <div className="stat flex items-center gap-1.5" data-tooltip="Tuition">
                      <SchoolCardIcons.Tuition />
                      <span className="text-[#464646] font-medium">{school.price}</span>
                    </div>
                  )}

                  {school.grades && (
                    <div className="stat flex items-center gap-1.5" data-tooltip="Grades">
                      <SchoolCardIcons.Grades />
                      <span className="text-[#464646] font-medium">Grades {school.grades}</span>
                    </div>
                  )}

                  {school.sat && (
                    <div className="stat flex items-center gap-1.5" data-tooltip="SAT Score">
                      <SchoolCardIcons.SAT />
                      <span className="text-[#464646] font-medium">SAT: {school.sat}</span>
                    </div>
                  )}

                  {school.acceptanceRate && (
                    <div className="stat flex items-center gap-1.5" data-tooltip="Acceptance Rate">
                      <SchoolCardIcons.Acceptance />
                      <span className="text-[#464646] font-medium">Accpt: {school.acceptanceRate}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="school-description bg-[#F8F9FB] rounded-lg mb-3 p-3 text-[13px] leading-[1.4] text-[#5F5F5F] relative overflow-hidden border border-[#EAEDF2]">
                  <div className={`description-text ${isDescriptionExpanded ? "" : "line-clamp-2"} overflow-hidden`}>
                    {(() => {
                      const parts = school.description ? school.description.split(":") : [];
                      if (parts.length > 1) {
                        return (
                          <span>
                            <span className="reviewer-type font-semibold text-[#464646] mr-1">{parts[0]}:</span>
                            {parts.slice(1).join(":")}
                          </span>
                        );
                      }
                      return school.description;
                    })()}

                    {isDescriptionExpanded ? (
                      <a href="#" className="review-link text-[#346DC2] text-xs font-medium ml-1 hover:underline whitespace-nowrap">
                        Read {school.reviews} reviews
                      </a>
                    ) : null}
                  </div>

                  <div
                    className="view-more-description text-[#346DC2] text-xs font-medium mt-1 cursor-pointer inline-block hover:underline"
                    onClick={() => setIsDescriptionExpanded((v) => !v)}
                  >
                    {isDescriptionExpanded ? "View Less" : "View More"}
                  </div>
                </div>

                {/* Footer */}
                <div className="school-footer flex items-center justify-between mt-auto pt-4 border-t border-[rgba(0,0,0,0.06)]">
                  <div className="metrics flex items-center gap-4">
                    <div className="grade flex items-center gap-2 relative">
                      <div className={`grade-circle w-7 h-7 ${getGradeClass(school.grade)} rounded-full flex items-center justify-center text-white text-[13px] font-semibold`}>
                        {school.grade}
                      </div>
                    </div>
                    <div className="reviews flex items-center gap-2 text-[13px] text-[#5F5F5F]">
                      <div className="star-rating flex items-center gap-1">
                        <SchoolCardIcons.Star className="w-3.5 h-3.5 text-[#00DF8B]" />
                        <span className="rating-value font-medium text-[#464646]">{school.rating}</span>
                        <span className="review-count text-[#5F5F5F]">({school.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="footer-buttons flex items-center gap-2">
                    <button className="btn btn-more-info px-3 py-2 rounded-md text-[13px] font-medium bg-[#F5F5F7] text-[#464646] border border-[rgba(0,0,0,0.08)] hover:bg-[#EAEDF2] transition-colors">
                      More Info
                    </button>
                    <button className="btn btn-like flex items-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium bg-[#EBFCF4] text-[#016853] border border-[rgba(1,104,83,0.2)] hover:bg-[#D7F7E9] transition-colors">
                      <SchoolCardIcons.Heart />
                      Like
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Classic Layout - Stats Section */}
        {isClassicLayout && (() => {
          const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
          const reviewsCount = typeof school.reviews === "number"
            ? school.reviews
            : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

          const formatValue = (v: any) => {
            if (v === null || v === undefined || v === "") return "—";
            return String(v);
          };

          const stats: Array<{
            label: string;
            value: string;
            icon: React.ReactNode;
            valueNode?: React.ReactNode;
          }> = (() => {
            if (establishment === "K-12") {
              return [
                { label: "Location", value: formatValue(school.location), icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
                { label: "Ratio", value: formatValue(school.ratio), icon: <SchoolCardIcons.Ratio className="text-[#089E68]" /> },
                { label: "Students", value: formatValue(school.students), icon: <SchoolCardIcons.Students className="text-[#089E68]" /> },
                {
                  label: "Rating",
                  value: `${ratingNum} (${reviewsCount || "—"})`,
                  valueNode: (
                    <span>
                      <strong className="font-bold text-[#464646]">{ratingNum}</strong>{" "}
                      <span className="font-normal text-[#5F5F5F]">({reviewsCount || "—"})</span>
                    </span>
                  ),
                  icon: <SchoolCardIcons.StarOutline className="w-4 h-4 text-[#089E68]" />,
                },
              ];
            }
            if (establishment === "Colleges") {
              return [
                { label: "Location", value: formatValue(school.location), icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
                { label: "Duration", value: formatValue(school.duration), icon: <SchoolCardIcons.Duration className="text-[#089E68]" /> },
                { label: "Tuition", value: formatValue(school.price), icon: <SchoolCardIcons.Tuition className="text-[#089E68]" /> },
                { label: "Acceptance", value: formatValue(school.acceptanceRate || (school as any).acceptance), icon: <SchoolCardIcons.Acceptance className="text-[#089E68]" /> },
              ];
            }
            if (establishment === "Graduates") {
              return [
                { label: "Location", value: formatValue(school.location), icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
                { label: "Duration", value: formatValue(school.duration), icon: <SchoolCardIcons.Duration className="text-[#089E68]" /> },
                { label: "Tuition", value: formatValue(school.price), icon: <SchoolCardIcons.Tuition className="text-[#089E68]" /> },
                { label: "Students", value: formatValue(school.students), icon: <SchoolCardIcons.Students className="text-[#089E68]" /> },
              ];
            }
            // District
            return [
              { label: "Location", value: formatValue(school.location), icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
              { label: "Schools", value: formatValue((school as any).totalSchools), icon: <SchoolCardIcons.TotalSchools className="text-[#089E68]" /> },
              { label: "Students", value: formatValue(school.students), icon: <SchoolCardIcons.Students className="text-[#089E68]" /> },
              {
                label: "Rating",
                value: `${ratingNum} (${reviewsCount || "—"})`,
                valueNode: (
                  <span>
                    <strong className="font-bold text-[#464646]">{ratingNum}</strong>{" "}
                    <span className="font-normal text-[#5F5F5F]">({reviewsCount || "—"})</span>
                  </span>
                ),
                icon: <SchoolCardIcons.StarOutline className="w-4 h-4 text-[#089E68]" />,
              },
            ];
          })();

          return (
            <div className="stats-section grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-2.5 mb-4">
              {stats.map((s) => (
                <div key={s.label} className="stat flex items-center gap-2 p-2.5 bg-[#f9fafb] rounded-lg">
                  <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                    {s.icon}
                  </div>
                  <div className="stat-content flex flex-col gap-1">
                    <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">{s.label}</div>
                    <div className="stat-value text-[12px] text-[#464646] font-semibold leading-[1.3]">
                      {s.valueNode ?? s.value}
                    </div>
                  </div>
                </div>
              ))}
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
          <div className="school-footer px-4 py-2 border-t border-[rgba(0,0,0,0.06)] mt-auto flex justify-between items-center">
            <div className="footer-left flex items-center gap-2 flex-1">
              <button
                type="button"
                className={`like-indicator w-7 h-7 flex items-center justify-center cursor-pointer transition-colors ${
                  isLiked ? "text-[#298541]" : "text-[#5F5F5F]"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked((v) => !v);
                }}
                aria-pressed={isLiked}
                aria-label="Like"
              >
                <span className="[&>svg]:w-[18px] [&>svg]:h-[18px]">
                  <SchoolCardIcons.Heart filled={isLiked} />
                </span>
              </button>
            </div>

            <div className="footer-actions flex items-center gap-2 ml-auto">
              <SchoolCardContextMenu
                schoolName={school.name}
                preferredPlacement="top"
                buttonClassName="options-button w-7 h-7 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all hover:text-[#346DC2] hover:bg-[#e8e8e8] pointer-events-auto"
              />
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
          <div className="hover-overlay pointer-events-none absolute top-0 left-0 w-full h-[calc(100%-60px)] bg-[rgba(255,255,255,0.98)] p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out flex flex-col z-10 rounded-t-[12px]">
            {(() => {
              const reviewerType = (school as any).reviewerType || "Parent";
              const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
              const reviewsCount = typeof school.reviews === "number"
                ? school.reviews
                : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

              const hoverStats: Array<{ icon: React.ReactNode; text: string }> = (() => {
                if (establishment === "K-12") {
                  return [
                    { icon: <SchoolCardIcons.Tuition />, text: school.price || "—" },
                    { icon: <SchoolCardIcons.Grades />, text: school.grades || "—" },
                  ];
                }
                if (establishment === "Colleges") {
                  return [{ icon: <SchoolCardIcons.SAT />, text: `SAT: ${school.sat || "—"}` }];
                }
                if (establishment === "Graduates") {
                  return [{ icon: <SchoolCardIcons.MedianSalary />, text: `Median: ${(school as any).medianSalary || "—"}` }];
                }
                // District
                return [
                  { icon: <SchoolCardIcons.Ratio />, text: school.ratio || "—" },
                  { icon: <SchoolCardIcons.Grades />, text: school.grades || "—" },
                ];
              })();

              return (
                <>
                  <div className="hover-header flex gap-3 mb-3 min-w-0">
                    <Image
                      src={school.avatar || school.image}
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
                    {hoverStats.map((s, idx) => (
                      <div key={idx} className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                        <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{s.icon}</span>
                        <span className="text-[#464646]">{s.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="school-description text-[14px] leading-[1.6] text-[#4A4A4A] line-clamp-5 mb-3">
                    <strong className="font-semibold text-[#464646] mr-1">{reviewerType}:</strong>
                    {school.description}
                  </div>

                  <div className="review-count pointer-events-auto text-[13px] font-semibold text-[#346DC2] mb-4 cursor-pointer">
                    Read {reviewsCount || school.reviews || ratingNum} reviews
                  </div>

                  <div className="hover-buttons pointer-events-auto flex flex-col gap-2 mt-auto">
                    <button
                      type="button"
                      className="hover-button button-info w-full py-3 rounded-lg text-[14px] font-medium cursor-pointer bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors flex items-center justify-center gap-2"
                    >
                      More Info
                    </button>
                    <button
                      type="button"
                      className={`hover-button button-like w-full py-3 rounded-lg text-[14px] font-medium cursor-pointer transition-colors flex items-center justify-center gap-2 ${
                        isLiked ? "bg-[#298541] text-white" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLiked((v) => !v);
                      }}
                      aria-pressed={isLiked}
                    >
                      <span className="[&>svg]:w-4 [&>svg]:h-4">
                        <SchoolCardIcons.Heart filled={isLiked} />
                      </span>
                      {isLiked ? "Liked" : "Like"}
                    </button>
                  </div>
                </>
              );
            })()}
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
