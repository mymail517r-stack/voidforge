import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Protected admin routes
  const protectedRoutes = [
    '/admin/dashboard',
    '/admin/projects',
    '/admin/submissions',
    '/admin/upload',
  ];
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute) {
    const token = request.cookies.get('vf_token')?.value;
    
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
