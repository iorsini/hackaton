import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;
    const isAuth = !!token;

    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // 🔹 1. Se acessar a raiz "/"
    if (pathname === "/") {
      if (isAuth) {
        return NextResponse.redirect(new URL("/dashboard/home", req.url));
      } else {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // 🔹 2. Se autenticado e tentar login/register
    if (isAuth && isPublicRoute) {
      return NextResponse.redirect(new URL("/dashboard/home", req.url));
    }

    // 🔹 3. Se não autenticado e tentar acessar algo que não é público
    if (!isAuth && !isPublicRoute && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🔹 4. Caso contrário, segue o fluxo normal
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // permite que o middleware rode sempre
    },
  }
);

// 🔹 Define o escopo das rotas que o middleware deve interceptar
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
