import * as z from 'zod';

export const LoginDataSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type LoginData = z.infer<typeof LoginDataSchema>;

export const RegisterDataSchema = z.object({
  email: z.string().email({ message: 'Email is required.' }),
  password: z.string().min(6, { message: 'Minimum 6 characters required.' }),
  name: z.string().min(1, { message: 'Name is required.' }),
});

export type RegisterData = z.infer<typeof RegisterDataSchema>;
