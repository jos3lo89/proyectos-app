import { auth } from "@/auth";
import { NextAuthRequest } from "next-auth";
import { NextResponse } from "next/server";

const DEFAULT_MANAGER_REDIRECT = "/";
const DEFAULT_REVISOR_REDIRECT = "/revisor";

const apiAuthPrefix = "/api/auth";
const authRoutes = ["/signin"];

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const { pathname } = nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user.role;

  console.log({
    pathname,
    isLoggedIn,
    userRole,
  });

  if (pathname.startsWith(apiAuthPrefix)) {
    return NextResponse.next();
  }

  // 2. Redirigir si el usuario ya está logueado y visita una página de autenticación
  if (isLoggedIn && authRoutes.includes(pathname)) {
    if (userRole === "manager") {
      return NextResponse.redirect(new URL(DEFAULT_MANAGER_REDIRECT, nextUrl));
    }
    if (userRole === "revisor") {
      return NextResponse.redirect(new URL(DEFAULT_REVISOR_REDIRECT, nextUrl));
    }
  }

  // 3. Proteger rutas basado en el rol 'revisor'
  if (isLoggedIn && userRole === "revisor") {
    if (!pathname.startsWith("/revisor")) {
      return NextResponse.redirect(new URL(DEFAULT_REVISOR_REDIRECT, nextUrl));
    }
  }

  // 4. Proteger rutas '/revisor' del 'manager'
  if (isLoggedIn && userRole === "manager" && pathname.startsWith("/revisor")) {
    return NextResponse.redirect(new URL(DEFAULT_MANAGER_REDIRECT, nextUrl));
  }

  // 5. Redirigir al login si el usuario no está autenticado y la ruta es protegida
  if (!isLoggedIn && !authRoutes.includes(pathname)) {
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
