
import {  NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/product', '/signin', '/sign-up', '/',"/profile" ],
};

export async function middleware(request) {
  const token = await getToken({ req: request });
  
  
  console.log(token);
  
  const url = request.nextUrl;

 
  if (
    token &&
    (url.pathname.startsWith('/signin') ||
      url.pathname.startsWith('/signup') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/product', request.url));
  }

  if (!token && url.pathname.startsWith('/admin')||
  url.pathname.startsWith('/product')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}