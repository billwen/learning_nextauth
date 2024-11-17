import { EmailVerificationForm } from '@/components/auth/email-verification-form';
import { Suspense } from 'react';

export default function EmailVerificationPage() {

  return (
    <Suspense>
      <EmailVerificationForm />
    </Suspense>

  );

}