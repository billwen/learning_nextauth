import { db } from '@/lib/db';

export async function getPasswordResetTokenByEmail(email: string) {
  try {
    return db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
  } catch (error) {
    console.error('Error getting password reset token by email', error);
    return null;
  }
}

export async function getPasswordResetTokenByToken(token: string) {
  try {
    return db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
  } catch (error) {
    console.error('Error getting password reset token by token', error);
    return null;
  }
}
