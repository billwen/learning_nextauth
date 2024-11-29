"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Layers2Icon } from 'lucide-react';
import { CustomDialogHeader } from '@/app/flow/_components/custom-dialog-header';

interface CreateWorkflowDialogProps {
  triggerText?: string;
}

export function CreateWorkflowDialog({ triggerText }: CreateWorkflowDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader Icon={Layers2Icon} title="Create workflow" subTitle="Start building your workflow" />
      </DialogContent>

    </Dialog>
  );
}
