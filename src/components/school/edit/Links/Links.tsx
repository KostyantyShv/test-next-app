import LinksSection from "./LinksSection";
import { ProfileSection } from "./ProfileSection";

export default function Links() {
  return (
    <div className="text-[#4A4A4A] my-6">
      <div className="w-full mx-auto flex max-md:flex-col gap-6">
        <ProfileSection />
        <LinksSection />
      </div>
    </div>
  );
}
