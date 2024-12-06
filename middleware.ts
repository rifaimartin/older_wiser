import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import fs from 'fs';
import path from 'path';

// Logger utility
const logger = {
  info: (...args: any[]) => {
    console.log('\x1b[34m%s\x1b[0m', '[Middleware Info]:', ...args);
    logToFile('INFO', ...args);
  },
  warn: (...args: any[]) => {
    console.log('\x1b[33m%s\x1b[0m', '[Middleware Warning]:', ...args);
    logToFile('WARN', ...args);
  },
  error: (...args: any[]) => {
    console.log('\x1b[31m%s\x1b[0m', '[Middleware Error]:', ...args);
    logToFile('ERROR', ...args);
  }
};

// File logging utility
const logToFile = (level: string, ...messages: any[]) => {
  try {
    const logPath = path.join(process.cwd(), 'middleware.log');
    const timestamp = new Date().toISOString();
    const formattedMessage = `${timestamp} [${level}] - ${messages.map(m => 
      typeof m === 'object' ? JSON.stringify(m) : m
    ).join(' ')}\n`;
    
    fs.appendFileSync(logPath, formattedMessage);
  } catch (error) {
    console.error('Failed to write to log file:', error);
  }
};

// Interface for decoded JWT token
interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  email: string;
  role: string;
}

// Define which paths should be protected
const protectedPaths = [
  '/activities',
  '/share',
  '/explore',
  '/profile',
];

// Define admin paths
const adminPaths = [
  '/admin',
  '/dashboard'
];

export default function middleware(request: NextRequest) {
  try {
    // Get the path
    const path = request.nextUrl.pathname;
    
    // Get token & user from cookies  
    const token = request.cookies.get("token");
    const userCookie = request.cookies.get("user");

    // Debug logs
    logger.info(`Processing request for path: ${path}`);
    logger.info(`Token status: ${!!token}`);
    logger.info(`User cookie status: ${!!userCookie}`);

    // Function to create redirect response and clear cookies
    const createLoginRedirect = () => {
      logger.warn('Creating login redirect and clearing cookies');
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete("token");
      response.cookies.delete("user");
      return response;
    };

    // Check if path is protected
    const isProtectedPath = protectedPaths.some(protectedPath => 
      path.startsWith(protectedPath)
    );

    // Check if path is admin only
    const isAdminPath = adminPaths.some(adminPath => 
      path.startsWith(adminPath)
    );

    logger.info(`Path protection status: Protected=${isProtectedPath}, Admin=${isAdminPath}`);
    
    // If path is protected or admin, verify authentication
    if (isProtectedPath || isAdminPath) {
      // Check if token exists
      if (!token || !userCookie) {
        logger.warn('No token or user cookie found');
        return createLoginRedirect();
      }

      try {
        // Decode the token
        const decoded = jwtDecode<DecodedToken>(token.value);
        const currentTime = Math.floor(Date.now() / 1000);
        const timeLeft = decoded.exp - currentTime;

        logger.info(`Token expiration: ${new Date(decoded.exp * 1000)}`);
        logger.info(`Time left until expiration: ${timeLeft} seconds`);

        // Check if token is expired
        // 1601878400 fill the decoed.exp when u try token expired
        if (decoded.exp < currentTime) {
          logger.warn('Token has expired');
          return createLoginRedirect();
        }

        // For admin paths, verify admin role
        if (isAdminPath) {
          const userData = JSON.parse(userCookie.value);
          logger.info(`User role check for admin path: ${userData.role}`);
          
          if (userData.role !== "admin") {
            logger.warn('Non-admin user attempting to access admin path');
            return NextResponse.redirect(new URL('/', request.url));
          }
        }

      } catch (decodeError) {
        logger.error('Token decode error:', decodeError);
        return createLoginRedirect();
      }
    }

    // If all checks pass, proceed with the request
    logger.info('All checks passed, proceeding with request');
    return NextResponse.next();

  } catch (error) {
    logger.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Configure paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|favicon.ico|sitemap.xml).*)',
  ],
};