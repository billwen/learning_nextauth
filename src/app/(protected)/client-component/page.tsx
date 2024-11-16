"use client";

import { UserInfo } from '@/components/shared/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';

export default function ClientComponentDemoPage() {
  const user = useCurrentUser();

  return (
    <UserInfo user={user} label="Client component" />
  );
}
