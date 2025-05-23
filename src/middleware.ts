
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isAdmin = request.cookies.get('isAdmin')?.value;

  const url = request.nextUrl.clone();

  if (!token) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  if (request.nextUrl.pathname.startsWith('/admin') && isAdmin !== 'true') {
    url.pathname = '/dashboard/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'], 
};
