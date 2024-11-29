import { getWorkflowsByCurrentUser } from '@/server-action/sa-workflows';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, InboxIcon } from 'lucide-react';
import { CreateWorkflowDialog } from '@/app/flow/(dashboard)/workflows/_components/create-workflow-dialog';


export async function UserWorkflows() {
//  await waitFor(3000);
  try {
    const workflows = await getWorkflowsByCurrentUser();

    if (workflows.length === 0) {
      return (
        <div className="flex flex-col gap-4 h-full items-center">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>

          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No workflow</p>
            <p className="text-sm text-muted-foreground">
              Click the button below to create your first workflow
            </p>
          </div>

          <CreateWorkflowDialog triggerText="Create your first workflow" />
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {workflows.map((workflow) => (
          <div key={workflow.id} className="flex items-center justify-between p-2 bg-primary/10 rounded-md">
            <div>{workflow.name}</div>
            <div>{workflow.createdAt.toISOString()}</div>
          </div>
        ))}
      </div>
    );
  }  catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return (
      <Alert>
       <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Error message: {msg}. Please try again later</AlertDescription>
      </Alert>
    );
  }

}
