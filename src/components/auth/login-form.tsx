"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { LoginData, LoginDataSchema } from '@/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/shared/form-error';
import { FormSuccess } from '@/components/shared/form-success';

import { saLogin } from '@/server-action/sa-login';


export function LoginForm() {

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginData>({
    resolver: zodResolver(LoginDataSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = (values: LoginData) => {
    // New submit
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      saLogin(values)
        .then((data) => {
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
    <CardWrapper headerLabel="Welcome back" backButtonLabel="Don't have an account?" backButtonHref="/auth/register" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="email" render={({field}) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input {...field} placeholder="Your email" type="email" disabled={isPending} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({field}) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl><Input {...field} placeholder="******" type="password" disabled={isPending} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

          </div>

          <FormError message={error}  />
          <FormSuccess message={success}  />

          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}