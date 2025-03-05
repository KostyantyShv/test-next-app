import { useState } from "react";
import Image from "next/image";
import CardWrapper from "../../card-wrapper/CardWrapper";

export default function OverviewCard({ id }: { id: string }) {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [arePointsExpanded, setArePointsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("instructor");
  const [activeFaqItem, setActiveFaqItem] = useState<number | null>(null);

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const togglePoints = () => {
    setArePointsExpanded(!arePointsExpanded);
  };

  const toggleFaqItem = (index: number) => {
    setActiveFaqItem(activeFaqItem === index ? null : index);
  };

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
    <>
      <CardWrapper id={id}>
        <h1 className="text-2xl font-bold mb-8 text-[#111] pb-4 border-b border-[#E1E7EE]">
          OVERVIEW
        </h1>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#4F4F4F"
                  d="M8.00008 6.33331C7.91168 6.33331 7.82689 6.36843 7.76438 6.43094C7.70187 6.49346 7.66675 6.57824 7.66675 6.66665V25.3333C7.66675 25.4217 7.70187 25.5065 7.76438 25.569C7.82689 25.6315 7.91167 25.6666 8.00008 25.6666H11.0001V6.33331H8.00008ZM8.00008 4.33331C7.38124 4.33331 6.78775 4.57915 6.35017 5.01673C5.91258 5.45432 5.66675 6.04781 5.66675 6.66665V25.3333C5.66675 25.9522 5.91258 26.5456 6.35017 26.9832C6.78775 27.4208 7.38124 27.6666 8.00008 27.6666H11.0001V29.3333C11.0001 29.8856 11.4478 30.3333 12.0001 30.3333C12.5524 30.3333 13.0001 29.8856 13.0001 29.3333V27.6666H22.6667C23.6392 27.6666 24.5718 27.2803 25.2595 26.5927C25.9471 25.9051 26.3334 24.9724 26.3334 24V7.99998C26.3334 7.02752 25.9471 6.09489 25.2595 5.40725C24.5718 4.71962 23.6392 4.33331 22.6667 4.33331H8.00008ZM13.0001 6.33331V25.6666H22.6667C23.1088 25.6666 23.5327 25.4911 23.8453 25.1785C24.1578 24.8659 24.3334 24.442 24.3334 24V7.99998C24.3334 7.55795 24.1578 7.13403 23.8453 6.82147C23.5327 6.50891 23.1088 6.33331 22.6667 6.33331H13.0001Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div className="text-xs text-[#666]">Lessons</div>
            </div>
            <div className="text-sm font-medium text-[#333] pl-6">17</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24">
                <path
                  fill="#4F4F4F"
                  d="M5 6.75C4.66848 6.75 4.35054 6.8817 4.11612 7.11612C3.8817 7.35054 3.75 7.66848 3.75 8V16C3.75 16.3315 3.8817 16.6495 4.11612 16.8839C4.35054 17.1183 4.66848 17.25 5 17.25H13C13.3315 17.25 13.6495 17.1183 13.8839 16.8839C14.1183 16.6495 14.25 16.3315 14.25 16V8C14.25 7.66848 14.1183 7.35054 13.8839 7.11612C13.6495 6.8817 13.3315 6.75 13 6.75H5Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div className="text-xs text-[#666]">Duration</div>
            </div>
            <div className="text-sm font-medium text-[#333] pl-6">18h 22m</div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 shrink-0"
                aria-hidden="true"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4F4F4F"
                  d="M12 4.875a.75.75 0 01.648.372l1.994 3.414 3.893.85a.75.75 0 01.395 1.238l-2.646 2.905.414 3.892a.75.75 0 01-1.042.768L12 16.744l-3.656 1.57a.75.75 0 01-1.042-.768l.414-3.892L5.07 10.75a.75.75 0 01.395-1.238l3.893-.85 1.994-3.414A.75.75 0 0112 4.875z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div className="text-xs text-[#666]">Rating</div>
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-[#333] pl-6">
              <strong>4.2</strong>
              <span className="text-[#666] font-normal">(133)</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 32 32">
                <path
                  fill="#4F4F4F"
                  d="M10.8571 26.2857C10.8571 27.2325 10.0896 28 9.14286 28H5.71429C4.76751 28 4 27.2325 4 26.2857V22C4 21.0532 4.76751 20.2857 5.71429 20.2857H9.14286C10.0896 20.2857 10.8571 21.0532 10.8571 22V26.2857Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div className="text-xs text-[#666]">Skill Level</div>
            </div>
            <div className="text-sm font-medium text-[#333] pl-6">
              Beg. & Int.
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 32 32">
                <path
                  fill="#4F4F4F"
                  d="M6.66667 7.66406C5.75228 7.66406 5 8.41635 5 9.33073V22.6641C5 23.1061 5.17559 23.53 5.48816 23.8426C5.80072 24.1551 6.22464 24.3307 6.66667 24.3307H13.3333C13.8856 24.3307 14.3333 24.7784 14.3333 25.3307C14.3333 25.883 13.8856 26.3307 13.3333 26.3307H6.66667C5.69421 26.3307 4.76157 25.9444 4.07394 25.2568C3.38631 24.5692 3 23.6365 3 22.6641V9.33073C3 7.31178 4.64772 5.66406 6.66667 5.66406H25.3333C26.3058 5.66406 27.2384 6.05037 27.9261 6.738C28.6137 7.42564 29 8.35827 29 9.33073V22.6651C28.9993 23.3081 28.8296 23.9396 28.5078 24.4963C28.186 25.053 27.7235 25.5153 27.1667 25.8368C26.6884 26.1129 26.0768 25.949 25.8006 25.4707C25.5245 24.9924 25.6884 24.3808 26.1667 24.1047C26.4198 23.9586 26.63 23.7484 26.7763 23.4954C26.9226 23.2424 26.9997 22.9553 27 22.663V9.33073C27 8.8887 26.8244 8.46478 26.5118 8.15222C26.1993 7.83966 25.7754 7.66406 25.3333 7.66406H6.66667Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div className="text-xs text-[#666]">Certificate</div>
            </div>
            <div className="flex items-center pl-6 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 32 32">
                <path
                  strokeWidth="2.13599"
                  stroke="#13C4CC"
                  d="M9.90625 16.5733L13.5982 20.4108L22.4576 12.1875"
                ></path>
              </svg>
              Included
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20">
                <path
                  fill="#4F4F4F"
                  d="M9.16659 3.25C9.14448 3.25 9.12329 3.25878 9.10766 3.27441C9.09203 3.29004 9.08325 3.31123 9.08325 3.33333V8.33333C9.08325 8.35543 9.09203 8.37663 9.10766 8.39226C9.12329 8.40789 9.14448 8.41667 9.16659 8.41667H14.9999C15.1988 8.41667 15.3896 8.49569 15.5302 8.63634L16.7499 9.85601V3.33333C16.7499 3.31123 16.7411 3.29003 16.7255 3.27441C16.7099 3.25878 16.6887 3.25 16.6666 3.25H9.16659Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
              <div className="text-xs text-[#666]">Community</div>
            </div>
            <div className="flex items-center pl-6 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 32 32">
                <path
                  strokeWidth="2.13599"
                  stroke="#13C4CC"
                  d="M9.90625 16.5733L13.5982 20.4108L22.4576 12.1875"
                ></path>
              </svg>
              Included
            </div>
          </div>
        </div>

        <div className="bg-[#EBFCF4] rounded-lg p-6 mb-8 relative">
          <div className="text-[#089E68] font-semibold mb-3 text-sm">About</div>
          <div
            className={`text-[#333] leading-6 text-sm mb-3 ${
              isDescriptionExpanded ? "" : "line-clamp-3"
            }`}
          >
            Welcome to our prestigious institution of higher learning, where
            academic excellence meets real-world opportunity. Founded in 1965,
            we`ve been at the forefront of innovative education for over half a
            century. Our campus combines state-of-the-art facilities with a rich
            tradition of academic achievement and cultural diversity. We offer a
            comprehensive range of undergraduate and graduate programs across
            various disciplines, from Business and Engineering to Arts and
            Sciences. Our dedicated faculty members are leading experts in their
            fields, committed to providing students with an engaging and
            challenging educational experience. With small class sizes and a
            student-to-faculty ratio of 15:1, we ensure personalized attention
            and meaningful interactions between students and professors. The
            campus spans 200 acres of beautiful grounds, featuring modern
            academic buildings, research centers, student housing, recreational
            facilities, and a vibrant student center. Our location in the heart
            of the city provides unique opportunities for internships, research
            collaborations, and career development.
          </div>
          <button
            className="text-[#089E68] font-medium flex items-center gap-1 cursor-pointer"
            onClick={toggleDescription}
          >
            {isDescriptionExpanded ? "Show less" : "Show more"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d={
                  isDescriptionExpanded ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"
                }
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="h-px bg-[#E5E5E5] my-8"></div>

        <div className="my-8">
          <h2 className="text-xl font-semibold mb-6 text-[#222]">
            Key Benefits
          </h2>
          <div className={`grid grid-cols-2 gap-4 mb-4`}>
            {pointsData.map((point, index) => (
              <div
                key={index}
                className={`bg-white border border-[#F0F0F0] rounded-lg p-4 flex items-center gap-3 transition-all duration-200 hover:border-[#0B6333] hover:shadow-sm ${
                  index >= 4 && !arePointsExpanded ? "hidden" : "flex"
                }`}
              >
                <div className="w-6 h-6 flex-shrink-0 text-[#0B6333]">
                  <svg
                    width="100%"
                    viewBox="0 0 16 16"
                    style={{ width: "24px", height: "24px" }}
                    strokeLinejoin="round"
                    height="100%"
                  >
                    <path
                      fill="currentColor"
                      d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM11.5303 6.53033L12.0607 6L11 4.93934L10.4697 5.46967L6.5 9.43934L5.53033 8.46967L5 7.93934L3.93934 9L4.46967 9.53033L5.96967 11.0303C6.26256 11.3232 6.73744 11.3232 7.03033 11.0303L11.5303 6.53033Z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-[#2C3E50] text-sm leading-tight tracking-tight">
                    {point}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="text-[#089E68] font-medium flex items-center justify-center gap-1 cursor-pointer mt-4 p-3 bg-[#F7F7F7] rounded-lg w-full transition-all duration-200 hover:bg-[#F0F0F0]"
            onClick={togglePoints}
          >
            {arePointsExpanded ? "Show less" : "Show more"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d={arePointsExpanded ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="bg-[#F8F9FA] rounded-xl p-6 my-8">
          <div className="flex gap-5">
            <div className="w-12 h-12 flex-shrink-0">
              <Image
                src="https://i.ibb.co/WndL8R6/AVATAR-laurentfa.png"
                alt="Steven O."
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="italic text-[#444] leading-6 mb-3 text-sm">
                It`s highly addictive to get core insights on personally
                relevant topics without repetition or triviality. Added to that
                the apps ability to suggest kindred interests opens up a
                foundation of knowledge.
              </div>
              <div className="font-semibold text-[#333] text-sm">Steven O.</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#222] mb-0">FAQ</h2>
          <div className="inline-flex bg-[#F0F0F0] p-1 rounded-lg">
            <button
              className={`py-2 px-4 rounded-md border-none text-sm font-medium transition-all duration-200 ${
                activeTab === "instructor"
                  ? "bg-white text-[#333] shadow-sm"
                  : "bg-transparent text-[#666]"
              }`}
              onClick={() => setActiveTab("instructor")}
            >
              Vendor
            </button>
            <button
              className={`py-2 px-4 rounded-md border-none text-sm font-medium transition-all duration-200 ${
                activeTab === "marketplace"
                  ? "bg-white text-[#333] shadow-sm"
                  : "bg-transparent text-[#666]"
              }`}
              onClick={() => setActiveTab("marketplace")}
            >
              Platform
            </button>
          </div>
        </div>

        <div className={activeTab === "instructor" ? "block" : "hidden"}>
          {faqData.instructor.map((item, index) => (
            <div key={index} className="mb-4">
              <div
                className="p-5 bg-[#F7F7F7] rounded-t-lg font-semibold flex justify-between items-center cursor-pointer text-[#333] text-sm transition-all duration-200 hover:bg-[#F0F0F0]"
                onClick={() => toggleFaqItem(index)}
              >
                {item.question}
                <svg
                  className={`transition-transform duration-300 ${
                    activeFaqItem === index ? "rotate-180" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className={`bg-[#F7F7F7] rounded-b-lg text-[#666] leading-6 text-sm transition-all duration-300 ${
                  activeFaqItem === index
                    ? "max-h-48 p-5 visible opacity-100"
                    : "max-h-0 px-5 invisible opacity-0"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        <div className={activeTab === "marketplace" ? "block" : "hidden"}>
          {faqData.marketplace.map((item, index) => (
            <div key={index} className="mb-4">
              <div
                className="p-5 bg-[#F7F7F7] rounded-t-lg font-semibold flex justify-between items-center cursor-pointer text-[#333] text-sm transition-all duration-200 hover:bg-[#F0F0F0]"
                onClick={() => toggleFaqItem(index)}
              >
                {item.question}
                <svg
                  className={`transition-transform duration-300 ${
                    activeFaqItem === index ? "rotate-180" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                className={`bg-[#F7F7F7] rounded-b-lg text-[#666] leading-6 text-sm transition-all duration-300 ${
                  activeFaqItem === index
                    ? "max-h-48 p-5 visible opacity-100"
                    : "max-h-0 px-5 invisible opacity-0"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </CardWrapper>
    </>
  );
}
