'use server';

import { signOut } from '@/server-action/auth';

export const logout = async () => {
  // Clean up about the user session
  await signOut({
    redirect: true,
    redirectTo: '/',
  });
};
