import { GlobeIcon, LucideProps } from 'lucide-react';
import { AppNode, TaskParamType, TaskType } from '@/global';

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch Browser',
  icon: (props: LucideProps) => <GlobeIcon className="stroke-pink-400" {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: "Website url",
      type: TaskParamType.STRING,
      helpText: "eg: https://example.com",
      required: true,
      hideHandle: true,
    }
  ]
};

export const TaskRegistry = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
};

export function createFlowNode(nodeType: TaskType, position?: { x: number; y: number }): AppNode {
  return {
    id: crypto.randomUUID(),
    type: "Node",
    // Drag handle is used to move the node, the value should be a CSS selector
    dragHandle: ".drag-handle",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  }
}
