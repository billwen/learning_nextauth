'use server';

import { LoginData, LoginDataSchema } from '@/schema';

export const saLogin = async (data: LoginData) => {
  console.log(`Server Action: Login with ${JSON.stringify(data.email)}`);

  const validateFields = LoginDataSchema.safeParse(data);
  if (!validateFields.success) {
    return { error: 'Invalid username and password combination!' };
  }

  return { success: 'Email sent!' };
};
