import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentUser } from "./src/services/Auth";

const authRoutes = ["/login", "/register"];

const roleBasedRoutes = {
  USER: [/^\/account/],
  ADMIN: [/^\/admin/],
  VENDOR: [/^\/vendor/],
};
type TRole = keyof typeof roleBasedRoutes;
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();
  if (!user) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user.role as TRole]) {
    const routes = roleBasedRoutes[user.role as TRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/account", "/account/:page*", "/admin", "/login", "/register"],
};
