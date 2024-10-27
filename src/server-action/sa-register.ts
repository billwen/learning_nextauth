'use server';

import { RegisterData, RegisterDataSchema } from '@/schema';

export const saRegister = async (data: RegisterData) => {
  console.log(`Server Action: Register with ${JSON.stringify(data.email)}`);

  const validateFields = RegisterDataSchema.safeParse(data);
  if (!validateFields.success) {
    return { error: 'Invalid username and password combination!' };
  }

  return { success: 'Email sent!' };
};
