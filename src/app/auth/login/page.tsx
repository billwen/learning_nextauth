
import { LoginForm } from '@/components/auth/login-form';
import { Suspense } from 'react';

export default function loginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
