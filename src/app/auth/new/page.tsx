import { auth } from '@/server-action/auth';

export default async function NewUserPage() {
  const session = await auth();

  return (
    <div>
      <h1>{JSON.stringify(session)}</h1>
    </div>
  );
}
