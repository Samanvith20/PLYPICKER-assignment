import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/product/:path*',
    '/signin',
    '/signup',
    '/',
    '/profile',
    '/admin',
    '/edit-product/:path*'
  ],
};

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // Logging for debugging
  console.log('Token:', token);
  console.log('URL Pathname:', url.pathname);

  // Redirect authenticated users away from signin/signup pages
  if (token) {
    if (url.pathname === '/signin' || url.pathname === '/signup') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Redirect non-authenticated users away from protected routes
  if (!token) {
    if (
      url.pathname.startsWith('/admin') ||
      url.pathname.startsWith('/product') ||
      url.pathname.startsWith('/profile') ||
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/edit-product')
    ) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
}
