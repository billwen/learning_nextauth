'use server';

import { RegisterData, RegisterDataSchema } from '@/schema';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data-service/user-data-service';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/data-service/email-service';
import log from '@/utils/logger';

/**
 * Register a new user.
 * @param data
 *
 * @returns {Promise<{error: string}>} - If the registration fails.
 * @returns {Promise<{success: string}>} - If the registration is successful.
 *
 * All exceptions are caught and handled by the server.
 */
export const saRegister = async (data: RegisterData) => {
  const validateFields = RegisterDataSchema.safeParse(data);
  if (!validateFields.success) {
    return { error: 'Invalid username and password combination!' };
  }

  const { email, password, name } = validateFields.data;

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: 'Email already exists!' };
  }

  await db.user.create({
    data: {
      email,
      password: hashed,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  try {
    await sendVerificationEmail(email, verificationToken);
  } catch (error) {
    // Error happened while sending the email, start rollback
    await db.user.delete({
      where: {
        email,
      },
    });
    log.error(__filename, `User registered failed, reason ${JSON.stringify(error)}`, {
      metric: 'register',
      module: 'auth',
      status: 'failed',
      details: JSON.stringify(error),
    });
    return { error: 'Internal Error, please try it again!' };
  }

  log.info(__filename, `User registered: ${email}`, {
    metric: 'register',
    module: 'auth',
    status: 'success',
    details: JSON.stringify({ email, name }),
  });
  return { success: 'Confirmation email sent!' };
};
