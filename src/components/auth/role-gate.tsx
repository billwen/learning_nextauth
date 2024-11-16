"use client";

import { UserRole } from '@prisma/client';
import { useCurrentRole } from '@/hooks/use-current-role';
import { FormError } from '@/components/shared/form-error';

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export function RoleGate({children, allowedRole}: RoleGateProps) {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="Not allowed" />
    );
  } else {
    return (
      <>{children}</>
    );
  }
}
