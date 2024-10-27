import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const popFonts = Poppins({
  subsets: ['latin'],
  weight: ['600'],
});

interface HeaderProps {
  label: string;
}

export function Header({label}: HeaderProps) {
  return (
    <div className="w-full flex flex-col gay-y-4 items-center">
      <h1 className={cn("text-3xl font-semibold", popFonts.className)}>
        🔐 Auth
      </h1>
      <p className="text-muted-foreground text-sm">
        {label}
      </p>

    </div>
  );
}
