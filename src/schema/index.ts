import * as z from 'zod';
import { UserRole } from '@prisma/client';

export const LoginDataSchema = z.object({
  email: z.string().email({ message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' }),
  code: z.optional(z.string()),
});

export type LoginData = z.infer<typeof LoginDataSchema>;

export const RegisterDataSchema = z.object({
  email: z.string().email({ message: 'Email is required.' }),
  password: z.string().min(6, { message: 'Minimum 6 characters required.' }),
  name: z.string().min(1, { message: 'Name is required.' }),
});

export type RegisterData = z.infer<typeof RegisterDataSchema>;

export const ResetPasswordDataSchema = z.object({
  email: z.string().email({ message: 'Email is required.' }),
});

export type ResetPasswordData = z.infer<typeof ResetPasswordDataSchema>;

export const NewPasswordDataSchema = z.object({
  password: z.string().min(6, { message: 'Minimum 6 characters required.' }),
});

export type NewPasswordData = z.infer<typeof NewPasswordDataSchema>;

export const SettingsDataSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.optional(z.enum([UserRole.ADMIN, UserRole.USER])),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        // If you need to change your password, you should provide the current password and the new password.
        return false;
      }

      if (data.newPassword && !data.password) {
        // If you need to change your password, you should provide the current password and the new password.
        return false;
      }

      return true;
    },
    {
      message: 'You should provide the current password and the new password.',
      path: ['password', 'newPassword'],
    },
  );

export type SettingsData = z.infer<typeof SettingsDataSchema>;
