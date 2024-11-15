"use client";

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { logout } from '@/server-action/sa-logout';

export default function BlandSettingsPage() {
  const session = useSession();

  const onClickLogout = () => {
    logout();
  };

  return (
    <div>
      <div>
        <h1>{JSON.stringify(session)}</h1>
      </div>
      <h1>Bland Settings</h1>

      <Button variant="destructive" onClick={onClickLogout}>
        Logout
      </Button>
    </div>
  );
}
