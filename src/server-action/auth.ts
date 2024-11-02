import * as bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import type { User } from '@prisma/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { LoginData, LoginDataSchema } from '@/schema';
import { getUserByEmail } from '@/data-service/user-data-service';
import { AuthConfig } from '@auth/core';

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

const jwtCallback: JwtFunc = async (params) => {
  console.log('jwt callback - ', params);
  return params.token;
};

const sessionCallback: SessionFunc = async ({ token, session }) => {
  if (token.sub && session.user) {
    session.user.id = token.sub;
  }

  return session;
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    jwt: jwtCallback,
    session: sessionCallback,
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  providers: [
    GitHub,
    Credentials({
      authorize: credentialsAuthorize,
    }),
  ],
});
