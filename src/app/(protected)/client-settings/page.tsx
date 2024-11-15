"use client";

import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function ClientSettingsPage() {

  const session = useSession();

  const onClickSignout = () => {
    signOut();
  }

  return (
    <div>
      <p>Welcome {JSON.stringify(session)}!</p>
      <h1>Client Settings</h1>

      <Button variant="destructive" onClick={onClickSignout}>
        Sign Out
      </Button>

    </div>
  );
}