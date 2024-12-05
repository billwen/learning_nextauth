import { memo } from 'react';
import { NodeProps } from '@xyflow/react';
import { NodeCard } from '@/app/flow/_components/node-card';
import { NodeHeader } from '@/app/flow/_components/node-header';
import { AppNodeData } from '@/global';
import { TaskRegistry } from '@/components/constants';
import { NodeInputs } from '@/app/flow/_components/node-inputs';
import { NodeInput } from '@/app/flow/_components/node-input';

export const NodeComponent = memo((props: NodeProps) => {

  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input, index) => (
          <NodeInput key={index} input={input}  />
        ))}
      </NodeInputs>
    </NodeCard>);
});

NodeComponent.displayName = 'NodeComponent';
