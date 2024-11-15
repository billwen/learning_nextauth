import { signOut } from '@/server-action/auth';
import { Button } from '@/components/ui/button';

export default async function SettingsPage() {

  return (
    <div className="bg-white rounded-xl">

      <form action={async () => {
        "use server";

        await signOut();
      }}>
        <Button type="submit" variant="destructive">Sign out</Button>
      </form>
    </div>
  );
} ;
