import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE } from './lib/auth';

export const runtime = 'nodejs';

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

    console.log('[MIDDLEWARE DEBUG] pathname:', pathname);
    console.log('[MIDDLEWARE DEBUG] cookie name expected:', SESSION_COOKIE);
    console.log('[MIDDLEWARE DEBUG] token found:', token ? token.substring(0, 20) + '...' : 'NO TOKEN');
    console.log('[MIDDLEWARE DEBUG] AUTH_SECRET set:', !!process.env.AUTH_SECRET);

    const payload = await verifySessionToken(token);

    console.log('[MIDDLEWARE DEBUG] payload result:', payload);

    if (!payload) {
      console.log('[MIDDLEWARE DEBUG] REDIRECTING TO LOGIN - verification failed');
      if (pathname.startsWith('/api/admin')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    console.log('[MIDDLEWARE DEBUG] AUTH SUCCESS - allowing through');
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
