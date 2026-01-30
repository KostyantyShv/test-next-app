import React, { useMemo, useState } from "react";
import Image from "next/image";
import { SchoolCardIcons } from "../../SchoolCardIcons";
import { SchoolCardContextMenu } from "../../SchoolCardContextMenu";
import { School } from "../../types";

type Establishment = "K-12" | "Colleges" | "Graduates" | "District";

function parseRating(ratingRaw: string): { value: string; count: string } {
  // Expected examples: "4.9 (875)", "4.7 (1k)", "4.7 (1k+)"
  const match = ratingRaw?.match(/^([\d.]+)\s*(\([^)]+\))?$/);
  if (!match) return { value: ratingRaw || "—", count: "" };
  return { value: match[1] || ratingRaw, count: match[2] || "" };
}

function getSpecialtyMeta(specialty: School["specialty"]) {
  if (!specialty) return null;
  if (specialty === "hot") return { className: "hot", icon: <SchoolCardIcons.Hot />, label: "High demand" };
  if (specialty === "instant-book")
    return { className: "instant-book", icon: <SchoolCardIcons.InstantBook />, label: "Instant book" };
  return { className: "sponsored", icon: <SchoolCardIcons.Sponsored />, label: "Sponsored" };
}

export const DesktopGridSchoolCard: React.FC<{
  school: School;
  establishment: Establishment;
}> = ({ school, establishment }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showReview] = useState(() => Math.random() > 0.5);

  const rating = useMemo(() => parseRating(school.rating || ""), [school.rating]);
  const specialty = useMemo(() => getSpecialtyMeta(school.specialty), [school.specialty]);

  const secondStat = useMemo(() => {
    if (establishment === "Colleges" || establishment === "Graduates") {
      return {
        icon: <SchoolCardIcons.Duration />,
        value: school.duration || "—",
      };
    }
    if (establishment === "District") {
      return {
        icon: <SchoolCardIcons.TotalSchools />,
        value: (school as any).totalSchools ? String((school as any).totalSchools) : "—",
      };
    }
    return { icon: <SchoolCardIcons.Ratio />, value: school.ratio || "—" };
  }, [establishment, school]);

  const footerStat = useMemo(() => {
    if (establishment === "Colleges") {
      return { icon: <SchoolCardIcons.SAT />, text: `SAT: ${school.sat || "—"}` };
    }
    return { icon: <SchoolCardIcons.Students />, text: `Students: ${school.students || "—"}` };
  }, [establishment, school.sat, school.students]);

  const hoverStat1 = useMemo(() => {
    // Tuition for all types (match HTML)
    const perYear = establishment === "K-12" || establishment === "Colleges";
    const price = school.price || "—";
    return {
      icon: <SchoolCardIcons.Tuition />,
      text: perYear && !price.includes("/") ? `${price}/yr` : price,
      iconClassName: "text-[#089E68]",
    };
  }, [establishment, school.price]);

  const hoverStat2 = useMemo(() => {
    if (establishment === "Colleges") {
      return { icon: <SchoolCardIcons.Acceptance />, text: `Acceptance: ${school.acceptanceRate || "—"}` };
    }
    if (establishment === "Graduates") {
      return { icon: <SchoolCardIcons.MedianSalary />, text: `~${(school as any).medianSalary || "—"}` };
    }
    if (establishment === "District") {
      return { icon: <SchoolCardIcons.Ratio />, text: school.ratio || "—" };
    }
    return { icon: <SchoolCardIcons.Grades />, text: `Grades: ${school.grades || "—"}` };
  }, [establishment, school]);

  return (
    <div className="group relative flex flex-col bg-white rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#E5E7EB] transition-[transform,box-shadow] duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]">
      {/* Image */}
      <div className="relative w-full h-[160px] overflow-hidden">
        <Image src={school.image} alt={school.name} fill sizes="(max-width: 1055px) 33vw, 250px" className="object-cover" />

        <button
          type="button"
          className={`absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 z-[2] ${
            isLiked ? "text-[#016853] bg-[#E6F7F0]" : "text-[#4A4A4A]"
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
          <div
            className={`absolute top-3 left-0 h-8 bg-white rounded-r-[16px] flex items-center px-3 text-[12px] font-medium shadow-[0_2px_2px_rgba(0,0,0,0.1)] z-[2] ${specialty.className === "hot"
              ? "text-[#FF4D4D]"
              : specialty.className === "instant-book"
                ? "text-[#1D77BD]"
                : "text-[#FF9900]"
              }`}
          >
            <span className="[&>svg]:w-4 [&>svg]:h-4 mr-1">{specialty.icon}</span>
            {specialty.label}
          </div>
        ) : null}

        <div className="absolute bottom-0 left-[10px] bg-white px-2 pt-1 text-[11px] font-semibold text-[#464646] tracking-[0.02em] rounded-t-md h-6 flex items-center z-[2] uppercase shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
          {school.schoolType}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        {school.ranking ? (
          <div className="text-[#089E68] text-[13px] mb-2 whitespace-nowrap overflow-hidden text-ellipsis font-medium">
            {school.ranking}
          </div>
        ) : null}

        <div className="text-[16px] font-semibold text-[#464646] mb-2 leading-[1.4]">
          {school.name}
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-[6px] text-[13px] text-[#5F5F5F] font-[450]">
            <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656]">{<SchoolCardIcons.Location />}</span>
            <span className="text-[#464646]">{school.location}</span>
          </div>

          <div className="flex items-center gap-[6px] text-[13px] text-[#5F5F5F] font-[450]">
            <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656]">{secondStat.icon}</span>
            <span className="text-[#464646]">{secondStat.value}</span>
          </div>

          <div className="flex items-center gap-[6px] text-[13px] text-[#5F5F5F] font-[450]">
            <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#565656]">{<SchoolCardIcons.Star className="w-4 h-4 text-[#565656]" />}</span>
            <span className="text-[#464646]">
              <strong className="font-semibold text-[#444444]">{rating.value}</strong> {rating.count}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[rgba(1,104,83,0.1)] flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-[#016853]">
          <div className="w-8 h-8 bg-[#00DF8B] rounded-full flex items-center justify-center text-white text-[14px] font-semibold">
            {school.grade}
          </div>
        </div>

        <div className="flex items-center gap-[6px] text-[13px] text-[#5F5F5F]">
          <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{footerStat.icon}</span>
          <span className="whitespace-nowrap">{footerStat.text}</span>
        </div>
      </div>

      {/* Hover overlay (desktop) */}
      <div className="pointer-events-none absolute inset-0 bg-[rgba(255,255,255,0.98)] p-6 opacity-0 invisible transition-[opacity,visibility] duration-300 ease-in-out group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto flex flex-col z-[10]">
        <div className="flex justify-between gap-3 mb-4">
          <div className="flex gap-3">
            {/* avatar */}
            <Image src={school.avatar || school.image} alt={school.name} width={40} height={40} className="w-10 h-10 rounded-lg object-cover" />
            <div className="text-[16px] font-semibold text-[#464646] hover:text-[#346DC2] transition-colors cursor-pointer">
              {school.name}
            </div>
          </div>

          <div className="relative">
            <div className="w-8 h-8 flex items-center justify-center cursor-pointer relative translate-y-[-4px]">
              <div className="absolute inset-0 rounded-full w-7 h-7 m-auto bg-transparent transition-colors duration-200 group-hover:bg-[#f5f5f7]" />
              <div className="relative z-[1] w-8 h-8 flex items-center justify-center">
                <SchoolCardContextMenu
                  schoolName={school.name}
                  buttonClassName="w-8 h-8 bg-transparent border-none flex items-center justify-center text-[#565656] pointer-events-auto"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <div className="flex items-center gap-[6px] text-[13px] text-[#5F5F5F]">
            <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{hoverStat1.icon}</span>
            <span className="text-[#464646]">{hoverStat1.text}</span>
          </div>
          <div className="flex items-center gap-[6px] text-[13px] text-[#5F5F5F]">
            <span className="[&>svg]:w-4 [&>svg]:h-4 [&>svg]:text-[#089E68]">{hoverStat2.icon}</span>
            <span className="text-[#464646]">{hoverStat2.text}</span>
          </div>
        </div>

        <div className="text-[14px] leading-[1.6] text-[#4A4A4A] line-clamp-3 mb-3">
          {showReview && (school as any).review ? (
            <>
              <span className="font-semibold text-[#464646] mr-1">{(school as any).reviewerType || "Parent"}:</span>
              {(school as any).review}
            </>
          ) : (
            school.description
          )}
        </div>

        <div className="text-[13px] font-semibold text-[#1D77BD] mb-4 cursor-pointer hover:text-[#346DC2] hover:underline">
          Read {school.reviews} reviews
        </div>

        <div className="flex gap-3 mt-auto">
          <button type="button" className="flex-1 py-3 rounded-lg text-[14px] font-medium bg-[#F5F5F7] text-[#464646] hover:bg-[#E8E8EA] transition-colors">
            More Info
          </button>
          <button
            type="button"
            className="flex-1 py-3 rounded-lg text-[14px] font-medium bg-[#298541] text-white hover:bg-[#237436] transition-colors flex items-center justify-center gap-2"
            onClick={() => setIsLiked((v) => !v)}
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
};

