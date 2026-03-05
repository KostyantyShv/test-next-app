import Image from "next/image";
import { useEffect, useState } from "react";
import { Testimonial } from "./testimonials-data";

interface ProfileSectionProps {
  testimonial: Testimonial;
}

export function ProfileSection({ testimonial }: ProfileSectionProps) {
  const fallbackAvatarSrc = "/images/avatar.png";
  const [avatarSrc, setAvatarSrc] = useState(
    testimonial.author.avatarImage || fallbackAvatarSrc,
  );

  useEffect(() => {
    setAvatarSrc(testimonial.author.avatarImage || fallbackAvatarSrc);
  }, [testimonial.author.avatarImage]);

  const authorFullName = `${testimonial.author.firstName} ${testimonial.author.lastName}`;

  return (
    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
      <Image
        src={avatarSrc}
        alt={authorFullName}
        width={40}
        height={40}
        className="rounded-full flex-shrink-0 md:w-12 md:h-12"
        onError={() => {
          if (avatarSrc !== fallbackAvatarSrc) setAvatarSrc(fallbackAvatarSrc);
        }}
      />
      <div className="flex-grow">
        <div className="text-base md:text-lg font-semibold text-[#464646] mb-0.5 md:mb-1">
          {authorFullName}
        </div>
        <div className="text-xs md:text-sm font-medium text-[#5F5F5F]">
          {testimonial.author.achievement}
        </div>
      </div>
    </div>
  );
}
