"use client";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGGEDIN_REDIRECT } from '@/routes';

export function Social() {

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      redirectTo: DEFAULT_LOGGEDIN_REDIRECT,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-x-2 gap-y-4 ">
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('google')}>
        <FcGoogle />
        Sign in with Google
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => onClick('github')}>
        <FaGithub />
        Sign in with GitHub
      </Button>
    </div>
  );
}