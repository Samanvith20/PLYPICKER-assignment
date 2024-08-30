import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/products/:path*',
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

 

 
  if (token) {
    if (url.pathname === '/signin' || url.pathname === '/signup') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }


  if (!token) {
  
    if (
      url.pathname.startsWith('/admin') ||
      url.pathname.startsWith('/products') ||
      url.pathname.startsWith('/profile') ||
      url.pathname.startsWith('/dashboard') ||
      url.pathname.startsWith('/edit-product')
    ) {
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

  return NextResponse.next();
}
