import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // This middleware function runs when authorized() returns true
    const { pathname } = req.nextUrl
    
    // If user is authenticated and tries to access login page, redirect to list page
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/list', req.url))
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        const protectedRoutes = ['/profile']
        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
        
        // If accessing login page, always allow (but middleware will handle redirect)
        if (pathname === '/login') return true
        
        // Allow access to public routes (including /list)
        if (!isProtectedRoute) return true
        
        // For protected routes, require token
        return !!token
      },
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public|.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}
