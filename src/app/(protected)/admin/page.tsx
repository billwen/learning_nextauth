"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RoleGate } from '@/components/auth/role-gate';
import { UserRole } from '@prisma/client';
import { FormSuccess } from '@/components/shared/form-success';
import { Button } from '@/components/ui/button';
import { useCallback, useState } from 'react';
import { FormError } from '@/components/shared/form-error';
import { toast } from 'sonner';
import { saAdminActionDemo } from '@/server-action/sa-admin-actions';

export default function AdminPage() {

  const [error, setError] = useState<string | undefined>(undefined);

  const onClickAdminApi = useCallback(() => {
    fetch('/api/admin')
      .then( rsp => {
        if (rsp.ok) {
          setError(undefined);
          toast.success('Admin API success');
        } else {
          setError('Admin API failed');
          toast.error('Admin API is not allowed');
        }
      })
      .catch( () => setError('Admin API failed'));
  }, []);

  const onClickAdminServerAction = useCallback(() => {
    saAdminActionDemo()
      .then((data) => {
        if (data?.error) {
          setError(data.error);
          toast.error(data.error);
        } else {
          setError(undefined);
          toast.success('Admin server action success');
        }
      })
      .catch((err) => {
        console.log(err);
        setError('Admin server action failed');
        toast.error('Admin server action something went wrong');
      });
  }, []);

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Admin Page
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="Allowed" />
        </RoleGate>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin only API Route
          </p>
          <Button onClick={onClickAdminApi}>
            Click to test
          </Button>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin only Server action
          </p>
          <Button onClick={onClickAdminServerAction}>
            Click to test
          </Button>
        </div>

        <FormError message={error} />

      </CardContent>
    </Card>
  );
}
