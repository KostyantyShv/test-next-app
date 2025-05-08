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
    <div className="border-b border-[#eee] pb-6 mb-6">
      <h3 className="text-lg font-semibold text-[#262B47] mb-4">
        Project Stats
      </h3>
      <div className="flex flex-wrap gap-4 mb-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex-1 min-w-[200px] p-4 border border-[#E5E5E5] rounded-lg relative"
          >
            <button
              type="button"
              onClick={() => removeStat(index)}
              className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#f8f9fa] border border-[#E5E5E5] flex items-center justify-center text-[#666] hover:bg-[#e9ecef] hover:text-[#333]"
            >
              ×
            </button>
            <div className="mb-2">
              <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
                Stat Label
              </label>
              <input
                type="text"
                value={stat.label}
                onChange={(e) => updateStat(index, "label", e.target.value)}
                className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                placeholder="e.g., Active Users"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#4A4A4A] mb-2 text-sm">
                Stat Value
              </label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => updateStat(index, "value", e.target.value)}
                className="w-full p-3 border border-[#E5E5E5] rounded-lg text-sm text-[#4A4A4A] focus:outline-none focus:border-[#02C5AF]"
                placeholder="e.g., 25,000+"
              />
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={addStat}
        className="w-full p-3 bg-[#f8f9fa] border border-dashed border-[#E5E5E5] rounded-lg flex items-center justify-center gap-2 text-sm text-[#262B47] hover:bg-[#e9ecef]"
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
