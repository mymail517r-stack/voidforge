import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

const protectedAdminRoutes = ['/admin/dashboard', '/admin/projects', '/admin/upload', '/admin/admins', '/admin/settings', '/admin/submissions'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if it's a protected admin route
  const isProtectedRoute = protectedAdminRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    const token = request.cookies.get('vf_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Add user info to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-role', decoded.role);
    requestHeaders.set('x-username', decoded.username);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
