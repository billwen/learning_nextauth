'use server';

import { db } from '@/lib/db';

export async function getUserByEmail(email: string) {
  try {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  } catch {
    return null;
  }
}
