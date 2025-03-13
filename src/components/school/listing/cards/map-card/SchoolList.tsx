import SchoolItem from "./SchoolItem";
import { School } from "./types";

interface SchoolListProps {
  schools: School[];
  setActiveTooltip: (school: School | null) => void;
}

export default function SchoolList({
  schools,
  setActiveTooltip,
}: SchoolListProps) {
  return (
    <div className="p-4 md:hidden">
      <h3 className="text-[#464646] text-lg font-semibold mb-4">
        Nearby Schools
      </h3>
      {schools.map((school) => (
        <SchoolItem
          key={school.id}
          school={school}
          onClick={() => {
            setActiveTooltip(school);
            document
              .querySelector(".map-content")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
      ))}
    </div>
  );
}
