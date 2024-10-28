"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface BackButtonProps {
  label: string;
  href: string;
}

export function BackButton({label, href}: BackButtonProps) {
  return (
    <Button className="font-normal w-full" size="sm" asChild variant="link">
      <Link href={href}>
        {label}
      </Link>
    </Button>
  );
}