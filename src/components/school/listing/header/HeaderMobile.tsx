interface HeaderProps {
  isFooterVisible: boolean;
  images: string[];
}

const Header: React.FC<HeaderProps> = ({ isFooterVisible, images }) => {
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none z-[20]">
      <div
        className={`fixed top-0 bg-white shadow-md p-3 transition-transform duration-300 w-full overflow-x-auto whitespace-nowrap scrollbar-hide ${
          isFooterVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex px-4">
          {[
            "Monthly Update",
            "Report Card",
            "About",
            "Enrolling",
            "From the School",
            "Upcoming Events",
            "Rankings",
            "Academics",
            "Map",
            "Home Listings",
            "Living in the Area",
            "Culture & Safety",
            "Students",
            "Teachers",
            "Clubs & Activities",
            "Reviews",
          ].map((tab, index) => (
            <a
              key={tab}
              href={`#${tab.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-[#5F5F5F] text-sm px-3 py-2 relative ${
                index === 0 ? "text-[#0B6333] font-semibold" : ""
              } pointer-events-auto`}
            >
              {tab}
              {index === 0 && (
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
