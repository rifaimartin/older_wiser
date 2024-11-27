// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Debug logs
  console.log('Middleware running...');
  console.log('Path:', request.nextUrl.pathname);
  
  // Get token & user from cookies
  const token = request.cookies.get('token');
  const userCookie = request.cookies.get('user');

  console.log('Token:', token);
  console.log('User Cookie:', userCookie);

  try {
    // Check if trying to access admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // Jika tidak ada token atau user cookie, redirect
      if (!token || !userCookie) {
        console.log('No token or user cookie');
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }

      // Parse user data
      const userData = JSON.parse(userCookie.value);
      console.log('User Data:', userData);

      // Check role
      if (userData.role !== 'admin') {
        console.log('User is not admin');
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    // Check protected routes
    if (request.nextUrl.pathname.startsWith('/activities')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // If any error in parsing/checking, redirect to login
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/activities/:path*'
  ]
};