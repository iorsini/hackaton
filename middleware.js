import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        const publicRoutes = ["/login", "/register"];
        const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
        
        if (token && isPublicRoute) {
          return false;
        }
        
        if (!token && !isPublicRoute && pathname !== "/") {
          return false;
        }
        
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};