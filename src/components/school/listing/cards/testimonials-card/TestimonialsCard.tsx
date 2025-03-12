import { useState } from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";
import { HeaderSection } from "./HeaderSection";
import { QuoteSection } from "./QuoteSection";
import { ProfileSection } from "./ProfileSection";
import { NavigationControls } from "./NavigationControls";
import { VideoSection } from "./VideoSection";

export default function TestimonialsCard({ id }: { id: string }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const updateDots = (index: number) => setCurrentSlide(index);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + 5) % 5);
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % 5);

  return (
    <CardWrapper id={id}>
      <HeaderSection />
      <div className="bg-white rounded-xl md:rounded-[16px] p-4 md:p-[24px] shadow-[0_4px_16px_rgba(0,0,0,0.06)] flex flex-col md:flex-row gap-5 md:gap-10">
        <div className="flex flex-col md:flex-[0_0_57%]">
          <QuoteSection />
          <ProfileSection />
          <NavigationControls
            currentSlide={currentSlide}
            updateDots={updateDots}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>
        <VideoSection />
      </div>
    </CardWrapper>
  );
}
