import { SessionProvider } from 'next-auth/react';
import { auth } from '@/server-action/auth';
import { ProtectedNavBar } from '@/app/(protected)/_components/protected-navbar';

export default async function ProtectedPagesLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <main className="h-full w-full flex flex-col gap-y-10 items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        <ProtectedNavBar />
        {children}
      </main>
    </SessionProvider>
  );
}