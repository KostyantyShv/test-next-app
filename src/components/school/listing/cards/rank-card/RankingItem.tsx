import {
  DesktopTrendDownSVG,
  DesktopTrendUpSVG,
  MobileTrendDownSVG,
  MobileTrendUpSVG,
} from "./icons";

interface RankingItemProps {
  rank: string;
  title: string;
  position: string;
  total: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
}

const RankingItem: React.FC<RankingItemProps> = ({
  rank,
  title,
  position,
  total,
  trend,
}) => {
  return (
    <div className="relative flex flex-col items-start gap-4 bg-white border border-[#E5E5E5] rounded-xl p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group md:bg-gradient-to-b md:from-[rgba(1,104,83,0.03)] md:to-transparent md:border-none">
      <div className="flex md:items-center w-full md:flex-col md:gap-2">
        <div className="relative w-[42px] h-[42px] bg-[#EBFCF4] border-2 border-[#0B6333] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 mr-4 md:w-12 md:h-12 md:rounded-full md:border-[#089E68]">
          <span className="text-[#016853] text-lg font-bold z-10 md:text-2xl">
            {rank}
          </span>
          <div className="absolute inset-0 -top-0.5 -left-0.5 rounded-lg bg-gradient-to-br from-[rgba(8,158,104,0.2)] to-transparent md:rounded-full" />
        </div>
        <div className="flex flex-col gap-2 w-full max-w-[calc(100%-80px)] md:max-w-full">
          <h2 className="text-[#346DC2] text-base font-semibold leading-tight m-0 group-hover:text-[#1D77BD] transition-colors duration-200 pr-4 md:text-base md:font-semibold md:pr-9">
            {title}
          </h2>
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-baseline gap-1">
              <span className="text-[#464646] text-base font-semibold md:text-xl md:font-bold">
                {position}
              </span>
              <span className="text-[#5F5F5F] text-sm md:text-base">{`of ${total}`}</span>
            </div>
            {trend && (
              <div className="flex items-center gap-1 absolute right-4 top-4 md:static md:ml-auto md:bg-[rgba(245,250,255,0.5)] md:px-2 md:py-0.5 md:rounded-xl md:group-hover:scale-105 md:transition-transform md:duration-300">
                <span
                  className={`text-base font-semibold ${
                    trend.direction === "up"
                      ? "text-[#00DF8B]"
                      : "text-[#FF4D4D]"
                  }`}
                >
                  {trend.value}
                </span>
                {trend.direction === "up" ? (
                  <>
                    <DesktopTrendUpSVG />
                    <MobileTrendUpSVG />
                  </>
                ) : (
                  <>
                    <DesktopTrendDownSVG />
                    <MobileTrendDownSVG />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingItem;
