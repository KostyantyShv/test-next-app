import { MobileDrawer } from "@/components/ui/MobileDrawer/MobileDrawer";

interface CTADrawerProps {
  isCTADrawerOpen: boolean;
  setIsCTADrawerOpen: (open: boolean) => void;
}

const CTADrawer: React.FC<CTADrawerProps> = ({
  isCTADrawerOpen,
  setIsCTADrawerOpen,
}) => {
  return (
    <>
      <MobileDrawer
        isOpen={isCTADrawerOpen}
        onClose={() => setIsCTADrawerOpen(false)}
      >
        <div className="p-4 flex justify-center items-center relative border-b border-[#f0f0f0]">
          <h3 className="text-lg font-semibold text-[#464646]">
            Quick Actions
          </h3>
          <button
            onClick={() => setIsCTADrawerOpen(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#5F5F5F] p-1.5"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="p-4">
          {[
            {
              icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
              text: "Get directions",
            },
            {
              icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
              text: "Call now",
            },
            {
              icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
              text: "Website",
            },
            {
              icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z",
              text: "Share",
            },
            {
              icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              text: "Claim listing",
            },
            {
              icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
              text: "Report",
            },
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-3 p-3.5 border border-[#E1E7EE] rounded-lg bg-white text-[#4A4A4A] text-base font-medium w-full text-left mb-3 last:mb-0 hover:bg-[#F8FAFC] hover:border-[#D1D5DB]"
            >
              <svg
                className="w-5 h-5 text-[#5F5F5F]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                />
              </svg>
              {item.text}
            </button>
          ))}
        </div>
      </MobileDrawer>
    </>
  );
};

export default CTADrawer;
