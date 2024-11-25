'use server';

import { db } from '@/lib/db';
import { auth } from '@/server-action/auth';
import log from '@/utils/logger';

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
