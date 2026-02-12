import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Section } from "./Section";
import { Header } from "./Header";
import { ChecklistMobile } from "./ChecklistMobile";
import { ChecklistItemProps } from "./types";
import { Icon } from "./Icon";

const sections: { title: string; items: ChecklistItemProps[] }[] = [
  {
    title: "General Options",
    items: [
      {
        icon: "announcement",
        title: "Announcements",
        button: { type: "add", label: "Add Announcement" },
        description:
          "Share important updates, events, or announcements tailored to your audience directly on your listing page. Create your first announcement now.",
      },
      {
        icon: "issue",
        title: "Announcement Issues",
        button: { type: "fix", label: "Fix Announcements" },
        issues: [
          {
            title: "Spring Sale Promotion",
            missing: ["End Date: Not specified", "Call to Action: Missing"],
          },
          {
            title: "New Feature Launch",
            missing: ["Description: Too short", "Featured Image: Missing"],
          },
        ],
      },
      {
        icon: "about",
        title: "About",
        button: { type: "add", label: "Add About Section" },
        description:
          "Tell your story and showcase what makes your business unique. The About section helps visitors understand your mission, values, and story.",
      },
      {
        icon: "faq",
        title: "FAQ",
        button: { type: "add", label: "Create FAQ" },
        description:
          "Share key information, clarify policies, and address common questions with ease. Create your FAQ now to help visitors quickly find answers to their questions.",
      },
      {
        icon: "bullet",
        title: "Bullet Points",
        button: { type: "add", label: "Add Bullet Points" },
        description:
          "Display key highlights directly on your listing page and help prospective customers quickly understand what sets you apart. Bullet points are an effective way to communicate your value proposition at a glance.",
      },
      {
        icon: "video",
        title: "Video Promo",
        button: { type: "add", label: "Add Promo Video" },
        description:
          "Feature a promotional video directly on your listing page, delivering a compelling visual overview of your brand. Videos can significantly increase engagement and help visitors connect with your business.",
      },
      {
        icon: "gallery",
        title: "Gallery",
        button: { type: "add", label: "Add Gallery" },
        description:
          "Make your listing more engaging and visually appealing by showcasing images directly on your listing page. A gallery allows visitors to see your products, services, or work in action.",
      },
      {
        icon: "event",
        title: "Events",
        button: { type: "add", label: "Add Events" },
        description:
          "Showcase upcoming events, workshops, or special promotions directly on your listing page. Events can increase engagement and drive more traffic to your business.",
      },
      {
        icon: "issue",
        title: "Event Issues",
        button: { type: "fix", label: "Fix Events" },
        issues: [
          {
            title: "Summer Workshop Series",
            missing: [
              "Location: Missing",
              "Registration Link: Not provided",
              "Capacity: Not specified",
            ],
          },
          {
            title: "Product Launch Webinar",
            missing: [
              "Duration: Not specified",
              "Host Information: Incomplete",
            ],
          },
          {
            title: "Annual Customer Appreciation Day",
            missing: [
              "Start Time: Missing",
              "End Time: Missing",
              "Featured Image: Not uploaded",
            ],
          },
        ],
      },
      {
        icon: "link",
        title: "Links",
        button: { type: "add", label: "Add Links" },
        description:
          "Add important links to your listing page such as your website, social media profiles, or additional resources. Links help visitors connect with you across different platforms.",
      },
    ],
  },
  {
    title: "Reviews Options",
    items: [
      {
        icon: "reply",
        title: "Reply to Reviews",
        button: { type: "add", label: "Respond to Reviews" },
        description:
          "Engage with your customers by responding to their reviews. Showing that you value feedback builds trust and demonstrates your commitment to customer satisfaction.",
      },
      {
        icon: "star",
        title: "Featured Review",
        button: { type: "add", label: "Select Featured Review" },
        description:
          "Highlight your best customer reviews by selecting a featured review to display prominently on your listing page. Featured reviews can help potential customers make purchasing decisions.",
      },
    ],
  },
  {
    title: "Spotlight Options",
    items: [
      {
        icon: "spotlight",
        title: "Spotlight",
        button: { type: "add", label: "Add Spotlight" },
        description:
          "Highlight specific projects, achievements, or notable work with a spotlight section. This feature allows you to showcase your best work and attract more attention to your listing.",
      },
      {
        icon: "issue",
        title: "Spotlight Issues",
        button: { type: "fix", label: "Fix Spotlight" },
        issues: [
          {
            title: "Website Redesign Project",
            missing: [
              "Author Image: Missing",
              "Project Title: Too short",
              "Contact Information: Not provided",
            ],
          },
          {
            title: "Client Success Story",
            missing: [
              "Author Name: Missing",
              "Project Description: Incomplete",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Case Studies Options",
    items: [
      {
        icon: "case",
        title: "Case Studies",
        button: { type: "add", label: "Add Case Study" },
        description:
          "Share detailed success stories and demonstrate your expertise with case studies. Case studies provide proof of your capabilities and help potential clients understand how you can solve their problems.",
      },
      {
        icon: "issue",
        title: "Case Study Issues",
        button: { type: "fix", label: "Fix Case Studies" },
        issues: [
          {
            title: "Enterprise Software Implementation",
            missing: [
              "Challenge Section: Incomplete",
              "Results/Metrics: Missing",
              "Client Testimonial: Not provided",
            ],
          },
          {
            title: "Marketing Campaign ROI",
            missing: [
              "Timeline: Not specified",
              "Featured Image: Missing",
              "Solution Description: Too short",
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Forms Options",
    items: [
      {
        icon: "form",
        title: "Forms",
        button: { type: "add", label: "Add Forms" },
        description:
          "Collect information, generate leads, and engage visitors with interactive forms. Forms can be used for contact requests, event registrations, surveys, and more.",
      },
    ],
  },
  {
    title: "Offers Options",
    items: [
      {
        icon: "offer",
        title: "Offers",
        button: { type: "add", label: "Add Offers" },
        description:
          "Promote special deals, discounts, or exclusive offers directly on your listing page. Limited-time offers can increase conversion rates and drive immediate action from visitors.",
      },
    ],
  },
  {
    title: "Embeds Options",
    items: [
      {
        icon: "embed",
        title: "Embeds",
        button: { type: "add", label: "Add Embeds" },
        description:
          "Enhance your listing with embedded content such as calendars, maps, social media feeds, or other interactive elements. Embeds can provide additional information and functionality to your visitors.",
      },
    ],
  },
];

export const CheckListSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [showIncomplete, setShowIncomplete] = useState(true);
  const [showIssues, setShowIssues] = useState(true);
  const [expandMode, setExpandMode] = useState<
    "all" | "incomplete" | "issues" | "completed" | null
  >(null);
  const [items, setItems] = useState(sections);
  const [processingItem, setProcessingItem] = useState<string | null>(null);
  const [isExpandMenuOpen, setIsExpandMenuOpen] = useState(false);

  const toggleSection = (title: string) => {
    setExpandedSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const toggleItem = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleExpand = (
    mode: "all" | "incomplete" | "issues" | "completed"
  ) => {
    if (expandMode === mode) {
      setExpandedSections([]);
      setExpandedItems([]);
      setExpandMode(null);
      return;
    }

    setExpandMode(mode);

    if (mode === "all") {
      setExpandedSections(items.map((s) => s.title));
      setExpandedItems(items.flatMap((s) => s.items.map((i) => i.title)));
      return;
    }

    if (mode === "incomplete") {
      const incompleteSections = items.filter((s) =>
        s.items.some((i) => i.button?.type === "add" && i.status !== "completed")
      );
      setExpandedSections(incompleteSections.map((s) => s.title));
      setExpandedItems(
        incompleteSections.flatMap((s) =>
          s.items
            .filter((i) => i.button?.type === "add" && i.status !== "completed")
            .map((i) => i.title)
        )
      );
      return;
    }

    if (mode === "issues") {
      const issueSections = items.filter((s) =>
        s.items.some((i) => i.button?.type === "fix" && i.status !== "completed")
      );
      setExpandedSections(issueSections.map((s) => s.title));
      setExpandedItems(
        issueSections.flatMap((s) =>
          s.items
            .filter((i) => i.button?.type === "fix" && i.status !== "completed")
            .map((i) => i.title)
        )
      );
      return;
    }

    const completedSections = items.filter((s) =>
      s.items.some((i) => i.status === "completed")
    );
    setExpandedSections(completedSections.map((s) => s.title));
    setExpandedItems(
      completedSections.flatMap((s) =>
        s.items.filter((i) => i.status === "completed").map((i) => i.title)
      )
    );
  };

  const completeItem = async (sectionTitle: string, itemTitle: string) => {
    setItems((prev) =>
      prev.map((section) =>
        section.title === sectionTitle
          ? {
              ...section,
              items: section.items.map((item) =>
                item.title === itemTitle
                  ? {
                      ...item,
                      status: "completed" as const,
                      button: undefined,
                      description: getCompletionMessage(
                        item.title,
                        item.button?.type || "add"
                      ),
                    }
                  : item
              ),
            }
          : section
      )
    );
  };

  const getCompletionMessage = (title: string, action: "add" | "fix") => {
    const completionMessages: { [key: string]: string } = {
      Announcements:
        "Your announcements have been successfully added to your listing page.",
      "Announcement Issues":
        "All announcement issues have been successfully resolved.",
      About:
        "Your About section has been successfully added to your listing page.",
      FAQ: "Your FAQ section has been successfully added to your listing page.",
      "Bullet Points":
        "Your bullet points have been successfully added to your listing page.",
      "Video Promo":
        "Your promotional video has been successfully added to your listing page.",
      Gallery: "Your gallery has been successfully added to your listing page.",
      Events: "Your events have been successfully added to your listing page.",
      "Event Issues": "All event issues have been successfully resolved.",
      Links: "Your links have been successfully added to your listing page.",
      "Reply to Reviews":
        "You have successfully responded to all customer reviews.",
      "Featured Review":
        "You have successfully selected a featured review for your listing page.",
      Spotlight:
        "Your spotlight section has been successfully added to your listing page.",
      "Spotlight Issues":
        "All spotlight issues have been successfully resolved.",
      "Case Studies":
        "Your case studies have been successfully added to your listing page.",
      "Case Study Issues":
        "All case study issues have been successfully resolved.",
      Forms: "Your forms have been successfully added to your listing page.",
      Offers: "Your offers have been successfully added to your listing page.",
      Embeds: "Your embeds have been successfully added to your listing page.",
    };
    return (
      completionMessages[title] ||
      `${title} has been ${action === "add" ? "added" : "fixed"} successfully.`
    );
  };

  const getVisibleItems = (sectionItems: ChecklistItemProps[]) => {
    return sectionItems.filter((item) => {
      const isOption = item.button?.type === "add";
      const isIssue = item.button?.type === "fix";
      const isCompleted = item.status === "completed";
      if (isCompleted) return true;
      if (!showIncomplete && !showIssues) return true;
      if (showIncomplete && showIssues) return isOption || isIssue;
      if (showIncomplete) return isOption;
      if (showIssues) return isIssue;
      return true;
    });
  };

  useEffect(() => {
    if (!isMobile) return;
    setShowIncomplete(false);
    setShowIssues(false);
  }, [isMobile]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const expandParam = urlParams.get("expand");
    const optionsParam = urlParams.get("options");
    const issuesParam = urlParams.get("issues");

    if (expandParam) {
      handleExpand(
        expandParam as "all" | "incomplete" | "issues" | "completed"
      );
    }

    if (optionsParam !== null) setShowIncomplete(optionsParam === "true");
    if (issuesParam !== null) setShowIssues(issuesParam === "true");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (expandMode) params.set("expand", expandMode);
    params.set("options", showIncomplete.toString());
    params.set("issues", showIssues.toString());
    const newURL = `${window.location.pathname}?${params.toString()}`;
    history.replaceState(null, "", newURL);
  }, [expandMode, showIncomplete, showIssues]);

  const renderStatusBadge = (sectionItems: ChecklistItemProps[]) => {
    const incomplete = sectionItems.filter((item) => item.button?.type === "add").length;
    const issues = sectionItems.filter((item) => item.button?.type === "fix").length;
    const unresolved = incomplete + issues;

    if (unresolved === 0) {
      return (
        <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-xl bg-[#d1fae5] px-2 py-[3px] text-[11px] font-medium text-[#089E68]">
          <svg width="10" height="10" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 0a10 10 0 110 20 10 10 0 010-20zm3.77 7.23l-4.95 4.95-2.59-2.59L4.77 11l3.18 3.18 5.59-5.59-1.77-1.36z" />
          </svg>
          All done
        </div>
      );
    }

    if (issues === 0) {
      return (
        <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-xl bg-[#ebf5ff] px-2 py-[3px] text-[11px] font-medium text-[#1d77bd]">
          <svg viewBox="0 0 448 512" width="10" height="10" fill="currentColor">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
          </svg>
          {incomplete} incomplete
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-1 whitespace-nowrap rounded-xl bg-[#fee2e2] px-2 py-[3px] text-[11px] font-medium text-[#ef4444]">
        <svg viewBox="0 0 15 15" width="10" height="10" fill="currentColor">
          <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" />
        </svg>
        {issues > 0 && incomplete > 0
          ? `${incomplete} inc, ${issues} iss`
          : `${issues} issues`}
      </div>
    );
  };

  if (isMobile) {
    return (
      <section className="school-edit-checklist">
        <div className="checklist-mobile-wrapper max-md:block hidden">
          <ChecklistMobile
            items={items}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            expandedItems={expandedItems}
            toggleItem={toggleItem}
            showIncomplete={showIncomplete}
            setShowIncomplete={setShowIncomplete}
            showIssues={showIssues}
            setShowIssues={setShowIssues}
            expandMode={expandMode}
            handleExpand={handleExpand}
            completeItem={completeItem}
            getVisibleItems={getVisibleItems}
            processingItem={processingItem}
            setProcessingItem={setProcessingItem}
            isExpandMenuOpen={isExpandMenuOpen}
            setIsExpandMenuOpen={setIsExpandMenuOpen}
          />
        </div>
      </section>
    );
  }

  return (
    <section className="school-edit-checklist">
      <div className="container">
        <div className="listing-content">
          <Header
            showIncomplete={showIncomplete}
            setShowIncomplete={setShowIncomplete}
            showIssues={showIssues}
            setShowIssues={setShowIssues}
            expandMode={expandMode}
            handleExpand={handleExpand}
            items={items}
          />

          {items.map((section) => {
            const visibleItems = getVisibleItems(section.items);
            if (visibleItems.length === 0) return null;

            return (
              <Section
                key={section.title}
                title={section.title}
                items={section.items}
                isExpanded={expandedSections.includes(section.title)}
                toggleSection={toggleSection}
                expandedItems={expandedItems}
                toggleItem={toggleItem}
                completeItem={completeItem}
                showIncomplete={showIncomplete}
                showIssues={showIssues}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
