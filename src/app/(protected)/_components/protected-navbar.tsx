"use client";

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserButton } from '@/components/auth/user-button';

export function ProtectedNavBar() {
  const pathname = usePathname();

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm text-xs">
      <div className="flex gap-x-2">
        <Button variant={pathname === "/settings" ? "default" : "outline"} asChild>
          <Link href="/settings" className="text-xs">Settings</Link>
        </Button>

        <Button variant={pathname === "/server-component" ? "default" : "outline"} asChild>
          <Link href="/server-component" className="text-xs">Server Component</Link>
        </Button>

        <Button variant={pathname === "/client-component" ? "default" : "outline"} asChild>
          <Link href="/client-component" className="text-xs">Client Component</Link>
        </Button>

        <Button variant={pathname === "/admin" ? "default" : "outline"} asChild>
          <Link href="/admin" className="text-xs">Admin</Link>
        </Button>

      </div>
       <UserButton />
    </nav>
  );
}
