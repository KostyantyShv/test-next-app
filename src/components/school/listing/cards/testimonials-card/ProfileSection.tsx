import Image from "next/image";
import { testimonials } from "./testimonials-data";

interface ProfileSectionProps {
  currentSlide: number;
}

export function ProfileSection({ currentSlide }: ProfileSectionProps) {
  const testimonial = testimonials[currentSlide];

  return (
    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
      <Image
        src={testimonial.thumbnailImage}
        alt={`${testimonial.authorFirstName} ${testimonial.authorLastName}`}
        width={40}
        height={40}
        className="rounded-full flex-shrink-0 md:w-12 md:h-12"
      />
      <div className="flex-grow">
        <div className="text-base md:text-lg font-semibold text-[#464646] mb-0.5 md:mb-1">
          {testimonial.authorFirstName} {testimonial.authorLastName}
        </div>
        <div className="text-xs md:text-sm font-medium text-[#5F5F5F]">
          {testimonial.role}
        </div>
      </div>
    </div>
  );
}
