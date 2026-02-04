import React, { useState } from "react";
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

const truncateName = (name: string) => {
  if (!name) return "";
  if (name.length > 30) {
    const truncated = name.substring(0, 28);
    const lastSpace = truncated.lastIndexOf(" ");
    return `${truncated.substring(0, lastSpace > 0 ? lastSpace : truncated.length)}..`;
  }
  return name;
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

  // Grid Layout (6) — match provided HTML structure/styles 1:1
  if (isGridLayout) {
    const ratingMatch = (school.rating || "").match(/([\d.]+)\s*\(([^)]+)\)/);
    const ratingNum = ratingMatch?.[1] || (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const ratingCountText = ratingMatch ? `(${ratingMatch[2]})` : (school.rating || "").match(/\([^)]+\)/)?.[0] || "";
    const reviewsCount =
      typeof school.reviews === "number"
        ? school.reviews
        : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

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
      <div className="school-card mobile-grid-card group relative flex flex-col bg-white md:bg-[var(--surface-secondary)] rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] md:shadow-[0_2px_8px_var(--shadow-color)] border border-[#E5E7EB] md:border-[var(--border-color)] md:transition-[transform,box-shadow] md:duration-300 md:ease-in-out md:hover:-translate-y-1 md:hover:shadow-[0_4px_20px_var(--shadow-color)]">
        {/* Image */}
        <div className="image-container relative w-full h-[140px] md:h-[160px] overflow-hidden">
          <Image src={school.image} alt={school.name} fill sizes="(max-width: 1055px) 33vw, 250px" className="school-image object-cover" />

          {/* Mobile options (3 dots) */}
          <button
            type="button"
            className="options-button md:hidden absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-[2] bg-white text-[#4A4A4A] shadow-[0_2px_4px_rgba(0,0,0,0.1)] hover:bg-[#f5f5f5] border-0 p-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDrawerOpen(true);
            }}
            aria-label="Options"
          >
            <SchoolCardIcons.VerticalDots size={14} />
          </button>

          {/* Desktop like button */}
          <button
            type="button"
            className={`hidden md:flex like-button absolute top-3 right-3 w-8 h-8 rounded-full items-center justify-center cursor-pointer transition-all duration-200 z-[2] ${
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
            <div className={`specialty-label absolute top-2 md:top-3 left-0 h-7 md:h-8 bg-white md:bg-[var(--surface-color)] rounded-r-[14px] md:rounded-r-[16px] flex items-center px-2.5 md:px-3 text-[11px] md:text-[12px] font-medium shadow-[0_2px_4px_rgba(0,0,0,0.1)] md:shadow-[0_2px_2px_var(--shadow-color)] z-[2] ${specialty.className}`}>
              <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] md:[&>svg]:w-4 md:[&>svg]:h-4 mr-1">{specialty.icon}</span>
              {specialty.label}
            </div>
          ) : null}

          <div className="school-type-label absolute bottom-0 left-[10px] bg-white md:bg-[var(--surface-color)] px-2 pt-1 text-[11px] font-semibold text-[#464646] md:text-[var(--bold-text)] tracking-[0.02em] rounded-t-[4px] h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)] md:shadow-[0_-1px_4px_var(--shadow-color)] border border-transparent md:border-[var(--border-color)] border-b-0">
            {school.schoolType}
          </div>
        </div>

        {/* Content */}
        <div className="school-content p-3 md:p-4 flex-1">
          {school.ranking ? (
            <div className="ranking-text text-[#089E68] md:text-[var(--active-green)] text-[13px] md:mb-2 whitespace-nowrap overflow-hidden text-ellipsis font-medium">
              {school.ranking}
            </div>
          ) : null}

          <div className="school-name text-[16px] font-semibold text-[#464646] md:text-[var(--bold-text)] mb-1.5 md:mb-2 leading-[1.4] line-clamp-3">
            {school.name}
          </div>

          <div className="school-stats flex flex-wrap gap-2 md:gap-3 mb-3 md:mb-4">
            <div className="stat flex items-center gap-[6px] text-[13px] text-[#5F5F5F] md:text-[var(--subtle-text)] tracking-[0.01em] font-[450]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656] md:[&>svg]:text-[var(--subtle-text)]">
                <SchoolCardIcons.Location />
              </span>
              <span className="text-[#5F5F5F] md:text-[var(--text-default)]">{school.location}</span>
            </div>

            <div className="stat flex items-center gap-[6px] text-[13px] text-[#5F5F5F] md:text-[var(--subtle-text)] tracking-[0.01em] font-[450]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656] md:[&>svg]:text-[var(--subtle-text)]">{secondStat.icon}</span>
              <span className="text-[#5F5F5F] md:text-[var(--text-default)]">{secondStat.value}</span>
            </div>

            <div className="stat flex items-center gap-[6px] text-[13px] text-[#5F5F5F] md:text-[var(--subtle-text)] tracking-[0.01em] font-[450]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656] md:[&>svg]:text-[var(--subtle-text)]">
                <SchoolCardIcons.Star className="w-4 h-4 text-[#565656] md:text-[var(--subtle-text)]" />
              </span>
              <span className="text-[#5F5F5F] md:text-[var(--text-default)]">
                <strong className="font-semibold text-[#444444] md:text-[var(--bold-text)]">{ratingNum}</strong> {ratingCountText}
              </span>
            </div>
          </div>

        </div>

        {/* Footer - outside school-content to match HTML structure */}
        <div 
          className="school-footer flex items-center justify-between"
          style={{ 
            padding: '16px', 
            borderTop: '1px solid rgba(1, 104, 83, 0.1)'
          }}
        >
          {/* Grade */}
          <div className="grade flex items-center gap-2 font-semibold text-[#016853]">
            <div 
              className="grade-circle flex items-center justify-center text-white font-semibold"
              style={{ width: '32px', height: '32px', background: '#00DF8B', borderRadius: '50%', fontSize: '14px' }}
            >
              {school.grade}
            </div>
          </div>

          {/* Footer stat (Students/SAT) - desktop only */}
          <div 
            className="students-score hidden md:flex items-center text-[#5F5F5F]"
            style={{ gap: '6px', fontSize: '13px' }}
          >
            <span className="[&>svg]:w-4 [&>svg]:h-4 text-[#089E68]">{footerStat.icon}</span>
            <span>{footerStat.text}</span>
          </div>

          {/* Mobile footer actions */}
          <div className="flex md:hidden items-center">
            <div className="students-score flex items-center gap-[6px] text-[12px] text-[#5F5F5F]">
              <span className="[&>svg]:w-4 [&>svg]:h-4 text-[#089E68]">{footerStat.icon}</span>
              <span className="whitespace-nowrap">{footerStat.text}</span>
            </div>
            <button
              type="button"
              className="info-button w-7 h-7 ml-2 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-all hover:text-[#346DC2] border-none bg-transparent"
              onClick={(e) => {
                e.stopPropagation();
                setIsInfoOpen(true);
              }}
              aria-label="More info"
            >
              <SchoolCardIcons.InfoCircle />
            </button>
          </div>
        </div>

        {/* Mobile Info Drawer (Grid layout) */}
        {isInfoOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-[100]"
              onClick={() => setIsInfoOpen(false)}
            />
            <div
              className="fixed bottom-0 left-0 right-0 z-[101] bg-white overflow-hidden flex flex-col"
              style={{ maxHeight: "80%", borderRadius: "16px 16px 0 0", boxShadow: "0 -2px 10px rgba(0,0,0,0.15)" }}
            >
              <div className="sticky top-0 bg-white border-b flex items-center relative z-10" style={{ padding: 16, borderColor: "rgba(0,0,0,0.1)" }}>
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
                  <SchoolCardIcons.VerticalDotsOutline />
                </button>
                <button
                  className="drawer-close absolute flex items-center justify-center border-none bg-transparent cursor-pointer text-[#5F5F5F] rounded-full w-8 h-8"
                  style={{ right: 16, top: 12 }}
                  onClick={() => setIsInfoOpen(false)}
                  type="button"
                  aria-label="Close"
                >
                  <SchoolCardIcons.Close />
                </button>
              </div>
              <div className="drawer-body overflow-y-auto flex-grow bg-white" style={{ padding: 16, maxHeight: "calc(100% - 120px)" }}>
                <div className="hover-stats flex flex-wrap mb-4" style={{ gap: "12px 16px" }}>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                    <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]"><SchoolCardIcons.Tuition /></span>
                    <span>{hoverStat1.text}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                    <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{hoverStat2.icon}</span>
                    <span>{hoverStat2.text}</span>
                  </div>
                </div>
                <p className="school-description text-[#4A4A4A] mb-4" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  <strong className="text-[#464646]">{(school as any).reviewerType || "Parent"}:</strong> {school.description}
                </p>
                <div className="review-count text-[#346DC2] font-medium cursor-pointer hover:underline mb-4" style={{ fontSize: 13 }}>
                  Read {reviewsCount} reviews
                </div>
              </div>
              <div className="drawer-footer border-t bg-white sticky bottom-0" style={{ padding: 16, borderColor: "rgba(0,0,0,0.1)" }}>
                <div className="hover-buttons flex gap-3 w-full">
                  <button className="button-info flex-1 py-3 rounded-lg font-medium text-center cursor-pointer transition-colors border-none bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]" style={{ fontSize: 14 }} type="button">
                    More Info
                  </button>
                  <button
                    className={`button-like flex-1 py-3 rounded-lg font-medium text-center cursor-pointer transition-colors border-none flex items-center justify-center gap-2 ${
                      isLiked ? "bg-[#298541] text-white" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                    }`}
                    style={{ fontSize: 14 }}
                    onClick={() => setIsLiked((v) => !v)}
                    type="button"
                  >
                    <SchoolCardIcons.Heart filled={isLiked} className="w-4 h-4" />
                    {isLiked ? "Liked" : "Like"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Hover overlay */}
        <div className="hover-overlay hidden md:flex pointer-events-none absolute inset-0 bg-[var(--surface-color)] p-6 opacity-0 invisible transition-[opacity,visibility] duration-300 ease-in-out flex-col z-[10] group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto border border-[var(--border-color)] rounded-[12px]">
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

        <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
      </div>
    );
  }

  // Card Layout (6.5) — keep previous implementation
  if (isCardLayout) {
    type MobileStat = { icon: React.ReactNode; value: string; boldPrefix?: string };

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

        {/* Mobile (<md) — HTML Mobile (7) layout 1:1 */}
        <div className="md:hidden">
          {/* Specialty badge (absolute positioned at top) */}
          {school.specialty && (
            <div
              className={`specialty-badge absolute top-0 left-0 right-0 flex items-center text-xs font-medium z-[5] ${
                school.specialty === "hot"
                  ? "bg-[rgba(255,77,77,0.1)] text-[#FF4D4D]"
                  : school.specialty === "instant-book"
                  ? "bg-[rgba(29,119,189,0.1)] text-[#1D77BD]"
                  : "bg-[rgba(255,153,0,0.1)] text-[#FF9900]"
              }`}
              style={{ padding: '8px 12px', gap: '6px', borderRadius: '12px 12px 0 0' }}
            >
              <span className="[&>svg]:w-4 [&>svg]:h-4">
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

          {/* Card header */}
          <div 
            className="card-header flex items-start"
            style={{ padding: '40px 16px 12px 16px', gap: '12px' }}
          >
            <Image
              src={school.avatar || school.image}
              alt={school.name}
              width={72}
              height={60}
              className="school-thumbnail w-[72px] h-[60px] rounded-md object-cover shrink-0"
            />
            <div className="school-info flex-1 flex flex-col overflow-hidden">
              <div className="school-name text-[15px] font-semibold text-[#464646] mb-1 leading-[1.3] line-clamp-3">
                {school.name}
              </div>
              {school.ranking && (
                <div className="ranking-text text-[#089E68] text-xs font-medium leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis">
                  {school.ranking}
                </div>
              )}
              <div 
                className="school-type-badge flex items-center bg-[#E5E7EB] text-[#464646] w-fit"
                style={{ gap: '6px', padding: '4px 8px', borderRadius: '16px', fontSize: '11px', fontWeight: 500, marginTop: '6px' }}
              >
                <span className="[&>svg]:w-3 [&>svg]:h-3 [&>svg]:text-[#464646]">
                  <SchoolCardIcons.TotalSchools />
                </span>
                {school.schoolType}
              </div>
            </div>
          </div>

          {/* Card content */}
          <div className="school-content" style={{ padding: '8px 16px 12px' }}>
            <div className="school-stats flex items-center" style={{ gap: '12px' }}>
              {mobileStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="stat flex items-center text-xs text-[#5F5F5F]"
                  style={{ gap: '4px' }}
                >
                  <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-[#565656] shrink-0">
                    {stat.icon}
                  </span>
                  <span className="whitespace-nowrap text-[#464646] font-medium">
                    {stat.boldPrefix ? (
                      <>
                        <span className="font-semibold">{stat.boldPrefix}</span>
                        {stat.value.replace(stat.boldPrefix, '')}
                      </>
                    ) : (
                      stat.value
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card footer */}
          <div 
            className="school-footer flex items-center justify-between"
            style={{ padding: '12px 16px', borderTop: '1px solid rgba(1, 104, 83, 0.1)' }}
          >
            <div className="footer-left flex items-center" style={{ gap: '12px' }}>
              <div
                className={`grade-circle flex items-center justify-center text-white text-xs font-semibold ${getGradeClass(school.grade)}`}
                style={{ width: '28px', height: '28px', borderRadius: '50%' }}
              >
                {school.grade}
              </div>
            </div>
            <div className="footer-actions flex" style={{ gap: '8px' }}>
              <button
                type="button"
                className="info-button flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all hover:text-[#346DC2] hover:bg-[#e8e8e8] border-none"
                style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInfoOpen(true);
                }}
                aria-label="More info"
              >
                <SchoolCardIcons.InfoCircle size={18} />
              </button>
              <button
                type="button"
                className="options-button flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all hover:text-[#346DC2] hover:bg-[#e8e8e8] border-none"
                style={{ width: '28px', height: '28px', borderRadius: '50%' }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDrawerOpen(true);
                }}
                aria-label="Options"
              >
                <SchoolCardIcons.VerticalDots size={14} />
              </button>
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
                className="fixed bottom-0 left-2 right-2 z-[101] bg-white overflow-hidden flex flex-col"
                style={{ maxHeight: '90%', maxWidth: 358, borderRadius: '20px 20px 0 0', boxShadow: '0 -2px 10px rgba(0,0,0,0.15)' }}
              >
                {/* Drawer header */}
                <div className="drawer-header sticky top-0 bg-white px-5 py-4 border-b border-[#e5e7eb] flex justify-between items-start z-[1] shrink-0">
                  <h2 className="drawer-title text-lg font-semibold text-[#1B1B1B] flex-1 flex items-start gap-3 overflow-visible">
                    <Image
                      src={school.avatar || school.image}
                      alt={school.name}
                      width={40}
                      height={40}
                      className="school-avatar w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <span className="leading-[1.3]">{school.name}</span>
                  </h2>
                  <button
                    className="drawer-close w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] border-none bg-transparent transition-colors hover:bg-[#F5F5F7] hover:text-[#464646] shrink-0"
                    onClick={() => setIsInfoOpen(false)}
                    type="button"
                    aria-label="Close"
                  >
                    <SchoolCardIcons.Close />
                  </button>
                </div>

                {/* Drawer body */}
                <div className="drawer-body p-4 overflow-y-auto flex-grow bg-white">
                  <div className="hover-stats flex flex-wrap mb-4" style={{ gap: '12px 16px' }}>
                    <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">
                        <SchoolCardIcons.Tuition />
                      </span>
                      <span>{hoverTuition}</span>
                    </div>
                    <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">
                        {hoverStat2.icon}
                      </span>
                      <span>{hoverStat2.label}</span>
                    </div>
                  </div>
                  <p className="description text-sm leading-[1.6] text-[#4A4A4A] mb-4">
                    <span className="reviewer-type font-semibold mr-1">{(school as any).reviewerType || 'Parent'}:</span>
                    {(school as any).review || school.description}
                  </p>
                  <div className="review-count text-[13px] font-semibold text-[#346DC2] mb-4 cursor-pointer hover:underline">
                    Read {reviewsCount} reviews
                  </div>
                </div>

                {/* Drawer footer */}
                <div className="drawer-footer p-4 border-t border-[#e5e7eb] flex justify-center gap-3 bg-white shrink-0 sticky bottom-0">
                  <button
                    className="hover-button button-info flex-1 py-3 rounded-lg text-sm font-medium text-center cursor-pointer transition-colors border-none bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] flex items-center justify-center gap-2"
                    type="button"
                  >
                    More Info
                  </button>
                  <button
                    className={`hover-button button-like flex-1 py-3 rounded-lg text-sm font-medium text-center cursor-pointer transition-colors border-none flex items-center justify-center gap-2 ${
                      isLiked ? 'bg-[#298541] text-white' : 'bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]'
                    }`}
                    onClick={() => setIsLiked((v) => !v)}
                    type="button"
                  >
                    <SchoolCardIcons.Heart filled={isLiked} className="w-4 h-4" />
                    {isLiked ? 'Liked' : 'Like'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Hover overlay (desktop only) */}
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

        {/* Mobile Options Drawer */}
        <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
      </div>
    );
  }

  // Note: Grid layout uses an early return above (HTML 6.5 exact layout).

  // Hybrid Layout (6) — Mobile matches HTML template exactly, Desktop kept separate
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

    const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount = typeof school.reviews === "number"
      ? school.reviews
      : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    // Mobile stats - 4 stats in 2x2 grid based on category
    const mobileStats = (() => {
      if (category === "k12") {
        return [
          { icon: <SchoolCardIcons.Location />, value: school.location, prefix: "" },
          { icon: <SchoolCardIcons.Ratio />, value: school.ratio || (school as any).studentTeacherRatio, prefix: "Ratio: " },
          { icon: <SchoolCardIcons.Students />, value: school.students, prefix: "Students: " },
          { icon: <SchoolCardIcons.Tuition />, value: school.price, prefix: "" },
        ];
      }
      if (category === "college") {
        return [
          { icon: <SchoolCardIcons.Location />, value: school.location, prefix: "" },
          { icon: <SchoolCardIcons.Duration />, value: school.duration, prefix: "" },
          { icon: <SchoolCardIcons.Tuition />, value: school.price, prefix: "" },
          { icon: <SchoolCardIcons.Acceptance />, value: school.acceptanceRate, prefix: "" },
        ];
      }
      if (category === "graduate") {
        return [
          { icon: <SchoolCardIcons.Location />, value: school.location, prefix: "" },
          { icon: <SchoolCardIcons.Duration />, value: school.duration, prefix: "" },
          { icon: <SchoolCardIcons.Students />, value: school.students, prefix: "Students: " },
          { icon: <SchoolCardIcons.MedianSalary />, value: (school as any).medianSalary ? `~${(school as any).medianSalary}` : "", prefix: "" },
        ];
      }
      // district
      return [
        { icon: <SchoolCardIcons.Location />, value: school.location, prefix: "" },
        { icon: <SchoolCardIcons.TotalSchools />, value: (school as any).totalSchools, prefix: "Schools: " },
        { icon: <SchoolCardIcons.Students />, value: school.students, prefix: "Students: " },
        { icon: <SchoolCardIcons.Ratio />, value: school.ratio || (school as any).studentTeacherRatio, prefix: "" },
      ];
    })().filter((s) => Boolean(s.value));

    // Desktop stats (same as before)
    const desktopStats = (() => {
      if (category === "k12") {
        return [
          { tooltip: "Location", icon: <SchoolCardIcons.Location />, value: school.location },
          { tooltip: "Student-Teacher Ratio", icon: <SchoolCardIcons.Ratio />, value: school.ratio || (school as any).studentTeacherRatio },
          { tooltip: "Students", icon: <SchoolCardIcons.Students />, value: school.students },
          { tooltip: "Tuition", icon: <SchoolCardIcons.Tuition />, value: school.price },
        ];
      }
      if (category === "college") {
        return [
          { tooltip: "Location", icon: <SchoolCardIcons.Location />, value: school.location },
          { tooltip: "Duration", icon: <SchoolCardIcons.Duration />, value: school.duration },
          { tooltip: "Tuition", icon: <SchoolCardIcons.Tuition />, value: school.price },
          { tooltip: "Acceptance Rate", icon: <SchoolCardIcons.Acceptance />, value: school.acceptanceRate },
        ];
      }
      if (category === "district") {
        return [
          { tooltip: "Location", icon: <SchoolCardIcons.Location />, value: school.location },
          { tooltip: "Total Schools", icon: <SchoolCardIcons.TotalSchools />, value: (school as any).totalSchools },
          { tooltip: "Students", icon: <SchoolCardIcons.Students />, value: school.students },
          { tooltip: "Student-Teacher Ratio", icon: <SchoolCardIcons.Ratio />, value: school.ratio || (school as any).studentTeacherRatio },
        ];
      }
      // graduate
      return [
        { tooltip: "Location", icon: <SchoolCardIcons.Location />, value: school.location },
        { tooltip: "Duration", icon: <SchoolCardIcons.Duration />, value: school.duration },
        { tooltip: "Students", icon: <SchoolCardIcons.Students />, value: school.students },
        { tooltip: "Median Salary", icon: <SchoolCardIcons.MedianSalary />, value: (school as any).medianSalary ? `~${(school as any).medianSalary}` : "" },
      ];
    })().filter((s) => Boolean(s.value));

    const specialtyFooter = (() => {
      if (!school.specialty) return null;
      const cls = school.specialty === "hot"
        ? "bg-[#FFEBEB] text-[#FF4D4D]"
        : school.specialty === "instant-book"
          ? "bg-[#E6F1FA] text-[#1D77BD]"
          : "bg-[#FFF4E5] text-[#FF9900]";
      const label = school.specialty === "hot" ? "Hot" : school.specialty === "instant-book" ? "Book" : "Ad";
      return { cls, label };
    })();

    return (
      <>
        {/* ===== MOBILE HYBRID LAYOUT (HTML 6) ===== */}
        <div className="school-card mobile-hybrid-card md:hidden bg-white border border-[rgba(0,0,0,0.08)] rounded-[12px] p-4 relative transition-all duration-200 ease-in-out overflow-visible active:scale-[0.98] active:border-[rgba(1,104,83,0.2)]">
          {/* School Header */}
          <div className="school-header flex mb-3 relative">
            {/* School Type Label - positioned at top, offset from image */}
            <div 
              className="school-type-label absolute text-[#016853] uppercase z-[2]"
              style={{ 
                top: '0px', 
                left: '75px', 
                background: 'rgba(1, 104, 83, 0.1)',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              {school.schoolType}
            </div>

            {/* Image Container */}
            <div 
              className={`image-container relative flex-shrink-0 flex flex-col ${school.specialty ? "has-specialty" : ""}`}
              style={{ width: '60px', marginRight: '16px', paddingTop: 0 }}
            >
              <Image
                src={school.image}
                alt={school.name}
                width={60}
                height={60}
                className={`object-cover block ${school.specialty ? "rounded-t-lg rounded-b-none" : "rounded-lg"}`}
                style={{ width: '60px', height: '60px' }}
              />
              {specialtyFooter && (
                <div 
                  className={`specialty-footer w-full text-center flex items-center justify-center leading-none ${specialtyFooter.cls}`}
                  style={{ fontSize: '10px', fontWeight: 600, padding: '3px 0', borderRadius: '0 0 8px 8px', gap: '4px' }}
                >
                  {school.specialty === "hot" && <SchoolCardIcons.Hot />}
                  {school.specialty === "instant-book" && <SchoolCardIcons.InstantBook />}
                  {school.specialty === "sponsored" && <SchoolCardIcons.Sponsored />}
                  {specialtyFooter.label}
                </div>
              )}
            </div>

            {/* Title Container */}
            <div 
              className="school-title-container flex-1 flex flex-col justify-center"
              style={{ paddingTop: '20px' }}
            >
              {school.ranking && (
                <div 
                  className="ranking-text text-[#089E68] font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ fontSize: '12px', marginBottom: '4px', marginTop: 0, width: '190px' }}
                >
                  {school.ranking}
                </div>
              )}
              <h3 
                className="school-name text-[#464646] line-clamp-3"
                style={{ fontSize: '15px', fontWeight: 600, lineHeight: 1.3, paddingRight: '16px' }}
              >
                {school.name}
                {school.verified !== false && (
                  <span className="verified-badge-title inline-flex items-center ml-1 shrink-0 align-middle relative -top-px">
                    <SchoolCardIcons.Verified />
                  </span>
                )}
              </h3>
            </div>

            {/* More Options */}
            <button
              type="button"
              className="more-options absolute flex items-center justify-center cursor-pointer z-[3] text-[#464646] border-none bg-transparent active:bg-[#F5F5F7]"
              style={{ top: '-4px', right: '0px', width: '28px', height: '28px', borderRadius: '50%' }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsDrawerOpen(true);
              }}
              aria-label="Options"
            >
              <SchoolCardIcons.MoreOptions />
            </button>
          </div>

          {/* Stats Grid - 2 columns */}
          <div className="school-stats grid grid-cols-2 gap-3 mb-3">
            {mobileStats.map((s, idx) => (
              <div key={idx} className="stat flex items-center gap-1.5 text-[12px] text-[#5F5F5F]">
                <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-[#565656] flex-shrink-0">{s.icon}</span>
                <span className="text-[#464646] font-medium">
                  <span className="stat-prefix">{s.prefix}</span>
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="school-description bg-[#F8F9FB] rounded-lg mb-3 p-3 text-[13px] leading-[1.4] text-[#5F5F5F] relative overflow-hidden border border-[#EAEDF2]">
            <div className={`description-text ${isDescriptionExpanded ? "" : "line-clamp-2"} overflow-hidden`}>
              <span className="reviewer-type font-semibold text-[#464646] text-[14px] mr-0.5 inline">
                {(school as any).reviewerType ? `${(school as any).reviewerType}: ` : ""}
              </span>
              {school.description}
              {" "}
              <a href="#" className="review-link text-[12px] font-medium text-[#346DC2] no-underline hover:underline whitespace-nowrap ml-1">
                Read {reviewsCount} reviews
              </a>
            </div>
            <button
              type="button"
              className="view-more-description text-[#346DC2] text-[12px] font-medium mt-1 cursor-pointer hover:underline border-none bg-transparent p-0"
              onClick={() => setIsDescriptionExpanded((v) => !v)}
            >
              {isDescriptionExpanded ? "View Less" : "View More"}
            </button>
          </div>

          {/* Footer */}
          <div className="school-footer flex items-center justify-between pt-3 border-t border-[rgba(0,0,0,0.06)]">
            <div className="metrics flex items-center gap-3">
              <div className="grade flex items-center gap-2">
                <div className="grade-circle w-7 h-7 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-[13px] font-semibold">
                  {school.grade}
                </div>
              </div>
              <div className="reviews flex items-center gap-2 text-[12px] text-[#5F5F5F]">
                <div className="star-rating flex gap-0.5">
                  <SchoolCardIcons.Star className="w-[14px] h-[14px] text-[#00DF8B]" />
                </div>
                <span className="rating-value font-medium text-[#464646]">{ratingNum}</span>
                <span className="review-count cursor-pointer hover:text-[#346DC2] hover:underline">({reviewsCount})</span>
              </div>
            </div>

            <button
              type="button"
              className={`btn-like flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium cursor-pointer border border-[rgba(1,104,83,0.2)] transition-colors ${
                isLiked ? "bg-[#EBFCF4] text-[#016853]" : "bg-[#EBFCF4] text-[#016853]"
              }`}
              onClick={() => setIsLiked((v) => !v)}
            >
              <SchoolCardIcons.Heart filled={isLiked} className="w-[14px] h-[14px]" />
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>

          <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
        </div>

        {/* ===== DESKTOP HYBRID LAYOUT ===== */}
        <div className="school-card desktop-hybrid-card hidden md:flex flex-row p-5 border border-[rgba(0,0,0,0.08)] rounded-xl transition-all duration-200 ease-in-out relative overflow-visible hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] hover:border-[rgba(1,104,83,0.2)]">
          {/* Image Container */}
          <div className={`image-container relative w-[60px] flex-shrink-0 flex flex-col mr-5 ${school.specialty ? "has-specialty" : ""}`}>
            <Image
              src={school.image}
              alt={school.name}
              width={60}
              height={60}
              className={`w-[60px] h-[60px] object-cover ${school.specialty ? "rounded-t-lg rounded-b-none" : "rounded-lg"}`}
            />
            {specialtyFooter && (
              <div className={`specialty-footer w-full text-[11px] font-semibold text-center py-1 rounded-b-lg flex items-center justify-center gap-1 ${specialtyFooter.cls}`}>
                {school.specialty === "hot" && <SchoolCardIcons.Hot />}
                {school.specialty === "instant-book" && <SchoolCardIcons.InstantBook />}
                {school.specialty === "sponsored" && <SchoolCardIcons.Sponsored />}
                {specialtyFooter.label}
              </div>
            )}
          </div>

          {/* School Type Label */}
          <div className="school-type-label absolute top-5 left-[98px] bg-[rgba(1,104,83,0.1)] text-[#016853] px-2 py-1 rounded-md text-[10px] font-semibold tracking-[0.02em] uppercase z-[2]">
            {school.schoolType}
          </div>

          {/* Content */}
          <div className="school-content flex-1 flex flex-col pt-5">
            {school.ranking && (
              <div className="ranking-text text-[#089E68] text-[13px] mb-2 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-20px)]">
                {school.ranking}
              </div>
            )}

            <div className="school-header flex items-start justify-between mb-1">
              <div className="school-name-container flex items-start gap-1.5 max-w-[calc(100%-40px)]">
                <div className="school-name text-base font-semibold text-[#464646] leading-[1.4] max-h-[2.8em] overflow-hidden line-clamp-2 cursor-pointer hover:text-[#016853] transition-colors">
                  {school.name}
                </div>
                {school.verified !== false && (
                  <span className="verified-badge inline-flex items-center justify-center ml-1 shrink-0 mt-1">
                    <SchoolCardIcons.Verified />
                  </span>
                )}
              </div>

              <SchoolCardContextMenu
                schoolName={school.name}
                buttonClassName="more-options w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] transition-colors mt-[-3px] hover:bg-[#F5F5F7] hover:text-[#464646] pointer-events-auto [&_svg]:rotate-90 [&_svg]:w-[18px] [&_svg]:h-[18px]"
              />
            </div>

            <div className="school-stats flex flex-wrap gap-4 mb-3">
              {desktopStats.map((s, idx) => (
                <div key={idx} className="stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F] relative" data-tooltip={s.tooltip}>
                  <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656]">{s.icon}</span>
                  <span className="text-[#464646] font-medium">
                    {s.tooltip === "Students" && <span className="stat-prefix max-[1149px]:hidden">Students: </span>}
                    {s.tooltip === "Student-Teacher Ratio" && <span className="stat-prefix max-[1149px]:hidden">Ratio: </span>}
                    {s.tooltip === "Total Schools" && <span className="stat-prefix max-[1149px]:hidden">Schools: </span>}
                    {s.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="school-description bg-[#f0f1f3] rounded-lg mb-3 p-3 text-[13px] leading-[1.4] text-[#5F5F5F] relative overflow-hidden border border-[#E5E8ED]">
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
                className="view-more-description text-[#346DC2] text-xs font-medium mt-1 cursor-pointer hover:underline border-none bg-transparent p-0"
                onClick={() => setIsDescriptionExpanded((v) => !v)}
              >
                {isDescriptionExpanded ? "View Less" : "View More"}
              </button>
            </div>

            <div className="school-footer flex items-center justify-between mt-auto pt-4 border-t border-[rgba(0,0,0,0.06)]">
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

              <div className="footer-buttons flex items-center gap-2">
                <button
                  type="button"
                  className="btn btn-more-info flex items-center justify-center px-3 py-2 rounded-md text-[13px] font-medium cursor-pointer bg-[#F5F5F7] text-[#464646] border border-[rgba(0,0,0,0.08)] hover:bg-[#EAEDF2] transition-colors"
                >
                  More Info
                </button>
                <button
                  type="button"
                  className={`btn btn-like flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-medium cursor-pointer border border-[rgba(1,104,83,0.2)] transition-colors ${
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
        </div>
      </>
    );
  }

  // Magazine Layout (Desktop + responsive) — match provided HTML "Magazine Style (10)" 1:1
  if (isMagazineLayout) {
    const ratingNum = (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount =
      typeof school.reviews === "number" ? school.reviews : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;

    const specialtyMeta = (() => {
      if (!school.specialty) return null;
      const specialty = school.specialty as string;
      if (specialty === "hot") return { 
        className: "hot text-[#FF4D4D]", 
        icon: <SchoolCardIcons.Hot />, 
        mobileIcon: <SchoolCardIcons.Hot className="fill-white" />,
        label: "High demand" 
      };
      if (specialty === "instant-book" || specialty === "instantBook") {
        return { 
          className: "instant-book text-[#1D77BD]", 
          icon: <SchoolCardIcons.InstantBook />, 
          mobileIcon: <SchoolCardIcons.InstantBook className="fill-white" />,
          label: "Instant book" 
        };
      }
      return { 
        className: "sponsored text-[#FF9900]", 
        icon: <SchoolCardIcons.Sponsored />, 
        mobileIcon: <SchoolCardIcons.Sponsored className="fill-white" />,
        label: "Sponsored" 
      };
    })();

    const formatNumber = (value?: string) => {
      if (!value) return "—";
      const num = Number(String(value).replace(/[^\d]/g, ""));
      return Number.isFinite(num) ? num.toLocaleString() : value;
    };

    const medianSalaryRaw = (school as any).medianSalary as string | undefined;
    const medianSalaryText = medianSalaryRaw ? (medianSalaryRaw.includes("$") ? medianSalaryRaw : `$${medianSalaryRaw}`) : "—";

    // Mobile footer stats (2 stats)
    const footerIconClass = "w-[14px] h-[14px] text-white/90";
    const mobileFooterStats = (() => {
      if (establishment === "K-12" || establishment === "Graduates" || establishment === "District") {
        return [
          { icon: <SchoolCardIcons.Star className={footerIconClass} />, text: `${ratingNum} (${reviewsCount})` },
          { icon: <SchoolCardIcons.Students className={footerIconClass} />, text: formatNumber(school.students) },
        ];
      }
      // Colleges
      return [
        { icon: <SchoolCardIcons.Star className={footerIconClass} />, text: `${ratingNum} (${reviewsCount})` },
        { icon: <SchoolCardIcons.SAT className={footerIconClass} />, text: school.sat || "—" },
      ];
    })();

    // Mobile drawer stats (3 stats, excluding what's in footer)
    const withPerYear = (value?: string) => {
      if (!value) return "—";
      return value.includes("/") ? value : `${value}/yr`;
    };

    const mobileDrawerStats = (() => {
      if (establishment === "K-12") {
        return [
          { icon: <SchoolCardIcons.Ratio />, text: school.ratio || "—" },
          { icon: <SchoolCardIcons.Tuition />, text: withPerYear(school.price) },
          { icon: <SchoolCardIcons.Grades />, text: `Grades: ${school.grades || "—"}` },
        ];
      }
      if (establishment === "Colleges") {
        return [
          { icon: <SchoolCardIcons.Duration />, text: school.duration || "—" },
          { icon: <SchoolCardIcons.Tuition />, text: withPerYear(school.price) },
          { icon: <SchoolCardIcons.Acceptance />, text: `Acceptance: ${(school as any).acceptance || school.acceptanceRate || "—"}` },
        ];
      }
      if (establishment === "Graduates") {
        return [
          { icon: <SchoolCardIcons.Duration />, text: school.duration || "—" },
          { icon: <SchoolCardIcons.Tuition />, text: school.price || "—" },
          { icon: <SchoolCardIcons.MedianSalary />, text: `Median: ${medianSalaryText}` },
        ];
      }
      // District
      return [
        { icon: <SchoolCardIcons.TotalSchools />, text: `${(school as any).totalSchools || "—"} Schools` },
        { icon: <SchoolCardIcons.Ratio />, text: school.ratio || "—" },
        { icon: <SchoolCardIcons.Grades />, text: `Grades: ${school.grades || "—"}` },
      ];
    })();

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
      <>
        {/* Mobile Magazine Layout — HTML Mobile (10) 1:1 */}
        <div className="school-card md:hidden rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.15)] relative h-[400px] flex flex-col bg-white isolate">
          {/* School type badge - top left */}
          <div
            className="absolute top-0 left-0 text-white pt-2 pb-1.5 pl-2 pr-3 text-[11px] font-semibold tracking-[0.5px] uppercase z-[3]"
            style={{ 
              borderRadius: "16px 0 12px 0",
              background: "rgba(8, 58, 155, 0.9)",
              backdropFilter: "blur(4px)"
            }}
          >
            {school.schoolType}
          </div>

          {/* Specialty label - top right */}
          {specialtyMeta && (
            <div 
              className="absolute top-0 right-0 text-white px-2 py-1 text-[11px] font-medium flex items-center gap-1 z-[3]"
              style={{
                borderRadius: "6px",
                background: "rgba(8, 58, 155, 0.8)",
                backdropFilter: "blur(4px)"
              }}
            >
              <span className="[&>svg]:w-3 [&>svg]:h-3">{specialtyMeta.mobileIcon}</span>
              {specialtyMeta.label}
            </div>
          )}

          {/* Full-bleed image container */}
          <div className="absolute inset-0 overflow-hidden rounded-[16px]">
            <Image
              src={school.image}
              alt={school.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* School content - gradient overlay at bottom */}
          <div
            className="absolute left-0 right-0 h-[180px] p-4 flex flex-col justify-end z-[2]"
            style={{ bottom: 90, background: 'linear-gradient(180deg, transparent 0%, rgba(8, 65, 172, 0.9) 100%)' }}
          >
            <div className="text-white/90 text-[11px] font-medium mb-1 uppercase tracking-[0.5px]">
              {school.location}
            </div>
            <h3 className="text-white text-lg font-bold leading-[1.3] mb-1.5 line-clamp-3">
              {school.name}
            </h3>
            {school.ranking && (
              <div className="text-white/90 text-[13px] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                {school.ranking}
              </div>
            )}
          </div>

          {/* School footer - blue bar at bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[90px] px-4 py-3 flex items-center justify-between z-[2]"
            style={{ 
              background: "rgba(8, 65, 172, 0.95)", 
              borderRadius: "0 0 16px 16px",
              backdropFilter: "blur(8px)"
            }}
          >
            <div className="flex items-center gap-3">
              {/* Grade square */}
              <div 
                className="w-8 h-8 rounded-md flex items-center justify-center text-white text-sm font-bold"
                style={{ background: "rgba(255, 255, 255, 0.2)", backdropFilter: "blur(4px)" }}
              >
                {school.grade}
              </div>
              {/* Footer stats */}
              <div className="flex flex-col gap-1">
                {mobileFooterStats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                    <span className="[&>svg]:w-[14px] [&>svg]:h-[14px]" style={{ color: "rgba(255, 255, 255, 0.9)" }}>{stat.icon}</span>
                    <span>{stat.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Info button */}
              <button
                type="button"
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white transition-all border-none"
                style={{ background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(4px)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInfoOpen(true);
                }}
                aria-label="More info"
              >
                <SchoolCardIcons.InfoCircle size={16} className="text-white" />
              </button>
              {/* Options button */}
              <button
                type="button"
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-white transition-all border-none"
                style={{ background: "rgba(255, 255, 255, 0.15)", backdropFilter: "blur(4px)" }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDrawerOpen(true);
                }}
                aria-label="Options"
              >
                <SchoolCardIcons.VerticalDotsOutline size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Magazine Info Drawer - Portal-like rendering outside card */}
        {isInfoOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-[9999]"
              onClick={() => setIsInfoOpen(false)}
            />
            <div
              className="fixed bottom-0 left-0 right-0 z-[10000] bg-white overflow-hidden flex flex-col mx-auto"
              style={{ 
                maxHeight: '80%', 
                borderRadius: '16px 16px 0 0', 
                boxShadow: '0 -2px 10px rgba(0,0,0,0.15)'
              }}
            >
              {/* Drawer header */}
              <div className="p-4 border-b border-black/10 flex items-center relative">
                <div className="flex gap-3 items-center flex-1">
                  <Image
                    src={school.avatar || school.image}
                    alt={school.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                  <div className="text-[16px] font-semibold text-[#464646] leading-[1.3] mr-[60px]">
                    {school.name}
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute flex items-center justify-center cursor-pointer text-[#5F5F5F] rounded-full w-8 h-8 border-none bg-transparent hover:bg-[#f5f5f7]"
                  style={{ right: 52, top: 12 }}
                  onClick={() => setIsDrawerOpen(true)}
                  aria-label="More options"
                >
                  <SchoolCardIcons.VerticalDotsOutline size={16} />
                </button>
                <button
                  className="absolute flex items-center justify-center border-none bg-transparent cursor-pointer text-[#5F5F5F] rounded-full w-8 h-8"
                  style={{ right: 16, top: 12 }}
                  onClick={() => setIsInfoOpen(false)}
                  type="button"
                  aria-label="Close"
                >
                  <SchoolCardIcons.Close />
                </button>
              </div>

              {/* Drawer body */}
              <div className="p-4 overflow-y-auto" style={{ maxHeight: 'calc(100% - 140px)' }}>
                <div className="flex flex-wrap mb-4" style={{ gap: '12px 16px' }}>
                  {mobileDrawerStats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68] [&>svg]:fill-[#089E68] [&>svg]:stroke-[#089E68]">{stat.icon}</span>
                      <span>{stat.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm leading-[1.6] text-[#4A4A4A] mb-4">
                  <strong className="font-semibold text-[#464646]">{(school as any).reviewerType || 'Parent'}:</strong>{' '}
                  {(school as any).review || school.description}
                </p>
                <div className="text-[13px] font-medium text-[#346DC2] mb-4 cursor-pointer">
                  Read {reviewsCount} reviews
                </div>
              </div>

              {/* Drawer footer */}
              <div className="p-4 border-t border-black/10">
                <div className="flex gap-3 w-full">
                  <button
                    className="flex-1 py-3 rounded-lg text-sm font-medium text-center cursor-pointer transition-colors border-none bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]"
                    type="button"
                  >
                    More Info
                  </button>
                  <button
                    className={`flex-1 py-3 rounded-lg text-sm font-medium text-center cursor-pointer transition-colors border-none flex items-center justify-center gap-2 ${
                      isLiked ? 'bg-[#298541] text-white' : 'bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]'
                    }`}
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

        {/* Desktop Magazine Layout */}
        <div className="school-card hidden md:flex bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-in-out border border-[#E5E7EB] relative min-h-[280px] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
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

              <div className="primary-stats flex gap-6 mb-4 flex-wrap">
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

            <div className="card-footer flex items-center justify-between pt-4 border-t border-[#f0f0f0] mt-4">
              <div className="secondary-stats flex items-center gap-6 flex-wrap">
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

              <div className="footer-options flex items-center gap-2">
                <div className="footer-actions flex gap-2">
                  <button type="button" className="action-button info-button h-9 px-4 rounded-lg text-sm font-medium bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors">
                    More Info
                  </button>
                  <button
                    type="button"
                    className={`action-button apply-button h-9 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
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
          <div className="image-section w-[280px] relative flex flex-col">
            {specialtyMeta ? (
              <div
                className={`specialty-label absolute top-6 right-0 h-8 bg-white rounded-l-xl flex items-center px-2.5 cursor-pointer transition-all z-[2] text-xs font-medium shadow-[-1px_2px_2px_rgba(0,0,0,0.1)] ${specialtyMeta.className}`}
              >
                <span className="[&>svg]:w-4 [&>svg]:h-4 mr-1">{specialtyMeta.icon}</span>
                {specialtyMeta.label}
              </div>
            ) : null}

            <div className="relative flex-1 min-h-[280px]">
              <Image src={school.image} alt={school.name} fill sizes="280px" className="object-cover" />
            </div>

            <div className="school-type-badge absolute bottom-0 left-0 right-0 bg-black/80 text-white py-3 px-4 text-[13px] font-medium text-center">
              {school.schoolType}
            </div>
          </div>
        </div>

        {/* Mobile Options Drawer for Magazine Layout */}
        <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
      </>
    );
  }

  // List Layout — Mobile (HTML 9) + Desktop versions
  if (isListLayout) {
    const ratingMatch = (school.rating || "").match(/([\d.]+)\s*\(([^)]+)\)/);
    const ratingNum = ratingMatch?.[1] || (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const ratingCountText = ratingMatch ? `(${ratingMatch[2]})` : (school.rating || "").match(/\([^)]+\)/)?.[0] || "";
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

    // Mobile: first stat based on establishment
    const mobileFirstStat = (() => {
      if (establishment === "K-12") {
        return { icon: <SchoolCardIcons.Ratio />, value: school.ratio || "—" };
      }
      if (establishment === "Colleges" || establishment === "Graduates") {
        return { icon: <SchoolCardIcons.Duration />, value: school.duration || "—" };
      }
      // District
      return { icon: <SchoolCardIcons.TotalSchools />, value: `${(school as any).totalSchools || "—"} schools` };
    })();

    // Mobile: footer stat
    const mobileFooterStat = (() => {
      if (establishment === "Colleges") {
        return { icon: <SchoolCardIcons.SAT />, text: `SAT: ${school.sat || "—"}` };
      }
      return { icon: <SchoolCardIcons.Students />, text: `Students: ${school.students || "—"}` };
    })();

    // Mobile: hover/info drawer stats
    const mobileHoverStat1 = (() => {
      if (establishment === "District") {
        return { icon: <SchoolCardIcons.Ratio />, text: school.ratio || "—" };
      }
      return { icon: <SchoolCardIcons.Tuition />, text: tuitionText };
    })();

    const mobileHoverStat2 = (() => {
      if (establishment === "Colleges") {
        return { icon: <SchoolCardIcons.Acceptance />, text: `Acceptance: ${(school as any).acceptance || school.acceptanceRate || "—"}` };
      }
      if (establishment === "Graduates") {
        return { icon: <SchoolCardIcons.MedianSalary />, text: `~${(school as any).medianSalary || "—"}` };
      }
      return { icon: <SchoolCardIcons.Grades />, text: `Grades: ${school.grades || "—"}` };
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
      <>
        {/* ===== MOBILE LIST LAYOUT (HTML 9) ===== */}
        <div className="school-card mobile-list-card md:hidden bg-white rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#E5E7EB] mb-4">
          {/* Card Main - flex with image left, content right */}
          <div className="card-main flex relative">
            {/* Image Wrapper - 120px width, 143px height */}
            <div className="image-wrapper relative w-[120px] h-[143px] flex-shrink-0 flex flex-col">
              <Image
                src={school.image}
                alt={school.name}
                width={120}
                height={120}
                className="w-full h-[120px] object-cover"
              />
              <div className="school-type-footer w-full bg-[#F5F5F7] text-[#464646] text-[11px] font-medium text-center py-[5px]">
                {school.schoolType}
              </div>

              {/* Options button - top left */}
              <button
                type="button"
                className="options-button absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center bg-white cursor-pointer shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-[5] border-none p-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDrawerOpen(true);
                }}
                aria-label="Options"
              >
                <SchoolCardIcons.VerticalDots size={16} className="text-[#666]" />
              </button>

              {/* Specialty label - bottom of image, above footer */}
              {specialty && (
                <div className={`specialty-label absolute bottom-[36px] left-0 h-6 bg-white rounded-r-[12px] flex items-center px-2.5 text-[11px] font-medium shadow-[1px_2px_4px_rgba(0,0,0,0.1)] z-[2] ${specialty.className}`}>
                  <span className="[&>svg]:w-3 [&>svg]:h-3 mr-1">{specialty.icon}</span>
                  {specialty.label}
                </div>
              )}
            </div>

            {/* School Content */}
            <div className="school-content flex-1 p-3 flex flex-col min-w-0 overflow-hidden">
              {school.ranking && (
                <div className="ranking-text text-[#089E68] text-[12px] mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                  {school.ranking}
                </div>
              )}
              <h2 className="school-name text-[16px] font-semibold text-[#464646] mb-1 leading-[1.3] line-clamp-3">
                {school.name}
              </h2>
              <div className="school-location text-[#5F5F5F] text-[13px] mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {school.location}
              </div>

              {/* Stats Row */}
              <div className="stats-row flex gap-3 mt-1 items-center w-full overflow-hidden whitespace-nowrap">
                <div className="stat flex items-center gap-1.5 text-[12px] text-[#5F5F5F] flex-shrink-0">
                  <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-[#565656] flex-shrink-0">{mobileFirstStat.icon}</span>
                  <span className="text-[#464646] font-medium">{mobileFirstStat.value}</span>
                </div>
                <div className="stat flex items-center gap-1.5 text-[12px] text-[#5F5F5F] flex-shrink min-w-0">
                  <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-[#565656] flex-shrink-0">
                    <SchoolCardIcons.Star />
                  </span>
                  <span className="text-[#464646] font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    <strong className="font-semibold">{ratingNum}</strong> {ratingCountText}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="card-footer flex items-center justify-between py-[10px] px-3 border-t border-[#E5E7EB] bg-[#FAFAFA]">
            <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-[14px] font-semibold">
              {school.grade}
            </div>

            <div className="footer-actions flex items-center gap-4">
              <div className="students-display flex items-center gap-1 text-[12px] text-[#565656]">
                <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#00DF8B]">{mobileFooterStat.icon}</span>
                <span>{mobileFooterStat.text}</span>
              </div>

              <button
                type="button"
                className="info-button flex items-center justify-center cursor-pointer border-none bg-transparent p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInfoOpen(true);
                }}
                aria-label="More info"
              >
                <SchoolCardIcons.InfoCircle className="text-[#565656]" />
              </button>
            </div>
          </div>

          {/* Mobile Info Drawer */}
          {isInfoOpen && (
            <Portal containerId="mobile-modal-root">
              <div
                className="fixed inset-0 bg-black/50 z-[1000]"
                onClick={() => setIsInfoOpen(false)}
              />
              <div
                className="fixed bottom-0 left-0 right-0 z-[1001] bg-white overflow-hidden flex flex-col"
                style={{ maxHeight: "90%", borderRadius: "16px 16px 0 0", boxShadow: "0 -2px 10px rgba(0,0,0,0.15)" }}
              >
                <div className="drawer-header p-4 border-b border-[#E5E7EB] flex justify-between items-center">
                  <h2 className="drawer-title text-[18px] font-semibold text-[#464646]">{school.name}</h2>
                  <div className="drawer-actions flex gap-2">
                    <button
                      type="button"
                      className="drawer-more-options w-8 h-8 flex items-center justify-center cursor-pointer text-[#6B7280] rounded-full hover:bg-[#F3F4F6] border-none bg-transparent"
                      aria-label="More options"
                    >
                      <SchoolCardIcons.VerticalDotsOutline size={20} />
                    </button>
                    <button
                      type="button"
                      className="drawer-close w-8 h-8 flex items-center justify-center border-none bg-transparent cursor-pointer text-[#6B7280] rounded-full hover:bg-[#F3F4F6]"
                      onClick={() => setIsInfoOpen(false)}
                      aria-label="Close"
                    >
                      <SchoolCardIcons.Close size={20} />
                    </button>
                  </div>
                </div>
                <div className="drawer-body p-4 overflow-y-auto flex-grow" style={{ maxHeight: "calc(80vh - 130px)" }}>
                  <div className="hover-header flex gap-3 mb-4">
                    <Image src={school.avatar || school.image} alt={school.name} width={40} height={40} className="rounded-lg object-cover" />
                    <div className="hover-school-name text-[16px] font-semibold text-[#464646]">{school.name}</div>
                  </div>
                  <div className="hover-stats flex flex-wrap gap-3 mb-4">
                    <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{mobileHoverStat1.icon}</span>
                      <span>{mobileHoverStat1.text}</span>
                    </div>
                    <div className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                      <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{mobileHoverStat2.icon}</span>
                      <span>{mobileHoverStat2.text}</span>
                    </div>
                  </div>
                  <p className="school-description text-[14px] leading-[1.6] text-[#4A4A4A] mb-4">
                    <strong className="text-[#464646]">{(school as any).reviewerType || "Parent"}:</strong> {school.description}
                  </p>
                  <div className="review-count text-[13px] font-medium text-[#346DC2] mb-4 cursor-pointer">
                    Read {reviewsCount} reviews
                  </div>
                </div>
                <div className="drawer-footer p-4 border-t border-[#E5E7EB] flex gap-3">
                  <button className="hover-button button-info flex-1 py-3 rounded-lg text-[14px] font-medium text-center cursor-pointer transition-colors border-none bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]" type="button">
                    More Info
                  </button>
                  <button
                    className={`hover-button button-like flex-1 py-3 rounded-lg text-[14px] font-medium text-center cursor-pointer transition-colors border-none flex items-center justify-center gap-2 ${
                      isLiked ? "bg-[#298541] text-white" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                    }`}
                    onClick={() => setIsLiked((v) => !v)}
                    type="button"
                  >
                    <SchoolCardIcons.Heart filled={isLiked} className="w-4 h-4" />
                    {isLiked ? "Liked" : "Like"}
                  </button>
                </div>
              </div>
            </Portal>
          )}

          <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
        </div>

        {/* ===== DESKTOP LIST LAYOUT ===== */}
        <div className="school-card desktop-list-card hidden md:flex bg-white rounded-xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 ease-in-out border border-[#E5E7EB] relative hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
          {/* Image section (left) */}
          <div className="image-section w-[280px] flex flex-col pr-6 pt-6 relative">
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
              className="school-image h-[148px] w-full object-cover rounded-lg ml-3"
            />

            <div className="image-buttons flex gap-2 py-3 ml-3 w-full">
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

            <div className="stats-section flex gap-6 mb-4">
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

            <div className="footer-section mt-auto flex items-center justify-between">
              <div className="metrics flex items-center gap-6 flex-wrap">
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
      </>
    );
  }

  // Classic Layout (Mobile + Desktop)
  if (isClassicLayout) {
    const ratingMatch = (school.rating || "").match(/([\d.]+)\s*\(([^)]+)\)/);
    const ratingNum = ratingMatch?.[1] || (school.rating || "").match(/[\d.]+/)?.[0] || school.rating;
    const reviewsCount =
      typeof school.reviews === "number"
        ? school.reviews
        : Number((school.rating || "").match(/\(([^)]+)\)/)?.[1]) || 0;
    const ratingCountText = ratingMatch?.[2]
      ? `(${ratingMatch[2]})`
      : reviewsCount
        ? `(${reviewsCount})`
        : "";

    const specialty = (() => {
      if (!school.specialty) return null;
      if (school.specialty === "hot")
        return {
          className: "hot bg-[rgba(255,77,77,0.1)] text-[#FF4D4D]",
          icon: <SchoolCardIcons.Hot />,
          label: school.specialtyLabel || "High demand",
        };
      if (school.specialty === "instant-book")
        return {
          className: "instant-book bg-[rgba(29,119,189,0.1)] text-[#1D77BD]",
          icon: <SchoolCardIcons.InstantBook />,
          label: school.specialtyLabel || "Instant book",
        };
      return {
        className: "sponsored bg-[rgba(255,153,0,0.1)] text-[#FF9900]",
        icon: <SchoolCardIcons.Sponsored />,
        label: school.specialtyLabel || "Sponsored",
      };
    })();

    const stats = (() => {
      // Stats matching HTML exactly for each establishment type
      if (establishment === "K-12") {
        return [
          { label: "Location", value: school.location || "—", icon: <SchoolCardIcons.Location className="text-[#089E68]" /> },
          { label: "Ratio", value: school.ratio || (school as any).studentTeacherRatio || "—", icon: <SchoolCardIcons.Ratio className="text-[#089E68]" /> },
          {
            label: "Students",
            value: (school.students as any)?.toLocaleString?.() || (school.students as any) || "—",
            icon: <SchoolCardIcons.Students className="text-[#089E68]" />,
          },
          {
            label: "Rating",
            valueNode: <><strong>{ratingNum}</strong> {ratingCountText}</>,
            value: `${ratingNum} ${ratingCountText}`,
            icon: <SchoolCardIcons.Star className="text-[#089E68]" />,
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

      // District - matching HTML: Location, Schools, Students, Rating
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
          valueNode: <><strong>{ratingNum}</strong> {ratingCountText}</>,
          value: `${ratingNum} ${ratingCountText}`,
          icon: <SchoolCardIcons.Star className="text-[#089E68]" />,
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
        return [{ icon: <SchoolCardIcons.MedianSalary className="text-[#089E68]" />, text: `Median: ${(school as any).medianSalary || "—"}` }];
      }
      return [
        { icon: <SchoolCardIcons.Ratio />, text: school.ratio || "—" },
        { icon: <SchoolCardIcons.Grades />, text: school.grades || "—" },
      ];
    })();

    const reviewerType = (school as any).reviewerType || "Parent";

    const drawerStats = (() => {
      if (establishment === "K-12") {
        return [{ icon: <SchoolCardIcons.Grades className="text-[#089E68]" />, text: `Grades: ${school.grades || "—"}` }];
      }
      if (establishment === "Colleges") {
        return [{ icon: <SchoolCardIcons.SAT className="text-[#089E68]" />, text: `SAT: ${school.sat || "—"}` }];
      }
      if (establishment === "District") {
        return [{ icon: <SchoolCardIcons.Grades className="text-[#089E68]" />, text: `Grades: ${school.grades || "—"}` }];
      }
      return [];
    })();

    return (
      <>
        {/* ===== MOBILE CLASSIC LAYOUT (HTML 6) ===== */}
        <div className="school-card mobile-classic-card md:hidden bg-white rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[rgba(0,0,0,0.08)] relative transition-all duration-200 ease-in-out active:scale-[0.98] active:shadow-[0_1px_4px_rgba(0,0,0,0.1)]">
          {/* Specialty badge / placeholder */}
          {specialty ? (
            <div className={`specialty-badge absolute top-0 left-0 right-0 px-3 py-2 text-[13px] font-medium flex items-center justify-center gap-1.5 leading-none rounded-t-[12px] z-[2] ${specialty.className}`}>
              <span className="[&>svg]:w-[14px] [&>svg]:h-[14px]">{specialty.icon}</span>
              {specialty.label}
            </div>
          ) : (
            <div className="empty-badge absolute top-0 left-0 right-0 h-8 bg-[#F5F5F7] rounded-t-[12px] z-[1]" />
          )}

          {/* Header */}
          <div className="card-header flex px-4 pt-10 pb-3 items-start gap-3 h-[100px]">
            <div className="grade-circle w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-[14px] font-semibold flex-shrink-0">
              {school.grade}
            </div>
            <div className="school-info flex-1 min-w-0 overflow-hidden">
              <div className="school-name text-[16px] font-semibold text-[#464646] mb-1 leading-[1.3] line-clamp-2 overflow-hidden">
                {school.name}
              </div>
              {school.ranking ? (
                <div className="ranking-text text-[#089E68] text-[12px] font-medium leading-[1.4] whitespace-nowrap overflow-hidden text-ellipsis max-w-[calc(100%-16px)] pr-2.5">
                  {school.ranking}
                </div>
              ) : null}
            </div>
          </div>

          {/* Image */}
          <div className="image-container relative px-4 mb-4">
            <Image
              src={school.image}
              alt={school.name}
              width={720}
              height={720}
              className="school-image w-full h-[160px] object-cover rounded-lg"
            />
            <div className="school-type-label absolute bottom-1 left-6 bg-white px-2 pt-1 text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-[4px] h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
              {school.schoolType}
            </div>
          </div>

          {/* Stats */}
          <div className="stats-section grid grid-cols-2 gap-2.5 mx-4 mb-4">
            {stats.map((s: any) => (
              <div key={s.label} className="stat flex items-center gap-2 p-2.5 bg-[#f0f1f3] rounded-lg">
                <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                  {s.icon}
                </div>
                <div className="stat-content flex flex-col">
                  <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">{s.label}</div>
                  <div className="stat-value text-[12px] text-[#464646] font-medium leading-[1.3]">
                    {s.valueNode ?? s.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="card-footer flex items-center justify-between py-3 px-4 border-t border-[rgba(0,0,0,0.06)]">
            <div className="footer-left flex items-center gap-3">
              <div className="rating-text flex items-center gap-1 text-[12px] text-[#5F5F5F]">
                <span className="[&>svg]:w-[14px] [&>svg]:h-[14px] [&>svg]:text-[#00DF8B]">
                  <SchoolCardIcons.Star />
                </span>
                <span>
                  <span className="rating-value font-semibold text-[#464646]">{ratingNum}</span> {ratingCountText}
                </span>
              </div>
              <button
                type="button"
                className={`like-indicator w-6 h-6 flex items-center justify-center ${isLiked ? "text-[#298541]" : "text-[#5F5F5F]"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked((v) => !v);
                }}
                aria-pressed={isLiked}
                aria-label="Like"
              >
                <SchoolCardIcons.Heart className="w-4 h-4" />
              </button>
            </div>
            <div className="footer-right flex items-center gap-2">
              <button
                type="button"
                className="options-button w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all hover:text-[#346DC2] hover:bg-[#e8e8e8]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDrawerOpen(true);
                }}
                aria-label="Options"
              >
                <SchoolCardIcons.VerticalDots size={14} />
              </button>
              <button
                type="button"
                className="info-button w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-[#5F5F5F] bg-[#f5f5f7] transition-all hover:text-[#346DC2] hover:bg-[#e8e8e8]"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsInfoOpen(true);
                }}
                aria-label="Info"
              >
                <SchoolCardIcons.InfoCircle />
              </button>
            </div>
          </div>

          {/* Mobile Info Drawer */}
          {isInfoOpen && (
            <Portal containerId="mobile-modal-root">
              <div
                className="fixed inset-0 bg-black/50 z-[1000]"
                onClick={() => setIsInfoOpen(false)}
              />
              <div
                className="fixed bottom-0 left-1/2 z-[1001] w-full max-w-[420px] -translate-x-1/2 bg-white overflow-hidden flex flex-col"
                style={{ maxHeight: "80%", borderRadius: "20px 20px 0 0", boxShadow: "0 -2px 10px rgba(0,0,0,0.15)" }}
              >
                <div className="drawer-handle w-10 h-[5px] bg-[#E5E7EB] rounded-[2.5px] mt-3 mb-2 mx-auto" />
                <div className="drawer-header px-5 pb-4 border-b border-[#F0F0F0] flex justify-between items-center">
                  <div className="drawer-school-info flex items-center gap-3">
                    <Image
                      src={school.avatar || school.image}
                      alt={school.name}
                      width={40}
                      height={40}
                      className="school-avatar w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="drawer-school-name text-[16px] font-semibold text-[#464646] line-clamp-2 leading-[1.3]">
                      {school.name}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="drawer-close w-8 h-8 flex items-center justify-center border-none bg-transparent cursor-pointer text-[#5F5F5F] rounded-full hover:bg-[#F5F5F7]"
                    onClick={() => setIsInfoOpen(false)}
                    aria-label="Close"
                  >
                    <SchoolCardIcons.CloseLarge />
                  </button>
                </div>
                <div className="drawer-content p-5 overflow-y-auto flex-grow">
                  {drawerStats.length > 0 && (
                    <div className="hover-stats flex flex-wrap gap-3 mb-4">
                      {drawerStats.map((s, idx) => (
                        <div key={idx} className="hover-stat flex items-center gap-1.5 text-[13px] text-[#5F5F5F]">
                          <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{s.icon}</span>
                          <span>{s.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="school-description text-[14px] leading-[1.6] text-[#4A4A4A] mb-4">
                    <strong className="font-semibold text-[#464646] mr-1">{reviewerType}:</strong>
                    {school.description}
                  </p>
                  <div className="review-count text-[13px] font-medium text-[#346DC2] mb-4 cursor-pointer">
                    Read {reviewsCount} reviews
                  </div>
                </div>
                <div className="drawer-footer p-4 border-t border-[rgba(0,0,0,0.1)] flex gap-3">
                  <button type="button" className="hover-button button-info flex-1 py-3 rounded-lg text-[14px] font-medium text-center cursor-pointer transition-colors border-none bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA]">
                    More Info
                  </button>
                  <button
                    type="button"
                    className={`hover-button button-like flex-1 py-3 rounded-lg text-[14px] font-medium text-center cursor-pointer transition-colors border-none flex items-center justify-center gap-2 ${
                      isLiked ? "bg-[#298541] text-white" : "bg-[#EBFCF4] text-[#016853] hover:bg-[#D7F7E9]"
                    }`}
                    onClick={() => setIsLiked((v) => !v)}
                  >
                    <SchoolCardIcons.Heart className="w-4 h-4" />
                    {isLiked ? "Liked" : "Like"}
                  </button>
                </div>
              </div>
            </Portal>
          )}

          <MobileOptionsDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} schoolName={school.name} />
        </div>

        {/* ===== DESKTOP CLASSIC LAYOUT ===== */}
        <div className="school-card classic-card group relative hidden md:flex flex-col bg-white rounded-[12px] overflow-visible border border-[rgba(0,0,0,0.08)] shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:border-[rgba(1,104,83,0.2)]">
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
          {/* Stats grid - left column slightly wider */}
          <div className="stats-section grid grid-cols-[1.15fr_0.85fr] gap-2.5 mb-4">
            {stats.map((s: any) => (
              <div key={s.label} className="stat flex items-center gap-2 p-2.5 bg-[#f0f1f3] rounded-lg" data-tooltip={s.label}>
                <div className="stat-icon w-4 h-4 text-[#089E68] flex-shrink-0">
                  {s.icon}
                </div>
                <div className="stat-content flex flex-col">
                  <div className="stat-label text-[10px] text-[#5F5F5F] leading-none">{s.label}</div>
                  <div className="stat-value text-[12px] text-[#464646] font-medium leading-[1.3]">
                    {s.valueNode ?? s.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - matching HTML: padding: 12px 16px, border-top: 1px solid rgba(0,0,0,0.06) */}
        <div className="school-footer mt-auto px-4 py-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between relative z-20">
          <div className="footer-left flex items-center gap-2">
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

          <div className="footer-actions flex items-center gap-2">
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
      </>
    );
  }

  // Fallback - should not be reached since all layouts have early returns
  return null;
};

export default SchoolCard;
