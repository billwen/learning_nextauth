import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export function useCurrentRole() {
  const session = useSession();
  return session.data?.user.role;
}

interface UseRaBACProps {
  redirectUrl: string;
}

export function useRBAC({ redirectUrl }: UseRaBACProps) {
  const session = useSession();

  if (!session || !session.data) {
    redirect(redirectUrl);
  }

  return {
    user: session.data.user,
    role: session.data.user.role,
  };
}
