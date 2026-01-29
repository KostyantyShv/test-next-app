import Image from "next/image";

export function ProfileSection() {
  return (
    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
      <Image
        src="https://i.ibb.co/NKp6WsG/AVATAR-Kostis-Kapelonis.png"
        alt="Steve Roberts"
        width={40}
        height={40}
        className="rounded-full flex-shrink-0 md:w-12 md:h-12"
      />
      <div className="flex-grow">
        <div className="text-base md:text-lg font-semibold text-[#464646] mb-0.5 md:mb-1">
          Steve Roberts
        </div>
        <div className="text-xs md:text-sm font-medium text-[#5F5F5F]">
          Head of Impact Academy
        </div>
      </div>
    </div>
  );
}
