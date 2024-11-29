"use server";

import { Suspense } from 'react';
import { UserWorkflowsSkeleton } from '@/app/flow/_components/user-workflows-skeleton';
import { UserWorkflows } from '@/app/flow/_components/user-workflows';
import { CreateWorkflowDialog } from '@/app/flow/(dashboard)/workflows/_components/create-workflow-dialog';

export default async function FlowWorkflowsPage() {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>

        <CreateWorkflowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}
