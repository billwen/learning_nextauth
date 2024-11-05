"use client";

import { CardWrapper } from '@/components/auth/card-wrapper';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { verifyToken } from '@/data-service/verificaiton-token-service';
import { FormSuccess } from '@/components/shared/form-success';
import { FormError } from '@/components/shared/form-error';

export function EmailVerificationForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(async () => {
    // If the request has been made, then no need to make another request
    if (error || success) {
      // on dev environment, useEffect will be called twice, so here we need to check if the error or success is already set
      return;
    }

    if (!token) {
      setError('Token is required');
      return;
    }

    verifyToken(token).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        if (response.success) {
          setSuccess(response.success);
        }
      }
    }).catch(() => {
      setError('Something went wrong');
    });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper headerLabel="Confirmation your verification" backButtonHref="/auth/login" backButtonLabel="Back to Login">
      <div className="flex items-center justify-center w-full">
        { !error && !success && (<BeatLoader />)}

        <FormSuccess message={success} />
        {!success && (<FormError message={error} />)}

      </div>
    </CardWrapper>

  );
}