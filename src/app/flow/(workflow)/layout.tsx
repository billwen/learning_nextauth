import { Separator } from '@/components/ui/separator';
import { FlowLogo } from '@/app/flow/_components/flow-logo';
import { ThemeToggle } from '@/components/shared/theme-toggle';

interface WorkflowLayoutProps {
  children: React.ReactNode;
}

export default function WorkflowLayout({ children }: WorkflowLayoutProps) {
  return (
    <div className="flex flex-col w-full h-screen">
      {children}
      <Separator />
      <footer className="flex items-center justify-between p-2">
        <FlowLogo iconSize={16} fontSize="text-xl"></FlowLogo>
        <ThemeToggle />
      </footer>
    </div>
  );
}
