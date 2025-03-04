import { useEffect, useRef, useState } from "react";
import { SIDE_TABS } from "./side-tabs.constant";

export const useTabsObserver = () => {
  const [activeTab, setActiveTab] = useState(SIDE_TABS.MONTHLY_UPDATE);
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    const sections = [
      {
        id: SIDE_TABS.MONTHLY_UPDATE,
        element: document.getElementById(SIDE_TABS.MONTHLY_UPDATE),
      },
      {
        id: SIDE_TABS.REPORT_CARD,
        element: document.getElementById(SIDE_TABS.REPORT_CARD),
      },
      {
        id: SIDE_TABS.ABOUT,
        element: document.getElementById(SIDE_TABS.ABOUT),
      },
      {
        id: SIDE_TABS.RANKINGS,
        element: document.getElementById(SIDE_TABS.RANKINGS),
      },
      {
        id: SIDE_TABS.ADMISSIONS,
        element: document.getElementById(SIDE_TABS.ADMISSIONS),
      },
      {
        id: SIDE_TABS.SCATTER_PLOT,
        element: document.getElementById(SIDE_TABS.SCATTER_PLOT),
      },
      {
        id: SIDE_TABS.OVERVIEW,
        element: document.getElementById(SIDE_TABS.OVERVIEW),
      },
      {
        id: SIDE_TABS.TESTIMONIALS,
        element: document.getElementById(SIDE_TABS.TESTIMONIALS),
      },
      {
        id: SIDE_TABS.LINKS,
        element: document.getElementById(SIDE_TABS.LINKS),
      },
      {
        id: SIDE_TABS.EVENTS,
        element: document.getElementById(SIDE_TABS.EVENTS),
      },
      {
        id: SIDE_TABS.REVIEWS,
        element: document.getElementById(SIDE_TABS.REVIEWS),
      },
      {
        id: SIDE_TABS.REVIEW_HIGHLIGHTS,
        element: document.getElementById(SIDE_TABS.REVIEW_HIGHLIGHTS),
      },
      {
        id: SIDE_TABS.SIMILAR,
        element: document.getElementById(SIDE_TABS.SIMILAR),
      },
      {
        id: SIDE_TABS.MAP,
        element: document.getElementById(SIDE_TABS.MAP),
      },
      {
        id: SIDE_TABS.CULTURE,
        element: document.getElementById(SIDE_TABS.CULTURE),
      },
      {
        id: SIDE_TABS.COST,
        element: document.getElementById(SIDE_TABS.COST),
      },
      {
        id: SIDE_TABS.MAJORS,
        element: document.getElementById(SIDE_TABS.MAJORS),
      },
      {
        id: SIDE_TABS.STUDENTS,
        element: document.getElementById(SIDE_TABS.STUDENTS),
      },
      {
        id: SIDE_TABS.ACADEMICS,
        element: document.getElementById(SIDE_TABS.ACADEMICS),
      },
      {
        id: SIDE_TABS.TEACHERS,
        element: document.getElementById(SIDE_TABS.TEACHERS),
      },
      {
        id: SIDE_TABS.ACTIVITIES,
        element: document.getElementById(SIDE_TABS.ACTIVITIES),
      },
      {
        id: SIDE_TABS.SPOTLIGHT,
        element: document.getElementById(SIDE_TABS.SPOTLIGHT),
      },
      {
        id: SIDE_TABS.CASE_STUDY,
        element: document.getElementById(SIDE_TABS.CASE_STUDY),
      },
    ].filter((section) => section.element);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-100px 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      if (section.element) observer.observe(section.element);
    });

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { activeTab, setActiveTab };
};
