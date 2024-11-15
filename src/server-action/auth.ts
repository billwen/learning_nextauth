import * as bcrypt from 'bcryptjs';
import NextAuth, { DefaultSession } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import type { User, UserRole } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { LoginData, LoginDataSchema } from '@/schema';
import { getUserByEmail, getUserById } from '@/data-service/user-data-service';
import { AuthConfig } from '@auth/core';
import Google from '@auth/core/providers/google';
import { getTwoFactorConfirmationByUserId } from '@/data-service/two-factor-service';

/**
 * The offical solution to extend the session object.
 * https://authjs.dev/getting-started/typescript
 * DOSN'T WORK
 */

// declare module "@auth/core" {
//   interface Session {
//     user: {
//       role: "ADMIN" | "USER";
//     } & DefaultSession['user'];
//   }
// }

export type ExtendedUser = {
  role: UserRole;
} & DefaultSession['user'];

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}

/**
 * Authorize the user with the provided credentials.
 * @param credentials - The credentials to authorize.
 * @param request - The request object.
 * @returns The user if the credentials are valid; otherwise, null.
 */
async function credentialsAuthorize(
  credentials: Partial<Record<string, unknown>>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  request: Request,
): Promise<User | null> {
  const validateFields = LoginDataSchema.safeParse(credentials);
  if (!validateFields.success) {
    return null;
  }
  const { email, password } = validateFields.data as LoginData;
  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    // When a user profile doen't have a password, it means that the user is logged in through a social provider.
    // In this case, we should return null to let NextAuth know that the user is not authenticated.
    // This will trigger the redirect to the login page.
    return null;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;
  }

  // Authenticated user
  return user;
}

type Callbacks = Required<NonNullable<AuthConfig['callbacks']>>;
type JwtFunc = Callbacks['jwt'];
type SessionFunc = Callbacks['session'];
type SignInFunc = Callbacks['signIn'];

type Events = Required<NonNullable<AuthConfig['events']>>;
export type SignInEvent = Events['signIn'];
type LinkAccountEvent = Events['linkAccount'];

const linkAccountEvent: LinkAccountEvent = async ({ user, account }) => {
  console.log(`link account event - ${JSON.stringify(user)} - ${JSON.stringify(account)}`);
  await db.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
    },
  });
  return;
};

const signInCallback: SignInFunc = async ({ user, account }) => {
  console.log(`sign in callback - ${JSON.stringify(user)}`);
  // const existingUser = await getUserById(user.id);
  // if (!existingUser || !existingUser.emailVerified) {
  //   return false;
  // }

  // Allow OAuth without email verification
  if (account?.provider !== 'credentials') {
    return true;
  }

  const existingUser = await getUserById(user.id ?? '');
  if (!existingUser?.emailVerified) {
    // If the user hasn't verified their email, cannot sign in
    return false;
  }

  // TODO: Add 2FA check here
  if (existingUser?.isTwoFactorEnabled) {
    // If 2FA is enabled, redirect to 2FA page
    const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
    if (!twoFactorConfirmation) {
      // If 2FA token is not found, redirect to 2FA page
      return false;
    }

    // Delete the 2FA token for next sign in
    await db.twoFactorConfirmation.delete({
      where: {
        id: twoFactorConfirmation.id,
      },
    });

    return true;
  }

  return true;
};

const jwtCallback: JwtFunc = async (params) => {
  console.log(`jwt callback - ${JSON.stringify(params)} `);
  const token = params.token;
  if (!token.sub) {
    // User is logged out
    return token;
  }

  const existingUser = await getUserById(token.sub);
  if (!existingUser) {
    // User not found
    return token;
  }

  token.role = existingUser.role;
  return token;
};

const sessionCallback: SessionFunc = async ({ token, session }) => {
  console.log(`session callback - ${JSON.stringify(token)}`);
  if (token.sub && session.user) {
    // attach the user id to the session
    session.user.id = token.sub;
  }

  if (token.role && session.user) {
    // Extend the user role to the session
    session.user.role = token.role as UserRole;
  }

  return session;
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/login',
    error: '/auth/error',
    newUser: '/auth/new',
  },
  events: {
    linkAccount: linkAccountEvent,
  },
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
    signIn: signInCallback,
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      authorize: credentialsAuthorize,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
});
