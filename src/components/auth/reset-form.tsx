"use client";

import { CardWrapper } from '@/components/auth/card-wrapper';
import { useForm } from 'react-hook-form';
import { ResetPasswordData, ResetPasswordDataSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useTransition } from 'react';
import { saResetPassword } from '@/server-action/reset-password';
import { FormError } from '@/components/shared/form-error';
import { FormSuccess } from '@/components/shared/form-success';

export function ResetForm() {

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordDataSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: ResetPasswordData) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      // Call the reset password service
      saResetPassword(values)
        .then((data) => {
          console.log(data);
          if (data?.error) {
            setError(data.error);
            setSuccess(undefined);
          } else {
            setError(undefined);
            setSuccess(data?.success);
          }
        });
    });
  };

  return (
    <CardWrapper headerLabel="Forgot your password" backButtonLabel="Back to login" backButtonHref="/auth/login">

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" type="email" placeholder="email" />
                <FormMessage {...field} />
              </FormItem>
            )} />

          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            Send reset email
          </Button>

          <FormError message={error} />
          <FormSuccess message={success} />
        </form>

      </Form>

    </CardWrapper>


  );
}
