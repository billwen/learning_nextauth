"use client";

import { CardWrapper } from '@/components/auth/card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export function EmailVerificationForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(async () => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper headerLabel="Confirmation your verification" backButtonHref="/auth/login" backButtonLabel="Back to Login">
      <div className="flex items-center justify-center w-full">
        <BeatLoader />
      </div>
    </CardWrapper>

  );
}