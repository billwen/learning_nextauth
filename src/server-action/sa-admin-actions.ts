'use server';

import { currentRole } from '@/lib/auth-lib';
import { UserRole } from '@prisma/client';

export async function saAdminActionDemo() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: 'Admin action' };
  } else {
    return { error: 'Forbidden' };
  }
}
