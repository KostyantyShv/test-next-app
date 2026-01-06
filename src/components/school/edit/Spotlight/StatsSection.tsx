import { Stat } from "./types";

interface StatsSectionProps {
  stats: Stat[];
  setStats: (stats: Stat[]) => void;
}

export default function StatsSection({ stats, setStats }: StatsSectionProps) {
  const addStat = () => {
    setStats([...stats, { label: "", value: "" }]);
  };

  const updateStat = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStats(newStats);
  };

  const removeStat = (index: number) => {
    setStats(stats.filter((_, i) => i !== index));
  };

  return (
    <div className="border-b border-[#eee] max-md:border-[#eee] pb-6 max-md:pb-5 mb-6 max-md:mb-5">
      <h3 className="text-lg max-md:text-base font-semibold text-[#262B3D] max-md:text-[#262B3D] mb-4 max-md:mb-4">
        Project Stats
      </h3>
      <div className="flex flex-col max-md:flex-col gap-3 max-md:gap-3 mb-4 max-md:mb-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-3 max-md:p-3 border border-[#E5E5E5] max-md:border-[#E5E5E5] rounded-lg max-md:rounded-lg relative"
          >
            <button
              type="button"
              onClick={() => removeStat(index)}
              className="absolute top-2 max-md:top-2 right-2 max-md:right-2 w-6 h-6 max-md:w-6 max-md:h-6 rounded-full max-md:rounded-full bg-[#f8f9fa] max-md:bg-[#f8f9fa] border border-[#E5E5E5] max-md:border-[#E5E5E5] flex items-center justify-center text-[#666] max-md:text-[#666] hover:bg-[#e9ecef] max-md:hover:bg-[#e9ecef] hover:text-[#333] max-md:hover:text-[#333] text-sm max-md:text-sm font-semibold max-md:font-semibold"
            >
              ×
            </button>
            <div className="mb-2 max-md:mb-2">
              <label className="block font-semibold max-md:font-medium text-[#4A4A4A] max-md:text-[#4A4A4A] mb-2 max-md:mb-1.5 text-sm max-md:text-sm">
                Stat Label
              </label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(index, "label", e.target.value)}
                className="w-full px-3 max-md:px-3 py-3 max-md:py-3 border border-[#E5E5E5] max-md:border-[#E5E5E5] rounded-lg max-md:rounded-lg text-sm max-md:text-sm text-[#4A4A4A] max-md:text-[#4A4A4A] bg-white max-md:bg-white focus:outline-none"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = '#02C5AF';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = '#E5E5E5';
                }}
                placeholder="e.g., Active Users"
              />
            </div>
            <div>
              <label className="block font-semibold max-md:font-medium text-[#4A4A4A] max-md:text-[#4A4A4A] mb-2 max-md:mb-1.5 text-sm max-md:text-sm">
                Stat Value
              </label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(index, "value", e.target.value)}
                className="w-full px-3 max-md:px-3 py-3 max-md:py-3 border border-[#E5E5E5] max-md:border-[#E5E5E5] rounded-lg max-md:rounded-lg text-sm max-md:text-sm text-[#4A4A4A] max-md:text-[#4A4A4A] bg-white max-md:bg-white focus:outline-none"
                style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}
                onFocus={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = '#02C5AF';
                }}
                onBlur={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.style.borderColor = '#E5E5E5';
                }}
                placeholder="e.g., 25,000+"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addStat}
        className="w-full p-3 max-md:p-3 bg-[#f8f9fa] max-md:bg-[#f8f9fa] border border-dashed border-[#E5E5E5] max-md:border-[#E5E5E5] rounded-lg max-md:rounded-lg flex items-center justify-center gap-2 max-md:gap-2 text-sm max-md:text-sm text-[#262B3D] max-md:text-[#262B3D] hover:bg-[#e9ecef] max-md:hover:bg-[#e9ecef]"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </svg>
        Add Stat
      </button>
    </div>
  );
}
