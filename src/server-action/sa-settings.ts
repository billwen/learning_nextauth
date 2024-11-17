'use server';

import { SettingsData } from '@/schema';
import { currentUser } from '@/lib/auth-lib';
import { getUserByEmail, getUserById } from '@/data-service/user-data-service';
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/data-service/email-service';
import bcrypt from 'bcryptjs';

export async function saSettings(values: SettingsData) {
  const user = await currentUser();
  if (!user) {
    return { error: 'Not authenticated' };
  }

  const dbUser = await getUserById(user.id ?? '');
  if (!dbUser) {
    return { error: 'User not found' };
  }

  if (user.isOAuth) {
    // OAuth users can't change their email or password
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  // Check when user wants to change email
  // Send a new verification email
  if (values.email && values.email !== dbUser.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: 'Email already exists' };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(values.email, verificationToken);

    return { success: 'Confirmation email sent!' };
  }

  // Check password
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);
    if (!passwordMatch) {
      return { error: 'Invalid password' };
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(values.newPassword, salt);
    values.password = hasedPassword;
    values.newPassword = undefined;

    return { error: 'New password is required' };
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
