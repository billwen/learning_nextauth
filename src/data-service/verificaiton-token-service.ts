import { db } from '@/lib/db';

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
