import { GlobeIcon, LucideProps } from 'lucide-react';
import { AppNode, TaskType } from '@/global';

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch Browser',
  icon: (props: LucideProps) => <GlobeIcon className="stroke-pink-400" {...props} />,
  isEntryPoint: true,
};

export const TaskRegistry = {
  [TaskType.LAUNCH_BROWSER]: LaunchBrowserTask,
};

export function createFlowNode(nodeType: TaskType, position?: { x: number; y: number }): AppNode {
  return {
    id: crypto.randomUUID(),
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  }
}
