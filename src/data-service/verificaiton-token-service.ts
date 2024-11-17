'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data-service/user-data-service';

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    return db.verificationToken.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error('Error getting verification token by email', error);
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    return db.verificationToken.findUnique({
      where: {
        token,
      },
    });
  } catch (error) {
    console.error('Error getting verification token by token', error);
    return null;
  }
};

export const verifyToken = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  console.log('Existing token', existingToken);
  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token has expired!' };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: 'Email does not exist!' };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      token,
    },
  });

  return { success: 'Email has been verified!' };
};
