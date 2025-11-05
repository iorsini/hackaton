import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || 
                       req.nextUrl.pathname.startsWith('/register');

    // Se está autenticado e tenta acessar login/register, redireciona pro dashboard
    if (isAuthPage && isAuth) {
      return NextResponse.redirect(new URL('/dashboard/pomodoro', req.url));
    }

    // Permite acesso a todas as outras páginas
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Permite todos acessarem
    },
  }
);

export const config = {
  matcher: ['/login', '/register'], // Só protege login e register
};