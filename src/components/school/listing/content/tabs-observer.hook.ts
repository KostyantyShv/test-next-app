import { useEffect, useRef, useState } from "react";
import { SIDE_TABS_DESKTOP } from "./side-tabs.constant";

export const useTabsObserver = () => {
  const [activeTab, setActiveTab] = useState(
    SIDE_TABS_DESKTOP.MONTHLY_UPDATE_DESKTOP
  );
  const observerRef = useRef<IntersectionObserver>(null);

  useEffect(() => {
    const sections = [
      {
        id: SIDE_TABS_DESKTOP.MONTHLY_UPDATE_DESKTOP,
        element: document.getElementById(
          SIDE_TABS_DESKTOP.MONTHLY_UPDATE_DESKTOP
        ),
      },
      {
        id: SIDE_TABS_DESKTOP.REPORT_CARD_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.REPORT_CARD_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.ABOUT_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.ABOUT_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.RANKINGS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.RANKINGS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.ADMISSIONS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.ADMISSIONS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.SCATTER_PLOT_DESKTOP,
        element: document.getElementById(
          SIDE_TABS_DESKTOP.SCATTER_PLOT_DESKTOP
        ),
      },
      {
        id: SIDE_TABS_DESKTOP.OVERVIEW_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.OVERVIEW_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.TESTIMONIALS_DESKTOP,
        element: document.getElementById(
          SIDE_TABS_DESKTOP.TESTIMONIALS_DESKTOP
        ),
      },
      {
        id: SIDE_TABS_DESKTOP.LINKS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.LINKS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.EVENTS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.EVENTS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.REVIEWS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.REVIEWS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.REVIEW_HIGHLIGHTS_DESKTOP,
        element: document.getElementById(
          SIDE_TABS_DESKTOP.REVIEW_HIGHLIGHTS_DESKTOP
        ),
      },
      {
        id: SIDE_TABS_DESKTOP.SIMILAR_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.SIMILAR_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.MAP_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.MAP_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.CULTURE_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.CULTURE_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.COST_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.COST_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.MAJORS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.MAJORS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.STUDENTS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.STUDENTS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.ACADEMICS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.ACADEMICS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.TEACHERS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.TEACHERS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.ACTIVITIES_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.ACTIVITIES_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.SPOTLIGHT_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.SPOTLIGHT_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.CASE_STUDY_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.CASE_STUDY_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.AFTER_COLLEGE_DESKTOP,
        element: document.getElementById(
          SIDE_TABS_DESKTOP.AFTER_COLLEGE_DESKTOP
        ),
      },
      {
        id: SIDE_TABS_DESKTOP.AREA_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.AREA_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.PROGRAMS_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.PROGRAMS_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.SOCIAL_MEDIA_DESKTOP,
        element: document.getElementById(
          SIDE_TABS_DESKTOP.SOCIAL_MEDIA_DESKTOP
        ),
      },
      {
        id: SIDE_TABS_DESKTOP.COMPARISON_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.COMPARISON_DESKTOP),
      },
      {
        id: SIDE_TABS_DESKTOP.ARTICLES_DESKTOP,
        element: document.getElementById(SIDE_TABS_DESKTOP.ARTICLES_DESKTOP),
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
