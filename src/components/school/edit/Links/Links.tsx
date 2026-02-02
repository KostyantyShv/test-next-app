import LinksSection from "./LinksSection";
import { ProfileSection } from "./ProfileSection";

export default function Links() {
  return (
    <section className="school-edit-links">
      <div className="links-container">
        <ProfileSection />
        <LinksSection />
      </div>
    </section>
  );
}
