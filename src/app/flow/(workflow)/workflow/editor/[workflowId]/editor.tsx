import { Workflow } from '@prisma/client';
import { ReactFlowProvider } from '@xyflow/react';
import { FlowEditor } from '@/app/flow/(workflow)/workflow/editor/[workflowId]/flow-editor';

interface WorkflowEditorProps {
  workflow: Workflow
}

export function Editor({workflow}: WorkflowEditorProps) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={workflow} />
        </section>
        WorkflowEditor
      </div>
    </ReactFlowProvider>
  );
}
