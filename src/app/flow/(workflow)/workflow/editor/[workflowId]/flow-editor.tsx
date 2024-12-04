'use client';

import { Workflow } from '@prisma/client';
import { Background, BackgroundVariant, Controls, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import { createFlowNode } from '@/components/constants';
import { TaskType } from '@/global';

interface FlowEditorProps {
  workflow: Workflow;
}

export function FlowEditor({ workflow }: FlowEditorProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([createFlowNode(TaskType.LAUNCH_BROWSER)]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <main className="h-full w-full">
      <ReactFlow nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange}>
        <Controls position="top-left" />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </main>
  );
}
