import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                       req.nextUrl.pathname.startsWith('/register');
    const isProtected = req.nextUrl.pathname.startsWith('/dashboard');

    // Se está autenticado e tenta acessar login/register, redireciona pro dashboard
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/dashboard/pomodoro', req.url));
    }

    // Se não está autenticado e tenta acessar área protegida, redireciona pro login
    if (isProtected && !isAuth) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Deixa o middleware acima controlar
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};