import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./services/Auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; // Get the current route path
  const user = await getCurrentUser();

  // Redirect to login if the user is not authenticated

  // Allow access to the login page
  if (pathname === "/") {
    // If the user is authenticated, redirect them to the home page
    if (user) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access to the route if the user is authenticated
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/dashboard/:page*"], // Matches all routes
};
