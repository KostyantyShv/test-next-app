import { Header } from '@/components/layout/Header';
import { LeftSidebar } from '@/components/layout/Sidebar/Left';
import { RightSidebar } from '@/components/layout/Sidebar/Right';
import { Player } from '@/components/layout/Player';

export default function Home() {
  return (
    <div className="h-screen bg-background">
      <div className="flex h-full">
        {/* Left Sidebar */}
        <LeftSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <Header />
          
          {/* Main Content */}
          <div className="flex flex-1">
            {/* Main Content */}
            <main className="flex-1 p-4">
              <div className="max-w-4xl mx-auto">
                <p>Main Content Area</p>
              </div>
            </main>

            {/* Right Sidebar */}
            <aside className="w-80 hidden lg:block border-l border-border">
              <RightSidebar />
            </aside>
          </div>

          {/* Player */}
          <Player />
        </div>
      </div>
    </div>
  );
}
