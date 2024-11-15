'use server';

import { LoginData, LoginDataSchema } from '@/schema';
import { signIn } from '@/server-action/auth';
import { DEFAULT_LOGGEDIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserByEmail } from '@/data-service/user-data-service';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/tokens';
import { sendTwoFactorEmail, sendVerificationEmail } from '@/data-service/email-service';
import { getTwoFactorConfirmationByUserId, getTwoFactorTokenByEmail } from '@/data-service/two-factor-service';
import { db } from '@/lib/db';

/**
 * Server action to log in a user.
 * @param data
 *
 * @returns An object with an error message if the login fails.
 * @throws An error if an unexpected error occurs.
 */
export const saLogin = async (data: LoginData) => {
  console.log(`Server Action: Login with ${JSON.stringify(data.email)}`);

  const validateFields = LoginDataSchema.safeParse(data);
  if (!validateFields.success) {
    return { error: 'Invalid username and password combination!' };
  }

  const { email, password, code } = validateFields.data as LoginData;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    // When a user doesn't have a password, it means they signed up with a social provider
    return { error: 'Email does not exist!' };
  }

  // If the user hasn't verified their email, send a new verification email
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(existingUser.email, verificationToken);
    return { success: 'Confirmation email sent!' };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      // Verify the two-factor code
      const sentCode = await getTwoFactorTokenByEmail(existingUser.email);
      if (!sentCode) {
        return { error: 'Two-factor code not found!' };
      }

      if (sentCode.token !== code) {
        return { error: 'Invalid two-factor code!' };
      }

      if (new Date(sentCode.expires) < new Date()) {
        return { error: 'Two-factor code has expired!' };
      }

      await db.twoFactorToken.delete({
        where: {
          id: sentCode.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });

      // Continue the normal sign in process
    } else {
      // No code provided, send a new two-factor code
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(existingUser.email, twoFactorToken);

      return { twoFactor: true };
    }
  }

  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGGEDIN_REDIRECT });
    return { success: 'User Logged In!' };
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid username and password combination!' };

        default:
          return { error: 'An error occurred while signing in!' };
      }
    }

    // Rethrow the error if it's not an AuthError
    // This will trigger the redirect to the error page
    // TODO: Understand the error and handle it accordingly
    throw error;
  }
};
