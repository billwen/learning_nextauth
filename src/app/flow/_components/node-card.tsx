"use client";

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useReactFlow } from '@xyflow/react';

interface NodeCardProps {
  nodeId: string;
  children: ReactNode;
  isSelected: boolean;
}

export function NodeCard({nodeId, children, isSelected}: NodeCardProps) {
  const { getNode } = useReactFlow();

  const onDoubleClickNode = () => {
    const node = getNode(nodeId);
    if (!node) {
      return;
    }

    const { position, measured } = node;
    if (!measured || !position) {
      return;
    }

    const {width, height} = measured;
    const x = position.x + (width ?? 0) / 2;
    const y = position.y + (height ?? 0) / 2;
    if (x === undefined || y === undefined) {
      return;
    }

    // setCenter(x, y, {
    //   zoom: 1,
    //   duration: 500,
    // });
  }

  return (
    <div
      className={cn("rounded-md cursor-pointer bg-background border-2 border-separate w-[420px] text-xs gap-1 flex flex-col", isSelected && "border-primary")}
      onDoubleClick={onDoubleClickNode}
    >
      {children}
    </div>
  );
}
