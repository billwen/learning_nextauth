"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { NewPasswordData, NewPasswordDataSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CardWrapper } from '@/components/auth/card-wrapper';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/shared/form-error';
import { FormSuccess } from '@/components/shared/form-success';

import { saNewPassword } from '@/server-action/reset-password';
import { useSearchParams } from 'next/navigation';

export function NewPasswordForm() {

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const form = useForm<NewPasswordData>({
    resolver: zodResolver(NewPasswordDataSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: NewPasswordData) => {
    // New submit
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      saNewPassword(values, token)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            setSuccess(undefined);
          } else {
            setError(undefined);
            setSuccess(data?.success);
          }
        })
        .catch((error) => {
          setError(error.message);
          setSuccess(undefined);
        });
    });
    // Call the new password service
    console.log(values);
  };

  return (
    <CardWrapper headerLabel="Reset your password" backButtonLabel="Back to login" backButtonHref="/auth/login">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField control={form.control} name="password" render={({field}) => (
              <FormItem>
                <FormLabel htmlFor="password">New Password</FormLabel>
                <Input {...field} id="password" type="password" placeholder="*****" />
                <FormMessage {...field} />
              </FormItem>
            )} />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            Reset Password
          </Button>

          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </CardWrapper>
  );
}
