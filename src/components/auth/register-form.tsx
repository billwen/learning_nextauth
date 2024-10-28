"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { RegisterData, RegisterDataSchema } from '@/schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/shared/form-error';
import { FormSuccess } from '@/components/shared/form-success';

import { saRegister } from '@/server-action/sa-register';


export function RegisterForm() {

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterData >({
    resolver: zodResolver(RegisterDataSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
    }
  });

  const onSubmit = (values: RegisterData) => {
    // New submit
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      saRegister(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            setSuccess(undefined);
          } else {
            setError(undefined);
            setSuccess(data.success);
          }
        });
    });

  };

  return (
    <CardWrapper headerLabel="Create an account" backButtonLabel="Already have an account?" backButtonHref="/auth/login" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="name" render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input {...field} placeholder="Your name" type="text" disabled={isPending} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

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
            Create an account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}