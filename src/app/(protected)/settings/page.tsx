"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { saSettings } from '@/server-action/sa-settings';
import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { SettingsData, SettingsDataSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { FormError } from '@/components/shared/form-error';
import { FormSuccess } from '@/components/shared/form-success';

export default function SettingsPage() {

  const currentUser = useCurrentUser();
  const { update } = useSession();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const form = useForm<SettingsData>({
    resolver: zodResolver(SettingsDataSchema),
    defaultValues: {
      name: currentUser?.name ?? undefined,
      email: currentUser?.email ?? undefined,
      password: undefined,
      newPassword: undefined,
    },
  });

  const onSubmit = (values: SettingsData) => {
    startTransition(() => {
      saSettings(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
            setSuccess(undefined);
          } else {
            setError(undefined);
            setSuccess(data?.success);
            update();
          }
        })
        .catch(() => {
          setError('Something went wrong');
        });
    });
  };


  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Settings
        </p>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FormField control={form.control} name="name" render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" disabled={isPending || currentUser?.isOAuth} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="john.doe@example.com" type="email" disabled={isPending || currentUser?.isOAuth} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({field}) => (
                <FormItem>
                  <FormLabel>Existing Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" disabled={isPending || currentUser?.isOAuth} />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="newPassword" render={({field}) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password" disabled={isPending || currentUser?.isOAuth} />
                  </FormControl>
                </FormItem>
              )} />

            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit">
              Update
            </Button>

          </form>
        </Form>
      </CardContent>

    </Card>
  );
} ;