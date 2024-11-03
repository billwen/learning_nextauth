import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import { getVerificationTokenByEmail } from '@/data-service/verificaiton-token-service';

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
