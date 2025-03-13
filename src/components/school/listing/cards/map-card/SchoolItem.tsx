import { School } from "./types";

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

interface SchoolItemProps {
  school: School;
  onClick: () => void;
}

export default function SchoolItem({ school, onClick }: SchoolItemProps) {
  return (
    <div
      className="flex gap-3 p-3 rounded-lg border border-black border-opacity-10 mb-3 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={school.image}
        alt={school.name}
        className="w-12 h-12 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="text-[#464646] text-[15px] font-semibold m-0">
          {school.name}
        </h3>
        <p className="text-[#5f5f5f] text-[13px] m-0">{school.location}</p>
      </div>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${getGradeClass(
          school.grade
        )}`}
      >
        {school.grade}
      </div>
    </div>
  );
}
