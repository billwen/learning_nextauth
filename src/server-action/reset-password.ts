'use server';

import { NewPasswordData, NewPasswordDataSchema, ResetPasswordData, ResetPasswordDataSchema } from '@/schema';
import { getUserByEmail } from '@/data-service/user-data-service';
import { generatePasswordResetToken } from '@/lib/tokens';
import { sendPasswordResetEmail } from '@/data-service/email-service';
import { getPasswordResetTokenByToken } from '@/data-service/reset-password-service';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

export async function saResetPassword(data: ResetPasswordData) {
  // Call the reset password service
  const validateFields = ResetPasswordDataSchema.safeParse(data);
  if (!validateFields.success) {
    return { error: 'Invalid email' };
  }

  const { email } = validateFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: 'Email not found' };
  }

  const token = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(email, token);

  return { success: 'Reset email sent' };
}

export async function saNewPassword(values: NewPasswordData, token?: string | null) {
  if (!token) {
    return { error: 'Invalid token' };
  }

  const validateFields = NewPasswordDataSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid password' };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: 'Invalid token' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token expires.' };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: 'Email not found' };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  // Call the new password service
  return { success: 'Password update!' };
}
