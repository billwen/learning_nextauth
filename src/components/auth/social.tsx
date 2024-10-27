"use client";

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

export function Social() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-x-2 gap-y-4 ">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FcGoogle />
        Sign in with Google
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <FaGithub />
        Sign in with GitHub
      </Button>
    </div>
  );
}