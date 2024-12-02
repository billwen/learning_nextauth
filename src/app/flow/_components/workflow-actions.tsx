"use client";

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVerticalIcon, TrashIcon } from 'lucide-react';
import { TooltipWrapper } from './tooltip-wrapper';
import { useState } from 'react';
import { DeleteWorkflowDialog } from '@/app/flow/(dashboard)/workflows/_components/delete-workflow-dialog';

interface WorkflowActionsProps {
  name: string;
  id: string;
}

export function WorkflowActions({ name, id }: WorkflowActionsProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <>
      <DeleteWorkflowDialog setOpen={setShowDeleteDialog} open={showDeleteDialog} workflowName={name} workflowId={id} />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <TooltipWrapper content="More actions">
              <div className="flex items-center justify-center w-full h-full">
                <MoreVerticalIcon size={18} />
              </div>

            </TooltipWrapper>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive flex items-center gap-2" onSelect={() => {
            setShowDeleteDialog(prev => !prev);
          }}>
            <TrashIcon size={16} /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


    </>

  );
}
