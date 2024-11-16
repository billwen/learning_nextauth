'use server';

import { SettingsData } from '@/schema';
import { currentUser } from '@/lib/auth-lib';
import { getUserById } from '@/data-service/user-data-service';
import { db } from '@/lib/db';

export async function saSettings(values: SettingsData) {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const dbUser = await getUserById(user.id ?? '');
  if (!dbUser) {
    return { error: 'User not found' };
  }

  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });

  return {
    success: 'Settings updated!',
  };
}
