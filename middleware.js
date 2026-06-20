import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE } from './lib/auth';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Allow the login page and the login API itself
  if (
    pathname === '/admin/login' ||
    pathname.startsWith('/api/admin/login')
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const payload = await verifySessionToken(token);
    if (!payload) {
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect write operations on /api/products (POST/PUT/DELETE) - admin only
  if (
    pathname.startsWith('/api/products') &&
    ['POST', 'PUT', 'DELETE'].includes(request.method)
  ) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (
    pathname.startsWith('/api/settings') &&
    ['POST', 'PUT'].includes(request.method)
  ) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const payload = await verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/api/products/:path*', '/api/settings/:path*']
};
