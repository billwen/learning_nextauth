import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { TaskParam } from '@/global';
import { NodeParamField } from '@/app/flow/_components/node-param-field';

export function NodeInput({ input }: { input: TaskParam }) {
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn("!bg-muted-foreground !border-2 !border-background !-left-2 !w-3 !h-3")}
        />
      )}

    </div>
  );
}
