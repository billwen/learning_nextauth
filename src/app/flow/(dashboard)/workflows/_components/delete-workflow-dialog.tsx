"use client";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { deleteWorkflow } from '@/server-action/sa-workflows';
import { toast } from 'sonner';


interface DeleteWorkflowDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
}

export function DeleteWorkflowDialog({ open, setOpen, workflowName, workflowId }: DeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState<string | undefined>(undefined);

  const {isPending, mutate} = useMutation({
    mutationFn: deleteWorkflow,
    onError: () => {
      toast.error('Failed to delete workflow', { id: workflowId });
      setConfirmText('');
    },
    onSuccess: () => {
      toast.success('Workflow deleted successfully', { id: workflowId });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this workflow, it will be gone forever. This action cannot be undone.
            <div className="flex flex-col py-4 gap-2">
              <p>If you are sure, enter <b>{workflowName}</b> to confirm: </p>
              <Input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName || isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={(e) => {
              e.stopPropagation();
              toast.loading('Deleting workflow...', { id: workflowId });
              mutate(workflowId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}