import { db } from '@/lib/db';

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    return db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
  } catch (error) {
    console.error('Error getting two factor token by token', error);
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    return db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error('Error getting two factor token by email', error);
    return null;
  }
};

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    return await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });
  } catch (error) {
    console.error('Error getting two factor token by userId', error);
    return null;
  }
};
