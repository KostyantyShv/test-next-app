// components/AboutSection.tsx
interface AboutSectionProps {
  isExpanded: boolean;
  toggleExpand: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  isExpanded,
  toggleExpand,
}) => (
  <div className="bg-[#EBFCF4] rounded-lg p-6 md:p-4 mb-8 md:m-4">
    <div className="text-[#089E68] font-semibold mb-3 text-sm">About</div>
    <div
      className={`text-[#333] md:text-[#4A4A4A] leading-6 text-sm mb-3 ${
        isExpanded ? "" : "line-clamp-3"
      }`}
    >
      Welcome to our prestigious institution of higher learning, where academic
      excellence meets real-world opportunity. Founded in 1965, we`ve been at
      the forefront of innovative education for over half a century. Our campus
      combines state-of-the-art facilities with a rich tradition of academic
      achievement and cultural diversity. We offer a comprehensive range of
      undergraduate and graduate programs across various disciplines, from
      Business and Engineering to Arts and Sciences. Our dedicated faculty
      members are leading experts in their fields, committed to providing
      students with an engaging and challenging educational experience. With
      small class sizes and a student-to-faculty ratio of 15:1, we ensure
      personalized attention and meaningful interactions between students and
      professors. The campus spans 200 acres of beautiful grounds, featuring
      modern academic buildings, research centers, student housing, recreational
      facilities, and a vibrant student center. Our location in the heart of the
      city provides unique opportunities for internships, research
      collaborations, and career development.
    </div>
    <button
      className="text-[#089E68] font-medium flex items-center gap-1 cursor-pointer"
      onClick={toggleExpand}
    >
      {isExpanded ? "Show less" : "Show more"}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d={isExpanded ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
);

export default AboutSection;
