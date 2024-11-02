import { NextResponse } from 'next/server';

import { auth } from '@/server-action/auth';
import { apiAuthPrefix, authRoutes, DEFAULT_LOGGEDIN_REDIRECT, LOGIN_PAGE_URL, publicRoutes } from '@/routes';

// export function middleware(request: NextRequest) {
//   const url = request.nextUrl;
//
//   // Example: Redirect to login if user is not authenticated
//   const isAuthenticated = false; // Replace with actual auth logic
//   if (!isAuthenticated && url.pathname !== '/login') {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
//
//   return NextResponse.next();
// }
//
// // Optional: Define specific paths for middleware
// export const config = {
//   matcher: ['/protected/:path*'], // Apply middleware to paths matching this pattern
// };

export default auth((req) => {
  // req.auth
  console.log('auth middleware - ', req.nextUrl.pathname);
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) {
    return;
  }

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(DEFAULT_LOGGEDIN_REDIRECT, nextUrl));
    }
    return;
  }

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  if (isPublicRoute) {
    return;
  }

  if (isAuthenticated) {
    return;
  }

  return NextResponse.redirect(new URL(LOGIN_PAGE_URL, nextUrl));
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
