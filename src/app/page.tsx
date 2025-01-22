import { RightSidebar } from '@/components/layout/Sidebar/Right';

export default function Home() {
  return (
    <div className="flex flex-1">
      <div className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <p>Main Content Area</p>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="w-80 hidden lg:block border-l border-border">
        <RightSidebar />
      </aside>
    </div>
  );
}
