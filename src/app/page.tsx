import { Header } from '@/components/layout/Header';
import { LeftSidebar } from '@/components/layout/Sidebar/Left';
import { RightSidebar } from '@/components/layout/Sidebar/Right';
import { Player } from '@/components/layout/Player';

export default function Home() {
  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex flex-1 pt-16"> {/* pt-16 для відступу під header */}
        {/* Left Sidebar */}
        <aside className="w-64 hidden md:block">
          <LeftSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Тут буде контент */}
            <p>Main Content Area</p>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 hidden lg:block">
          <RightSidebar />
        </aside>
      </div>

      {/* Player */}
      <Player />
    </div>
  );
}
