"use client";

import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from 'lucide-react';
import { FlowLogo } from '@/app/flow/_components/flow-logo';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';

const routes = [
  {
    href: '/flow',
    label: 'Home',
    icon: HomeIcon
  },
  {
    href: '/flow/workflows',
    label: 'Workflows',
    icon: Layers2Icon
  },
  {
    href: '/flow/credentials',
    label: 'Credentials',
    icon: ShieldCheckIcon
  },
  {
    href: '/flow/billing',
    label: 'Billing',
    icon: CoinsIcon
  },
]

export function DesktopSidebar() {

  const pathname = usePathname();
  const activeRoute = routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0];

  return (
    <div className="hidden relative md:block max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <FlowLogo fontSize="text-2xl" iconSize={32} />
      </div>

      <div className="flex flex-col p-2">
        {
          routes.map((route) => (
          <Link key={route.href} href={route.href} className={buttonVariants({variant: activeRoute.href === route.href ? 'sidebarItemActive' : 'sidebarItem'})}>
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
