import type { Node } from '@xyflow/react';

export type GDService = {
  name: string;
  description: string;
  image?: string;
  bgColor?: string;
  url: string;
  startedAt: Date;
  clickCount: number;
};

export enum TaskType {
  LAUNCH_BROWSER = 'LAUNCH_BROWSER',
}

export type AppNodeData = Record<string, unknown> & {
  type: TaskType;
  inputs: Record<string, string>;
};

export interface AppNode extends Node {
  data: AppNodeData;
}
