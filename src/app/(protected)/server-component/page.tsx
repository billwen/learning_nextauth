"use server";

import { currentUser } from '@/lib/auth-lib';
import { UserInfo } from '@/components/shared/user-info';

export default async function ServerComponentDemoPage() {
  const user = await currentUser();
  return (
    <UserInfo user={user} label="Server component" />
  );
}
