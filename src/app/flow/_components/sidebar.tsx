"use client";

import { CoinsIcon, HomeIcon, Layers2Icon, MenuIcon, ShieldCheckIcon } from 'lucide-react';
import { FlowLogo } from '@/app/flow/_components/flow-logo';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

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

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const activeRoute = routes.find((route) => route.href.length > 0 && pathname.includes(route.href)) || routes[0];

  return (
    <div className="block border-separate bg-background md:hidden ">
      <nav className="container flex items-center justify-center px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] space-y-4" side="left">
            <FlowLogo fontSize="text-2xl" iconSize={24} />
            <div className="flex flex-col gap-1">
              {
                routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={buttonVariants({variant: activeRoute.href === route.href ? 'sidebarItemActive' : 'sidebarItem'})}
                    onClick={() => setIsOpen((prev) => !prev)}
                  >
                    <route.icon size={20} />
                    {route.label}
                  </Link>
                ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}
