import crypto from 'crypto';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import { getVerificationTokenByEmail } from '@/data-service/verificaiton-token-service';
import { getPasswordResetTokenByEmail } from '@/data-service/reset-password-service';
import { getTwoFactorTokenByEmail } from '@/data-service/two-factor-service';

export async function generateVerificationToken(email: string) {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    // If a token already exists, remove it from db
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Generate a new token
  const token = nanoid(16);
  const expires = new Date().getTime() + 1000 * 60 * 60; // 1 hour
  await db.verificationToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return token;
}

export async function generatePasswordResetToken(email: string) {
  const existingToken = await getPasswordResetTokenByEmail(email);
  if (existingToken) {
    // If a token already exists, remove it from db
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Generate a new token
  const token = nanoid(16);
  const expires = new Date().getTime() + 1000 * 60 * 60; // 1 hour
  await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return token;
}

export async function generateTwoFactorToken(email: string) {
  const token = crypto.randomInt(100_000, 999_999).toString();
  const expires = new Date().getTime() + 1000 * 60 * 60; // 15 minutes
  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    // If a token already exists, remove it from db
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Generate a new token
  await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires: new Date(expires),
    },
  });

  return token;
}
