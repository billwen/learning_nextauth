import { auth, signOut } from '@/server-action/auth';
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {

  const session = await auth();
  const now = new Date();

  return (
    <div>
      <h1>Settings at {now.toUTCString()}</h1>
      <p>Welcome {JSON.stringify(session)}!</p>
      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <Button type="submit" variant="destructive">Sign out</Button>
      </form>
    </div>
  );
} ;
