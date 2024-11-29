"use client";

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface CustomDialogHeaderProps {
  Icon: LucideIcon;
  title?: string;
  subTitle?: string;

  iconClassName?: string;
  titleClassName?: string;
  subTitleClassName?: string;
}

export function CustomDialogHeader({ Icon, title, subTitle, iconClassName, titleClassName, subTitleClassName }: CustomDialogHeaderProps) {

  return (
    <DialogHeader className="py-6">
      <DialogTitle asChild>
        <div className="flex flex-col items-center gap-2 mb-2">
          {Icon && <Icon size={32} className={cn("stroke-primary", iconClassName)} />}
          {title && (
            <p className={cn("text-xl text-primary", titleClassName )}>{title}</p>
          )}
          {subTitle && (
            <p className={cn("text-sm text-muted-foreground", subTitleClassName )}>{subTitle}</p>
          )}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
}