"use server";

import { Separator } from '@/components/ui/separator';
import { DesktopSidebar } from '@/app/flow/_components/sidebar';
import { BreadcrumbHeader } from '@/app/flow/_components/breadcrumb-header';
import { ThemeProvider } from '@/components/shared/theme-provider';
import { ThemeToggle } from '@/components/shared/theme-toggle';

import { SessionProvider } from 'next-auth/react';
import { auth } from '@/server-action/auth';
import { UserButton } from '@/components/auth/user-button';

export default async function FlowDashboardLayout({ children }: { children: React.ReactNode }) {

  const session = await auth();

  return (
    <ThemeProvider>
      <SessionProvider session={session}>
        <div className="flex h-screen ">

          {/* Sidebar */}
          <DesktopSidebar />

          {/* Main content */}
          <div className="flex flex-col flex-1 min-h-screen">
            <header className="flex items-center justify-between px-6 py-4 h-[50px] container">
              <BreadcrumbHeader />
              <div className="gap-2 flex items-center ">
                <ThemeToggle />
                <UserButton size={8} />
              </div>
            </header>
            <Separator />
            <div className="overflow-y-auto">
              <div className="flex-1 container py-4 text-accent-foreground">
                {children}
              </div>
            </div>
          </div>

        </div>
      </SessionProvider>
    </ThemeProvider>
  );
}
