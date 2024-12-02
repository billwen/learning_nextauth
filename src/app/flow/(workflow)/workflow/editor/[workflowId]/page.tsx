import { auth } from '@/server-action/auth';
import { getWorkflowById } from '@/server-action/sa-workflows';
import { Editor } from '@/app/flow/(workflow)/workflow/editor/[workflowId]/editor';

interface WorkflowEditorPageProps {
  params: {
    workflowId: string;
  };
}

export default async function WorkflowEditorPage({params}: WorkflowEditorPageProps) {
  const {workflowId} = params;
  const session = await auth();
  if( !session ) {
    return (
      <div>unauthenticated</div>
    );
  }

  const workflow = await getWorkflowById(workflowId);
  if( !workflow ) {
    return (
      <div>Workflow not found</div>
    );
  }

  return (
    <Editor workflow={workflow} />
  );
}
