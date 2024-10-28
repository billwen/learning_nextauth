import { auth } from '@/server-action/auth';

export default async function SettingsPage() {

  const session = await auth();

  return (
    <div>
      <h1>Settings</h1>
      <p>Welcome {JSON.stringify(session)}!</p>
    </div>
  );
} ;
