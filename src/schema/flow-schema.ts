import { z } from 'zod';

export const CreateWorkflowSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }).max(50),
  description: z.optional(z.string().min(1, { message: 'Description is required.' }).max(80)),
});

export type CreateWorkflowData = z.infer<typeof CreateWorkflowSchema>;

export enum WorkflowStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
