// components/OverviewCard.tsx
import { useState } from "react";
import CardWrapper from "../../card-wrapper/CardWrapper";
import CourseStats from "./CourseStats";
import AboutSection from "./AboutSection";
import KeyBenefits from "./KeyBenefits";
import Testimonial from "./Testimonial";
import FAQSection from "./FAQSection";

interface OverviewCardProps {
  id: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ id }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [arePointsExpanded, setArePointsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<"instructor" | "marketplace">(
    "instructor"
  );
  const [activeFaqItem, setActiveFaqItem] = useState<number | null>(null);

  const toggleDescription = () =>
    setIsDescriptionExpanded(!isDescriptionExpanded);
  const togglePoints = () => setArePointsExpanded(!arePointsExpanded);
  const toggleFaqItem = (index: number) =>
    setActiveFaqItem(activeFaqItem === index ? null : index);

  const faqData = {
    instructor: [
      {
        question: "What is the average class size for undergraduate programs?",
        answer:
          "Our undergraduate classes typically have 20-25 students, allowing for personalized attention and interactive learning experiences. Core courses might have larger sizes but include smaller discussion sections.",
      },
      {
        question: "How do I apply for scholarships and financial aid?",
        answer:
          "Students can apply for scholarships and financial aid through our online portal. The application process opens in October for the following academic year. We offer merit-based scholarships, need-based grants, and work-study opportunities.",
      },
      {
        question: "What academic support services are available?",
        answer:
          "We provide comprehensive academic support including tutoring, writing center services, academic advising, study skills workshops, and research assistance through our library services.",
      },
    ],
    marketplace: [
      {
        question: "What housing options are available for students?",
        answer:
          "We offer various housing options including traditional residence halls, apartment-style living, and themed housing communities. First-year students typically live in our residential colleges, while upperclassmen have more housing choices.",
      },
      {
        question: "What recreational facilities are available on campus?",
        answer:
          "Our campus features a modern recreation center with gymnasium, swimming pool, fitness studios, and outdoor sports facilities. We also have student lounges, game rooms, and various spaces for social activities.",
      },
      {
        question: "How can students get involved in campus activities?",
        answer:
          "Students can join over 150 student organizations, participate in intramural sports, attend campus events, or get involved in student government. We host activities fairs at the beginning of each semester.",
      },
    ],
  };

  const pointsData = [
    "Master modern JavaScript fundamentals and ES6+ features",
    "Build real-world applications with React and TypeScript",
    "Learn advanced backend development with Node.js",
    "Deploy and scale applications using Docker and Kubernetes",
  ];

  return (
    <CardWrapper id={id}>
      <h1 className="text-2xl md:text-[22px] font-bold md:font-semibold mb-8 md:mb-0 text-[#111] md:text-[#016853] pb-4 border-b border-[#E1E7EE]">
        OVERVIEW
      </h1>
      <CourseStats />
      <AboutSection
        isExpanded={isDescriptionExpanded}
        toggleExpand={toggleDescription}
      />
      <div className="h-px bg-[#E5E5E5] md:bg-[#E1E7EE] my-8 md:m-4"></div>
      <KeyBenefits
        points={pointsData}
        isExpanded={arePointsExpanded}
        toggleExpand={togglePoints}
      />
      <Testimonial />
      <FAQSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        faqData={faqData}
        activeFaqItem={activeFaqItem}
        toggleFaqItem={toggleFaqItem}
      />
    </CardWrapper>
  );
};

export default OverviewCard;
