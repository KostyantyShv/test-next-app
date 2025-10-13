import Podium from './components/Podium';
import LeaderboardMobile from './components/Mobile/LeaderboardMobile';

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-[#E1E7EE] flex flex-col items-center py-5 px-5 w-full">
      {/* Mobile */}
      <div className="w-full md:hidden">
        <LeaderboardMobile />
      </div>

      {/* Desktop */}
      <div className="hidden md:block w-full">
        <div className="max-w-[1075px] mx-auto">
          <Podium />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;