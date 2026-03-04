import { useEffect, useState, useCallback } from "react";
import { removeLastWord } from "@/utils/removeLastWord";
import { SIDE_TABS_MOBILE } from "../content/side-tabs.constant";
import { debounce } from "@/utils/debounce";

interface HeaderProps {
  isFooterVisible: boolean;
}

const MOBILE_DRAWER_VISIBILITY_EVENT = "mobile-drawer-visibility-change";

const Header: React.FC<HeaderProps> = ({ isFooterVisible }) => {
  const [activeTab, setActiveTab] = useState<string>(
    Object.values(SIDE_TABS_MOBILE)[0]
  );
  const [isBlockingOverlayOpen, setIsBlockingOverlayOpen] = useState(false);

  const checkActiveSection = useCallback(() => {
    // Get all section elements
    const sections = Object.values(SIDE_TABS_MOBILE)
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // Find the section that is currently in view
    const currentSection = sections.find((section) => {
      if (!section) return false;
      const rect = section.getBoundingClientRect();
      // Consider a section "in view" if its top is within the viewport
      // and at least half of it is visible
      return rect.top <= 100 && rect.bottom >= 100;
    });

    if (currentSection) {
      setActiveTab(currentSection.id);
    }
  }, []);

  useEffect(() => {
    // Create a debounced version of the scroll handler
    const debouncedHandleScroll = debounce(checkActiveSection, 100);

    // Add scroll event listener with debounced handler
    window.addEventListener("scroll", debouncedHandleScroll);

    // Initial check for the active tab
    checkActiveSection();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [checkActiveSection]);

  useEffect(() => {
    const detectBlockingOverlay = () => {
      const hasOpenMobileDrawer =
        document.body.dataset.mobileDrawerOpen === "true";
      const hasOpenVaulDrawer = Boolean(
        document.querySelector(
          "[data-vaul-overlay][data-state='open'], [data-vaul-drawer][data-state='open']"
        )
      );
      const hasOpenLegacyMobileModal = Boolean(
        document.querySelector(
          "#mobile-modal-root .fixed.opacity-100:not(.pointer-events-none)"
        )
      );
      const isBodyScrollLocked = document.body.style.position === "fixed";

      setIsBlockingOverlayOpen(
        hasOpenMobileDrawer ||
          hasOpenVaulDrawer ||
          hasOpenLegacyMobileModal ||
          isBodyScrollLocked
      );
    };

    detectBlockingOverlay();

    const observer = new MutationObserver(detectBlockingOverlay);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: [
        "class",
        "data-state",
        "style",
        "data-mobile-drawer-open",
        "data-mobile-drawer-open-count",
      ],
    });

    window.addEventListener("resize", detectBlockingOverlay);
    window.addEventListener(MOBILE_DRAWER_VISIBILITY_EVENT, detectBlockingOverlay);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", detectBlockingOverlay);
      window.removeEventListener(MOBILE_DRAWER_VISIBILITY_EVENT, detectBlockingOverlay);
    };
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  if (isBlockingOverlayOpen) {
    return null;
  }

  const shouldShowHeader = isFooterVisible;

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-[1001]">
      <div
        className={`fixed top-[68px] bg-white border-b border-[rgba(0,0,0,0.08)] shadow-[0_2px_6px_rgba(0,0,0,0.06)] p-3 transition-transform duration-300 ease-in-out z-[1001] w-full overflow-x-auto whitespace-nowrap scrollbar-hide ${shouldShowHeader ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        <div className="flex px-4">
          {Object.values(SIDE_TABS_MOBILE).map((value, index) => (
            <a
              key={index}
              href={`#${value}`}
              onClick={() => handleTabClick(value)}
              className={`text-[#5F5F5F] text-sm px-3 py-2 relative ${activeTab === value ? "text-[#0B6333] font-semibold" : ""
                } pointer-events-auto`}
            >
              {removeLastWord(value)}
              {activeTab === value && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#0B6333] rounded" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
