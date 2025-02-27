"use client";

import {
  FC,
  useState,
  useLayoutEffect,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { Icon, IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSidebar } from "@/store/use-sidebar";
import { usePathname } from "next/navigation";

interface ActionButton {
  label: string;
  icon: IconName;
  count?: number;
  tabId: string;
}

const actionButtons: ActionButton[] = [
  { label: "Sources", icon: "book", count: 2, tabId: "sources" },
  { label: "Big Ideas", icon: "lightbulb", count: 3, tabId: "bigIdeas" },
  { label: "Q&A", icon: "question-chat", count: 5, tabId: "qa" },
  { label: "Summary", icon: "pen", tabId: "summary" },
  { label: "Related", icon: "link", count: 12, tabId: "related" },
];

interface Tab {
  id: string;
  label: string;
  icon: IconName;
}

const tabs: Tab[] = [
  { id: "sources", label: "Sources", icon: "comments" },
  { id: "bigIdeas", label: "Big Ideas", icon: "lightbulb" },
  { id: "qa", label: "Q&A", icon: "question" },
  { id: "summary", label: "Summary", icon: "pen" },
  { id: "related", label: "Related", icon: "grid" },
];

interface SourceSubItem {
  id: number;
  title: string;
  description: string;
}

interface Source {
  id: number;
  title: string;
  description: string;
  source: string;
  sourceLogo: string;
  rating: number;
  subItems?: SourceSubItem[];
}

const mockSources: Source[] = [
  {
    id: 1,
    title: "Multiple Halo games are in development using Unreal Engine 5",
    description:
      "TikTok, the popular video-sharing platform owned by ByteDance, is making a significant shift in its content moderation strategy by laying off hundreds of human moderators and increasing its reliance on artificial intelligence (AI) for content review.",
    source: "BT",
    sourceLogo: "/images/bt-logo.png",
    rating: 5,
    subItems: [
      {
        id: 1,
        title: "AI's Role in Content Moderation",
        description:
          "Experts suggest that AI-driven content moderation could lead to more consistent enforcement of platform policies.",
      },
      {
        id: 2,
        title: "Impact on Human Moderators",
        description:
          "The shift towards AI moderation raises concerns about job security for human content moderators.",
      },
    ],
  },
  {
    id: 2,
    title:
      "Rebrands as Halo Studios, working on multiple Unreal Engine 5 games",
    description:
      "Microsoft's gaming division has confirmed that the newly rebranded Halo Studios is actively developing several games using Unreal Engine 5, marking a new chapter in the Halo saga.",
    source: "CNBC",
    sourceLogo: "/images/cnbc-logo.png",
    rating: 5,
    subItems: [
      {
        id: 1,
        title: "Studio Rebranding Strategy",
        description:
          "The rebranding to Halo Studios signals a new direction and expanded scope for the development team.",
      },
      {
        id: 2,
        title: "Unreal Engine 5 Benefits",
        description:
          "The adoption of Unreal Engine 5 brings advanced graphics capabilities and improved development tools to the Halo franchise.",
      },
      {
        id: 3,
        title: "Multiple Projects Scope",
        description:
          "The studio is simultaneously working on several games, suggesting a broader expansion of the Halo universe.",
      },
    ],
  },
];

// Mock data for Big Ideas
interface BigIdea {
  id: number;
  title: string;
  content: string;
  timestamp: string;
  hasHighlight?: boolean;
  likes?: number;
}

const mockBigIdeas: BigIdea[] = [
  {
    id: 1,
    title: "My first private note with highlight",
    content:
      "The beauty comes from connecting principles for high conversion rates with world-class design.",
    timestamp: "Yesterday",
    hasHighlight: true,
    likes: 15,
  },
  {
    id: 2,
    title: "My first private note without highlight",
    content:
      "The beauty comes from connecting principles for high conversion rates with world-class design.",
    timestamp: "15 days ago",
    likes: 15,
  },
  {
    id: 3,
    title: "My first private note with highlight",
    content:
      "The beauty comes from connecting principles for high conversion rates with world-class design.",
    timestamp: "18 min ago",
    hasHighlight: true,
    likes: 15,
  },
];

// Mock data for Q&A
interface QA {
  id: number;
  question: string;
  answer?: string;
  votes?: number;
  isExpanded?: boolean;
}

const mockQA: QA[] = [
  {
    id: 1,
    question: "What is the main idea behind quantum computing?",
    answer:
      "Quantum computing harnesses the principles of quantum mechanics to process information in ways that classical computers cannot, potentially solving complex problems exponentially faster.",
    votes: 116,
  },
  {
    id: 2,
    question: "How does machine learning differ from traditional programming?",
    answer:
      "Machine learning enables computers to learn from data and improve their performance without being explicitly programmed. Unlike traditional programming where rules are manually coded, ML algorithms automatically discover patterns and make decisions based on examples.",
    votes: 89,
  },
  {
    id: 3,
    question: "What are the key principles of responsive web design?",
    answer:
      "Responsive web design is built on three core principles: fluid grids that use relative units, flexible images that scale within their containers, and media queries that allow designs to adapt to different viewport sizes. This ensures websites provide optimal viewing experience across various devices.",
    votes: 73,
  },
];

// Mock data for Summary
interface Summary {
  id: number;
  content: string;
  type: "key_point" | "conclusion" | "overview";
}

const mockSummary: Summary[] = [
  {
    id: 1,
    content:
      "TikTok is transitioning from human moderators to AI-based content moderation systems.",
    type: "key_point",
  },
  {
    id: 2,
    content:
      "The shift raises concerns about job security and content quality control.",
    type: "key_point",
  },
  {
    id: 3,
    content:
      "AI moderation promises more consistent policy enforcement but faces challenges with context understanding.",
    type: "conclusion",
  },
];

// Mock data for Related
interface Related {
  id: number;
  title: string;
  relevance: number;
  source: string;
}

const mockRelated: Related[] = [
  {
    id: 1,
    title: "Facebook`s AI Moderation Challenges",
    relevance: 95,
    source: "Tech Review",
  },
  {
    id: 2,
    title: "The Future of Content Moderation",
    relevance: 88,
    source: "Digital Trends",
  },
];

export const RightSidebar: FC = () => {
  const {
    isCollapsed,
    isExpanded,
    activeTab,
    setIsCollapsed,
    setIsExpanded,
    setActiveTab,
  } = useSidebar();
  const [mounted, setMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [expandedSources, setExpandedSources] = useState<number[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const activeTabRef = useRef<HTMLButtonElement>(null);
  const [expandedQuestions, setExpandedQuestions] = useState<number[]>([1]);
  const pathname = usePathname();

  useLayoutEffect(() => {
    setMounted(true);
    setWindowWidth(window.innerWidth);
  }, []);

  useLayoutEffect(() => {
    localStorage.setItem("rightSidebarExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const toggleSource = (sourceId: number) => {
    setExpandedSources((prev) =>
      prev.includes(sourceId)
        ? prev.filter((id) => id !== sourceId)
        : [...prev, sourceId]
    );
  };

  const checkScroll = useCallback(() => {
    if (tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const hasHorizontalScroll = container.scrollWidth > container.clientWidth;
      const maxScroll = container.scrollWidth - container.clientWidth;

      setCanScrollLeft(hasHorizontalScroll && container.scrollLeft > 1);
      setCanScrollRight(
        hasHorizontalScroll && container.scrollLeft < maxScroll - 1
      );

      if (isExpanded && container.scrollWidth <= container.clientWidth) {
        setCanScrollRight(false);
      }
    }
  }, [isExpanded]);

  useEffect(() => {
    if (!tabsContainerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      checkScroll();
    });

    resizeObserver.observe(tabsContainerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [checkScroll]);

  useEffect(() => {
    if (!isCollapsed) {
      const timers = [
        setTimeout(checkScroll, 50),
        setTimeout(checkScroll, 150),
        setTimeout(checkScroll, 300),
      ];

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [isCollapsed, isExpanded, checkScroll]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(checkScroll);
    };

    tabsContainerRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      tabsContainerRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, [checkScroll]);

  useEffect(() => {
    if (isCollapsed && tabsContainerRef.current) {
      tabsContainerRef.current.scrollTo({
        left: 0,
        behavior: "instant",
      });
      setScrollPosition(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, [isCollapsed]);

  const scrollTabs = (direction: "left" | "right") => {
    if (tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const scrollAmount = 200;
      const newPosition =
        direction === "left"
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(
              container.scrollWidth - container.clientWidth,
              scrollPosition + scrollAmount
            );

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
      checkScroll();
    }
  };

  const handleActionButtonClick = (tabId: string) => {
    if (isCollapsed) {
      if (tabsContainerRef.current) {
        tabsContainerRef.current.scrollTo({
          left: 0,
          behavior: "instant",
        });
        setScrollPosition(0);
        setCanScrollLeft(false);
      }
      setIsCollapsed(false);
      setActiveTab(tabId);
    }
  };

  const scrollToActiveTab = useCallback(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const tab = activeTabRef.current;

      const containerLeft = container.scrollLeft;
      const containerRight = containerLeft + container.clientWidth;
      const tabLeft = tab.offsetLeft;
      const tabRight = tabLeft + tab.clientWidth;

      if (tabLeft < containerLeft || tabRight > containerRight) {
        const scrollPosition =
          tabLeft - (container.clientWidth - tab.clientWidth) / 2;
        container.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
        setScrollPosition(scrollPosition);
        checkScroll();
      }
    }
  }, [checkScroll]);

  useEffect(() => {
    if (!isCollapsed) {
      setTimeout(scrollToActiveTab, 300);
    }
  }, [activeTab, isCollapsed, scrollToActiveTab]);

  const toggleQuestion = (questionId: number) => {
    setExpandedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  if (!mounted) {
    return null;
  }

  if (!pathname.includes("/player")) {
    return null;
  }

  return (
    <>
      {((windowWidth < 1200 && !isCollapsed && isExpanded) ||
        (windowWidth < 1000 && !isCollapsed)) && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() =>
            windowWidth < 1000 ? setIsCollapsed(true) : setIsExpanded(false)
          }
        />
      )}

      <aside
        className={cn(
          "h-screen bg-white border-l border-border",
          "transition-all duration-300 ease-in-out",
          "fixed top-0 right-0 z-50 md:sticky md:top-0 md:right-0",
          isCollapsed ? "w-16" : isExpanded ? "w-[520px]" : "w-80",
          windowWidth < 768 && !isCollapsed && "w-full",
          windowWidth < 768 && isCollapsed && "translate-x-full",
          windowWidth >= 768 && "transform-none"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          {isCollapsed ? (
            <div className="h-16 flex items-center justify-center border-b border-border">
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Expand sidebar"
              >
                <Icon
                  name="expand"
                  size="sm"
                  className="text-gray-500 rotate-180"
                />
              </button>
            </div>
          ) : (
            <div className="h-16 flex items-center justify-between px-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Icon name="puzzle" size="sm" className="text-gray-500" />
                <span className="font-medium">Sources</span>
              </div>
              <div className="flex items-center gap-2">
                {windowWidth >= 768 && (
                  <>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label="More options"
                    >
                      <Icon name="more" size="sm" className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      aria-label={
                        isExpanded ? "Collapse width" : "Expand width"
                      }
                    >
                      <Icon
                        name={isExpanded ? "contract" : "square-expand"}
                        size="sm"
                        className="text-gray-500"
                      />
                    </button>
                  </>
                )}
                <button
                  onClick={() => setIsCollapsed(true)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Collapse sidebar"
                >
                  <Icon
                    name={windowWidth < 768 ? "x" : "x"}
                    size="sm"
                    className="text-gray-500"
                  />
                </button>
              </div>
            </div>
          )}

          {!isCollapsed && (
            <>
              {/* Tabs with scroll buttons */}
              <div className="border-b border-border relative">
                <div className="flex items-center">
                  {canScrollLeft && (
                    <button
                      onClick={() => scrollTabs("left")}
                      className="absolute left-2 z-10 w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      aria-label="Scroll left"
                    >
                      <Icon
                        name="chevron-left"
                        size="sm"
                        className="text-gray-500"
                      />
                    </button>
                  )}

                  <div
                    ref={tabsContainerRef}
                    className="flex gap-1 p-2 overflow-x-auto scroll-smooth scrollbar-hide"
                    onScroll={checkScroll}
                  >
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        ref={tab.id === activeTab ? activeTabRef : null}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full text-sm font-medium whitespace-nowrap",
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        )}
                      >
                        <Icon name={tab.icon} size="sm" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {canScrollRight && (
                    <button
                      onClick={() => scrollTabs("right")}
                      className="absolute right-2 z-10 w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                      aria-label="Scroll right"
                    >
                      <Icon
                        name="chevron-right"
                        size="sm"
                        className="text-gray-500"
                      />
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === "sources" && (
                  <div className="p-4 space-y-4">
                    {mockSources.map((source) => (
                      <div key={source.id} className="relative ml-3">
                        {/* Source number badge */}
                        <span className="absolute -left-3 top-4 flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                          {source.id}
                        </span>

                        <div className="rounded-lg border border-border overflow-hidden bg-sky-50/50">
                          <div className="p-4 pl-3">
                            <div className="flex items-start">
                              <div className="flex-1">
                                <h3 className="text-sm font-medium">
                                  {source.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {source.description}
                                </p>
                                <div className="flex items-center justify-between gap-2 mt-2">
                                  <div className="flex items-center gap-1">
                                    <div className="w-4 h-4 rounded-full bg-white overflow-hidden flex items-center justify-center">
                                      <Image
                                        src={source.sourceLogo}
                                        alt={source.source}
                                        width={16}
                                        height={16}
                                        className="object-contain"
                                      />
                                    </div>
                                    <span className="text-xs text-gray-500">
                                      {source.source}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <span
                                        key={i}
                                        className="w-4 h-4 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs"
                                      >
                                        {i + 1}
                                      </span>
                                    ))}
                                  </div>
                                  <button
                                    onClick={() => toggleSource(source.id)}
                                    className="p-1 rounded-lg hover:bg-blue-100/50 transition-colors"
                                    aria-label={
                                      expandedSources.includes(source.id)
                                        ? "Collapse"
                                        : "Expand"
                                    }
                                  >
                                    <Icon
                                      name="chevron-down"
                                      size="sm"
                                      className={cn(
                                        "text-gray-400 transition-transform",
                                        expandedSources.includes(source.id) &&
                                          "transform rotate-180"
                                      )}
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Content with animation */}
                          <div
                            className={cn(
                              "transition-all duration-[350ms] ease-in-out",
                              "border-t border-border bg-white",
                              expandedSources.includes(source.id)
                                ? "max-h-[500px] opacity-100"
                                : "max-h-0 opacity-0 overflow-hidden"
                            )}
                          >
                            <div className="space-y-4 p-4 bg-sky-50/50">
                              {source.subItems?.map((item, index) => (
                                <div key={index} className="relative pl-6">
                                  <span className="absolute left-0 top-0 mt-[2px] flex-shrink-0 w-4 h-4 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs">
                                    {index + 1}
                                  </span>
                                  <h4 className="text-sm font-medium">
                                    {item.title}
                                  </h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {item.description}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "bigIdeas" && (
                  <div className="flex flex-col gap-4 p-4">
                    {mockBigIdeas.map((idea) => (
                      <div
                        key={idea.id}
                        className="flex flex-col bg-gray-50 rounded-xl p-3"
                      >
                        <div className="flex flex-col gap-2 min-w-0 ml-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                                <Image
                                  src="/images/avatar.png"
                                  alt="User avatar"
                                  width={24}
                                  height={24}
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-sm font-medium">You</span>
                              <span className="text-sm text-gray-500">
                                {idea.timestamp}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-xs text-gray-400">
                                EDIT
                              </button>
                              <button className="text-xs text-gray-400">
                                DELETE
                              </button>
                            </div>
                          </div>

                          <p className="text-sm text-gray-700 mt-0.5">
                            {idea.title}
                          </p>

                          {idea.hasHighlight ? (
                            <div className="mt-1 relative">
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500" />
                              <div className="pl-3 py-2 bg-blue-50/50">
                                <p className="text-sm text-gray-800 italic">
                                  {idea.content}
                                </p>
                                <div className="flex justify-end mt-1">
                                  <div className="flex items-center gap-1 bg-gray-100/80 rounded-full px-2 py-0.5">
                                    <Icon
                                      name="pen"
                                      size="xs"
                                      className="text-gray-400"
                                    />
                                    <span className="text-xs text-gray-400">
                                      0:{idea.likes}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-1">
                              <p className="text-sm text-gray-800">
                                {idea.content}
                              </p>
                              <div className="flex justify-end mt-1">
                                <div className="flex items-center gap-1 bg-gray-100/80 rounded-full px-2 py-0.5">
                                  <Icon
                                    name="pen"
                                    size="xs"
                                    className="text-gray-400"
                                  />
                                  <span className="text-xs text-gray-400">
                                    0:{idea.likes}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "qa" && (
                  <div className="flex flex-col gap-2 p-4">
                    {mockQA.map((qa) => (
                      <div
                        key={qa.id}
                        className="flex flex-col bg-gray-50 rounded-xl"
                      >
                        <div className="flex gap-3 p-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                            <Icon
                              name="question-chat"
                              size="sm"
                              className="text-blue-500"
                            />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-gray-700 text-sm font-medium flex-1">
                                {qa.question}
                              </h3>
                              <button
                                onClick={() => toggleQuestion(qa.id)}
                                className="flex-shrink-0 mt-0.5"
                              >
                                <Icon
                                  name={
                                    expandedQuestions.includes(qa.id)
                                      ? "minus"
                                      : "plus"
                                  }
                                  size="sm"
                                  className="text-gray-400"
                                />
                              </button>
                            </div>

                            {/* Animated dropdown */}
                            <div
                              className={cn(
                                "transition-all duration-[350ms] ease-in-out",
                                expandedQuestions.includes(qa.id)
                                  ? "max-h-[500px] opacity-100"
                                  : "max-h-0 opacity-0 overflow-hidden"
                              )}
                            >
                              {qa.answer && (
                                <div className="mt-2">
                                  <p className="text-sm text-gray-600">
                                    {qa.answer}
                                  </p>
                                  {qa.votes && (
                                    <div className="flex justify-end mt-2">
                                      <div className="flex items-center gap-1 bg-white rounded-full px-3 py-1">
                                        <button className="hover:bg-gray-100 rounded p-0.5 transition-colors">
                                          <Icon
                                            name="arrow-up"
                                            size="sm"
                                            className="text-gray-400"
                                          />
                                        </button>
                                        <span className="text-sm text-gray-500 min-w-[2ch] text-center">
                                          {qa.votes}
                                        </span>
                                        <button className="hover:bg-gray-100 rounded p-0.5 transition-colors">
                                          <Icon
                                            name="arrow-down"
                                            size="sm"
                                            className="text-gray-400"
                                          />
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "summary" && (
                  <div className="p-4 space-y-4">
                    {mockSummary.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "rounded-lg border border-border p-4",
                          item.type === "conclusion" && "bg-blue-50/50"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={cn(
                              "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center",
                              item.type === "key_point"
                                ? "bg-green-100 text-green-600"
                                : item.type === "conclusion"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                            )}
                          >
                            {item.id}
                          </span>
                          <p className="flex-1 text-sm text-gray-600">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "related" && (
                  <div className="p-4 space-y-4">
                    {mockRelated.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border border-border p-4"
                      >
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                            {item.id}
                          </span>
                          <div className="flex-1">
                            <h3 className="text-sm font-medium">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">
                                {item.source}
                              </span>
                              <div className="flex items-center gap-1">
                                <Icon
                                  name="star"
                                  size="xs"
                                  className="text-yellow-400"
                                />
                                <span className="text-xs text-gray-600">
                                  {item.relevance}% relevant
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {isCollapsed && (
            <div className="flex flex-col gap-1 p-4">
              {actionButtons.map((button) => (
                <button
                  key={button.label}
                  onClick={() => handleActionButtonClick(button.tabId)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-gray-600 rounded-lg transition-colors relative",
                    "hover:bg-[var(--menu-hover)]",
                    "justify-center"
                  )}
                >
                  <Icon
                    name={button.icon}
                    size="md"
                    className={cn(
                      "shrink-0",
                      activeTab === button.tabId
                        ? "text-blue-500"
                        : "text-gray-500"
                    )}
                  />
                  {button.count !== undefined && (
                    <span className="absolute -top-0.5 -right-[5px] bg-gray-100 text-gray-600 text-xs font-medium px-1.5 rounded-full">
                      {button.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
