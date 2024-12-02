'use server';

import { db } from '@/lib/db';
import { auth } from '@/server-action/auth';
import log from '@/utils/logger';
import { CreateWorkflowData, CreateWorkflowSchema, WorkflowStatus } from '@/schema/flow-schema';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function getWorkflowsByCurrentUser() {
  const session = await auth();

  if (!session || !session.user) {
    log.error(__filename, 'Unauthorized - get workflow, no session or session.user');
    throw new Error('Unauthorized');
  }

  return db.workflow.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
}

export async function getWorkflowById(id: string) {
  const session = await auth();

  if (!session || !session.user) {
    log.error(__filename, 'Unauthorized - get workflow, no session or session.user');
    throw new Error('Unauthorized');
  }

  return db.workflow.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
  });
}

export async function createWorkflow(form: CreateWorkflowData) {
  // Validate user
  const session = await auth();

  if (!session || !session.user) {
    log.error(__filename, 'Unauthorized - create workflow, no session or session.user');
    throw new Error('Unauthorized');
  }

  // Validate the data
  const { success, data } = CreateWorkflowSchema.safeParse(form);
  if (!success) {
    log.error(__filename, 'Invalid data - create workflow');
    throw new Error('Invalid form data');
  }

  const result = await db.workflow.create({
    data: {
      userId: session.user.id ?? '',
      definition: 'TODO',
      status: WorkflowStatus.DRAFT,
      ...data,
    },
  });

  if (!result) {
    log.error(__filename, 'Failed to create workflow');
    throw new Error('Failed to create workflow');
  }

  // Redirect to the workflow page
  redirect(`/flow/workflows/editor/${result.id}`);
}

export async function deleteWorkflow(id: string) {
  // Validate user
  const session = await auth();

  if (!session || !session.user) {
    log.error(__filename, 'Unauthorized - delete workflow, no session or session.user');
    throw new Error('Unauthorized');
  }

  const result = await db.workflow.delete({
    where: {
      id,
      userId: session.user.id,
    },
  });

  if (!result) {
    log.error(__filename, 'Failed to delete workflow');
    throw new Error('Failed to delete workflow');
  }

  revalidatePath(`/flow/workflows`);
}
