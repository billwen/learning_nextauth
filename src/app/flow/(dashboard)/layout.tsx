import { Separator } from '@/components/ui/separator';
import { DesktopSidebar } from '@/app/flow/_components/desktop-sidebar';

export default function FlowDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen ">

      {/* Sidebar */}
      <DesktopSidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-h-screen">
        <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
          Scrape Flow
        </header>
        <Separator />
        <div className="overflow-y-auto">
          <div className="flex-1 container py-4 text-accent-foreground">
            {children}
          </div>
        </div>
      </div>

    </div>
  );
}
