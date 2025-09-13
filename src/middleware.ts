import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    
    // Define protected routes
    const protectedRoutes = ['/dashboard', '/profile', '/list']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    
    // If user is authenticated and tries to access login page, redirect to dashboard
    if (token && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    
    // If accessing protected route without auth, redirect to login
    if (isProtectedRoute && !token) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        const protectedRoutes = ['/dashboard', '/profile', '/list']
        const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
        
        // Allow access to public routes
        if (!isProtectedRoute) return true
        
        // Require token for protected routes
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
