import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from 'lucide-react';

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

  return (
    <div className="hidden relative md:block max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
      sidebar
    </div>
  );
}
