// components/ProgramsSection.tsx
import { useState, useRef, useEffect } from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";

const ProgramsCard: React.FC<{ id: string }> = ({ id }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = gridRef.current;
      setCanScrollPrev(scrollLeft > 0);
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollGrid = (direction: "prev" | "next") => {
    if (gridRef.current) {
      const scrollWidth = Math.ceil(gridRef.current.scrollWidth / 2);
      gridRef.current.scrollBy({
        left: direction === "prev" ? -scrollWidth : scrollWidth,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (grid) {
      grid.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => grid.removeEventListener("scroll", checkScroll);
    }
  }, []);

  return (
    <CardWrapper id={id}>
      <h2 className="text-2xl font-semibold text-[#016853] mb-6">
        Masters Programs
      </h2>

      <div
        ref={gridRef}
        className="flex gap-4 overflow-x-auto scroll-smooth p-1 relative 
            [mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent_100%)]
            [-webkit-mask-image:linear-gradient(to_right,black_calc(100%-48px),transparent_100%)]
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Program Card 1 */}
        <ProgramCard
          universityName="Lincoln Academy College of Pharmacy"
          programName="Lincoln Academy Forensic Science online grad program"
          location="Gainesville, FL"
          tags={["Online", "Full-time"]}
          description="Established in fall of 2000, Lincoln Academy's award-winning forensic science master's degree is the world's largest and most comprehensive forensic science program. Students gain specialized knowledge in crime scene investigation, DNA analysis, and toxicology through a curriculum designed by leading experts in the field."
          features={[
            { label: "Program Length", value: "2 years", icon: ClockIcon },
            { label: "Minimum Credits", value: "32", icon: CreditsIcon },
            {
              label: "Program Accreditation",
              value: "—",
              icon: AccreditationIcon,
            },
            { label: "Tuition Per Credit", value: "$575", icon: TuitionIcon },
            { label: "Avg. Scholarship", value: "—", icon: ScholarshipIcon },
          ]}
        />

        {/* Program Card 2 */}
        <ProgramCard
          universityName="Lincoln Academy College of Pharmacy"
          programName="Lincoln Academy Pharmaceutical Outcomes & Policy online grad program"
          location="Gainesville, FL"
          tags={["Online", "Part-time"]}
          description="The Online POP program is part of the Department of Pharmaceutical Outcomes and Policy at the Lincoln Academy. This innovative program prepares professionals to analyze healthcare systems, develop effective pharmaceutical policies, and implement evidence-based practices to improve patient outcomes across healthcare settings."
          features={[
            { label: "Program Length", value: "2 years", icon: ClockIcon },
            { label: "Minimum Credits", value: "31", icon: CreditsIcon },
            {
              label: "Program Accreditation",
              value: "—",
              icon: AccreditationIcon,
            },
            { label: "Tuition Per Credit", value: "$750", icon: TuitionIcon },
            { label: "Avg. Scholarship", value: "—", icon: ScholarshipIcon },
          ]}
        />
      </div>

      <div className="flex justify-center items-center mt-8 gap-2">
        <div className="w-full h-1 bg-[#f0f0f0] rounded-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/4 bg-[#016853] rounded-sm" />
        </div>
        <div className="text-sm text-[#5F5F5F] mx-4">1/4</div>
        <button
          className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => scrollGrid("prev")}
          disabled={!canScrollPrev}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="w-9 h-9 rounded-full border border-[rgba(0,0,0,0.1)] bg-white text-[#5F5F5F] flex items-center justify-center transition-all hover:bg-[#f5f5f5] hover:text-[#346DC2] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => scrollGrid("next")}
          disabled={!canScrollNext}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-end mt-6">
        <a
          href="#"
          className="text-[#346DC2] font-medium flex items-center gap-1 hover:underline"
        >
          See All Masters Programs
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3.33334L7.06 4.27334L10.78 8.00001L7.06 11.7267L8 12.6667L12.6667 8.00001L8 3.33334Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div>
    </CardWrapper>
  );
};

interface ProgramCardProps {
  universityName: string;
  programName: string;
  location: string;
  tags: string[];
  description: string;
  features: { label: string; value: string; icon: string }[];
}

const ProgramCard: React.FC<ProgramCardProps> = ({
  universityName,
  programName,
  location,
  tags,
  description,
  features,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-w-[calc((100%-16px)/2)] flex-[0_0_calc((100%-16px)/2)] border border-[rgba(0,0,0,0.08)] rounded-xl p-5 bg-white transition-all hover:border-[rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
      <div className="text-[#5F5F5F] text-xs font-semibold uppercase tracking-[0.5px] mb-2">
        {universityName}
      </div>
      <h3 className="text-lg font-semibold text-[#464646] mb-2 leading-[1.3]">
        {programName}
      </h3>
      <div className="text-[#5F5F5F] text-xs uppercase tracking-[0.5px] mb-3">
        {location}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-[rgba(0,0,0,0.05)] px-3 py-1.5 rounded-2xl text-[13px] text-[#5F5F5F]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div
        className={`text-sm leading-[1.5] text-[#4A4A4A] mb-4 overflow-hidden ${
          isExpanded
            ? ""
            : "[display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]"
        }`}
      >
        {description}
      </div>
      <span
        className="text-[#346DC2] text-sm font-medium cursor-pointer inline-block mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "Less" : "More"}
      </span>

      <div className="h-px bg-[rgba(0,0,0,0.08)] my-4" />

      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-2 text-[#5F5F5F] text-sm">
                <span
                  dangerouslySetInnerHTML={{ __html: feature.icon }}
                  className="w-4 h-4 text-[#089E68]"
                />
                {feature.label}
              </div>
              <span className="font-medium text-[#464646] text-sm">
                {feature.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-5 pt-4 border-t border-[rgba(0,0,0,0.08)]">
        <button className="text-[#016853] font-semibold text-sm bg-none border-none cursor-pointer p-0 transition-colors hover:text-[#089E68]">
          Apply Now
        </button>
        <div className="flex items-center gap-1.5 text-[#346DC2] font-medium text-sm cursor-pointer transition-colors hover:text-[#2857a0]">
          Learn More
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 3.33334L7.06 4.27334L10.78 8.00001L7.06 11.7267L8 12.6667L12.6667 8.00001L8 3.33334Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

// SVG Icons as strings (exactly as in original HTML)
const ClockIcon = `<svg class="feature-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0251 3.98957C12.6023 3.33626 14.2928 3 16 3C17.7072 3 19.3977 3.33626 20.9749 3.98957C22.5521 4.64288 23.9852 5.60045 25.1924 6.80761C26.3995 8.01477 27.3571 9.44788 28.0104 11.0251C28.6637 12.6023 29 14.2928 29 16C29 17.7072 28.6637 19.3977 28.0104 20.9749C27.3571 22.5521 26.3995 23.9852 25.1924 25.1924C23.9852 26.3995 22.5521 27.3571 20.9749 28.0104C19.3977 28.6637 17.7072 29 16 29C14.2928 29 12.6023 28.6637 11.0251 28.0104C9.44788 27.3571 8.01477 26.3995 6.80761 25.1924C5.60045 23.9852 4.64288 22.5521 3.98957 20.9749C3.33625 19.3977 3 17.7072 3 16C3 14.2928 3.33625 12.6023 3.98957 11.0251C4.64288 9.44788 5.60045 8.01477 6.80761 6.80761C8.01477 5.60045 9.44788 4.64288 11.0251 3.98957ZM16 5C14.5555 5 13.1251 5.28452 11.7905 5.83733C10.4559 6.39013 9.24327 7.20038 8.22183 8.22183C7.20038 9.24327 6.39013 10.4559 5.83733 11.7905C5.28452 13.1251 5 14.5555 5 16C5 17.4445 5.28452 18.8749 5.83733 20.2095C6.39013 21.5441 7.20038 22.7567 8.22183 23.7782C9.24327 24.7996 10.4559 25.6099 11.7905 26.1627C13.1251 26.7155 14.5555 27 16 27C17.4445 27 18.8749 26.7155 20.2095 26.1627C21.5441 25.6099 22.7567 24.7996 23.7782 23.7782C24.7996 22.7567 25.6099 21.5441 26.1627 20.2095C26.7155 18.8749 27 17.4445 27 16C27 14.5555 26.7155 13.1251 26.1627 11.7905C25.6099 10.4559 24.7996 9.24327 23.7782 8.22183C22.7567 7.20038 21.5441 6.39013 20.2095 5.83733C18.8749 5.28452 17.4445 5 16 5ZM16 8.33333C16.5523 8.33333 17 8.78105 17 9.33333V15.4648L20.5547 17.8346C21.0142 18.141 21.1384 18.7618 20.8321 19.2214C20.5257 19.6809 19.9048 19.8051 19.4453 19.4987L15.4453 16.8321C15.1671 16.6466 15 16.3344 15 16V9.33333C15 8.78105 15.4477 8.33333 16 8.33333Z" fill="currentColor"></path></svg>`;

const CreditsIcon = `<svg class="feature-icon" viewBox="0 0 20 20" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.72154 3.47033C9.90035 3.39881 10.0998 3.39881 10.2786 3.47033L18.612 6.80366C18.8967 6.91756 19.0834 7.19334 19.0834 7.50002V12.5C19.0834 12.9142 18.7476 13.25 18.3334 13.25C17.9192 13.25 17.5834 12.9142 17.5834 12.5V8.6078L15.7501 9.34113V13.3334C15.7501 14.4243 14.9016 15.2566 13.871 15.7719C12.8053 16.3048 11.4126 16.5834 10.0001 16.5834C8.58758 16.5834 7.19484 16.3048 6.12914 15.7719C5.09852 15.2566 4.25008 14.4243 4.25008 13.3334V9.34113L1.38821 8.19638C1.10346 8.08248 0.916748 7.8067 0.916748 7.50002C0.916748 7.19334 1.10346 6.91756 1.38821 6.80366L9.72154 3.47033ZM5.29422 8.14324C5.2838 8.13879 5.27326 8.13457 5.2626 8.13059L3.68619 7.50002L10.0001 4.97446L16.314 7.50002L14.7376 8.13059C14.7269 8.13457 14.7164 8.13879 14.7059 8.14323L10.0001 10.0256L5.29422 8.14324ZM5.75008 9.94113V13.3334C5.75008 13.5685 5.95521 14.0079 6.79996 14.4303C7.60962 14.8351 8.76042 15.0834 10.0001 15.0834C11.2397 15.0834 12.3905 14.8351 13.2002 14.4303C14.0449 14.0079 14.2501 13.5685 14.2501 13.3334V9.94113L10.2786 11.5297C10.0998 11.6012 9.90035 11.6012 9.72154 11.5297L5.75008 9.94113Z" fill="currentColor"></path></svg>`;

const AccreditationIcon = `<svg class="feature-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.3372 10.2022L18.3202 11.3112C18.2102 11.4312 18.1653 11.6012 18.2003 11.7602L18.5263 13.2282C18.5813 13.4832 18.4363 13.7422 18.1803 13.8222L16.7422 14.2712C16.5812 14.3212 16.4613 14.4462 16.4113 14.6012L15.9602 16.0342C15.8802 16.2842 15.6242 16.4342 15.3632 16.3792L13.8892 16.0542C13.7292 16.0192 13.5582 16.0642 13.4382 16.1742L12.3252 17.1882C12.1292 17.3632 11.8343 17.3632 11.6383 17.1882L10.5302 16.1742C10.4102 16.0642 10.2393 16.0192 10.0793 16.0542L8.60525 16.3792C8.34925 16.4342 8.08925 16.2892 8.00925 16.0342L7.55825 14.6012C7.50825 14.4412 7.38325 14.3212 7.22725 14.2712L5.78825 13.8222C5.53725 13.7422 5.38725 13.4872 5.44225 13.2282L5.76825 11.7602C5.80325 11.6002 5.75825 11.4302 5.64825 11.3112L4.63125 10.2022C4.45625 10.0072 4.45625 9.71315 4.63125 9.51815L5.64825 8.40915C5.75825 8.28915 5.80325 8.11915 5.76825 7.95915L5.44225 6.49115C5.38725 6.23615 5.53225 5.97715 5.78825 5.89715L7.22725 5.44815C7.38725 5.39815 7.50825 5.27315 7.55825 5.11815L8.00925 3.68515C8.08925 3.43515 8.34525 3.28515 8.60525 3.34015L10.0793 3.66515C10.2403 3.70015 10.4102 3.65515 10.5302 3.54515L11.6432 2.53115C11.8392 2.35615 12.1342 2.35615 12.3302 2.53115L13.4382 3.54515C13.5582 3.65515 13.7292 3.70015 13.8892 3.66515L15.3632 3.34015C15.6192 3.28515 15.8792 3.43015 15.9602 3.68515L16.4113 5.11815C16.4613 5.27815 16.5862 5.39815 16.7422 5.44815L18.1803 5.89715C18.4313 5.97715 18.5813 6.23215 18.5263 6.49115L18.2003 7.95915C18.1653 8.11915 18.2102 8.28915 18.3202 8.40915L19.3372 9.51815C19.5172 9.71315 19.5172 10.0072 19.3372 10.2022Z" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round"></path><path d="M9.34641 16.374L8.30941 21.14C8.23741 21.279 8.32241 21.484 8.42941 21.427L11.9074 19.591L15.5444 21.385C15.6504 21.437 15.7344 21.234 15.6624 21.097L14.7324 16.602" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round"></path><path d="M11.9864 13.674C14.0878 13.674 15.7914 11.9704 15.7914 9.86896C15.7914 7.76752 14.0878 6.06396 11.9864 6.06396C9.88495 6.06396 8.1814 7.76752 8.1814 9.86896C8.1814 11.9704 9.88495 13.674 11.9864 13.674Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

const TuitionIcon = `<svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path fill="currentColor" d="M10.3031 4.71338C10.638 4.71338 10.9096 4.98493 10.9096 5.3199V5.62947C11.7726 5.74654 12.5494 6.11208 13.0363 6.67319C13.2559 6.92617 13.2288 7.30925 12.9758 7.52881C12.7229 7.74837 12.3398 7.72128 12.1202 7.4683C11.8892 7.20209 11.4627 6.96219 10.9096 6.85747V9.13097C11.5063 9.2117 12.0549 9.41056 12.4966 9.70499C13.0803 10.0941 13.5358 10.6984 13.5358 11.4478C13.5358 12.1973 13.0803 12.8015 12.4966 13.1907C12.0549 13.4851 11.5063 13.684 10.9096 13.7647V14.0741C10.9096 14.4091 10.638 14.6806 10.3031 14.6806C9.9681 14.6806 9.69656 14.4091 9.69656 14.0741V13.7645C8.83357 13.6474 8.0568 13.2819 7.5698 12.7208C7.35024 12.4678 7.37733 12.0847 7.63031 11.8652C7.88329 11.6456 8.26636 11.6727 8.48592 11.9257C8.71697 12.1919 9.14345 12.4318 9.69656 12.5365V10.263C9.09982 10.1823 8.55128 9.98342 8.10959 9.68899C7.52581 9.29985 7.07031 8.69563 7.07031 7.94614C7.07031 7.19665 7.52581 6.59244 8.10959 6.2033C8.55128 5.90886 9.09982 5.71 9.69656 5.62928V5.3199C9.69656 4.98493 9.9681 4.71338 10.3031 4.71338ZM9.69656 6.85766C9.33347 6.92644 9.02055 7.0539 8.78241 7.21264C8.4157 7.45709 8.28336 7.7283 8.28336 7.94614C8.28336 8.16399 8.4157 8.4352 8.78241 8.67964C9.02055 8.83839 9.33347 8.96585 9.69656 9.03463V6.85766ZM10.9096 10.3594V12.5363C11.2727 12.4675 11.5856 12.3401 11.8237 12.1813C12.1905 11.9369 12.3228 11.6657 12.3228 11.4478C12.3228 11.23 12.1905 10.9588 11.8237 10.7143C11.5856 10.5556 11.2727 10.4281 10.9096 10.3594Z" clip-rule="evenodd" fill-rule="evenodd"></path><path fill="currentColor" d="M10.3399 2.51392C6.38177 2.51392 3.1731 5.72259 3.1731 9.6807C3.1731 13.6388 6.38177 16.8475 10.3399 16.8475C14.298 16.8475 17.5067 13.6388 17.5067 9.6807C17.5067 5.72259 14.298 2.51392 10.3399 2.51392ZM1.9231 9.6807C1.9231 5.03224 5.69142 1.26392 10.3399 1.26392C14.9883 1.26392 18.7567 5.03224 18.7567 9.6807C18.7567 14.3292 14.9883 18.0975 10.3399 18.0975C5.69142 18.0975 1.9231 14.3292 1.9231 9.6807Z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>`;

const ScholarshipIcon = `<svg class="feature-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" d="M15.851 9.39448C15.6204 8.28068 14.2768 8.08651 13.572 8.33086C13.2425 8.44541 12.7621 8.69195 12.6122 9.23412C12.4634 9.77301 12.7536 10.3239 13.149 10.6086C14.0079 11.2272 15.1931 10.8552 15.7192 11.8686C16.273 12.9355 15.411 13.7864 14.4936 13.9795C13.5316 14.1824 12.3709 13.65 12.4453 12.3584"></path><path stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" d="M7.47807 11.838C7.08265 7.28026 10.4406 4.54541 14.0079 4.54541C17.5752 4.54541 20.4686 7.51371 20.4686 11.1758C20.4686 14.8379 17.4944 17.6458 13.926 17.6458"></path><path stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" d="M14.2279 15.0255L14.1694 7.06421"></path><path stroke-linecap="round" stroke-miterlimit="10" stroke="currentColor" d="M4.53149 15.2493C5.03534 15.0377 4.92585 15.09 5.39675 14.753C5.93036 14.3722 6.0898 13.7297 6.44908 13.1875C7.05178 12.2788 7.83306 12.3236 8.65048 11.6232C9.02784 11.3003 9.24681 10.9927 9.36905 10.6152C9.51999 10.1472 10.1439 10.1058 10.3587 10.5476C10.5659 10.973 10.5936 11.5327 10.4469 11.9407C10.1004 12.9006 9.53381 13.0054 8.96937 13.793C8.21361 14.8468 9.36267 15.7533 10.2343 16.218C10.9412 16.5955 11.2048 16.77 11.9329 17.0907C12.5367 17.3569 12.6483 17.4071 13.1787 17.5849L13.2244 17.5903C13.7017 17.646 14.1853 17.6493 14.6626 17.5914C15.4003 17.502 16.0094 17.2773 16.7577 17.0165C17.4858 16.7635 18.215 16.4253 18.5966 17.2445L18.6126 17.6034C16.2932 18.6016 16.1529 18.8656 15.3631 19.0685C14.8593 19.1972 13.6113 19.3467 13.0182 19.4012L12.6983 19.4394C12.3198 19.4896 11.6948 19.423 11.2165 19.1296C11.0166 19.0074 10.77 18.8503 10.2928 18.6649C8.24975 17.8729 6.84663 17.6482 4.82806 18.5471"></path></svg>`;

export default ProgramsCard;
