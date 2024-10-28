'use server';

import { LoginData, LoginDataSchema } from '@/schema';
import { signIn } from '@/server-action/auth';
import { DEFAULT_LOGGEDIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

/**
 * Server action to login a user.
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

  const { email, password } = validateFields.data as LoginData;
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
