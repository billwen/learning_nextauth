'use server';

import { RegisterData, RegisterDataSchema } from '@/schema';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data-service/user-data-service';
import { generateVerificationToken } from '@/lib/tokens';

export const saRegister = async (data: RegisterData) => {
  console.log(`Server Action: Register with ${JSON.stringify(data.email)}`);

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

  // TODO: Send email verification with token
  const verificationToken = await generateVerificationToken(email);
  console.log(`Verification token: ${verificationToken}`);

  return { success: 'Confirmation email sent!' };
};
