import { NextResponse } from 'next/server';
import { currentRole } from '@/lib/auth-lib';
import { UserRole } from '@prisma/client';

/**
 * Demo api for admin role
 * @constructor
 *
 * Anything on the server-side can be called here
 */
export async function GET() {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}
