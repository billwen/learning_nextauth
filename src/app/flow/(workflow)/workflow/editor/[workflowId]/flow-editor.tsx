import { Workflow } from '@prisma/client';
import { ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';

import "@xyflow/react/dist/style.css";

interface FlowEditorProps {
  workflow: Workflow;
}

export function FlowEditor({workflow}: FlowEditorProps) {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange}>

      </ReactFlow>
    </main>
  );
}
