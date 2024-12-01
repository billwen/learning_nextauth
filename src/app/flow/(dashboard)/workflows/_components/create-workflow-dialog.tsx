"use client";

import { useCallback, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Layers2Icon, Loader2 } from 'lucide-react';
import { CustomDialogHeader } from '@/app/flow/_components/custom-dialog-header';
import { useForm } from 'react-hook-form';
import { CreateWorkflowData, CreateWorkflowSchema } from '@/schema/flow-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { createWorkflow } from '@/server-action/sa-workflows';
import { toast } from 'sonner';

interface CreateWorkflowDialogProps {
  triggerText?: string;
}

export function CreateWorkflowDialog({ triggerText }: CreateWorkflowDialogProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<CreateWorkflowData>({
    resolver: zodResolver(CreateWorkflowSchema),
    defaultValues: {
      name: '',
      description: undefined,
    }
  });

  const { mutate, isPending } = useMutation( {
    mutationFn: createWorkflow,
    onSuccess: () => {
      toast.success('Workflow created successfully', {id: "create-workflow"});
    },
    onError: () => {
      toast.error('Failed to create workflow', {id: "create-workflow"});
    },
  } );

  const onSubmitCreateWorkflow = useCallback((data: CreateWorkflowData) => {
    toast.loading('Creating workflow...', {id: "create-workflow"});
    mutate(data);
  }, [mutate]);

  return (
    <Dialog open={open} onOpenChange={open => {
      form.reset();
      setOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? "Create workflow"}</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <CustomDialogHeader Icon={Layers2Icon} title="Create workflow" subTitle="Start building your workflow" />

        <div className="p-6">
          <Form {...form}>
            <form className="space-y-8 w-full" onSubmit={form.handleSubmit(onSubmitCreateWorkflow)}>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1 items-center">
                    Name
                    <p className="text-xs text-primary">(required)</p>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a descriptive name for your workflow
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex gap-1 items-center">
                    Description
                    <p className="text-xs text-primary">(optional)</p>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of what your workflow does.
                    <br/> This is optional but can help you remember the purpose of the workflow.
                  </FormDescription>
                </FormItem>
              )} />

            <Button type="submit" className="w-full" disabled={isPending}>
              {!isPending && "Proceed"}
              {isPending && (<Loader2 className="animate-spin" />)}
            </Button>
            </form>
          </Form>
        </div>
      </DialogContent>

    </Dialog>
  );
}
